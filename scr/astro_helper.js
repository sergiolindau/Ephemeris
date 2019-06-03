var AngleMode = "dms";

function HtmlRightAscension (ra, mode)
{
    if (mode == null) {
        mode = AngleMode;
    }
    
    switch (mode) {
        case "dms":
            // 23<sup>h</sup>14<sup>m</sup>16<sup>s</sup>
            var dms = AngleX.DMS (ra);
            if (dms.negative) {
                throw "Encountered negative right ascension!  " + ra;
            }
            
            var hours   = (dms.degrees < 10 ? "0" : "") + dms.degrees.toString();
            var minutes = (dms.minutes < 10 ? "0" : "") + dms.minutes.toString();
            var seconds = (dms.seconds < 10 ? "0" : "") + dms.seconds.toFixed(1);
            var s = hours + "<sup class='UnitSup'>h</sup>&nbsp;" + minutes + "<sup class='UnitSup'>m</sup>&nbsp;" + seconds + "<sup class='UnitSup'>s</sup>";
            return s;
            
        case "dmm":
            // 23<sup>h</sup>14.27<sup>m</sup>
            var dms = AngleX.DMM (ra);
            if (dms.negative) {
                throw "Encountered negative right ascension!  " + ra;
            }

            var hours   = (dms.degrees < 10 ? "0" : "") + dms.degrees.toString();
            var minutes = (dms.minutes < 10 ? "0" : "") + dms.minutes.toFixed(2);            
            var s = hours + "<sup class='UnitSup'>h</sup>&nbsp;" + minutes + "<sup class='UnitSup'>m</sup>";
            return s;
            
        case "decimal":
            return ra.toFixed(5) + "<sup class='UnitSup'>h</sup>";
            
        default:
            throw "HtmlRightAscension:  Unknown angle mode '" + mode + "'";
    }    
}

function HtmlDeclination (dec, mode)
{
    if (mode == null) {
        mode = AngleMode;
    }
    
    switch (mode) {
        case "dms":
            var dms = AngleX.DMS (dec);
            var s = dms.negative ? "&minus;" : "&nbsp;";
            
            if (dms.degrees < 100) {
                s += "0";
            }
            
            var hours   = (dms.degrees < 10 ? "0" : "") + dms.degrees.toString();
            var minutes = (dms.minutes < 10 ? "0" : "") + dms.minutes.toString();
            var seconds = (dms.seconds < 10 ? "0" : "") + dms.seconds.toFixed(1);
            s += hours + "&deg;&nbsp;" + minutes + "'&nbsp;" + seconds + "&quot;";
            return s;

        case "dmm":
            var dms = AngleX.DMM (dec);
            var s = dms.negative ? "&minus;" : "&nbsp;";
            
            if (dms.degrees < 100) {
                s += "0";
            }
            
            var hours   = (dms.degrees < 10 ? "0" : "") + dms.degrees.toString();
            var minutes = (dms.minutes < 10 ? "0" : "") + dms.minutes.toFixed(2);
            s += hours + "&deg;&nbsp;" + minutes + "'&nbsp;";
            return s;

        case "decimal":
            return dec.toFixed(5) + "&deg;";
            
        default:
            throw "HtmlDeclination:  Unknown angle mode '" + mode + "'";                
    }
}

function HtmlConstellation (eq)
{
    var c = Astronomy.FindConstellation (eq);
    if (c == null) {
        return "<span title='Cannot determine constellation'>???</span>";
    } else {
        var verboseName = ConstellationByConciseName[c.ConciseName].FullName;
        return "<span title='" + verboseName + "'>" + c.ConciseName + "</span>";
    }
}

function ShowAngleFeedback (divName, value, editName)
{
    var isDMS = ($$.i(editName).value.indexOf(":") >= 0);
    var feedback;
    
    if (isDMS) {
        // user entered dd:mm:ss, so show feedback in pure decimal
        feedback = HtmlDeclination (value, "decimal");
    } else {
        // user entered pure decimal, so show feedback in dd:mm:ss
        feedback = HtmlDeclination (value, "dms");
    }
    
    $$.i(divName).innerHTML = '&nbsp;=&nbsp;' + feedback;        
}

function CommitGeographicCoordinates()
{
    var lat = ParseAngle ($$.i('GeoLat_Value').value);
    var lon = ParseAngle ($$.i('GeoLong_Value').value);

    if (lat == null) {
        alert ("The geographic latitude you have entered is not valid. It must be between 0 and 90 degrees.  You may enter it with a decimal fraction, or in ddd:mm:ss notation.");
        $$.i('GeoLat_Value').focus();
    }
    
    if (lon == null) {
        alert ("The geographic longitude you have entered is not valid. It must be between 0 and 180 degrees.  You may enter it with a decimal fraction, or in dd:mm:ss notation.");
        $$.i('GeoLong_Value').focus();
    }
    
    if ((lat != null) && (lon != null)) {
        if ($$.i('GeoLat_NS').selectedIndex == 1) {
            lat *= -1.0;
        }
        
        if ($$.i('GeoLong_EW').selectedIndex == 0) {
            lon *= -1.0;
        }            
    
        GeographicLatitude = lat;
        GeographicLongitude = lon;
        ShowAngleFeedback ('GeoLat_Feedback',  lat, 'GeoLat_Value');
        ShowAngleFeedback ('GeoLong_Feedback', lon, 'GeoLong_Value');
        return true;    // valid
    } else {
        return false;   // not valid
    }
}

function SaveGeographicCoordinates()
{
    if (CommitGeographicCoordinates()) {
        var expiration = 3650;  // 10 years
    
        Cookie.write ("GeographicLatitudeValue",  $$.i('GeoLat_Value').value,  expiration);
        Cookie.write ("GeographicLongitudeValue", $$.i('GeoLong_Value').value, expiration);
        
        Cookie.write ("GeographicLatitudeDirection",  (($$.i('GeoLat_NS') .selectedIndex == 0) ? "N" : "S"), expiration);
        Cookie.write ("GeographicLongitudeDirection", (($$.i('GeoLong_EW').selectedIndex == 0) ? "W" : "E"), expiration);
        
        $$.i('SaveButton').disabled = true;
    }
}

function LoadGeographicCoordinates()
{
    $$.i('GeoLat_Value').value  = Cookie.read ("GeographicLatitudeValue",  "27.41305");
    $$.i('GeoLong_Value').value = Cookie.read ("GeographicLongitudeValue", "82.66034");
    
    $$.i('GeoLat_NS').selectedIndex  = Cookie.read("GeographicLatitudeDirection","N")  == "N" ? 0 : 1;
    $$.i('GeoLong_EW').selectedIndex = Cookie.read("GeographicLongitudeDirection","W") == "W" ? 0 : 1;
    
    CommitGeographicCoordinates();
}


function OnGeoLatLongChange()
{
    $$.i('SaveButton').disabled = false;
}


function ParseAngle (s, max)
{
    // Look for 1..3 floating pointer numbers, delimited by colons.
    // For example:  37.35   or   43:15.373   or  23:44:55.7  
    // These represent degrees[:minutes[:seconds]].
    // We ignore any white space outside the floating point numbers.
    var angle = null;
    var array = s.split(/\s*:\s*/);
    if (array.length >= 1 && array.length <= 3) {
        var denom = 1.0;
        angle = 0.0;
        for (var i=0; i < array.length; ++i) {
            if (!RegExp_Float.test(array[i])) {
                return null;    // does not look like a valid floating point number
            }
            
            var x = parseFloat (array[i]);
            if (isNaN(x)) {
                return null;    // could not parse a floating point number
            }
            
            if (x < 0) {
                return null;    // user must specify direction by using E/W, N/S controls, not '+' or '-'.
            }
            if (i > 0) {
                if (x >= 60.0) {
                    return null;    // not a valid minute or second value
                }
            }
            
            angle += x / denom;
            denom *= 60.0;
        }
        
        if (angle < 0.0 || angle > max) {
            return null;
        }
    }
    return angle;
}


/*
    $Log: astro_helper.js,v $
    Revision 1.3  2009/03/08 00:02:10  Don.Cross
    My C# astro.exe (compiled as sun.exe) now has a "javascript" option that generates constellation.js.
    This new constellation.js file contains the data needed for constellation calculation based on equatorial coordinates.
    I updated my astronomy.js code to allow use of this data to determine a constellation.
    The page solar_system.html uses this now to show the concise constellation symbol for each celestial body.

    Revision 1.2  2008/04/06 21:16:09  Don.Cross
    Users seem confused when confronted with the colon-notation the first time entering geographic coordinates.
    I am changing the default to a real location (Cambridge, MA) but making it decimal instead of dd:mm:ss.

    Revision 1.1  2008/02/22 23:11:29  Don.Cross
    Starting to work on graphical sky view in JavaScript.
    Factored out some code for managing user's geographic location in cookies and form elements
     from solar_system.html into new file astro_helper.js.
    Adding star_catalog.js, which was translated from text file by my GenStarMapJS.exe program.

*/
