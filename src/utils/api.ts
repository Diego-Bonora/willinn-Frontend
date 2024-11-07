export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
}

export const getUsers = async (token: string): Promise<User[]> => {
  try {
    const users = await fetch(`https://uat.zonamerica.com:5009/users`, {
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

export const addUser = async (
  userData: UserData,
  token: string
): Promise<Response> => {
  try {
    const response = await fetch("https://uat.zonamerica.com:5009/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const editUser = async (
  userData: UserData,
  userID: number,
  token: string
): Promise<Response> => {
  try {
    const response = await fetch(
      `https://uat.zonamerica.com:5009/users/${userID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      }
    );

    console.log("------------------");

    console.log(response);

    console.log("------------------");

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteUser = async (
  userID: number,
  token: string
): Promise<Response> => {
  try {
    const response = await fetch(
      `https://uat.zonamerica.com:5009/users/${userID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
