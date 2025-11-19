import "./Portfolio.css"
import PortfolioData from "./PortfolioData/PortfolioData";
import StockOverview from "./StockOverview/StockOverview";
import dailiesIndex from "../../services/Dailies.js";
import * as transactions from "../../services/TransactionService.js";
import { useEffect, useState } from "react";

const Portfolio = () => {

  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    // Toss all loading into a global function so that it can be loaded on init, and on event handler
    // I am learning from my mistakes, and doing it this way instead of having one inside useEffect, and another outside.
    handlePageRefresh() 
  }, [])

  // ! Love the way @JustinClark did this!
  // Exact same as the useEffect, so that we can fetch the whole page on load.
  const handlePageRefresh = async () => {
    const myTransactions = await transactions.index();

    // ! Especially this vvv
    // Get unique tickers from transactions
    const tickers = [...new Set(myTransactions.map(t => t.ticker))];

    // Fetch daily data for each ticker and await all promises
    const dailyDataPromises = tickers.map(ticker => dailiesIndex(ticker));
    const dailyDataResults = await Promise.all(dailyDataPromises);


    // Create a map of ticker to current price
    const priceMap = {};
    dailyDataResults.forEach(data => {
      if (data && data.values && data.values.length > 0) {
        priceMap[data.symbol.toLowerCase()] = data.values[0].close; // Use lowercase for consistency
      }
    });

    // Transform the transactions to match tempData format
    const formattedTransactions = myTransactions.map(transaction => {
      const currentPrice = priceMap[transaction.ticker.toLowerCase()] || 0;
      const purchasePrice = parseFloat(transaction.purchasePrice);
      const change = currentPrice > 0 ?
        ((currentPrice - purchasePrice) / purchasePrice * 100).toFixed(2) :
        -100;

      return {
        _id: transaction._id,
        shareCount: transaction.shareCount.toString(),
        ticker: transaction.ticker,
        currentPrice: currentPrice.toString(),
        change: parseFloat(change),
        purchasePrice: transaction.purchasePrice.toString()
      };
    });

    setTransactionData(formattedTransactions);
  }

  // On `sell` button click
  const buttonAction = async (id) => {
    // Delete the transaction by the elem's ID
    const delConfirmation = await transactions.del(id);
    if (delConfirmation) {  // ONLY IF the transaction succeeds
      handlePageRefresh() // Refresh the table's content's
    }
  }


  const handlePurchase = async () => {
    handlePageRefresh()
  }




  // STOCKS TO BE PASSED DOWN
  const [stockInfo, setStockInfo] = useState()

  const handleEdit = async (id) => {

    const stockValue = await transactions.show(id)
    const searchResults = await dailiesIndex(stockValue.ticker)

    const stockData = {
      searchData: await searchResults.values,
      values: await searchResults.values,
      name: await searchResults.longName,
      symbol: await searchResults.symbol,
      value: parseFloat((await searchResults.values[0].close).toFixed(2)),
      change: parseFloat((await searchResults.values[0].close - await searchResults.previousClose).toFixed(3)),
      qty: stockValue.shareCount,
      id: id
    }
    setStockInfo(stockData)
  }


  // SEARCH
  const handleSearchResults = (searchResults) => {

    const stockData = {
      searchData: searchResults.values,
      values: searchResults.values,
      name: searchResults.longName,
      symbol: searchResults.symbol,
      value: parseFloat((searchResults.values[0].close).toFixed(2)),
      change: parseFloat((searchResults.values[0].close - searchResults.previousClose).toFixed(3))
    }
    setStockInfo(stockData)
  }










  return (
    <section className="portfolio-data">
      <PortfolioData 
        buttonAction={buttonAction}
        transactionData={transactionData} 
        handleEdit={handleEdit}
      />
      <StockOverview 
        handlePageRefresh={handlePageRefresh} 
        stockInfo={stockInfo} 
        handleSearchResults={handleSearchResults} 
        handlePurchase={handlePurchase}
      />
    </section>
  )
};

export default Portfolio;