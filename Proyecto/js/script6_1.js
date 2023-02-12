// JavaScript Document

var buscar = document.getElementById("buscarr");

function buscarUsuario(){
	for(var i=0; i<usuarios.length; i++){
		if(buscar.value.toString() == usuarios[i].cedulaR){
			imprimirResultado(i);
			break;
		}else if(buscar.value.toString() == usuarios[i].nombreR){
			imprimirResultado(i);
			break;
		}
		if(i == usuarios.length-1){
			alert("El apellido o cedula no se ha encontrado.");
		}
	}
}
function imprimirResultado(i){
	var tabla = document.getElementById("tablaDeDatos").rows.length;
	/*if(tabla>1){
		for(var i=1; i<tabla ; i++ ){
			document.getElementById("tablaDeDatos").deleteRow(1)
		}
	}*/
		var tablaDatos = document.getElementById("tablaDeDatos");
		var newFiladeTabla = tablaDatos.insertRow(-1);
		newFiladeTabla.id = usuarios.length - 1 ;
		newFiladeTabla.insertCell(0).textContent = usuarios[i].cedulaR.toString();
		newFiladeTabla.insertCell(1).textContent = usuarios[i].nombreR.toString();
		newFiladeTabla.insertCell(2).textContent = usuarios[i].nombreU.toString();
		newFiladeTabla.insertCell(3).textContent = usuarios[i].correo.toString();
		newFiladeTabla.insertCell(4).textContent = usuarios[i].usuarioR.toString();
}