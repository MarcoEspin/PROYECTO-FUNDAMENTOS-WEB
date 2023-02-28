let campo;

function validarEnteroPositivo(campo) {
  var enteroPositivo = /^\d+$/;
  if (!enteroPositivo.test(campo.value) || parseInt(campo.value) < 0) {
    campo.setCustomValidity("El campo debe contener solo números enteros positivos");
    campo.value = "";
    campo.focus();
    return false;
  }
  return true;
}

function validarPrecio(input) {
  var regex = /^\d+(\.\d{1,2})?$/; // Expresión regular para validar números positivos con dos decimales
  if (!regex.test(input.value) || input.value <= 0) { // Verificar que cumple con la expresión regular y es mayor a cero
    input.setCustomValidity("Ingrese un número positivo de dos decimales mayor a cero"); // Establecer mensaje de error
    input.value = ""; // Limpiar el campo de entrada
    input.focus(); // Colocar el foco en el campo de entrada
  }
}