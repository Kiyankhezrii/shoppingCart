// import products data
import { productsData } from "./products.js";

// get element from DOM
const showCart = document.querySelector(".shooping");
const modal = document.querySelector(".modal");
const btns = document.querySelectorAll(".btns");
const totalPrice = document.querySelector(".total-price span");
const productsContainer = document.querySelector(".products-container");
const overlay = document.querySelector(".overlay");
let cart = [];

class Products {
  getData() {
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
    productsContainer.querySelectorAll(".add-btn").forEach((btn) => {
      const id = btn.dataset.id;
      const filterdItem = cart?.find((c) => c.id == id);
      if (!filterdItem) {
        btn.addEventListener("click", () => {
          btn.textContent = "In Cart";
          btn.disabled = true;
          const findItem = {
            ...productsData.find((p) => p.id == id),
            quantity: 1,
          };
          cart.push(findItem);
          const getStorage = Storage.getCartsStorage() || [];
          Storage.setCartsStorage([
            ...getStorage,
            { ...productsData.find((p) => p.id == id), quantity: 1 },
          ]);
          this.renderModal(findItem);
          showCart.querySelector("span").textContent = cart.length;
        });
      } else {
        btn.textContent = "In Cart";
        btn.disabled = true;
      }
    });
  }

  renderModal(items) {
    const html = `
        <div class="modal-container">
            <div class="modal-img">
            <img src="./images/product-${items.id}.jpeg" alt="${items.id}" class="modal__img" />
            </div>
            <p class="modal__price">${items.price} $</p>
            <div class="cehvron">
            <i class="fa-solid fa-chevron-up" data-id=${items.id}></i>
            <p>${items.quantity}</p>
            <i class="fa-solid fa-chevron-down" ${items.id}></i>
            </div>
            <i class="fa-solid fa-trash-can"></i>
        </div>
    `;
    modal.insertAdjacentHTML("afterBegin", html);
  }
}

class Storage {
  static setProductsStorage(pro) {
    localStorage.setItem("products", JSON.stringify(pro));
  }

  static getProductsStorage() {
    return JSON.parse(localStorage.getItem("products"));
  }

  static setCartsStorage(carts) {
    localStorage.setItem("carts", JSON.stringify(carts));
  }

  static getCartsStorage() {
    return JSON.parse(localStorage.getItem("carts"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const product = new Products();
  const ui = new Ui();

  //   render products
  const products = product.getData();
  products.forEach((p) => ui.renderProducts(p));
  Storage.setProductsStorage(products);

  cart = Storage.getCartsStorage() || [];
  cart?.forEach((c) => ui.renderModal(c));
  ui.getButtons();
});

// Modal and Overlay

showCart.addEventListener("click", () => {
  overlay.style.display = "block";
  overlay.style.opacity = ".6";
  modal.classList.remove("hidden");
});

const closeModal = function () {
  overlay.style.display = "none";
  overlay.style.opacity = "0";
  modal.classList.add("hidden");
};

btns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    if (e.target.classList.contains("clear")) {
      closeModal();
      [...modal.children].forEach((item) => {
        if (item.classList.contains("modal-container")) {
          item.remove();
        }
      });
    }
  })
);
overlay.addEventListener("click", () => {
  closeModal();
});
