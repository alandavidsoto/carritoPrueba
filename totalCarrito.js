export default function totalCarrito() {
  const totalNode = document
    .getElementById("total-carrito")
    .querySelector(".monto");
  let totalSum = 0;
  carrito.map((product) => {
    totalSum += product.price * product.amount;
  });
  totalNode.innerHTML = `$${totalSum}`;
}
