class Cart {
  constructor(name, price, qty, total) {
    this.name = name;
    this.price = price;
    this.qty = qty;
    this.total = total;
  }
}

class UserInterface {
  addItemToList(cart) {
    const list = document.getElementById("item-list");
    const row = document.createElement("tr"); // Create tr element

    row.innerHTML = `
    <td>${cart.name}</td>
    <td>${cart.price}</td>
    <td>${cart.qty}</td>
    <td>${cart.total}</td>
    <td><a href="#"><i class="delete fas fa-trash-alt"></i></a></td>
  `;
    list.appendChild(row);

    Store.totalItem();
  }

  displayItemPrice() {
    const priceOfItem = document.querySelector(".price-tag");
    const valueItem = JSON.parse(document.getElementById("select-item").value);
    priceOfItem.innerHTML = valueItem.price;
  }

  deleteItem(target) {
    if (target.classList.contains("delete")) {
      if (confirm("Are You Sure Beybeh?")) {
        target.parentElement.parentElement.parentElement.remove();
      }
    }
  }

  clearField() {
    document.getElementById("select-item").value = null;
    document.querySelector(".price-tag").innerHTML = 0;
    document.getElementById("qty-item").value = null;
  }

  calculateItem(cash, change, grandTotal) {
    if (cash.value === null) {
      alert("Please pay the bill !");
    } else {
      change.value = Number.parseInt(cash.value - grandTotal.value);
    }

    if (change.value < 0) {
      alert("Your money is not enough !");
      change.value = null;
    }
  }

  checkout(grandTotal, cash, change) {
    const checkoutList = document.querySelector(".checkout-list");
    const checkoutArr = [grandTotal, cash, change];
    console.log(checkoutArr[4]);
    // checkoutArr.forEach(item => console.log(typeof item))

    checkoutList.innerHTML = `
      <div class="checkout-right">
       <div class="checkout-logo">
         <span><i class="success far fa-check-circle"></i></span>
       </div>
      </div>

      <div class = "checkout-left">
       <div class="checkout-body">
         <h3>Your Cart</h3>
         <table class="checkout-table">
             <tr>
               <td>Subtotal</td>
               <td>${checkoutArr[0]}</td>
             </tr>
             <tr>
               <td>Cash</td>
               <td>${checkoutArr[1]}</td>
             </tr>
             <tr>
               <td>Change</td>
               <td>${checkoutArr[1] - checkoutArr[0]}</td>
             </tr>
         </table >
       </div >
      </div>
      `;
  }
}

// Store to Local Storage
class Store {
  static getItem() {
    let items;
    if (localStorage.getItem("items") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
    }

    return items;
  }

  static displayItem() {
    const items = Store.getItem();

    items.forEach(item => {
      const ui = new UserInterface();
      ui.addItemToList(item);
    });
  }

  static addItem(item) {
    const items = Store.getItem();
    items.push(item);

    localStorage.setItem("items", JSON.stringify(items));
  }

  static totalItem() {
    const items = Store.getItem();
    const grandTotal = document.getElementById("grand-total");
    const initialValue = 0;

    grandTotal.value = items.reduce((accumulator, num) => {
      return accumulator + num.total;
    }, initialValue);
  }

  static removeItem(target) {
    const items = Store.getItem();

    items.forEach((item, index) => {
      if (item.price === Number.parseInt(target)) {
        items.splice(index, 1);
      }
    });

    localStorage.setItem("items", JSON.stringify(items));
  }

  static clearItems() {
    if (confirm("Are you sure deleting All Item(s) Beybeh?")) {
      localStorage.clear();
    }
  }
}

// Disolay List Item from Local Storage
document.addEventListener("DOMContentLoaded", Store.displayItem);

// Display Price of Item
document.getElementById("select-item").addEventListener("change", () => {
  // Initiate UI
  const ui = new UserInterface();
  ui.displayItemPrice();
});

// Event Listener Add Item
document.getElementById("price-item").addEventListener("click", e => {
  // GET Value
  const selectItem = document.getElementById("select-item").value;
  const valueItem = JSON.parse(selectItem);
  const qtyItem = document.getElementById("qty-item").value;
  const itemName = valueItem.name;
  const itemPrice = valueItem.price;
  const total = itemPrice * qtyItem;

  // Initiate Cart
  const cart = new Cart(itemName, itemPrice, qtyItem, total);

  // Initiate UI
  const ui = new UserInterface();

  ui.addItemToList(cart);

  // Add to Local Storage
  Store.addItem(cart);

  ui.clearField();

  e.preventDefault();
});

// Event Listener Delete Item
document.getElementById("item-list").addEventListener("click", e => {
  const ui = new UserInterface();
  const target =
    e.target.parentElement.parentElement.previousElementSibling
      .previousElementSibling.previousElementSibling.textContent;

  ui.deleteItem(e.target);
  Store.removeItem(target);

  e.preventDefault();
});

// Event Clear All Items From Local Storages
document.getElementById("clear-button").addEventListener("click", () => {
  Store.clearItems();
});

// Event Listener Calculate Cart
document.getElementById("calculate-button").addEventListener("click", e => {
  const grandTotal = document.getElementById("grand-total");
  const cash = document.getElementById("cash");
  const change = document.getElementById("change");

  const ui = new UserInterface();

  ui.calculateItem(cash, change, grandTotal);

  e.preventDefault();
});

// Event Listener Checkout
document.getElementById("checkout-button").addEventListener("click", e => {
  const items = Store.getItem();

  items.forEach(item => {
    const ui = new UserInterface();

    // const name = item.name
    // const price = Number.parseInt(item.price)
    // const qty = item.qty
    // const total = item.total
    const grandTotal = document.getElementById("grand-total").value;
    const cash = document.getElementById("cash").value;
    const change = document.getElementById("change").value;

    ui.checkout(grandTotal, cash, change);
  });

  e.preventDefault();
});
