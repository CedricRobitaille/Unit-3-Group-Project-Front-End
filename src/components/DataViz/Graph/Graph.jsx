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
import index from '../../../services/Dailies.js'
import './Graph.css'

// Format date for display
const formatDate = (timestamp) => {
    // console.log(`timestamp: ${timestamp}`)
    const date = new Date(timestamp * 1000).toLocaleDateString('en-US', {
        // year: 'numeric', 
        month: 'short',
        day: '2-digit'
    });
    // console.log(`tickDate ${date}`);
    return date;
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

const Graph = () => {
    const ticker = 'AAPL';
    const recordCount = 100;

    //data state
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            //fetch data
            const apiData = await index(ticker, recordCount);
            console.log(apiData.values);

            // Transform data
            const transformedData = apiData.values.map(item => ({
                timestamp: item.timestampId,
                high: item.high,
                low: item.low,
                close: item.close
            }));

            // console.log(`transformedData: ${transformedData}`)

            setData(transformedData);
        };

        fetchData();
    }, []);

    return (
        <div className="graph">
            <div className="w-full h-screen bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    {/* <h1 className="text-2xl font-bold text-gray-800 mb-2">Recharts - OHLC Data</h1>
                    <p className="text-gray-600 mb-6">High/Low range with Close price line</p> */}

                    <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart data={data}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={formatDate}
                                angle={-45}
                                textAnchor="end"
                                tick={{ fill: '#3DFFC5' }}
                                stroke='none'
                                label=""
                                height={80}
                                interval={15} 
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
                            />
                            <Tooltip 
                                content={<CustomTooltip />}
                                cursor={{ stroke: '#3DFFC5', strokeWidth: 1, strokeDasharray: '5 5' }}
                            />
                            <Legend />

                            {/* Close line */}
                            <Line
                                type="monotone"
                                dataKey='close'
                                stroke='#3DFFC5'
                                strokeWidth={1.5}
                                dot={false}
                                legendType="none"

                            />
                            {/* High line - lighter */}
                            <Line
                                type="monotone"
                                dataKey="high"
                                stroke="#3DFFC5"
                                strokeWidth={1}
                                strokeOpacity={0.4}
                                dot={false}
                                name="High"
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
                            />

                            {/* Close price line - solid and prominent */}
                            <Line
                                type="monotone"
                                dataKey='close'
                                stroke='#3DFFC5'
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6, fill: '#3DFFC5', stroke: '#fff', strokeWidth: 2 }}
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
                </div>
            </div>
        </div>

    );
}

export default Graph;