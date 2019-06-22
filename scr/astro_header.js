    var ASTRO_CANVAS_PIXELS_WIDE = 640;
    var ASTRO_CANVAS_PIXELS_HIGH = 640;
    var AstroCanvas = null;      // global variable for holding graphics handle
//    var AstroDate = null;
	var AstroDate = dateUTC.copy();
    var AstroDayValue = null;
//    var mylocation.lat.get(Angle.DEC) = null;
//    var mylocation.lng.get(Angle.DEC) = null;
    var GeographicElevationInMeters = 0.0;      // FIXFIXFIX:  Allow user to edit this too!
    var GeographicLocation = null;
    var SkyViewMode = "whole";
    var StarMagnitudeLimit = 6.0;
    var BrightStarColor = "#ffffff";
    var MediumStarColor = "#afafaf";
    var DimStarColor = "#7f7f7f";
    var UpdateGraphicsInterval = 20;
    var UpdateGraphicsCountdown = 1;
    var FacingAzimuth = 180.0;

    function OnFacingAzimuthChange()
    {
        var select = $.$.i('selectFacingAzimuth');
        FacingAzimuth = parseFloat (select.options[select.selectedIndex].value);
        UpdateNow();
    }

    /*
    var IE = document.all?true:false;
    if (!IE) document.captureEvents(Event.MOUSEMOVE);
    document.onmousemove = getMouseXY;
    var CurrentMouseX = 0;
    var CurrentMouseY = 0;
    function getMouseXY(e) {
        if (IE) { // grab the x-y pos.s if browser is IE
            CurrentMouseX = event.clientX + document.body.scrollLeft;
            CurrentMouseY = event.clientY + document.body.scrollTop;
        } else {  // grab the x-y pos.s if browser is NS
            CurrentMouseX = e.pageX;
            CurrentMouseY = e.pageY;
        }
        if (CurrentMouseX < 0){CurrentMouseX = 0;}
        if (CurrentMouseY < 0){CurrentMouseY = 0;}
        $.$.i('divMousePosition').innerHTML = 'x=' + CurrentMouseX + ' y=' + CurrentMouseY;
        return true;
    }
    */

    function TransformEqCoordsWholeSky (ra, dec)
    {
        var eq = new SphericalCoordinates (ra, dec, 1.0e+6);
        var hor = new HorizontalCoordinates (eq, GeographicLocation, AstroDayValue, 0);
        if (hor.altitude > 0) {     // otherwise, the object is not in the sky at this time
            var screenRadius = ASTRO_CANVAS_PIXELS_WIDE / 2.0;
            var pixelRadius = ((90.0 - hor.altitude) / 90.0) * screenRadius;
            var rotation = hor.azimuth + (270.0 - FacingAzimuth);
            var cosAzimuth = Math.cosd (rotation);
            var sinAzimuth = Math.sind (rotation);
            var x = screenRadius + (cosAzimuth * pixelRadius);
            var y = screenRadius - (sinAzimuth * pixelRadius);
            return { 'x': Math.round(x), 'y': Math.round(y) };
        } else {
            return null;
        }
    }

    function StarColor (mag)
    {
        var color;
        if (mag <= 2.0) {
            color = BrightStarColor;
        } else if (mag <= 3.5) {
            color = MediumStarColor;
        } else {
            color = DimStarColor;
        }
        return color;
    }

    function DrawStar (canvas, mag, x, y)
    {
        canvas.setColor (StarColor (mag));
        canvas.drawLine (x, y, x, y);
    }

    function PlanetLayer()
    {
        this.list = [];
    }

    PlanetLayer.prototype.AddPlanet = function (planet, dx, dy)
    {
        // First calculate the coordinates of the planet, along with its distance from Earth.
        var eq = planet.EquatorialCoordinates (AstroDayValue, GeographicLocation);
        var p = TransformEqCoordsWholeSky (eq.longitude, eq.latitude);
        if (p != null) {    // check to see if the planet is in the sky (otherwise it has not risen yet)
            var x = Math.round (p.x - dx/2);
            var y = Math.round (p.y - dy/2);
            var icon = { 'x': x, 'y': y, 'dx': dx, 'dy': dy, 'name': planet.Name, 'distance': eq.radius };

            // Eventually, when we draw the planet layer, we want to draw the most distant objects first,
            // and the closest objects last, so that the closer objects cover the nearer objects.
            // So right now we insert the objects into the list maintaining descending distance order.
            for (var i=0; i < this.list.length; ++i) {
                if (icon.distance > this.list[i].distance) {
                    break;  // we have found the insertion point
                }
            }
            this.list.splice (i, 0, icon);
        }
    }

    PlanetLayer.prototype.BuildTitle = function (icon)
    {
        var title = icon.name;
        for (var i in icon.overlap) {
            title += ", " + this.list[i].name;
        }
        return title;
    }

    PlanetLayer.prototype.Draw = function (canvas)
    {
        var i, k;

        // By default, the title of each icon is just the planet's name...
        for (i=0; i < this.list.length; ++i) {
            this.list[i].title = this.list[i].name;
            this.list[i].overlap = {};
        }

        // ... but when icons overlap, append names to the each other's titles.
        for (i=0; i < this.list.length; ++i) {
            for (k=i+1; k < this.list.length; ++k) {
                if (IconsOverlap (this.list[i], this.list[k])) {
                    this.list[i].overlap[k] = true;
                    this.list[k].overlap[i] = true;
                }
            }
        }

        for (i=0; i < this.list.length; ++i) {
            var icon = this.list[i];
            var imageFileName = "./img/astro_image_" + icon.name.toLowerCase() + ".gif";
            canvas.drawImage (imageFileName, icon.x, icon.y, icon.dx, icon.dy, "title='" + this.BuildTitle(icon) + "'");
        }
    }

    function IconCorners (a)
    {
        return [
            { 'x':a.x,            'y':a.y            },
            { 'x':a.x + a.dx - 1, 'y':a.y            },
            { 'x':a.x,            'y':a.y + a.dy - 1 },
            { 'x':a.x + a.dx - 1, 'y':a.y + a.dy - 1 }
        ];
    }

    function BoxContainsPoint (x1, y1, x2, y2, px, py)
    {
        return (x1 <= px) && (px <= x2) && (y1 <= py) && (py <= y2);
    }

    function IconsOverlap (a, b)
    {
        var aCorner = IconCorners (a);
        var bCorner = IconCorners (b);
        for (var i=0; i < aCorner.length; ++i) {
            if (BoxContainsPoint (a.x, a.y, a.x + a.dx - 1, a.y + a.dy - 1, bCorner[i].x, bCorner[i].y)) {
                return true;
            }
            if (BoxContainsPoint (b.x, b.y, b.x + b.dx - 1, b.y + b.dy - 1, aCorner[i].x, aCorner[i].y)) {
                return true;
            }
        }
        return false;
    }

    function DrawWholeSky (canvas)
    {
        var i;

        canvas.setColor ("#0000ff");
        canvas.drawEllipse (0, 0, ASTRO_CANVAS_PIXELS_WIDE, ASTRO_CANVAS_PIXELS_HIGH);
        for (i=0; i < StarCatalog.length; ++i) {
            var star = StarCatalog[i];
            if (star.mag <= StarMagnitudeLimit) {
                var p = TransformEqCoordsWholeSky (star.ra, star.dec);
                if (p != null) {
                    DrawStar (canvas, star.mag, p.x, p.y);
                }
            }
        }

        // Draw Sun, Moon, and planets last, so they are in front of the stars, not behind.
        var pl = new PlanetLayer();
        pl.AddPlanet (Astronomy.Sun, 35, 35);
        pl.AddPlanet (Astronomy.Mercury, 8, 8);
        pl.AddPlanet (Astronomy.Venus, 19, 19);
        pl.AddPlanet (Astronomy.Moon, 35, 35);
        pl.AddPlanet (Astronomy.Mars, 13, 13);
        pl.AddPlanet (Astronomy.Ceres, 7, 7);
        pl.AddPlanet (Astronomy.Pallas, 7, 7);
        pl.AddPlanet (Astronomy.Juno, 7, 7);
        pl.AddPlanet (Astronomy.Vesta, 7, 7);
        pl.AddPlanet (Astronomy.Jupiter, 15, 13);
        pl.AddPlanet (Astronomy.Saturn, 27, 13);
        pl.AddPlanet (Astronomy.Uranus, 8, 8);
        pl.AddPlanet (Astronomy.Neptune, 8, 8);
        pl.AddPlanet (Astronomy.Pluto, 7, 7);
        pl.Draw (canvas);
    }

    function UpdateScreen()
    {
//        AstroDate = new DateTime();
		AstroDate = dateUTC.copy();
        $.$.i('divAstronomyHeader').innerHTML = AstroDate.toString();
        AstroDayValue = Astronomy.DayValue (AstroDate);
        GeographicLocation = new GeographicCoordinates (mylocation.lng.get(Angle.DEC), mylocation.lat.get(Angle.DEC), GeographicElevationInMeters);

        if (--UpdateGraphicsCountdown <= 0) {       // We don't update all the graphics as often as we do the time display: doesn't matter, plus expensive!
            UpdateGraphicsCountdown = UpdateGraphicsInterval;

            AstroCanvas.clear();
            AstroCanvas.setColor ("#000000");
            AstroCanvas.fillRect (0, 0, ASTRO_CANVAS_PIXELS_WIDE, ASTRO_CANVAS_PIXELS_HIGH);
            switch (SkyViewMode) {
                case "whole":
                    DrawWholeSky (AstroCanvas);
                    break;

                default:
                    throw "Internal error: unknown sky view mode '" + SkyViewMode + "'";
            }
            AstroCanvas.paint();
        }
    }

    function UpdateNow()
    {
        UpdateGraphicsCountdown = 1;
        UpdateScreen();
    }
	
    function InitPageSkyView()
    {
        $.$.i('divAstronomyCanvas').style.width  = ASTRO_CANVAS_PIXELS_WIDE + "px";
        $.$.i('divAstronomyCanvas').style.height = ASTRO_CANVAS_PIXELS_HIGH + "px";
        AstroCanvas = new jsGraphics ("divAstronomyCanvas");
//        LoadGeographicCoordinates();
//        Timer();
    }

//------ EphemerisPanel begin


      var Flag_RealTimeUpdate = true;
      var CartesianCoordinateType = "heliocentric";
      var CartesianCoordinateColor = { 'geocentric': "#cfffcf", 'heliocentric': "#ffff9f", 'none':"#000000" };
      var AngularCoordinateType = "equatorial";
      var AngularCoordinateColor = { 'equatorial': "#ccff80", 'ecliptic': "#ffdf80", 'horizontal': "#ccccff" };
      var AstroDateTime = dateUTC.copy();//new DateTime();
      var GeographicPosition = [ { lat: null, lng:null } , 0.0 ];
      var GeographicElevationInMeters = 0.0;      // FIXFIXFIX:  Allow user to edit this too!
      var SelectedBody = null;            // celestial body selected for extra info: rise time, culm time, set time, visual magnitude, etc.
      
      var RowBackgroundTable = {};    // indexed using row.id, returning an object x such that x.mouseover and x.mouseout are colors to use
      var CellSuffix = ['_name', '_x', '_y', '_z', '_distance', '_mag', '_SA', '_const', '_RA', '_DEC'];
      var NameCurrentlyHighlighted = null;
      
      function OnRowMouseEvent (e)
      {
          var id = null;
          var flavor = null;       
          
          if (e && e.target && e.target) {
              id = e.target.id;                   // Most browsers: Firefox, Chrome, etc.
              flavor = e.type;                    // "mouseover" or "mouseout"            
          } else if (window && window.event && window.event.srcElement) {
              id = window.event.srcElement.id;    // Internet Explorer (sigh... why does it have to be different???)
              flavor = window.event.type;
              
              // In IE, window.event has the following members:
              // recordset, type, fromElement, toElement, altLeft, keyCode, repeat,
              // reason, data, behaviorCookie, source, contentOverflow, behaviorPart,
              // url, dataTransfer, ctrlKey, shiftLeft, dataFld, returnValue, qualifier,
              // wheelDelta, bookmarks, button, srcFilter, nextPage, cancelBubble, x, y, 
              // srcElement, screenX, screenY, srcUrn, origin, boundElements, clientX, clientY,
              // propertyName, shiftKey, ctrlLeft, offsetX, offsetY, altKey
          }
          
          if (id && flavor) {
              // The target will be the cell.  We need the row it belongs to.
              // We can deduce the row because we use a pattern for identifiers.
              // For example: 'Sun_row', 'Sun_const', etc.
              var name = id.replace (/_.*$/, "");    // get the object name by itself, e.g. "Sun" or "Mercury"
              var row = $.$.i(name + "_row");
              if (row) {
                  var bg = RowBackgroundTable [row.id];
                  if (bg != null) {
                      var color = bg[flavor];
                      if (color != null) {
                          NameCurrentlyHighlighted = (flavor == "mouseover") ? name : null;
                          for (var i=0; i < CellSuffix.length; ++i) {
                              var cell = $.$.i(name + CellSuffix[i]);
                              if (cell) {
                                  cell.style.backgroundColor = color;
                              }
                          }
                          HilightColors();   // Prevent up to a second delay of color coding Earth/Sun for helio/geo-centric...
                      }                                        
                  }
              }
          }        
      }
      
      function InsertRow (table, id)
      {
          var row = $.$.i(id);
          if (row == null) {
              row = table.insertRow (table.rows.length);
              row.id = id;
              if (row.addEventListener) {
                  // The way every browser in the world except for Internet Explorer works (DOM 2 standard)...
                  // http://javascript.about.com/library/bldom19.htm
                  row.addEventListener ('mouseover', OnRowMouseEvent, false);
                  row.addEventListener ('mouseout',  OnRowMouseEvent, false);
              } else if (row.attachEvent) {
                  // Microsoft is such a big, important company that it was absolutely *vital*
                  // to make Internet Explorer incompatible with all those other stupid standard browsers.
                  row.attachEvent ('onmouseover', OnRowMouseEvent);
                  row.attachEvent ('onmouseout',  OnRowMouseEvent);
              }
              RowBackgroundTable[id] = { 'mouseout' : '', 'mouseover' : '#ffff00' };
          }
          return row;
      }
  
      function SetAngleMode (mode)
      {
          AngleMode = mode;
          Cookie.write ("AngleDisplayMode", mode, COOKIE_EXPIRATION_DAYS);
          CalculateSolarSystem();
      }
  
      function InsertCell (table, row, id, className, s)
      {
          var cell = $.$.i(id);
          if (cell == null) {
              cell = row.insertCell (row.cells.length);
              cell.className = className;
              cell.id = id;
          }
          cell.innerHTML = s;
          return cell;
      }
  
      function AddRowForCelestialBody (p, day)
      {
          var planetTable = $.$.i('planetTable');
          var pc = null;
          var distance = null;
  
          switch (CartesianCoordinateType) {
              case "heliocentric":
                  distance = p.DistanceFromSun (day);
                  pc = p.EclipticCartesianCoordinates (day);
                  break;
  
              case "geocentric":
                  distance = p.DistanceFromEarth (day);
                  pc = p.GeocentricCoordinates (day);
                  break;
                  
              case "none":
                  distance = 0.0;
                  pc = { 'x':0.0, 'y':0.0, 'z':0.0 };
                  break;
  
              default:
                  throw ("Internal error - unknown cartesian coordinate type '" + CartesianCoordinateType + "'");
          }
  
          var location = new GeographicCoordinates (mylocation.lng.get(Angle.DEC), mylocation.lat.get(Angle.DEC), GeographicElevationInMeters);
          var mag = (p.Name == "Earth") ? "&nbsp;" : p.VisualMagnitude(day).toFixed(2);
          var sunAngle = (p.Name == "Earth") ? "&nbsp;" : Astronomy.AngleWithSunInDegrees (p, day).toFixed(1) + "&deg;";
  
          var row = InsertRow (planetTable, p.Name + "_row");
          var PRECISION = 7;
          var raHtml  = "&nbsp;";
          var decHtml = "&nbsp;";
          var eq = null;
          var constellation = "&nbsp;";
  
          if (p.Name != "Earth") {
              eq = p.EquatorialCoordinates (day, location);
              constellation = HtmlConstellation (eq);
              constellation = "<div style='text-align:center;' id='"+p.Name+"_constdiv'>" + constellation + "</div>"
          }
  
          switch (AngularCoordinateType) {
              case "equatorial":
                  if (p.Name != "Earth") {
                      raHtml  = HtmlRightAscension (eq.longitude);
                      decHtml = HtmlDeclination (eq.latitude);
                  }
                  break;
  
              case "ecliptic":
                  if (p.Name != "Sun") {
                      var ec = p.EclipticAngularCoordinates (day);
                      raHtml  = HtmlDeclination (ec.longitude);
                      decHtml = HtmlDeclination (ec.latitude);
                  }
                  break;
  
              case "horizontal":
                  if (p.Name != "Earth") {
                      var hc = p.HorizontalCoordinates (day, location);
                      raHtml = HtmlDeclination (hc.azimuth);
                      decHtml = HtmlDeclination (hc.altitude);
                  }
                  break;
  
              default:
                  throw ("Internal error - unknown angular coordinate type '" + AngularCoordinateType + "'");
          }
  
          var nameTextColor = NakedEyeObjects[p.Name] ? "#000000" : "#808060";
          InsertCell (planetTable, row, p.Name + "_name", "", "<div style='text-align:center; color:"+nameTextColor+";' id='"+p.Name+"_namediv'>" + p.Name + "</div>");
          InsertCell (planetTable, row, p.Name + "_x", "NumericData", pc.x.toFixed(PRECISION));
          InsertCell (planetTable, row, p.Name + "_y", "NumericData", pc.y.toFixed(PRECISION));
          InsertCell (planetTable, row, p.Name + "_z", "NumericData", pc.z.toFixed(PRECISION));
          InsertCell (planetTable, row, p.Name + "_distance", "NumericData", distance.toFixed(PRECISION));
          InsertCell (planetTable, row, p.Name + "_mag", "SmallNumericData", mag);
          InsertCell (planetTable, row, p.Name + "_SA", "SmallNumericData", sunAngle);
          InsertCell (planetTable, row, p.Name + "_const", "SmallNumericData", constellation);
          InsertCell (planetTable, row, p.Name + "_RA", "NumericData", raHtml);
          InsertCell (planetTable, row, p.Name + "_DEC", "NumericData", decHtml);
      }
  
      function HilightColors()
      {
          // Give faint color highlight to emphasize heliocentric vs geocentric coordinates...
          var bgColorSun = "";
          var bgColorEarth = "";
          var coordDisplay = "";
          switch (CartesianCoordinateType) {
              case "heliocentric":
                  bgColorSun = CartesianCoordinateColor[CartesianCoordinateType];
                  break;
  
              case "geocentric":
                  bgColorEarth = CartesianCoordinateColor[CartesianCoordinateType];
                  break;
                  
              case "none":
                  coordDisplay = "none";
                  break;
  
              default:
                  throw ("Internal error - don't know how to highlight colors for '" + CartesianCoordinateType + "'");
          }
          
          if (NameCurrentlyHighlighted != "Sun") {
              $.$.i('Sun_name'    ).style.backgroundColor = bgColorSun;
              $.$.i('Sun_x'       ).style.backgroundColor = bgColorSun;
              $.$.i('Sun_y'       ).style.backgroundColor = bgColorSun;
              $.$.i('Sun_z'       ).style.backgroundColor = bgColorSun;
              $.$.i('Sun_distance').style.backgroundColor = bgColorSun;
          }        
          $.$.i('row_Heliocentric').style.backgroundColor = bgColorSun;
  
          if (NameCurrentlyHighlighted != "Earth") {
              $.$.i('Earth_name'    ).style.backgroundColor = bgColorEarth;
              $.$.i('Earth_x'       ).style.backgroundColor = bgColorEarth;
              $.$.i('Earth_y'       ).style.backgroundColor = bgColorEarth;
              $.$.i('Earth_z'       ).style.backgroundColor = bgColorEarth;
              $.$.i('Earth_distance').style.backgroundColor = bgColorEarth;
          }
          $.$.i('row_Geocentric').style.backgroundColor = bgColorEarth;

          $.$.i('row_Ecliptic'  ).style.backgroundColor = (AngularCoordinateType == "ecliptic"  ) ? AngularCoordinateColor[AngularCoordinateType] : "";
          $.$.i('row_Equatorial').style.backgroundColor = (AngularCoordinateType == "equatorial") ? AngularCoordinateColor[AngularCoordinateType] : "";
          $.$.i('row_Horizontal').style.backgroundColor = (AngularCoordinateType == "horizontal") ? AngularCoordinateColor[AngularCoordinateType] : "";
  
          $.$.i('th_Angle1').style.backgroundColor = AngularCoordinateColor[AngularCoordinateType];
          $.$.i('th_Angle2').style.backgroundColor = AngularCoordinateColor[AngularCoordinateType];
          
          // Hide or show all "_x", "_y", "_z", "_distance"...
          var suffix = ["_x", "_y", "_z", "_distance"];
          for (var i in Astronomy.Body) {
              var p = Astronomy.Body[i];
              for (var j in suffix) {
                  $.$.i(p.Name + suffix[j]).style.display = coordDisplay;
              }
          }
          for (var j in suffix) {
              $.$.i("th" + suffix[j]).style.display = coordDisplay;
          }
          
          // Hide or show the remaining cells the Earth row...
          $.$.i("Earth_row").style.display = coordDisplay;
      }
  
      function CalculateSolarSystem()
      {
          var day = AstroDateTime.getDayNumber()
          var text = "<code>" + AstroDateTime.toString() + "</code></br>";
          text += "<code>Day Value = " + day.toFixed(5) + "</code><br/>";
          text += "<code>Position = " + mylocation.lat.get(Angle.DEC) + ", " + mylocation.lng.get(Angle.DEC) + "</code><br/>";
          $.$.i('divDateTime').innerHTML = text;
  
          $.$.i('th_x').title = CartesianCoordinateType + " x-coordinate in AU";
          $.$.i('th_y').title = CartesianCoordinateType + " y-coordinate in AU";
          $.$.i('th_z').title = CartesianCoordinateType + " z-coordinate in AU";
  
          $.$.i('th_x').style.backgroundColor = CartesianCoordinateColor[CartesianCoordinateType];
          $.$.i('th_y').style.backgroundColor = CartesianCoordinateColor[CartesianCoordinateType];
          $.$.i('th_z').style.backgroundColor = CartesianCoordinateColor[CartesianCoordinateType];
          $.$.i('th_distance').style.backgroundColor = CartesianCoordinateColor[CartesianCoordinateType];
  
          $.$.i('th_x').innerHTML = CartesianCoordinateType.charAt(0).toUpperCase() + "<sub>x</sub>";
          $.$.i('th_y').innerHTML = CartesianCoordinateType.charAt(0).toUpperCase() + "<sub>y</sub>";
          $.$.i('th_z').innerHTML = CartesianCoordinateType.charAt(0).toUpperCase() + "<sub>z</sub>";
  
          for (var i in Astronomy.Body) {
              AddRowForCelestialBody (Astronomy.Body[i], day);
          }
  
          HilightColors();
  
          CalculateSelectedBody (day);
  
          OnVisibilityChange();       // an object can rise or set at any time
      }
  
      var BriefDayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      function BriefTimeString (date)
      {
          if (date == null) {
              return "";
          } else {
              var h = date.getHours();
              h = ((h < 10) ? "0" : "") + h.toString();
              var m = date.getMinutes();
              m = ((m < 10) ? "0" : "") + m.toString();
              var s = date.getSeconds();
              s = ((s < 10) ? "0" : "") + s.toString();
              return BriefDayOfWeek[date.getDay()] + " " + h + ":" + m + ":" + s;
          }
      }
  
      function BriefDayValueString (day)
      {
          if (day == null) {
              return "";
          } else {
              return BriefTimeString (Astronomy.DayValueToDate (day));
          }
      }
  
      function ResetSelectedBodyEvents()
      {
          // This gets called whenever the time has been manually reset, to force recalculation of all events.
          if (SelectedBody != null) {
              SelectedBody = { 'Body' : SelectedBody.Body };      // nuke all properties except the body itself
          }
      }
  
      function CalculateSelectedBody (day)
      {
          if (SelectedBody != null) {
              var location = new GeographicCoordinates (mylocation.lng.get(Angle.DEC), mylocation.lat.get(Angle.DEC), GeographicElevationInMeters);
  
              if (SelectedBody.NextRiseTime == null || SelectedBody.NextRiseTime < day) {
                  SelectedBody.NextRiseTime = Astronomy.NextRiseTime (SelectedBody.Body, day, location);
              }
  
              if (SelectedBody.NextSetTime == null || SelectedBody.NextSetTime < day) {
                  SelectedBody.NextSetTime = Astronomy.NextSetTime (SelectedBody.Body, day, location);
              }
  
              if (SelectedBody.NextCulmTime == null || SelectedBody.NextCulmTime < day) {
                  SelectedBody.NextCulmTime = Astronomy.NextCulmTime (SelectedBody.Body, day, location);
              }
  
              $.$.i('divRiseTime').innerHTML = BriefDayValueString (SelectedBody.NextRiseTime);
              $.$.i('divCulmTime').innerHTML = BriefDayValueString (SelectedBody.NextCulmTime);
              $.$.i('divSetTime' ).innerHTML = BriefDayValueString (SelectedBody.NextSetTime );
          }
      }
  
      function OnSelectBody ()
      {
          var select = $.$.i('selectBody');
          var name = select.options[select.selectedIndex].value;
          SelectObjectForExtraInfo (name);
      }
  
      function updateEphemerisPanel()
	  {
			AstroDateTime = dateUTC.copy();
			CalculateSolarSystem();
	  }
  
      var NakedEyeObjects = {
          'Sun':      true,
          'Moon':     true,
          'Mercury':  true,
          'Venus':    true,
          'Earth':    true,
          'Mars':     true,
          'Jupiter':  true,
          'Saturn':   true
      };
  
      function OnVisibilityChange()
      {
          // This function is called whenever any GUI elements that affect display have changed state.
          // For example: the user clicks on the checkbox for showing bright objects only.
          // This function's job is to hide/unhide rows based on all relevant GUI control states.
  
          var day = AstroDateTime.getDayNumber();
          var location = new GeographicCoordinates (mylocation.lng.get(Angle.DEC), mylocation.lat.get(Angle.DEC), GeographicElevationInMeters);
          var hideBelowHorizon = $.$.i('checkbox_RisenObjectsOnly' ).checked;     // should we hide any object that is below the horizon?
          var hideDimObjects   = $.$.i('checkbox_BrightObjectsOnly').checked;     // should we hide any object too dim to be seen with the naked eye?
          var showComets       = $.$.i('checkbox_ShowComets').checked;            // should comets be included in the list?
          var showMinor        = $.$.i('checkbox_ShowMinor').checked;             // should minor asteroids be included in the list?
          
          for (var i=0; i < Astronomy.Body.length; ++i) {
              var p = Astronomy.Body[i];
              if (p.Name != "Earth") {
                  var row = $.$.i(p.Name + "_row");
                  var shouldHideThisBody = false;
                  if (hideBelowHorizon) {
                      var hc = p.HorizontalCoordinates (day, location);
                      if (hc.altitude < 0.0) {
                          shouldHideThisBody = true;
                      }
                  }
                  if (hideBelowHorizon && (hc.altitude < 0.0)) {
                      shouldHideThisBody = true;
                  }
                  if (hideDimObjects && !NakedEyeObjects[p.Name]) {
                      shouldHideThisBody = true;
                  }
                  if (!showComets && (p.BodyType == 'comet')) {
                      shouldHideThisBody = true;
                  }
                  if (!showMinor && (p.BodyType == 'minor')) {
                      shouldHideThisBody = true;
                  }
                  row.style.display = shouldHideThisBody ? "none" : "";
              }
          }
  
          // Save the updated checkbox states as cookies, so user doesn't have to keep clicking the same options each time.
          Cookie.write ("RisenObjectsOnly" , (hideBelowHorizon ? "true" : "false"), COOKIE_EXPIRATION_DAYS);
          Cookie.write ("BrightObjectsOnly", (hideDimObjects   ? "true" : "false"), COOKIE_EXPIRATION_DAYS);
      }
  
  
      function WriteSkyChart (body, location, doc)
      {
          // Get selected date, round down to midnight, then show chart for 24 hours.
          var when = new DateTime ();
          when.setFullYear (AstroDateTime.getFullYear());
          when.setMonth (AstroDateTime.getMonth());
          when.setDate (AstroDateTime.getDate());
          when.setHours (0, 0, 0, 0);
          doc.writeln ("<h3>Altitude/Azimuth chart for " + when.toLocaleDateString() + "</h3>");
          doc.writeln ("<table style='text-align:right; font-family:Monospace;'>");
          doc.write ("<tr>");
          doc.write ("<td style='width:6em;'>Time</td>");
          doc.write ("<td style='width:10em;'>Azimuth</td>");
          doc.write ("<td style='width:10em;'>Altitude</td>");
          doc.writeln ("</tr>");
  
          var TIME_STEP_MINUTES = 5;      // number of minutes between time steps
          var NUM_TIME_STEPS = Math.round ((24 * 60) / TIME_STEP_MINUTES);
          var hours = 0;
          var minutes = 0;
          var printing = true;
          for (var i=0; i < NUM_TIME_STEPS; ++i) {
              when.setHours (hours, minutes, 0, 0);
  
              var day = when.getDayNumber();
              var timeString = ((hours < 10) ? "0" : "") + hours + ":" + ((minutes < 10) ? "0" : "") + minutes;
  
              var hc = body.HorizontalCoordinates (day, location);
              if (hc.altitude >= -1.5) {
                  if (!printing) {
                      // emit a blank row so it is easy to see where an object rose after having set.
                      doc.writeln ("<tr><td>&nbsp;</td></tr>");
                      printing = true;
                  }
                  doc.write ("<tr>");
                  doc.write ("<td>" + timeString + "</td>");
                  doc.write ("<td>" + HtmlDeclination(hc.azimuth) + "</td>");
                  doc.write ("<td>" + HtmlDeclination(hc.altitude) + "</td>");
                  doc.writeln ("</tr>");
              } else {
                  printing = false;
              }
  
              // Update minutes and hours values for next iteration...
              minutes += TIME_STEP_MINUTES;
              if (minutes >= 60) {
                  minutes = 0;
                  if (++hours >= 24) {
                      break;  // this should never happen, but prevent rolling over to next calendar day in any case.
                  }
              }
          }
  
          doc.writeln ("</table>");
      }
  
      function OnDetailsButton()
      {
          if (SelectedBody!=null && SelectedBody.Body!=null) {
              var location = new GeographicCoordinates (mylocation.lng.get(Angle.DEC), mylocation.lat.get(Angle.DEC), GeographicElevationInMeters);
              var body = SelectedBody.Body;
              var w = window.open ("", "CelestialBodyDetails");
              if (w!=null && w.document!=null) {
                  var doc = w.document;
                  doc.writeln ("<html><head><title>" + SelectedBody.Body.Name + " details</title></head><body>");
                  doc.writeln ("<h2>Details for " + SelectedBody.Body.Name + "</h2>");
  
                  WriteSkyChart (body, location, doc);
  
                  doc.writeln ("</body></html>");
                  doc.close();        // otherwise browser will keep spinning like the document is still loading
              } else {
                  alert ("Error creating new browser window.");
              }
          } else {
              alert ("No celestial body is selected.");
          }
      }
  
      function OnRadioButton_Cartesian (id)
      {
          switch (id) {
              case "rb_Cartesian_Heliocentric":
                  CartesianCoordinateType = "heliocentric";
                  break;
  
              case "rb_Cartesian_Geocentric":
                  CartesianCoordinateType = "geocentric";
                  break;
                  
              case "rb_Cartesian_None":
                  CartesianCoordinateType = "none";
                  break;
  
              default:
                  throw ("Internal error - unknown radio button '" + id + "'");
                  break;
          }
  
          Cookie.write ("CartesianCoordinateType", id.substring("rb_Cartesian_".length), COOKIE_EXPIRATION_DAYS);
          CalculateSolarSystem();
      }
  
      function OnRadioButton_Angular (id)
      {
          var toolTip1 = null;
          var toolTip2 = null;
          var header1 = null;
          var header2 = null;
  
          switch (id) {
              case "rb_Angular_Ecliptic":
                  AngularCoordinateType = "ecliptic";
                  toolTip1 = "Ecliptic longitude.";
                  toolTip2 = "Ecliptic latitude.";
                  header1 = '<a href="http://en.wikipedia.org/wiki/Ecliptic_longitude" target="_blank">Ecl. Long.</a>';
                  header2 = '<a href="http://en.wikipedia.org/wiki/Ecliptic_latitude" target="_blank">Ecl. Lat.</a>';
                  break;
  
              case "rb_Angular_Equatorial":
                  AngularCoordinateType = "equatorial";
                  toolTip1 = "Right Ascension in sidereal hours.";
                  toolTip2 = "Declination in angular degrees.";
                  header1 = '<a href="http://en.wikipedia.org/wiki/Right_ascension" target="_blank">RA</a>';
                  header2 = '<a href="http://en.wikipedia.org/wiki/Declination" target="_blank">DEC</a>';
                  break;
  
              case "rb_Angular_Horizontal":
                  AngularCoordinateType = "horizontal";
                  toolTip1 = "Compass direction clockwise from North.";
                  toolTip2 = "Angle above the horizon.";
                  header1 = '<a href="http://en.wikipedia.org/wiki/Horizontal_coordinate_system" target="_blank">Azimuth</a>';
                  header2 = '<a href="http://en.wikipedia.org/wiki/Horizontal_coordinate_system" target="_blank">Altitude</a>';
                  break;
  
              default:
                  throw ("Internal error - unknown radio button '" + id + "'");
          }
  
          $.$.i('th_Angle1').title = toolTip1;
          $.$.i('th_Angle2').title = toolTip2;
  
          $.$.i('th_Angle1').innerHTML = header1;
          $.$.i('th_Angle2').innerHTML = header2;
  
//          Cookie.write ("AngularCoordinateType", id.substring("rb_Angular_".length), COOKIE_EXPIRATION_DAYS);
          CalculateSolarSystem();
      }
  
      function LoadOption_Cartesian()
      {
          var radioButtonId = "rb_Cartesian_" + Cookie.read ("CartesianCoordinateType", "Heliocentric");
          switch (radioButtonId) {
              case "rb_Cartesian_Heliocentric":
              case "rb_Cartesian_Geocentric":
              case "rb_Cartesian_None":
                  break;      // cookie value is OK; leave it alone.
  
              default:
                  radioButtonId = "rb_Cartesian_Heliocentric";    // force bad cookie value to be valid (avoid crashing)
                  break;
          }
          $.$.i(radioButtonId).checked = true;
          OnRadioButton_Cartesian (radioButtonId);
      }
  
      function LoadOption_Angular()
      {
          var radioButtonId = "rb_Angular_" + Cookie.read ("AngularCoordinateType", "Equatorial");
          switch (radioButtonId) {
              case "rb_Angular_Equatorial":
              case "rb_Angular_Horizontal":
              case "rb_Angular_Ecliptic":
                  break;      // cookie value is OK; leave it alone.
  
              default:
                  radioButtonId = "rb_Angular_Equatorial";    // force bad cookie value to be valid (avoid crashing)
                  break;
          }
          $.$.i(radioButtonId).checked = true;
          OnRadioButton_Angular (radioButtonId);
      }
  
      function LoadOption_AngleMode()
      {
          var angleDisplayMode = Cookie.read ("AngleDisplayMode", "dms");
          switch (angleDisplayMode) {
              case "dmm":
              case "dms":
              case "decimal":
                  break;      // cookie value is OK; leave it alone.
  
              default:
                  angleDisplayMode = "dms";    // force bad cookie value to be valid (avoid crashing)
                  break;
          }
  
          var radioButtonId = "rb_AngleMode_" + angleDisplayMode;
          $.$.i(radioButtonId).checked = true;
          SetAngleMode (angleDisplayMode);
      }
  
      function LoadOption_BrightObjectsOnly()
      {
          var brightOnly = (Cookie.read ("BrightObjectsOnly", "false") == "true");
          $.$.i('checkbox_BrightObjectsOnly').checked = brightOnly;
      }
  
      function LoadOption_RisenObjectsOnly()
      {
          var risenOnly = (Cookie.read ("RisenObjectsOnly", "false") == "true");
          $.$.i('checkbox_RisenObjectsOnly').checked = risenOnly;
      }
  
      function SelectObjectForExtraInfo (name)
      {
          var body = Astronomy[name];
          if (body == null || body.Name == null || body.Name != name) {
              throw "Internal error: invalid object selected: '" + name + "'";
          } else {
              Cookie.write ("SelectedCelestialBody", name, COOKIE_EXPIRATION_DAYS);
              SelectedBody = { 'Body': body };
              CalculateSolarSystem();
          }
      }
  
      function LoadOption_SelectedObject()
      {
          var name = Cookie.read ("SelectedCelestialBody", "Sun");
          if (!Astronomy.IsBodyName(name) || (name == "Earth")) {
              name = "Sun";
          }
          var select = $.$.i('selectBody');
          for (var i=0; i < select.options.length; ++i) {
              if (select.options[i].value == name) {
                  select.selectedIndex = i;
                  SelectObjectForExtraInfo (name);
                  return;
              }
          }
          alert ("LoadOption_SelectedObject(): could not find option for '" + name + "'");
      }
	  
    function InitPageSolarSystem()
    {
        LoadOption_Cartesian();
        LoadOption_Angular();
        LoadOption_AngleMode();
//        LoadOption_RealTime();
//        LoadGeographicCoordinates();
//CommitGeographicCoordinates();
        LoadOption_SelectedObject();
        LoadOption_BrightObjectsOnly();
        LoadOption_RisenObjectsOnly();
        OnVisibilityChange();          // do this AFTER loading all options that can affect the display
//        Timer();    // prime the pump for the self-perpetuating every-1-second timer event
    }
	
//------ EphemerisPanel end


	
    function InitPage()
    {
		InitPageSolarSystem();
		InitPageCalendar();
		InitPageSkyView();
		UpdateGraphicsCountdown = 1;
	    UpdateScreen();

    }

var CalendarRow;
var CalendarCell;
var CalendarDate;
var PreCalcPastDate, PreCalcFutureDate;
var PRE_CALCULATE_INTERVAL_MILLISECONDS = 10;
var PRECALC_YEAR_WINDOW = 1;
var PreCalcEnabled = false;
var CellFromDate;
var EventCache = {};
var MonthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//var mylocation.lat.get(Angle.DEC) = null;
//var mylocation.lng.get(Angle.DEC) = null;
var GeographicElevationInMeters = 0.0;      // FIXFIXFIX:  Allow user to edit this too!
var GeographicLocation = null;
var HighlightedCell = null;
var HIGHLIGHT_COLOR = "#fff0f0";
var SuperiorPlanets = ["Mars", "Ceres", "Pallas", "Juno", "Vesta", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
var InferiorPlanets = ["Mercury", "Venus"];
var AllPlanetsButEarth = InferiorPlanets.concat (SuperiorPlanets);
var BrightObjects = ["Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];

function InitPageCalendar()
{
//    LoadGeographicCoordinates();
    InitCalendarTable();
    SetCurrentDate();
    StartPreCalculateTimer();
}


function StartPreCalculateTimer()
{
    PreCalcPastDate = CopyDate (CalendarDate);
    PreCalcFutureDate = CopyDate (CalendarDate);
    PreCalcEnabled = true;
    setTimeout ( 'PreCalculateTimer()', PRE_CALCULATE_INTERVAL_MILLISECONDS );
}


function PreCalculateTimer()
{
    if (PreCalcEnabled) {
        // Try to keep PRECALC_YEAR_WINDOW years on either side of the currently selected month...
        if (PreCalcPastDate.getFullYear() >= CalendarDate.getFullYear() - PRECALC_YEAR_WINDOW) {
            PreCalcPastDate.setDate (PreCalcPastDate.getDate() - 1);
            $.$.i('divPreCalculatePast').innerHTML = "Precalculating " + BriefDateString(PreCalcPastDate);
            DayHtml (PreCalcPastDate);      // just calling this function causes all its calculations to be cached as a side-effect
        } else {
            $.$.i('divPreCalculatePast').innerHTML = "";
        }

        if (PreCalcFutureDate.getFullYear() <= CalendarDate.getFullYear() + PRECALC_YEAR_WINDOW) {
            PreCalcFutureDate.setDate (PreCalcFutureDate.getDate() + 1);
            $.$.i('divPreCalculateFuture').innerHTML = "Precalculating " + BriefDateString(PreCalcFutureDate);
            DayHtml (PreCalcFutureDate);    // just calling this function causes all its calculations to be cached as a side-effect
        } else {
            $.$.i('divPreCalculateFuture').innerHTML = "";
        }
    }
    setTimeout ( 'PreCalculateTimer()', PRE_CALCULATE_INTERVAL_MILLISECONDS );
}


function BriefDateString (date)
{
    var y = date.getFullYear().toString();
    var m = (1 + date.getMonth()).toString();
    var d = date.getDate().toString();
    if (m.length < 2) {
        m = "0" + m;
    }
    if (d.length < 2) {
        d = "0" + d;
    }
    return y + "/" + m + "/" + d;
}


function ResetCache()
{
    PreCalcEnabled = false;     // this might not always work, depending on how multithreaded the browser's javascript interpreter is

    EventCache = {};
    RegenerateCalendar();

    PreCalcPastDate = CopyDate (CalendarDate);
    PreCalcFutureDate = CopyDate (CalendarDate);
    PreCalcEnabled = true;
}

function InitCalendarTable()
{
    var tableCalendar = $.$.i('tableCalendar');
    CalendarRow = [];
    CalendarCell = [];
    var index = 0;
    for (var y=0; y < 6; ++y) {
        var row = tableCalendar.insertRow (tableCalendar.rows.length);
        row.id = "RowCalendar_" + y;
        CalendarRow.push (row);

        for (var x=0; x < 7; ++x) {
            var cell = row.insertCell (row.cells.length);
            cell.className = "Day";
            cell.id = "CellCalendar_" + (index++);
            CalendarCell.push (cell);
        }
    }
}


function CacheIndexFromDate (date)
{
    return date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate();
}


function RecallCachedInfoForDate (date)
{
    var index = CacheIndexFromDate (date);
    return EventCache[index];
}


function StoreCachedInfoForDate (date, info)
{
    var index = CacheIndexFromDate (date);
    EventCache[index] = info;
}


function RegenerateCalendar()
{
    SetCalendarDate(CalendarDate);
}


function CopyDate (date)
{
    var copy = new Date();
    copy.setFullYear (date.getFullYear(), date.getMonth(), date.getDate());
    copy.setHours (date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    return copy;
}

function FriendlyMonthString (date)
{
    return MonthName[date.getMonth()] + " " + date.getFullYear();
}

function SetCalendarDate (date)
{
    date = CopyDate (date);             // prevent side-effects from modifying the internal values inside 'date'
    date.setHours (0, 0, 0, 0);         // we want the date value to start at midnight on the first day of this month.
    CalendarDate = CopyDate (date);     // make yet another safe copy for global variable, because we are going to modify the value of 'date' inside this function.
    date.setDate (1);   // leave CalendarDate on the particular day selected, but set date to first of month, so we can iterate through all the days.

    Unhighlight();
    CellFromDate = {};

    GeographicLocation = new GeographicCoordinates (mylocation.lng.get(Angle.DEC), mylocation.lat.get(Angle.DEC), GeographicElevationInMeters);
    $.$.i('CalendarMonthYear').innerHTML = FriendlyMonthString (date);

    // Figure out which day of the week the first of this month falls on.
    // Note that we consider Monday the first day of the week, but Javascript says it is Sunday.
    var dayOfWeek = (date.getDay() + 6) % 7;
    var currentMonth = date.getMonth();
    var dayValue = 1;
    var index = dayOfWeek;
    var firstIndex = index;
    var lastIndex = index;
    while (date.getMonth() == currentMonth) {
        lastIndex = index;
        var cell = CalendarCell[index++];
        cell.innerHTML = DayHtml (date);
        CellFromDate[dayValue] = cell;
        date.setDate (++dayValue);
    }

    // Blank out all slots before and after the ones we used for this month.
    for (index=0; index < 42; ++index) {
        var cell = CalendarCell[index];
        if (index < firstIndex || index > lastIndex) {
            cell.innerHTML = "";
            //cell.style.borderStyle = "none";
        } else {
            //cell.style.borderStyle = "solid";
        }
    }
    
    // Show/hide rows based on whether there are any days in this month for it...
    var lastRow = Math.floor (lastIndex / 7);
    for (var y=0; y < 6; ++y) {
        var row = $.$.i("RowCalendar_" + y);
        row.style.display = (y <= lastRow) ? "" : "none";
    }

    var now = new DateTime();
    if (CalendarDate.getFullYear() == now.getFullYear() && CalendarDate.getMonth() == now.getMonth()) {
        DetailsAboutDate (CalendarDate);
    }
}

function Unhighlight()
{
    if (HighlightedCell != null) {
        HighlightedCell.style.backgroundColor = "";
    }

    var div = $.$.i('divExtraDayInfo');
    div.innerHTML = "<i>Click a day number above to see more info about it here.</i>";
    div.style.backgroundColor = "";
}

function TimeString (base, day)
{
    if (day == null) {
        return "--:--:--";
    } else {
        var date = Astronomy.DayValueToDate (day);
        if (date.getFullYear() != base.getFullYear() || date.getMonth() != base.getMonth() || date.getDate() != base.getDate()) {
            return "--:--:--";
        } else {
            var h = date.getHours();
            h = ((h < 10) ? "0" : "") + h.toString();
            var m = date.getMinutes();
            m = ((m < 10) ? "0" : "") + m.toString();
            var s = date.getSeconds();
            s = ((s < 10) ? "0" : "") + s.toString();
            return h + ":" + m + ":" + s;
        }
    }
}

function CreateDate (y, m, d)
{
    var date = new Date();
    date.setFullYear (y, m-1, d);
    date.setHours (0, 0, 0, 0);
    return date;
}

function DetailsAboutDay (y, m, d)
{
    var date = CreateDate (y, m, d);
    DetailsAboutDate (date);
}

function DetailsAboutDate (date)
{
    Unhighlight();
    var div = $.$.i('divExtraDayInfo');
    var day = Astronomy.DayValue (date);
    var info = RecallCachedInfoForDate (date);
    var evtlist = info.evtlist;

    var html;
    if (info.details != null) {
        html = info.details;
    } else {
        html = date.toLocaleDateString();
        html += "<tt>";
        
        var all = [];
        for (var i in evtlist) {
            all.push (evtlist[i]);
        }
        
        all.push ( { 'time':TimeString(date, Astronomy.NextRiseTime (Astronomy.Sun,  day, GeographicLocation)), 'description':'Sunrise'  } );
        all.push ( { 'time':TimeString(date, Astronomy.NextSetTime  (Astronomy.Sun,  day, GeographicLocation)), 'description':'Sunset'   } );
        all.push ( { 'time':TimeString(date, Astronomy.NextRiseTime (Astronomy.Moon, day, GeographicLocation)), 'description':'Moonrise' } );
        all.push ( { 'time':TimeString(date, Astronomy.NextSetTime  (Astronomy.Moon, day, GeographicLocation)), 'description':'Moonset'  } );
        
        all.sort (SortEventFunction);

        for (var i=0; i < all.length; ++i) {
            html += "<br/>" + all[i].time + "&nbsp;" + all[i].description;
        }

        html += "</tt>";
        info.details = html;
    }

    div.innerHTML = html;
    div.style.backgroundColor = HIGHLIGHT_COLOR;
    HighlightedCell = CellFromDate[date.getDate()];
    if (HighlightedCell != null) {
        HighlightedCell.style.backgroundColor = HIGHLIGHT_COLOR;
    }
}

function PushEvent (evtlist, description, timestr)
{
    evtlist.push ( { 'description': description, 'time': timestr } );
}

function DayHtml (date)
{
    var info = RecallCachedInfoForDate (date);      // see if we have already done the time-consuming calculations
    if (info == null) {
        info = CalcDayHtml (date);                  // we need to crunch the numbers now
        StoreCachedInfoForDate (date, info);        // remember for the next time we need the info so we can get it back FAST
    }
    return info.html;
}

function CalcDayHtml (date)
{
    var html = "<a href='javascript:DetailsAboutDay("+date.getFullYear()+","+(date.getMonth()+1)+","+date.getDate()+")' title='Click to see details in box below'>" + date.getDate() + "</a>";

    var day = Astronomy.DayValue (date);
    var evtlist = [];

    var EARTH_UMBRA_RADIUS_IN_DEGREES = 0.70;      // FIXFIXFIX: Calculate based on actual event geometry.
    var MOON_RADIUS_IN_DEGREES = 0.26;             // FIXFIXFIX: Calculate based on actual event geometry.

    var evt;
    var timestr;
    var title;
    var verbose;
    var link;

    html += "<center>";

    // Look for moon phases.
    var moonlon = Astronomy.RelativeLongitude (Astronomy.Moon, day);    // Save computation time by looking at moon longitude to determine which phases are possible.
    if (AnglesInOrder (-15.0, moonlon, 15.0)) {
        evt = Astronomy.NextNewMoon (day, 1.0, 1);
        if (evt != null) {
            timestr = TimeString(date,evt);
            title = "New Moon at " + timestr;
            html += "<br/><img src='./img/astrocal_new_moon.gif' width='33' height='33' alt='"+title+"' title='"+title+"' />";
            PushEvent (evtlist, "New Moon", timestr);
        }
    } else if (AnglesInOrder (75.0, moonlon, 105.0)) {
        evt = Astronomy.NextMoonFirstQuarter (day, 1.0, 1);
        if (evt != null) {
            timestr = TimeString(date,evt);
            title = "Moon 1st Quarter at " + timestr;
            html += "<br/><img src='./img/astrocal_first_quarter.gif' width='33' height='33' alt='"+title+"' title='"+title+"' />";
            PushEvent (evtlist, "Moon 1st Quarter", timestr);
        }
    } else if (AnglesInOrder (165.0, moonlon, 195.0)) {
        // Look for lunar eclipse before looking for full moon.
        // If there is a lunar eclipse, that icon trumps the full moon icon!
        evt = Astronomy.NextMaxSunAngle (Astronomy.Moon, day, 1.0, 1);
        var foundLunarEclipse = false;
        if (evt != null) {
            // The moment of maximum sun angle isn't usually a lunar eclipse.
            // But when it is, we catch it here...
            var sunAngle = Astronomy.AngleWithSunInDegrees (Astronomy.Moon, evt);
            var eclipseAngle = 180.0 - sunAngle;

            // I am ignoring penumbral eclipses, because they are not very noticeable.
            // For now I am reporting partial and total eclipses only...
            if (eclipseAngle <= MOON_RADIUS_IN_DEGREES + EARTH_UMBRA_RADIUS_IN_DEGREES) {
                // The moon at least touches the Earth's umbra.
                foundLunarEclipse = true;       // we are going to emit a special icon, so this will suppress the normal full moon icon.
                link = "<a href='http://en.wikipedia.org/wiki/Lunar_eclipse' target='_blank'>Lunar Eclipse</a>";
                timestr = TimeString(date,evt);
                if (eclipseAngle <= EARTH_UMBRA_RADIUS_IN_DEGREES - MOON_RADIUS_IN_DEGREES) {
                    title = "Total Lunar Eclipse at " + timestr;
                    html += "<br/><img src='./img/astrocal_total_lunar_eclipse.gif' width='33' height='33' alt='"+title+"' title='"+title+"' />";
                    PushEvent (evtlist, "Total " + link, timestr);
                } else {
                    title = "Partial Lunar Eclipse at " + timestr;
                    html += "<br/><img src='./img/astrocal_partial_lunar_eclipse.gif' width='33' height='33' alt='"+title+"' title='"+title+"' />";
                    PushEvent (evtlist, "Partial " + link, timestr);
                }
            }

        }

        evt = Astronomy.NextFullMoon (day, 1.0, 1);
        if (evt != null) {
            timestr = TimeString(date,evt);
            title = "Full Moon at " + timestr;
            if (!foundLunarEclipse) {
                html += "<br/><img src='./img/astrocal_full_moon.gif' width='33' height='33' alt='"+title+"' title='"+title+"' />";
            }
            PushEvent (evtlist, "Full Moon", timestr);
        }
    } else if (AnglesInOrder (255.0, moonlon, 285.0)) {
        evt = Astronomy.NextMoonThirdQuarter (day, 1.0, 1);
        if (evt != null) {
            timestr = TimeString(date,evt);
            title = "Moon 3rd Quarter at " + timestr;
            html += "<br/><img src='./img/astrocal_third_quarter.gif' width='33' height='33' alt='"+title+"' title='"+title+"' />";
            PushEvent (evtlist, "Moon 3rd Quarter", timestr);
        }
    }

    // Look for Moon perigee.
    evt = Astronomy.NextMoonPerigee (day, 1.0, 1);
    if (evt != null) {
        distanceInKm = Math.round(Astronomy.Moon.DistanceFromEarth(evt) * (METERS_PER_ASTRONOMICAL_UNIT / 1000.0));
        timestr = TimeString(date,evt);
        title = 'Moon perigee';
        verbose = 'Moon perigee at ' + timestr + ' (' + distanceInKm + ' km)';
        html += '<br/>' + title;
        PushEvent (evtlist, verbose, timestr);
    }

    // Look for Moon apogee.
    evt = Astronomy.NextMoonApogee (day, 1.0, 1);
    if (evt != null) {
        distanceInKm = Math.round(Astronomy.Moon.DistanceFromEarth(evt) * (METERS_PER_ASTRONOMICAL_UNIT / 1000.0));
        timestr = TimeString(date,evt);
        title = 'Moon apogee';
        verbose = 'Moon apogee at ' + timestr + ' (' + distanceInKm + ' km)';
        html += '<br/>' + title;
        PushEvent (evtlist, verbose, timestr);
    }

    // Look for opposition of superior planets.
    link = "http://en.wikipedia.org/wiki/Opposition_(planets)";
    for (var i=0; i < SuperiorPlanets.length; ++i) {
        var planet = Astronomy[SuperiorPlanets[i]];
        evt = Astronomy.NextOpposition (planet, day, 1.0, 1);
        if (evt != null) {
            timestr = TimeString(date,evt);
            title = planet.Name + " <a href='"+link+"' target='_blank' title='Opposition at "+timestr+"'>opposition</a>";
            verbose = planet.Name + " <a href='"+link+"' target='_blank'>opposition</a>";
            html += "<br/>" + title;
            PushEvent (evtlist, verbose, timestr);
        }
    }

    // Look for conjunction of all planets with Sun...
    link = "http://en.wikipedia.org/wiki/Conjunction_(astronomy_and_astrology)#Superior_and_inferior";
    for (var i=0; i < AllPlanetsButEarth.length; ++i) {
        var planet = Astronomy[AllPlanetsButEarth[i]];
        evt = Astronomy.NextConjunction (planet, day, 1.0, 1);
        if (evt != null) {
            timestr = TimeString(date,evt);
            if (Astronomy.PlanetNumber[planet.Name] < 3) {
                // inferior planet: need to classify as inferior or superior conjunction...
                var distance = planet.DistanceFromEarth (evt);
                if (distance > 1.0) {
                    title = planet.Name + " <a href='"+link+"' title='Superior Conjunction at "+timestr+"' target='_blank'>sup conj</a>";
                    verbose = planet.Name + " <a href='"+link+"' target='_blank'>superior conjunction</a>";
                } else {
                    title = planet.Name + " <a href='"+link+"' title='Inferior Conjunction at "+timestr+"' target='_blank'>inf conj</a>";
                    verbose = planet.Name + " <a href='"+link+"' target='_blank'>inferior conjunction</a>";
                }
            } else {
                title = planet.Name + " <a href='"+link+"' title='Conjunction at "+timestr+"' target='_blank'>conj</a>";
                verbose = planet.Name + " <a href='"+link+"' target='_blank'>conjunction</a>";
            }
            html += "<br/>" + title;
            PushEvent (evtlist, verbose, timestr);
        }
    }

    // Look for conjunction of Moon and/or bright planets with each other.
    // The two objects must be within a certain angle in order to be considered interesting.
    // They also must be far enough away from the Sun to be visible.
    var BODY_ANGLE_THRESHOLD = 4.0;
    var SUN_ANGLE_THRESHOLD = 15.0;
    for (var i=0; i < BrightObjects.length - 1; ++i) {
        var body1 = Astronomy[BrightObjects[i]];
        for (var j=i+1; j < BrightObjects.length; ++j) {
            var body2 = Astronomy[BrightObjects[j]];
            evt = Astronomy.NextMinAngleWithOtherBody (body1, day, 1, 1, body2);
            if (evt != null) {
                var bodyAngle = Astronomy.AngleBetweenBodiesInDegrees (body1, body2, evt);
                if (bodyAngle <= BODY_ANGLE_THRESHOLD) {
                    var sunAngle1 = Astronomy.AngleWithSunInDegrees (body1, evt);
                    var sunAngle2 = Astronomy.AngleWithSunInDegrees (body2, evt);
                    if ((sunAngle1 >= SUN_ANGLE_THRESHOLD) && (sunAngle2 >= SUN_ANGLE_THRESHOLD)) {
                        timestr = TimeString(date,evt);
                        title = body1.Name + "/" + body2.Name + ": " + bodyAngle.toFixed(1) + "&deg;";
                        verbose = body1.Name + " " + bodyAngle.toFixed(1) + "&deg; from " + body2.Name;
                        html += "<br/>" + title;
                        PushEvent (evtlist, verbose, timestr);
                    }
                }
            }
        }
    } 

    // Look for maximum elongation of inferior planets.
    link = "http://en.wikipedia.org/wiki/Elongation_%28astronomy%29";
    for (var i=0; i < InferiorPlanets.length; ++i) {
        var planet = Astronomy[InferiorPlanets[i]];
        evt = Astronomy.NextMaxSunAngle (planet, day, 1.0, 1);
        if (evt != null) {
            var rlon = Astronomy.RelativeLongitude (planet, evt);
            if (rlon > 180.0) {
                rlon -= 360.0;
            }
            timestr = TimeString(date,evt);
            title = planet.Name + ((rlon < 0) ? " max west" : " max east");
            verbose = title + "ern <a href='" + link + "' target='_blank'>elongation</a> = " + Math.abs(rlon).toFixed(2) + "&deg;";
            title = "<a href='" + link + "' title='Maximum Elongation at "+timestr+"' target='_blank'>" + title + "</a>";
            html += "<br/>" + title;
            PushEvent (evtlist, verbose, timestr);
        }
    }

    // Look for peak visual magnitude of Venus
    var rlon = Astronomy.RelativeLongitude (Astronomy.Venus, day);
    if (rlon > 180.0) {
        rlon -= 360.0;
    }
    if (Math.abs(rlon) > 20.0) {    // Make sure we filter out the useless peak maginitude that happens at superior conjunction
        evt = Astronomy.NextPeakVisualMagnitude (Astronomy.Venus, day, 1.0, 1);
        if (evt != null) {
            var mag = Astronomy.Venus.VisualMagnitude(evt);
            mag = (mag < 0) ? ("&minus;" + (-mag).toFixed(2)) : mag.toFixed(2);
            link = "http://en.wikipedia.org/wiki/Apparent_magnitude";
            timestr = TimeString (date, evt);
            title = "Venus <a href='' target='_blank' title='Peak Visual Magnitude at "+timestr+"'>mag</a> " + mag;
            verbose = "Venus peak visual magnitude = " + mag;
            html += "<br/>" + title;
            PushEvent (evtlist, verbose, timestr);
        }
    }

    // Look for equinox/solstice
    if (date.getDate() >= 19 && date.getDate() <= 24) {     // not sure about this range: may need to widen it
        evt = null;
        var which;
        switch (1 + date.getMonth()) {      // Note that date.getMonth() returns 0=January, ... , 11=December.
            case 3:     // March: look for vernal equinox
                evt = Astronomy.NextVernalEquinox (day, 1.0, 1);
                which = "Equinox";
                title = "Vernal <a href='http://en.wikipedia.org/wiki/Equinox' target='_blank' TIMESTAMP>Equinox</a>";
                break;

            case 6:     // June:  look for northern solstice
                which = "Solstice";
                evt = Astronomy.NextNorthernSolstice (day, 1.0, 1);
                title = "Northern <a href='http://en.wikipedia.org/wiki/Solstice' target='_blank' TIMESTAMP>Solstice</a>";
                break;

            case 9:     // September: look for autumnal equinox
                which = "Equinox";
                evt = Astronomy.NextAutumnalEquinox (day, 1.0, 1);
                title = "Autumnal <a href='http://en.wikipedia.org/wiki/Equinox' target='_blank' TIMESTAMP>Equinox</a>";
                break;

            case 12:    // December: look for southern solstice
                which = "Solstice";
                evt = Astronomy.NextSouthernSolstice (day, 1.0, 1);
                title = "Southern <a href='http://en.wikipedia.org/wiki/Solstice' target='_blank' TIMESTAMP>Solstice</a>";
                break;
        }
        if (evt != null) {
            timestr = TimeString(date,evt);
            html += "<br/>" + title.replace("TIMESTAMP", "title='" + which + " at " + timestr + "'");
            PushEvent (evtlist, title.replace("TIMESTAMP",""), timestr);
        }
    }

    html += "</center>";
    
    return { 'html': html, 'evtlist': evtlist };
}

function SortEventFunction (a, b)
{
    if (a.time < b.time) {
        return -1;
    } else if (a.time > b.time) {
        return +1;
    } else {
        return 0;
    }
}


function ChangeMonth(delta)
{
    var now = new Date();
    var year = CalendarDate.getFullYear();
    var month = CalendarDate.getMonth() + delta;
    if (month == -1) {
        month = 11;
        --year;
    } else if (month == 12) {
        month = 0;
        ++year;
    }

    if (now.getFullYear() == year && now.getMonth() == month) {
        SetCurrentDate();
    } else {
        CalendarDate.setFullYear(year);
        CalendarDate.setMonth(month, 1);
        RegenerateCalendar();
    }
}

function SetCurrentDate()
{
    SetCalendarDate(new Date());
}