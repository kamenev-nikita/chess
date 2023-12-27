import { useState, useContext, useEffect } from "react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { ChatController } from "./ChatController";
import { AuthContext } from "../../../context";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import "./chat.css";

const Chat = () => {
  const [isShowChat, setIsShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Будьте вежливы!", sender: "server" },
  ]);
  const { socket } = useContext(AuthContext);

  useEffect(() => {
    socket.on("C-get-message", (newMessages) => {
      setMessages(newMessages);
    });
  }, []);
  return (
    <>
      <IoChatboxEllipsesOutline
        className="showChatBut"
        onClick={() => setIsShowChat(!isShowChat)}
      />

      {isShowChat && (
        <div className="chat">
          <Messages messages={messages} />
          <ChatInput
            socket={socket}
            ChatController={ChatController}
            setMessages={setMessages}
            messages={messages}
          />
        </div>
      )}

      <div className="chat-big">
        <Messages messages={messages} />
        <ChatInput
          socket={socket}
          ChatController={ChatController}
          setMessages={setMessages}
          messages={messages}
        />
      </div>
    </>
  );
};

export default Chat;
