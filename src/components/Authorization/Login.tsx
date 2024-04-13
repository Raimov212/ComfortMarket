import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LockSvg, PhoneSvg, EyeSvg } from "../../assets/icons1/LoginSvgIcons";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from "../../hook";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import { getAllGoods } from "../../redux/todoSlice";

type FormItem = {
  username: string;
  password: string;
};

const Login = () => {
  // const { error, isLoading } = useAppSelector((state) => state.goods);
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
    username: "",
    password: "",
  });

  const handleForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (formData.username === "") {
      return toast.error("username bo'sh bo'lishi mumkin emas", {
        position: "top-right",
        className: "foo-bar",
      });
    } else if (formData.password === "") {
      return toast.error(t("signUpError.passwordError"), {
        position: "top-right",
        className: "foo-bar",
      });
    }

    try {
      const response: AxiosResponse = await api.post("/auth/login", formData);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/home/goods");
        toast.success("Xush kelibsiz!", {
          position: "top-right",
          className: "foo-bar",
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast.error(t("errorLogin"), {
          position: "top-right",
          className: "foo-bar",
        });
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
              className="text-sm font-semibold h-[24px] rounded-md outline-none text-three cursor-pointer "
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
            <label className="input  w-5/6 input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                name="username"
                className="grow min-h-[40px]"
                placeholder={t("signUp.inputUserName") as string}
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </label>
            <label className="input input-bordered w-5/6 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="on"
                className="grow min-h-[40px]"
                placeholder={t("signUp.inputPassword") as string}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <div
                className="cursor-pointer bg-white rounded-full hover:translate-y-[1px] transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                <EyeSvg />
              </div>
            </label>
            <button
              type="submit"
              className="w-5/6 min-h-[40px] text-md text-white rounded-md bg-secondary "
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
