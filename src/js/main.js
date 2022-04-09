import '../../node_modules/focus-visible/dist/focus-visible';

import '../scss/main.scss';
import '../index.html';


let sum = document.querySelector('.sum');
let qty = document.querySelector('.qty');
let info = document.querySelector('.info');
let alertPopup = document.querySelector('.alert-popup');
let closeBtn = document.querySelector('.close');


let tableWrapper = document.querySelector('.table');
let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.setAttribute('id', 'table');

table.appendChild(thead);
table.appendChild(tbody);


let tr = document.createElement('tr');
let th_1 = document.createElement('th');
th_1.innerHTML = 'No.';
let th_2 = document.createElement('th');
th_2.innerHTML = 'Name';
let th_3 = document.createElement('th');
th_3.innerHTML = 'Description';
let th_4 = document.createElement('th');
th_4.innerHTML = 'Category';
let th_5 = document.createElement('th');
th_5.innerHTML = 'Price';
let th_6 = document.createElement('th');
th_6.innerHTML = '';

tr.appendChild(th_1);
tr.appendChild(th_2);
tr.appendChild(th_3);
tr.appendChild(th_4);
tr.appendChild(th_5);
tr.appendChild(th_6);
thead.appendChild(tr);

tableWrapper.appendChild(table);

function initAddRow(e) {
  e.preventDefault();

  let nameValue = document.getElementById("name").value;
  let descrValue = document.getElementById("descr").value;
  let priceValue = document.getElementById("price").value;
  let categoryValue = document.getElementById("category").value;

  if (nameValue == '') {
    alertPopup.classList.add('show-alert');

  } else if (descrValue == '') {
    alertPopup.classList.add('show-alert');


  } else if (categoryValue == '') {
    alertPopup.classList.add('show-alert');


  } else if (priceValue == '') {
    alertPopup.classList.add('show-alert');

  } else {
    tableWrapper.style.display = "block";
    info.style.display = "block";

    let row = tbody.insertRow(-1);
    let number = row.insertCell(0);
    let name = row.insertCell(1);
    let descr = row.insertCell(2);
    let category = row.insertCell(3);
    let price = row.insertCell(4);
    let deleteBtn = row.insertCell(5);

    number.setAttribute("data-label", "No.");
    name.setAttribute("data-label", "Name");
    descr.setAttribute("data-label", "Description");
    category.setAttribute("data-label", "Category.");
    price.setAttribute("data-label", "Price");
    price.classList.add("price");

    let inputs = document.querySelectorAll('.form input');
    let categorySelect = document.getElementById("category");

    name.innerHTML = nameValue;
    descr.innerHTML = descrValue;
    category.innerHTML = categorySelect.options[categorySelect.selectedIndex].text;
    price.innerHTML = `${priceValue}$`;
    number.innerHTML = row.parentNode.children.length;
    deleteBtn.innerHTML = `<input type="button" value="Delete" />`;

    sum.innerHTML = +(sum.innerHTML) + +priceValue;
    qty.innerHTML = row.parentNode.children.length;

    inputs.forEach((element) => {
      element.value = '';
    })
    categorySelect.selectedIndex = 0;
  }
}

document.getElementById("submit").onclick = function (e) {
  initAddRow(e);
}

function deleteTheRow(row) {
    table.deleteRow(row);
}

function tableclick(e) {
  if (e.target.value == "Delete") {
    let num = e.target.parentNode.parentNode.querySelector('.price').textContent.match(/\d+/g);
    sum.innerHTML = +(sum.innerHTML) - num;
    qty.innerHTML = e.target.parentNode.parentNode.parentNode.children.length - 1;
    initToDefault();
    deleteTheRow(e.target.parentNode.parentNode.rowIndex);
  }
}

function initToDefault() {
  if (qty.textContent == 0) {
    tableWrapper.style.display = "none";
    info.style.display = "none";
  }
}

table.addEventListener('click', tableclick, false);

closeBtn.onclick = function () {
  alertPopup.classList.remove('show-alert');
}
