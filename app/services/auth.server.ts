// app/services/auth.server.ts
import { Authenticator, AuthorizationError } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { sessionStorage, User } from '~/services/session.server';

// Create an instance of the authenticator, pass a Type, User,  with what
// strategies will return and will store in the session
const authenticator = new Authenticator<User | Error | null>(sessionStorage, {
  sessionKey: "sessionKey", // keep in sync
  sessionErrorKey: "sessionErrorKey", // keep in sync
});

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {

    // get the data from the form...
    let correo = form.get('email') as string;
    let password = form.get('password') as string;

    // initiialize the user here
    let user = null;

    // do some validation, errors are in the sessionErrorKey
    if (!correo || correo?.length === 0) throw new AuthorizationError('Bad Credentials: Email is required')
    if (typeof correo !== 'string')
      throw new AuthorizationError('Bad Credentials: Email must be a string')

    if (!password || password?.length === 0) throw new AuthorizationError('Bad Credentials: Password is required')
    if (typeof password !== 'string')
      throw new AuthorizationError('Bad Credentials: Password must be a string')

    // login the user, this could be whatever process you want
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, password }),
    });

    if (!response.ok) {
      throw new AuthorizationError("Bad Credentials");
    }

    // Si la autenticación es exitosa, obtén el token de la respuesta
    const data = await response.json();
    const token = data.token;

    // Si obtuviste un token, crea el usuario y devuélvelo
    if (token) {
      const user: User = {
        name: correo,
        token: token,
      };
      return user;

    } else {
      throw new AuthorizationError("Bad Credentials")
    }

  }),
  'user-pass'
);

export default authenticator