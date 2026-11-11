"use client";
import { accentTint, fieldBorderOpacity, portalEffects } from "@/theme/effects";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendRounded from "@mui/icons-material/SendRounded";
import type { FormEventHandler } from "react";
import { useRef, useState } from "react";
import { QUESTION_LIMIT } from "../contracts";
import { prepareQuestionInput, questionInputFeedback } from "../question-input";
export function ChatComposer({
  inputId,
  question,
  busy,
  validation,
  hasTurns,
  onSubmit,
  onQuestionChange,
  onClear,
  onCancel,
}: {
  inputId: string;
  question: string;
  busy: boolean;
  validation: string;
  hasTurns: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onQuestionChange: (value: string) => void;
  onClear: () => void;
  onCancel: () => void;
}) {
  const input = useRef<HTMLTextAreaElement>(null);
  const composing = useRef(false);
  const [wasTruncated, setWasTruncated] = useState(false);
  function change(value: string) {
    const edit = prepareQuestionInput(value);
    setWasTruncated(edit.truncated);
    onQuestionChange(edit.value);
  }
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
        onChange={(e) =>
          composing.current
            ? onQuestionChange(e.target.value)
            : change(e.target.value)
        }
        error={Boolean(validation)}
        helperText={
          <>
            {validation ? (
              <span role="alert">{validation}</span>
            ) : (
              `Ikke skriv personopplysninger eller internt innhold. Maks ${QUESTION_LIMIT} tegn.`
            )}
            <span
              className="chat-input-feedback"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {questionInputFeedback(question, wasTruncated)}
            </span>
          </>
        }
        slotProps={{
          // HTML maxLength teller UTF-16, ikke grafemer. Grensen håndheves
          // kontrollert ved onChange og etter avsluttet IME-komposisjon.
          htmlInput: {
            readOnly: busy,
            onCompositionStart: () => {
              composing.current = true;
            },
            onCompositionEnd: () => {
              composing.current = false;
              if (input.current) change(input.current.value);
            },
          },
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
          disabled={busy}
          sx={{ minHeight: 44 }}
          className="chat-send"
          endIcon={<SendRounded />}
        >
          Send spørsmål
        </Button>
        {busy && (
          <Button
            type="button"
            onClick={() => {
              onCancel();
              input.current?.focus();
            }}
            sx={{ minHeight: 44 }}
          >
            Avbryt
          </Button>
        )}
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
