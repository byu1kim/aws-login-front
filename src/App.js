import "./App.css";
import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Profile from "./routes/Profile";
import Nav from "./components/Nav";
import Restrict from "./routes/Restrict";
import Notfound from "./routes/Notfound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./components/AuthContext";

function App() {
  const { token } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/login",
          element: token ? <Profile /> : <Login />,
        },
        {
          path: "/signup",

          element: token ? <Profile /> : <Signup />,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        { path: "/restrict", element: <Restrict /> },
        { path: "/*", element: <Notfound /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
