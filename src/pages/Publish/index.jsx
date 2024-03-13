import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { nanoid } from "nanoid";
import "react-quill/dist/quill.snow.css";

import "./index.scss";
import { getArticleChannelListAPI } from "@/apis/article";

const { Option } = Select;

const Publish = () => {
  // 文章频道列表
  const [articleChannelList, setArticleChannelList] = useState([]);

  // 组件挂载时调用
  useEffect(() => {
    return async () => {
      const result = await getArticleChannelListAPI();
      // 保存文章频道列表
      setArticleChannelList(result.data.channels);
    };
  }, []);

  const [value, setValue] = useState("");
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "发布文章" },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {
                articleChannelList.map(channel => (
                  <Option key={nanoid()} value={channel.id}>{channel.name}</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
