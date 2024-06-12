// app/services/auth.server.ts
import { redirect } from '@remix-run/node';
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { commitSession, sessionStorage } from '~/services/session.server';

export let authenticator = new Authenticator(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let correo = form.get('email');
    let password = form.get('password');

    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo, password }),
    });

    if (!response.ok) {
      throw new Error('Error de autenticación');
    }

    const data = await response.json();
    const token = data.token;

    // Obtener o crear una nueva sesión
    const session = await sessionStorage.getSession();
    session.set("token", token);  // Guardar el token en la sesión

    // Asegúrate de que estás viendo los datos correctos en la sesión
    console.log('Token guardado en la sesión:', token);
    console.log('Datos de la sesión:', session.data);

    return redirect("/usuario", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }),
  'user-pass'
);

