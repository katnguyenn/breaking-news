import React, { useState, useEffect } from "react";
import Nav from "../Components/Nav";
import Search from "../Components/Search";
import { IArticles } from "../Types/IArticles";


const API_KEY = process.env.REACT_APP_API_KEY;

const noImage = require("../assets/noimage.png")

const Homepage: React.FC = () => {
  const [news, setNews] = useState<IArticles>();

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
          console.log(res)
          setNews(res);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  return (
    <div>
      <Nav />
      <Search />
      <div className="container">
        {news?.articles.map((article) => (
          <div className="container-article">
            <div key={article.title}>
              <a href={article.url} target="_blank">
                <img src={article.urlToImage ? article.urlToImage : noImage } />
              </a>
              <h1>{article.title}</h1>
              <h2>Author: {article.author}</h2>
              <h3>Published at: {article.publishedAt}</h3>
              <p>{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
