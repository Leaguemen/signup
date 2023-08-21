const nameForm = document.getElementById("name");
const emailForm = document.getElementById('email');
const phoneForm = document.getElementById('phone');
const passwordForm = document.getElementById("password");
const submit = document.getElementById("submit");
const alertBox = document.getElementById('alertBox');

async function getDataFromDatabase(){
    const rawData = await fetch('api');
    const jsonData = await rawData.json();
    return(jsonData);
}

function checkSameName(nameToBeGiven,array){
    var condition = true;
    array.forEach(element => {
        if (nameToBeGiven == element.name){
            condition = false;
        }
    });
    return(condition);
}


submit.addEventListener("click",async ()=> {
    event.preventDefault(); // remove later so the form content dissapears after submit, used for testing
    const name = nameForm.value;
    const email = emailForm.value;
    const phone = phoneForm.value;
    const password = passwordForm.value;
    const timeStamp = Date.now() //shows us when is now from july 1 1970 i think
    console.log("testing attention please");
    console.log(name);

    const dataFromDatabase = await getDataFromDatabase();
    console.log(dataFromDatabase);
    
    const data = {name, email, phone, password, timeStamp};

    // search fetch api options for more info
    const options={
        method : "POST",
        headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data) // body data type must match "Content-Type" header       
    };
    if (checkSameName(name,dataFromDatabase)){
        //primarily used to send the data to '/api' which we made on server.js
        const dataGiventoServer = await (fetch('/api',options)); // i guess options di sini sdh memuat apa yang akan dikirim karena data tersebut ada pada body options
        const shortMessage = await dataGiventoServer.text();
        console.log(shortMessage);       
    }
    else{
        console.log("You can't use that username");
        alertBox.textContent = 'Username must be different';
        alertBox.style.display = 'block';
        setTimeout(function() {
            alertBox.style.display = 'none';
          }, 3000);
    }

    }
)


