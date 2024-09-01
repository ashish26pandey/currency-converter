// 1:-----------------------------------------------------
const BASE_URL = 
"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

// 6:---------------------------
const btn = document.querySelector("form button");

// 7:-------------------------------
const fromcurr = document.querySelector(".from select");

// 8:------------------------------------
const tocurr = document.querySelector(".to select");

// 9:------------------------------------------
const msg = document.querySelector(".msg");

// 2:--------------------------------------------------
for(let select of dropdowns) {
    for (currcode in countryList) {
        // console.log(code, countryList[code])
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;

        // 3:--------- to change country name----------------
        if(select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        }

        else if(select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }

        // 2:----------------------------------------------
        select.append(newoption);
    }

    // 4:---------------------------------
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

    // 7:-------------------------
    const URL = `${BASE_URL}/${fromcurr.value.toLoweCase()}/${tocurr.value.toLoweCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[tocurr.value.toLoweCase()];

    // 9:----------------------------------
    let finalamount = amtval * rate;
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
}

// 5:---- to change the flag----------------------
const updateflag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newsrc =  `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

// 6: amount----------------------------
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});