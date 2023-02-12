// JavaScript Document
var usuarios= new Array();
class Usuario{
	constructor(cedulaR, nombreR, nombreU, correo){
		this.cedulaR = cedulaR;
		this.nombreR = nombreR;
		this.nombreU = nombreU;
		this.correo = correo;
  	}
}
function cargarDatos(){
	var tabla = document.getElementById("tablaDeDatos").rows.length;
	if(tabla>1){
		for(var i=1; i<tabla ; i++ ){
			document.getElementById("tablaDeDatos").deleteRow(1)
		}
	}
	for(var i=0; i<usuarios.length ; i++){
		var tablaDatos = document.getElementById("tablaDeDatos");
		var newFiladeTabla = tablaDatos.insertRow(-1);
		newFiladeTabla.id = usuarios.length - 1 ;
		newFiladeTabla.insertCell(0).textContent = usuarios[i].cedulaR.toString();
		newFiladeTabla.insertCell(1).textContent = usuarios[i].nombreR.toString();
		newFiladeTabla.insertCell(2).textContent = usuarios[i].nombreU.toString();
		newFiladeTabla.insertCell(3).textContent = usuarios[i].correo.toString();
	}
}