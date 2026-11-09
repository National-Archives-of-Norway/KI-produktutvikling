// Felles designverdier for både MUI sx og portalens CSS-variabler.
export const portalColors = {
  background: "#09151b",
  surface: "#102129",
  buttonHighlight: "#c4f8cd",
  launcherStart: "#19332c",
  launcherEnd: "#0b1c21",
  launcherHover: "#204235",
} as const;
export const fieldBorderOpacity = 0.6;
export const accentTint = (opacity: number) =>
  `color-mix(in srgb, var(--accent) ${opacity * 100}%, transparent)`;
export const portalEffects = {
  fieldGlow: `0 0 18px ${accentTint(0.07)}`,
  launcherGlow: `0 4px 32px ${accentTint(0.2)}`,
  dialogShadow: `0 24px 100px #0009, 0 0 40px ${accentTint(0.08)}`,
};
