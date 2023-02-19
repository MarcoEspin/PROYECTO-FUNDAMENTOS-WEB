// JavaScript Document


var productNameInp = document.getElementById('pName');
var productLastNameInp = document.getElementById('pLastName');
var productCedulaInp = document.getElementById('pCedula');
var productCorreoInp = document.getElementById('pCorreo');
//var productCategoryInp = document.getElementById('pCat');
var productDireccionInp = document.getElementById('pDireccion');
var addBtn = document.getElementById('addBtn');
var resetBtn = document.getElementById('resetBtn');
var updateBtn = document.getElementById('updateBtn');
updateBtn.style.display = "none";
var inputs = document.getElementsByClassName('form-control');
var currentIndex;
var alertName = document.getElementById('alertName');
var alertLastName = document.getElementById('alertLastName');
var alertCedula = document.getElementById('alertCedula');
var alertCorreo = document.getElementById('alertCorreo');
var alertCate = document.getElementById('alertCate');
var alertDesc = document.getElementById('alertDesc');
var searchNameInput = document.getElementById('searchName');
var searchCateInput = document.getElementById('searchCate');

var products = [];
if(JSON.parse (localStorage.getItem('productsList')) != null) {
    products = JSON.parse (localStorage.getItem('productsList'));
    displayProduct();
}

addBtn.onclick = function(){
    for(var i = 0; i < inputs.length; i++){
        if(validProductName () == true && isProductExist () != true)
        {
            addProduct ();
            displayProduct ();
            resetForm ();
            return 1
        }
        else if(isProductExist ())
        {
            alert('El usuario ingresado ya existe');
            resetForm();
            return 1;
        }
        else if(inputs[i].value == "")
        {
            alert('There is a field or fields Empty..');
            resetForm();
            return 0;
        }
        else
        {
            alert('Registro Inválido..');
            resetForm();
            return 0;
        }
    }
}    

resetBtn.onclick = function(){
    resetForm ();
}

updateBtn.onclick = function(){
    updateProduct();
    displayProduct();
    resetForm ();
    updateBtn.style.display = "none";
}

function addProduct (){
    var product =
    {
        name : productNameInp.value,
        lname: productLastNameInp.value,
        cedula : productCedulaInp.value,
        correo : productCorreoInp.value,
        direccion : productDireccionInp.value,
    }
        products.push(product);
        localStorage.setItem('productsList' , JSON.stringify(products));
}

function displayProduct (){
    var row = '';
    for (var i = 0; i < products.length; i++){
        row += 
        `<tr>
            <td>${i+1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].lname}</td>
            <td>${products[i].cedula}</td>
            <td>${products[i].correo}</td>
            <td>${products[i].direccion}</td>
            <td><button class="btn btn-warning" onclick = "getProductInfo(${i})">Update</button></td>
            <td><button class="btn btn-danger" onclick = "deleteProduct(${i})">Delete</button></td>
        </tr>`
    }
    document.getElementById('myTable').innerHTML = row;
}

function resetForm (){
    for (var i = 0; i < inputs.length; i++){
        inputs[i].value = '';
        inputs[i].classList.remove('is-valid');
        inputs[i].classList.remove('is-invalid');
    }
}

function deleteProduct (index){
    products.splice(index,1);
    displayProduct();
    localStorage.setItem('productsList' , JSON.stringify(products));
}

function getProductInfo (index){
    currentIndex = index;
    var currentProduct = products[index];
        productNameInp.value = currentProduct.name;
        productLastNameInp.value = currentProduct.lname;
        productCedulaInp.value = currentProduct.cedula;
        productCorreoInp.value = currentProduct.correo;
        productDireccionInp.value = currentProduct.direccion;
        updateBtn.style.display = "block";
        addBtn.style.display = 'none';
}

function updateProduct (){
    var product = {
        name : productNameInp.value,
        lname: productLastNameInp.value,
        cedula : productCedulaInp.value,
        correo : productCorreoInp.value,
        direccion : productDireccionInp.value,
    }
    products[currentIndex] = product;
    localStorage.setItem('productsList' , JSON.stringify(products));
    addBtn.style.display = 'inline-block';
}

function searchName(searchText){
    var row = '';
    for (var i = 0; i < products.length; i++){
        if(products[i].name.toLowerCase().includes(searchText.toLowerCase())){
            row += 
            `<tr>
                <td>${i+1}</td>
                <td>${products[i].name}</td>
                <td>${products[i].lname}</td>
                <td>${products[i].cedula}</td>
                <td>${products[i].correo}</td>
                <td>${products[i].direccion}</td>
                <td><button class="btn btn-warning" onclick = "getProductInfo(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick = "deleteProduct(${i})">Delete</button></td>
            </tr>`
        }
        document.getElementById('myTable').innerHTML = row;
    }
}

function searchCate(searchText){
    var row = '';
    for (var i = 0; i < products.length; i++){
        if(products[i].cate.toLowerCase().includes(searchText.toLowerCase())){
            row += 
            `<tr>
                <td>${i+1}</td>
                <td>${products[i].name}</td>
                <td>${products[i].lname}</td>
                <td>${products[i].cedula}</td>
                <td>${products[i].correo}</td>
                <td>${products[i].direccion}</td>
                <td><button class="btn btn-warning" onclick = "getProductInfo(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick = "deleteProduct(${i})">Delete</button></td>
            </tr>`
        }
        document.getElementById('myTable').innerHTML = row;
    }
}


function validProductName (){
    var regexName = /^[A-Za-zÀ-ÿ- ]{3,15}$/;
    if(regexName.test(productNameInp.value))
    {
        productNameInp.classList.add('is-valid');
        productNameInp.classList.remove('is-invalid');
        alertName.classList.add('d-none');
        return true;
    }
    else
    {
        productNameInp.classList.add('is-invalid');
        productNameInp.classList.remove('is-valid');
        alertName.classList.remove('d-none');
        return false;
    }
}

function validProductLastName (){
    var regexName = /^[A-Za-zÀ-ÿ- ]{3,15}$/;
    if(regexName.test(productLastNameInp.value))
    {
        productLastNameInp.classList.add('is-valid');
        productLastNameInp.classList.remove('is-invalid');
        alertName.classList.add('d-none');
        return true;
    }
    else
    {
        productLastNameInp.classList.add('is-invalid');
        productLastNameInp.classList.remove('is-valid');
        alertLastName.classList.remove('d-none');
        return false;
    }
}

function validCedula(expresion, input, campo){
    var regexCedula = /^.{10}$/;
    var cad = productCedulaInp.value.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;
    
    if(regexCedula.test(productCedulaInp.value)){
        productCedulaInp.classList.add('is-valid');
        productCedulaInp.classList.remove('is-invalid');
        alertCedula.classList.add('d-none');
        return true;
    }else{
        productCedulaInp.classList.add('is-invalid');
        productCedulaInp.classList.remove('is-valid');
        alertCedula.classList.remove('d-none');
        return false;
    }
}

function validCorreo (){
    var regexCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(regexCorreo.test(productCorreoInp.value))
    {
        productCorreoInp.classList.add('is-valid');
        productCorreoInp.classList.remove('is-invalid');
        alertCorreo.classList.add('d-none');
        return true;
    }
    else
    {
        productCorreoInp.classList.add('is-invalid');
        productCorreoInp.classList.remove('is-valid');
        alertCorreo.classList.remove('d-none');
        return false;
    }
}

/*function validProductPrice (){
    var regexPrice = /^([0-9]|[0-9][0-9]|[0-9][0-9][0-9]|[0-9][0-9][0-9][0-9]|10000)$/;
    if(regexPrice.test(productPriceInp.value))
    {
        productPriceInp.classList.add('is-valid');
        productPriceInp.classList.remove('is-invalid');
        alertPrice.classList.add('d-none');
        return true;
    }
    else
    {
        productPriceInp.classList.add('is-invalid');
        productPriceInp.classList.remove('is-valid');
        alertPrice.classList.remove('d-none');
        return false;
    }
}*/

/*function validProductCate (){
    if(productCategoryInp.value.toLowerCase() == productNameInp.value.toLowerCase())
    {
        productCategoryInp.classList.add('is-valid');
        productCategoryInp.classList.remove('is-invalid');
        alertCate.classList.add('d-none');
        return true;
    }
    else
    {
        productCategoryInp.classList.add('is-invalid');
        productCategoryInp.classList.remove('is-valid');
        alertCate.classList.remove('d-none');
        return false;
    }
}*/

function isProductExist (){
    for(var i = 0; i < products.length; i++){
        if(products[i].name.toLowerCase() == inputs[0].value.toLowerCase())
        {
            return true;
        }
    }
}

productNameInp.addEventListener('input',validProductName);
productLastNameInp.addEventListener('input',validProductLastName);
productCedulaInp.addEventListener('input',validCedula);
productCorreoInp.addEventListener('input',validCorreo);

//productCategoryInp.addEventListener('input',validProductCate);
//productDescriptionInp.addEventListener('input',validProductDesc);

searchNameInput.addEventListener('keyup', function (){
    searchName(this.value);
})

searchCateInput.addEventListener('keyup', function (){
    searchCate(this.value);
})