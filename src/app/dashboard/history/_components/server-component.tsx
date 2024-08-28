// components/ServerComponent.tsx
import React from "react";

import ClientComponent from "./client-component";
import { fetchUserData } from "../user";

const ServerComponent = async () => {
  const dbUser = await fetchUserData();
  console.log(dbUser);
  if (!dbUser) {
    return <div>No user data found</div>;
  }

  return <ClientComponent dbUser={dbUser} />;
};

export default ServerComponent;
