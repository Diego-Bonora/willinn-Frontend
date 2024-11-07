/* eslint-disable */
"use client";

import { User, getUsers } from "@/utils/api";
import { AddUser, EditUser, Pagination, UserTable } from "..";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export const UserContainer = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [editUserInfo, setEditUserInfo] = useState<User | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const fetchUsers = async () => {
    if (session?.accessToken) {
      try {
        setIsLoading(true);
        const response = await getUsers(session.accessToken);

        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [session?.accessToken]);

  const handleEditUserState = (user: User) => {
    if (user) {
      setEditUserInfo(user);
      setIsEditing(true);
    }
  };

  return (
    <>
      <div className="flex flex-col mt-2 ">
        <div className="flex min-h-[550px]">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <Loader2 className="w-12 h-12 animate-spin text-willinnPink" />
            </div>
          ) : (
            <UserTable
              token={session?.accessToken ? session.accessToken : ""}
              paginatedUsers={paginatedUsers}
              onRefresh={fetchUsers}
              handleEditUserState={handleEditUserState}
            />
          )}
          {isEditing ? (
            <EditUser
              onRefresh={fetchUsers}
              setIsEditing={setIsEditing}
              editUserInfo={editUserInfo}
            />
          ) : (
            <AddUser onRefresh={fetchUsers} />
          )}
        </div>
        <Pagination
          users={users}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </>
  );
};
