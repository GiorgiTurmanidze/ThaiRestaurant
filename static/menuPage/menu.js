

let api = fetch('http://localhost:8000/api/dishes/', {
    // headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    // },
})
.then(resp => resp.json())
.then(obj => getProducts(obj))

let searchBar = document.querySelector('#searchBar')
let input = document.querySelector('.search')
let cart = document.querySelector('.cart')
const box = document.querySelector('.gridBox')

searchBar.addEventListener('input', function(event){
    // if (event.key === 'Enter'){
    //     makeNewList()
    // }
    makeNewList()
})

input.addEventListener('click', makeNewList)

function makeNewList(){
    let newArr = filteredArr.filter(el => el.name.includes(searchBar.value))
    box.innerHTML = ''
    for(let el of newArr) {
        box.innerHTML += `
        <div class="card" data-id="${el.id}">
            <img src="${el.image}" class="prodImg"></img>
            <p class="prodName">${el.name}</p>
            <p class="prodPrice">${el.price}$</p>
        </div>`
    }

    addCardClickListeners();
}

let filteredArr = []


function getProducts(product) {
    filteredArr = product
    for (let el of product) {
        box.innerHTML += `
        <div class="card" data-id="${el.id}">
            <img src="${el.image}" class="prodImg"></img>
            <p class="prodName">${el.name}</p>
            <p class="prodPrice">${el.price}$</p>
        </div>`
    }

    addCardClickListeners();
}
function addCardClickListeners() {
    const SpecificDish = document.querySelector('.specificDish')
    const card = document.querySelectorAll('.card')
    card.forEach(dish => {
        dish.addEventListener("click", function() {
            SpecificDish.style.display = "flex"
            SpecificDish.innerHTML = ''
            SpecificDish.classList.remove('specificDishActive')
            const cardId = this.getAttribute('data-id');
            fetch(`http://localhost:8000/api/dishes/${cardId}/`)
                .then(response => response.json())
                .then(productData => {
                    SpecificDish.classList.add('specificDishActive')
                    SpecificDish.innerHTML += `
                    <button class="exitDish">X</button>
                    <div class="dish" data-id="${productData.id}">
                        <img src="${productData.image}" class="dishPic"></img>
                        <p class="dishName">${productData.name}</p>
                        <p class="dishPrice">${productData.price}$</p>
                        <p class="spiciness">Spiciness - ${productData.spiciness}/10</p>
                        <div class="orderBtns">
                            <button class="addToCart">Add to Cart</button>
                            <button class="order">Order</button>
                        </div>                            
                    </div>`

                    const exitBtn = document.querySelector('.exitDish')
                    exitBtn.addEventListener('click', () => {
                        SpecificDish.innerHTML = ''
                        SpecificDish.classList.remove('specificDishActive')
                        SpecificDish.style.display = "none"
                    })

                    const addBtn = document.querySelector('.addToCart')

                    addBtn.addEventListener('click', function() {
                        const dishId = productData.id; 
                        const quantity = 1;

                        fetch('http://localhost:8000/api/baskets/my_basket', {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                            }
                        })
                        .then(response => response.json())
                        .then(basketData => {
                            const existingItem = basketData.items.find(item => item.dish === dishId);


                            if (existingItem) {
                                console.log("Found existing item:", existingItem);
                                const updatedItem = {
                                    ...existingItem,
                                    quantity: existingItem.quantity += quantity
                                }
                                
                                fetch(`http://localhost:8000/api/basket-items/${existingItem.id}/`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                                    },
                                    body: JSON.stringify({
                                        quantity: updatedItem.quantity
                                    })
                                })
                                .then(response => response.json())
                                .then(updatedData => {
                                    console.log("Basket item updated:", updatedData);
                                    SpecificDish.innerHTML = ''
                                    SpecificDish.classList.remove('specificDishActive')
                                    SpecificDish.style.display = "none"
                                    showAgree("Item added to the basket.");
                                })
                                .catch(error => {
                                    console.error("Error updating item in basket:", error);
                                    showError(`${error}`);
                                });
                            } else {
                                const basketItemData = {
                                    dish: dishId,
                                    quantity: quantity
                                };
        
                                fetch('http://localhost:8000/api/basket-items/', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                                    },
                                    body: JSON.stringify(basketItemData)
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log("Item added to basket:", data);
                                    showAgree("Item added to the basket.");
                                    SpecificDish.innerHTML = ''
                                    SpecificDish.classList.remove('specificDishActive')
                                    SpecificDish.style.display = "none"
                                })
                                .catch(error => {
                                    showError(`${error}`);
                                    console.error("Error adding item to basket:", error);
                                });
                            }
                        })
                        .catch(error => {
                            SpecificDish.innerHTML = ''
                            SpecificDish.classList.remove('specificDishActive')
                            SpecificDish.style.display = "none"
                            showError("Please Log-in To Use Our Menu.");
                        });
                    })

                    const order = document.querySelector('.order')

                    order.addEventListener('click', function() {
                        const dishId = productData.id; 
                        const quantity = 1;

                        fetch('http://localhost:8000/api/baskets/my_basket', {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                            }
                        })
                        .then(response => response.json())
                        .then(basketData => {
                            const existingItem = basketData.items.find(item => item.dish === dishId);


                            if (existingItem) {
                                console.log("Found existing item:", existingItem);
                                const updatedItem = {
                                    ...existingItem,
                                    quantity: existingItem.quantity += quantity
                                }
                                
                                fetch(`http://localhost:8000/api/basket-items/${existingItem.id}/`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                                    },
                                    body: JSON.stringify({
                                        quantity: updatedItem.quantity
                                    })
                                })
                                .then(response => response.json())
                                .then(updatedData => {
                                    console.log("Basket item updated:", updatedData);
                                    SpecificDish.innerHTML = ''
                                    SpecificDish.classList.remove('specificDishActive')
                                    SpecificDish.style.display = "none"
                                    window.open('/basket/', '_self')
                                })
                                .catch(error => {
                                    console.error("Error updating item in basket:", error);
                                    showError(`${error}`);
                                });
                            } else {
                                const basketItemData = {
                                    dish: dishId,
                                    quantity: quantity
                                };
        
                                fetch('http://localhost:8000/api/basket-items/', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                                    },
                                    body: JSON.stringify(basketItemData)
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log("Item added to basket:", data);
                                    window.open('/basket/', '_self')
                                    SpecificDish.innerHTML = ''
                                    SpecificDish.classList.remove('specificDishActive')
                                    SpecificDish.style.display = "none"
                                })
                                .catch(error => {
                                    showError(`${error}`);
                                    console.error("Error adding item to basket:", error);
                                });
                            }
                        })
                        .catch(error => {
                            SpecificDish.innerHTML = ''
                            SpecificDish.classList.remove('specificDishActive')
                            SpecificDish.style.display = "none"
                            showError("Please Log-in To Use Our Menu.");
                        });
                    })
                })
        })
    })
}
    

let hiddenText = document.querySelector('.hiddenText')

let text1 = 'Thai'
let text2 = 'Restaurant'

let trigger = document.querySelector('.trigger')

let triggered = 0

let home = document.querySelector('.Home')

let logOut = document.querySelector('.logOut')

function showError(message) {
    let alertBox = document.querySelector('.alertBox');
    denyAlt.style.display = 'flex';
    alertBox.style.top = '60px'
    alertBox.style.display = 'flex'
    denyText = document.getElementById('denyText')
    denyText.innerHTML = message
  
    setTimeout(() => {
      alertBox.style.top = '-200px'
      denyText.innerHTML = ""
      denyAlt.style.display = 'none';
    }, 5000);
  }
  
function showAgree(message) {
  let alertBox = document.querySelector('.alertBox');
  agreeAlt.style.display = 'flex';
  alertBox.style.display = 'flex';
  alertBox.style.top = '60px'
  agreeText = document.getElementById('agreeText')
  agreeText.innerHTML = message

  setTimeout(() => {
    alertBox.style.top = '-200px'
    agreeText.innerHTML = ""
    agreeAlt.style.display = 'none';
  }, 5000);
}
  
let denyAlt = document.querySelector('.denyAlt')
let agreeAlt = document.querySelector('.agreeAlt')

cart.addEventListener('click', function() {
    window.open('/basket/', '_self')
})

home.addEventListener('click', function() {
    window.open('/ThaiRestaurant/', '_self')
})

trigger.addEventListener('click', function() {
    if (triggered === 0) {
        triggered = 1
        trigger.classList.add('spinIt')
        console.log(triggered)
        
        let splittedText1 = text1.split('')
        let splittedText2 = text2.split('')

        const cont = document.createElement('div')
        cont.classList.add('cont')
        hiddenText.appendChild(cont)

        // Adding First Text

        for (let i = 0; i < splittedText1.length; i++) {
            setTimeout(function() {
                let span = document.createElement('span');
                span.innerHTML = splittedText1[i];
                span.style.zIndex = '3'
                span.style.position = 'relative';
                hiddenText.appendChild(span);
            }, i * 200);
        }

         // Adding Second Text After Timeout

        setTimeout(() => {
            
            for (let o = 0; o < splittedText2.length; o++) {
                setTimeout(function() {
                    let span = document.createElement('p');
                    span.innerHTML = splittedText2[o];
                    span.style.zIndex = '3'
                    span.style.position = 'relative';
                    hiddenText.appendChild(span);
                }, o * 200);
            }
        }, 600);

        // Resetting Trigger

        setTimeout(() => {
            triggered = 0
            trigger.classList.remove('spinIt')
            hiddenText.innerHTML = ''
            console.log(triggered)
        }, 6000);
    }
})