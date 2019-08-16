import { useState } from "react";

export const useLongPress = callback => {
  const [buttonPressTimer, setButtonPressTimer] = useState(null);
  const onTouchStart = value =>
    setButtonPressTimer(setTimeout(() => callback(value), 1500));
  const onTouchEnd = () => clearTimeout(buttonPressTimer);

  return {
    onTouchStart,
    onTouchEnd
  };
};
