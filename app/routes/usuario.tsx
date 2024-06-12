import * as React from "react";
import type { LoaderFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link as RemixLink, json, useLoaderData } from "@remix-run/react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
// import Checkbox from "@mui/material/Checkbox";
import userStyles from "~/styles/user.css";
import { getSession } from "~/services/session.server";
import { jwtDecode } from "jwt-decode";
import { commitSession, sessionStorage} from '~/services/session.server';
import  authenticator  from "~/services/auth.server";
// import { esES } from '@mui/x-data-grid/locales';

// export links
export const links = () => [
  {
    rel: "stylesheet",
    href: userStyles,
  },
];

// https://remix.run/docs/en/main/route/meta
export const meta: MetaFunction = () => [
  { title: "RSFE | Usuario" },
  {
    name: "description",
    content: "Aquí se muestra la lista de usuarios",
  },
];

// const columns2 = [
//   { field: "id_estructura", headerName: <strong>ID</strong>, width: 100 },
//   { field: "id_asignacion", headerName: <strong>ID</strong>, width: 100 },
//   { field: "id", headerName: <strong>ID Estructura</strong>, width: 100 },
//   { field: "mv", headerName: <strong>MV</strong>, width: 70 },
//   { field: "nom_mv", headerName: <strong>Nombre MV</strong>, width: 300 },
//   {
//     field: "fec_inicio",
//     headerName: <strong>Fecha inicio</strong>,
//     width: 110,
//   },
//   { field: "fec_fin", headerName: <strong>Fecha fin</strong>, width: 110 },
//   {
//     field: "sts_recep_asis",
//     headerName: <strong>Estado</strong>,
//     width: 140,
//   },
//   {
//     field: "ruta",
//     headerName: <strong>Documento adjunto</strong>,
//     width: 150,
//     renderCell: (params) => {
//       const ruta = params.value;
//       const estado = params.row.sts_recep_asis;
//       return estado !== "PENDIENTE" ? (
//         <Link
//           href={`http://${ruta}`}
//           download
//           target="_blank"
//           rel="noopener noreferrer"
//           className="btn_download"
//           onClick={() => handleDownload2(ruta)}
//         >
//           Descargar
//         </Link>
//       ) : (
//         <span style={{ textAlign: "center", width: "100%" }}>{estado}</span>
//       );
//     },
//   },
//   {
//     field: "action_answer",
//     headerName: <strong>Responder</strong>,
//     width: 150,
//     headerClassName: "centered-header",
//     renderCell: (params) => (
//       <strong>
//         <button
//           className="button_create_as"
//           onClick={() => handleAnswer(params)}
//         >
//           Responder
//         </button>
//       </strong>
//     ),
//   },
//   {
//     field: "action_watch",
//     headerName: <strong>Visualizar</strong>,
//     width: 140,
//     headerClassName: "centered-header",
//     renderCell: (params) => (
//       <strong>
//         <button className="button_watch" onClick={() => handleWatch(params)}>
//           Visualizar
//         </button>
//       </strong>
//     ),
//   },
// ];

// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function User() {

  return (
    <div className="user_container">
      <div className="user_card">
        <h2>USUARIO</h2>
        <TextField label="Correo" fullWidth focused required />
        <div className="guser_table structure_table">
          {/* {Array.isArray(estructuras) && estructuras.length > 0 ? (
            <DataGrid
              rows={estructuras.flatMap((estructura) =>
                estructura.asignacion.map((asignacion) => ({
                  id: `${estructura.id_estructura}-${asignacion.id_asignacion}`,
                  id_estructura: estructura.id_estructura,
                  mv: estructura.mv,
                  nom_mv: estructura.nom_mv,
                  id_asignacion: asignacion.id_asignacion,
                  tipo_asig: asignacion.tipo_asig,
                  id_dependencia: asignacion.id_dependencia,
                  id_perfil: asignacion.perfil.id_perfil,
                  sts_recep_asis:
                    asignacion.archivoRecepAsis.length > 0
                      ? asignacion.archivoRecepAsis[0].sts_recep_asis
                      : "PENDIENTE",
                  ruta2:
                    asignacion.archivoRecepAsis.length > 0
                      ? asignacion.archivoRecepAsis[0].ruta
                      : "PENDIENTE",
                  ruta:
                    asignacion.archivoRecepAsis.length > 0
                      ? asignacion.archivoRecepAsis[0].ruta
                      : "PENDIENTE",
                  tipo_archivo: estructura.archivosEmision
                    .map((archivo) => archivo.tipo_archivo)
                    .join(" / "),
                  fec_inicio: asignacion.fec_inicio,
                  fec_fin: asignacion.fec_fin,
                }))
              )}
              columns={columns2} // Aquí establece el pageSize en 25
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 100 },
                },
                columns: {
                  model: [
                    { field: "id_estructura", width: 80 },
                    { field: "condicion", width: 250 },
                    { field: "componente", width: 250 },
                    { field: "indicador", width: 80 },
                    { field: "mv", width: 70 },
                    { field: "nom_mv", width: 250 },
                    { field: "ruta", width: 520 },
                  ],
                  columnVisibilityModel: {
                    id_subproceso: false,
                    id_estructura: false,
                    id_asignacion: false,
                    condicion: false,
                    componente: false,
                    indicador: false,
                    mv: false, // Oculta la columna "Proceso" por defecto
                  },
                },
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]} */}
          {/* localeText={esES.components.MuiDataGrid.defaultProps.localeText} */}
          {/* />
          ) : (
            <p>No hay datos disponibles</p>
          )} */}
        </div>
      </div>
    </div>
  );
}

export let loader: LoaderFunction = async ({request}) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login"
  })
}