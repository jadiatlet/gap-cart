class Cart {
  constructor(name, price, qty, total) {
    this.name = name
    this.price = price
    this.qty = qty
    this.total = total
  }
}

class UserInterface {
  addItemToList(cart) {
    const list = document.getElementById('item-list')
    // Create tr element
    const row = document.createElement('tr')

    row.innerHTML = `
    <td>${cart.name}</td>
    <td>${cart.price}</td>
    <td>${cart.qty}</td>
    <td>${cart.total}</td>
    <td><a href="#"><i class="delete fas fa-trash-alt"></i></a></td>
  `;
    list.appendChild(row)

    Store.totalItem()
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

// Store to Local Storage 
class Store {
  static getItem() {
    let items
    if (localStorage.getItem('items') === null) {
      items = []
    } else {
      items = JSON.parse(localStorage.getItem('items'))
    }

    return items
  }

  static displayItem() {
    const items = Store.getItem()

    items.forEach(item => {
      const ui = new UserInterface
      ui.addItemToList(item)
    })
  }

  static addItem(item) {
    const items = Store.getItem()
    items.push(item)

    localStorage.setItem('items', JSON.stringify(items))
  }

  static totalItem() {
    const items = Store.getItem()
    const grandTotal = document.getElementById('grand-total')
    const initialValue = 0

    grandTotal.value = items.reduce((accumulator, num) => {
      return accumulator + num.total
    }, initialValue)
  }

  static removeItem(target) {
    const items = Store.getItem()

    items.forEach((item, index) => {
      if (item.price === Number.parseInt(target)) {
        items.splice(index, 1)
      }
    })

    localStorage.setItem('items', JSON.stringify(items))
  }

  static clearItems() {
    if (confirm('Are you sure deleting All Item(s) Beybeh?')) {
      localStorage.clear()
    }
  }
}

// Disolay List Item from Local Stirage
document.addEventListener('DOMContentLoaded', Store.displayItem)

// Display Price of Item
document.getElementById("select-item").addEventListener("change", () => {
  // Initiate UI
  const ui = new UserInterface()
  ui.displayItemPrice()
});

// Event Listener Add Item
document.getElementById('price-item').addEventListener('click', e => {
  // GET Value
  const selectItem = document.getElementById("select-item").value
  const valueItem = JSON.parse(selectItem)
  const qtyItem = document.getElementById("qty-item").value
  const itemName = valueItem.name
  const itemPrice = valueItem.price
  const total = itemPrice * qtyItem

  // Initiate Cart
  const cart = new Cart(itemName, itemPrice, qtyItem, total)

  // Initiate UI
  const ui = new UserInterface()

  ui.addItemToList(cart)

  // Add to Local Storage
  Store.addItem(cart)

  ui.clearField()

  e.preventDefault()
})

// Event Listener Delete Item
document.getElementById('item-list').addEventListener('click', e => {
  const ui = new UserInterface()
  const target = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent

  ui.deleteItem(e.target)
  Store.removeItem(target)

  e.preventDefault()
})

// Event Clear All Items From Local Storages
document.getElementById('clear-button').addEventListener('click', () => {
  Store.clearItems()
})