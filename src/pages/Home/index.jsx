// 引入柱状图
import BarChart from "./components/BarChart";

// 引入样式
import './index.scss'

const Home = () => {
  // 组件挂载后执行
  return (
    <div className="home">
      <h2>Home</h2>
      <div className="chart-container">
        <BarChart chartTitle="三大框架满意度" />
        <BarChart chartTitle="三大框架使用度" />
      </div>
    </div>
  );
};

export default Home;
