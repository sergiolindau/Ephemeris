/***********************************************************************
 Sky View Panel
 
 Copyright (c) 2018 Sergio Lindau

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
/***********************************************************************/

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
if (AstroCanvas) {
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

