import React, { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
// import { UserSvg, PhoneSvg } from "../../assets/icons/RegisterSvgIcons";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useAppSelector } from "../../hook";
// import { ShopRegisterIcon } from "../../assets/icons/ShopRegister";
// import { useSelector } from "react-redux";

interface FormItem {
  pUserId: number;
  typeId: number;
  shopName: string;
  address: string;
}

interface ModalProps {
  success: boolean;
  error: boolean;
}

const CreateShop = () => {
  const idUser = useAppSelector((state) => state.rootReducer);
  // console.log("idUser", idUser);

  //Errors
  const [error, setError] = useState<string | null>("");

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

  const [formData, setFormData] = useState<FormItem>({
    pUserId: Number(idUser),
    typeId: 1,
    shopName: "",
    address: "",
  });

  const [showAlert, setShowAlert] = useState<ModalProps>({
    success: false,
    error: false,
  });

  const navigate = useNavigate();

  const handleForm = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    if (formData.shopName === "") {
      return setError(t("signUpError.fullNameError"));
    } else if (formData.address === "") {
      return setError(t("signUpError.phoneNumberError"));
    }

    try {
      const response: AxiosResponse = await axios.post(
        "../php/shopAddToBase.php",
        formData
      );

      console.log("createShop", response);

      setFormData({
        ...formData,
        pUserId: Number(idUser),
        typeId: 1,
        shopName: "",
        address: "",
      });

      setError("");
      navigate("/");

      setShowAlert({ ...showAlert, success: !showAlert.success });
    } catch (error) {
      setShowAlert({ ...showAlert, error: !showAlert.error });
      console.log(error);
    }

    console.log("formData", formData);
  };

  return (
    <div className="w-full h-full flex flex-col items-center mt-28 ">
      <div className="flex p-2">
        <p className="text-[#6945FF] font-bold text-3xl">{t("logoTitle1")}</p>
        <p className="text-[#FF6B55] font-bold text-3xl">{t("logoTitle2")}</p>
      </div>
      <div className="bg-white w-[460px] h-[350px] flex justify-center rounded-md">
        <div className="flex flex-col gap-8 w-full h-full">
          <div className="flex justify-end pt-6 pr-6 gap-2">
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
            {t("createShop.title")}
          </p>
          {showAlert.error ? (
            <div
              className="bg-red-100 border ml-1 border-red-400 w-[450px] pl-4 text-red-700 bottom-40 left-auto rounded absolute"
              role="alert"
            >
              <strong className="font-bold">
                {t("loginIn.errorLogin.title")}
              </strong>
              <span className="block sm:inline">
                {t("loginIn.errorLogin.span")}
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
                  <p className="font-bold">{t("loginIn.success.title")}</p>
                </div>
              </div>
            </div>
          ) : null}
          <form
            className="flex flex-col items-center gap-4 "
            onSubmit={handleForm}
          >
            <div className="w-full flex ml-10 ">
              {/* <div className="absolute mt-2 ml-2">
                <ShopRegisterIcon />
              </div> */}
              <input
                type="text"
                name="shopName"
                className="w-[90%] border-b-2 outline-none pl-4 pb-2 text-base font-normal h-10"
                placeholder={t("createShop.shopName") as string}
                value={formData.shopName}
                onChange={(e) =>
                  setFormData({ ...formData, shopName: e.target.value })
                }
              />
            </div>
            <div className="w-full flex ml-10 ">
              {/* <div className="absolute mt-2 ml-2">
                <PhoneSvg />
              </div> */}
              <input
                type="tel"
                name="address"
                className="w-[90%] border-b-2 outline-none pl-4 pb-2 text-base font-normal h-10"
                placeholder={t("createShop.address") as string}
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <p className="text-red-700">{error}</p>
            <button
              type="submit"
              className="w-[90%] h-10 text-md text-white rounded-sm bg-secondary "
            >
              {t("goods.createPremise.createButton")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateShop;
