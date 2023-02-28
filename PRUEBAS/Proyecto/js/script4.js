leerDatosInicio();
function leerDatosInicio(){
	var datos= new Array();
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (this.readyState ==4  && this.status==200){
			datos=this.responseText.split(",");	
			var j=0;
			for(var i=0; i<datos.length;i++){
				var usuario2= new Usuario(datos[j],datos[j+1],datos[j+2],datos[j+3], datos[j+4],datos[j+5],datos[j+6])
				j=j+7;
				i=i+6
				usuarios.push(usuario2);
			}
				
		} 
	}
	var archivo= "../DATOS/datos.txt";
	xhr.open("GET", archivo, true);
	xhr.send();   
} 
// JavaScript Document