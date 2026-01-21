document.addEventListener("DOMContentLoaded", showJoke)
async function showJoke(){
    const jokeapi_call = await fetch("https://official-joke-api.appspot.com/random_joke")
    const jokeapi_json = await jokeapi_call.json()
    
    //this gets the setup of the joke because it's .setup
    const jokeSetup = jokeapi_json.setup
    const jokePunchline = jokeapi_json.punchline
    
    //have a variable that represents the jokesetup, called joke
    //change the text of that element to have the jokesetup
    const joke = document.getElementById("jokeSetup")
    joke.innerText = jokeSetup

    const answer = document.getElementById("jokePunchline")
    answer.innerText = jokePunchline

}