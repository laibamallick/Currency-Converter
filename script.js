
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//we separating each country and getting that into single options
for (let select of dropdown){
  for(currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    //Making options selected by default
    if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";
    }else if(select.name === "to" && currCode === "PKR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  //target flag
  select.addEventListener("change",(evt) =>{
    updateFlag(evt.target);
  })

}

//updating flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}


//btn working
btn.addEventListener("click",(evt)=>{
  evt.preventDefault();
  const inputVal = document.querySelector(".amount input");
  let amountVal = inputVal.value;
  if(amountVal==="" || amountVal < 1){
    amountVal = 1
    inputVal.value = "1"
  }

  getExchangeRate();
  //Getting values of selected currencies
  //console.log(fromCurr.value, toCurr.value);
});

//Changing Current Rate
let getExchangeRate = async () => {
  const inputVal = document.querySelector(".amount input");
  let amountVal = inputVal.value;
  msg.innerHTML = "Getting Exchange Rate....";

  //URL website
  //exchangerate-api.com
  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value}`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = await response.json();
    // Check if data retrieval was successful
    if (data.result === 'success') {
      let exchangeRate = data.conversion_rates[toCurr.value];
      if (exchangeRate) {
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        msg.innerHTML = `${amountVal} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`;
      } else {
        throw new Error('Exchange rate not available for selected currency');
      }
    } else {
      throw new Error('API request failed');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle error, e.g., display a message to the user
    msg.innerHTML = 'Error fetching exchange rate data';
  }
};
// ------------------END---------------------



//Previous Code
// let getExhangeRate = () => {
//   let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value}`;
//   fetch(url).then((res)=>{
//     res.json()
//   }).then((data)=>{
//     //Getting exchange rate
//     let exchangeRate = data.conversion_rates[toCurr.value];
//     //Getting total exchange rate
//     let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
//     msg.innerHTML =  `${amountVal} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`;
//   })

//}