class _ChatController {
  sendHandler(e, setMessages, messages, newMessageText, setNewMessage, socket) {
    if (e.key === "Enter" && newMessageText) {
      const sender = JSON.parse(localStorage.getItem("user")).mail;
      const newMessage = { text: newMessageText, sender: sender };
      const newMessages = [...messages, newMessage];

      socket.emit("S-get-message", newMessages);
      setMessages(newMessages);
      setNewMessage("");
    }
  }
}

export const ChatController = new _ChatController();
