import React, { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import PlaceholderImage from "./../images/placeholder.svg";
import chartImage from "./../images/stock-india.png";
// Components
import SearchBar from "../components/SearchBar";
import StockChart from "../components/StockChart";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  useEffect(() => {
    fetchStock();
  }, [searchInput]);

  const fetchStock = () => {
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(
      `${API_URL}query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${searchInput}&outputsize=compact&apikey=${API_KEY}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["1. open"]
          );
        }
        setStockChartXValues(stockChartXValuesFunction);
        setStockChartYValues(stockChartYValuesFunction);
      });
  };

  const handleSearchStock = (e) => {
    setSearchInput(document.getElementById("searchInput").value);
    e.preventDefault();
  };

  return (
    <main>
      <SearchBar
        searchInput={searchInput}
        handleSearchStock={handleSearchStock}
        fetchStock={fetchStock}
      />
      {!searchInput ? (
        <img id="placeholder" src={PlaceholderImage} alt="placeholder" />
      ) : (
        // <img
        //   width="835.21315"
        //   height="613.09812"
        //   viewBox="0 0 835.21315 613.09812"
        //   src={chartImage}
        //   alt="combo-chart"
        // />
        <StockChart
          searchInput={searchInput}
          stockChartXValues={stockChartXValues}
          stockChartYValues={stockChartYValues}
        />
      )}
    </main>
  );
};

export default Home;
