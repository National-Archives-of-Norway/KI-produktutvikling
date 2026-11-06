"use client";
import { accentTint } from "@/theme/effects";
import Link from "next/link";
import Button from "@mui/material/Button";

export function PortalButton({
  href,
  children,
  variant = "outlined",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "contained" | "outlined";
}) {
  return (
    <Button
      component={Link}
      href={href}
      variant={variant}
      size="large"
      sx={{
        borderRadius: "10px",
        px: 3,
        gap: 2,
        minHeight: 48,
        textTransform: "none",
        flexShrink: 0,
        borderColor: `${accentTint(0.35)}`,
        background: `linear-gradient(135deg, ${accentTint(0.07)}, ${accentTint(0.01)})`,
        transition: "box-shadow 180ms ease, border-color 180ms ease",
        "&:hover": {
          borderColor: "secondary.main",
          boxShadow: `0 0 24px ${accentTint(0.1)}`,
        },
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        ...(variant === "contained" && {
          bgcolor: "secondary.main",
          background:
            "linear-gradient(120deg, var(--button-highlight), var(--mui-palette-secondary-main))",
          boxShadow: `0 4px 24px ${accentTint(0.12)}`,
          color: "text.primaryInvert",
          "&:hover": {
            bgcolor: "secondary.main",
            color: "text.primaryInvert",
            boxShadow: `0 6px 32px ${accentTint(0.25)}`,
          },
        }),
      }}
    >
      {children}
    </Button>
  );
}
