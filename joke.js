let timer

//for the joke page with the pictures 
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
    //for the compass!
    window.location.href = 'random.html';
}


//for the random page 
async function check(){
    const jokes = document.getElementById('manyJokes')
    jokes.innerHTML = " "
    const number = Math.trunc(Number(document.querySelector('input').value))
    if (!Number.isFinite(number)){
        alert("Please enter a valid number")
    }
    else if(number >= 100 || number==0 || number<0){
        alert("Please pick a valid number, greater than 0 and less than 100.")
    }
    else{
        const random = Math.floor(Math.random()*3+1)
        const img = document.getElementById("surprise")
        if(random==3){
            img.src="images/surprise.png"
            timer = setTimeout(() => img.src = "", 1500)
        }
        //basically the jokes are in an array
        //an array is denoted like []
        //then the array has objects like {}
        //so together its like [{}, {}, {}]
        //so when you have [], its already in the array, then it just has to access the object at the index
        //i = index, which object it needs to access
        let i=0
        while (i<=number){
            const jokeapi_call = await fetch("https://official-joke-api.appspot.com/jokes/random/" + number)
            const jokeapi_json = await jokeapi_call.json()
            let jokeSetup = jokeapi_json[i].setup
            let jokePunchline = jokeapi_json[i].punchline
            jokes.innerHTML+= 
                (i+1) + ".<br>Setup: " + jokeSetup + "<br>" + " Answer: " + jokePunchline + "<br><br>"
            i++
        }
    }
}

function getInput(type){
    return type+"0"
}

function getImgId(type){
    if(type=="programming"){
        return "surprise1"
    }
    else if(type=="knock-knock"){
        return "surprise2"
    }
    else if(type=="general"){
        return "surprise3"
    }
    else{
        return "surprise4"
    }
}



async function checkType(type){
    //remember, each div where we're going to display the jokes is categorized by type
    const jokes = document.getElementById(type)
    jokes.innerHTML = " "
    //super important line! calls the getInput function and just adds a 0 to type because that's the name of it
    const number = Math.trunc(Number(document.getElementById(getInput(type)).value))
    //to keep track of which jokes has gone so that it doesn't repeat
    const usedIds = []

    //want to start with this. it will narrow it down the most. if it's not a number, just get it out of the way
    if (!Number.isFinite(number)){
        //this means that it's not a number at all and could be text or a character
        alert("Please enter a valid number")
        
    }
    //then if it is a number, but it's wrong, you don't want that either
    else if(number >= 100 || number==0 || number<0){
        //it is a number, but the number is too big or too small
        alert("Please pick a valid number, greater than 0 and less than 100.")
    }
    //save the api for the end. because you don't want it to run unless the input is actually valid
    //first check invalid input, then out of range input, then finally fall back onto the right thing
    else{
        //for a random image to pop up 
        const random = Math.floor(Math.random()*3+1)
        const img = document.getElementById(getImgId(type))
        if(random==3){
            img.src="images/surprise.png"
            timer = setTimeout(() => img.src = "", 1500)
        }

        let i=0
        while (i<number){
            //recall the api to get a different joke each time
            const jokeapi_call = await fetch("https://official-joke-api.appspot.com/jokes/" + type + "/random")
            const jokeapi_json = await jokeapi_call.json()
            //store the joke id and check if it is in the used ids
            let jokeId = jokeapi_json[0].id
            if(!usedIds.includes(jokeId)){
                //if it's not in usedids, add it so that it can't be used again
                usedIds.push(jokeId)
                let jokeSetup = jokeapi_json[0].setup
                let jokePunchline = jokeapi_json[0].punchline
                jokes.innerHTML+= 
                (i+1) + ".<br>Setup: " + jokeSetup + "<br>" + " Answer: " + jokePunchline + "<br><br>"
                i++
            }
            //don't need an else because if the joke id IS in usedIds, then it will just not do the if and will go back to 
            //the top and fetch another joke. so it will just avoid the if all together.
        }
    }
}

