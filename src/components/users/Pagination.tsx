import { User } from "@/utils/api";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface UserListProps {
  users: User[];
  currentPage: number;
  itemsPerPage: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

export const Pagination = ({
  users,
  currentPage,
  itemsPerPage,
  handlePreviousPage,
  handleNextPage,
}: UserListProps) => {
  return (
    <div className="flex justify-between items-center mt-5 mx-auto min-w-[60%]">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 text-willinnPink rounded disabled:bg-gray-300"
      >
        <div className="flex">
          <ChevronLeftIcon color="#F72793" />
          Anterior
        </div>
      </button>
      <span className="text-willinnPink">
        Pagina {currentPage} De {Math.ceil(users.length / itemsPerPage)}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
        className="px-4 py-2 text-willinnPink rounded disabled:bg-gray-300"
      >
        <div className="flex">
          Siguiente
          <ChevronRightIcon color="#F72793" />
        </div>
      </button>
    </div>
  );
};
