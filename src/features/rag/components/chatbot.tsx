"use client";
import { accentTint, portalEffects } from "@/theme/effects";

import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseRounded from "@mui/icons-material/CloseRounded";
import ChatBubbleOutlineRounded from "@mui/icons-material/ChatBubbleOutlineRounded";
import { RagAssistant } from "./rag-assistant";
import { LogoMark } from "@/components/logo-mark";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="chat-launcher"
        variant="contained"
        startIcon={<ChatBubbleOutlineRounded />}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          right: { xs: 16, sm: 24 },
          bottom: { xs: 16, sm: 24 },
          zIndex: 1200,
          borderRadius: "16px",
          px: 3,
          minHeight: 52,
          boxShadow: portalEffects.launcherGlow,
        }}
      >
        Spør KI
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        keepMounted
        aria-labelledby="chatbot-title"
        maxWidth={false}
        scroll="paper"
        sx={{
          "& .MuiDialog-container": {
            alignItems: "flex-end",
            justifyContent: "flex-end",
          },
          "& .MuiDialog-paper": {
            m: { xs: 1, sm: 3 },
            width: { xs: "calc(100% - 16px)", sm: 460 },
            maxWidth: "100%",
            maxHeight: "calc(100dvh - 32px)",
            height: 700,
            borderRadius: "20px",
            border: "none",
            backgroundImage: "none",
            bgcolor: "background.default",
            boxShadow: portalEffects.dialogShadow,
          },
        }}
      >
        <DialogTitle
          id="chatbot-header"
          component="div"
          className="chat-header"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            p: 2.5,
          }}
        >
          <div className="chat-identity">
            <LogoMark />
            <div>
              <span className="chat-eyebrow">KI-PRODUKTUTVIKLING</span>
              <h2 id="chatbot-title">Spør kunnskapsbasen</h2>
              <span className="chat-header-note">
                Svar med kilder · under utprøving
              </span>
            </div>
          </div>
          <IconButton
            aria-label="Lukk chat"
            onClick={() => setOpen(false)}
            sx={{
              minWidth: 44,
              minHeight: 44,
              color: "secondary.main",
              bgcolor: `${accentTint(0.05)}`,
            }}
          >
            <CloseRounded />
          </IconButton>
        </DialogTitle>
        <DialogContent
          className="chat-body"
          sx={{ p: 2.5, "&:first-of-type": { pt: 2.5 } }}
        >
          <RagAssistant compact />
        </DialogContent>
      </Dialog>
    </>
  );
}
