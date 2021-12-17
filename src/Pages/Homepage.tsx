import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

const Homepage: React.FC = () => {
  interface Articles {
    articles: any[];
    title: string;
    author: string;
    publishedAt: string;
    description: string;
  }

  const [news, setNews] = useState<Articles>();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    ).then((response) => {
      response
        .json()
        .then((res) => {
          setNews(res);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  return (
    <div className="container">
      {news?.articles.map((article) => (
        <div className="container-article">
          <div key={article.title}>
            <a href={article.url} target="_blank">
              <img src={article.urlToImage} />
            </a>
            <h1>{article.title}</h1>
            <h2>Author: {article.author}</h2>
            <h3>Published at: {article.publishedAt}</h3>
            <p>{article.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
