const apiKey = config.SECRET_API_KEY;
const userInput = document.querySelector("#text-input");
const localSaved = JSON.parse(localStorage.getItem('responses')) || [];
const btn = document.querySelector(".btn");
const responseHolder = document.querySelector(".response-holder");


//function to show haikus
const displayHaikus = function () {
    for (i = localSaved.length - 1; i >= 0; i--) {
        let respDiv = document.createElement("div");
        respDiv.classList.add("border", "my-2");
        let subjectP = document.createElement("p");
        subjectP.textContent ="Prompt: Write a haiku about " + localSaved[i].subject;
        subjectP.classList.add("italic", "font-light");
        let respP = document.createElement("p");
        let response = localSaved[i].response.split('\n').join('<br>')
        respP.innerHTML ="Response: " + response;
        respP.classList.add("font-bold");
        respDiv.appendChild(subjectP);
        respDiv.appendChild(respP);
        responseHolder.appendChild(respDiv);
    }
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
        temperature: 0.4,
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
            const haiku = {
                "subject": subject,
                "response": response
            };
            saveHaiku(haiku);
            window.location.reload();
        })
        // .then(()=> displayHaikus)
        .catch((error) => {
            console.error('Error:', error);
        });

    userInput.value = "";
}
displayHaikus();

btn.addEventListener("click", getHaiku);