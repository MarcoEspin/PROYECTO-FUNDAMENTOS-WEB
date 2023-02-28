// JavaScript Document


var productNameProInp = document.getElementById('pNamePro');
var productContactoPro = document.getElementById('pContactoPro');
//var productCedulaInp = document.getElementById('pCedula');
//var productCorreoInp = document.getElementById('pCorreo');
//var productCategoryInp = document.getElementById('pCat');
//var productDireccionInp = document.getElementById('pDireccion');
var addBtnPro = document.getElementById('addBtnPro');
var resetBtnPro = document.getElementById('resetBtnPro');
var updateBtnPro = document.getElementById('updateBtnPro');
updateBtnPro.style.display = "none";
var inputsPro = document.getElementsByClassName('form-control');
var currentIndexPro;
var alertNamePro = document.getElementById('alertNamePro');
//var alertLastName = document.getElementById('alertLastName');
//var alertCate = document.getElementById('alertCate');
//var alertDesc = document.getElementById('alertDesc');
var searchNameInputPro = document.getElementById('searchName');
var searchCateInput = document.getElementById('searchCate');

var productsPro = [];
if(JSON.parse (localStorage.getItem('productsProList')) != null) {
    productsPro = JSON.parse (localStorage.getItem('productsProList'));
    displayProductPro();
}

addBtnPro.onclick = function(){
    for(var i = 0; i < inputsPro.length; i++){
        if(validProductNamePro () == true && isProductExistPro () != true)
        {
            addProductPro ();
            displayProductPro ();
            resetFormPro ();
            return 1
        }
        else if(isProductExistPro ())
        {
            alert('El usuario ingresado ya existe');
            resetFormPro();
            return 1;
        }
        else if(inputsPro[i].value == "")
        {
            alert('There is a field or fields Empty..');
            resetFormPro();
            return 0;
        }
        else
        {
            alert('Registro Inválido..');
            resetFormPro();
            return 0;
        }
    }
}    

resetBtnPro.onclick = function(){
    resetFormPro ();
}

updateBtnPro.onclick = function(){
    updateProductPro();
    displayProductPro();
    resetFormPro ();
    updateBtnPro.style.display = "none";
}

function addProductPro (){
    var productPro =
    {
        namePro : productNameProInp.value,
        contactoPro: productContactoPro.value,
    }
        productsPro.push(productPro);
        localStorage.setItem('productsProList' , JSON.stringify(productsPro));
}

function displayProductPro (){
    var row = '';
    for (var i = 0; i < productsPro.length; i++){
        row += 
        `<tr>
            <td>${i+1}</td>
            <td>${productsPro[i].namePro}</td>
            <td>${productsPro[i].contactoPro}</td>
            <td><button class="btn btn-warning" onclick = "getProductInfoPro(${i})">Update</button></td>
            <td><button class="btn btn-danger" onclick = "deleteProductPro(${i})">Delete</button></td>
        </tr>`
    }
    document.getElementById('myTablePro').innerHTML = row;
}

function resetFormPro (){
    for (var i = 0; i < inputsPro.length; i++){
        inputsPro[i].value = '';
        inputsPro[i].classList.remove('is-valid');
        inputsPro[i].classList.remove('is-invalid');
    }
}

function deleteProductPro (index){
    productsPro.splice(index,1);
    displayProductPro();
    localStorage.setItem('productsProList' , JSON.stringify(productsPro));
}

function getProductInfoPro (index){
    currentIndexPro = index;
    var currentProductPro = productsPro[index];
        productNameProInp.value = currentProductPro.namePro;
        productContactoPro.value = currentProductPro.contactoPro;
        updateBtnPro.style.display = "block";
        addBtnPro.style.display = 'none';
}

function updateProductPro (){
    var productPro = {
        namePro : productNameProInp.value,
        contactoPro: productContactoPro.value,
    }
    productsPro[currentIndexPro] = productPro;
    localStorage.setItem('productsProList' , JSON.stringify(productsPro));
    addBtnPro.style.display = 'inline-block';
}

function searchName(searchText){
    var row = '';
    for (var i = 0; i < productsPro.length; i++){
        if(productsPro[i].name.toLowerCase().includes(searchText.toLowerCase())){
            row += 
            `<tr>
                <td>${i+1}</td>
                <td>${productsPro[i].namePro}</td>
                <td>${productsPro[i].contactoPro}</td>
                <td><button class="btn btn-warning" onclick = "getProductInfoPro(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick = "deleteProductPro(${i})">Delete</button></td>
            </tr>`
        }
        document.getElementById('myTablePro').innerHTML = row;
    }
}

function searchCate(searchText){
    var row = '';
    for (var i = 0; i < productsPro.length; i++){
        if(productsPro[i].cate.toLowerCase().includes(searchText.toLowerCase())){
            row += 
            `<tr>
                <td>${i+1}</td>
                <td>${productsPro[i].namePro}</td>
                <td>${productsPro[i].contactoPro}</td>
                <td><button class="btn btn-warning" onclick = "getProductInfoPro(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick = "deleteProductPro(${i})">Delete</button></td>
            </tr>`
        }
        document.getElementById('myTablePro').innerHTML = row;
    }
}


function validProductNamePro (){
    var regexName = /^[A-Z][a-z]{2,10}$/;
    if(regexName.test(productNameProInp.value))
    {
        productNameProInp.classList.add('is-valid');
        productNameProInp.classList.remove('is-invalid');
        alertNamePro.classList.add('d-none');
        return true;
    }
    else
    {
        productNameProInp.classList.add('is-invalid');
        productNameProInp.classList.remove('is-valid');
        alertNamePro.classList.remove('d-none');
        return false;
    }
}

/*function validProductLastName (){
    var regexName = /^[A-Z][a-z]{2,10}$/;
    if(regexName.test(productContactoPro.value))
    {
        productContactoPro.classList.add('is-valid');
        productContactoPro.classList.remove('is-invalid');
        alertNamePro.classList.add('d-none');
        return true;
    }
    else
    {
        productContactoPro.classList.add('is-invalid');
        productContactoPro.classList.remove('is-valid');
        alertLastName.classList.remove('d-none');
        return false;
    }
}*/

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

function validProductCate (){
    if(productCategoryInp.value.toLowerCase() == productNameProInp.value.toLowerCase())
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
}

function isProductExistPro (){
    for(var i = 0; i < productsPro.length; i++){
        if(productsPro[i].name.toLowerCase() == inputsPro[0].value.toLowerCase())
        {
            return true;
        }
    }
}

productNameProInp.addEventListener('input',validProductNamePro);
//productContactoPro.addEventListener('input',validProductLastName);
//productCategoryInp.addEventListener('input',validProductCate);
//productDescriptionInp.addEventListener('input',validProductDesc);

searchNameInputPro.addEventListener('keyup', function (){
    searchName(this.value);
})

searchCateInput.addEventListener('keyup', function (){
    searchCate(this.value);
})