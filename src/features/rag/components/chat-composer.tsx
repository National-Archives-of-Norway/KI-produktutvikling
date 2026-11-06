"use client";
import { accentTint, portalEffects } from "@/theme/effects";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendRounded from "@mui/icons-material/SendRounded";
import type { FormEventHandler } from "react";
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
  return (
    <form className="chat-composer" onSubmit={onSubmit}>
      <TextField
        id={inputId}
        label="Skriv et spørsmål"
        multiline
        minRows={2}
        maxRows={5}
        fullWidth
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        disabled={busy}
        error={Boolean(validation)}
        helperText={
          validation || "Ikke skriv personopplysninger eller internt innhold."
        }
        slotProps={{ htmlInput: { maxLength: QUESTION_LIMIT } }}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root.MuiInputBase-root": {
            bgcolor: "background.default",
            borderRadius: "12px",
            "& fieldset": { borderColor: `${accentTint(0.25)}` },
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
          disabled={busy || question.trim().length < 3}
          sx={{ minHeight: 44 }}
          className="chat-send"
          endIcon={<SendRounded />}
        >
          {busy ? "Henter svar …" : "Send spørsmål"}
        </Button>
        {hasTurns && (
          <Button disabled={busy} onClick={onClear} sx={{ minHeight: 44 }}>
            Tøm chat
          </Button>
        )}
      </div>
    </form>
  );
}
