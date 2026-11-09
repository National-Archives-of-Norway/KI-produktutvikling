"use client";
import Link from "next/link";
import { catalogContent } from "@/content/catalog";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  const links = [
    {
      href: "/kom-i-gang/",
      label: "Kom i gang",
      active: pathname.replace(/\/$/, "") === "/kom-i-gang",
    },
    {
      href: "/retningslinjer/",
      label: "Retningslinjer",
      active: pathname.replace(/\/$/, "") === "/retningslinjer",
    },
    {
      href: "/#ressurser",
      label: catalogContent.title,
      active: pathname === "/" || pathname.startsWith("/ressurser"),
    },
    {
      href: "/oversikt/",
      label: "Oversikt",
      active:
        ["/oversikt", "/priser"].includes(pathname.replace(/\/$/, "")) ||
        pathname.startsWith("/oversikt/"),
    },
    {
      href: "/spor/",
      label: "Spør KI",
      active: pathname.replace(/\/$/, "") === "/spor",
    },
    {
      href: "/om/",
      label: "Om",
      active: pathname.replace(/\/$/, "") === "/om",
    },
  ];
  return (
    <nav aria-label="Hovedmeny">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={
            link.active
              ? pathname.startsWith("/ressurser") ||
                pathname.replace(/\/$/, "") === "/priser" ||
                (pathname.replace(/\/$/, "") !== "/oversikt" &&
                  pathname.startsWith("/oversikt/"))
                ? "location"
                : "page"
              : undefined
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
