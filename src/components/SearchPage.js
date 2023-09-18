import React from "react";
import { Link } from "react-router-dom";

export default function SearchPage({ popular }) {
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
      <div>
        {/* Maps through popular topics from props */}
        {popular.map((topic) => {
          return (
            <div>
              <Link to={`${topic.data.permalink}`}>
                <h3 key={topic.data.id}>{topic.data.title}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
