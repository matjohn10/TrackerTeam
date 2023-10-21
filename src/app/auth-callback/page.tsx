"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader } from "lucide-react";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, error, isLoading, isFetched } = trpc.authCallback.useQuery();

  useEffect(() => {
    if (error) {
      if (error.data?.code === "UNAUTHORIZED") {
        router.push("/api/auth/register");
      }
    }
    if (data?.success) router.push(origin ? `/${origin}` : "/dashboard");
  }, [isLoading]);

  return (
    isLoading &&
    !isFetched && (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold text-xl">Setting up account....</h3>
          <p>You will be redirected in a short moment.</p>
          <Loader className="h-10 w-10 animate-spin text-2xl" />
        </div>
      </div>
    )
  );
};

export default Page;
