import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="dashboard">
        <div className="top flex">
          <div className="left w-1/4">
            <Sidebar />
          </div>

          <div className="right w-3/4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
