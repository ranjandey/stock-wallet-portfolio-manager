import React from "react";
import { useTable } from "react-table";
import { useDispatch } from "react-redux";

import { Content } from "./Table.styles";
import DeleteIcon from "../../images/delete.svg";

import { deleteStock } from "../../actions/stocks";

const Table = ({ stocks }) => {
  const dispatch = useDispatch();

  const columns = React.useMemo(
    () => [
      {
        Header: "STOCK",
        Footer: "Total",
        accessor: "assetName",
        width: 150,
        textAlign: "left",
      },
      {
        Header: "STOCK PRICE",
        accessor: "latestTradePrice",
        width: 150,
        textAlign: "center",
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
      },
      {
        Header: "MARKET VALUE",
        accessor: "currentValue",
        Footer: (info) => {
          const total = React.useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => parseFloat(row.values.currentValue) + sum,
                0
              ),
            [info.rows]
          );

          return (
            <div style={{ textAlign: "center" }}>{"₹" + total.toFixed(2)}</div>
          );
        },
        width: 150,
        textAlign: "center",
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
      },
      {
        Header: "COST PRICE",
        accessor: "investmentValue",
        Footer: (info) => {
          const total = React.useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => parseFloat(row.values.investmentValue) + sum,
                0
              ),
            [info.rows]
          );

          return (
            <div style={{ textAlign: "center" }}>{"₹" + total.toFixed(2)}</div>
          );
        },
        width: 150,
        textAlign: "center",
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
      },
      {
        Header: "% CHANGE",
        accessor: "change",
        Footer: (info) => {
          const totalMarketValue = React.useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => parseFloat(row.values.currentValue) + sum,
                0
              ),
            [info.rows]
          );
          const totalBuyingValue = React.useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => parseFloat(row.values.investmentValue) + sum,
                0
              ),
            [info.rows]
          );

          const totalPortfolioChange =
            ((totalMarketValue - totalBuyingValue) / totalBuyingValue) * 100;

          return (
            <div
              className={
                totalPortfolioChange.toString().startsWith("-")
                  ? "RedColor"
                  : "GreenColor"
              }
              style={{ textAlign: "center" }}
            >
              {totalPortfolioChange.toFixed(2)}
            </div>
          );
        },
        width: 150,
        textAlign: "center",
        Cell: (s) => (
          <div
            className={s.value.startsWith("-") ? "RedColor" : "GreenColor"}
            style={{ textAlign: "center" }}
          >
            {s.value}
          </div>
        ),
      },
      {
        accessor: "id",
        width: 40,
        Cell: (s) => (
          <button
            className="delete-button"
            onClick={() => dispatch(deleteStock(s.value))}
          >
            <img className="delete-icon" src={DeleteIcon} alt="delete-icon" />
          </button>
        ),
      },
    ],
    [stocks]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: stocks });

  return (
    <Content>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps({
                    style: { width: column.width, textAlign: column.textAlign },
                  })}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((group) => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </Content>
  );
};

export default Table;
