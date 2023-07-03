import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "./components/Suspense";
import Error from "./components/Error/index.tsx";

const Home = lazy(() => import("./pages/home.tsx"));
const Login = lazy(() => import("./components/Authorization/Login.tsx"));
const Register = lazy(() => import("./components/Authorization/Register.tsx"));
//SIDEBAR
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Sells = lazy(() => import("./pages/Sells.tsx"));
const Clients = lazy(() => import("./pages/Clients.tsx"));
const Goods = lazy(() => import("./pages/Goods.tsx"));
const Categories = lazy(() => import("./pages/Categories.tsx"));
const Management = lazy(() => import("./pages/Management.tsx"));
const Reviews = lazy(() => import("./pages/Reviews.tsx"));
const Employee = lazy(() => import("./pages/Employee.tsx"));

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/home"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        >
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="sells"
            element={
              <Suspense fallback={<Loading />}>
                <Sells />
              </Suspense>
            }
          />
          <Route
            path="clients"
            element={
              <Suspense fallback={<Loading />}>
                <Clients />
              </Suspense>
            }
          />
          <Route
            path="goods"
            element={
              <Suspense fallback={<Loading />}>
                <Goods />
              </Suspense>
            }
          />
          z
          <Route
            path="categories"
            element={
              <Suspense fallback={<Loading />}>
                <Categories />
              </Suspense>
            }
          />
          <Route
            path="management"
            element={
              <Suspense fallback={<Loading />}>
                <Management />
              </Suspense>
            }
          />
          <Route
            path="reviews"
            element={
              <Suspense fallback={<Loading />}>
                <Reviews />
              </Suspense>
            }
          />
          <Route
            path="employee"
            element={
              <Suspense fallback={<Loading />}>
                <Employee />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
