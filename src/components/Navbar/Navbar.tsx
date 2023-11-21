import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hook";
import { useDispatch } from "react-redux";
import { userData, userStatus } from "../../redux/userSlice";
import { goodsData } from "../../redux/todoSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state);
  // console.log(JSON.parse(localStorage.getItem("category") || ""));

  const dispatch = useDispatch();

  //language
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    const storageLanguage = JSON.stringify(language);
    changeLanguage(language);
    localStorage.setItem("language", storageLanguage);
  };

  const handleCLosePage = () => {
    navigate("/");
  };

  localStorage.setItem("category", JSON.stringify(t("category.dashboard")));

  return (
    <div className="flex w-full h-[40px] bg-primary items-center">
      <div className="flex-[2] justify-between items-center flex pl-4">
        <div className="flex font-medium">
          <p className="text-2xl text-white">{t("logoTitle1")}</p>
          <p className="text-2xl text-secondary">{t("logoTitle2")}</p>
        </div>
        <p className="text-white">
          {JSON.parse(localStorage.getItem("category") || "")}
        </p>
      </div>
      <div className="flex-[3] flex justify-end mr-4 gap-2 items-center">
        <div
          className="w-6 h-6 rounded-full border-2 cursor-pointer"
          onClick={handleCLosePage}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M16.4392 17.0399C16.0593 15.9767 15.2224 15.0373 14.0581 14.3672C12.8938 13.6972 11.4672 13.334 9.99968 13.334C8.53211 13.334 7.10556 13.6972 5.94127 14.3672C4.77697 15.0373 3.94 15.9767 3.56017 17.0399"
              stroke="white"
            />
            <circle cx="10.0003" cy="6.66732" r="3.33333" stroke="white" />
          </svg>
        </div>
        {/* <button className="p-2 bg-blue-400" onClick={() => navigate("/")}>
          LoginPage
        </button> */}
        {/* <button
          className="p-2 bg-blue-400"
          onClick={() => navigate("/auth/register")}
        >
          Register
        </button> */}
        <select
          defaultValue={language}
          className="text-sm font-semibold outline-none  w-9 h-8 text-tertiary cursor-pointer bg-primary text-white"
          onChange={handleChangeLanguage}
        >
          <option value="uz">uz</option>
          <option value="ru">ru</option>
          <option value="en">en</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
