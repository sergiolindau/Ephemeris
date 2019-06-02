function updateSunPanel(){
	var sunData = AstronomyS.calcSun(dateUTC,TheLocation.position);
	document.getElementById("eqTime").value = sunData.eqtime;
	document.getElementById("eqTimeDay").value = sunData.eqtimeday;
	document.getElementById("solarDec").value = sunData.declination;
	document.getElementById("azimuth").value = sunData.azimuth;
	document.getElementById("elevation").value = sunData.elevation;
	document.getElementById("coszen").value = sunData.coszenith;
	document.getElementById("utcsunrise").value = sunData.sunrise.toUTCTimeString();
	document.getElementById("utcsolnoon").value = sunData.noon.toUTCTimeString();
	document.getElementById("utcsunset").value = sunData.sunset.toUTCTimeString();
	document.getElementById("sunrise").value = sunData.sunrise.toLocaleTimeStringAMPM();
	document.getElementById("solnoon").value = sunData.noon.toLocaleTimeStringAMPM();
	document.getElementById("sunset").value = sunData.sunset.toLocaleTimeStringAMPM();
}
//https://www.esrl.noaa.gov/gmd/grad/neubrew/SolarCalc.jsp
//https://www.esrl.noaa.gov/gmd/grad/solcalc/calcdetails.html
//https://www.esrl.noaa.gov/gmd/grad/solcalc/