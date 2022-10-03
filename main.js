import { countProduct } from "./countProduct.js";
import { buttonProduct } from "./buttonProduct.js";
import { productos } from "./productos.js";
import totalCarrito from "./totalCarrito.js";

// carrito es un array de todos los productos que añadimos al carrito y
// carritosIDs nos sirve para verificar si ya existe un producto o no
window.carrito = [];
const carrito = window.carrito;
const carritoIDs = [];

const sectionProductos = document.getElementById("productos");

// Por cada producto vamos a inyectarle su logica de manera independiente.
productos.map((product) => {
  // amount es la cantidad de X producto que tenemos
  let amount = [0];

  // creamos un elemento html (article) en donde vamos a poner nuestro codigo HTML
  const article = document.createElement("article");
  article.classList.add(
    "card",
    "position-relative",
    "col-12",
    "col-sm-6",
    "col-md-4",
    "col-lg-6",
    "col-xl-4"
  );
  article.style.height = "325px";

  article.innerHTML = `<span
    class="bg-success fs-5 text-white position-absolute top-0 start-50 rounded-bottom text-center shadow w-50 f"
  >
    $${product.price}
  </span>
  <img
    src="${product.urlImage}"
    class="card-img-top h-50"
    alt="${product.title}"
    style="object-fit: contain;"
  />
  <div class="card-body h-50">
    <h6 class="card-title fw-lighter" title="${product.title}" style="height: 30%">${product.title}</h6>
    <div class="container-counter d-flex justify-content-center align-items-center gap-1 my-1" style="height: 30%">
  <button class="decrease btn py-1 fw-bold" style="background-color: #f7e582"  >
    -
  </button>
  <input
    type="text"
    class="input-counter w-25 text-center"
    maxlength="4"
    value="0"
  />
  
  <button class="increase btn py-1 fw-bold" style="background-color: #f7e582" >
    +
  </button>
  </div>
    <div class="text-center" style="height: 40%">
      <button class="buy btn btn-outline-warning w-75"><i class="bi bi-cart2 h1-xl"></i> Añadir </button>
    </div>
  </div>`;

  // aca realizamos la logica del contador de producto
  countProduct(article, amount);

  // le añadimos un evento al boton de "AÑADIR" y le enviamos un callback

  buttonProduct(article.querySelector(".buy"), () => {
    // dentro del callback verificamos si existe o no un producto

    if (carritoIDs.includes(product.id)) {
      carrito.map((element, index) => {
        if (element.id == product.id) {
          carrito[index] = {
            ...product,
            amount: carrito[index].amount + amount[0],
          };
          totalCarrito();
        }
      });
    } else {
      carrito.push({ ...product, amount: amount[0] });
      carritoIDs.push(product.id);
      totalCarrito();
    }
    const inputCounter = article.querySelector(".input-counter");
    inputCounter.value = 0;
    amount[0] = 0;

    // imprimimos  el producto que añadimos + los demas que estan en el carrito

    const productCarrito = document.getElementById("productos-carrito");
    const fragment = document.createDocumentFragment();

    carrito.map((product, index) => {
      const tr_template = document.createElement("tr");
      tr_template.classList.add("fw-lighter");

      tr_template.innerHTML += `<td>${product.title}</td>
      <td>
        <button class="previus btn btn-outline-warning p-1 fw-bold"  >
          <i class="bi bi-arrow-left-short"></i>
        </button>
        <span class="mx-0 amount d-inline-block" style="width: 30px">${
          product.amount
        }</span>
        <button class="next btn btn-outline-warning p-1 fw-bold"  >
          <i class="bi bi-arrow-right-short"></i>
        </button>
      </td>
      <td class="total-price">$${product.amount * Number(product.price)}</td>`;
      const totalPrice = tr_template.querySelector(".total-price");
      const prev = tr_template.querySelector(".previus");
      const amount = tr_template.querySelector(".amount");
      prev.addEventListener("click", () => {
        const result = carrito[index].amount - 1;
        carrito[index].amount = result;
        amount.innerHTML = result;
        totalPrice.innerHTML = `$${product.price * result}`;
        totalCarrito();
      });
      const next = tr_template.querySelector(".next");
      next.addEventListener("click", () => {
        const result = carrito[index].amount + 1;
        carrito[index].amount = result;
        amount.innerHTML = result;
        totalPrice.innerHTML = `$${product.price * result}`;
        totalCarrito();
      });

      fragment.appendChild(tr_template);
    });
    productCarrito.innerHTML = "";
    productCarrito.appendChild(fragment);
  });

  // cuando ya tengamos el articulo realizado solo lo
  // agregamos a la seccion de productos
  sectionProductos.appendChild(article);
});
