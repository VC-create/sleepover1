document.addEventListener("DOMContentLoaded", showJoke)
async function showJoke(){
    const jokeapi_call = await fetch("https://official-joke-api.appspot.com/random_joke")
    const jokeapi_json = await jokeapi_call.json()
    const jokeSetup = jokeapi_json.setup
    const jokePunchline = jokeapi_json.punchline
    const joke = document.getElementById("joke")
    joke.innerText = jokeSetup
}