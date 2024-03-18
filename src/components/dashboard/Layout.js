import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="dashboard">
        <div className="top flex">
          <div className="left w-1/5">
            <Sidebar />
          </div>

          <div className="right w-4/5">{children}</div>
        </div>

        <footer className="footer flex items-center justify-center">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
