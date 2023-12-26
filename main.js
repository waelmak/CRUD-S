//get total
//create product
//save in local storage
//clear inputs
//read
//count
//delete and update
//search
//data validation


//retrieves an HTML element (inputs) by its id : access and manipulate the content or properties
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'create'
let tmp ; 

//Test the inputs
console.log(title, price, taxes, ads, discount, total, count, category, submit);

//GET TOTAL FUNCTION 
// Check if the 'price' input has a value
// Calculate the total by summing 'price', 'taxes', and 'ads', and subtracting 'discount'
// Display the calculated result in the 'total' element
// Set the background of the 'total' element to green
// If 'price' is empty, set the background of the 'total' element to red
//onkeyup="getTotal()" is inserted into the HTML elements to run calculation based on inputs  
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result; //type : string so we add '+' to convert to a number
    total.style.background = "green";
  } else {
    total.style.background = "red";
  }
}


//CREATE PRODUCT
// Check if 'localStorage.product' exists
// Parse the JSON data from 'localStorage.product' and assign it to 'dataPro'
// If 'localStorage.product' doesn't exist, initialize 'dataPro' as an empty array

let dataPro;
if (localStorage.product) {
  dataPro = JSON.parse(localStorage.product); //if localstorage contain objects , they will not be erased whene creating another object
} else {
    dataPro =[]
}

// Create a new object 'newPro' with properties based on input values
submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (title.value != '' && price.value != '' && category.value != '' && newPro.count < 100) //data validation 
  {if (mood === 'create') { // mood
    if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
        }
    } else {
        dataPro.push(newPro);
    }
  } else {      //here the mood is not 'create' , 
    dataPro[tmp] = newPro ; 
    mood = 'create'
    submit.innerHTML = 'create'
    count.display = 'none'
}
  clearData()
}
  

  //save the data inside the local storage of the browser 
  localStorage.setItem("product", JSON.stringify(dataPro)); 
  clearData(); // clear data after submit button is clicked
  showData(); // display the data without reloading the page

};


// clear inputs 
function clearData(){
    title.value='',
    price.value='',
    taxes.value='',
    ads.value='',
    discount.value='',
    total.innerHTML='',
    count.value='',
    category.value=''

}



//DISPLAY DATA
function showData(){
    getTotal() ; 
    let table = '' ; 
    for (let i=0 ; i<dataPro.length ; i++){
       // console.log(dataPro);
        table += 
        `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
    }
    //console.log(table);   
    document.getElementById("tbody").innerHTML= table;

    //if there is no products , the 'deleteAll' button will not appear.
    let btnDelete = document.getElementById("deleteAll")
    if (dataPro.length > 0 ) {
      btnDelete.innerHTML = `<button onclick=deleteAll()> delete All </button>`
    } else {
      btnDelete.style.display = "none";
    }
    
}

function deleteData(i) {
  dataPro.splice(i,1)                            //delete an element from the array using index 'i'
  localStorage.product = JSON.stringify(dataPro) //update the data into local storage
  showData()                                     //display the data to the table
}
showData()                                       //display the data to the table 


function deleteAll() {
  localStorage.clear()
  dataPro.splice(0)
  showData() 
}


//UPDATE
function updateData(i){
  //console.log(i);
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal() ; 
  count.style.display = 'none';
  category.value = dataPro[i].category;
  submit.innerHTML = 'update';
  mood = 'update'
  tmp = i                     //'i'    is converted to a global variable
  scroll({top:0 , behavior:"smooth"})
}



let searchMode = 'title' ; 

function getSearchMode(id)
{
  //console.log(id);
  let search = document.getElementById('search');
  if (id =='searchTitle'){
  searchMode = 'title'
  search.placeholder = 'Search By Title';
  }else {
    searchMode = 'category';
    search.placeholder = 'Search By category';
   }
  search.focus() ;
  search.value='' ;
  showData() ; 

}


function searchData(value) {
  let table = '';
  if (searchMode === 'title') {
      for (let i = 0; i < dataPro.length; i++) {
          if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
              table += `
                  <tr>
                      <td>${i}</td>
                      <td>${dataPro[i].title}</td>
                      <td>${dataPro[i].price}</td>
                      <td>${dataPro[i].taxes}</td>
                      <td>${dataPro[i].ads}</td>
                      <td>${dataPro[i].discount}</td>
                      <td>${dataPro[i].total}</td>
                      <td>${dataPro[i].category}</td>
                      <td><button id="update" onclick="updateData(${i})">Update</button></td>
                      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                  </tr>
              `;
          }
      }
  } else {
      for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
            table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
            `;
        }
    }
  }

  // Display the results in the table
  document.getElementById("tbody").innerHTML = table;
}