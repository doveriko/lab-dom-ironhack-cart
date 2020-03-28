// starter-code/js/index.js

var cartElement = document.querySelector("#cart tbody"); //viene hecho

//
var totalPriceElement = document.getElementById("#total-price span")
//

var calculateButton = document.getElementById("calc"); //viene hecho

//
// Iteration 1
//
// we create this var to find ALL the products instead of just the first one
var productElements = document.querySelectorAll(".product");

function updateSubtot(oneProductEl) {
  var productSubtotal = oneProductEl.querySelector(".subtot span"); // 3º
  var priceElement = oneProductEl.querySelector(".pu span"); // 1º
  var qtyElement = oneProductEl.querySelector(".qty input"); // 2º

  var price = Number(priceElement.innerHTML); // Se puede usar textContent en vez de innerHTML
  var qty = Number(qtyElement.value) || 0;
  var subTotal = price * qty;

  productSubtotal.innerHTML = subTotal; // update the product's subtotal

  return subTotal;
}

var mainTotal = document.querySelector("h2 span");

function calcAll() {
  var totalPrice = 0;

  
  //
  // Iteration 2
  //


  //updates all the product elements - each row <tr>
  productElements.forEach(function(oneProduct) {
    var productTotal = updateSubtot(oneProduct);

    totalPrice += productTotal;
  });

 
  // Iteration 3 : update the total with `sum`
  
  mainTotal.textContent = totalPrice;
  
}

// Add event listener on click
calculateButton.onclick = calcAll; // same as addEventListener

//
// Iteration 4

/*
deleteButton

*/

var deleteButtons = document.querySelectorAll(".btn-delete");

function bindDeleteButton(deleteButton) {
  deleteButton.onclick = function(e) {
    // delete the product
    console.log("e.currentTarget ->", e.currentTarget);
    console.log("e.currentTarget.parentNode ->", e.currentTarget.parentNode);
    console.log("e.currentTarget.parentNode.parentNode ->", e.currentTarget.parentNode.parentNode);

    // `.parentNode` is the parent (element) of the current element
    // by doing e.currentTarget.parentNode.parentNode we access the grandparent of the current element:
    // which is  <tr class="product">
    var productElement = e.currentTarget.parentNode.parentNode; // <tr class="product">
    cartElement.removeChild(productElement);

    calcAll(); // once deleted, recalc all
  };
}

// Add event listener on each delete button, which deletes the product
deleteButtons.forEach(function(deleteButton) {
  bindDeleteButton(deleteButton);
});


//
// Iteration 5
//

var createButton = document.getElementById("create");

createButton.onclick = function() {
  var nameElement = document.querySelector('.new input[type="text"]');
  var priceElement = document.querySelector('.new input[type="number"]');

  var newTr = document.createElement("tr");

  newTr.className = "product";

  // We create the nested elements by passing a string that represents HTML elements to innerHTML
  // .innerHTML will cause the string to be parsed a converted to nested elements
  newTr.innerHTML = `
    <td class="name">
      <span>${nameElement.value}</span>
    </td>

    <td class="pu">
      $<span>${priceElement.value}</span>
    </td>

    <td class="qty">
      <label>
        <input type="number" value="0" min="0">
      </label>
    </td>

    <td class="subtot">
      $<span>0</span>
    </td>

    <td class="rm">
      <button class="btn btn-delete">delete</button>
    </td>
  `;

  cartElement.appendChild(newTr);

  // don't forget to bind the .onclick handler
  var deleteButton = newTr.querySelector(".btn-delete");
  bindDeleteButton(deleteButton);

  nameElement.value = "";
  priceElement.value = "";
};