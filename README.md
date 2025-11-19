# Loxley.com - Stock Portfolio Management Platform

A modern, full-stack stock trading and portfolio management application that allows users to track their investments, view real-time stock data, and manage their watchlist.

![Loxley Dashboard](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18+-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)

## 📸 Screenshots

### Dashboard View
The main dashboard displays your portfolio value, daily changes, watchlist, and a comprehensive portfolio value chart with multiple timeframe options (7D, 14D, 30D, 90D).

### Portfolio Management
View all your holdings with real-time pricing, track your gains/losses, and execute trades directly from the portfolio page.

### Stock Overview
Detailed stock information with interactive charts, allowing you to buy or exchange stocks with customizable quantities.

## ✨ Features

### Portfolio Management
- **Real-time Portfolio Tracking**: Monitor your total portfolio value with live updates
- **Performance Metrics**: View daily changes and overall portfolio performance
- **Visual Analytics**: Interactive charts showing portfolio value over multiple timeframes
- **Holdings Overview**: Detailed breakdown of all stocks in your portfolio

### Stock Trading
- **Buy Stocks**: Purchase stocks with real-time pricing
- **Sell Stocks**: Liquidate positions from your portfolio
- **Exchange Stocks**: Swap between different stock positions
- **Price Tracking**: Live current price updates for all stocks

### Watchlist
- **Custom Watchlist**: Add stocks to your watchlist for easy monitoring
- **Search Functionality**: Quick search to find and add stocks
- **Stock Recommendations**: Pre-populated list of popular tech stocks (AAPL, NVDA, MSFT, AMZN, GOOG, TSLA, AMD)
- **Quick Access**: View key metrics for watchlist stocks at a glance

### User Interface
- **Dark Theme**: Modern, sleek dark mode interface
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Intuitive Navigation**: Easy-to-use sidebar navigation
- **Real-time Charts**: Interactive stock price charts with historical data

## 🛠️ Technology Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **CSS Modules** - Component styling
- **Chart Libraries** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **RESTful API** - Backend architecture
- **Stock Market API** - Real-time stock data integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB instance

### Installation

#### Frontend Setup
```bash
# Clone the frontend repository
git clone https://github.com/CedricRobitaille/Unit-3-Group-Project-Front-End.git

# Navigate to the project directory
cd Unit-3-Group-Project-Front-End

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### Backend Setup
```bash
# Clone the backend repository
git clone https://github.com/CedricRobitaille/Unit-3-Group-Project-Back-End.git

# Navigate to the project directory
cd Unit-3-Group-Project-Back-End

# Install dependencies
npm install

# Create a .env file with your configuration
# Add your MongoDB connection string and API keys

# Start the server
npm start
```

### Environment Variables

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
STOCK_API_KEY=your_stock_api_key
PORT=3000
```

## 📁 Project Structure

```
Loxley.com/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   ├── Portfolio/
│   │   │   └── Settings/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── backend/
    ├── models/
    ├── routes/
    ├── controllers/
    └── server.js
```

## 🎯 Key Features Breakdown

### Dashboard
- Daily change tracking
- Multi-timeframe portfolio chart (7D, 14D, 30D, 90D)
- Watchlist integration
- Stock recommendations

### Portfolio Page
- Holdings table with:
  - Quantity owned
  - Stock symbol
  - Current price
  - Total change ($ and %)
  - Purchase price
  - Sell options
- Stock detail panel with:
  - Historical price chart
  - Max volume and unit price
  - Quantity and purchase price inputs
  - Buy/Exchange functionality


## 🔐 Security Features
- Secure session management
- Protected API routes
- Data encryption

## 👥 Contributors

Lovingly(???) crafted by:
- **Cedric Robitaille** - [GitHub](https://github.com/CedricRobitaille)
- **Justin Clark**
- **Eric Segev**

## 📝 License

This project is part of a group educational project.

## 🔗 Links

- **Frontend Repository**: [https://github.com/CedricRobitaille/Unit-3-Group-Project-Front-End](https://github.com/CedricRobitaille/Unit-3-Group-Project-Front-End)
- **Backend Repository**: [https://github.com/CedricRobitaille/Unit-3-Group-Project-Back-End](https://github.com/CedricRobitaille/Unit-3-Group-Project-Back-End)
- **Live Demo**: http://ec2-3-80-101-79.compute-1.amazonaws.com:5173/

## 🐛 Known Issues & Future Enhancements

### Planned Features
- Advanced portfolio analytics


## 📧 Contact

For questions or support, please open an issue in the respective GitHub repository.

---

**Note**: This is a educational project and should not be used for actual trading purposes. Always consult with financial professionals for investment advice.