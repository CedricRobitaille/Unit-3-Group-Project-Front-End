import "./StockOverview.css"
import PortfolioHeader from "../../Portfolio/PortfolioHeader/PortfolioHeader";
import TransactionForm from "../TransactionForm/TransactrionForm";

const StockOverview = () => {

  

  return (
    <div className="stock-overview-outer">
      <div className="stock-overview-inner">
        <PortfolioHeader />

        {/* Check if a stock is being worked on, if no, put in a "find a stock" */}

        <TransactionForm />
      </div>
    </div>
  )
};

export default StockOverview;