import { useEffect, useState } from "react";
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
import { useStore } from "../store";
import { observer } from "mobx-react-lite";
import { UserInfoModal } from "../modals/UserInfoModal";
import ProductsFiltersBar from "../components/ProductsFiltersBar";
import UsersFilterBar from "../components/UsersFiltersBar";

export const Users = observer(() => {
  const {
    userStore: { getUsers, users, getSingleUser, singleUser },
  } = useStore();
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    getUsers();
  }, []);
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
    { id: "image", label: "", maxWidth: 20, align: "right" },
    { id: "firstName", label: "Name", minWidth: 100, align: "right" },
    { id: "lastName", label: "Last name", minWidth: 100, align: "right" },
    {
      id: "age",
      label: "Age",
      maxWidth: 20,
      align: "right",
      // format: (value: number) => value.toLocaleString("en-US"),
    },
    { id: "gender", label: "Gender", minWidth: 100, align: "right" },
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
  const selectUser = (id: any) => {
    getSingleUser(id);
    setOpen(true);
  };

  return (
    <>
      <Header />
      <div className={styles.Container}>
        <UsersFilterBar />
        <div>
          <Paper sx={{ width: "100%" }}>
            <TableContainer
              className={styles.TableContainer}
              sx={{ height: "100vh" }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead className={styles.TableHead}>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          top: 0,
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth,
                        }}
                        className={styles.TableHeadCell}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                          className={styles.TableRow}
                          onClick={() => selectUser(row.id)}
                        >
                          {Object.keys(row)
                            .filter((u) => u !== "id")
                            .map((key) => (
                              <TableCell
                                key={key}
                                align="right"
                                style={{
                                  minWidth: columns[key]?.minWidth,
                                  maxWidth: columns[key]?.maxWidth,
                                }}
                              >
                                {key === "image" ? (
                                  <img
                                    className={styles.AvatarImg}
                                    src={row[key]}
                                    alt={row[key]}
                                  />
                                ) : (
                                  row[key]
                                )}
                              </TableCell>
                            ))}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
      <UserInfoModal open={isOpen} setOpen={setOpen} />
    </>
  );
});
