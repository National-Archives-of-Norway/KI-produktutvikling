"use client";
import { accentTint, fieldBorderOpacity, portalEffects } from "@/theme/effects";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendRounded from "@mui/icons-material/SendRounded";
import type { FormEventHandler } from "react";
import { useRef } from "react";
import { QUESTION_LIMIT } from "../contracts";
export function ChatComposer({
  inputId,
  question,
  busy,
  validation,
  hasTurns,
  onSubmit,
  onQuestionChange,
  onClear,
}: {
  inputId: string;
  question: string;
  busy: boolean;
  validation: string;
  hasTurns: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onQuestionChange: (value: string) => void;
  onClear: () => void;
}) {
  const input = useRef<HTMLTextAreaElement>(null);
  return (
    <form className="chat-composer" onSubmit={onSubmit} aria-busy={busy}>
      <TextField
        id={inputId}
        inputRef={input}
        label="Skriv et spørsmål"
        multiline
        minRows={2}
        maxRows={5}
        fullWidth
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        error={Boolean(validation)}
        helperText={
          validation || "Ikke skriv personopplysninger eller internt innhold."
        }
        slotProps={{
          htmlInput: { maxLength: QUESTION_LIMIT, readOnly: busy },
          formHelperText: { role: validation ? "alert" : undefined },
        }}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root.MuiInputBase-root": {
            bgcolor: "background.default",
            borderRadius: "12px",
            "& fieldset": { borderColor: accentTint(fieldBorderOpacity) },
            "&:hover fieldset, &.Mui-focused fieldset": {
              borderColor: "secondary.main",
            },
            "&.Mui-focused": { boxShadow: portalEffects.fieldGlow },
          },
          "& .MuiInputLabel-root": { color: "text.secondary" },
          "& .MuiFormHelperText-root": { fontSize: 12, mx: 0 },
        }}
      />
      <div className="chat-actions">
        <Button
          type="submit"
          variant="contained"
          aria-disabled={busy}
          onClick={(event) => {
            if (busy) event.preventDefault();
          }}
          sx={{ minHeight: 44 }}
          className="chat-send"
          endIcon={<SendRounded />}
        >
          {busy ? "Henter svar …" : "Send spørsmål"}
        </Button>
        {hasTurns && (
          <Button
            disabled={busy}
            onClick={() => {
              input.current?.focus();
              onClear();
            }}
            sx={{ minHeight: 44 }}
          >
            Tøm chat
          </Button>
        )}
      </div>
    </form>
  );
}
