"use client";

import { useChannel } from "ably/react";

import { trpc } from "../_trpc/client";

const Testing = () => {
  // const [test, setTest] = useState<string[]>([]);
  const { channel } = useChannel("connected");
  const mutate = trpc.test.useMutation();
  // const testdiv = test.map((item) => <p>{item}</p>);
  return (
    <div>
      <button
        onClick={() => {
          mutate.mutate({ userId: "kp_a583c652a4d0476b9338c1f7eb9377bc" });
        }}
      >
        Press
      </button>
    </div>
  );
};

export default Testing;
