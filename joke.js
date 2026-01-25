let timer

async function showJoke(){
    //this clears any timer that's running so that the punchline won't show up
    //makes it so that any punchline that was going to show up, let's say from a different image, won't show up anymore
    if (timer){
        clearTimeout(timer)
    }
    //get the joke from the api and need to turn the raw data into json
    //need to turn it into json because you can't work with it in its raw form
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
    joke.textContent = "Setup: " + jokeSetup

    const answer = document.getElementById("jokePunchline")
    answer.textContent = "Answer: "
    //have a variable that represents the jokepunchline, called answer
    //change the text of that element to have the jokepunchline
    timer = setTimeout(() => answer.textContent = "Answer: " + jokePunchline, 1500)

}

async function getJoke(type){
    if (timer){
        clearTimeout(timer)
    }
    const jokeapi_call = await fetch("https://official-joke-api.appspot.com/jokes/" + type + "/random")
    const jokeapi_json = await jokeapi_call.json()

    const jokeSetup = jokeapi_json[0].setup
    const jokePunchline = jokeapi_json[0].punchline
    
    const joke = document.getElementById("jokeSetup")
    joke.textContent = "Setup: " + jokeSetup

    const answer = document.getElementById("jokePunchline")
    answer.textContent="Answer: "

    //this waits 2 seconds, because 2000 ms = 2 s
    //() => {} this syntax represents callback, meaning an arrow function
    //think of it like the "=>" points to the behavior and whatver is in the {} will excecute
    //setTimeout(function, delay)
    //here, function = "() => answer.textContent = jokePunchline"
    //don't need brackets because it's a single line
    //delay = 2000
   timer = setTimeout(() => answer.textContent = "Answer: " + jokePunchline, 1500)
}

function switchPage(){
    window.location.href = 'random.html';
        
}

async function check(){
    jokes.innerHTML = " "
    const number = Math.trunc(Number(document.querySelector('input').value))
    if (number >= 100 || number==0 || number<0){
        alert("Please pick a valid number, greater than 0 and less than 100.")
    }
    else if(Number.isFinite(number)){
        const jokes = document.getElementById('manyJokes')
        const jokeapi_call = await fetch("https://official-joke-api.appspot.com/jokes/random/" + number)
        const jokeapi_json = await jokeapi_call.json()
        
        //basically the jokes are in an array
        //an array is denoted like []
        //then the array has objects like {}
        //so together its like [{}, {}, {}]
        //so when you have [], its already in the array, then it just has to access the object at the index
        //i = index, which object it needs to access
        let i=0
        while (i<=number){
            let jokeSetup = jokeapi_json[i].setup
            let jokePunchline = jokeapi_json[i].punchline
            jokes.innerHTML+= 
                (i+1) + ".<br>Setup: " + jokeSetup + "<br>" + " Answer: " + jokePunchline + "<br><br>"
            i++
        }
    }
    else{
        alert("Please enter a valid number")
    }
}
