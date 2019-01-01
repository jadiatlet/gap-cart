class Cart {
  constructor(item, price, qty, total) {
    this.item = item
    this.price = price
    this.qty = qty
    this.total = total
  }
}

class UI {
  addItemToList(cart) {
    const list = document.getElementById('item-list')
    // Create tr element
    const row = document.createElement('tr')

    row.innerHTML = `
    <td>${cart.item}</td>
    <td>${cart.price}</td>
    <td>${cart.qty}</td>
    <td>${cart.total}</td>
    <td><a href="#"><i class="delete fas fa-trash-alt"></i></a></td>
  `;
    list.appendChild(row)
  }

  displayItemPrice() {
    const priceOfItem = document.querySelector(".price-tag");
    const valueItem = JSON.parse(document.getElementById("select-item").value)
    priceOfItem.innerHTML = valueItem.price;
  }

  deleteItem(target) {
    if (target.classList.contains('delete')) {
      if (confirm('Are You Sure Beybeh?')) {
        target.parentElement.parentElement.parentElement.remove()
      }
    }
  }

  clearField() {
    document.getElementById("select-item").value = null
    document.querySelector(".price-tag").innerHTML = 0
    document.getElementById("qty-item").value = null
  }
}

// Display Price of Item
document.getElementById("select-item").addEventListener("change", () => {
  // Initiate UI
  const ui = new UI()
  ui.displayItemPrice()
});

// Event Listener Add Item
document.getElementById('price-item').addEventListener('click', e => {
  // GET Value
  const selectItem = document.getElementById("select-item")
  const valueItem = JSON.parse(selectItem.value)
  const qtyItem = document.getElementById("qty-item").value
  const itemName = valueItem.name
  const itemPrice = valueItem.price
  const total = itemPrice * qtyItem

  // Initiate Cart
  const cart = new Cart(itemName, itemPrice, qtyItem, total)

  // Initiate UI
  const ui = new UI()

  console.log(ui)

  if (qtyItem === null) {
    alert('Failed')
  }

  ui.addItemToList(cart)
  ui.clearField()

  e.preventDefault()
})

// Event Listener Delete Item
document.getElementById('item-list').addEventListener('click', e => {
  const ui = new UI()
  ui.deleteItem(e.target)

  e.preventDefault()
})