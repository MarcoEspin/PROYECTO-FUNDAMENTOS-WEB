function cerrarSesion() {
  // Redirigir al usuario a la página de inicio de sesión
  window.location.href = "../index.html";
  
  // Reemplazar la entrada más reciente en el historial del navegador
  history.replaceState(null, '', '../index.html');
}