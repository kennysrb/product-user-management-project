import { Header } from "../components/Header";
import { useEffect, useState } from "react";
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
import { UserCartModal } from "../modals/UserCartModal";
import CartsFilterBar from "../components/CartsFilterBar";

export const Carts = observer(() => {
  const {
    cartStore: { getCarts, carts, getSingleCart },
    userStore: { getUsers },
  } = useStore();
  useEffect(() => {
    getCarts();
    getUsers();
  }, []);
  const [isOpen, setOpen] = useState(false);

  interface Column {
    id: "userId" | "discountedTotal" | "totalProducts" | "totalQuantity";
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: "left";
    format?: (value: number) => string;
  }
  const columns: Column[] = [
    { id: "userId", label: "User ID", maxWidth: 20, align: "left" },
    {
      id: "discountedTotal",
      label: "Discounted Total",
      maxWidth: 20,
      align: "left",
    },
    {
      id: "totalProducts",
      label: "Total products",
      maxWidth: 20,
      align: "left",
    },
    {
      id: "totalQuantity",
      label: "Total quantity",
      maxWidth: 20,
      align: "left",
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
  const selectCart = (id: any) => {
    getSingleCart(id);
    setOpen(true);
  };

  return (
    <>
      <Header />
      <div className={styles.Container}>
        <CartsFilterBar />
        <div>
          <Paper
            sx={{ width: "60%", margin: "0 auto", border: "2px solid #1B263B" }}
          >
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
                  {carts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                          className={styles.TableRow}
                          onClick={() => selectCart(row.id)}
                        >
                          {Object.keys(row)
                            .filter((c) => c !== "id" && c !== "products")
                            .map((key) => (
                              <TableCell
                                key={key}
                                align="left"
                                style={{
                                  minWidth: columns[key]?.minWidth,
                                  maxWidth: columns[key]?.maxWidth,
                                }}
                              >
                                {row[key]}
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
              count={carts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
      <UserCartModal open={isOpen} setOpen={setOpen} />
    </>
  );
});
