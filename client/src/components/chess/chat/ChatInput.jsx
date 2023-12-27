/* eslint-disable react/prop-types */

import { useState } from "react";

const ChatInput = ({ socket, ChatController, setMessages, messages }) => {
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="chatInputDiv">
      <input
        value={newMessage}
        className="input chatInput"
        placeholder="Сообщение"
        title="enter - отправить"
        onInput={(e) => setNewMessage(e.target.value)}
        onKeyUp={(e) =>
          ChatController.sendHandler(
            e,
            setMessages,
            messages,
            newMessage,
            setNewMessage,
            socket
          )
        }
      ></input>
    </div>
  );
};

export default ChatInput;
