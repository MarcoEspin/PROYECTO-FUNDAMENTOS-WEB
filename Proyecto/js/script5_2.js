// JavaScript Document
var usuarios= new Array();
class Usuario{
	constructor(cedulaR, nombreR, nombreU, correo, usuarioR, password,estado){
		this.cedulaR = cedulaR;
		this.nombreR = nombreR;
		this.nombreU = nombreU;
		this.correo = correo;
		this.usuarioR = usuarioR;
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
		newFiladeTabla.insertCell(4).textContent = usuarios[i].usuarioR.toString();
	}
}