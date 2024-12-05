// src/app/auth/signin/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/gestion");
    }
  }, [status]);

  const handleSignIn = (providerId: string) => {
    signIn(providerId, { callbackUrl: "/gestion" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
        </div>
        <div className="mt-8">
          <button
            onClick={() => handleSignIn("google")}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Iniciar sesión con Google
          </button>
        </div>
      </div>
    </div>
  );
}
