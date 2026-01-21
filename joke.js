//call the function when the page loads
//document.addEventListener("DOMContentLoaded", showJoke)

//get the joke from the api and need to turn the raw data into json
//need to turn it into json because you can't work with it in its raw form
async function showJoke(){
    const jokeapi_call = await fetch("https://official-joke-api.appspot.com/random_joke")
    const jokeapi_json = await jokeapi_call.json()
    
    //when you go the api, you can see the categories of setup and punchline

    //this gets the setup of the joke because it's .setup
    const jokeSetup = jokeapi_json.setup
    //this gets the punchline because it's .punchline
    const jokePunchline = jokeapi_json.punchline
    
    //have a variable that represents the jokesetup, called joke
    //change the text of that element to have the jokesetup
    const joke = document.getElementById("jokeSetup")
    joke.innerText = jokeSetup

    //have a variable that represents the jokepunchline, called answer
    //change the text of that element to have the jokepunchline
    const answer = document.getElementById("jokePunchline")
    answer.innerText = jokePunchline

}