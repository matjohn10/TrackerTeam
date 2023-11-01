import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Ably from "ably/promises";
import { v4 } from "uuid";

export async function GET(request: Request) {
  const rest = new Ably.Rest({ key: process.env.ABLY_API_KEY });
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const id = user;
  const tokenParams = {
    clientId: id ? id.id! : v4(),
  };
  const requestToken = await rest.auth.createTokenRequest(tokenParams);

  return Response.json(requestToken);
}
