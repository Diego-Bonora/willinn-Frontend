import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";
import { authOptions } from "@/utils/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-2">
        <h1 className="text-5xl">usuario</h1>
        <span>{JSON.stringify(session.user)}</span>
        <hr />
        <LogoutButton />
      </div>
    </>
  );
}
