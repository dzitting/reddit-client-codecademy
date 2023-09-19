import { useEffect, useState } from "react";
import React from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import CommentSection from "./CommentSection";
import styles from "../styles/item.modules.css";

function Item({ selected, info, fetchInfo, popular, handleSelectionChange, comments, handleSubmit, newCommentValue, commentValueChange }) {
  const { title } = useParams();
  const { subreddit } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showingComments, setShowingComments] = useState(false);
  const toggleOpen = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  useEffect(() => {
    fetchInfo(selected);
  }, [selected]);

  const showComments = () => {
    setShowingComments(!showingComments);
  };

  return (
    <>
      <Link to="/">
        <header>Reddit Client</header>
      </Link>
      <div className="post-container">
        <aside>
          <button onClick={toggleOpen}>{isOpen ? "Close" : "Open"}</button>
          <h3>{isOpen ? "Popular" : ""}</h3>
          {isOpen &&
            popular.map((topic, key) => (
              <div key={key} className="topic-item">
                <Link to={`/r/${topic.data.subreddit}/${topic.data.title}`}>
                  <p
                    onClick={() => handleSelectionChange(topic.data.id)}
                    id={topic.data.id}
                  >
                    {topic.data.title.slice(0, 25)}
                    {topic.data.title.length > 20 ? "..." : ""}
                  </p>
                </Link>
              </div>
            ))}
        </aside>
        <div>
          <h1>r/{subreddit}</h1>
          <h2>{title}</h2>
          <div className="post-info">
            <h3>Posted by: {info?.data?.author}</h3>
            <h3>Created: {info?.data?.created || "Unknown"}</h3>
          </div>
          <img src={info.data?.thumbnail} alt="" />
          <p>{info.data?.selftext || ""}</p>
          <div style={{ display: "flex" }}>
            <button>Like</button>
            <p>{info.data?.ups}</p>
            <button onClick={showComments}>Comments</button>
            <p>{info.data?.num_comments}</p>
            <button>Share</button>
          </div>
          {showingComments && (
            <div>
              <CommentSection info={info} comments={comments} popular={popular} newComment={handleSubmit} newCommentValue={newCommentValue} commentValueChange={commentValueChange}/>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Item;
