const BASEURL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select"); 
const fromCurr = document.querySelector(".from select"); 
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const btn = document.querySelector("form button"); // get button

// populate dropdowns
for (let select of dropdowns) {
    for (let code in countryList) { 
        let newoption = document.createElement("option"); 
        newoption.innerText = code; 
        newoption.value = code; 
        if (select.name === "From" && code === "USD") { 
            newoption.selected = "selected"; 
        }
        if (select.name === "To" && code === "INR") { 
            newoption.selected = "selected"; 
        }
        select.append(newoption); 
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target); 
    });
}

const updateflag = (element) => { 
    let code = element.value; 
    let countryCode = countryList[code]; 
    let newsrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img"); 
    if (img) {
        img.src = newsrc; 
    }
};

// fetch conversion rate
btn.addEventListener("click", async (evt) => { 
    evt.preventDefault(); 
    let amount = document.querySelector(".Amount input"); 
    let amtVal = amount.value; 

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1; 
        amount.value = "1"; 
    }

    // Build API URL
    const URL = `${BASEURL}${fromCurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(URL); 
        let data = await response.json(); 
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`; 
    } catch (error) {
        msg.innerText = "Error fetching exchange rate!";
        console.error(error);
    }
});
