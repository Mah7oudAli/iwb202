                          // بسم الله الرحمن الرحيم 

const typesSelect = document.getElementById("typesSelect");
const productsContainer = document.getElementById("productsContainer");
const products = productsContainer.getElementsByClassName("product");

typesSelect.addEventListener("change", function() {
  const selectedType = this.value;
  
  Array.from(products).forEach(function(product) {
    product.classList.remove("show");
    
  });
  
  if (selectedType !== "") {
    const selectedProducts = productsContainer.getElementsByClassName(selectedType);
    Array.from(selectedProducts).forEach(function(product) {
      product.classList.add("show");
      
    }); 
  }
});

// سكربت اظهار نافذة مواصفات المنتج

const infoButtons = document.getElementsByClassName("infoButton");
const popupContainers = document.getElementsByClassName("popupContainer");
const closeButtons = document.getElementsByClassName("closeButton");

for (let i = 0; i < infoButtons.length; i++) {
  infoButtons[i].addEventListener("click", function() {
    popupContainers[i].style.display = "block";
  });

  closeButtons[i].addEventListener("click", function() {
    popupContainers[i].style.display = "none";
  });
}

  //  إضافة المنتجات إلى سلة المشتريات
  const addToCartButtons = document.querySelectorAll('.addToCartButton');
const buyButtons = document.querySelectorAll('.buyButton');
const cartItemsContainer = document.querySelector('.cartItems');
const purchaseFormContainer = document.querySelector('.purchaseFormContainer');
const confirmPurchaseButton = document.querySelector('.confirmPurchaseButton');
const clearCartButton = document.createElement('button');
const checkoutButton = document.createElement('button');
const consoleButton = document.createElement('button');
let totalPrice = 0;
const taxPercentage = 0.05; 

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const product = button.parentNode.parentNode;
    const productName = product.querySelector('p').textContent;
    const productPrice = product.querySelector('span').textContent;
    const productSpecs = product.querySelector('.popupContent').querySelectorAll('p')[1].textContent;
    const productImageSrc = product.querySelector('img').src;

    const table = cartItemsContainer;

    const row = table.insertRow(-1);
    const nameCell = row.insertCell(0);
    const priceCell = row.insertCell(1);
    const specsCell = row.insertCell(2);
    const imageCell = row.insertCell(3);
    const removeCell = row.insertCell(4);
  
    nameCell.textContent = productName;
    priceCell.textContent = productPrice;
    specsCell.textContent = productSpecs;

    const image = document.createElement('img');
    image.src = productImageSrc;
    image.width = 50;
    image.height = 50;
    imageCell.appendChild(image);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'إزالة';
    removeButton.classList.add('removeButton');
    removeButton.addEventListener('click', () => {
      table.deleteRow(row.rowIndex);
      totalPrice -= parseFloat(productPrice);
      calculateTotalPrice();
    });
    removeCell.appendChild(removeButton);

    

    totalPrice += parseFloat(productPrice);
    calculateTotalPrice();
  });
});

clearCartButton.textContent = 'افراغ السلة';
clearCartButton.classList.add('clearCartButton');
clearCartButton.addEventListener('click', () => {
  while (cartItemsContainer.firstChild) {
    cartItemsContainer.removeChild(cartItemsContainer.firstChild);
  }
  totalPrice = 0;
  calculateTotalPrice();
});

checkoutButton.textContent = 'متابعة الشراء';
checkoutButton.classList.add('checkoutButton');
checkoutButton.addEventListener('click', () => {
  purchaseFormContainer.style.display = 'block';
});

function concel(){
  purchaseFormContainer.style.display = 'none';
}

const cartContainer = document.querySelector('.cartContainer');
cartContainer.appendChild(clearCartButton);
cartContainer.appendChild(checkoutButton);



function calculateTotalPrice() {
  const totalPriceCell = document.getElementById('totalPrice');
  const taxCell = document.getElementById('tax');
  const totalWithTaxCell = document.getElementById('totalWithTax');
  const taxAmount = totalPrice * taxPercentage;
  const totalWithTax = totalPrice + taxAmount;

  totalPriceCell.textContent = 'إجمالي السعر: ' + totalPrice.toFixed(2);
  taxCell.textContent = 'الضريبة (5%): ' + taxAmount.toFixed(2);
  totalWithTaxCell.textContent = 'السعر الإجمالي (شامل الضريبة): ' + totalWithTax.toFixed(2);

  return totalWithTax;  
}

// سكربت توليد رمز capatcha والتحقق منه
function generateCaptcha() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captchaCode = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    captchaCode += characters[randomIndex];
  }
  document.getElementById('captchaCode').textContent = captchaCode;
  document.getElementById('captchaInput').value = '';
  return captchaCode;
}

function refreshCaptcha() {
  generateCaptcha();
}

function validateCaptcha() {
  const captchaCode = document.getElementById('captchaInput').value;
  const enteredCode = captchaCode.trim();
  const generatedCode = document.getElementById('captchaCode').textContent;
  if (enteredCode === generatedCode) {
    const totalPrice = calculateTotalPrice(); 
    alert('تم التحقق بنجاح! السعر الإجمالي: ' + totalPrice);
  } else {
    alert('رمز CAPTCHA غير صحيح. يرجى المحاولة مرة أخرى.');
  }
}
document.getElementById('refreshCaptchaButton').addEventListener('click', refreshCaptcha);
document.getElementById('userForm').addEventListener('submit', (event) => {
  event.preventDefault();
  validateCaptcha();
});
          /////////////////////////////////////////////////////////////////            
          //                                                            ///
          //                         النهاية ♥                         ///   
          //                                                           ///   
         ////////////////////////////////////////////////////////////////// 