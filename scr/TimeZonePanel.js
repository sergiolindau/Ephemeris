function tzdataongetlist(tz){
	var timezone_select = document.getElementById("select_timezone_menu");
	var option;
	for(var i=0;i<tz.zonelist.length;i++){
		option = document.createElement('option');
		option.innerHTML = tz.zonelist[i];
		timezone_select.add(option);
	}
	timezone_select.selectedIndex = tz.zoneindex;
	timezone_select.addEventListener('change',timezoneMenuChange);
};

function tzdataongetzone(tz){
	document.getElementById("test_tz").innerHTML = JSON.stringify(tz.timezones);
};

var tzdata = new TimeZone(null,tzdataongetlist,tzdataongetzone,"America/Sao_Paulo");
tzdata.getzonelist();

function timezoneMenuChange(){
	tzdata.settimezone(document.getElementById("select_timezone_menu").selectedIndex);
}

function makeTimeZoneMenu(container){
	container = document.getElementById(container);
	var timezone_select = document.createElement('select');
	timezone_select.setAttribute('id',"select_timezone_menu");
	container.innerHTML = "";
	container.appendChild(timezone_select);
}