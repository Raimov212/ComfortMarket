import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="m-4 p-4 bg-blue-400"
        onClick={() => navigate("/auth/login")}
      >
        LoginPage
      </button>
      <button
        className="m-4 p-4 bg-blue-400"
        onClick={() => navigate("/auth/register")}
      >
        Register
      </button>
    </div>
  );
};

export default Home;
