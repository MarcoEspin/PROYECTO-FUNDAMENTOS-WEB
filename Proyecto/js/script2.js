const editarformulario = document.getElementById('editarformulario');
const editarInputs = document.querySelectorAll('#editarformulario input');
const expresionesEditar = {
	editarNombreU: /^[A-Za-zÀ-ÿ- ]{3,15}$/, // Letras y espacio
	editarNombreR: /^[A-Za-zÀ-ÿ- ]{3,50}$/, // Letras y espacio
	editarUsuarioR: /^[a-zA-Z0-9\_\-\ ]{8,16}$/, // Letras, numeros, guion y guion_bajo
	editarPassword: /^.{10}$/, // Letras, numeros, guion y guion_bajo
	editarCorreo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //correo
	editarCedulaR: /^.{10}$/, // 10 digitos.
}


const camposEditar={
	editarNombreU: false,
	editarNombreR: false,
	editarUsuarioR: false,
	editarPassword: false,
	editarCorreo: false,
	editarCedulaR: false
}

const validarFormularioEditar =(e)=>{
	switch(e.target.name){
		case "editarNombreU":
			validarCampoEditar(expresionesEditar.editarNombreU, e.target, 'editarNombreU');
		break;
		case "editarNombreR":
			validarCampoEditar(expresionesEditar.editarNombreR, e.target, 'editarNombreR');
		break;
		case "editarUsuarioR":
			validarCampoEditar(expresionesEditar.editarUsuarioR, e.target, 'editarUsuarioR');
		break;
		case "editarPassword":
			validarCampoEditar(expresionesEditar.editarPassword, e.target, 'editarPassword');
		break;
		case "editarCorreo":
			validarCampoEditar(expresionesEditar.editarCorreo, e.target, 'editarCorreo');
		break;
		case "editarCedulaR":
			validarCedulaEditar(expresionesEditar.editarCedulaR, e.target, 'editarCedulaR');
		break;
	}
}
function validarCedulaEditar(expresion, input, campo) {
	var cad = document.getElementById("editarCedulaR").value.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;
    if (cad !== "" && longitud === 10  && expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
			document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
			document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
			camposEditar[campo] = true;
		for(i = 0; i < longcheck; i++){
        	if (i%2 === 0) {
            	var aux = cad.charAt(i) * 2;
              	if (aux > 9) aux -= 9;
              	total += aux;
            } else {
            	total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
		}
        total = total % 10 ? 10 - total % 10 : 0;
        if (cad.charAt(longitud-1) == total && expresion.test(input.value)) {
			document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
			document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
			document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
			camposEditar[campo] = true;
		} else {
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
			document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
			document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
			document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
			camposEditar[campo] = false;
		}
    }
};	
	
const validarCampoEditar = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		camposEditar[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		camposEditar[campo] = false;
	}
};
	
	
editarInputs.forEach((input) => {
	input.addEventListener('keyup', validarFormularioEditar);
	input.addEventListener('blur', validarFormularioEditar);
});
editarformulario.addEventListener('submit', (e) => {
	e.preventDefault();
	if(camposEditar.editarNombreU && camposEditar.editarNombreR && camposEditar.editarUsuarioR && camposEditar.editarPassword && camposEditar.editarCorreo && camposEditar.editarCedulaR){
		alert("Se a editado con éxito!");
		console.log(idAlumnoEditando)
		usuarios[idAlumnoEditando].nombreU = editarNombreU.value.toString();
		usuarios[idAlumnoEditando].nombreR = editarNombreR.value.toString();
		usuarios[idAlumnoEditando].usuarioR = editarUsuarioR.value.toString();
		usuarios[idAlumnoEditando].Password = editarPassword.value.toString();
		usuarios[idAlumnoEditando].correo = editarCorreo.value.toString();
		usuarios[idAlumnoEditando].cedulaR = editarCedulaR.value.toString();
		document.getElementById('formulario__mensaje-exito').innerHTML="Guardado exitosamente!";
		cargarDatos();
	}else{
		console.log("no funciona las validaciones");
		alert("No se a podido editar, verifique los datos!");
	}
})

function imprimir(){
	console.log("vale")
};