import * as React from "react";
import { useState } from "react";
import userStyles from "~/styles/user.css";
import { getSession } from "~/services/session.server";
import { jwtDecode } from "jwt-decode";
import { commitSession, sessionStorage } from "~/services/session.server";
import authenticator from "~/services/auth.server";
import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Link as RemixLink, json, useLoaderData } from "@remix-run/react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { esES } from "@mui/x-data-grid/locales";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import SavedSearchIcon from '@mui/icons-material/SavedSearch';

export const links = () => [{ rel: "stylesheet", href: userStyles }];

export const meta: MetaFunction = () => [
  { title: "RSFE | Ventas" },
  { name: "description", content: "Aquí se agregarán las nuevas ventas" },
];

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 20,
    headerClassName: "centered-header",
    // renderHeader: () => <strong>ID</strong>,
  },
  // {
  //   field: "Producto",
  //   headerName: <strong>Usuario</strong>,
  //   width: 800,
  //   headerClassName: "centered-header",
  // },
  // {
  //   field: "Valor Unitario",
  //   headerName: <strong>Correo</strong>,
  //   width: 250,
  //   headerClassName: "centered-header",
  // },
  // {
  //   field: "Cantidad",
  //   headerName: <strong>Áreas</strong>,
  //   width: 250,
  //   headerClassName: "centered-header",
  // },
  // {
  //   field: "action",
  //   headerName: <strong>Acciones</strong>,
  //   width: 120,
  //   headerClassName: "centered-header",
  //   renderCell: (params) => (
  //     <strong>
  //       <button
  //         className="button_edit"
  //         // onClick={() => handleEdit(params.id)}
  //       >
  //         Editar
  //       </button>
  //     </strong>
  //   ),
  // },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

const TAX_RATE = 0.18;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function Sale() {
  const [age, setAge] = useState("");
  const [age2, setAge2] = useState("");
  const [age3, setAge3] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleChange = (event: SelectChangeEvent) => setAge(event.target.value);
  const handleDateChange = (date: Date) => setSelectedDate(date);

  return (
    <div className="sale_container">
      <div className="sale_card">
        <div className="sale_container_left">
          <div className="sale_card_left">
            <TextField label="Emisor" fullWidth focused required />
            <TextField label="Comprobante" fullWidth focused required />
          </div>
          <div className="sale_card_left">
            <FormControl sx={{ m: 1, minWidth: 120 }} focused>
              <InputLabel id="document-select-label">Moneda</InputLabel>
              <Select
                labelId="document-select-label"
                id="document-select"
                value={age2}
                label="Moneda"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} focused>
              <InputLabel id="document-select-label">Serie</InputLabel>
              <Select
                labelId="document-select-label"
                id="document-select"
                value={age3}
                label="Serie"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="sale_card_left">
            <TextField label="Fecha de Emisión" fullWidth focused required />
            <TextField label="Correlativo" fullWidth focused required />
          </div>
        </div>
        <div className="vertical-line"></div>
        <div className="sale_container_right">
          <div className="client_info_container">
            <FormControl sx={{ m: 1, minWidth: 120 }} focused>
              <InputLabel id="document-select-label">
                Documento de Identidad
              </InputLabel>
              <Select
                labelId="document-select-label"
                id="document-select"
                value={age}
                label="Documento de Identidad"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="client_info_container">
            <TextField label="Número de Documento" fullWidth focused required />
            <SavedSearchIcon/>
          </div>
          <div className="client_info_container">
            <TextField label="Razón Social" fullWidth focused required />
            <TextField label="Dirección" fullWidth focused required />
          </div>
        </div>
      </div>
      <div className="search_and_create_container">
        <div className="search_and_create_card">
          <div className="search_container">
            <TextField label="Buscar producto" fullWidth focused required />
            <SavedSearchIcon/>
          </div>
          <div className="table_search_container">
            <TableContainer sx={{ minWidth: "100%" }} component={Paper}>
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Código</TableCell>
                    <TableCell align="center">Producto</TableCell>
                    <TableCell>Valor Unitario</TableCell>
                    <TableCell align="center">Cantidad</TableCell>
                    <TableCell align="center">Añadir</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.desc}>
                      <TableCell align="center">1</TableCell>
                      <TableCell align="center">Paperclips (Box)</TableCell>
                      <TableCell align="center">{ccyFormat(row.price)}</TableCell>
                      <TableCell align="center">{row.qty}</TableCell>
                      <TableCell align="right">
                        <div className="btn_edit_sale_container">
                          <button className="btn_edit_sale"> + </button>
                          <button className="btn_edit_sale"> - </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="vertical-line"></div>
        <div className="table_data_container">
          <TableContainer sx={{ minWidth: "100%" }} component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    Detalles
                  </TableCell>
                  <TableCell align="right">Precio</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Item</TableCell>
                  <TableCell align="center">Unidad</TableCell>
                  <TableCell>Producto</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Valor Unitario</TableCell>
                  <TableCell align="right">Sub Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.desc}>
                    <TableCell align="center">1</TableCell>
                    <TableCell align="center">NIU</TableCell>
                    <TableCell>{row.desc}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.unit}</TableCell>
                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={5} />
                  <TableCell rowSpan={5} />
                  <TableCell rowSpan={5} />
                  <TableCell colSpan={1} align="right">
                    Subtotal
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">
                    {ccyFormat(invoiceSubtotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={1} align="right">
                    Tax
                  </TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={1} align="right">
                    Total
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="btn_save_cancel_container">
        <button className="btn_sale_save">Guardar</button>
        <button className="btn_sale_cancel">Cancelar</button>
      </div>
    </div>
  );
}

export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};
