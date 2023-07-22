import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SideBar from "../components/Sidebar";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
// import Index from '../jsx/index';
const Login = lazy(() => import("../components/Login"));
const List = lazy(() => import("../components/List"));
const Dashboard = lazy(() => import("../components/Dashboard"));
const Reports = lazy(() => import("../components/reports"));
const Calendar = lazy(() => import("../components/Calendar"));

function LoginRoutes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading... </div>}>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

function ProtectedRoutes() {
  const homeRoutes = useSelector(state => state.auth.homeActive)
  return (
    <Router>
      <Suspense fallback={<div>Loading... </div>}>
        <Grid container spacing={2}>
          <Grid item xs={2.5} md={2.5}>
            <SideBar />
          </Grid>
          <Grid item xs={9.5} md={9.5}>
            <ToastContainer />
            <Routes>
              {homeRoutes && <Route path="/reports" element={<Reports />} />}
              {homeRoutes && <Route path="/list" element={<List />} />}
              {homeRoutes && <Route path="/calendar" element={<Calendar />} />}
              {homeRoutes && <Route path="*" element={<Navigate to="/list" />} />}
            </Routes>
          </Grid>
        </Grid>
      </Suspense>
    </Router>
  );
}

const routes = {
  LoginRoutes,
  ProtectedRoutes,
};
export default routes;
