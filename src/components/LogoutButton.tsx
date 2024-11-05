"use client";
import { useSession, signOut } from "next-auth/react";

export const LogoutButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <h1>Cargando, no te apures</h1>;
  }

  return (
    <>
      <div>
        <button onClick={() => signOut()}>SingOut {session?.user?.name}</button>
      </div>
    </>
  );
};
