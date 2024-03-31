import { CreateUser, Search } from "../assets/icons1/TableIcon";
import UserPremises from "../components/Employee/UserPremises";
import UserWorkers from "../components/Employee/UserWorkers";

const Employee = () => {
  return (
    <div className="flex flex-col items-center gap-2 w-[98%] p-4 h-[640px] bg-white m-2 ">
      <div className="flex mt-2 w-full justify-between">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button className="btn">
          <CreateUser />
          <div className="">New Employees </div>
        </button>
      </div>
      <div className="flex justify-center w-full mt-10 lg:flex-row">
        <UserPremises />
        <div className="divider divider-neutral divider-horizontal"></div>
        <UserWorkers />
      </div>
    </div>
  );
};

export default Employee;
