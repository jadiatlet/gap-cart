const selectItem = document.getElementById("select-item");

const form = document.getElementById("price-item");
const priceOfItem = document.querySelector(".price-tag");
const qtyItem = document.getElementById("qty-item");

const deleteBtn = document.querySelector(".remove");

const handleItem = () => {
  const valueItem = JSON.parse(selectItem.value);
  priceOfItem.innerHTML = valueItem.price;
};

selectItem.addEventListener("change", handleItem);

form.addEventListener("submit", event => {
  event.preventDefault();

  const valueItem = JSON.parse(selectItem.value);
  const qty = qtyItem.value;

  const itemList = document.getElementById("item-list");
  const row = document.createElement("tr");

  const total = valueItem.price * qty;
  row.innerHTML = `
  <td>${valueItem.name}</td>
  <td>${valueItem.price}</td>
  <td>${qty}</td>
  <td>${total}</td>
  <td><a href="#"><i class="remove fas fa-trash-alt"></i></a></td>
`;

  itemList.appendChild(row);

  qtyItem.value = null;
});

deleteBtn.addEventListener("click", event => {
  if (event.target.classList.contains("remove")) {
    event.target.parentElement.parentElement.parentElement.remove();
  }

  console.log(e.target)
});
