import React, { SyntheticEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  UserSvg,
  EyeSvg,
  LockSvg,
  PhoneSvg,
} from "../../assets/RegisterSvgIcons";
import { useNavigate } from "react-router-dom";

interface FormItem {
  fullName: string;
  phoneNumber: string;
  password: string;
}

interface ShowPassword {
  password: boolean;
  confirmPassword: boolean;
}

const Register = () => {
  //Errors
  const [error, setError] = useState<String | null>("");

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

  const [formData, setFormData] = useState<FormItem>({
    fullName: "",
    phoneNumber: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleForm = useCallback(
    (e: SyntheticEvent): void => {
      e.preventDefault();

      if (formData.fullName === "") {
        return setError(t("signUpError.fullNameError"));
      } else if (formData.phoneNumber.length < 13) {
        return setError(t("signUpError.phoneNumberError"));
      } else if (formData.password === "") {
        return setError(t("signUpError.passwordError"));
      } else if (confirmPassword === "") {
        return setError(t("signUpError.confirmPassword"));
      } else if (formData.password !== confirmPassword) {
        return setError(t("signUpError.confirmPasswordCorrectPasswordError"));
      }

      setFormData({
        ...formData,
        fullName: "",
        phoneNumber: "+998",
        password: "",
      });
      setError("");
      navigate("/auth/login");
      console.log(formData);
    },
    [formData]
  );

  return (
    <div className="w-full h-full flex flex-col items-center mt-28 ">
      <div className="flex gap-2 p-2">
        <p className="text-[#6945FF] font-bold text-3xl">{t("logoTitle1")}</p>
        <p className="text-[#FF6B55] font-bold">{t("logoTitle2")}</p>
      </div>
      <div className="bg-white w-[460px] h-[450px] flex justify-center rounded-md">
        <div className="flex flex-col gap-8 w-full h-full">
          <div className="flex justify-end pt-6 pr-6 gap-2">
            <p className="text-sm font-semibold text-primary cursor-pointer">
              {t("signUp.member")}
            </p>
            <select
              defaultValue={language}
              className="text-sm font-semibold outline-none text-tertiary cursor-pointer "
              onChange={handleChangeLanguage}
            >
              <option value="uz">uz</option>
              <option value="ru">ru</option>
              <option value="en">en</option>
            </select>
          </div>
          <p className="text-primary font-semibold text-center">
            {t("signUp.signUp")}
          </p>
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
                name="phoneNumber"
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
                name="phoneNumber"
                pattern="[\+][0-9]{12}"
                className="w-[90%] border-b-2 outline-none pl-10 pb-2 text-base font-normal h-10"
                placeholder={t("signUp.inputNumber") as string}
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
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
                type={confirmPassword ? "text" : "password"}
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