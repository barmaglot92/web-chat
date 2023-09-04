import { ChatProps, IUser } from "../lib/components/Chat/types";
export interface IHeaderProps {
  config: ChatProps;
  onChange: (newConfig: ChatProps) => void;
  onUserChange: (user: IUser) => void;
  user: IUser;
}
