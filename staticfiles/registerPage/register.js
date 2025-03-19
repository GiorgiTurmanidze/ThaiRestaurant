async function signUp(event) {

  event.preventDefault();


  const email = document.getElementById('email').value
  const username = document.getElementById('fName').value
  const password = document.getElementById('password').value

  try {
    const response = await fetch('http://localhost:8000/api/auth/signup/',
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,username,password})
      });
    if (!response.ok) {
      if (response.status === 409) {
        showError("User with this email or username already exists.");
      }
      else if (response.status === 400) {
        const errorData = await response.json()
        showError("Please make sure you've filled every detail.")
      }
    }
    else {
      // const data = await response.json();
      console.log("User successfully created");
      showAgree("Account Successfully Created.")
      setTimeout(() => {
        window.location.href = "/login/"
      }, 2500);
    }
  }
  catch (error) {
    console.error("Request Failed:", error)
    showError("Network error. Please try again later.")
  }
}


function showError(message) {
  let alertBox = document.querySelector('.alertBox');
  denyAlt.style.display = 'flex';
  alertBox.style.top = '20px'
  alertBox.style.display = 'flex'
  denyText = document.getElementById('denyText')
  denyText.innerHTML = message

  setTimeout(() => {
    alertBox.style.top = '-200px'
    denyText.innerHTML = ""
    denyAlt.style.display = 'none';
  }, 3000);
}

function showAgree(message) {
  let alertBox = document.querySelector('.alertBox');
  agreeAlt.style.display = 'flex';
  alertBox.style.display = 'flex';
  alertBox.style.top = '20px'
  agreeText = document.getElementById('agreeText')
  agreeText.innerHTML = message

  setTimeout(() => {
    alertBox.style.top = '-200px'
    agreeText.innerHTML = ""
    agreeAlt.style.display = 'none';
  }, 3000);
}

let denyAlt = document.querySelector('.denyAlt')
let agreeAlt = document.querySelector('.agreeAlt')

// const form = document.getElementById('myForm');
// form.addEventListener('submit', register)