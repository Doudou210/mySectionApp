import React, { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const useMessageContext = () => {
    return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
    const [listMessages, setListMessages] = useState([]);

    const addMessage = (message) => {
        setListMessages([...listMessages, message]);
    };

    return (
        <MessageContext.Provider value={{ listMessages, addMessage }}>
        {children}
        </MessageContext.Provider>
    );
};
