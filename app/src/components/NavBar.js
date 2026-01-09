import { useNavigate } from "react-router-dom";

function NavBar({ transparent = true }) {
  const navigate = useNavigate();
  const bgStyle = transparent 
    ? { backgroundColor: "transparent" }
    : { 
        backgroundColor: "rgba(255, 255, 255, 0.1)"
      };

  return (
    <nav role="navigation" className="relative z-50">
      <div
        className="flex justify-start items-center p-6 text-white"
        style={bgStyle}
      >
        <ul className="flex space-x-8">
          <li
            className="text-lg font-normal transition-all duration-200 hover:opacity-75 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;