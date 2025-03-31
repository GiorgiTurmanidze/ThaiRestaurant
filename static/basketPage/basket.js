
let api = fetch('http://localhost:8000/api/baskets/my_basket', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
})
.then(resp => resp.json())
.then(obj => {
    updateBasket(obj)})
.catch(error => console.log(error))


let myBasket = []

let menu = document.querySelector('.Menu')

let home = document.querySelector('.Home')

home.addEventListener('click', function() {
    window.open('/ThaiRestaurant/', '_self')
})

menu.addEventListener('click', function() {
    window.open('/menu/', '_self')
})

function updateBasket(products) {
    myBasket = products.items;

    console.log("my Basket", myBasket);
    let cart = document.querySelector('.cart2');

    let orderList = document.querySelector('.order-list');
    orderList.innerHTML = ''

    cart.innerHTML = '';

    myBasket.forEach((el, index) => {
        cart.innerHTML += `
        <div class="Dish">
            <div class="dishPic">
                <img class="dishPicture" src="${el.image}"></img>
            </div>
            <p class="dishName">${el.dish_name}</p>
            <p class="dishPrice">${el.dish_price}$</p>
            <div class="QuantityItems">
                <button class="decQuan" data-index="${index}"><</button>
                <p class="quantity">${el.quantity}x</p>
                <button class="incQuan" data-index="${index}">></button>
            </div>
        </div>
        `;

        let li = document.createElement('li');
        li.textContent = `${el.dish_name} - ${el.quantity}x - $${el.dish_price * el.quantity}`;
        orderList.appendChild(li);
    });

    document.querySelectorAll('.incQuan').forEach((incBtn) => {
        incBtn.addEventListener('click', function () {
            let index = this.getAttribute('data-index');
            let product = myBasket[index]; 
            let newQuantity = product.quantity + 1; 

            fetch(`http://localhost:8000/api/basket-items/${product.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({
                    quantity: newQuantity
                })
            })
            .then(response => response.json())
            .then(updatedData => {
                product.quantity = newQuantity;
                this.parentElement.querySelector('.quantity').textContent = `${newQuantity}x`;
                console.log("Basket item updated:", updatedData);
                window.location.reload()
            })
            .catch(error => {
                console.error("Error updating item in basket:", error);
            });
        });
    });

    document.querySelectorAll('.decQuan').forEach((decBtn) => {
        decBtn.addEventListener('click', function () {
            let index = this.getAttribute('data-index');
            let product = myBasket[index]; 
            let newQuantity = product.quantity - 1;

            if (newQuantity > 0) {
                fetch(`http://localhost:8000/api/basket-items/${product.id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    },
                    body: JSON.stringify({
                        quantity: newQuantity
                    })
                })
                .then(response => response.json())
                .then(updatedData => {
                    product.quantity = newQuantity;
                    this.parentElement.querySelector('.quantity').textContent = `${newQuantity}x`;
                    console.log("Basket item updated:", updatedData);
                    window.location.reload()
                })
                .catch(error => {
                    console.error("Error updating item in basket:", error);
                });
            } else {
                fetch(`http://localhost:8000/api/basket-items/${product.id}/remove_item/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                window.location.reload()
            }
        });
    });
}

let btn = document.querySelector('.OrderBtn')

async function finishOrder() {
    const response = await fetch("http://localhost:8000/api/baskets/finish_order/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
        }
    });

    const data = await response.json();
    alert(data.message);
    window.location.reload()
}

btn.addEventListener('click', () => {
    finishOrder()
    // fetch('http://localhost:8000/api/baskets/my_basket/', {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //     }
    // })
    // .then(response => response.json())
    // .then(myBasket => {
    //     fetch(`http://localhost:8000/api/baskets/${myBasket.id}/`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //         }
    //     })
    //     window.location.reload()
    // })
})

window.onload(orderBtnText())

function orderBtnText() {
    btn.innerHTML = "Order $"
    fetch('http://localhost:8000/api/baskets/my_basket/', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    .then(response => response.json())
    .then(totalPrice => {
        btn.innerHTML += `${totalPrice.total_price}`
    })
}

let hiddenText = document.querySelector('.hiddenText')

let text1 = 'Thai'
let text2 = 'Restaurant'

let trigger = document.querySelector('.trigger')

let triggered = 0


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