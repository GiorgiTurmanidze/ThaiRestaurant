

let hiddenText = document.querySelector('.hiddenText')

let text1 = 'Thai'
let text2 = 'Restaurant'

let trigger = document.querySelector('.trigger')

let triggered = 0

let menu = document.querySelector('.Menu')

let logOut = document.querySelector('.logOut')

logOut.addEventListener('click', () => {
    localStorage.removeItem('token')
})

menu.addEventListener('click', function() {
    window.open('./menu.html', '_self')
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