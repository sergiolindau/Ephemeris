      var Flag_RealTimeUpdate = true;
      var CartesianCoordinateType = "heliocentric";
      var CartesianCoordinateColor = { 'geocentric': "#cfffcf", 'heliocentric': "#ffff9f", 'none':"#000000" };
      var AngularCoordinateType = "equatorial";
      var AngularCoordinateColor = { 'equatorial': "#ccff80", 'ecliptic': "ffdf80", 'horizontal': "ccccff" };
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
                              var cell = $(name + CellSuffix[i]);
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
  
          Cookie.write ("AngularCoordinateType", id.substring("rb_Angular_".length), COOKIE_EXPIRATION_DAYS);
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
