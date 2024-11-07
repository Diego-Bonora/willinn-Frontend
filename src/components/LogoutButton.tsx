"use client";
import { useSession, signOut } from "next-auth/react";

export const LogoutButton = () => {
  const sessionData = useSession();
  const status = sessionData.status;

  if (status === "loading") {
    return;
  }

  return (
    <>
      <div className="mt-auto p-10">
        <button
          onClick={() => signOut()}
          className="py-2 px-10 bg-purple-600 hover:bg-purple-700 text-white text-3xl font-medium rounded-md transition-colors duration-200"
        >
          Salir
        </button>
      </div>
    </>
  );
};
