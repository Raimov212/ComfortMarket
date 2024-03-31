import React, { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  UserSvg,
  EyeSvg,
  LockSvg,
  PhoneSvg,
} from "../../assets/icons1/RegisterSvgIcons";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { userStatus } from "../../redux/userSlice";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";

interface FormItem {
  fullName: string;
  username: string;
  phoneNumber: string;
  password: string;
  role: string;
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

  const [alreadyUserName] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [formData, setFormData] = useState<FormItem>({
    fullName: "",
    username: "",
    phoneNumber: "",
    password: "",
    role: "ADMIN",
  });

  // const [action] = useState<string>("signup")

  const [showAlert, setShowAlert] = useState<ModalProps>({
    success: false,
    error: false,
  });

  const navigate = useNavigate();

  const handleForm = async (
    e: SyntheticEvent
  ): Promise<string[] | string | number | undefined> => {
    //return qilish kerak
    e.preventDefault();

    console.log("formData", formData);
    if (formData.fullName === "") {
      return toast.error(t("signUpError.fullNameError"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (formData.username === "") {
      return toast.error(t("signUpError.userNameError"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (formData.phoneNumber === "") {
      return toast.error(t("signUpError.phoneNumberError"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (formData.phoneNumber.length < 13) {
      return toast.error(t("signUpError.phoneNumberLengthError"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (formData.password === "") {
      return toast.error(t("signUpError.passwordError"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (confirmPassword === "") {
      return toast.error(t("signUpError.confirmPassword"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (formData.password !== confirmPassword) {
      return toast.error(t("signUpError.confirmPasswordCorrectPasswordError"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    }

    const params = {
      fullName: formData.fullName,
      username: formData.username,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      role: formData.role,
      action: "signup",
    };

    try {
      const response: AxiosResponse<any> = await api.post(
        "/auth/register",
        params
      );

      if (response.status === 200) {
        setShowAlert({ ...showAlert, success: !showAlert.success });

        setFormData({
          ...formData,
          fullName: "",
          username: "",
          phoneNumber: "+998",
          password: "",
        });

        navigate("/");
      }
      if (response.status === 403) {
        setShowAlert({ ...showAlert, error: !showAlert.error });
      }

      console.log("resp", response);
    } catch (error: any) {
      if (error.response.status === 403) {
        toast.error(t("signUp.alreadyUser"), {
          position: toast.POSITION.TOP_RIGHT,
          className: "foo-bar",
        });
      } else {
        setShowAlert({ ...showAlert, error: !showAlert.error });
      }
      console.log("err", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center mt-16 ">
      <div className="flex p-2">
        <p className="text-[#6945FF] font-bold text-3xl">{t("logoTitle1")}</p>
        <p className="text-[#FF6B55] font-bold text-3xl">{t("logoTitle2")}</p>
      </div>
      <div className="bg-white w-[460px] h-[520px] flex justify-center rounded-md">
        <div className="flex flex-col gap-4 w-full h-full">
          <div className="flex justify-end pt-6 pr-6 gap-2">
            <p
              className="text-sm font-semibold text-two cursor-pointer"
              onClick={() => navigate("/")}
            >
              {t("signUp.member")}
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
            {t("signUp.signUp")}
          </p>
          {showAlert.error ? (
            <div
              className="bg-red-100 border ml-1 border-red-400 w-[450px] h-14 pl-4
               text-red-700 bottom-40 right-10 rounded absolute top-10 shadow-md"
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
              className="bg-teal-100 flex items-center border-t-4 w-[450px] h-12 pl-4 
              ml-1 border-teal-500 rounded-b text-teal-900 bottom-40
               right-10 rounded absolute top-10 shadow-md"
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
            className="flex flex-col h-[300px] items-center gap-4 "
            onSubmit={handleForm}
          >
            <label className="input w-5/6 input-bordered flex items-center gap-2">
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
                name="fullName"
                className="grow min-h-[40px]"
                placeholder={t("signUp.inputFullName") as string}
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </label>
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

            <label className="input w-5/6 input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.67962 1.76482L2.73734 1.70711C3.12786 1.31658 3.76103 1.31658 4.15155 1.70711L7.18178 4.73734C7.57231 5.12786 7.57231 5.76103 7.18178 6.15155L5.96861 7.36473C5.78829 7.54504 5.74359 7.82051 5.85763 8.04859C7.17614 10.6856 9.31438 12.8239 11.9514 14.1424C12.1795 14.2564 12.455 14.2117 12.6353 14.0314L13.8484 12.8182C14.239 12.4277 14.8721 12.4277 15.2627 12.8182L18.2929 15.8484C18.6834 16.239 18.6834 16.8721 18.2929 17.2627L18.2352 17.3204C16.1238 19.4317 12.7813 19.6693 10.3925 17.8777L8.29524 16.3048C6.55171 14.9971 5.00289 13.4483 3.69524 11.7048L2.12226 9.60746C0.330722 7.21874 0.56827 3.87617 2.67962 1.76482Z" />
              </svg>
              <input
                type="text"
                name="phoneNumber"
                className="grow min-h-[40px]"
                placeholder={t("signUp.inputNumber") as string}
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
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
                type={showPassword.password ? "text" : "password"}
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
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
              >
                <EyeSvg />
              </div>
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
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="on"
                className="grow min-h-[40px]"
                placeholder={t("signUp.inputConfirmPassword") as string}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="cursor-pointer bg-white rounded-full hover:translate-y-[1px] transition"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
              >
                <EyeSvg />
              </div>
            </label>
            <select
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, role: e.target.value }))
              }
              className="select select-bordered w-5/6 "
            >
              <option value="ADMIN">ADMIN</option>
              <option value="OWNER">OWNER</option>
              <option value="WORKER">WORKER</option>
            </select>
            <button
              type="submit"
              className="w-5/6 min-h-[40px] text-md text-white rounded-md bg-secondary "
            >
              {t("signUp.sign")}
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
