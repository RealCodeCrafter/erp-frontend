// import React, { useState } from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
// import "./admin.scss";
// import { Outlet } from "react-router-dom";
// import Menu from "../../components/menu/Menu";

// const Admin = () => {
//   const [close, setClose] = useState(false);
//   return (
//     <div className={`admin ${close ? "admin__close" : ""}`}>
//       <div className="admin__sidebar">
//         <Sidebar />
//       </div>
//       <div className="admin__bg ">
//         <div className="admin__bg-top">
//           <Menu setClose={setClose} />
//         </div>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Admin;


import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./admin.scss";
import { Outlet } from "react-router-dom";
import Menu from "../../components/menu/Menu";

const Admin = () => {
  const [close, setClose] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`admin ${close ? "admin__close" : ""}`}>
      <div className="admin__sidebar">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>
      <div className="admin__bg">
        <div className="admin__bg-top">
          <Menu
            setClose={setClose}
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;