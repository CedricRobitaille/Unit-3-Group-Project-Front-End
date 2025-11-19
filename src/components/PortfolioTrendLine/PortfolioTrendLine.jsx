
import { useState, useEffect } from 'react'
import Graph from '../DataViz/Graph/Graph';
import PortfolioHeader from "./PortfolioHeader/PortfolioHeader"
import './PortfolioTrendLine.css'
// import { index } from '../../services/TransactionService';
// import fetchDaily from '../../services/Dailies';


const PortfolioTrendLine = ({ type, handleGraphRange, searchData }) => {
    console.log(`portfolioTrendLine searchDat: ${searchData}`)
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     const fetchTransactionsData = async () => {
    //         // const dateToday = new Date();

    //         console.log(` portfolio trendline: ${JSON.stringify(props, null, 2)}`)

    //         const handleRangeSelection = () => {

    //         }
    //         setData(transactions)

    //     };
    //     fetchTransactionsData();

    // }, []);

    return (
        <section className="portfolio-tend-line-outer">
            <div className="portfolio-tend-line-inner">
                <PortfolioHeader handleGraphRange={handleGraphRange} />
                <Graph type={type} searchData={searchData} />
            </div>
        </section>
    );
}

export default PortfolioTrendLine;