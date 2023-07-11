import React, { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  UserSvg,
  EyeSvg,
  LockSvg,
  PhoneSvg,
} from "../../assets/icons/RegisterSvgIcons";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { userStatus } from "../../redux/userSlice";

interface FormItem {
  fullName: string;
  userName: string;
  password: string;
}

interface ShowPassword {
  password: boolean;
  confirmPassword: boolean;
}

interface ModalProps {
  success: boolean;
  error: boolean;
}

const Register = () => {
  //Errors
  const [error, setError] = useState<string | null>("");

  const dispatch = useDispatch();

  //LANGUAGE
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    changeLanguage(language);
    localStorage.setItem("language", JSON.stringify(language));
  };

  //CREATE FORM
  const [showPassword, setShowPassword] = useState<ShowPassword>({
    password: false,
    confirmPassword: false,
  });

  const [alreadyUserName, setAlreadyUserName] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [formData, setFormData] = useState<FormItem>({
    fullName: "",
    userName: "",
    password: "",
  });

  // const [action] = useState<string>("signup")

  const [showAlert, setShowAlert] = useState<ModalProps>({
    success: false,
    error: false,
  });

  const navigate = useNavigate();

  const handleForm = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    if (formData.fullName === "") {
      return setError(t("signUpError.fullNameError"));
    } else if (formData.userName === "") {
      return setError(t("signUpError.phoneNumberError"));
    } else if (formData.userName.length < 13) {
      return setError(t("signUpError.phoneNumberLengthError"));
    } else if (formData.password === "") {
      return setError(t("signUpError.passwordError"));
    } else if (confirmPassword === "") {
      return setError(t("signUpError.confirmPassword"));
    } else if (formData.password !== confirmPassword) {
      return setError(t("signUpError.confirmPasswordCorrectPasswordError"));
    }

    const params = {
      userName: formData.userName,
      password: formData.password,
      action: "signup",
    };

    const response: AxiosResponse = await axios.post(
      "../php/checkLogin.php",
      params
    );

    console.log("chekLogin", response);

    if (response.data === 3) {
      setAlreadyUserName(!alreadyUserName);
      setError(t("signUp.alreadyUser"));
    } else {
      try {
        const response: AxiosResponse = await axios.post(
          "../php/userAddToBase.php",
          formData
        );

        dispatch(userStatus(response.data[1]));

        setFormData({
          ...formData,
          fullName: "",
          userName: "+998",
          password: "",
        });

        setShowAlert({ ...showAlert, success: !showAlert.success });

        setError("");
        navigate("/register/createShop");
        console.log("CreateUser", response);
      } catch (error) {
        setShowAlert({ ...showAlert, error: !showAlert.error });
        console.log(error);
      }

      console.log(formData);
    }
  };

  console.log("alreadyUserName", alreadyUserName);

  return (
    <div className="w-full h-full flex flex-col items-center mt-28 ">
      <div className="flex p-2">
        <p className="text-[#6945FF] font-bold text-3xl">{t("logoTitle1")}</p>
        <p className="text-[#FF6B55] font-bold text-3xl">{t("logoTitle2")}</p>
      </div>
      <div className="bg-white w-[460px] h-[450px] flex justify-center rounded-md">
        <div className="flex flex-col gap-8 w-full h-full">
          <div className="flex justify-end pt-6 pr-6 gap-2">
            <p
              className="text-sm font-semibold text-two cursor-pointer"
              onClick={() => navigate("/")}
            >
              {t("signUp.member")}
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
            {t("signUp.signUp")}
          </p>
          {showAlert.error ? (
            <div
              className="bg-red-100 border ml-1 border-red-400 w-[450px] pl-4 text-red-700 bottom-40 left-auto rounded absolute"
              role="alert"
            >
              <strong className="font-bold">
                {t("signUp.errorLogin.title")}
              </strong>
              <span className="block sm:inline">
                {t("signUp.errorLogin.span")}
              </span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3 transition ease-in-out">
                <svg
                  className="fill-current h-6 w-6 text-red-500 "
                  role="button"
                  viewBox="0 0 20 20"
                  onClick={() =>
                    setShowAlert({ ...showAlert, error: !showAlert.error })
                  }
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          ) : null}
          {showAlert.success ? (
            <div
              className="bg-teal-100 flex items-center border-t-4 w-[450px] h-12 pl-4 ml-1 border-teal-500 rounded-b text-teal-900 bottom-40 left-auto rounded absolute shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-teal-500 mr-4"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">{t("signUp.success.title")}</p>
                </div>
              </div>
            </div>
          ) : null}
          <form
            className="flex flex-col items-center gap-4 "
            onSubmit={handleForm}
          >
            <div className="w-full flex ml-10 ">
              <div className="absolute mt-2 ml-2">
                <UserSvg />
              </div>
              <input
                type="text"
                name="fullName"
                className="w-[90%] border-b-2 outline-none pl-10 pb-2 text-base font-normal h-10"
                placeholder={t("signUp.inputFullName") as string}
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
            <div className="w-full flex ml-10 ">
              <div className="absolute mt-2 ml-2">
                <PhoneSvg />
              </div>
              <input
                type="tel"
                name="userName"
                pattern="[\+][0-9]{12}"
                className={`w-[90%] border-b-2 outline-none pl-10 pb-2 text-base font-normal h-10 ${
                  alreadyUserName ? "text-red-500" : "text-black"
                }`}
                placeholder={t("signUp.inputNumber") as string}
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
                type={showPassword.password ? "text" : "password"}
                name="password"
                autoComplete="on"
                className="w-[90%] border-b-2 outline-none pl-10 pb-2 text-base font-normal h-10"
                placeholder={t("signUp.inputPassword") as string}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <div
                className="cursor-pointer absolute ml-96 mt-2 hover:translate-y-[1px] transition"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
              >
                <EyeSvg />
              </div>
            </div>
            <div className="w-full flex ml-10 ">
              <div className="absolute mt-2 ml-2">
                <LockSvg />
              </div>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="password"
                autoComplete="on"
                className="w-[90%] border-b-2 outline-none pl-10 pb-2 text-base font-normal h-10"
                placeholder={t("signUp.inputConfirmPassword") as string}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="cursor-pointer absolute ml-96 mt-2 hover:translate-y-[1px] transition"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
              >
                <EyeSvg />
              </div>
            </div>
            <p className="text-red-700">{error}</p>
            <button
              type="submit"
              className="w-[90%] h-10 text-md text-white rounded-sm bg-secondary "
            >
              {t("signUp.sign")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
