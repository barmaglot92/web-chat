import { useCallback, useEffect } from "react";
import { Chat } from "../lib";
import { Header } from "./Header";
import { ChatProps, IUser } from "../lib/components/Chat/types";
import "./App.scss";
import { useStoredData } from "./useStoredData";

const DEFAULT_USER = {
  login: "tomelkor@gmail.com",
  password: "test",
};

const getAccessToken = (
  login: string,
  password: string,
  delayMs = 5000,
): Promise<string> => {
  return fetch("/common-api/api/user/login/", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(
      ({ access_token }) =>
        new Promise((resolve) =>
          setTimeout(() => resolve(access_token), delayMs),
        ),
    );
};

const DEFAULT_CONFIG: ChatProps = {
  apiConfig: {
    wsUrl: "ws://abyrvalg.sexologvasilenko.com:8082/chat/129/ws/",
    apiUrl: "/chat-api",
    token: "",
    chatId: 129,
  },
  messagesHeight: 500,
  onTokenExpire: () => null,
  floodPreventionTimeout: 1500,
  user: { login: "", password: "" },
};

export const App = () => {
  const [config, setConfig] = useStoredData<ChatProps>(
    "storedConfig",
    DEFAULT_CONFIG,
  );

  const [user, setUser] = useStoredData<IUser>("testUser", DEFAULT_USER);

  const [accessToken, setAccessToken] = useStoredData<string>(
    "accessToken",
    "",
  );

  const loginFn = useCallback(
    (loginUser: IUser) =>
      getAccessToken(loginUser.login, loginUser.password)
        .then((access_token: string) => {
          setAccessToken(access_token);
          return access_token;
        })
        .catch((err) => {
          console.error("Problem with invalid token", err);
          setAccessToken("");
          return "";
        }),
    [setAccessToken],
  );

  const setConfigKeyValue = useCallback(
    (key: string, value: unknown) => {
      setConfig((oldVal: ChatProps) => ({
        ...oldVal,
        [key]: value,
      }));
    },
    [setConfig],
  );

  useEffect(() => {
    setConfigKeyValue("onTokenExpire", () => {
      loginFn(user);
    });
  }, [user, loginFn, setConfigKeyValue]);

  useEffect(() => {
    if (!config.apiConfig.token) {
      loginFn(user).then((newToken) => {
        setConfigKeyValue("apiConfig", {
          ...config.apiConfig,
          token: newToken,
        });
      });
    } else if (accessToken !== config.apiConfig.token) {
      setConfigKeyValue("apiConfig", {
        ...config.apiConfig,
        token: accessToken,
      });
    }
  }, [user, loginFn, setConfigKeyValue, config.apiConfig, accessToken]);

  const handleConfigChange = useCallback(
    (changedConfig: ChatProps) => {
      setConfig(changedConfig);
    },
    [setConfig],
  );

  const handleUserChange = useCallback(
    (changedUser: IUser) => {
      setUser(changedUser);
      loginFn(changedUser);
    },
    [setUser, loginFn],
  );

  return (
    <>
      <Header
        config={config}
        onChange={handleConfigChange}
        user={user}
        onUserChange={handleUserChange}
      />
      {config.apiConfig.token ? (
        <Chat
          apiConfig={config.apiConfig}
          onTokenExpire={config.onTokenExpire}
          floodPreventionTimeout={config.floodPreventionTimeout}
          messagesHeight={config.messagesHeight}
          user={user}
        />
      ) : (
        <div>Waiting for access token…</div>
      )}
    </>
  );
};
