const foodOption = document.querySelector('.items1')
const clothesOption = document.querySelector('.items2')
const stationaryOption = document.querySelector('.items3')

const food = document.getElementById('basic-food')
const clothes = document.getElementById('clothes')
const stationary = document.getElementById('stationary')

const form = document.getElementById('price-item')
const priceOfItem = document.querySelector('.price-tag')
const qtyItem = document.getElementById('qty-item')

document.getElementById('catagory').addEventListener('change', () => {
  const catagoryItems = document.querySelector('.catagoryItems').value

  if (catagoryItems === 'Clothes') {
    foodOption.style.display = 'none'
    stationaryOption.style.display = 'none'
    clothesOption.style.display = 'block'
  } else if (catagoryItems === 'Stationary') {
    foodOption.style.display = 'none'
    clothesOption.style.display = 'none'
    stationaryOption.style.display = 'block'
  } else {
    foodOption.style.display = 'block'
    clothesOption.style.display = 'none'
    stationaryOption.style.display = 'none'
  }
})

const handleFood = () => {
  const selectFood = JSON.parse(foodOption.value)
  priceOfItem.innerHTML = selectFood.price
}

const handleclothes = () => {
  const selectClothes = JSON.parse(clothesOption.value)
  priceOfItem.innerHTML = selectClothes.price
}

const handleStationary = () => {
  const selectStationary = JSON.parse(stationaryOption.value)
  priceOfItem.innerHTML = selectStationary.price
}

food.addEventListener('change', handleFood)
clothes.addEventListener('change', handleclothes)
stationary.addEventListener('change', handleStationary)

form.addEventListener('submit', event => {
  event.preventDefault()

  const selectFood = JSON.parse(foodOption.value)
  const selectClothes = JSON.parse(clothesOption.value)
  const selectStationary = JSON.parse(stationaryOption.value)
  const qty = qtyItem.value

  let result = []

  result.push(selectFood, selectClothes, selectStationary)

  const itemList = document.getElementById('item-list')
  const row = document.createElement('tr')

  result.forEach(item => {
    const total = item.price * qty
    row.innerHTML = `
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td>${qty}</td>
    <td>${total}</td>
  `
  })

  itemList.appendChild(row)
})


