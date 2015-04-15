function doClick(e) {
	alert($.label.text);
}

Ti.Geolocation.purpose = 'Location based services for the app';
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_NEAREST_TEN_METERS;
Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;


var variablecerrar=0;

var facebook = Alloy.Globals.Facebook;
facebook.appid = 400760656744309;
facebook.permissions = ['publish_stream'];
facebook.forceDialogAuth = true;

var db = Ti.Database.open('basededatosusuariosdd');
db.execute('CREATE TABLE IF NOT EXISTS usuariodb (id INTEGER PRIMARY KEY ,first_name TEXT, last_name TEXT)');
db.close();

function cerrar() {
	facebook.logout();
}

function crearusuario(id, nombre, apellido) {
	var db = Ti.Database.open('basededatosusuariosdd');

	db.execute('INSERT INTO usuariodb (id, first_name, last_name) VALUES (?, ?, ?)', id, nombre, apellido);
	db.close();
}

function verificarusuario() {
	var db = Ti.Database.open('basededatosusuariosdd');
	var fieldCount;

	var rows = db.execute('SELECT  * FROM usuariodb');

	while (rows.isValidRow()) {

		Ti.API.info('Person ---> ROWID: ' + rows.fieldByName('first_name'));
		rows.next();
	}
	if ((Ti.Platform.name === 'android') || (Ti.version >= '3.3.0')) {
		fieldCount = rows.fieldCount;
	} else {
		fieldCount = rows.fieldCount();
	}
	Ti.API.info('Field count: ' + fieldCount);

	db.close();
	rows.close();

	return fieldCount;
}

function report(evt) {
	Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
}

//$.index.activity.actionBar.hide();

function ocultarviewfunction(view) {
	var animation = Ti.UI.createAnimation();
	animation.left = "-90000";
	animation.duration = 100;
	animation.curve = Titanium.UI.ANIMATION_CURVE_EASE_OUT;
	view.animate(animation);
}

function aparecerviewfunction(view) {
	var animation = Ti.UI.createAnimation();
	animation.left = "0";
	animation.duration = 100;
	animation.curve = Titanium.UI.ANIMATION_CURVE_EASE_OUT;
	view.animate(animation);
}

function loguinface() {
	facebook.addEventListener('login', function(e) {
		if (e.success) {
			//  ocultarlogin();

			facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
				if (e.success) {
					console.log(e.result);
					
					var json= JSON.parse(e.result);
					crearusuario(json.id, json.first_name, json.last_name);

					ocultarviewfunction($.logueofacebookcontenedor);
					agrandar(95);

				} else if (e.error) {
					alert(e.error);
				} else {
					alert('Unknown response');
				}
			});

		} else if (e.error) {
			alert(e.error);
		} else if (e.cancelled) {
			alert("Canceled");
		}
	});
	facebook.authorize();
}

function mostrarviewcontenido() {
	$.contenedorsegundario.left = 0;
}

function ocultarviewcontenido() {
	$.contenedorsegundario.left = "-90000";
}

function agrandar(alto) {
		$.contenedorsegundario.height="100%";

	//$.contenedorsegundario.top=0;
	var animation = Ti.UI.createAnimation();
	animation.height = (alto + 3) + "%";
	animation.bottom = "10dp";
	animation.duration = 400;
	animation.curve = Titanium.UI.ANIMATION_CURVE_EASE_OUT;
	animation.backgroundColor = "#CCffffff", 
	$.contenedorprueba.animate(animation, function() {
		var animation = Ti.UI.createAnimation();
		animation.height = (alto) + "%";
		animation.bottom = "10dp";
		animation.backgroundColor = "#CCffffff";
		 animation.duration = 100;
		animation.curve = Titanium.UI.ANIMATION_CURVE_EASE_OUT;
		$.contenedorprueba.animate(animation);

	});
	var animation = Ti.UI.createAnimation();
	animation.backgroundColor = "#4Dffffff";
	animation.duration = 100;
	$.contenedorsegundario.animate(animation);

}

function pequeno(alto) {
	
	

	var animation = Ti.UI.createAnimation();
	animation.height = alto + "dp";
	animation.bottom = "30dp";
	animation.duration = 400;
	animation.backgroundColor = "#E6ffffff";
	animation.curve = Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT;
	$.contenedorprueba.animate(animation, function() {
		var animation = Ti.UI.createAnimation();
		animation.height = (alto + 3) + "dp";
		animation.bottom = "30dp";
		animation.backgroundColor = "#E6ffffff";
		animation.duration = 100;
		animation.curve = Titanium.UI.ANIMATION_CURVE_EASE_OUT;
		$.contenedorprueba.animate(animation);
		$.contenedorsegundario.height="180dp";
	});

	var animation = Ti.UI.createAnimation();
	animation.backgroundColor = "#00ffffff";
	 animation.duration = 100;
	$.contenedorsegundario.animate(animation);
	
}

function mostrarlogin() {
	mostrarviewcontenido();
	agrandar(95);
}

function ocultarlogin() {
	ocultarviewcontenido();
	pequeno(140);
}

function ocultarviewcontelayout(){
	
	
	if(variablecerrar==0){
	variablecerrar=1;
	pequeno(140);
	$.quiequiereshacer.text="¿Que quieres ver?";
	}

}

function eventos(){
	agrandar(95);

		$.contenedoreventos.left=0;
		$.contenedorsocial.left="-9000";

	variablecerrar=0;
			$.quiequiereshacer.text="Cerrar";

}

function social(){
	agrandar(95);
	$.contenedorsocial.left=0;
	$.contenedoreventos.left="-9000";

		variablecerrar=0;
		$.quiequiereshacer.text="Cerrar";

}


function mapa(){
	variablecerrar=1;
	pequeno(140);
	$.quiequiereshacer.text="¿A donde quieres ir?";
}

function setlocationmapa(){
//Get the current position and set it to the mapview
Titanium.Geolocation.getCurrentPosition(function(e){
        var region={
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
            animate:true,
            latitudeDelta:0.001,
            longitudeDelta:0.001
        };
        $.mapview.setLocation(region);
});

 
}


if (verificarusuario() ==0) {
	//mostrarlogin();

	aparecerviewfunction($.logueofacebookcontenedor);

} else {
	ocultarviewfunction($.logueofacebookcontenedor);
	//pequeno(100);
		$.quiequiereshacer.text="¿Que quieres ver?";

pequeno(140);
}

setlocationmapa();


$.index.open();
