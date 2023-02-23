
const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");

form.addEventListener("submit", e=>{
    e.preventDefault();
	let regexNombre = /^[A-Za-z\s]{3,25}$/
    
    var entrar = false;
    parrafo.innerHTML = ""
	var datos= new Array();
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (this.readyState ==4  && this.status==200){
			var warnings = ""
			datos=this.responseText.split(",");	
			var user = document.getElementById("user").value;
			var password = document.getElementById("password").value;
			for(var i=4; i< datos.length;i=i+7){
				if((user!= "admin") || (password != "admin") ){
					warnings = `Usuario o contraseña no es correcto.<br>`
					entrar = true;
				}else{
					i=datos.length;
					entrar = false;
					break;
				}
				console.log(datos[i+2])
				if(datos[i+2] == "activo"){
					if(((user != datos[i]) || (password != datos[i+1]))){
						warnings = `Usuario o contraseña no es correcto.<br>`
						entrar = true;
					}else{
						i=datos.length;
						entrar = false;
						break;
					};
				}		
			}
			if(entrar){
				parrafo.innerHTML = warnings;
			}else{
				window.location.href = "HTML/inicio.html";
				
				form.reset();
			}
		} 
	}
});      
