import { productsData } from "./products.js";

// get element from DOM
const shopping = document.querySelector(".shooping");
const modalContainer = document.querySelector(".modal-container");
const modalBtn = document.querySelector(".btns");
const numberProduct = document.querySelector(".chevron");
const deleteProduct = document.querySelector(".fa-trash-can");
const productsContainer = document.querySelector(".products-container");

class Products {
  getProducts() {
    return productsData;
  }
}

class Ui {
  renderProducts(p) {
    const html = `
              <div class="product">
                  <div class="product-img">
                      <img src="./images/product-${p.id}.jpeg" alt="p-${p.id}" class="p__img" />
                  </div>
                  <div class="products-info">
                      <p class="product-price">${p.price}$</p>
                      <p class="product-title">${p.title}</p>
                  </div>
                  <button class="add-btn" type="submit" data-id=${p.id}>add to Cart</button>
              </div>
              `;

    productsContainer.insertAdjacentHTML("afterbegin", html);
  }
}

class Storage {
  static setProductsStorage(p) {
    localStorage.setItem("products", JSON.stringify(p));
  }
  static getProductsStorage() {
    return JSON.parse(localStorage.getItem("products"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const getPro = new Products();
  const ui = new Ui();
  const pro = getPro.getProducts();

  if (Storage.getProductsStorage()) {
    const p = [...Storage.getProductsStorage()];
    p.forEach((x) => ui.renderProducts(x));
  } else {
    pro.forEach((p) => ui.renderProducts(p));
    Storage.setProductsStorage(pro);
  }
});
