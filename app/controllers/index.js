
var peliculas;
function buscar(e){
	$.search.blur();
	getCine($.search.value, function(resp){
		//Ti.API.info(resp);		
		var movies = resp.movies;
		peliculas = movies;		
		var data = [];		
		for(i=0; i<movies.length;i++){			
			data[i] = Alloy.createController('fila', {param:movies[i]}).getView();			
		}		
		$.tv.data = data;
		
	});
	
}

function verDetalle(e){
	Ti.API.info(e.rowData.nro);
	var saludo = {param:peliculas};
	var win = Alloy.createController('detalle', saludo).getView();
	win.open();
}

function getCine(busqueda, callback){
	var request = Titanium.Network.createHTTPClient();
	
	var lista;
	//Tiempo para que responda el servicio
	request.setTimeout(10000);
	var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=646z6btmesx3mcaaxjtw35x2&q="+ busqueda +"&page_limit=30";
	
	//Mandamos la consulta al servicio
	request.open("GET", url);
	
	//Recepcionamos el JSON	
	request.onload = function(){
		var json = this.responseText;
		
		lista = JSON.parse(json);
		
		callback(lista);
	};
	
	request.onerror = function(){
		var a = Ti.UI.createAlertDialog();
		a.message = "Error de conexion";
		a.title = "Atencion";
		a.show();
		callback('-1');
	};
	
	//Envia
	request.send();
}
$.index.open();