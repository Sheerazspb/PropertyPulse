"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUnreadMsgCount from "@/app/actions/getUnreadMsgCount";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messagesCount, setMessagesCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMsgCount().then((count) => {
        if (count) setMessagesCount(count);
      });
    }
  }, [session, getUnreadMsgCount]);

  return (
    <MessageContext.Provider value={{ messagesCount, setMessagesCount }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessagesContext = () => useContext(MessageContext);
