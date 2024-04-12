import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { DataType } from "../../types/premiseTypes";

const Navbar = () => {
  const [lng, setLng] = useState<string>("uz");
  const [dataPremise, setDataPremise] = useState<DataType[]>([]);
  const [selectPremiseId, setSelectPremiseId] = useState<string>(
    localStorage.getItem("premiseId") &&
      JSON.parse(localStorage.getItem("premiseId") || "")
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();

  localStorage.setItem("category", JSON.stringify(t("category.dashboard")));

  useEffect(() => {
    const storageLanguage = JSON.stringify(lng);
    changeLanguage(lng);
    localStorage.setItem("language", storageLanguage);
  }, [lng, setLng]);

  useEffect(() => {
    const storageSelectPremiseId = JSON.stringify(selectPremiseId);
    localStorage.setItem("premiseId", storageSelectPremiseId);
  }, [selectPremiseId]);

  useEffect(() => {
    const getPremiseData = async () => {
      await api.get("/premise").then(({ data }) => {
        if (JSON.parse(localStorage.getItem("premiseId") || "") === "") {
          let storageData = data.find((item: DataType) => item.type === "SHOP");
          localStorage.setItem("premiseId", JSON.stringify(storageData.id));
        }
        setDataPremise(data);
      });
    };

    getPremiseData();
  }, []);

  const signOut = () => {
    dispatch({ type: "RESET" });
    localStorage.setItem("token", "");
    navigate("/");
  };

  const handleChangePremise = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectPremiseId(e.target.value);
    window.location.reload();
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <p className="text-2xl text-white">{t("logoTitle1")}</p>
            <p className="text-2xl text-secondary">{t("logoTitle2")}</p>
          </a>
        </div>
        <ul className="menu menu-horizontal px-1 flex gap-4 ">
          <li>
            <select
              onChange={handleChangePremise}
              value={selectPremiseId}
              className="select select-bordered w-full "
            >
              {dataPremise?.map((premise) => {
                if (premise.type === "SHOP") {
                  return (
                    <option value={premise.id} key={premise.id}>
                      {premise.name}
                    </option>
                  );
                }
              })}
            </select>
          </li>
          <li>
            <details>
              <summary>Til</summary>
              <ul className="p-2 bg-base-100 rounded-md z-40">
                <li onClick={() => setLng("uz")}>
                  {" "}
                  <a>uzbek</a>
                </li>
                <li onClick={() => setLng("ru")}>
                  <a>russia</a>
                </li>
                <li onClick={() => setLng("en")}>
                  <a>english</a>
                </li>
              </ul>
            </details>
          </li>
          <li className="mr-4">
            <details>
              <summary>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    fill="#A7A8AA"
                    d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"
                  />
                  <path
                    fill="#A7A8AA"
                    d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"
                  />
                </svg>
              </summary>
              <ul className="p-2 bg-base-100 rounded-md z-40 w-28">
                <li>
                  <a>settings</a>
                </li>
                <li>
                  <a onClick={signOut}>Sign out</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
