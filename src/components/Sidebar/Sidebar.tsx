import { useEffect } from "react";
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
} from "../../assets/IconsSVG";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const slicePathname = pathname.slice(1);

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
      <div className="flex-[1] flex flex-col items-center gap-4 mt-4">
        <div className="w-24 h-24 bg-blue-300 rounded-full "></div>
        <label className="text-two">Welcome, Wahyu Fatur</label>
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
    </div>
  );
};

export default Sidebar;
