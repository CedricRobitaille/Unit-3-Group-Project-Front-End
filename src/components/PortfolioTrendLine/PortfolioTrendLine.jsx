
import { useState, useEffect } from 'react'
import Graph from '../DataViz/Graph/Graph';
import PortfolioHeader  from "./PortfolioHeader/PortfolioHeader"
import './PortfolioTrendLine.css'
import { index } from '../../services/TransactionService';
import fetchDaily from '../../services/Dailies';




const PortfolioTrendLine = ({ handleGraphRange }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchTransactionsData = async () => {
            // const dateToday = new Date();


            const transactions = await index();
            const portfolioDailyData = [];
            console.log(`transactions: ${JSON.stringify(transactions, null, 2)}`);
            const recordCount = 17;

            for (let i = 0; i < transactions.length; i++) {
                // console.log(`transaction: ${JSON.stringify(transaction)}`)

                // console.log(`purchaseDate: ${typeof fixedPurchaseDate}`)

                // const recordCount = 10; // Math.floor((dateToday - fixedPurchaseDate)/ (1000 * 60 * 60 * 24));

                // console.log(`recordCount: ${recordCount}`)

                const purchaseDateStr = transactions[i].purchaseDate;
                const purchaseDate = new Date(purchaseDateStr);
                const prchaseDateMillis = new Date(purchaseDate).getTime() /1000;
                const dailies = await fetchDaily(transactions[i].ticker, recordCount);
                const dailyPrices = dailies.values
                // console.log(`dailies: ${JSON.stringify(dailyPrices, null, 2)}`)

                for (let x = 0; x < dailyPrices.length; x++) {
                    //check if user owned the stock on the date
                    console.log(`prchaseDateMillis (${new Date(prchaseDateMillis * 1000).toLocaleDateString()}): ${prchaseDateMillis}, dailyPrices[x].timestampId (${new Date(dailyPrices[x].timestampId * 1000).toLocaleDateString()}) - ${dailyPrices[x].timestampId}`);
                   const recordDate = new Date(dailyPrices[x].timestampId * 1000);
                   console.log(`logical: ${recordDate} >= ${purchaseDate} - ${recordDate >= purchaseDate}`)
                    if (recordDate >= purchaseDate) {
                        // console.log(` timespand exist: ${portfolioDailyData.find(obj => obj.hasOwnProperty(dailyPrices[x].timestampId))}`);
                        //check if timestamp already exists in final array
                        const obj = portfolioDailyData.find(obj => obj.hasOwnProperty(dailyPrices[x].timestampId));
                        console.log(`${transactions[i].ticker} - ${new Date(dailyPrices[x].timestampId * 1000).toLocaleDateString()} - obj['${dailyPrices[x].timestampId}']: ${JSON.stringify(obj)}`)
                        if (!obj) {
                            console.log(`in if`)
                            const newObj = {};
                            newObj[dailyPrices[x].timestampId] = dailyPrices[x].close * transactions[i].shareCount;;
                            portfolioDailyData.push(newObj)
                            // console.log(`portfolioDailyData : ${JSON.stringify(portfolioDailyData)}`)


                        } else {
                            console.log(`in else`);
                            // dayDataObj[dailyPrices[x].timestampId] = [];
                            // dayDataObj[dailyPrices[x].timestampId].push(dailyPrices[x].close);
                            // const dayDataObj = {};
                            obj[dailyPrices[x].timestampId] += dailyPrices[x].close * transactions[i].shareCount;
                            console.log(`obj['${dailyPrices[x].timestampId}'] - ${obj[dailyPrices[x].timestampId]} (added: ${dailyPrices[x].close * transactions[i].shareCount})`)
                            // portfolioDailyData.push(dayDataObj);
                            // console.log(`portfolioDailyData : ${JSON.stringify(portfolioDailyData)}`)
                        }

                    }
                }
            }

            console.log(`portfolioDailyData: ${JSON.stringify(portfolioDailyData, null, 2)}`)

            // console.log(`timestamp obj: ${JSON.stringify(portfolioDailyData.find(obj => obj.hasOwnProperty('1763130600')))}`);

            setData(transactions)

        };
        fetchTransactionsData();

    }, []);

    return (
        <section className="portfolio-tend-line-outer">
            <div className="portfolio-tend-line-inner">
                <PortfolioHeader handleGraphRange={handleGraphRange} />
                <Graph type='large' searchData={data} />
            </div>
        </section>
    );
}

export default PortfolioTrendLine;