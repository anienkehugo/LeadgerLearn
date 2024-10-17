import { Outlet } from "react-router-dom";
//import DashFooter from "./dashFooter";
//import DashHeader from "./DashHeader";

const DashLayout = () => {
  return (
    <>
      <div className="dash-container">
        <Outlet />
      </div>
      {/* <DashFooter /> */}
    </>
  );
};
export default DashLayout;
