import "./Portfolio.css"
import PortfolioData from "./PortfolioData/PortfolioData";
import StockOverview from "./StockOverview/StockOverview";
import dailiesIndex from "../../services/Dailies.js";
import * as transactions from "../../services/TransactionService.js";
import { useEffect, useState } from "react";

const Portfolio = (props) => {

  const [transactionData, setTransactionData] = useState([]);


  useEffect(() => {
    handlePageRefresh()
  }, [])


  // Exact same as the useEffect, so that we can fetch the whole page on load.
  const handlePageRefresh = async () => {
    console.log("REFRESH PAGE")
    const myTransactions = await transactions.index();
    console.log(myTransactions);

    // Get unique tickers from transactions
    const tickers = [...new Set(myTransactions.map(t => t.ticker))];

    // Fetch daily data for each ticker and await all promises
    const dailyDataPromises = tickers.map(ticker => dailiesIndex(ticker));
    const dailyDataResults = await Promise.all(dailyDataPromises);

    console.log("Daily data results:", dailyDataResults); // Debug log

    // Create a map of ticker to current price
    const priceMap = {};
    dailyDataResults.forEach(data => {
      console.log("Processing data:", data); // Debug log
      if (data && data.values && data.values.length > 0) {
        priceMap[data.symbol.toLowerCase()] = data.values[0].close; // Use lowercase for consistency
      }
    });
    console.log("Price map:", priceMap); // Debug log


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

    console.log("Formatted transactions:", formattedTransactions);
    setTransactionData(formattedTransactions);
  }

  const buttonAction = async (id) => {
    const delConfirmation = await transactions.del(id);
    console.log(delConfirmation)
    if (delConfirmation) {
      handlePageRefresh()
    }
  }

  return (
    <section className="portfolio-data">
      <PortfolioData 
        buttonAction={buttonAction}
        transactionData={transactionData} 
        setData={setTransactionData}
      />
      <StockOverview handlePageRefresh={handlePageRefresh} />
    </section>
  )
};

export default Portfolio;