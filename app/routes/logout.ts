import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/services/session.server";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export const loader = async () => {
  return redirect("/");
};