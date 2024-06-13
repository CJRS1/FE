import React from "react";
import { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import userStyles from "~/styles/user.css";
import { LinksFunction, MetaFunction, LoaderFunction } from "@remix-run/node";
import authenticator from "~/services/auth.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: userStyles },
];

export const meta: MetaFunction = () => [
  { title: "RSFE | Ventas" },
  { name: "description", content: "Aquí se agregarán las nuevas ventas" },
];

export default function Sale() {
  const [age, setAge] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleChange = (event: SelectChangeEvent) => setAge(event.target.value);
  const handleDateChange = (date: Date) => setSelectedDate(date);

  return (
    <div className="user_container">
      <div className="user_card">
        <div className="sale_container">
          <div className="sale_card">
            <TextField label="Emisor" fullWidth focused required />
            <TextField label="Comprobante" fullWidth focused required />
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
          </div>
          <div className="sale_card">
            <FormControl sx={{ m: 1, minWidth: 120 }} focused>
              <InputLabel id="document-select-label">Moneda</InputLabel>
              <Select
                labelId="document-select-label"
                id="document-select"
                value={age}
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
                value={age}
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
            <div className="client_info_container">
              <TextField
                label="Número de Documento"
                fullWidth
                focused
                required
              />
            </div>
          </div>
          <div className="sale_card">
            <TextField label="Fecha de Emisión" fullWidth focused required />
            <TextField label="Correlativo" fullWidth focused required />
            <div className="client_info_container">
              <TextField label="Razón Social" fullWidth focused required />
              <TextField label="Dirección" fullWidth focused required />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};
