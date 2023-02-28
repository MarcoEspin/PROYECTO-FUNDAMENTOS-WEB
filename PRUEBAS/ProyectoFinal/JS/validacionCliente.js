let input;
function validarTextoMayuscula(input) {
  // Expresión regular para validar que solo hay letras y espacios en blanco
  var regex = /^[a-zA-Z\s]+$/;

  // Comprueba si el valor del input cumple la expresión regular
  if (!regex.test(input.value)) {
    input.setCustomValidity("Solo se permiten letras y espacios en blanco.");
  } else {
    // Expresión regular para validar que la primera letra sea mayúscula
    var regexMayuscula = /^[A-Z]/;

    // Comprueba si la primera letra del valor del input es mayúscula
    if (!regexMayuscula.test(input.value)) {
      input.setCustomValidity("La primera letra debe ser mayúscula.");
    } else {
      input.setCustomValidity("");
    }
  }
}
function validarTelefono(input) {
  // Expresión regular para validar que solo hay números enteros
  var regex = /^\d+$/;

  // Comprueba si el valor del input cumple la expresión regular
  if (!regex.test(input.value)) {
    input.setCustomValidity("Solo se permiten números enteros.");
  } else {
    // Comprueba si el valor del input tiene la cantidad de dígitos especificada (por ejemplo, 10)
    if (input.value.length != 10) {
      input.setCustomValidity("El número de teléfono debe tener 10 dígitos.");
    } else {
      input.setCustomValidity("");
    }
  }
}
function validarCorreo(input) {
  // Expresión regular para validar un correo electrónico válido
  var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Comprueba si el valor del input cumple la expresión regular
  if (!regex.test(input.value)) {
    input.setCustomValidity("Ingrese un correo electrónico válido.");
  } else {
    input.setCustomValidity("");
  }
}