"use client";
import { accentTint } from "@/theme/effects";
import { useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { resources } from "@/content/resources";

export function Catalog() {
  const [type, setType] = useState("Alle");
  const [query, setQuery] = useState("");
  const visible = resources.filter(
    (r) =>
      (type === "Alle" || r.type === type) &&
      `${r.title} ${r.description}`
        .toLocaleLowerCase("nb")
        .includes(query.toLocaleLowerCase("nb")),
  );
  return (
    <>
      <div className="catalog-controls">
        <div className="search-control">
          <label htmlFor="resource-search">Finn en ressurs</label>
          <TextField
            id="resource-search"
            variant="outlined"
            size="small"
            fullWidth
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Søk etter tema eller oppgave …"
            sx={{
              "& .MuiOutlinedInput-root.MuiInputBase-root": {
                borderRadius: "8px",
                bgcolor: "background.default",
                minHeight: 48,
                "& fieldset": {
                  borderColor: "var(--mui-palette-borders-default)",
                },
                "&:hover fieldset, &.Mui-focused fieldset": {
                  borderColor: "secondary.main",
                },
                "&.Mui-focused": {
                  boxShadow: `0 0 20px ${accentTint(0.08)}`,
                },
              },
              "& input": { fontSize: "16px", color: "text.primary" },
            }}
          />
        </div>
        <div className="filter-control">
          <span className="control-label">Ressurstype</span>
          <div
            className="filters"
            role="group"
            aria-label="Filtrer ressurstype"
          >
            {["Alle", "Skill", "Instruks", "Prompt"].map((t) => (
              <Button
                key={t}
                aria-pressed={type === t}
                variant={type === t ? "contained" : "outlined"}
                sx={{
                  minHeight: 44,
                  textTransform: "none",
                  borderRadius: "10px",
                  ...(type === t && {
                    bgcolor: "secondary.main",
                    color: "text.primaryInvert",
                    "&:hover": {
                      bgcolor: "secondary.main",
                      color: "text.primaryInvert",
                    },
                  }),
                }}
                onClick={() => setType(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <p className="result-count" aria-live="polite">
        {visible.length}{" "}
        {visible.length === 1 ? "eksempelressurs" : "eksempelressurser"}
      </p>
      <div className="cards">
        {visible.map((r) => (
          <Card
            component="article"
            variant="outlined"
            className="resource-card"
            key={r.title}
            sx={{
              p: 3,
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              borderColor: "divider",
              backgroundImage: "none",
            }}
          >
            <Chip
              label={r.type}
              size="small"
              variant="outlined"
              color="secondary"
            />
            <Typography
              component="h3"
              variant="h6"
              sx={{ mt: 3, fontWeight: 600 }}
            >
              {r.title}
            </Typography>
            <p>{r.description}</p>
            <Link
              href={`/ressurser/${r.slug}/`}
              aria-label={`${r.action}: ${r.title}`}
            >
              {r.action} <span aria-hidden="true">↗</span>
            </Link>
          </Card>
        ))}
      </div>
      {visible.length === 0 && (
        <div className="empty-state">
          <h3>Ingen ressurser funnet</h3>
          <p>Prøv et annet søkeord eller vis alle ressurstyper.</p>
          <Button
            onClick={() => {
              setType("Alle");
              setQuery("");
            }}
          >
            Nullstill søk og filtre
          </Button>
        </div>
      )}
    </>
  );
}
