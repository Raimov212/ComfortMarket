import React from "react";
import { NavLink } from "react-router-dom";
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

const Sidebar = () => {
  return (
    <div className="flex-initial w-[239px] bg-white h-full flex flex-col items-center">
      <div className="flex-[1] flex flex-col items-center gap-4 mt-4">
        <div className="w-24 h-24 bg-blue-300 rounded-full "></div>
        <label className="text-secondary">Welcome, Wahyu Fatur</label>
      </div>
      <div className="flex-[2.8] flex flex-col justify-self-start w-full">
        <NavLink
          to="/dashboard"
          className={({ isActive }: any) =>
            isActive
              ? "text-secondary bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in-out "
              : "text-secondary flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <DashboardIcons />
          Dashboard
        </NavLink>
        <NavLink
          to="/sells"
          className={({ isActive }: any) =>
            isActive
              ? "text-secondary bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-secondary  flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <SellsIcons />
          Sells
        </NavLink>
        <NavLink
          to="/clients"
          className={({ isActive }: any) =>
            isActive
              ? "text-secondary bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-secondary flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <ClientsIcons />
          Clients
        </NavLink>
        <NavLink
          to="/goods"
          className={({ isActive }: any) =>
            isActive
              ? "text-secondary bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-secondary flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <GoodsIcons />
          Goods
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }: any) =>
            isActive
              ? "text-secondary bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-secondary flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <CategoriesIcons />
          Categories
        </NavLink>
        <NavLink
          to="/management"
          className={({ isActive }: any) =>
            isActive
              ? "text-secondary bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-secondary flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <ManagementIcons />
          Shop management
        </NavLink>
        <NavLink
          to="/reviews"
          className={({ isActive }: any) =>
            isActive
              ? "text-secondary bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-secondary flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <ReviewsIcons />
          Reviews
        </NavLink>
        <NavLink
          to="/employee"
          className={({ isActive }: any) =>
            isActive
              ? "text-secondary bg-one flex gap-4 w-full pl-8 h-12 items-center transition ease-in"
              : "text-secondary flex gap-4 w-full pl-8 h-12 items-center "
          }
        >
          <EmployeeIcons />
          Employees
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
