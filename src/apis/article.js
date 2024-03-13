// 文章相关的接口
import { request } from "@/utils";

// 获取文章频道列表
export const getArticleChannelListAPI = () => {
  return request({
    url: "/channels",
    method: "get"
  });
};
