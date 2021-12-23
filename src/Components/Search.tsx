import React, { useState, useEffect } from "react";


const API_KEY = process.env.REACT_APP_API_KEY;

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&language=en&sortBy=relevancy&apiKey=${API_KEY}`
    ).then((response) => {
      response
        .json()
        .then((res) => {
          setKeyword(res);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setKeyword(event.target.value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await fetchData();
    setIsLoaded(true);
    setKeyword("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          name="keyword"
          value={keyword}
          onChange={handleChange}
          onClick={handleSubmit}
        ></input>
      </form>
    </div>
  );
};

export default Search;
