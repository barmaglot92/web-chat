import { ChangeEvent, useCallback } from "react";
import "./Header.scss";
import { IHeaderProps } from "./types";

export const Header = ({ onUserChange, user }: IHeaderProps) => {
  const handleUserDataChange = useCallback(
    (key: "login" | "password", evt: ChangeEvent<HTMLInputElement>) => {
      user[key] = evt.target.value || "";
    },
    [user],
  );

  const handleUserChange = () => {
    onUserChange(user);
  };

  return (
    <header>
      <h1>Dev mode</h1>
      <div className="settings">
        <label>
          Login
          <input
            type="text"
            defaultValue={user.login}
            onChange={(evt: ChangeEvent<HTMLInputElement>) =>
              handleUserDataChange("login", evt)
            }
          />
        </label>

        <label>
          Pass
          <input
            type="text"
            defaultValue={user.password}
            onChange={(evt: ChangeEvent<HTMLInputElement>) =>
              handleUserDataChange("password", evt)
            }
          />
        </label>

        <button onClick={handleUserChange}>Change user</button>
      </div>
    </header>
  );
};
