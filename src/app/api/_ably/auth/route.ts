import Ably from "ably/promises";
import { v4 } from "uuid";

// export async function GET(request: Request) {
//   const rest = new Ably.Rest({ key: process.env.ABLY_API_KEY });
//   const tokenParams = { clientId: v4() };
//   const requestToken = await rest.auth.createTokenRequest(tokenParams);

//   return Response.json(requestToken);
// }
