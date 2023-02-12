// JavaScript Document
leerDatosInicio();
function leerDatosInicio(){
	var datos= new Array();
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (this.readyState ==4  && this.status==200){
			datos=this.responseText.split(",");	
			var j=0;
			for(var i=0; i<datos.length;i++){
				var usuario2= new Usuario(datos[j],datos[j+1],datos[j+2],datos[j+3], datos[j+4])
				j=j+5;
				i=i+4;
				usuarios.push(usuario2);
			}
				
		} 
	}
	var archivo= "../DATOS/facturacion.txt";
	xhr.open("GET", archivo, true);
	xhr.send();   
} 