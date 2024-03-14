import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
} from "antd";
// 时间选择器汉化包
import locale from "antd/es/date-picker/locale/zh_CN";
import "dayjs/locale/zh-cn";
// 导入资源
import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { getArticleListAPI } from "@/apis/article";

import useArticleChannel from "@/hooks/useArticleChannel";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  // 准备列数据
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status) => articleStatusMap[status],
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
  ];

  // 获取文章频道列表
  const { articleChannelList } = useArticleChannel();

  // 文章列表
  const [articleList, setArticleList] = useState([]);

  // 文章总数
  const [articleCount, setArticleCount] = useState(0);

  // 请求数据
  const [reqData, setReqData] = useState({
    // 文章状态
    status: '',
    // 频道分类
    channel_id: '',
    // 起始时间
    begin_pubdate: '',
    // 结束时间
    end_pubdate: '',
    // 当前页码
    page: 1,
    // 当前页条数
    per_page: 4
  })

  // 组件挂载时调用
  useEffect(() => {
    // 获取文章列表
    const getArticleList = async () => {
      // 调用接口, 获取文章列表
      const result = await getArticleListAPI(reqData);
      // 保存文章列表
      setArticleList(result.data.results);
      // 保存文章总数
      setArticleCount(result.data.total_count);
    };
    // 调用接口, 获取文章列表
    getArticleList();
  }, [reqData]);

  // 文章状态映射对象
  const articleStatusMap = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>,
  };

  // 筛选的回调函数
  const onSubmit = ({ status, date, channel_id }) => {
    // 修改请求参数
    setReqData({
      ...reqData,
      status,
      channel_id,
      begin_pubdate: dayjs(date[0]).format("YYYY-MM-DD"),
      end_pubdate: dayjs(date[1]).format("YYYY-MM-DD"),
    });
  };

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "文章列表" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }} onFinish={onSubmit}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {articleChannelList.map((channel) => (
                <Option key={nanoid()} value={channel.id}>
                  {channel.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${articleCount} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} />
      </Card>
    </div>
  );
};

export default Article;
