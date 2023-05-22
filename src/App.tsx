import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "./components/Suspense";
import "./App.css";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="/auth">
          <Route
            path="login"
            index
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
