import * as React from "react";
import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link as RemixLink, json, redirect } from "@remix-run/react";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import loginStyles from "~/styles/login.css";
import Copyright from "../src/Copyright";
import { AuthorizationError } from "remix-auth";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

import {
  commitSession,
  getSession,
  sessionStorage,
} from "~/services/session.server";

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
export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="login_container">
      <Form method="post" className="login_card">
        <h2>Iniciar sesión</h2>
        <p>
          ¡Bienvenido de nuevo! Por favor, ingrese sus credenciales para
          continuar.
        </p>
        <TextField
          label="Correo"
          type="email"
          name="email"
          fullWidth
          focused
          required
        />
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
            name="password"
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
            <RemixLink to="/recover_password" prefetch="intent">
              ¿Olvidaste tu contraseña?
            </RemixLink>
          </div>
          <Button
            sx={{ mt: 3, width: "100%" }}
            variant="outlined"
            type="submit"
          >
            Ingresar
          </Button>
        </FormControl>
      </Form>
      <div className="copyright_container">
        <Copyright />
      </div>
    </div>
  );
}

export let loader: LoaderFunction = async ({ request }) => {
  const isAuthenticated = await authenticator.isAuthenticated(request);

  if (isAuthenticated) {
    return redirect('/usuario');
  }

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const error = session.get("sessionErrorKey");
  return json<any>({ error });
};


export async function action({ request }: ActionFunctionArgs) {
  console.log("ACTION");
  console.log("ACTION");
  // try {
  // return await authenticator.authenticate("user-pass", request, {
  //   successRedirect: "/usuario",
  //   failureRedirect: "/login",
  //   throwOnError: true,
  // });
  let session = await getSession(request.headers.get("Cookie"));

  console.log("lasession", session.data);

  const token = await authenticator.authenticate("user-pass", request, {
    successRedirect: "/usuario",
    failureRedirect: "/login",
    throwOnError: true,
  });
  console.log('jejetoken', token)
  session.set("token", token); 

  console.log('tokenxd', token);
  console.log('tokenxd', token)
  return redirect("/usuario", {
    headers: {
      "Set-Cookie": `token=${token}`,
    },
  });

}
