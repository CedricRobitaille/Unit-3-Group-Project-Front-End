import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ComposedChart,
    Area
} from 'recharts';
import { useState, useEffect } from 'react'
import './Graph.css'

// Format date for display
const formatDate = (timestamp) => {
    const fixedDate = new Date(timestamp * 1000).toLocaleDateString('en-US', {
        // year: 'numeric', 
        month: 'short',
        day: '2-digit'
    });
    return fixedDate;
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #3DFFC5'
            }}>
                <p style={{ color: '#3DFFC5', margin: '0 0 5px 0', fontWeight: 'bold' }}>
                    {formatDate(payload[0].payload.timestamp)}
                </p>
                <p style={{ color: '#3DFFC5', margin: 1 }}>
                    Close: ${payload[0].value.toFixed(2)}

                </p>

                <p style={{ color: '#3DFFC5', margin: 1 }}>
                    High: ${payload[0].payload.high.toFixed(2)}

                </p>

                <p style={{ color: '#3DFFC5', margin: 1 }}>
                    Low: ${payload[0].payload.low.toFixed(2)}

                </p>
            </div>
        );
    }
    return null;
};

const Graph = (props) => {
    // const searchData = props.searchData;
    const type = props.type;

    // Safety check and create reversed copy instead of mutating
    const searchData = props.searchData && Array.isArray(props.searchData) 
        ? [...props.searchData].reverse() 
        : [];
    
    if (searchData.length === 0) {
        return <div className="graph">No data available</div>;
    }

    console.log(`type: ${type}, searchData:`, searchData);
    // console.log('sortedData: ', sortedData);

    return (
        <div className="graph">
            {/* <div className="w-full h-screen bg-gray-50 p-8"> */}
            {/* <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"> */}
            {/* <h1 className="text-2xl font-bold text-gray-800 mb-2">Recharts - OHLC Data</h1>
                    <p className="text-gray-600 mb-6">High/Low range with Close price line</p> */}

            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={searchData} margin={type === 'small' ? { top: 5, left: 5, bottom: 5, right: 5 } : { top: 20, right: 15 }}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis
                        dataKey="timestampId"
                        tickFormatter={formatDate}
                        angle={-45}
                        textAnchor="end"
                        tick={{ fill: '#3DFFC5' }}
                        stroke='none'
                        label=""
                        height={80}
                        interval={1}
                        hide={type === 'small' ? true : false}
                    />
                    <YAxis
                        datakey='close'
                        domain={['dataMin - 5', 'dataMax + 5']}
                        tick={{ fill: '#3DFFC5' }}
                        stroke='none'
                        allowDecimals={false}
                        tickFormatter={(value) => {
                            return value % 1 === 0 ? value : value.toFixed(1);
                        }}
                        hide={type === 'small' ? true : false}
                    />
                    {type === 'small' ? '' : <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: '#3DFFC5', strokeWidth: 1, strokeDasharray: '5 5' }}

                    />}

                    {/* <Legend /> */}

                    {/* Close line */}
                    {/* <Line
                                type="monotone"
                                dataKey='close'
                                stroke='#3DFFC5'
                                strokeWidth={1.5}
                                dot={false}
                                legendType="none"

                            /> */}
                    {/* High line - lighter */}
                    <Line
                        type="monotone"
                        dataKey="high"
                        stroke="#3DFFC5"
                        strokeWidth={1}
                        strokeOpacity={0.4}
                        dot={false}
                        name="High"
                        hide={type === 'small' ? true : false}
                    />

                    {/* Low line - lighter */}
                    <Line
                        type="monotone"
                        dataKey="low"
                        stroke="#3DFFC5"
                        strokeWidth={1}
                        strokeOpacity={0.4}
                        dot={false}
                        name="Low"
                        hide={type === 'small' ? true : false}
                    />

                    {/* Close price line - solid and prominent */}
                    <Line
                        type="monotone"
                        dataKey='close'
                        stroke='#3DFFC5'
                        strokeWidth={2}
                        dot={false}
                        activeDot={type === 'small' ? false : { r: 6, fill: '#3DFFC5', stroke: '#fff', strokeWidth: 2 }}
                        name="Close"
                    />
                </ComposedChart>
            </ResponsiveContainer>

            {/* <div className="mt-6 p-4 bg-blue-50 rounded">
                        <h3 className="font-semibold text-gray-800 mb-2">Key Changes for OHLC Data:</h3>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Used ComposedChart to combine Area and Line charts</li>
                            <li>• Area shows the High-Low range visually</li>
                            <li>• Close price emphasized with thicker line</li>
                            <li>• Custom tooltip displays all three values</li>
                            <li>• Date formatting for timestamps</li>
                        </ul>
                    </div> */}
            {/* </div> */}
            {/* </div> */}
        </div>

    );
}

export default Graph;