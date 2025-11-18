import { useState } from "react";
import "./PortfolioData.css"
import { useEffect } from "react";
import dailiesIndex from "../../../services/Dailies.js";
import * as transactions from "../../../services/TransactionService.js";

const PortfolioData = (props) => {

  const {buttonAction, data, setData} = props;

  useEffect(() => {

    const getData = async () => {
      let myTransactions = await transactions.index();
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
      setData(formattedTransactions);
    }

    getData()

  }, []);

  const portfolioTable = data.map(
    (item, index) => {

      return (<div key={item._id} className="row">
        <div className="cell">{item.shareCount}</div>
        <div className="cell">{item.ticker}</div>
        <div className="cell">
          ${parseFloat(item.currentPrice)
            .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }

        </div>
        { item.change < 0 ? 
          <div className="cell negative">{ item.change }</div> :
          <div className="cell positive">{ item.change }</div>
        }
        <div className="cell">
          ${parseFloat(item.purchasePrice)
            .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }

        </div>
        <div className="cell last">
          <button onClick={() => buttonAction(item._id)}>
            Sell
          </button>
        </div>
      </div>)
    }
  );

  return (
    <div className="portfolio-data-outer">
      <div className="portfolio-data-inner">
        <div className="portfolio-data-header">
          <h1>Your Portfolio</h1>
        </div>
        <div className="data-table-container">
          <div className='table'>
            <div className="header-row row">
              <div className="cell">Qty.</div>
              <div className="cell">Stock Name</div>
              <div className="cell">Current Price</div>
              <div className="cell">Change</div>
              <div className="cell">Purchase Price</div>
              <div className="cell last">Actions</div>
            </div>
            <div className="table-data">
              {portfolioTable}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PortfolioData;