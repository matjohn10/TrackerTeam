"use client";

import { useChannel } from "ably/react";
import { useState } from "react";

const Testing = () => {
  const [test, setTest] = useState<string[]>([]);
  const { channel } = useChannel("test", (event: any) => {
    console.log(event);
    setTest((prev) => [...prev, event.data]);
  });
  const testdiv = test.map((item) => <p>{item}</p>);
  return (
    <div>
      <button
        onClick={() => {
          channel.publish("testing", "abc");
        }}
      >
        Press
      </button>
      <div className="flex gap-2">{testdiv}</div>
    </div>
  );
};

export default Testing;
