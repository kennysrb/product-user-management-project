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
import UsersFilterBar from "../components/UsersFiltersBar";
import CartIcon from "../assets/images/icons/cart-icon.png";
import { UserCartModal } from "../modals/UserCartModal";
import { Tooltip } from "@mui/material";
export const Users = observer(() => {
  const {
    userStore: { getUsers, users, getSingleUser, getUserCart },
    cartStore: { getSingleCart },
  } = useStore();
  useEffect(() => {
    getUsers();
  }, []);
  const [isOpen, setOpen] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  interface Column {
    id:
      | "image"
      | "firstName"
      | "lastName"
      | "age"
      | "gender"
      | "email"
      | "phone"
      | "cart";
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    { id: "image", label: "", maxWidth: 20, align: "right" },
    { id: "firstName", label: "Name", maxWidth: 20, align: "right" },
    { id: "lastName", label: "Last name", minWidth: 100, align: "right" },
    {
      id: "age",
      label: "Age",
      maxWidth: 20,
      align: "right",
    },
    { id: "gender", label: "Gender", maxWidth: 20, align: "right" },
    {
      id: "email",
      label: "Email",
      minWidth: 100,
      align: "right",
    },
    {
      id: "phone",
      label: "Phone",
      minWidth: 100,
      align: "right",
    },
    {
      id: "cart",
      label: "Cart",
      maxWidth: 20,
      align: "right",
    },
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
  const selectUser = (id: any) => {
    getSingleUser(id);
    setOpen(true);
  };
  const openUserCart = (e: any, id: any) => {
    setCartModalOpen(true);
    getSingleCart(id);
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
                          <TableCell
                            align="right"
                            style={{
                              maxWidth: columns["cart"]?.maxWidth,
                            }}
                          >
                            <Tooltip title="Open user cart">
                              <img
                                className={styles.CartIcon}
                                src={CartIcon}
                                alt="user cart"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openUserCart(e, row.id);
                                }}
                              />
                            </Tooltip>
                          </TableCell>
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
      <UserCartModal open={isCartModalOpen} setOpen={setCartModalOpen} />
    </>
  );
});
