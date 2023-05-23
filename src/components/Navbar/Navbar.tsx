import { AccountIcons } from "../../assets/IconsSVG";

const Navbar = () => {
  return (
    <div className="flex w-full h-[55px] bg-primary">
      <div className="flex-[2] justify-between items-center flex pl-4">
        <div className="flex font-medium">
          <p className="text-2xl text-white">COMFORT</p>
          <p className="text-logoColor ml-1">MARKET</p>
        </div>
        <p className="text-white">Employee managament</p>
      </div>
      <AccountIcons />
    </div>
  );
};

export default Navbar;
