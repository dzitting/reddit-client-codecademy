import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import "../styles/search-page.modules.css";

export default function SearchPage({ popular, handleSelectionChange }) {

  return (
    <div>
      <h1>Reddit Client</h1>
      <h2>Search</h2>
      <form>
        <input
          type="text"
          id="query-string"
          name="query-string"
          placeholder="Search Reddit"
        />
        <button type="submit">Search</button>
      </form>
      <h2>Popular Topics</h2>
      {/* Popular Reddit Topics listed below */}
      <div className="topics">
        {/* Maps through popular topics from props */}
        {Object.values(popular).map((topic, key) => {
              return (
                <div key={key} className="topic-card">
                  <Link to={`/r/${topic.data.subreddit}/${topic.data.title}`}>
                    <h3
                      onClick={() => handleSelectionChange(topic.data.id)}
                      id={topic.data.id}
                    >
                      {topic.data.title}
                    </h3>
                  </Link>
                </div>
              );
            })
            }
      </div>
    </div>
  );
}
