


console.log("Javascript is being used")

const weatherinfo=document.querySelector('form')
const search=document.querySelector('input')
const message=document.querySelector('#message-2')
const msgerror=document.querySelector('#message-1')


weatherinfo.addEventListener('submit',(e)=>{
    
    
    msgerror='Loading....'
    message=''
    e.preventDefault()
    const location=search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{

response.json().then((data)=>{
if (data.error){

     msgerror.textContent='Incorrect Address'
}else{

    message.textContent=data.location
    message.textContent=data.forecast
    console.log(data.location)
    console.log(data.forecast)
}
    
})
})

    console.log(location)
})