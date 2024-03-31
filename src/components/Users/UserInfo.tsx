import { useEffect, useState } from "react";
import api from "../../api";
import type { UserTypes } from "../../types/userTypes";
import { useDispatch } from "react-redux";
import { userDataPremises, userDataWorkers } from "../../redux/userSlice";

const UserInfo = () => {
  const [userData, setUserData] = useState<UserTypes>();
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    try {
      const resp = await api.get("/users/info");
      if (resp.status === 200) {
        setUserData(resp.data);
        dispatch(userDataPremises(resp.data.premises));
        dispatch(userDataWorkers(resp.data.workers));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div className="stats shadow  w-48">
        <div className="stat">
          <div className="stat-title">{userData?.role}</div>
          <div className="stat-value">{userData?.fullName}</div>
          <div className="stat-desc ">{userData?.phoneNumber}</div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
