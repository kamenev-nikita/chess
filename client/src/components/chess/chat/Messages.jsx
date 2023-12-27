/* eslint-disable react/prop-types */

import Message from "./Message";

const Messages = ({ messages }) => {
  return (
    <div className="messages">
      {messages.map((mes, index) => {
        return <Message key={index} mes={mes} />;
      })}
    </div>
  );
};

export default Messages;
