document.addEventListener("DOMContentLoaded", ()=>{

    let myHeaders = new Headers();
    myHeaders.append("apikey", "uM1qXhFzy1o5R7w2hgVfrHMJyZWNl9bz");

    const requestOptions = {
        method: 'GET', //requesting some data    (other possible: put, delete, post)
        headers: myHeaders,
        redirect: 'follow'
    };


    fetch(`https://api.apilayer.com/exchangerates_data/symbols?symbols`, requestOptions)
  .then(response => response.json())
  .then(data => {
    let {symbols} =  data;
    symbolkeys = Object.keys(symbols);
    lengthKeys = Object.keys(symbols).length;

    for (let i=1; i<=lengthKeys; i++){
        let value1 = symbolkeys[i];
    document.querySelector("#from").innerHTML += "<option value="+value1+">"+value1+"</option>";
    };
    
    for (let i=1; i<=lengthKeys; i++){
        let value1 = symbolkeys[i];
        console.log(value1);
        console.log("<option value="+value1+">value1</option>");
    document.querySelector("#to").innerHTML += "<option value="+value1+">"+value1+"</option>";
    };

})
  .catch(error => console.log('error', error));
// Sample data from symbols
// {
//     "success": true,
//     "symbols": {
//       "AED": "United Arab Emirates Dirham",
//       "AFN": "Afghan Afghani",
//       "ALL": "Albanian Lek",
//       "AMD": "Armenian Dram"
//     }
//   }

    document.querySelector("#currency-converter").addEventListener("submit", (event)=>{
        event.preventDefault();  //prevents default behavior; does not show in URL the values.
        const {target: {from, to, amount}} = event;

        //response: 
        // {
        //     "success": true,
        //     "query": {
        //         "from": "USD",
        //         "to": "PHP",
        //         "amount": 11
        //     },
        //     "info": {
        //         "timestamp": 1666967464,
        //         "rate": 58.0335
        //     },
        //     "date": "2022-10-28",
        //     "result": 638.3685
        // }
        
         fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to.value}&from=${from.value}&amount=${amount.valueAsNumber}`, requestOptions)
        .then(response=>response.json())
        .then(data =>{
            console.log(data);
            let {info, date, query:{to}, result} =  data;   //available from server response: success, query, info, date
            document.querySelector(".result").innerHTML = `<b id="from-value">${from.value.toUpperCase()} ${amount.valueAsNumber.toFixed(2)}  =  </b><b id="final-result">${to} ${result.toFixed(2)}.</b>`;
        })
        .catch(error => console.log('error', error));
    })
 

});