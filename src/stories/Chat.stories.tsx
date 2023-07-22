import type { Meta, StoryObj } from "@storybook/react";

import { Chat } from "../lib";
import React, { useEffect, useState } from "react";
import { ChatProps } from "../lib/components/Chat/types";

const storedToken = localStorage.getItem("chat_access_token") || "";

const meta: Meta<typeof Chat> = {
  component: Chat,
  decorators: [
    (Story, { args }) => {
      const [token, setToken] = useState<string>(storedToken);

      useEffect(() => {
        const loginFn = async () => {
          const res = await fetch("/api/user/login/", {
            method: "POST",
            body: JSON.stringify({
              login: "tomelkor@gmail.com",
              password: "test",
            }),
            headers: {
              "Content-type": "application/json",
            },
          });

          const { access_token } = await res.json();

          await new Promise((r) => setInterval(r, 5000));

          setToken(access_token);

          localStorage.setItem("chat_access_token", access_token);
        };

        if (!token) {
          loginFn();
        }
      }, [token]);

      const props = {
        ...args,
        apiConfig: { ...args.apiConfig, token },
      } as ChatProps;

      return token ? (
        <Story args={props} />
      ) : (
        <div>waiting for access token</div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Chat>;

export const Default: Story = {
  args: {
    apiConfig: {
      wsUrl: "ws://abyrvalg.sexologvasilenko.com:8082/chat/22/ws/",
      apiUrl: "/api",
      chatId: 22,
    },
  } as ChatProps,
};
