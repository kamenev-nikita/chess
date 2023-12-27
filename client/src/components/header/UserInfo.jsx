import { AiOutlineUser } from "react-icons/ai"; // дефолтная картинка аватара
import { Link } from "react-router-dom";

const UserInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isHaveAvatar = user && user.avatar !== "" && user.avatar;

  return (
    <Link to="/profile">
      <div className="userInfo">
        {isHaveAvatar ? (
          <img className="avatar" src={user.avatar}></img>
        ) : (
          <AiOutlineUser className="avatar" />
        )}
        <span className="nickname">{user.nickname}</span>
      </div>
    </Link>
  );
};

export default UserInfo;
