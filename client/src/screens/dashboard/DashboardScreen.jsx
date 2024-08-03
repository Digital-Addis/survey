import { AreaCards, AreaCharts, AreaTop } from "../../components";
import Sidebar from "../../components/sidebar/Sidebar";
const Dashboard = () => {
  return (
    <div className="content-area">
      <main className="page-wrapper">
        <Sidebar />

        <AreaTop />
        <div className="content-wrapper">
          <AreaCards />
          <AreaCharts />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
