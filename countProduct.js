export function countProduct(node, amount) {
  const handlerDecrease = () => {
    amount[0] -= 1;
    input.value = amount;
  };
  const handlerIncrease = () => {
    amount[0] += 1;
    input.value = amount;
  };

  const handlerChange = (e) => {
    if (e.target.value.length > 0) {
      amount[0] = Number(e.target.value);
    }
  };

  node.querySelector(".decrease").addEventListener("click", handlerDecrease);
  const input = node.querySelector(".input-counter");
  input.addEventListener("input", handlerChange);
  node.querySelector(".increase").addEventListener("click", handlerIncrease);
}
