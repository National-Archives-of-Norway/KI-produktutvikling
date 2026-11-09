"use client";
import Link from "next/link";
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
      label: "Verktøykatalog",
      active: pathname === "/" || pathname.startsWith("/ressurser"),
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
              ? pathname.startsWith("/ressurser")
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
