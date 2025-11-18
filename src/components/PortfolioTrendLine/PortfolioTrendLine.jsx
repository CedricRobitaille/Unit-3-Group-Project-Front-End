
import { useState, useEffect } from 'react'
import Graph from '../DataViz/Graph/Graph';
import PortfolioHeader from "./PortfolioHeader/PortfolioHeader"
import './PortfolioTrendLine.css'




const PortfolioTrendLine = ({ handleGraphRange }) => {
    const [data, setData] = useState([]);
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