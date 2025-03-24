import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return new Response("Test route is working!", {
    headers: { "Content-Type": "text/plain" },
  });
};
