import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import MoonIcon from "./assests/icons/moon.svg";
import SunIcon from "./assests/icons/sun.svg";
import { Dashboard, PageNotFound } from "./screens";
import Form from "./components/Form"
import CreateSurvey from "./screens/createSurvey/CreateSurvey";
import UpdateSurvey from "./screens/updateSurvey/UpdateSurvey";
import Response from "./screens/responses/Response";
import Trash from './screens/deletedSurveys/Trash'
import ShowSurvey from "./screens/showSurvey/ShowSurvey";
import Surveys from "./screens/surveys/Surveys";
import Home from "./components/pages/Home";
import WelcomEmail from "./screens/email/WelcomeEmail";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// root routers
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/fill-survey",
    element: <Form></Form>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "/dashboard-survey",
    element: <Surveys></Surveys>,
  },
  {
    path: "/dashboard-create-survey",
    element: <CreateSurvey></CreateSurvey>,
  },
  {
    path:"/email",
element:<WelcomEmail></WelcomEmail>
  },
 
  {
    path: "/dashboard-create-survey/:id",
    element: <CreateSurvey></CreateSurvey>,
  },
  {
    path: "/dashboard-update-survey/:id",
    element: <UpdateSurvey></UpdateSurvey>,
  },
  {
    path:"/dashboard-trash",
    element:<Trash></Trash>
  },
  {
    path:"/dashbboard-responses",
    element:<Response></Response>

  },
  {
    path:'/survey/:uniqueId',
    element:<ShowSurvey></ShowSurvey>
  },
  {
    path: "/*",
    element: <PageNotFound></PageNotFound>,
  },
])
function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
     <main>
      <RouterProvider router={router}></RouterProvider>
      <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            alt="themeicon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
    </main>
      {/* <Router>
        <Routes>
            <Route path="/" element={<Form />} />
          <Route element={<BaseLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard-create-survey" element={<CreateSurvey />} />
            <Route path="/dashboard-update-survey" element={<UpdateSurvey />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
      </Router> */}
    </>
  );
}

export default App;
