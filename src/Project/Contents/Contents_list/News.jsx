import React, { useEffect, useReducer } from "react";
import axios from "axios";
import "./Contests_total.css"

// 초기 상태값
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, loading: true, error: null };
    case "success":
      return { ...state, loading: false, posts: action.payload };
    case "error":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const News = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { posts, loading, error } = state;

  const apiKey = "0fa0a392a92546129aaf2e4df007483c";
  const url = {
    total: `https://newsapi.org/v2/everything?q=all&apiKey=${apiKey}&pageSize=10`,
    tesla: `https://newsapi.org/v2/everything?q=tesla&apiKey=${apiKey}&pageSize=10`,
    top: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}&pageSize=10`,
    apple: `https://newsapi.org/v2/everything?q=apple&apiKey=${apiKey}&pageSize=10`
  };

  const fetchPosts = async (type) => {
    dispatch({ type: "start" });
    try {
      const response = await axios.get(url[type]);
      dispatch({
        type: "success",
        payload: response.data.articles,
      });
    } catch (err) {
      console.error("API 에러 발생:", err.response?.data || err.message);
      dispatch({
        type: "error",
        payload: err.message,
      });
    }
  };

  useEffect(() => {
    fetchPosts("apple");
  }, []);

  return (
    <div className="news_contents">

      <div className="news_btn">
        <button onClick={() => fetchPosts("total")}>Total</button>
        <button onClick={() => fetchPosts("tesla")}>Tesla</button>
        <button onClick={() => fetchPosts("top")}>Business</button>
      </div>

      <div className="news_list_container">
        {loading ? (
          <div className="status_msg"><h2>데이터 로딩 중...</h2></div>
        ) : error ? (
          <div className="status_msg"><h2>에러 발생: {error}</h2></div>
        ) : (
          posts?.map((post, index) => (
            <div key={post.url || index} className="news_card">
              <figure>
                <img 
                  src={post.urlToImage || "https://via.placeholder.com/400x250?text=No+Image"} 
                  alt={post.title}
                  loading="lazy" 
                />
              </figure>
              <div className="news_text">
                <h2>{post.title}</h2>
                <p>{post.description || "본문 요약 내용이 없습니다."}</p>
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  LINK
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;