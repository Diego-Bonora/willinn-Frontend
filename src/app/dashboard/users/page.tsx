import { UserTable } from "@/components";

export default function UsersPage() {
  return (
    <div className="p-5 ">
      <h1 className="text-5xl text-tableHeaderText">Usuarios</h1>
      <div>
        <UserTable />
      </div>
    </div>
  );
}
