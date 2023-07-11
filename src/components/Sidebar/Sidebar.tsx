import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  CategoriesIcons,
  ClientsIcons,
  DashboardIcons,
  EmployeeIcons,
  GoodsIcons,
  ManagementIcons,
  ReviewsIcons,
  SellsIcons,
} from "../../assets/icons/IconsSVG";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hook";

const Sidebar = () => {
  const { t } = useTranslation();
  const [statusText, setStatusText] = useState<string>("");

  const { pathname } = useLocation();

  const user = useAppSelector((state) => state.user);
  const userData = user.userData[0].fullName;
  const status = user.userData[0].status;
  const userLocation = user.userLocation[0].shopName;

  const slicePathname = pathname.slice(1);

  useEffect(() => {
    switch (status) {
      case "1":
        setStatusText(`${t("statusUser.1")}`);
        break;
      case "2":
        setStatusText(`${t("statusUser.2")}`);
        break;
      case "3":
        setStatusText(`${t("statusUser.3")}`);
        break;
      case "4":
        setStatusText(`${t("statusUser.4")}`);
        break;
    }
  }, [status]);

  useEffect(() => {
    switch (slicePathname) {
      case "employee":
        localStorage.setItem(
          "category",
          JSON.stringify(t("category.employee"))
        );
        break;
      case "sells":
        localStorage.setItem("category", JSON.stringify(t("category.sells")));
        break;
      case "clients":
        localStorage.setItem("category", JSON.stringify(t("category.clients")));
        break;
      case "goods":
        localStorage.setItem("category", JSON.stringify(t("category.goods")));
        break;
      case "categories":
        localStorage.setItem(
          "category",
          JSON.stringify(t("category.categories"))
        );
        break;
      case "management":
        localStorage.setItem(
          "category",
          JSON.stringify(t("category.management"))
        );
        break;
      case "reviews":
        localStorage.setItem("category", JSON.stringify(t("category.reviews")));
        break;
      default:
        localStorage.setItem(
          "category",
          JSON.stringify(t("category.dashboard"))
        );
        break;
    }
  }, [slicePathname]);

  return (
    <div className="flex-initial w-[239px] bg-white h-full flex flex-col items-center">
      <div className="flex flex-col items-center mt-4">
        <div className="w-24 h-24 bg-blue-300 rounded-full "></div>
        <label className="text-two font-bold">{statusText}</label>
        <label className="text-two font-medium">{userData}</label>
        <label className="text-three font-normal">{userLocation}</label>
      </div>
      <div className="flex-[2.8] flex flex-col justify-self-start w-full">
        <NavLink
          to="/home/dashboard"
          className={({ isActive }: any) =>
            isActive
              ? "text-two bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in-out "
              : "text-two flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <DashboardIcons />
          {t("category.dashboard")}
        </NavLink>
        <NavLink
          to="/home/sells"
          className={({ isActive }: any) =>
            isActive
              ? "text-two bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-two  flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <SellsIcons />
          {t("category.sells")}
        </NavLink>
        <NavLink
          to="/home/clients"
          className={({ isActive }: any) =>
            isActive
              ? "text-two bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-two flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <ClientsIcons />
          {t("category.clients")}
        </NavLink>
        <NavLink
          to="/home/goods"
          className={({ isActive }: any) =>
            isActive
              ? "text-two bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-two flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <GoodsIcons />
          {t("category.goods")}
        </NavLink>
        <NavLink
          to="/home/categories"
          className={({ isActive }: any) =>
            isActive
              ? "text-two bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-two flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <CategoriesIcons />
          {t("category.categories")}
        </NavLink>
        <NavLink
          to="/home/management"
          className={({ isActive }: any) =>
            isActive
              ? "text-two bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-two flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <ManagementIcons />
          {t("category.management")}
        </NavLink>
        <NavLink
          to="/home/reviews"
          className={({ isActive }: any) =>
            isActive
              ? "text-two bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-two flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <ReviewsIcons />
          {t("category.reviews")}
        </NavLink>
        <NavLink
          to="/home/employee"
          className={({ isActive }: any) =>
            isActive
              ? "text-two bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-two flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <EmployeeIcons />
          {t("category.employee")}
        </NavLink>
      </div>
      <div className="mt-auto pb-2"></div>
    </div>
  );
};

export default Sidebar;
