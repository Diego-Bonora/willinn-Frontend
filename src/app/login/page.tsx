"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace("/");
    }
  }, [session, status, router]);

  // Show loading or nothing while checking session
  if (status === "loading") {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales invalidas");
      } else {
        router.push("/"); // Redirect to dashboard after successful login
        router.refresh();
      }
    } catch {
      setError("Ocurrio un error durante el inicio de secion");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Image
          src="/WillinnLogo.svg"
          width={150}
          height={150}
          alt={`Logo`}
          className="mb-10"
        />
        <div className="max-w-2xl max-h-md w-full space-y-8 p-10 bg-white rounded-lg shadow">
          <h2 className="text-center text-3xl font-loginText font-500 font-poppins">
            Inicia sesión
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-24 font-loginText font-poppins"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Introduce tu email"
                  required
                  className="block w-full text-lg font-poppins h-14 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-24 font-loginText font-poppins"
                >
                  Contraseña
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Introduce tu contraseña"
                    required
                    className="block w-full text-lg font-poppins h-14 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-400 hover:text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-7 w-7" />
                    ) : (
                      <Eye className="h-7 w-7" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-2xl font-poppins text-white bg-willinnPink hover:bg-willinnPinkHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Cargando..." : "Ingresar"}
            </button>
            <Link
              href={"#"}
              className="flex justify-end mt-2 text-forgotPassword font-poppins"
            >
              Olvidastes la contraseña?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
