import React, { useEffect } from 'react';
import axios from "axios";


const Spreads = () => {

    useEffect(() => {
    }, []);


    const getPrices = async () => {
        var ethPrices = [];
        const exchanges = ["bitfinex", "bitstamp", "kraken", "gdax", "gemini", "bittrex"];
        try {
            for (var i = 0; i < exchanges.length; i++) {
                await axios.get(`https://api.coingecko.com/api/v3/exchanges/${exchanges[i]}/tickers?coin_ids=ethereum`)
                .then(res => {
                    if (res.status !== 200) {
                        return;
                    }
                    ethPrices.push(res.data.tickers.filter(ticker => ticker.target === "USD")[0]);
                })
            }
        } catch (err) {
            console.log("error: ", err);
        }
        console.log(ethPrices);
    }


    return(
      <>
        <button onClick={getPrices}>Get prices</button>
      </>
    )
}

export default Spreads;
