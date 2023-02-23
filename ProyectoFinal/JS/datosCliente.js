// Crear un objeto XMLHttpRequest
//var xhr = new XMLHttpRequest();

// Crear los datos a enviar

 
    var i = 0;
   fetch("../DATOS/cliente.json")
   .then(repClientes => repClientes.json())
   .then(repC => { 
    repC.forEach( cliente => 
        fetch('procesar.php',{
            method: 'POST',
            body: cliente
        }).then (datos => datos.json())
        .then (datosformulario => console.log(datosformulario))
    )
})
// Convertir los datos a formato JSON
//var datos_json = JSON.stringify(datos);

// Configurar la solicitud HTTP
//xhr.open("POST", "procesar.php", true);
//xhr.setRequestHeader("Content-Type", "application/json");

// Enviar los datos
//xhr.send(datos_json);