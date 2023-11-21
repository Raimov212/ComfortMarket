import { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { LockSvg, PhoneSvg, EyeSvg } from "../../assets/icons1/LoginSvgIcons";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch } from "../../hook";
import { goodsData } from "../../redux/todoSlice";
import { userData } from "../../redux/userSlice";
import { getGoodsApi } from "../../api/goodsApi";
import { ToastContainer, toast } from "react-toastify";

type FormItem = {
  userName: string;
  password: string;
};

const Login = () => {
  //Errors

  //LANGUAGE
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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //CREATE FORM
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [formData, setFormData] = useState<FormItem>({
    userName: "",
    password: "",
  });

  const handleForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    navigate("/home");

    if (formData.userName.length < 12) {
      return toast.error(t("signUpError.phoneNumberLengthError"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (formData.userName === "") {
      return toast.error(t("signUpError.phoneNumberError"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (formData.password === "") {
      return toast.error(t("signUpError.passwordError"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    }

    try {
      const response: AxiosResponse = await getGoodsApi.post(
        "/checkLoginPassword.php",
        formData
      );

      console.log("checklogin Response", response);

      // console.log("response", response);
      // console.log("formData", formData);

      const userId: string = response.data[0].userId;

      const goods: AxiosResponse = await getGoodsApi.post("/goods.php", {
        userId: userId,
      });

      dispatch(userData(response.data));
      dispatch(goodsData(goods.data));

      console.log("goods", goods);

      if (response.data.length) {
        navigate("/home/goods");
      } else {
        return toast.error(t("errorLogin"), {
          position: toast.POSITION.TOP_RIGHT,
          className: "foo-bar",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        toast.error(t("errorLogin"), {
          position: toast.POSITION.TOP_RIGHT,
          className: "foo-bar",
        });
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  };
  //Modal

  return (
    <div className="w-full h-full flex flex-col items-center mt-28 ">
      <div className="flex p-2">
        <p className="text-[#6945FF] font-bold text-3xl">{t("logoTitle1")}</p>
        <p className="text-[#FF6B55] font-bold text-3xl">{t("logoTitle2")}</p>
      </div>
      <div className="bg-white w-[460px] h-[350px] flex justify-center rounded-md">
        <div className="flex flex-col gap-8 w-full h-full">
          <div className="flex justify-end pt-6 pr-6 gap-2">
            <p
              className="text-sm font-semibold text-two cursor-pointer"
              onClick={() => navigate("/register/user")}
            >
              {t("loginIn.createAccount")}
            </p>
            <select
              defaultValue={language}
              className="text-sm font-semibold outline-none text-three cursor-pointer "
              onChange={handleChangeLanguage}
            >
              <option value="uz">uz</option>
              <option value="ru">ru</option>
              <option value="en">en</option>
            </select>
          </div>
          <p className="text-one font-semibold text-center">
            {t("loginIn.loginIn")}
          </p>
          <form
            className="flex flex-col items-center gap-4 "
            onSubmit={handleForm}
          >
            <div className="w-full flex ml-10 ">
              <div className="absolute mt-2 ml-2">
                <PhoneSvg />
              </div>
              <input
                type="tel"
                name="userName"
                className="w-[90%] border-b-2 outline-none pl-10 pb-2 text-base font-normal h-10"
                placeholder={t("loginIn.inputNumber") as string}
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
              />
            </div>
            <div className="w-full flex ml-10 ">
              <div className="absolute mt-2 ml-2">
                <LockSvg />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="on"
                className="w-[90%] border-b-2 outline-none pl-10 pb-2 text-base font-normal h-10"
                placeholder={t("loginIn.inputPassword") as string}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <div
                className="cursor-pointer absolute ml-96 mt-2 hover:translate-y-[1px] transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                <EyeSvg />
              </div>
            </div>
            <button
              type="submit"
              className="w-[90%] h-10 text-md text-white rounded-sm bg-secondary mt-8"
            >
              {t("loginIn.login")}
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
