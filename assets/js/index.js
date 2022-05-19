const apiKey = config.SECRET_API_KEY;
const userInput = document.querySelector("#text-input");
const localSaved = JSON.parse(localStorage.getItem("responses")) || [];
const btn = document.querySelector(".btn");
const responseHolder = document.querySelector(".response-holder");


//function to show haikus
const displayHaikus = function (response, subject) {
    let respDiv = document.createElement("div");
    let subjectP = document.createElement("p");
    subjectP.textContent = subject;
    let respP = document.createElement("p");
    respP.textContent = response;
    respDiv.appendChild(subjectP);
    respDiv.appendChild(respP);
    responseHolder.appendChild(respDiv);
}

//function to save haikus in local storage
const saveHaiku = function (haiku) {
    if (localSaved.indexOf(haiku) === -1) {
        localSaved.push(haiku);
    }
    localStorage.setItem("responses", JSON.stringify(localSaved));
}

const getHaiku = function () {
    const subject = userInput.value;
    
    const data = {
        prompt: `Write a haiku about ${subject}`,
        //prompt: "Write a haiku about horses",
        temperature: 1,
        max_tokens: 40,
    };
    // const url = "https://api.openai.com/v1/engines/text-curie-001/completions";
    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('success', data);
            const response = data.choices[0].text;
           displayHaikus(response, subject);

        })
        .catch((error) => {
            console.error('Error:', error);
        });




    userInput.value = "";
}

btn.addEventListener("click", getHaiku);