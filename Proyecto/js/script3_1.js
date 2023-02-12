// JavaScript Document
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const expresiones = {
	nombreU: /^[A-Za-zÀ-ÿ- ]{3,15}$/, // Letras y espacio
	nombreR: /^[A-Za-zÀ-ÿ- ]{3,50}$/, // Letras y espacio
	usuarioR: /^[a-zA-Z0-9\_\-\ ]{8,16}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{10}$/, // Letras, numeros, guion y guion_bajo
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //correo
	cedulaR: /^.{10}$/, // 10 digitos.
}
var internet=document.getElementById("select4").value;
telefonia=document.getElementById("select5").value;
tv=document.getElementById("select5").value;

const campos = {
	nombreU: false,
	nombreR: false,
	usuarioR: false,
	password: false,
	correo: false,
	cedulaR: false,
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombreU":
			validarCampo(expresiones.nombreU, e.target, 'nombreU');
		break;
		case "nombreR":
			validarCampo(expresiones.nombreR, e.target, 'nombreR');
		break;
		case "usuarioR":
			validarCampo(expresiones.usuarioR, e.target, 'usuarioR');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "cedulaR":
			validarCedula(expresiones.cedulaR, e.target, 'cedulaR');
		break;
	}
};
function validarCedula(expresion, input, campo) {
	var cad = document.getElementById("cedulaR").value.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;
    if (cad !== "" && longitud === 10  && expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
			document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
			document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
			campos[campo] = true;
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
			campos[campo] = true;
		} else {
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
			document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
			document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
			document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
			campos[campo] = false;
		}
    }
};

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
};

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	const terminos = document.getElementById('terminos');
	if(campos.nombreU && campos.nombreR && campos.usuarioR && campos.password && campos.correo && campos.cedulaR){
		var usuario1 = new Usuario(cedulaR.value.toString(), nombreR.value.toString(), nombreU.value.toString(), correo.value.toString(), usuarioR.value.toString(), password.value.toString(),"activo",internet.value.toString());
		usuarios.push(usuario1);
		//tableToCSV();
		formulario.reset();
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
		document.getElementById('formulario__mensaje-exito').innerHTML="Enviado exitosamente!";
	}
});	
function eliminar(idUsuario){
	var tablaDatos = document.getElementById("tablaDeDatos");
	usuarios[idUsuario].estado="inactivo";
	cargarDatos();
}


function tableToCSV() {
            var csv_data = [];
		var csvrow = new Array();
			for(var i=0; i<usuarios.length; i++){
				
				csvrow.push(usuarios[i].cedulaR);
				csvrow.push(usuarios[i].nombreR);
				csvrow.push(usuarios[i].nombreU);
				csvrow.push(usuarios[i].correo);
				csvrow.push(usuarios[i].usuarioR);
				csvrow.push(usuarios[i].password);
				csvrow.push(usuarios[i].estado);
				csvrow.push(usuarios[i].internet);
				
		
			}
            downloadCSVFile(csvrow);
        }
 
function downloadCSVFile(csv_data) {
            // Create CSV file object and feed
            // our csv_data into it
            CSVFile = new Blob([csv_data], {
                type: "text/csv"
            });
 
            // Create to temporary link to initiate
            // download process
            var temp_link = document.createElement('a');
 
            // Download csv file
            temp_link.download = "facturacion.txt";
            var url = window.URL.createObjectURL(CSVFile);
            temp_link.href = url;
	
 
            // This link should not be displayed
            temp_link.style.display = "none";
            document.body.appendChild(temp_link);
            // Automatically click the link to
            // trigger download
            temp_link.click();
            document.body.removeChild(temp_link);
}
 
var idAlumnoEditando;
function abrirPopUp(idUsuario){
	console.log(idUsuario);
	document.getElementById('editt').classList.add('active');
	document.getElementById('popUpEditar').classList.add('active');
	document.getElementById("editarNombreU").value= usuarios[idUsuario].nombreU;
	document.getElementById("editarNombreR").value= usuarios[idUsuario].nombreR;
	document.getElementById("editarUsuarioR").value= usuarios[idUsuario].usuarioR;
	document.getElementById("editarPassword").value= usuarios[idUsuario].password;
	document.getElementById("editarCorreo").value=usuarios[idUsuario].correo;
	document.getElementById("editarCedulaR").value= usuarios[idUsuario].cedulaR;
	idAlumnoEditando=idUsuario;
}

function guardarCambios(){
	usuarios[idAlumnoEditando-1].nombreU=document.getElementById("editarNombreU").value.toString();
	usuarios[idAlumnoEditando-1].nombreR=document.getElementById("editarNombreR").value.toString();
	usuarios[idAlumnoEditando-1].usuarioR = document.getElementById("editarUsuarioR").value.toString();
	usuarios[idAlumnoEditando-1].password = document.getElementById("editarPassword").value.toString();
	usuarios[idAlumnoEditando-1].correo = document.getElementById("editarCorreo").value.toString();
	usuarios[idAlumnoEditando-1].cedulaR = document.getElementById("editarCedulaR").value.toString();
	var tablaDatos = document.getElementById("tablaDeDatos");
	tablaDatos.rows[idAlumnoEditando+1].cells[0].textContent=usuarios[idAlumnoEditando-1].cedulaR;
	tablaDatos.rows[idAlumnoEditando+1].cells[1].textContent=usuarios[idAlumnoEditando-1].nombreR;
	tablaDatos.rows[idAlumnoEditando+1].cells[2].textContent=usuarios[idAlumnoEditando-1].nombreU;
	tablaDatos.rows[idAlumnoEditando+1].cells[3].textContent=usuarios[idAlumnoEditando-1].correo;
	tablaDatos.rows[idAlumnoEditando+1].cells[4].textContent=usuarios[idAlumnoEditando-1].usuarioR;
	tablaDatos.rows[idAlumnoEditando+1].cells[5].textContent=usuarios[idAlumnoEditando-1].password;
	tablaDatos.rows[idAlumnoEditando+1].cells[6].textContent='activo';
}

function cerrarPopUpEditar(){
	document.getElementById('editt').classList.remove('active')
	document.getElementById('popUpEditar').classList.remove('active');
}
