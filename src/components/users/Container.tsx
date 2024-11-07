"use client";

import { User, getUsers } from "@/utils/api";
import { AddUser, EditUser, Pagination, UserTable } from "..";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";

export const UserContainer = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [editUserInfo, setEditUserInfo] = useState<User | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

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

  const handleAuthError = async () => {
    window.alert("Tu sesion a expirado, inicia secion de nuevo.");
    await signOut({ redirect: true, callbackUrl: "/signin" });
  };

  const fetchUsers = useCallback(async () => {
    if (session?.accessToken) {
      try {
        setIsLoading(true);
        const fetchedUsers = await getUsers(session.accessToken);
        setUsers(fetchedUsers);
      } catch (error: unknown) {
        console.error("Error fetching users:", error);

        // Check for 401 status
        if (
          error instanceof Error &&
          "response" in error &&
          (error as { response?: { status?: number } }).response?.status === 401
        ) {
          await handleAuthError();
          return;
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

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
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader2 className="w-12 h-12 animate-spin text-willinnPink" />
        </div>
      ) : (
        <div className="flex flex-col mt-10 ">
          <div className="flex min-h-[650px]">
            <UserTable
              token={session?.accessToken ? session.accessToken : ""}
              paginatedUsers={paginatedUsers}
              onRefresh={fetchUsers}
              handleEditUserState={handleEditUserState}
            />
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
      )}
    </>
  );
};
