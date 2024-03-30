import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_KEY, API_URL } from "../config";
import { createStock } from "../actions/stocks";
// Components
import Table from "./../components/Table";
import Button from "./../components/Button";
import PopUp from "../components/PopUp";

const Portfolio = () => {
  const [seen, setSeen] = useState(false);
  const stocks = useSelector((state) => state.stocks);
  const sizeOfStocksList = stocks.length;
  const dispatch = useDispatch();

  const togglePop = () => {
    setSeen(!seen);
  };

  const addAsset = (e) => {
    fetch(
      `${API_URL}query?function=GLOBAL_QUOTE&symbol=${
        document.getElementById("symbol").value
      }&apikey=${API_KEY}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let currentPrice = 0;
        if (typeof data["Global Quote"] !== "undefined") {
          currentPrice = data["Global Quote"]["05. price"];
        }
        let newAsset = {
          id: Number(sizeOfStocksList),
          assetName: document.getElementById("symbol").value, //sbi
          buyingPrice: document.getElementById("buyingcost").value, //700
          shares: document.getElementById("shares").value, //100
          currentPrice: document.getElementById("currentcost").value,
          buyingCost: (
            parseFloat(document.getElementById("shares").value) *
            document.getElementById("buyingcost").value
          ).toFixed(2),
          currentValue: (
            parseFloat(document.getElementById("shares").value) *
            document.getElementById("currentcost").value
          ).toFixed(2),
          change:
            (
              ((parseFloat(document.getElementById("currentcost").value) -
                parseFloat(document.getElementById("buyingcost").value)) /
                parseFloat(document.getElementById("buyingcost").value)) *
              100
            ).toFixed(2) + "%",
        };
        dispatch(createStock(newAsset));
        setSeen(!seen);
      });
    e.preventDefault();
  };

  return (
    <main>
      <Table stocks={stocks} />
      <Button togglePop={togglePop} />
      {seen ? <PopUp togglePop={togglePop} addAsset={addAsset} /> : null}
    </main>
  );
};

export default Portfolio;
