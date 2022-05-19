const userInput = document.querySelector("#text-input");
const localSaved = JSON.parse(localStorage.getItem("responses")) || [];
const btn = document.querySelector(".btn");
const responseHolder = document.querySelector(".response-holder");

//function to show haikus
const haikuResponses = function (data) {
    let respDiv = document.createElement("div");
    respDiv.textContent = data.choices[0].text;
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
    
    // const data = {
    //     // prompt: `Write a haiku about ${userInput.value}`,
    //     prompt: "Write a haiku about horses",
    //     temperature: 1,
    //     max_tokens: 40,
    // };
    // const url = "https://api.openai.com/v1/engines/text-curie-001/completions";
    // fetch(url, {
    //     method: "POST",
    //     headers: {
    //         "content-type": "application/json",
    //         Authorization: `Bearer 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`
    //     },
    //     body: JSON.stringify(data),
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('success', data);
    //         console.log(data.choices[0].text);
    //         console.log(userInput);
    //         console.log(btn);

    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });

    console.log("You pressed this button!");
    console.log(userInput.value);


    userInput.value = "";
}

btn.addEventListener("click", getHaiku);