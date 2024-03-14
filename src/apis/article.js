// 文章相关的接口
import { request } from "@/utils";

// 获取文章频道列表
export const getArticleChannelListAPI = () => {
  return request({
    url: "/channels",
    method: "get",
  });
};

// 新增文章
export const addArticleAPI = (data) => {
  return request({
    url: "/mp/articles?draft=false",
    method: "post",
    data,
  });
};

// 获取文章列表
export const getArticleListAPI = (params) => {
  return request({
    url: "/mp/articles",
    method: "get",
    params,
  });
};

// 删除文章
export const deleteArticleByIdAPI = (id) => {
  return request({
    url: `/mp/articles/${id}`,
    method: "delete", 
  });
};

// 获取文章详情
export const getArticleInfoAPI = (id) => {
  return request({
    url: `/mp/articles/${id}`,
    method: "get", 
  })
}

// 编辑文章
export const updateArticleAPI = (data) => {
  console.log(data);
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'put',
    data
  })
}