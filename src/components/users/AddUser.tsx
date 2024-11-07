"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { UserData, addUser } from "@/utils/api";
import { useSession } from "next-auth/react";

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  contrasena: string;
  isActive: boolean;
}

interface UserListProps {
  onRefresh: () => void;
}

export const AddUser = ({ onRefresh }: UserListProps) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    isActive: false,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const passwordValidationRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddUser = async () => {
    const userData: UserData = {
      name: `${formData.nombre} ${formData.apellido}`,
      email: formData.email,
      password: formData.contrasena,
      isActive: formData.isActive,
    };
    try {
      if (!session?.accessToken) {
        throw new Error("Unauthorized");
      }

      const response = await addUser(userData, session.accessToken);

      if (!response.ok) {
        await response.json();
        switch (response.status) {
          case 409:
            setErrorMessage("Este email ya esta registrado.");
            break;
          case 400:
            console.log(response);
            setErrorMessage("Informacion invalida.");
            break;
          case 401:
            setErrorMessage("Permiso denegado, intenta mas tarde.");
            break;
          default:
            setErrorMessage("A ocurrido un error, intenta de nuevo.");
        }
      } else {
        const result = await response.json();
        console.log("User added:", result);
        setSuccessMessage("El usuario se creo exitosamente.");
        onRefresh();
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    if (!passwordValidationRegex.test(formData.contrasena)) {
      setErrorMessage(
        "La contraseña tiene que tener al menos 8 caracteres incluyendo al menos una mayuscula, una minuscila, un numero y un caracter especial."
      );
    } else {
      handleAddUser();
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md m-2 min-h-full">
      <h2 className="text-xl font-semibold mb-6">Agregar usuario</h2>

      {errorMessage && (
        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
      )}

      {successMessage && (
        <div className="text-green-500 text-sm mb-4">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-3">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Introduce el nombre"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="apellido"
            className="block text-sm font-medium text-gray-700"
          >
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            placeholder="Introduce el apellido"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Introduce tu E-mail"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="contrasena"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
            placeholder="Introduce tu contraseña"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex items-center  space-x-2">
          <span className="text-sm font-medium text-gray-700">Activar</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white  after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0DC5A3]"></div>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors duration-200"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};
