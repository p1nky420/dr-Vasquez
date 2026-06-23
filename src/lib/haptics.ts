export function hapticFeedback() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(8);
  }
}

export function useHapticOnClick() {
  return (e: React.MouseEvent | React.TouchEvent) => {
    hapticFeedback();
  };
}
