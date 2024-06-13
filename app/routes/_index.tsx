import * as React from 'react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { Link as RemixLink, useLoaderData } from '@remix-run/react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import  authenticator  from '~/services/auth.server';

// https://remix.run/docs/en/main/route/meta
export const meta: MetaFunction = () => [
  { title: 'Remix Starter' },
  { name: 'description', content: 'Welcome to remix!' },
];

export let loader: LoaderFunction = async ({request}) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login"
  })
}

// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
  const data = useLoaderData();
  console.log('hola',data)


  return (
    <React.Fragment>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Material UI Remix in TypeScript example
      </Typography>
      <Link to="/about" color="secondary" component={RemixLink}>
        Go to the about page
      </Link>
    </React.Fragment>
  );
}
