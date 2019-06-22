/***********************************************************************
 Calendar Panel
 
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