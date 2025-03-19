async function logIn(event) {

    event.preventDefault();
  
    const username = document.getElementById('fName').value
    const password = document.getElementById('password').value
    

    try {
        const response = await fetch('http://localhost:8000/api/auth/login/',
         {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username,password})
        });
        if (!response.ok) {
            console.log("ERROR", response.status)
            if (response.status === 400) {
                showError("Please make sure you've filled every detail.")
              }
            else if (response.status === 401) {
                showError("Invalid username or password.")
            }
        }
        else {
            console.log("CORRECT!")
            showAgree("Welcome.")
            setTimeout(() => {
                window.location.href = "/ThaiRestaurant/"
            }, 2000);
        }
    }
    catch (error) {
        console.error("error: ", error)
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
    alertBox.style.width = '250px'
    alertBox.style.display = 'flex';
    alertBox.style.top = '20px'
    agreeText = document.getElementById('agreeText')
    agreeText.innerHTML = message
  
    setTimeout(() => {
      alertBox.style.top = '-200px'
      agreeText.innerHTML = ""
      agreeAlt.style.display = 'none';
      alertBox.style.width = '350px'
    }, 3000);
  }
  
  let denyAlt = document.querySelector('.denyAlt')
  let agreeAlt = document.querySelector('.agreeAlt')