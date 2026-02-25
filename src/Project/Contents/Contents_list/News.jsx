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

  // 알려주신 NewsData.io API 키를 적용했습니다.
  const apiKey = "pub_eedbb73e92b049a4b4f9796c8d5e2103"; 
  
  const url = {
    // 한국 뉴스 (국가: kr)
    total: `https://newsdata.io/api/1/news?apikey=${apiKey}&q=news&country=kr`,
    // 테슬라 뉴스 (언어: en)
    tesla: `https://newsdata.io/api/1/news?apikey=${apiKey}&q=tesla&language=en`,
    // 비즈니스 카테고리 (국가: kr)
    top: `https://newsdata.io/api/1/news?apikey=${apiKey}&category=business&country=kr`,
    // 애플 뉴스 (언어: en)
    apple: `https://newsdata.io/api/1/news?apikey=${apiKey}&q=apple&language=en`
  };

  const fetchPosts = async (type) => {
    dispatch({ type: "start" });
    try {
      const response = await axios.get(url[type]);
      // NewsData.io는 결과 배열을 'results'라는 이름으로 제공합니다.
      dispatch({
        type: "success",
        payload: response.data.results,
      });
    } catch (err) {
      console.error("API 에러 발생:", err.response?.data || err.message);
      // 에러 메시지 추출 (구조에 따라 조정)
      const errorMsg = err.response?.data?.message || err.message;
      dispatch({
        type: "error",
        payload: errorMsg,
      });
    }
  };

  useEffect(() => {
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
            <div key={post.article_id || index} className="news_card">
              <figure>
                {/* NewsData.io의 이미지 필드는 'image_url'입니다. */}
                <img 
                  src={post.image_url || "https://via.placeholder.com/400x250?text=No+Image"} 
                  alt={post.title}
                  loading="lazy" 
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x250?text=No+Image"; }}
                />
              </figure>
              <div className="news_text">
                <h2>{post.title}</h2>
                <p>{post.description || "본문 요약 내용이 없습니다."}</p>
                <a href={post.link} target="_blank" rel="noopener noreferrer">
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