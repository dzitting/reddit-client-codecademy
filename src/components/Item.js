import { useEffect, useState } from "react";
import React from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import CommentSection from "./CommentSection";
import styles from "../styles/item.modules.css";

function Item({ selected, popular, upvote, comments, handleSelectionChange, handleSubmit, userComment, commentValueChange, share }) {
  const { title } = useParams();
  const { subreddit } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showingComments, setShowingComments] = useState(false);
  const toggleOpen = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

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
            Object.values(popular).map((topic, key) => (
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
            <h3>Posted by: {selected?.data?.author}</h3>
            <h3>Created: {selected?.data?.created || "Unknown"}</h3>
          </div>
          <img src={selected?.data?.thumbnail} alt="" />
          <p>{selected?.data?.selftext || ""}</p>
          <div style={{ display: "flex" }}>
            <button id={selected?.data?.id} onClick={upvote}>Like</button>
            <p>{selected?.data?.ups}</p>
            <button onClick={showComments}>Comments</button>
            <p>{selected?.data?.num_comments}</p>
            <button onClick={share}>Share</button>
          </div>
          {showingComments && (
            <div>
              <CommentSection info={selected} comments={comments} newComment={handleSubmit} newCommentValue={userComment} commentValueChange={commentValueChange}/>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Item;
