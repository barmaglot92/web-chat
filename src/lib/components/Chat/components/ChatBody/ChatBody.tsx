import { useCallback, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { useChatContext } from "../../hooks/useChat";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import "./ChatBody.scss";
import { ScrollToTheBottomIcon } from "./ScrollToTheBottomIcon";

export const ChatBody = ({ height = 500 }) => {
  const { messages } = useChatContext();

  const [listScrolledToTheBottom, setListScrolledToTheBottom] =
    useState<boolean>(false);
  const virtualListRef = useRef<VirtuosoHandle>(null);

  const handleScrollToTheBottom = useCallback(() => {
    virtualListRef?.current &&
      virtualListRef.current.scrollToIndex({
        index: messages.length,
        behavior: "smooth",
      });
  }, [messages.length]);

  return (
    <div className="ChatBody" style={{ height }}>
      <Virtuoso
        style={{ height: height }}
        ref={virtualListRef}
        data={messages}
        itemContent={(_index, item) => (
          <ChatMessage key={item.id} message={item} />
        )}
        initialTopMostItemIndex={messages.length - 1}
        followOutput={"auto"}
        atBottomStateChange={(isBottom) => {
          setListScrolledToTheBottom(isBottom);
        }}
      />
      <ScrollToTheBottomIcon
        isBottom={listScrolledToTheBottom}
        onScrollToTheBottom={handleScrollToTheBottom}
      />
    </div>
  );
};
