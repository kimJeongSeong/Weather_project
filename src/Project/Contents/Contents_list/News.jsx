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

  // 제공해주신 GNews API 키를 적용했습니다.
  const apiKey = "53152e12d21c8d7c4538322658455f63"; 
  
  const url = {
    // 한국어 뉴스를 위해 lang=ko와 q=뉴스(또는 검색어)를 설정했습니다.
    total: `https://gnews.io/api/v4/search?q=뉴스&lang=ko&max=10&apikey=${apiKey}`,
    tesla: `https://gnews.io/api/v4/search?q=tesla&lang=en&max=10&apikey=${apiKey}`,
    top: `https://gnews.io/api/v4/top-headlines?category=business&lang=ko&max=10&apikey=${apiKey}`,
    apple: `https://gnews.io/api/v4/search?q=apple&lang=en&max=10&apikey=${apiKey}`
  };

  const fetchPosts = async (type) => {
    dispatch({ type: "start" });
    try {
      const response = await axios.get(url[type]);
      // GNews API는 response.data.articles 배열에 뉴스 데이터를 담아줍니다.
      dispatch({
        type: "success",
        payload: response.data.articles,
      });
    } catch (err) {
      console.error("API 에러 발생:", err.response?.data || err.message);
      // GNews의 에러 구조에 맞춰 에러 메시지를 추출합니다.
      const errorMsg = err.response?.data?.errors ? err.response.data.errors[0] : err.message;
      dispatch({
        type: "error",
        payload: errorMsg,
      });
    }
  };

  useEffect(() => {
    // 처음에 Business 카테고리의 한국 뉴스를 불러오도록 설정했습니다.
    fetchPosts("top");
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
            <h2>에러 발생</h2>
            <p style={{ color: "#ffcfcf", marginTop: "10px" }}>{error}</p>
          </div>
        ) : (
          posts?.map((post, index) => (
            <div key={post.url || index} className="news_card">
              <figure>
                {/* GNews API의 이미지 필드명은 'image'입니다. */}
                <img 
                  src={post.image || "https://via.placeholder.com/400x250?text=No+Image"} 
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