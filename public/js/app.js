console.log('Client side JS file loaded')

const weatherForm = document.querySelector('form')
const weatherFormInput = document.querySelector('input')
const message0 = document.querySelector('#message-0')
const message1 = document.querySelector('#message-1') 

const getWeather = (address) => fetch(`http://localhost:3000/weather?address=${address}`).then((response) => { 
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
            return message0.textContent = data.error       
        }
        message0.textContent = data.location  
        message1.textContent = data.forecast
        console.log(data.location)
        console.log(data.forecast)
    })
}).catch((err) => console.log(err)) 


weatherForm.addEventListener('submit' , (e) => {
    const location = weatherFormInput.value
    e.preventDefault()
    message0.textContent = 'Loading...'  
    message1.textContent = ''
    getWeather(location)
})