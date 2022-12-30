import { useRouter } from "next/router";
import React from "react";

const Stats = () => {
  const router = useRouter();
  console.log(router.query);
  return <div>Stats</div>;
};

export default Stats;
