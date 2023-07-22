export interface IMessage {
  id: string;
  send_date: string;
  user_id: number;
  message: string;
  user_name: string;
  is_admin: boolean;
}

export interface ISendMessage {
  message: string;
  user_name: string;
}
