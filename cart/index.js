const foodOption = document.querySelector('.items1')
const clothesOption = document.querySelector('.items2')
const stationaryOption = document.querySelector('.items3')

const form = document.getElementById('price-item')
const priceOfItem = document.querySelector('.price-tag')
const qtyItem = document.getElementById('qty-item')

const selectCatagory = document.getElementById('catagory').addEventListener('change', () => {
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
  const selectFood = foodOption.value
  priceOfItem.innerHTML = selectFood
}

const handleclothes = () => {
  const selectClothes = clothesOption.value
  priceOfItem.innerHTML = selectClothes
}

const handleStationary = () => {
  const selectStationary = stationaryOption.value
  priceOfItem.innerHTML = selectStationary
}

const food = document.getElementById('basic-food').addEventListener('change', handleFood)
const clothes = document.getElementById('clothes').addEventListener('change', handleclothes)
const stationary = document.getElementById('stationary').addEventListener('change', handleStationary)

form.addEventListener('submit', event => {
  event.preventDefault()

  const selectFood = Number.parseInt(foodOption.value)
  const selectClothes = Number.parseInt(clothesOption.value)
  const selectStationary = Number.parseInt(stationaryOption.value)
  const qty = qtyItem.value

  const result = selectFood * qty

  const itemList = document.getElementById('item-list')
  const row = document.createElement('tr')

  row.innerHTML = `
    <td></td>
    <td>${selectFood}</td>
    <td>${qty}</td>
    <td>${result}</td>
  `

  itemList.appendChild(row)
})


