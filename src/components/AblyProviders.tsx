"use client";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import api from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AblyProviders = ({ children }: Props) => {
  const client = new Ably.Realtime.Promise({
    authUrl: api.baseURL + "/api/ably/auth",
  });
  return <AblyProvider client={client}>{children}</AblyProvider>;
};

export default AblyProviders;
