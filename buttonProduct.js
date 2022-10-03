export function buttonProduct(node, callback) {
  node.addEventListener("click", () => {
    callback();
  });
}
