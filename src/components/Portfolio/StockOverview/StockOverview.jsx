import "./StockOverview.css"
import PortfolioHeader from "../../Portfolio/PortfolioHeader/PortfolioHeader";
import TransactionForm from "../TransactionForm/TransactionForm";
import { useState } from "react";

const StockOverview = ({ handleSearchResults, stockInfo, handlePurchase }) => {

  // const [stockInfo, setStockInfo] = useState()


  return (
    <div className="stock-overview-outer">
      <div className="stock-overview-inner">
        <PortfolioHeader handleSearchResults={handleSearchResults} />

        {/* Check if a stock is being worked on, if no, put in a "find a stock" */}
        {/* {!stockInfo && <p>Search for a stock to buy</p>} */}
        {stockInfo && <TransactionForm stockInfo={stockInfo} handlePurchase={handlePurchase} />}
        
      </div>
    </div>
  )
};

export default StockOverview;