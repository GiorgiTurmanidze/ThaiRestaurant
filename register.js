let uEmail = document.querySelector('#email')
let uPass = document.querySelector('#password')
let uPhone = document.querySelector('#pNumber')
let uName = document.querySelector('#fName')
let uLast = document.querySelector('#lName')
let role = document.querySelector('#role')

let alertBox = document.querySelector('.alertBox')
let denyAlt = document.querySelector('.denyAlt')
let agreeAlt = document.querySelector('.agreeAlt')

const form = document.getElementById('myForm');
form.addEventListener('submit', register)

if (uPhone) {
    uPhone.addEventListener('keydown', function(event){
        if (event.key === ' ') {
            if (uPhone.value.length < 11){
                if (uPhone.value.length == 3){
                    event.preventDefault()
                    uPhone.value += '-'
                }
                if (uPhone.value.length == 7){
                    event.preventDefault()
                    uPhone.value += '-'
                }
                else {
                    event.preventDefault()
                }
            }
        }
    })
}
    
function register(ev) {
    ev.preventDefault()
    fetch('https://rentcar.stepprojects.ge/api/Users/register', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            "phoneNumber": uPhone.value,
            "password": uPass.value,
            "email": uEmail.value,
            "firstName": uName.value,
            "lastName": uLast.value,
            "role": role.value
        })
    })
    .then(resp => resp.json())
    .then(resp => setLoc(resp))
    .catch(error => {
        if (error.message === `Unexpected token 'U', "User already exists" is not valid JSON`) {
            alertBox.style.top = '20px'
            denyAlt.style.display = 'flex'
            setTimeout(() => {
                alertBox.style.top = '-200px'
                denyAlt.style.display = 'none'
            }, 3000);
       }
    });
}
function setLoc(obj) {
    alertBox.style.top = '20px'
    agreeAlt.style.display = 'flex'
    setTimeout(() => {
        window.location.href = './login.html'
    }, 3000);
}      
