import { clsx } from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import "./ChatInput.scss";
import { IChatInput } from "../../types";

export const ChatInput = ({
  limit = 250,
  onSend,
  disabled = false,
  ...rest
}: IChatInput) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [msgText, setMsgText] = useState<string>("");

  useEffect(() => {
    // automatic textarea height adjustment
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [msgText]);

  const handleSend = useCallback(() => {
    if (!msgText.length) {
      return;
    }
    onSend(msgText);
    setMsgText("");
  }, [msgText, onSend]);

  // visible when chars length is > 80% of limit
  const counterVisible =
    msgText.length > 0 && (1 / (limit / msgText.length)) * 100 > 80;

  const setInputValue = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = evt.target.value;
      if (val.length <= limit) {
        setMsgText(val);
      }
    },
    [setMsgText, limit],
  );

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <div className="ChatInput">
      <div
        className={clsx(
          "ChatInput__counter",
          counterVisible && "ChatInput__counter--visible",
        )}
      >
        {msgText.length} / {limit}
      </div>
      <textarea
        placeholder="Введите сообщение…"
        className="ChatInput__textarea"
        disabled={disabled}
        ref={textareaRef}
        {...rest}
        value={msgText}
        onChange={setInputValue}
        onKeyDown={handleKeyPress}
      />
      <button
        className="ChatInput__submit"
        onClick={handleSend}
        disabled={disabled}
      >
        Отправить
      </button>
    </div>
  );
};
