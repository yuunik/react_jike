// 柱状图组件
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

// 引入样式
import "./index.scss";

const BarChart = ({ chartTitle }) => {
  const chartRef = useRef();
  // 组件挂载后执行
  useEffect(() => {
    // 获取图表容器的 DOM 节点
    const chartDom = chartRef.current;
    // 容器初始化
    const myChart = echarts.init(chartDom);
    // 容器配置项
    let option;

    option = {
      title: {
        text: chartTitle,
      },
      xAxis: {
        type: "category",
        data: ["Vue", "Angular", "React"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150],
          type: "bar",
        },
      ],
    };

    // 设置图表参数
    option && myChart.setOption(option);
  }, []);
  return <div className="bar-chart" ref={chartRef}></div>;
};

export default BarChart;
