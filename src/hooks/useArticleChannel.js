// 文章频道列表钩子
import { useEffect, useState } from "react";
import { getArticleChannelListAPI } from "@/apis/article";

const useArticleChannel = () => {
  // 文章频道列表
  const [articleChannelList, setArticleChannelList] = useState([]);

  // 组件挂载时调用
  useEffect(() => {
    const getArticleChannelList = async () => {
      // 调用接口, 获取文章频道列表
      const result = await getArticleChannelListAPI();
      // 保存文章频道列表
      setArticleChannelList(result.data.channels);
    };
    getArticleChannelList();
  }, []);

  return {
    articleChannelList,
  };
};

export default useArticleChannel;
