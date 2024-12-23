import { HashRouter } from "react-router-dom";
import { PathProvider } from "../Config/PathContext";
import { TCPProvider } from "../Config/TCPContext";
import AppRoutes from "./Routes";
import ReportNavBar from "../../globals/reportNavbar";

function ReportApp() {
  return (
    <HashRouter>
      <PathProvider>
        <div className="App">
          <ReportNavBar activeNavbar={true}/>
          <AppRoutes />
        </div>
      </PathProvider>
    </HashRouter>
  );
}

export default ReportApp;
