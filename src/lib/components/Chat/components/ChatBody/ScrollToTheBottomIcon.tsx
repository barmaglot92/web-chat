import { clsx } from "clsx";
import "./ScrollToTheBottomIcon.scss";

interface ScrollDownIconProps {
  isBottom: boolean;
  onScrollToTheBottom: () => void;
}

export const ScrollToTheBottomIcon = ({
  isBottom,
  onScrollToTheBottom,
}: ScrollDownIconProps) => (
  <svg
    className={clsx(
      "scrollToTheBottom",
      !isBottom && "scrollToTheBottom--visible",
    )}
    onClick={onScrollToTheBottom}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Перейти к новым сообщениям"
  >
    <title>Перейти к новым сообщениям</title>
    <path d="M20.587 14.613 18 17.246V9.98A1.979 1.979 0 0 0 16.02 8h-.04A1.979 1.979 0 0 0 14 9.98v6.963l-.26-.042-2.248-2.227a2.091 2.091 0 0 0-2.657-.293A1.973 1.973 0 0 0 8.58 17.4l6.074 6.016a2.017 2.017 0 0 0 2.833 0l5.934-6a1.97 1.97 0 0 0 0-2.806 2.016 2.016 0 0 0-2.834.003Z" />
    <path d="M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0Zm0 28a12 12 0 1 1 12-12 12.013 12.013 0 0 1-12 12Z" />
  </svg>
);
