import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { trpc } from "../_trpc/client";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, isLoading } = trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        // User is sync to DB
        router.push(origin ? `/${origin}` : "/dashboard");
      } else {
        router.push(origin ? `/${origin}` : "/");
      }
    },
  });
};

export default Page;
