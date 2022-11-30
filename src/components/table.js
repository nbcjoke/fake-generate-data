import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { faker } from "@faker-js/faker";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import { randomUser } from "../fake-data/data";

export const TableComponent = ({ locale, error, seed }) => {
  const [usersData, setUsersData] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const seedValue = seed ? +seed : 0;
    faker.seed(seedValue);
    const users = [];

    Array.from({ length: 20 }).forEach(() => {
      users.push(randomUser(locale, error));
    });
    setUsersData(users);
  }, [locale, error, seed]);

  useEffect(() => {
    const users = [];

    if (fetching) {
      Array.from({ length: 10 }).forEach(() => {
        users.push(randomUser(locale, error));
      });
      setUsersData([...usersData, ...users]);
      setFetching(false);
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  });

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      50
    ) {
      setFetching(true);
    }
  };

  const tableCells = ["number", "id", "full name", "adress", "phone"];

  return (
    <>
      <Button
        variant="contained"
        style={{ display: "flex", margin: "30px auto" }}
      >
        <CSVLink
          data={usersData}
          style={{ color: "white", textDecoration: "none" }}
        >
          Download CSV
        </CSVLink>
      </Button>
      <div style={{ padding: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableCells.map((tableCell) => {
                  return <TableCell key={tableCell}>{tableCell}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{user.number}</TableCell>
                  <TableCell align="left">{user.id}</TableCell>
                  <TableCell align="left">{user.fullname}</TableCell>
                  <TableCell align="left">{user.adress}</TableCell>
                  <TableCell align="left">{user.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
