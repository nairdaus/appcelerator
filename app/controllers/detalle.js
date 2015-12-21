var args = arguments[0] || {};
$.title.text = args.param.title;
$.year.text = args.param.year;
function closeme(){
	$.win.close();
}