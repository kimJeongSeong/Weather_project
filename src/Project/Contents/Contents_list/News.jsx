import React, { useEffect, useReducer } from "react";
import axios from "axios";
import "./Contests_total.css";

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

  // NewsAPI 전용 키를 반영했습니다.
  const apiKey = "0fa0a392a92546129aaf2e4df007483c"; 
  
  // NewsAPI 형식으로 URL을 다시 복구했습니다.
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
      // NewsAPI는 response.data.articles에 데이터를 담아줍니다.
      dispatch({
        type: "success",
        payload: response.data.articles,
      });
    } catch (err) {
      console.error("API 에러 발생:", err.response?.data || err.message);
      // 배포 환경(GitHub Pages)이라면 여기서 426 에러 메시지가 출력될 것입니다.
      dispatch({
        type: "error",
        payload: err.response?.data?.message || err.message,
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
          <div className="status_msg">
            <h2>에러 발생: {error}</h2>
            {/* 배포 환경 에러일 경우 사용자에게 안내 문구를 띄워줍니다. */}
            {error.includes("426") && (
              <p style={{fontSize: "0.8rem", color: "white"}}>
                NewsAPI 무료 플랜은 배포 환경에서 제한될 수 있습니다.
              </p>
            )}
          </div>
        ) : (
          posts?.map((post, index) => (
            <div key={post.url || index} className="news_card">
              <figure>
                {/* NewsAPI는 이미지 경로 이름이 'urlToImage'입니다. */}
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