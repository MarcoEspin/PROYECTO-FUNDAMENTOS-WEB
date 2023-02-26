let campo;

function validarEnteroPositivo(campo) {
  var enteroPositivo = /^\d+$/;
  if (!enteroPositivo.test(campo.value) || parseInt(campo.value) < 0) {
    alert("El campo debe contener solo n�meros enteros positivos");
    campo.value = "";
    campo.focus();
    return false;
  }
  return true;
}
function validarPrecio(input) {
  var regex = /^\d+(\.\d{1,2})?$/; // Expresi�n regular para validar n�meros positivos con dos decimales
  if (!regex.test(input.value) || input.value <= 0) { // Verificar que cumple con la expresi�n regular y es mayor a cero
    alert("Ingrese un n�mero positivo de dos decimales mayor a cero"); // Mostrar mensaje de error
    input.value = ""; // Limpiar el campo de entrada
    input.focus(); // Colocar el foco en el campo de entrada
  }
} // Agregar la llave de cierre al final de la funci�n