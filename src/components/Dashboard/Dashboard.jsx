import { useState, useEffect } from 'react';
import "./Dashboard.css"

import Watchlist from '../Watchlist/Watchlist';
import PortfolioTrendLine from '../PortfolioTrendLine/PortfolioTrendLine';
import Card from '../Card/Card';

import fetchDaily from "../../services/Dailies.js"
import { index as fetchWatchlist } from "../../services/TargetService.js"
import { index as fetchTransactions } from "../../services/TransactionService.js"

const Dashboard = () => {

  const [graphRange, setGraphRange] = useState(7)
  const [portfolioValues, setPortfolioValues] = useState({
    currValue: 0,
    prevValue: 0,
    changePercent: 0,
    changeValue: 0,
    totalledDailies: [],
  })
  const [watchListValues, setWatchListValues] = useState({
    currValue: 0,
    prevValue: 0,
    changePercent: 0,
    changeValue: 0,
    targets: [],
    tickers: [],
  })

  // Cleans up a value to be consumable
  // From the API, values typically come in with 10+ decimal places, this cleans it up to be consistent to 2 decimal points.
  const parseValue = (value) => {
    return parseFloat(value.toFixed(2))
  }

  // Init Fetching
  useEffect(() => {

    // Fetches all values for the portfolio!
    const fetchPortfolioData = async () => {
      const portfolioData = await fetchTransactions(); // Should have: `purchasePrice`, `shareCount`, and `ticker`

      // Initialize the portfolio Obj
      const portfolio = {
        currValue: 0,
        prevValue: 0,
        changePercent: 0,
        changeValue: 0,
        allDailies: [],
        totalledDailies: []
      }

      // Go through every owned stock transaction
      for (const data of portfolioData) {
        // Get the dailies for the stock, with a range of `graphRange`
        const dataDailies = await fetchDaily(data.ticker, graphRange)

        console.log('dataDailies: ', dataDailies);
        
        // Add values from each owned stock into the portfolio object
        portfolio.currValue += (dataDailies.values[0].close * data.shareCount); // Current Value * Sharecount
        portfolio.prevValue += (dataDailies.previousClose * data.shareCount); // Yesterday's Value * Sharecount
        portfolio.allDailies.push({ // Log each stock's dailies in an array.
          values: dataDailies.values,
          shareCount: data.shareCount // Must log sharecount to multiply each stock later.
        })
      }

      // Merge all owned stocks dailies into a `totalledDailies` array (where every day is combined values for all stocks)
      for (let day = 0; day < graphRange; day++) {  // Iterrate through every day
        let closeTotal = 0;
        let highTotal = 0;
        let lowTodal = 0;

        // Go through every stock of selected day, tallying up all their values. Multiplying by shareCount for true total.
        for (const stock of portfolio.allDailies) {
          closeTotal += stock.values[day].close * stock.shareCount; // Close
          highTotal += stock.values[day].high * stock.shareCount; // High
          lowTodal += stock.values[day].low * stock.shareCount; // Low
        }

        // Add current date's summed valued to the `totalledDailies` Array.
        portfolio.totalledDailies.push({
          close: closeTotal,
          high: highTotal,
          low: lowTodal,
          timestampId: portfolio.allDailies[0].values[day].timestampId, // Keep track of the day
        })
      }
      
      portfolio.currValue = parseValue(portfolio.currValue);
      portfolio.prevValue = parseValue(portfolio.prevValue);
      portfolio.changeValue = parseValue(portfolio.currValue - portfolio.prevValue);
      portfolio.changePercent = parseValue((portfolio.currValue - portfolio.prevValue) / portfolio.prevValue * 100); // Expression is to find the change in percentage between 2 numbers.
      setPortfolioValues(portfolio) // Set the portfolio obj!
      console.log("PORTFOLIO: ", portfolio)
    }



    // Fetches all values from the user's Watchlist!
    // Data to be used in watchlist modal, and top-cards.
    const fetchWatchlistData = async () => {
      const watchlistData = await fetchWatchlist()  // Grab all watchlist elements (All that comes is `ticker`)

      const watchlist = { // Default Structure/fallback values
        tickers: [],
        currValue: 0,
        prevValue: 0,
        changePercent: 0,
        changeValue: 0,
        targets: [],  // Holds all stocks's dailies, where each stock is a new index.
      }

      console.log('watchlistData.entries(): ', watchlistData)

      // Iterate through each watchlist element, and sum up values into the watchlist component.
      for (let [index, target] of watchlistData.entries()) {
        console.log(`target.ticker: ${target.ticker}`);
        const dataDailies = await fetchDaily(target.ticker, graphRange)
        console.log("CheckThis",dataDailies)
        
        watchlist.tickers.push(dataDailies.symbol)
        watchlist.currValue += parseValue(dataDailies.values[0].close); // Current Value
        watchlist.prevValue += parseValue(dataDailies.previousClose); // Previous Value
        watchlist.changeValue = parseValue(watchlist.currValue - watchlist.prevValue);  // Total Change in $
        watchlist.changePercent = parseValue((watchlist.currValue - watchlist.prevValue) / watchlist.prevValue * 100);  // Total Change in %
      

        console.log(`test 1: ${watchlist.currValue}`)
        console.log(`test 2: ${watchlist.prevValue}`)
        console.log(`test 3: ${watchlist.changeValue}`)
        console.log(`test 4: ${watchlist.changePercent}`)


        watchlist.targets.push({})
        watchlist.targets[index].name = dataDailies.longName;
        watchlist.targets[index].ticker = dataDailies.symbol;
        watchlist.targets[index].previousClose = dataDailies.previousClose;
        watchlist.targets[index].value = dataDailies.values[0].close.toFixed(2);
        watchlist.targets[index].change = (dataDailies.values[0].close - dataDailies.previousClose).toFixed(3)
        watchlist.targets[index].values = []
        for (let day = 0; day < graphRange; day++) {
          watchlist.targets[index].values.push(dataDailies.values[day])  // Keep all dailies
        }
      }
      setWatchListValues(watchlist)
      console.log("FINAL watchlist OBJ: ", watchlist)
    }

    fetchPortfolioData()
    fetchWatchlistData()
  }, [])


  const handlePortfolioUpdate = async (range = graphRange) => {
    const portfolioData = await fetchTransactions(); // Should have: `purchasePrice`, `shareCount`, and `ticker`

    // Initialize the portfolio Obj
    const portfolio = {
      currValue: 0,
      prevValue: 0,
      changePercent: 0,
      changeValue: 0,
      allDailies: [],
      totalledDailies: []
    }

    // Go through every owned stock transaction
    for (const data of portfolioData) {
      // Get the dailies for the stock, with a range of `graphRange`
      const dataDailies = await fetchDaily(data.ticker, range)
      // Add values from each owned stock into the portfolio object
      portfolio.currValue += (dataDailies.values[0].close * data.shareCount); // Current Value * Sharecount
      portfolio.prevValue += (dataDailies.previousClose * data.shareCount); // Yesterday's Value * Sharecount
      portfolio.allDailies.push({ // Log each stock's dailies in an array.
        values: dataDailies.values,
        shareCount: data.shareCount // Must log sharecount to multiply each stock later.
      })
    }

    // Merge all owned stocks dailies into a `totalledDailies` array (where every day is combined values for all stocks)
    for (let day = 0; day < range; day++) {  // Iterrate through every day
      let closeTotal = 0;
      let highTotal = 0;
      let lowTodal = 0;

      // Go through every stock of selected day, tallying up all their values. Multiplying by shareCount for true total.
      for (const stock of portfolio.allDailies) {
        closeTotal += stock.values[day].close * stock.shareCount; // Close
        highTotal += stock.values[day].high * stock.shareCount; // High
        lowTodal += stock.values[day].low * stock.shareCount; // Low
      }

      // Add current date's summed valued to the `totalledDailies` Array.
      portfolio.totalledDailies.push({
        close: closeTotal,
        high: highTotal,
        low: lowTodal,
        timestampId: portfolio.allDailies[0].values[day].timestampId, // Keep track of the day
      })
    }

    portfolio.currValue = parseValue(portfolio.currValue);
    portfolio.prevValue = parseValue(portfolio.prevValue);
    portfolio.changeValue = parseValue(portfolio.currValue - portfolio.prevValue);
    portfolio.changePercent = parseValue((portfolio.currValue - portfolio.prevValue) / portfolio.prevValue * 100); // Expression is to find the change in percentage between 2 numbers.
    setPortfolioValues(portfolio) // Set the portfolio obj!
    console.log("PORTFOLIO: ", portfolio)
  }


  const handleWatchlistUpdate = async (range = graphRange, watchlistTickers = watchListValues.tickers) => {
    const watchlist = { // Default Structure/fallback values
      tickers: [],
      currValue: 0,
      prevValue: 0,
      changePercent: 0,
      changeValue: 0,
      targets: [],  // Holds all stocks's dailies, where each stock is a new index.
    }
    for (let [index, target] of watchlistTickers.entries()) {
      const dataDailies = await fetchDaily(target, range)

      
      watchlist.tickers.push(dataDailies.symbol)
      watchlist.currValue += parseValue(dataDailies.values[0].close); // Current Value
      watchlist.prevValue += parseValue(dataDailies.previousClose); // Previous Value
      watchlist.changeValue = parseValue(watchlist.currValue - watchlist.prevValue);  // Total Change in $
      watchlist.changePercent = parseValue((watchlist.currValue - watchlist.prevValue) / watchlist.prevValue * 100);  // Total Change in %

      watchlist.targets.push({})
      watchlist.targets[index].name = dataDailies.longName;
      watchlist.targets[index].ticker = dataDailies.symbol;
      watchlist.targets[index].value = dataDailies.values[0].close.toFixed(2);
      watchlist.targets[index].change = (dataDailies.values[0].close - dataDailies.previousClose).toFixed(3)
      watchlist.targets[index].searchData = [];
      // watchlist.targets[index].values = [];
      for (let day = 0; day < range; day++) {
        console.log("THIS")
        watchlist.targets[index].searchData.push(dataDailies.values[day])  // Keep all dailies
      }
    }
    setWatchListValues(watchlist)
    console.log("FINAL watchlist OBJ: ", watchlist)
  }





  const handleGraphRange = (newRange) => {
    console.log("Setting new graph range to: ", newRange)
    setGraphRange(newRange)

    handlePortfolioUpdate(newRange)
    handleWatchlistUpdate(newRange)
  }



  const handleWatchlistChange = async () => {
    console.log("Update")
    const watchlistData = await fetchWatchlist()  // Grab all watchlist elements (All that comes is `ticker`)

    const watchlist = { // Default Structure/fallback values
      tickers: [],
      currValue: 0,
      prevValue: 0,
      changePercent: 0,
      changeValue: 0,
      targets: [],  // Holds all stocks's dailies, where each stock is a new index.
    }

    // Iterate through each watchlist element, and sum up values into the watchlist component.
    for (let [index, target] of watchlistData.entries()) {
      const dataDailies = await fetchDaily(target.ticker, graphRange)
      console.log("CheckThis", dataDailies)

      watchlist.tickers.push(dataDailies.symbol)
      watchlist.currValue += parseValue(dataDailies.values[0].close); // Current Value
      watchlist.prevValue += parseValue(dataDailies.previousClose); // Previous Value
      watchlist.changeValue = parseValue(watchlist.currValue - watchlist.prevValue);  // Total Change in $
      watchlist.changePercent = parseValue((watchlist.currValue - watchlist.prevValue) / watchlist.prevValue * 100);  // Total Change in %

      watchlist.targets.push({})
      watchlist.targets[index].name = dataDailies.longName;
      watchlist.targets[index].ticker = dataDailies.symbol;
      watchlist.targets[index].value = dataDailies.values[0].close.toFixed(2);
      watchlist.targets[index].change = (dataDailies.values[0].close - dataDailies.previousClose).toFixed(3)
      watchlist.targets[index].searchData = []
      for (let day = 0; day < graphRange; day++) {
        watchlist.targets[index].searchData.push(dataDailies.values[day])  // Keep all dailies
      }
    }
    setWatchListValues(watchlist)
    console.log("FINAL watchlist OBJ: ", watchlist)
  }

 


  return (
    <section className='dashboard-view'>
      <div className="card-container">
        <Card pillText="Portfolio" pillData={portfolioValues.changePercent} cardText={portfolioValues.currValue} />
        <Card pillText="Today" pillData={portfolioValues.changePercent} cardText={portfolioValues.changeValue} />
        <Card pillText="Watchlist" pillData={watchListValues.changePercent} cardText={watchListValues.currValue} />
        <Card pillText="Watchlist Change" pillData={watchListValues.changePercent} cardText={watchListValues.changeValue} />
      </div>

      <PortfolioTrendLine type='large' handleGraphRange={handleGraphRange} searchData={portfolioValues.totalledDailies} />
      <Watchlist watchListValues={watchListValues.targets} graphRange={graphRange} handleWatchlistChange={handleWatchlistChange} />
    </section>
  )
}

export default Dashboard;