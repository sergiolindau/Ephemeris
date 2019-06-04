function tzdataongetlist(tz){
	var timezone_select = $.$.i("select_timezone_menu");
	var option;
	for(var i=0;i<tz.zonelist.length;i++){
		option = $.create('option');
		option.innerHTML = tz.zonelist[i];
		timezone_select.add(option);
	}
	timezone_select.selectedIndex = tz.zoneindex;
	timezone_select.addEventListener('change',timezoneMenuChange);
};

function tzdataongetzone(tz){
	$.$.i("test_tz").innerHTML = JSON.stringify(tz.timezones);
};

var tzdata = new TimeZone(null,tzdataongetlist,tzdataongetzone,"America/Sao_Paulo");
tzdata.getzonelist();

function timezoneMenuChange(){
	tzdata.settimezone($.$.i("select_timezone_menu").selectedIndex);
}

function makeTimeZoneMenu(container){
	container = $.$.i(container);
	var timezone_select = $.create('select');
	timezone_select.setAttribute('id',"select_timezone_menu");
	container.innerHTML = "";
	container.appendChild(timezone_select);
}