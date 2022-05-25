var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');

var updateButton = document.getElementById("updateBtn");
var addButton = document.getElementById("addBtn");

var productContainer = [];

if(localStorage.getItem('myProducts') != null){
    productContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProduct(productContainer);
}
else{
    productContainer = [];
}

function addProduct(){
    if(validateProductName() == true){
        var product = {
            name : productName.value,
            price : productPrice.value,
            category : productCategory.value,
            desc : productDescription.value
        }
    
        productContainer.push(product);
    
        localStorage.setItem('myProducts' , JSON.stringify(productContainer));
    
        clearProduct();
    
        displayProduct(productContainer);
        console.log(productContainer);
        
        productName.classList.remove('is-valid');
    }
    else{
        alert("name isn't valid");
    }
}

function clearProduct(){
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}

function displayProduct(arr){
    var cartona  =``;
    for(i=0 ; i < arr.length ; i++){
       
        cartona += `<tr>
        <td>${i}</td>
        <td>${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].desc}</td>
        <td> <button onclick = " updateProduct(${i}) " class="btn btn-warning">Update</button> </td>
        <td> <button onclick = " deleteProduct(${i}) "  class="btn btn-danger">Delete</button> </td>
    </tr>`
    }
    document.getElementById("tableData").innerHTML = cartona;
}

function searchProduct(searchTerm){
    
    var serachResult = [];
    for( i=0 ; i < productContainer.length ; i++){
        if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true){
            serachResult.push(productContainer[i]);
        }
    }
    displayProduct(serachResult);
}

function deleteProduct(deletedIndex){
    productContainer.splice(deletedIndex , 1);
    displayProduct(productContainer);
    localStorage.setItem('myProducts' , JSON.stringify(productContainer));
}


var updatedProductIndex = 0;
function updateProduct(updatedIndex){

    updatedProductIndex = updatedIndex;

    productName.value = productContainer[updatedIndex].name;
    productPrice.value = productContainer[updatedIndex].price;
    productCategory.value = productContainer[updatedIndex].category;
    productDescription.value = productContainer[updatedIndex].desc;

    updateButton.classList.replace("d-none" ,"d-inline-block" );
    addButton.classList.add("d-none" , "d-inline-block");

    clearTableRowInUpdate(updatedIndex);

    displayProduct(productContainer);
}

function clearTableRowInUpdate(x){
    productContainer[x].name = "";
    productContainer[x].price = "";
    productContainer[x].category = "";
    productContainer[x].desc = "";
}

function updateProductByButton(){

    productContainer[updatedProductIndex].name = productName.value;
    productContainer[updatedProductIndex].price = productPrice.value;
    productContainer[updatedProductIndex].category = productCategory.value;
    productContainer[updatedProductIndex].desc = productDescription.value;

    localStorage.setItem('myProducts' , JSON.stringify(productContainer));

    displayProduct(productContainer);

    clearProduct();

    addButton.classList.replace("d-none" , "d-inline-block");
    updateButton.classList.replace("d-inline-block" , "d-none" );
}


function validateProductName() {
    var regex = /^[A-Z][a-z\s0-9]{1,15}$/;

    if(regex.test(productName.value) == true){
     
        productName.classList.replace("is-invalid" , "is-valid");
        return true;
    }
    else{
        productName.classList.add("is-invalid");
        return false;
    }
}