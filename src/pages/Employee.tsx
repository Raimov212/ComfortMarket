import { CreateUser, Search } from "../assets/icons1/TableIcon";
import EmployeeItem from "../components/Employee";

const Employee = () => {
  return (
    <div className="flex flex-col items-center gap-2 w-[97%] h-[640px] bg-white m-4 ">
      <div className="border-b-2 border-one w-[98%] mt-2 text-2xl text-one">
        List Admin
      </div>
      <div className="flex mt-2 w-[98%] justify-between">
        <div className="flex items-center relative border-2 border-one rounded-md">
          <div className="absolute ml-2 text-lg">
            <Search />
          </div>
          <input
            type="text"
            placeholder="Search here"
            className="pl-8 w-80 h-8 pr-4 outline-none"
          />
        </div>
        <div className="flex items-center gap-4 rounded-md bg-buttonColor p-3">
          <CreateUser />
          <div className="text-white">New Employees </div>
        </div>
      </div>
      <EmployeeItem />
    </div>
  );
};

export default Employee;
