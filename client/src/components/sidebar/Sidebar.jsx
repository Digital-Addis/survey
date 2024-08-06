import { useContext, useEffect, useRef } from "react";
// import { ThemeContext } from "../../context/ThemeContext";
import {
  MdOutlineClose,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineSettings,
} from "react-icons/md";
import { RiSurveyLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { MdSystemUpdateAlt } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
const Sidebar = () => {
  // const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          {/* <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" /> */}
          <Avatar sx={{ bgcolor: "#0364c6" }}>U</Avatar>
          <span className="sidebar-brand-text">User</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <NavLink to="/dashboard" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink to="/dashboard-survey" className="menu-link">
                <span className="menu-link-icon">
                  <RiSurveyLine size={20} />
                </span>
                <span className="menu-link-text">Survey</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/dashboard-create-survey" className="menu-link">
                <span className="menu-link-icon">
                  <IoCreateOutline size={18} />
                </span>
                <span className="menu-link-text">Create Survey</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink to="/dashboard-update-survey" className="menu-link ">
                <span className="menu-link-icon">
                  <MdSystemUpdateAlt size={20} />
                </span>
                <span className="menu-link-text">Update Survey</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/dashbboard-responses" className="menu-link ">
                <span className="menu-link-icon">
                  <MdOutlineQuestionAnswer size={20} />
                </span>
                <span className="menu-link-text">Response</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/dashboard-trash" className="menu-link ">
                <span className="menu-link-icon">
                  <MdDeleteForever size={20} />
                </span>
                <span className="menu-link-text">Trash</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
