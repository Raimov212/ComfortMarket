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
} from "../../assets/icons1/IconsSVG";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hook";

const Sidebar = () => {
  const { t } = useTranslation();
  const [statusText, setStatusText] = useState<string>("");
  const [sidebarScroll, setSidebarScroll] = useState<boolean>(false);

  const { pathname } = useLocation();

  const user = useAppSelector((state) => state.user);
  const userData = user.userData[0]?.fullName;
  const status = user.userData[0]?.status;
  const userLocation = user.userLocation[0]?.premiseName;

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
    <>
      {sidebarScroll ? (
        <div className="w-[70px] bg-white h-full flex flex-col justify-center items-center relative transition-all ease-out">
          <div className="flex flex-col items-center mt-4">
            <div className="w-10 h-10 bg-blue-300 rounded-full "></div>
            <label className="text-two font-bold">{statusText}</label>
            <label className="text-two font-medium">{userData}</label>
            <label className="text-three font-normal">{userLocation}</label>
          </div>
          <div className="flex-[2.8] flex-col w-full mt-4  mr-4">
            <NavLink
              to="/home/dashboard"
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "text-two bg-one flex gap-4 w-12 pl-[14px] rounded-full ml-5 h-12 items-center transition ease-in "
                  : "text-two flex gap-4 w-full pl-8 h-12 items-center  "
              }
            >
              <DashboardIcons />
            </NavLink>
            <NavLink
              to="/home/sells"
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "text-two bg-one flex gap-4 w-12 pl-[14px] rounded-full ml-5 h-12 items-center transition ease-in"
                  : "text-two  flex gap-4 w-full pl-8 h-12 items-center "
              }
            >
              <SellsIcons />
            </NavLink>
            <NavLink
              to="/home/clients"
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "text-two bg-one flex gap-4 w-12 pl-[14px] rounded-full ml-5 h-12 items-center transition ease-in"
                  : "text-two flex gap-4 w-full pl-8 h-12 items-center "
              }
            >
              <ClientsIcons />
            </NavLink>
            <NavLink
              to="/home/goods"
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "text-two bg-one flex gap-4 w-12 pl-[14px] rounded-full ml-5 h-12 items-center transition ease-in"
                  : "text-two flex gap-4 w-full pl-8 h-12 items-center "
              }
            >
              <GoodsIcons />
            </NavLink>
            <NavLink
              to="/home/categories"
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "text-two bg-one flex gap-4 w-12 pl-[14px] rounded-full ml-5 h-12 items-center transition ease-in"
                  : "text-two flex gap-4 w-full pl-8 h-12 items-center "
              }
            >
              <CategoriesIcons />
            </NavLink>
            <NavLink
              to="/home/management"
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "text-two bg-one flex gap-4 w-12 pl-[14px] rounded-full ml-5 h-12 items-center transition ease-in"
                  : "text-two flex gap-4 w-full pl-8 h-12 items-center "
              }
            >
              <ManagementIcons />
            </NavLink>
            <NavLink
              to="/home/reviews"
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "text-two bg-one flex gap-4 w-12 pl-[14px] rounded-full ml-5 h-12 items-center transition ease-in"
                  : "text-two flex gap-4 w-full pl-8 h-12 items-center "
              }
            >
              <ReviewsIcons />
            </NavLink>
            <NavLink
              to="/home/employee"
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "text-two bg-one flex gap-4 w-12 pl-[14px] rounded-full ml-5 h-12 items-center transition ease-in"
                  : "text-two flex gap-4 w-full pl-8 h-12 items-center "
              }
            >
              <EmployeeIcons />
            </NavLink>
          </div>
          <div
            className="mr-[-8px] w-5 h-5 bg-primary rounded-full cursor-pointer absolute top-[50%] right-0"
            onClick={() => setSidebarScroll(!sidebarScroll)}
          ></div>
        </div>
      ) : (
        <div className="flex-initial w-[239px] bg-white h-full  flex-col flex items-center relative transition-all ease-out">
          <div className="flex flex-col items-center mt-4">
            <div className="w-24 h-24 bg-blue-300 rounded-full "></div>
            <label className="text-two font-bold">{statusText}</label>
            <label className="text-two font-medium">{userData}</label>
            <label className="text-three font-normal">{userLocation}</label>
          </div>
          <div className="flex-[2.8] flex flex-col w-full mt-4">
            <NavLink
              to="/home/dashboard"
              className={({ isActive }: { isActive: boolean }) =>
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
              className={({ isActive }: { isActive: boolean }) =>
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
              className={({ isActive }: { isActive: boolean }) =>
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
              className={({ isActive }: { isActive: boolean }) =>
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
              className={({ isActive }: { isActive: boolean }) =>
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
              className={({ isActive }: { isActive: boolean }) =>
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
              className={({ isActive }: { isActive: boolean }) =>
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
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "text-two bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
                  : "text-two flex gap-4 w-full pl-8 h-12 items-center "
              }
            >
              <EmployeeIcons />
              {t("category.employee")}
            </NavLink>
          </div>
          <div
            className="mr-[-8px] w-5 h-5 bg-primary rounded-full cursor-pointer absolute top-[50%] right-0"
            onClick={() => setSidebarScroll(!sidebarScroll)}
          ></div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
