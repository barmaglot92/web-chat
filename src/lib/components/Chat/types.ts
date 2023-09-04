export interface IUser {
  login: string;
  password: string;
}

export type ChatApiConfig = {
  wsUrl: string;
  apiUrl: string;
  token: string;
  chatId: number;
};

export type ChatProps = {
  apiConfig: ChatApiConfig;
  onTokenExpire: () => void;
  messagesHeight?: number;
  floodPreventionTimeout: number;
  user: IUser;
};

export interface IChatInput {
  limit?: number;
  disabled?: boolean;
  onSend: (message: string) => void;
}
