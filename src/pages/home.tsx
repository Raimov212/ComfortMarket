import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Suspense, lazy } from "react";
import { Loading } from "../components/Suspense";
import Layout from "../components/Layout.tsx";

const Dashboard = lazy(() => import("./Dashboard.tsx"));
const Sells = lazy(() => import("./Sells.tsx"));
const Clients = lazy(() => import("./Clients.tsx"));
const Goods = lazy(() => import("./Goods.tsx"));
const Categories = lazy(() => import("./Categories.tsx"));
const Management = lazy(() => import("./Management.tsx"));
const Reviews = lazy(() => import("./Reviews.tsx"));
const Employee = lazy(() => import("./Employee.tsx"));

const Home = () => {
  return (
    <div>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1  h-full">
            <Layout>
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Dashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="/sells"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Sells />
                    </Suspense>
                  }
                />
                <Route
                  path="/clients"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Clients />
                    </Suspense>
                  }
                />
                <Route
                  path="/goods"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Goods />
                    </Suspense>
                  }
                />
                <Route
                  path="/categories"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Categories />
                    </Suspense>
                  }
                />
                <Route
                  path="/management"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Management />
                    </Suspense>
                  }
                />
                <Route
                  path="/reviews"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Reviews />
                    </Suspense>
                  }
                />
                <Route
                  path="/employee"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Employee />
                    </Suspense>
                  }
                />
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Dashboard />
                    </Suspense>
                  }
                />
              </Routes>
            </Layout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
