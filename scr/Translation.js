function loadTranslation(iframe_id,translation_file, is_file) {
	document.writeln("<iframe id=\""+iframe_id+"\" width=\"1024\" height=\"768\" src=\""+(is_file?"file:///X:/":"http://")+translation_file+"\"></iframe>");
	var iframe = document.getElementById(iframe_id);
	var content = iframe.contentDocument || iframe.contentWindow.document; 
	console.log(iframe.contentWindow.document);
	console.log(document);
}