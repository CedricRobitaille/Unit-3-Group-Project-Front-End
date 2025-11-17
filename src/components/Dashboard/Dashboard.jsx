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
  })
  const [watchListValues, setWatchListValues] = useState({
    currValue: 0,
    prevValue: 0,
    changePercent: 0,
    changeValue: 0,
    tickers: [],
    targets: []
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
        
        // Add values from each owned stock into the portfolio object
        portfolio.currValue += (dataDailies.values[0].close * data.shareCount); // Current Value * Sharecount
        portfolio.prevValue += (dataDailies.previousClose * data.shareCount); // Yesterday's Value * Sharecount
        portfolio.allDailies.push({ // Log each stock's dailies in an array.
          values: dataDailies.values,
          shareCount: data.shareCount // Must log sharecount to multiply each stock later.
        })
      }

      // ==================================================================
      // ! ERIC - Below is where the combined `dailies` for the portfolio graph is happening
      // ==================================================================
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
        currValue: 0,
        prevValue: 0,
        changePercent: 0,
        changeValue: 0,
        targets: [],  // Holds all stocks's dailies, where each stock is a new index.
        tickers: []
      }

      // Iterate through each watchlist element, and sum up values into the watchlist component.
      for (const target of watchlistData) {
        const dataDailies = await fetchDaily(target.ticker, graphRange)
        watchlist.targets.push(dataDailies)  // Keep all dailies
        watchlist.tickers.push(dataDailies.symbol)

        watchlist.currValue += parseValue(dataDailies.values[0].close); // Current Value
        watchlist.prevValue += parseValue(dataDailies.previousClose); // Previous Value
        watchlist.changeValue = parseValue(watchlist.currValue - watchlist.prevValue);  // Total Change in $
        watchlist.changePercent = parseValue((watchlist.currValue - watchlist.prevValue) / watchlist.prevValue * 100);  // Total Change in %
      }
      setWatchListValues(watchlist)
      console.log("WATCHLIST: ", watchlist)
    }

    fetchPortfolioData()
    fetchWatchlistData()
  }, [])


  const handleGraphRange = (newRange) => {
    console.log("Setting new graph range to: ", newRange)
    setGraphRange(newRange)
    // ! TODO -> Create functions to reload portfolio / watchlist based on the new graphRange
  }


  return (
    <section className='dashboard-view'>
      <div className="card-container">
        <Card pillText="Portfolio" pillData={portfolioValues.changePercent} cardText={portfolioValues.currValue} />
        <Card pillText="Today" pillData={portfolioValues.changePercent} cardText={portfolioValues.changeValue} />
        <Card pillText="Watchlist" pillData={watchListValues.changePercent} cardText={watchListValues.currValue} />
        <Card pillText="Watchlist Change" pillData={watchListValues.changePercent} cardText={watchListValues.changeValue} />
      </div>
      
      <PortfolioTrendLine handleGraphRange={handleGraphRange} />
      <Watchlist watchListValues={watchListValues} graphRange={graphRange} />
    </section>
  )
}

export default Dashboard;