import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { TrashCanIcon, EditIcon } from "@/const/Const";
import { EllipsisIcon, SearchIcon } from "lucide-react";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
}

const getUsers = async (token: string): Promise<User[]> => {
  try {
    const users = await fetch(`https://uat.zonamerica.com:5009/users`, {
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.json());

    return users;
  } catch {
    console.log("hubo un error al traer los usuarios");
    return [];
  }
};

export const UserTable = async () => {
  const session = await getServerSession(authOptions);

  const users = session?.accessToken ? await getUsers(session.accessToken) : [];

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 max-w-screen-sm">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead>
            <tr>
              <th colSpan={3} className="p-5">
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-tableHeaderText text-2xl">Usuarios</h1>
                  <div className="relative flex items-center mt-1 rounded-2xl bg-[#F5F7FA] h-12">
                    <input
                      type="text"
                      placeholder="Buscar"
                      className="ml-10 p-2 rounded-2xl bg-[#F5F7FA] text-[#718EBF] placeholder:text-[#718EBF] text-md focus:outline-none "
                    />
                    <button className="absolute inset-y-0 flex items-center px-2 ml-1 text-[#718EBF] hover:text-gray-600">
                      <SearchIcon color="#718EBF" />
                    </button>
                  </div>
                </div>
              </th>
            </tr>
            <tr className="divide-y divide-gray-100 border-t border-gray-100">
              <th
                scope="col"
                className="px-6 py-4 text-lg text-tableHeaderText"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-lg text-tableHeaderText"
              >
                Correo
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users.map((user) => (
              <tr key={user.email} className="hover:bg-gray-50">
                <td className=" py-4 px-6 w-1/2">
                  <div className="text-md text-tableContentText">
                    {user.name}
                  </div>
                </td>

                <td className="py-4 px-6 text-md text-tableContentText w-1/2">
                  <span>{user.email}</span>
                </td>

                <td className="py-4 px-6 flex justify-end items-center space-x-2 group h-[70px] w-[120px]">
                  <div className="hidden group-hover:flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100   transition">
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="h-7 w-7 hover:text-willinnPink"
                      >
                        <path d={TrashCanIcon} />
                      </svg>
                    </button>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="h-7 w-7 hover:text-willinnPink"
                      >
                        <path d={EditIcon} />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100  group-hover:hidden">
                    <EllipsisIcon color="black" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
