// 文章相关的接口
import { request } from "@/utils";

// 获取文章频道列表
export const getArticleChannelListAPI = () => {
  return request({
    url: "/channels",
    method: "get"
  });
};

// 新增文章
export const addArticleAPI = (data) => {
  return request({
    url: '/mp/articles?draft=false',
    method: 'post',
    data
  })
}

// 获取文章列表
export const getArticleListAPI = (params) => {
  return request({
    url: "/mp/articles",
    method: 'get',
    params
  })
}
