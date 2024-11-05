import { SidebarMenuItem } from "./SidebarMenuItem";
import { homeIconPath, userIconPath } from "@/const/Const";
import Image from "next/image";

const menuItems = [
  {
    path: "/dashboard/main",
    icon: homeIconPath,
    title: "Inicio",
  },
  {
    path: "/dashboard/users",
    icon: userIconPath,
    title: "Usuarios",
  },
];

export const Sidebar = () => {
  return (
    <div
      style={{ width: "400px" }}
      className="bg-white min-h-screen z-10 text-slate-300 w-64 left-0 flex flex-col items-center align-middle"
    >
      <div className="flex justify-center p-10">
        <Image src="/WillinnLogo.svg" width={200} height={200} alt={`Logo`} />
      </div>

      <div className="w-fit flex flex-col items-start">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.path} {...item} />
        ))}
      </div>
    </div>
  );
};
