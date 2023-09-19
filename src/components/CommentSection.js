import React, { useState } from "react";
import styles from "../styles/comments.modules.css";

function CommentSection({ info, comments }) {
  const [openReplies, setOpenReplies] = useState(false);
  const [targetElement, setTargetElement] = useState(null);

  const handleReplies = () => {
    setOpenReplies(!openReplies);
  };

  const handleReplyButtonClick = (event) => {
    const clickedElement = event.target;
    setTargetElement(clickedElement);
  };

  console.log(comments);
  return comments ? (
    <div className="comment-container">
      <h2>Comments</h2>
      {comments.map((comment, key) => (
        <div key={key} className="comment">
          <p>{comment.data.body}</p>
          <p style={{ marginTop: 10, textAlign: "left", fontSize: 12 }}>
            {comment.data.author}
          </p>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <button
              onClick={handleReplies}
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Replies
            </button>
            <p style={{ textAlign: "right" }}>
              {comment.data?.replies?.data?.children?.length.toString()}
            </p>
            <button onClick={handleReplyButtonClick}>Reply</button>
          </div>
          {openReplies && (
            <div className="comment">
              {comment.data?.replies?.data?.children.map((reply, key) => (
                <p key={key}>{reply.data.body}</p>
              ))}
            </div>
          )}
          {targetElement === comment && (
            <form>
              <input />
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      ))}
    </div>
  ) : (
    "loading..."
  );
}

export default CommentSection;