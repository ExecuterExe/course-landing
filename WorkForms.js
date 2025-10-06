const scriptURL = 'https://script.google.com/macros/s/AKfycbx6tcJ-K4R3Tyys5zvldwGQfFR4YZXa1H4lTpSXGCJmIajkDn3AC_RL4ruMeiZ1B4U5GA/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))
})