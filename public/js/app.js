
const weatherForm = document.querySelector('form')
const weatherFormInput = document.querySelector('input')
const message0 = document.querySelector('#message-0')
const message1 = document.querySelector('#message-1') 

const getWeather = (address) => fetch(`/weather?address=${address}`).then((response) => { 
    response.json().then((data) => {
        if (data.error) {
            message0.textContent = data.error
            message1.textContent = ''    
        } else {
            message0.textContent = data.location  
            message1.textContent = data.forecast
        } 
    })
}).catch((err) => {
    console.log(err)
    message0.textContent = `Something went wrong: ${err}`   
    message1.textContent = '' 
}) 


weatherForm.addEventListener('submit' , (e) => {
    const location = weatherFormInput.value
    e.preventDefault()
    message0.textContent = 'Loading...'  
    message1.textContent = ''
    getWeather(location)
})