import * as React from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useLocation,
  useLoaderData,
} from "@remix-run/react";
import { withEmotionCache } from "@emotion/react";
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/material";
import theme from "./src/theme";
import ClientStyleContext from "./src/ClientStyleContext";
import Layout from "./src/Layout";
import rootStyles from "~/styles/root.css";
import saleStyles from "~/styles/sale.css";
import notfoundStyles from "~/styles/notfound.css";
import sidebarmenuStyles from "~/styles/sidebarmenu.css";
import headerStyles from "~/styles/header.css";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  json,
} from "@remix-run/server-runtime";
import { getSession } from "./services/session.server";
import { jwtDecode } from "jwt-decode";

// export links
export const links = () => [
  {
    rel: "stylesheet",
    href: rootStyles,
  },
  {
    rel: "stylesheet",
    href: notfoundStyles,
  },
  {
    rel: "stylesheet",
    href: saleStyles,
  },
  {
    rel: "stylesheet",
    href: sidebarmenuStyles,
  },
  {
    rel: "stylesheet",
    href: headerStyles,
  },
];

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const clientStyleData = React.useContext(ClientStyleContext);

    // Only executed on client
    useEnhancedEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line no-underscore-dangle
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          />
          <meta
            name="emotion-insertion-point"
            content="emotion-insertion-point"
          />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

type User = {
  nombre: string;
  apellido: string;
};

// https://remix.run/docs/en/main/route/component
// https://remix.run/docs/en/main/file-conventions/routes
export default function App() {
  let location = useLocation();
  let isLoginRoute = location.pathname === "/login";
  const user: User = useLoaderData();
  console.log("ladat2a", user);
  return (
    <Document>
      {isLoginRoute ? (
        <Outlet />
      ) : (
        <Layout user={user}>
          <Outlet />
        </Layout>
      )}
    </Document>
  );
}

// https://remix.run/docs/en/main/route/error-boundary
export function ErrorBoundary() {
  const error = useRouteError();
  const user: User = useLoaderData();
  console.log("ladat2a", user);
  if (isRouteErrorResponse(error)) {
    let message;
    switch (error.status) {
      case 401:
        message = (
          <p>
            Oops! Looks like you tried to visit a page that you do not have
            access to.
          </p>
        );
        break;
      case 404:
        message = (
          <p>Oops! Looks like you tried to visit a page that does not exist.</p>
        );
        break;

      default:
        throw new Error(error.data || error.statusText);
    }

    return (
      <Document title={`${error.status} ${error.statusText}`}>
        <div className="notfound_container">
          <div className="notfound_card">
            <h1>
              {error.status}: {error.statusText}
            </h1>
            {message}
          </div>
        </div>
      </Document>
    );
  }

  if (error instanceof Error) {
    console.error(error);
    return (
      <Document title="Error!">
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Document>
    );
  }

  return <h1>Unknown Error</h1>;
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  // Primero, verifica si el usuario está autenticado
  console.log("Iniciando loader");
  const requestInfo = new URL(request.url);
  const pathname = requestInfo.pathname;

  // Verificar si la ruta actual es la de login
  if (pathname === "/login") {
    console.log("La ruta actual es la de login, no se ejecutará el loader");
    return json(null);
  }

  console.log("Iniciando loader");
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) {
    console.log("No se encontraron cookies");
    return json(null);
  }
  const session = await getSession(cookieHeader);
  // Verificar el contenido de la sesión
  console.log("Contenido de la sesión:", session.data);
  const token = session.get("sessionKey").token;
  console.log("Token obtenido de la sesión:", token);
  if (!token) {
    return json(null);
  }
  try {
    console.log("holaa");
    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken);
    const user = {
      nombre: decodedToken.nombres,
      apellido: decodedToken.apellidos,
    };
    console.log("Usuario decodificado:", user); // Verifica que el token se decodifica correctamente
    return json(user);
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return json(null);
  }
};
