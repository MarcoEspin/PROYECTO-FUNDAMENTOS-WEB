
const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");

form.addEventListener("submit", e=>{
    e.preventDefault();
	let regexNombre = /^[A-Za-z\s]{3,25}$/
    
    
    var entrar = false;
    parrafo.innerHTML = "";
	var datos= new Array();
	
	 validaClave();

  
});      
function validaClave(){
	
		var warnings = ""
		
		var user = document.getElementById("user").value;
		var password = document.getElementById("password").value;
		
		
		if((user == "admin") && (password == "admin") ){
			entrar = true;
		}else{
			warnings = `Usuario o contraseña no es correcto.<br>`
			entrar = false;
			
		}
			
				
	
		if(entrar){
			window.location.href = "HTML/inicio.html";
			form.reset();
		}else{
			parrafo.innerHTML = warnings;
			
		}

}
