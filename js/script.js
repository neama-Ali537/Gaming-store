// the vairable
let productName = document.getElementById("productname");
let productPrice = document.getElementById("productprice");
let productCategory = document.getElementById("productcategory");
let productRate = document.getElementById("productopinio");
let tableBody = document.getElementById("tablebody");
let addCardBtn = document.getElementById("addcard");
let searchInput = document.getElementById("searchinput");
let updatBtn = document.getElementById('updatebtn')
let productContainer = [];

// localStorage
if (localStorage.getItem("products") != null) {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}
// function ro pateen add prodct.name()
function valedateProductName() {
  let regex = /^[A-Z][a-z]{4,9}$/;
  if (regex.test(productName.value) == true) {
    return true;
  } else {
    return false;
  }
}
// add products in input (main function)
function addProducts() {
  addCardBtn.addEventListener("click", () => {
    if (valedateProductName() == true) {
      let producs = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        rate: productRate.value,
      };
      productContainer.push(producs);
      localStorage.setItem("products", JSON.stringify(productContainer));
      displayProducts();
      clearProducts();
    } else {
      window.alert("you should write product name with Capital letters");
    }
  });
}
addProducts();
// to remove all value from input
function clearProducts() {
  addCardBtn.addEventListener("click", () => {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productRate.value = "";
  });
}

function displayProducts() {
  let cartona = ``;
  for (let i = 0; i < productContainer.length; i++) {
    cartona += ` <tbody">
          <tr class="bg-dark">

            <td scope="col">${i + 1}</td>
            <td scope="col">${productContainer[i].name}</td>
            <td scope="col">${productContainer[i].price}</td>
            <td scope="col">${productContainer[i].category}</td>
            <td scope="col">${productContainer[i].rate}</td>
            <td scope="col">  <button  onclick="deleteProducts(${i})" id="deletbtn" class="btn btn-danger btn-sm">Delete</button></td>
            <td scope="col">  <button id="updatebtn" class="btn btn-info btn-sm">Update</button></td>
            <td scope="col">  <button id="updatebtn" class="btn btn-warning btn-sm">Save</button></td>

          </tr>
        </tbody>`;
  }
 
  tableBody.innerHTML = cartona;
}

// delete function

function deleteProducts(deletInex) {
  productContainer.splice(deletInex, 1);
  localStorage.setItem("products", JSON.stringify(productContainer));

  displayProducts();
}
// updat Button

// updat Button
// search function

function searchFunction(term) {
  let cartona = ``;
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      cartona += ` 
      <tr >

        <td scope="col">${i + 1}</td>
        <td scope="col">${productContainer[i].name}</td>
        <td scope="col">${productContainer[i].price}</td>
        <td scope="col">${productContainer[i].category}</td>
        <td scope="col">${productContainer[i].rate}</td>
        <td scope="col">  <button  onclick="deleteProducts(${i})" id="deletbtn" class="btn btn-danger btn-sm">Delete</button></td>
        <td scope="col">  <button id="updatebtn" class="btn btn-info btn-sm">Update</button></td>

      </tr>
 `;
    }
  }
  tableBody.innerHTML = cartona;
}
// //////////////////////////////////////////////////////////
// start logic in img slider

let imgesContainer = Array.from(
  document.querySelectorAll(".img-container img")
);

let overLayImg = document.querySelector(".overlay-img");
let imgBox = document.querySelector(".img-box");
let arrowLeft = document.querySelector("#arrowleft");
let arrowRight = document.querySelector("#arrowright");
let closeBtn = document.querySelector("#close");
let imgIndexSrc;
imgesContainer.forEach((item, index) => {
  item.addEventListener("click", function (e) {
    overLayImg.classList.replace("d-none", "d-block");
    imgIndexSrc = e.target.src;
    imgBox.style.backgroundImage = `url(${imgIndexSrc})`;

    imgIndexSrc = index;
  });
});
arrowRight.addEventListener("click", () => {
  imgIndexSrc = (imgIndexSrc + 1) % imgesContainer.length;

  imgBox.style.backgroundImage = `url(${imgesContainer[imgIndexSrc].src})`;
});
arrowLeft.addEventListener("click", () => {
  if (imgIndexSrc === 0) {
    imgIndexSrc = imgesContainer.length - 1;
  } else {
    imgIndexSrc = imgIndexSrc - 1;
  }
  imgBox.style.backgroundImage = `url(${imgesContainer[imgIndexSrc].src})`;
});

closeBtn.addEventListener("click", () => {
  overLayImg.classList.replace("d-block", "d-none");
});
