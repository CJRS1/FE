import * as React from "react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link as RemixLink } from "@remix-run/react";
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
import loginStyles from "~/styles/login.css";
import Copyright from "../src/Copyright";

// export links
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: loginStyles,
  },
];

// https://remix.run/docs/en/main/route/meta
export const meta: MetaFunction = () => [
  { title: "FE | Login" },
  {
    name: "description",
    content: "Bienvenido a mi aplicación de Facturación Electrónica",
  },
];

// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="login_container">
      <div className="login_card">
        <h2>Iniciar sesión</h2>
        <p>¡Bienvenido de nuevo! Por favor, ingrese sus credenciales para continuar.</p>
        <TextField label="Correo" fullWidth focused required />
        <FormControl
          sx={{ mt: 5, width: "100%" }}
          variant="outlined"
          focused
          required
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Contraseña
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Contraseña"
          />
          <div className="options_container">
            {/* <div className="remember_container">
              <Checkbox
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <h4>Recordar mi cuenta</h4>
            </div> */}
            <RemixLink to="/recover_password" prefetch="intent" >
              ¿Olvidaste tu contraseña?
            </RemixLink>
          </div>
          <Button
            sx={{ mt: 3, width: "100%" }}
            variant="outlined"
            href="#outlined-buttons"
          >
            Ingresar
          </Button>
        </FormControl>
      </div>
      <div className="copyright_container">
        <Copyright />
      </div>
    </div>
  );
}
