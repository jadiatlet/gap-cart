const basicFood = document.querySelector('.items1')
const clothes = document.querySelector('.items2')
const stationary = document.querySelector('.items3')

const priceOfItem = document.querySelector('.price-tag')
const qtyItem = document.getElementById('qty-item')

const selectCatagory = document.getElementById('catagory').addEventListener('change', () => {
  const catagoryItems = document.querySelector('.catagoryItems').value

  if (catagoryItems === 'Clothes') {
    basicFood.style.display = 'none'
    stationary.style.display = 'none'
    clothes.style.display = 'block'
  } else if (catagoryItems === 'Stationary') {
    basicFood.style.display = 'none'
    clothes.style.display = 'none'
    stationary.style.display = 'block'
  } else {
    basicFood.style.display = 'block'
    clothes.style.display = 'none'
    stationary.style.display = 'none'
  }

})

const food = document.getElementById('basic-food').addEventListener('change', () => {
  const selectFood = basicFood.value

  priceOfItem.innerHTML = selectFood
})


let a = qtyItem.value
console.log(a);
