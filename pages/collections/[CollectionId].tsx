import { useRouter } from "next/router";
import React from "react";

const Collection = () => {
  const router = useRouter();
  console.log(router.query.CollectionId);

  return <div>[CollectionId]</div>;
};

export default Collection;
