import { useState, useEffect } from 'react'
import Graph from '../DataViz/Graph/Graph';
import PortfolioHeader from "./PortfolioHeader/PortfolioHeader"
import './PortfolioTrendLine.css'

const PortfolioTrendLine = ({ type, handleGraphRange, searchData }) => {

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