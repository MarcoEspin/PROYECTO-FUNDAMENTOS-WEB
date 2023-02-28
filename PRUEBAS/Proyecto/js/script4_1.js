leerDatosInicio();
function leerDatosInicio(){
	var datos= new Array();
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (this.readyState ==4  && this.status==200){
			datos=this.responseText.split(",");	
			var j=0;
			for(var i=0; i<datos.length;i++){
				var usuario2= new Usuario(datos[j],datos[j+1],datos[j+2],datos[j+3])
				j=j+4;
				i=i+3
				usuarios.push(usuario2);
			}
				
		} 
	}
	var archivo= "../DATOS/planes.txt";
	xhr.open("GET", archivo, true);
	xhr.send();   
} 
// JavaScript Document