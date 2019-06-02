/*
 Astronomy routines for Javascript

 Copyright (c) 2017 Sergio Lindau

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
 THE SOFTWARE.*/

//https://www.astro.com/swisseph/sweph_ht_e.htm
/***********************************************************************
 Constant AstronomyS definition
 
 Include before this file mathext.js using:
 
 <script language="javascript" src="mathext.js"></script>

************************************************************************/
var AstronomyS = {
	S2R : Math.PI/(12*60*60),
	METERS_PER_ASTRONOMICAL_UNIT : 1.4959787e+11,
	METERS_PER_EARTH_EQUATORIAL_RADIUS : 6378140.0,
	EARTH_RADII_PER_ASTRONOMICAL_UNIT : this.METERS_PER_ASTRONOMICAL_UNIT / this.METERS_PER_EARTH_EQUATORIAL_RADIUS, // 23454.78
	BI00 :{
		dpsibi : -0.041775  * Math.AS2R,
		depsbi : -0.0068192 * Math.AS2R,
		DRA0 : -0.0146 * Math.AS2R
	},

	pr00 : function(c) {
/***********************************************************************
 Name:    era00
 Type:    Function
 Purpose: Precession-rate part of the IAU 2000 precession-nutation models (part of MHB2000).
 Arguments:
   j: TT as a Julian centuries since J2000.0.
 Return value:
   Precession corrections.
***********************************************************************/
		return [-0.29965 * Math.AS2R * c, -0.02524 * Math.AS2R * c];
	},
	
	era00 : function(c) {
/***********************************************************************
 Name:    era00
 Type:    Function
 Purpose: Earth rotation angle (IAU 2000 model).
 Arguments:
   c: UT1 as a Julian centuries since J2000.0.
 Return value:
   Earth rotation angle (radians), range 0-2pi (float).
***********************************************************************/
	var t = c * 36525;
		return Math.revr(Math.PI2 * ((t % 1.0) + 0.7790572732640 + 0.00273781191135448 * t));
	},
	
	gmst00 : function(c,t) {
/***********************************************************************
 Name:    gmst00
 Type:    Function
 Purpose: Greenwich mean sidereal time (model consistent with IAU 2000 resolutions).
 Arguments:
   c: UT1 as a Julian centuries since J2000.0.
   t: TT as a Julian centuries since J2000.0.
 Return value:
   Greenwich mean sidereal time (radians) (float).
***********************************************************************/
	return Math.revr(AstronomyS.era00(c) +
                   (     0.014506   +
                   (  4612.15739966 +
                   (     1.39667721 +
                   (    -0.00009344 +
                   (     0.00001882 )
          * t) * t) * t) * t) * Math.AS2R);
	},
	
	gmst06 : function(c,t) {
/***********************************************************************
 Name:    gmst06
 Type:    Function
 Purpose: Greenwich mean sidereal time (consistent with IAU 2006 precession).
 Arguments:
   c: UT1 as a Julian centuries since J2000.0.
   t: TT as a Julian centuries since J2000.0.
 Return value:
   Greenwich mean sidereal time (radians) (float).
***********************************************************************/
	return Math.revr(AstronomyS.era00(c) +
                  (    0.014506     +
                  (  4612.156534    +
                  (     1.3915817   +
                  (    -0.00000044  +
                  (    -0.000029956 +
                  (    -0.0000000368 )
          * t) * t) * t) * t) * t) * Math.AS2R);
	},
	
	gmst82 : function(t) {
/***********************************************************************
 Name:    gmst82
 Type:    Function
 Purpose: Universal Time to Greenwich mean sidereal time (IAU 1982 model).
 Arguments:
   j: UT1 as a Julian centuries since J2000.0.
 Return value:
   Greenwich mean sidereal time (radians) (float).
***********************************************************************/
/* Coefficients of IAU 1982 GMST-UT1 model */
   const A = 24110.54841  -  DAYSEC / 2.0;
   const B = 8640184.812866;
   const C = 0.093104;
   const D =  -6.2e-6;

/* Note: the first constant, A, has to be adjusted by 12 hours */
/* because the UT1 is supplied as a Julian date, which begins  */
/* at noon.                                                    */

   var d1, d2, t, f, gmst;

/* Julian centuries since fundamental epoch. */
//   t = (j - Calendar.DJ00) / Calendar.DJC;

/* Fractional part of JD(UT1), in seconds. */
   f = DAYSEC * ((t*36525) % 1.0);
//   f = DAYSEC * (j % 1.0);

/* GMST at this UT1. */
   return Math.revr(Math.AS2R * ((A + (B + (C + D * t) * t) * t) + f));
	},
	
	obl80 : function(t) {
/***********************************************************************
 Name:    obl80
 Type:    Function
 Purpose: Mean obliquity of the ecliptic, IAU 1980 model.
 Arguments:
   j: TT as a Julian centuries since J2000.0.
 Return value:
   obliquity of the ecliptic (radians) (float).

***********************************************************************/
		return Math.AS2R * (84381.448  +
                  (-46.8150   +
                  (-0.00059   +
                  ( 0.001813) * t) * t) * t);
	},

	calcGeomMeanLongSun : function(t) {
/***********************************************************************
 Name:    calcGeomMeanLongSun
 Type:    Function
 Purpose: calculate the Geometric Mean Longitude of the Sun
 Arguments:
   t : number of Julian centuries since J2000.0
 Return value:
   the Geometric Mean Longitude of the Sun in degrees
**********************************************************************/
		return Math.revd(280.46646 + t * (36000.76983 + 0.0003032 * t));		// in degrees
	},

	calcGeomMeanAnomalySun : function(t) {
/***********************************************************************
 Name:    calcGeomMeanAnomalySun
 Type:    Function
 Purpose: calculate the Geometric Mean Anomaly of the Sun
 Arguments:
   t : number of Julian centuries since J2000.0
 Return value:
   the Geometric Mean Anomaly of the Sun in degrees
**********************************************************************/
		return 357.52911 + t * (35999.05029 - 0.0001537 * t);		// in degrees
	},

	calcEccentricityEarthOrbit : function(t) {
/***********************************************************************
 Name:    calcEccentricityEarthOrbit
 Type:    Function
 Purpose: calculate the eccentricity of earth's orbit
 Arguments:
   t : number of Julian centuries since J2000.0
 Return value:
   the unitless eccentricity
**********************************************************************/
		return 0.016708634 - t * (0.000042037 + 0.0000001267 * t);		// unitless
	},

	calcSunEqOfCenter : function(t) {
/***********************************************************************
 Name:    calcSunEqOfCenter
 Type:    Function
 Purpose: calculate the equation of center for the sun
 Arguments:
   t : number of Julian centuries since J2000.0
 Return value:
   in degrees
**********************************************************************/
		var m = AstronomyS.calcGeomMeanAnomalySun(t);
		return Math.sind(m) * (1.914602 - t * (0.004817 + 0.000014 * t)) + Math.sind(2*m) * (0.019993 - 0.000101 * t) + Math.sind(3*m) * 0.000289;		// in degrees
	},

	calcSunTrueLong : function(t) {
/***********************************************************************
 Name:    calcSunTrueLong
 Type:    Function
 Purpose: calculate the true longitude of the sun
 Arguments:
   t : number of Julian centuries since J2000.0
 Return value:
   sun's true longitude in degrees
**********************************************************************/
		return AstronomyS.calcGeomMeanLongSun(t) + AstronomyS.calcSunEqOfCenter(t);		// in degrees
	},

	calcSunTrueAnomaly : function(t) {
/***********************************************************************
 Name:    calcSunTrueAnomaly
 Type:    Function
 Purpose: calculate the true anamoly of the sun
 Arguments:
   t : number of Julian centuries since J2000.0
 Return value:
   sun's true anamoly in degrees
**********************************************************************/
		return AstronomyS.calcGeomMeanAnomalySun(t) + AstronomyS.calcSunEqOfCenter(t);		// in degrees
	},

	calcSunRadVector : function(t) {
/***********************************************************************
 Name:    calcSunRadVector
 Type:    Function
 Purpose: calculate the distance to the sun in AU
 Arguments:
   t : number of Julian centuries since J2000.0
 Return value:
   sun radius vector in AUs
**********************************************************************/
		var e = AstronomyS.calcEccentricityEarthOrbit(t);
		return (1.000001018 * (1 - e * e)) / (1 + e * Math.cosd(AstronomyS.calcSunTrueAnomaly(t)));		// in AUs
	},

	calcSunApparentLong : function(t) {
/***********************************************************************
 Name:    calcSunApparentLong
 Type:    Function
 Purpose: calculate the apparent longitude of the sun
 Arguments:
   t : number of Julian centuries since J2000.0
 Return value:
   sun's apparent longitude in degrees
**********************************************************************/
		return AstronomyS.calcSunTrueLong(t) - 0.00569 - 0.00478 * Math.sind(125.04 - 1934.136 * t);		// in degrees
	},

	calcMeanObliquityOfEcliptic : function(t) {
/***********************************************************************
 Name:    calcMeanObliquityOfEcliptic
 Type:    Function
 Purpose: calculate the mean obliquity of the ecliptic
 Arguments:
   t : number of Julian centuries since J2000.0
 Return value:
   mean obliquity in degrees
**********************************************************************/
		return 23.0 + (26.0 + (21.448 - t*(46.8150 + t*(0.00059 - t*(0.001813))))/60.0)/60.0;		// in degrees
	},

	calcObliquityCorrection : function(t) {
/***********************************************************************
 Name:    calcObliquityCorrection
 Type:    Function
 Purpose: calculate the corrected obliquity of the ecliptic
 Arguments:
   t : number of Julian centuries since J2000.0
 Return value:
   corrected obliquity in degrees
**********************************************************************/
		return AstronomyS.calcMeanObliquityOfEcliptic(t) + 0.00256 * Math.cosd(125.04 - 1934.136 * t);		// in degrees
	},

	calcSunRtAscension : function(t) {
/***********************************************************************
 Name:    calcSunRtAscension
 Type:    Function
 Purpose: calculate the right ascension of the sun
 Arguments:
   t : number of Julian centuries since J2000.0
 Return value:
   sun's right ascension in degrees
**********************************************************************/
		var lambda = AstronomyS.calcSunApparentLong(t);
		return Math.atan2d(Math.cosd(AstronomyS.calcObliquityCorrection(t)) * Math.sind(lambda), Math.cosd(lambda));		// in degrees
	},

	calcSunDeclination : function(t) {
/***********************************************************************
 Name:    calcSunDeclination
 Type:    Function
 Purpose: calculate the declination of the sun
 Arguments:
   t : number of Julian centuries since J2000.0
 Return value:
   sun's declination in degrees
**********************************************************************/
		return Math.asind(Math.sind(AstronomyS.calcObliquityCorrection(t)) * Math.sind(AstronomyS.calcSunApparentLong(t)));		// in degrees
	},

	calcEquationOfTime : function(t) {
/***********************************************************************
 Name:    calcEquationOfTime
 Type:    Function
 Purpose: calculate the difference between true solar time and mean solar time
 Arguments:
   t : number of Julian centuries since J2000.0
 Return value:
   equation of time in minutes of time
**********************************************************************/
		var l0 = Math.DEGRAD * AstronomyS.calcGeomMeanLongSun(t);
		var e = AstronomyS.calcEccentricityEarthOrbit(t);
		var m = Math.DEGRAD * AstronomyS.calcGeomMeanAnomalySun(t);

		var y = Math.tan(Math.DEGRAD * AstronomyS.calcObliquityCorrection(t)/2.0);
		y *= y;

		var sin2l0 = Math.sin(2.0 * l0);
		var sinm   = Math.sin(m);
		var cos2l0 = Math.cos(2.0 * l0);
		var sin4l0 = Math.sin(4.0 * l0);
		var sin2m  = Math.sin(2.0 * m);

		var Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0
				- 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;

		return Math.RADEG * Etime * 4.0;	// in minutes of time
	},

	calcHourAngleSunrise : function(lat, solarDec) {
/***********************************************************************
 Name:    calcHourAngleSunrise
 Type:    Function
 Purpose: calculate the hour angle of the sun at sunrise for the
			latitude
 Arguments:
   lat : latitude of observer in degrees
   solarDec : declination angle of sun in degrees
 Return value:
   hour angle of sunrise in radians
**********************************************************************/
		return Math.acos(Math.cosd(90.833)/(Math.cosd(lat)*Math.cosd(solarDec))-Math.tand(lat)*Math.tand(solarDec));		// in radians
	},

	calcHourAngleSunset : function(lat, solarDec) {
/***********************************************************************
 Name:    calcHourAngleSunset
 Type:    Function
 Purpose: calculate the hour angle of the sun at sunset for the
			latitude
 Arguments:
   lat : latitude of observer in degrees
   solarDec : declination angle of sun in degrees
 Return value:
   hour angle of sunset in radians
**********************************************************************/
		return -AstronomyS.calcHourAngleSunrise(lat, solarDec);		// in radians
	},

	calcSolNoonUTC : function(t, longitude) {
/***********************************************************************
 Name:    calcSolNoonUTC
 Type:    Function
 Purpose: calculate the Universal Coordinated Time (UTC) of solar
		noon for the given day at the given location on earth
 Arguments:
   t : number of Julian centuries since J2000.0
   longitude : longitude of observer in degrees
 Return value:
   time in minutes from zero Z
**********************************************************************/
		// First pass uses approximate solar noon to calculate eqtime
		var tnoon = t + longitude/13149.0e3;
		var eqTime = AstronomyS.calcEquationOfTime(tnoon);
		var solNoonUTC = 720 + (longitude * 4) - eqTime; // min
		var newt = t + (solNoonUTC/1440.0 - 0.5) / 36525; 
		return (longitude * 4) - AstronomyS.calcEquationOfTime(newt); // min
	},

	calcSunriseUTC : function(t, latitude, longitude) {
/***********************************************************************
 Name:    calcSunriseUTC
 Type:    Function
 Purpose: calculate the Universal Coordinated Time (UTC) of sunrise
			for the given day at the given location on earth
 Arguments:
   t : number of Julian centuries since J2000.0
   latitude : latitude of observer in degrees
   longitude : longitude of observer in degrees
 Return value:
   time in minutes from zero Z
**********************************************************************/
//		var t = Calendar.jd2cy(JD);

		// *** Find the time of solar noon at the location, and use
        //     that declination. This is better than start of the 
        //     Julian day
		var noonmin = AstronomyS.calcSolNoonUTC(t, longitude);
//		var tnoon = Calendar.jd2cy (JD+noonmin/1440.0);
		var tnoon = t + (noonmin/52596.0e3);

		// *** First pass to approximate sunrise (using solar noon)

		var eqTime = AstronomyS.calcEquationOfTime(tnoon);
		var solarDec = AstronomyS.calcSunDeclination(tnoon);
		var hourAngle = AstronomyS.calcHourAngleSunrise(latitude, solarDec);
		var delta = longitude - Math.RADEG * hourAngle;
		var timeDiff = 4 * delta;	// in minutes of time
		var timeUTC = 720 + timeDiff - eqTime;	// in minutes

		// *** Second pass includes fractional jday in gamma calc

//		var newt = Calendar.jd2cy(Calendar.cy2jd(t) + timeUTC/1440.0); 
		var newt = t + (timeUTC/52596.0e3); 
		eqTime = AstronomyS.calcEquationOfTime(newt);
		solarDec = AstronomyS.calcSunDeclination(newt);
		hourAngle = AstronomyS.calcHourAngleSunrise(latitude, solarDec);
		delta = longitude - Math.RADEG * hourAngle;
		timeDiff = 4 * delta;
		timeUTC = 720 + timeDiff - eqTime; // in minutes

		return timeUTC;
	},

	calcSunsetUTC : function(t, latitude, longitude) {
/***********************************************************************
 Name:    calcSunsetUTC
 Type:    Function
 Purpose: calculate the Universal Coordinated Time (UTC) of sunset
			for the given day at the given location on earth
 Arguments:
   t : number of Julian centuries since J2000.0
   latitude : latitude of observer in degrees
   longitude : longitude of observer in degrees
 Return value:
   time in minutes from zero Z
**********************************************************************/
//		var t = Calendar.jd2cy(JD);

		// *** Find the time of solar noon at the location, and use
        //     that declination. This is better than start of the 
        //     Julian day

		var noonmin = AstronomyS.calcSolNoonUTC(t, longitude);
//		var tnoon = Calendar.jd2cy (JD+noonmin/1440.0);
		var tnoon = t + (noonmin/52596.0e3);

		// First calculates sunrise and approx length of day

		var eqTime = AstronomyS.calcEquationOfTime(tnoon);
		var solarDec = AstronomyS.calcSunDeclination(tnoon);
		var hourAngle = AstronomyS.calcHourAngleSunset(latitude, solarDec);
		var delta = longitude - Math.RADEG * hourAngle;
		var timeDiff = 4 * delta;
		var timeUTC = 720 + timeDiff - eqTime;

		// first pass used to include fractional day in gamma calc

//		var newt = Calendar.jd2cy(Calendar.cy2jd(t) + timeUTC/1440.0); 
		var newt = t + (timeUTC/52596.0e3); 
		eqTime = AstronomyS.calcEquationOfTime(newt);
		solarDec = AstronomyS.calcSunDeclination(newt);
		hourAngle = AstronomyS.calcHourAngleSunset(latitude, solarDec);

		delta = longitude - Math.RADEG * hourAngle;
		timeDiff = 4 * delta;
		timeUTC = 720 + timeDiff - eqTime; // in minutes

		return timeUTC;
	},
	
	calcSun : function(date,pos) {
		var JD = date.getJulianDay();
		var T = date.getJulianCentury();
		var Tday = (Math.floor(date.getModifiedJulianDate()-DateTime.DJM00+0.5)-0.5)/DateTime.DJC;
		//var L0 = calcGeomMeanLongSun(T);
		//var M = calcGeomMeanAnomalySun(T);
		//var e = calcEccentricityEarthOrbit(T);
		//var C = calcSunEqOfCenter(T);
		//var O = calcSunTrueLong(T);
		//var v = calcSunTrueAnomaly(T);
		var R = AstronomyS.calcSunRadVector(T);
		//var lambda = calcSunApparentLong(T);
		//var epsilon0 = calcMeanObliquityOfEcliptic(T);
		//var epsilon = calcObliquityCorrection(T);
		var alpha = AstronomyS.calcSunRtAscension(T);
		var theta = AstronomyS.calcSunDeclination(T);
		var Etime = AstronomyS.calcEquationOfTime(T);

		var eqTime = Etime;
		var eqTimeDay = AstronomyS.calcEquationOfTime(Tday);
		var solarDec = theta; // in degrees

		var sundata = {
			date : date,
			pos : pos,
			eqtimeday : Math.floor10(eqTimeDay,-2),
			eqtime : Math.floor10(eqTime,-2),
			declination : Math.floor10(solarDec,-2),
			azimuth : 0,
			elevation : 0,
			coszenith : 0,
			sunrise : 0,
			noon : 0,
			sunset : 0
		};



		var earthRadVec = R;

//		var solarTimeFix = eqTime - 4.0 * longitude + 60.0 * zone;
		var solarTimeFix = eqTime + 4.0 * pos.lng + DateTime.LocalTZA();
		//var trueSolarTime = hh * 60.0 + mm + ss/60.0 + solarTimeFix;
		var trueSolarTime = date.getLT() * 60.0  + solarTimeFix;
		// in minutes

		while (trueSolarTime > 1440) {
			trueSolarTime -= 1440;
		}

		//var hourAngle = calcHourAngle(timenow, longitude, eqTime);
		var hourAngle = trueSolarTime / 4.0 - 180.0;
		// Thanks to Louis Schwarzmayr for finding our error,
		// and providing the following 4 lines to fix it:
		if (hourAngle < -180) {
			hourAngle += 360.0;
		}

		var csz = Math.sind(pos.lat) * 
			Math.sind(solarDec) + 
			Math.cosd(pos.lat) * 
			Math.cosd(solarDec) * Math.cosd(hourAngle);
		if (csz > 1.0) {
			csz = 1.0;
		} else if (csz < -1.0) { 
			csz = -1.0; 
		}

		var zenith = Math.acosd(csz);
		var azDenom = Math.cosd(pos.lat) * Math.sind(zenith);

		if (Math.abs(azDenom) > 0.001) {
			azRad = (( Math.sind(pos.lat) * 
				Math.cosd(zenith) ) - 
				Math.sind(solarDec)) / azDenom;
			if (Math.abs(azRad) > 1.0) {
				if (azRad < 0) {
					azRad = -1.0;
				} else {
					azRad = 1.0;
				}
			}

			var azimuth = 180.0 - Math.acosd(azRad);

			if (hourAngle > 0.0) {
				azimuth = -azimuth;
			}
		} else {
			if (pos.lat > 0.0) {
				azimuth = 180.0;
			} else { 
				azimuth = 0.0;
			}
		}
		if (azimuth < 0.0) {
			azimuth += 360.0;
		}

		exoatmElevation = 90.0 - zenith;
		if (exoatmElevation > 85.0) {
			refractionCorrection = 0.0;
		} else {
			te = Math.tand(exoatmElevation);
			if (exoatmElevation > 5.0) {
				refractionCorrection = 58.1 / te - 0.07 / (te*te*te) + 0.000086 / (te*te*te*te*te);
			} else if (exoatmElevation > -0.575) {
				refractionCorrection = 1735.0 + exoatmElevation *
					(-518.2 + exoatmElevation * (103.4 +
					exoatmElevation * (-12.79 + 
					exoatmElevation * 0.711) ) );
			} else {
				refractionCorrection = -20.774 / te;
			}
			refractionCorrection = refractionCorrection / 3600.0;
		}

		solarZen = zenith - refractionCorrection;

		if(solarZen < 108.0) { // astronomical twilight	
		  sundata.azimuth = Math.floor10(azimuth,-2);
		   sundata.elevation = (Math.floor(100*(90.0 - solarZen)))/100;
		  if (solarZen < 90.0) {
			 sundata.coszenith = (Math.floor(10000.0*(Math.cosd(solarZen))))/10000.0;
		  } else {
			sundata.coszenith = 0.0;
		  }
		} else {  // do not report az & el after astro twilight
		  sundata.azimuth = "dark";
		  sundata.elevation = "dark";
		  sundata.coszenith.value = 0.0;
		}



		// Calculate sunrise for this date
		// if no sunrise is found, set flag nosunrise

		var nosunrise = false;

		var riseTimeGMT = AstronomyS.calcSunriseUTC(T, pos.lat, -pos.lng);
		//	in minutes
		if (!isNumber(riseTimeGMT))
		{
			nosunrise = true;
		}
		else {
			sundata.sunrise = date.copy();
			sundata.sunrise.setUT(0);
			sundata.sunrise.incMinutes(riseTimeGMT);
		}

		// Calculate sunset for this date
		// if no sunset is found, set flag nosunset

		var nosunset = false;
		var setTimeGMT = AstronomyS.calcSunsetUTC(T, pos.lat, -pos.lng);
		if (!isNumber(setTimeGMT))
		{
			nosunset = true;
		}
		else {
			sundata.sunset = date.copy();
			sundata.sunset.setUT(0);
			sundata.sunset.incMinutes(setTimeGMT);
		}

//		var daySavings = YesNo[index].value;  // = 0 (no) or 60 (yes)
//		var daySavings = date.getDSTOffset();
//		var zone = latLongForm["hrsToGMT"].value;
//		var zone = -date.getLocalTZOffset()/60;
/*
			if(zone > 12 || zone < -12.5)
			{
				alert("The offset must be between -12.5 and 12.  \n Setting \"Off-Set\"=0");
				zone = "0";
				latLongForm["hrsToGMT"].value = zone;
			}
*/
			if (!nosunrise)		// Sunrise was found
			{
				var riseTimeLST = riseTimeGMT + date.getLocalTZOffset() + date.getDSTOffset();	
					//	in minutes
//				var riseTimeLST = riseTimeGMT - DateTime.LocalTZA() + date.isDaylightSavingTime();	
					//	in minutes
//				var riseStr = timeStringShortAMPM(riseTimeLST, JD);
//				var utcRiseStr = timeStringDate(riseTimeGMT, JD);
//				riseSetForm["sunrise"].value = riseStr;
//				riseSetForm["utcsunrise"].value = utcRiseStr;
			}
			if (!nosunset)		// Sunset was found
			{
				var setTimeLST = setTimeGMT + date.getLocalTZOffset() + date.getDSTOffset();
//				var setTimeLST = setTimeGMT - DateTime.LocalTZA + date.isDaylightSavingTime();
					//	in minutes
//				var setStr = timeStringShortAMPM(setTimeLST, JD);
//				var utcSetStr = timeStringDate(setTimeGMT, JD);
//				riseSetForm["sunset"].value = setStr;
//				riseSetForm["utcsunset"].value = utcSetStr;
			}

			// Calculate solar noon for this date

			var solNoonGMT = AstronomyS.calcSolNoonUTC(T, -pos.lng);
			var solNoonLST = solNoonGMT + date.getLocalTZOffset() + date.getDSTOffset();
//			console.log(solNoonGMT);
			sundata.noon = date.copy();
			sundata.noon.setUT(12);
			sundata.noon.incMinutes(solNoonGMT);

//			var solnStr = timeString(solNoonLST);
//			var utcSolnStr = timeString(solNoonGMT);

//			riseSetForm["solnoon"].value = solnStr;
//			riseSetForm["utcsolnoon"].value = utcSolnStr;

			var tsnoon = Tday + (solNoonGMT/1440.0)/36525;//calcTimeJulianCent(calcJDFromJulianCent(T) -0.5 + solNoonGMT/1440.0); 

			eqTime = AstronomyS.calcEquationOfTime(tsnoon);
			solarDec = AstronomyS.calcSunDeclination(tsnoon);

//			riseSetForm["eqTime"].value = (Math.floor(100*eqTime))/100;
//			riseSetForm["solarDec"].value = (Math.floor(100*(solarDec)))/100;
			
			//***********Convert lat and long to standard format
//			convLatLong(latLongForm);

			// report special cases of no sunrise
/*
			if(nosunrise)
			{ 
				riseSetForm["utcsunrise"].value = "";
				// if Northern hemisphere and spring or summer, OR  
				// if Southern hemisphere and fall or winter, use 
				// previous sunrise and next sunset

				if ( ((latitude > 66.4) && (doy > 79) && (doy < 267)) ||
				   ((latitude < -66.4) && ((doy < 83) || (doy > 263))) )
				{
					newjd = findRecentSunrise(JD, latitude, longitude);
					newtime = calcSunriseUTC(newjd, latitude, longitude)
						 - (60 * zone) + daySavings;
					if (newtime > 1440)
					{
						newtime -= 1440;
						newjd += 1.0;
					}
					if (newtime < 0)
					{
						newtime += 1440;
						newjd -= 1.0;
					}
					riseSetForm["sunrise"].value = 
						timeStringAMPMDate(newtime, newjd);
					riseSetForm["utcsunrise"].value = "prior sunrise";
				}

				// if Northern hemisphere and fall or winter, OR 
				// if Southern hemisphere and spring or summer, use 
				// next sunrise and previous sunset

				else if ( ((latitude > 66.4) && ((doy < 83) || (doy > 263))) ||
					((latitude < -66.4) && (doy > 79) && (doy < 267)) )
				{
					newjd = findNextSunrise(JD, latitude, longitude);
					newtime = calcSunriseUTC(newjd, latitude, longitude)
						 - (60 * zone) + daySavings;
					if (newtime > 1440)
					{
						newtime -= 1440;
						newjd += 1.0;
					}
					if (newtime < 0)
					{
						newtime += 1440;
						newjd -= 1.0;
					}
					riseSetForm["sunrise"].value = 
						timeStringAMPMDate(newtime, newjd);
//					riseSetForm["sunrise"].value = calcDayFromJD(newjd)
//						+ " " + timeStringDate(newtime, newjd);
					riseSetForm["utcsunrise"].value = "next sunrise";
				}
				else 
				{
					alert("Cannot Find Sunrise!");
				}

				// alert("Last Sunrise was on day " + findRecentSunrise(JD, latitude, longitude));
				// alert("Next Sunrise will be on day " + findNextSunrise(JD, latitude, longitude));

			}

			if(nosunset)
			{ 
				riseSetForm["utcsunset"].value = "";
				// if Northern hemisphere and spring or summer, OR
				// if Southern hemisphere and fall or winter, use 
				// previous sunrise and next sunset

				if ( ((latitude > 66.4) && (doy > 79) && (doy < 267)) ||
				   ((latitude < -66.4) && ((doy < 83) || (doy > 263))) )
				{
					newjd = findNextSunset(JD, latitude, longitude);
					newtime = calcSunsetUTC(newjd, latitude, longitude)
						 - (60 * zone) + daySavings;
					if (newtime > 1440)
					{
						newtime -= 1440;
						newjd += 1.0;
					}
					if (newtime < 0)
					{
						newtime += 1440;
						newjd -= 1.0;
					}
					riseSetForm["sunset"].value = 
						timeStringAMPMDate(newtime, newjd);
					riseSetForm["utcsunset"].value = "next sunset";
					riseSetForm["utcsolnoon"].value = "";
				}

				// if Northern hemisphere and fall or winter, OR
				// if Southern hemisphere and spring or summer, use 
				// next sunrise and last sunset

				else if ( ((latitude > 66.4) && ((doy < 83) || (doy > 263))) ||
					((latitude < -66.4) && (doy > 79) && (doy < 267)) )
				{
					newjd = findRecentSunset(JD, latitude, longitude);
					newtime = calcSunsetUTC(newjd, latitude, longitude)
						 - (60 * zone) + daySavings;
					if (newtime > 1440)
					{
						newtime -= 1440;
						newjd += 1.0;
					}
					if (newtime < 0)
					{
						newtime += 1440
						newjd -= 1.0;
					}
					riseSetForm["sunset"].value = 
						timeStringAMPMDate(newtime, newjd);
					riseSetForm["utcsunset"].value = "prior sunset";
					riseSetForm["solnoon"].value = "N/A";
					riseSetForm["utcsolnoon"].value = "";
				}

				else 
				{
					alert ("Cannot Find Sunset!");
				}
			}

*/
		return sundata;
	},
};

//https://www.moonpage.com/
//https://gist.github.com/L-A/3497902
//https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf
//https://everydaycalculation.com/moon-phase.php
//https://aa.usno.navy.mil/data/docs/MoonPhase.php
//http://www.giangrandi.ch/soft/mooncalc/mooncalc.shtml
//https://AstronomyS.stackexchange.com/questions/914/how-can-i-calculate-moon-phase-and-height
//https://stackoverflow.com/questions/2526815/moon-lunar-phase-algorithm
//https://www.compadre.org/books/?ID=32
//http://cosinekitty.com/solar_system.html
//https://libraries.io/npm/suncalc
//https://www.aa.quae.nl/en/reken/hemelpositie.html