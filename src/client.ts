// src/client.ts
import { createThirdwebClient } from "thirdweb";

const clientID = process.env.REACT_APP_TW_CLIENT_ID;
if (!clientID) {
  throw new Error("Missing TW_CLIENT_ID environment variable");
}

const client = createThirdwebClient({
  clientId: clientID,
});

export default client;
