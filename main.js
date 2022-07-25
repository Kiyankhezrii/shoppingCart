// import products data
import { productsData } from "./products.js";

// get element from DOM
const shopping = document.querySelector(".shooping");
const modalContainer = document.querySelectorAll(".modal-container");
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".btns");
const numberProduct = document.querySelector(".chevron");
const deleteProduct = document.querySelector(".fa-trash-can");
const productsContainer = document.querySelector(".products-container");
const overlay = document.querySelector(".overlay");
let cart = [];

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
  getButtons() {
    const btns = document.querySelectorAll(".add-btn");
    btns.forEach((btn) => {
      const id = btn.dataset.id;
      const storage = Storage.getCartStorage();
      const filterCart =
        storage?.find((c) => c.id == id) || cart.find((c) => c.id == id);
      if (!filterCart) {
        btn.addEventListener("click", () => {
          btn.textContent = "In cart";
          btn.disable = true;
          const newP = productsData.find((p) => p.id == id);
          cart = [...cart, { ...newP, quantity: 1 }];
          Storage.setCartStorage([...cart]);
        });
      } else {
        btn.textContent = "In cart";
        btn.disable = true;
      }
    });
  }
}

class Storage {
  static setProductsStorage(p) {
    localStorage.setItem("products", JSON.stringify(p));
  }
  static getProductsStorage() {
    return JSON.parse(localStorage.getItem("products"));
  }
  static setCartStorage(c) {
    localStorage.setItem("cart", JSON.stringify(c));
  }
  static getCartStorage() {
    return JSON.parse(localStorage.getItem("cart"));
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
  //   const cartItems = Storage.getCartStorage() || [];
  ui.getButtons();
});

// modal and overlay
modalBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("clear")) {
    modalContainer.forEach((mc) => mc.remove());
    modal.classList.add("hidden");
    overlay.style.opacity = "1";
    overlay.style.display = "none";
  }
});

shopping.addEventListener("click", (e) => {
  modal.classList.remove("hidden");
  overlay.style.opacity = ".6";
  overlay.style.display = "block";
});
