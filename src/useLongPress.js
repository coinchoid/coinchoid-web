import { useState } from "react";

export const useLongPress = callback => {
  const [buttonPressTimer, setButtonPressTimer] = useState(null);
  const onTouchStart = () => setButtonPressTimer(setTimeout(callback, 1500));
  const onTouchEnd = () => clearTimeout(buttonPressTimer);

  return {
    onTouchStart,
    onTouchEnd
  };
};
