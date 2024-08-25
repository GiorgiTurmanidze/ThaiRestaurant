

let api = fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
.then(resp => resp.json())
.then(obj => getProducts(obj))

let searchBar = document.querySelector('#searchBar')
let input = document.querySelector('.search')
const box = document.querySelector('.gridBox')

searchBar.addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
        makeNewList()
    }
})

input.addEventListener('click', makeNewList)

function makeNewList(){
    let newArr = filteredArr.filter(el => el.name.includes(searchBar.value))
    box.innerHTML = ''
    for(let el of newArr) {
        box.innerHTML += `
        <div class="card">
            <img src="${el.image}" class="prodImg"></img>
            <p class="prodName">${el.name}</p>
            <p class="prodPrice">${el.price}$</p>
        </div>`
    }
}

let filteredArr = []


function getProducts(product) {
    filteredArr = product
    console.log(product)
    console.log(product[2].image)
    for (let el of product) {
        box.innerHTML += `
        <div class="card">
            <img src="${el.image}" class="prodImg"></img>
            <p class="prodName">${el.name}</p>
            <p class="prodPrice">${el.price}$</p>
        </div>`
    }
}

let hiddenText = document.querySelector('.hiddenText')

let text1 = 'Thai'
let text2 = 'Restaurant'

let trigger = document.querySelector('.trigger')

let triggered = 0

let home = document.querySelector('.Home')

let logOut = document.querySelector('.logOut')

home.addEventListener('click', function() {
    window.open('./start.html', '_self')
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