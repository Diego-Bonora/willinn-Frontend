import { TrashCanIcon, EditIcon } from "@/const/Const";
import { EllipsisIcon, SearchIcon } from "lucide-react";
import { User, deleteUser } from "@/utils/api";

interface UserListProps {
  token: string;
  paginatedUsers: User[];
  onRefresh: () => void;
  handleEditUserState: (user: User) => void;
}

export const UserTable = ({
  token,
  paginatedUsers,
  onRefresh,
  handleEditUserState,
}: UserListProps) => {
  const handleDelete = async (id: number) => {
    await deleteUser(id, token);
    onRefresh();
  };

  const handleEdit = (user: User) => {
    handleEditUserState(user);
  };

  return (
    <>
      <div className="m-2 w-full flex flex-col min-h-full">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md w-full h-full">
          <table className="w-full table-fixed border-collapse bg-white text-left text-sm text-gray-500">
            <thead>
              <tr>
                <th colSpan={3} className="p-2">
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
                  className="px-6 py-4 max-w-fit text-lg text-tableHeaderText"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-6 py-4  text-lg text-tableHeaderText"
                >
                  Correo
                </th>
                <th
                  scope="col"
                  className="px-6 py-4  text-lg text-tableHeaderText"
                ></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className=" py-4 px-6">
                    <div className="text-md text-tableContentText">
                      {user.name}
                    </div>
                  </td>

                  <td className="py-4 px-6 text-md text-tableContentText">
                    <span>{user.email}</span>
                  </td>

                  <td className="py-4 px-6 flex justify-end items-center space-x-2 group h-[77px] ">
                    <div className="hidden group-hover:flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100   transition">
                      <button onClick={() => handleDelete(user.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="h-7 w-7 hover:text-willinnPink"
                        >
                          <path d={TrashCanIcon} />
                        </svg>
                      </button>
                      <button onClick={() => handleEdit(user)}>
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
      </div>
    </>
  );
};
