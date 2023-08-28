import { ChatApiConfig } from "../../types";
import { IMessage, ISendMessage } from "./types";
import { v4 } from "uuid";

export class ChatService {
  private ws?: WebSocket;

  private apiConfig?: ChatApiConfig;
  private onMessage?: (message: IMessage) => void;

  init = ({
    onMessage,
    apiConfig,
  }: {
    onMessage: ChatService["onMessage"];
    apiConfig: ChatApiConfig;
  }) => {
    this.apiConfig = apiConfig;
    this.onMessage = onMessage;

    return this;
  };

  public getMessageHistory = (chatId: number): Promise<IMessage[]> => {
    return fetch(`${this.apiConfig!.apiUrl}/chat/${chatId}/get_history/`, {
      headers: { "X-JWT": `Bearer ${this.apiConfig?.token}` },
    }).then((res) =>
      res
        .json()
        .then((res: { messages: IMessage[] }) =>
          res.messages.map(this.transformMessage),
        ),
    );
  };

  private transformMessage = (message: IMessage) => {
    return { ...message, id: v4() };
  };

  private handleMessage = (event: MessageEvent<string>) => {
    this.onMessage?.(this.transformMessage(JSON.parse(event.data)));
  };

  sendMessage = (msg: ISendMessage) => {
    this.ws?.send(JSON.stringify(msg));
  };

  connect = () => {
    if (!this.apiConfig?.wsUrl) {
      throw Error("no url");
    }

    this.ws = new WebSocket(
      `${this.apiConfig?.wsUrl}?token=Bearer ${this.apiConfig?.token}`,
    );

    // this.ws.addEventListener('open', openHandler)

    if (this.onMessage) {
      this.ws.addEventListener("message", this.handleMessage);
    }

    this.ws.addEventListener("close", this.reconnect);
  };

  public disconnect = () => {
    this.ws?.close();
    this.ws = undefined;
  };

  private reconnect = (err: CloseEvent) => {
    console.log("reconnect", err);
    // if (err) unexpectedly - reconnect
    // setTimeout(this.connect, 300)
  };
}
