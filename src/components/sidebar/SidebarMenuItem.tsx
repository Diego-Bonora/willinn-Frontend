"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface props {
  path: string;
  icon: string;
  title: string;
}

export const SidebarMenuItem = ({ path, icon, title }: props) => {
  const currentPath = usePathname();

  return (
    <>
      <Link
        href={path}
        className={`w-full px-2 inline-flex space-x-2 items-center py-4`}
      >
        <div
          className={`w-8 h-8 mr-5 ${
            currentPath === path ? "text-willinnPink" : "text-gray"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor" // Allows Tailwind color control
            className="w-full h-full"
          >
            <path d={icon} />
          </svg>
        </div>
        <span
          className={`text-2xl font-bold leading-5 ${
            currentPath === path ? "text-willinnPink" : "text-gray"
          }`}
        >
          {title}
        </span>
      </Link>
    </>
  );
};
