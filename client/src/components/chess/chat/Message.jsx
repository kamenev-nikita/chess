/* eslint-disable react/prop-types */

const Message = ({ mes }) => {
  const mesSender = mes.sender;
  const userMail = JSON.parse(localStorage.getItem("user")).mail;

  return (
    <div className="messageWrap">
      {mesSender === "server" ? (
        <p className="message serverMessage">{mes.text}</p>
      ) : (
        <>
          {mesSender === userMail ? (
            <p className="message meMessage">{mes.text}</p>
          ) : (
            <p className="message opponentMessage">{mes.text}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Message;
