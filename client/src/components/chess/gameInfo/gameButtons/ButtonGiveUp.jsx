import { FaRegFlag } from "react-icons/fa6";
import { useState, useContext } from "react";
import { AuthContext } from "../../../../context";

const ButtonGiveUp = () => {
  const [isGiveUp, setIsGiveUp] = useState(false);
  const { setIsMat } = useContext(AuthContext);

  const clickHandler = () => {
    if (isGiveUp) {
      console.log("!");
      setIsMat(true);
      // отправить на сервер инфу о проигрыше
    }
    {
      setIsGiveUp(true);
      setTimeout(() => {
        setIsGiveUp(false);
      }, 1500);
    }
  };

  return (
    <div className="buttonGiveUp">
      {isGiveUp ? (
        <>
          <FaRegFlag
            title="Подтвердить"
            className="button gameButton active"
            onClick={() => clickHandler()}
          />
        </>
      ) : (
        <FaRegFlag
          title="Сдаться"
          className="button gameButton"
          onClick={() => clickHandler()}
        />
      )}
    </div>
  );
};

export default ButtonGiveUp;
