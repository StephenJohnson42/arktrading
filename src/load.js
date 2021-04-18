const csv = require('csv-parser')
const fs = require('fs')
const results = [];
fs.createReadStream('.\\src\\tradesImport.csv').pipe(csv({})).on('data', (data)=> results.push(data)).on('end', ()=> {
    list = [];
    console.log(results);
    console.log(results[0].Shares);
    console.log(parseInt(results[0].Shares, 10));
    let trade = {
        "FUND": results[0].Shares,
        "Direction": results[0].Shares,
        "Ticker": results[0].Shares,
        "CUSIP": results[0].Shares,
        "Name": results[0].Shares,
        "Shares": results[0].Shares,
        "percETF": results[0].Shares,
        "entryDate": results[0].Shares,
        "exitDate": results[0].Shares,
        "entryPrice": results[0].Shares,
        "exitPrice": results[0].Shares,
        "percGain": results[0].Shares
       }
    console.log(trade);
    createTrades(results)
       
    async function createTrades(results){
        await DataStore.save(
            new Trades({
            "FUND": results[0].FUND,
            "Direction": results[0].Direction,
            "Ticker": results[0].Ticker,
            "CUSIP": results[0].CUSIP,
            "Name": results[0].Name,
            "Shares": parseInt(results[0].Shares, 10),
            "percETF": parseFloat(results[0].percETF),
            "entryDate": results[0].entryDate,
            "exitDate": results[0].exitDate,
            "entryPrice": parseFloat(results[0].entryPrice),
            "exitPrice": parseFloat(results[0].exitPrice),
            "percGain": parseFloat(results[0].percGain)
          }).catch()
        ).catch(e => { console.log(e) });
    }
        
});


