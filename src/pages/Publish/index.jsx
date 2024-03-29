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
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { nanoid } from "nanoid";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";

import { addArticleAPI, getArticleInfoAPI, updateArticleAPI } from "@/apis/article";
import useArticleChannel from "@/hooks/useArticleChannel";
import "./index.scss";

const { Option } = Select;

const Publish = () => {
  const navigate = useNavigate();
  const { articleChannelList } = useArticleChannel();
  const [search] = useSearchParams();
  // 表单实例
  const [form] = Form.useForm();

  // id
  const articleId = search.get("id");
  // 组件挂载后执行
  useEffect(() => {
    if (articleId) {
      // 获取文章详情
      const getArticleInfo = async () => {
        const {
          data: {
            title,
            channel_id,
            content,
            cover: { type, images },
          },
        } = await getArticleInfoAPI(articleId);
        // 回显数据
        form.setFieldsValue({
          title,
          channel_id,
          type,
          content,
        });
        // 回显图片类型
        setImageType(type);
        // 回显图片
        setImgUrlList(images.map((url) => ({ url })));
      };
      getArticleInfo();
    }
  }, [articleId, form]);

  // 提交表单的回调
  const onSubmit = async ({ title, content, channel_id, type }) => {
    // 判断图片类型是否与图片数量一致
    if (imageType !== imageUrlList.length) {
      return message.warning("图片类型与图片数量不一致!");
    }

    // 基础请求数据
    const reqData = {
      title,
      content,
      cover: {
        type,
        images: imageUrlList.map((img) =>
          img.response ? img.response.data.url : img.url
        ),
      },
      channel_id,
    };

    if (articleId) {
      // 调用接口, 编辑文章
      await updateArticleAPI({
        ...reqData,
        id: articleId,
        pub_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      })
    } else {
      // 调用接口, 新增文章
      await addArticleAPI(reqData);
    }

    // 提示成功信息
    message.success("发送文章成功!");
    // 跳转页面
    navigate("/article");
  };

  // 图片数据列表
  const [imageUrlList, setImgUrlList] = useState([]);

  // 上传封面的回调
  const uploadImage = ({ fileList }) => {
    // 保存上传封面的地址
    setImgUrlList(fileList);
  };

  // 图片类型
  /**
   *  无图: { type: 0, images: [] }
   *  单图: { type: 1, images: [“地址1”] }
   *  三图: { type: 3, images: [“地址1”，‘地址2’，‘地址3’] }
   */
  const [imageType, setImageType] = useState(0);

  // 选择图片类型
  const switchImageType = ({ target: { value: imageType } }) => {
    // 修改图片类型
    setImageType(imageType);
  };

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: articleId ? "编辑文章" : "发布文章" },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onSubmit}
          form={form}
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
              {articleChannelList.map((channel) => (
                <Option key={nanoid()} value={channel.id}>
                  {channel.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={switchImageType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 若选择无图, 则组件不显示 */}
            {imageType !== 0 && (
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                onChange={uploadImage}
                maxCount={imageType}
                multiple={imageType === 3}
                fileList={imageUrlList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
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
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? "编辑文章" : "发布文章"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
