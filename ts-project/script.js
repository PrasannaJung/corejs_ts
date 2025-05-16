function getElement(idName) {
  const ref = document.getElementById(idName);
  if (!ref) throw new Error("the element doesnot exist in the DOM");
  else return ref;
}

function addItems() {
  const itemsCount = 0;

  const btn = getElement("addItemBtn");
  const ul = getElement("itemList");
  btn.addEventListener("click", () => {
    const input = getElement("itemInput").value;
    const li = document.createElement("li");
    li.textContent = ` ${++itemsCount} ${input} `;
    ul.append(li);
  });
}

addItems();
