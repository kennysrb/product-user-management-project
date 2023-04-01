import { useState } from "react";
import { Header } from "../components/Header";
import styles from "./Users.module.scss";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export const Users = () => {
  interface Column {
    id:
      | "image"
      | "firstName"
      | "lastName"
      | "age"
      | "gender"
      | "email"
      | "phone";
    // | "address";
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    { id: "image", label: "", maxWidth: 20 },
    { id: "firstName", label: "Name", minWidth: 100 },
    { id: "lastName", label: "Last name", minWidth: 100 },
    {
      id: "age",
      label: "Age",
      maxWidth: 20,
      align: "right",
      // format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "email",
      label: "Email",
      minWidth: 100,
      align: "right",
      // format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "phone",
      label: "Phone",
      minWidth: 100,
      align: "right",
      // format: (value: number) => value.toFixed(2),
    },
  ];

  interface User {
    image: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    // address: ;
  }

  function createData(
    image: string,
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    email: string,
    phone: string
    // address:
  ): User {
    return { image, firstName, lastName, age, gender, email, phone };
  }

  const rows = [
    createData(
      "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
      "John",
      "Doe",
      2,
      "male",
      "jdoe@gmail.com",
      "1234567890"
    ),
    createData(
      "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
      "John",
      "Doe",
      23,
      "male",
      "jdoe@gmail.com",
      "1234567890"
    ),
    createData(
      "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
      "John",
      "Doe",
      24,
      "male",
      "jdoe@gmail.com",
      "1234567890"
    ),
    createData(
      "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
      "John",
      "Doe",
      25,
      "male",
      "jdoe@gmail.com",
      "1234567890"
    ),
    createData(
      "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
      "John",
      "Doe",
      26,
      "male",
      "jdoe@gmail.com",
      "1234567890"
    ),
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Header />
      <div className={styles.Container}>
        {/* <FiltersBar /> */}
        <div>
          {/* {users.map((elem: any) => {
            return <SingleProduct key={elem.id} {...elem} />;
          })} */}

          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ height: "100vh" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <h2>USER LIST</h2>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          top: 57,
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.age}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "image" ? (
                                  <img src={value} alt={value} />
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </>
  );
};
