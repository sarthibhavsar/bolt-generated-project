import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NonProtectedLayout, ProtectedLayout } from "./pages/layout";
import { authProtectedRoutes, publicRoutes } from "./routes/index";
import Authmiddleware from "./routes/routes";

function App() {
  return (
    <Routes>
      {publicRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={<NonProtectedLayout>{route.component}</NonProtectedLayout>}
          key={idx}
          exact={true}
        />
      ))}

      {authProtectedRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={
            <Authmiddleware>
              {route.fullscreen ? (
                <NonProtectedLayout code={route.code}>
                  {route.component}
                </NonProtectedLayout>
              ) : (
                <ProtectedLayout code={route.code}>
                  {route.component}
                </ProtectedLayout>
              )}
            </Authmiddleware>
          }
          key={idx}
          exact={true}
        />
      ))}
    </Routes>
  );
}

export default App;
