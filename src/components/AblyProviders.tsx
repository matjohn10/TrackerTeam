"use client";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import api from "@/lib/utils";

const AblyProviders = () => {
  const client = new Ably.Realtime.Promise({
    authUrl: api.baseURL + "/api/ably/auth",
  });
  return <AblyProvider client={client}></AblyProvider>;
};

export default AblyProviders;
