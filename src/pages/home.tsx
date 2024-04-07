import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1  h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
