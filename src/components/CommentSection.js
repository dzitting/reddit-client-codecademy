import React, { useState } from "react";
import styles from "../styles/comments.modules.css";

function CommentSection({
  info,
  comments,
  newComment,
  newCommentValue,
  commentValueChange,
}) {
  const [openReplies, setOpenReplies] = useState(Array(comments.length).fill(false));
  const [targetElement, setTargetElement] = useState(null);
  const [typing, setTyping] = useState("");

  const handleReplyButtonClick = (event, comment) => {
    event.preventDefault();
    setTargetElement(comment);
  };

  const handleReplies = (index) => {
    setOpenReplies((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return info ? (
    <div className="comment-container">
      <h2>Comments</h2>
      {comments &&
        comments.map((comment, key) => (
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
                onClick={() => handleReplies(key)}
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

              <button onClick={(e) => handleReplyButtonClick(e, comment)}>
                Reply
              </button>
            </div>
            {openReplies[key] && comment.data?.replies?.data?.children?.length > 0 && (
              <div className="comment">
                {comment.data.replies.data.children.map((reply, replyKey) => (
                  <p key={replyKey}>{reply.data.body}</p>
                ))}
              </div>
            )}
            {targetElement === comment && (
              <div className="reply-box">
                <form onSubmit={(e) => newComment(e)}>
                  <input
                    onChange={(e) => commentValueChange(e)}
                    type="text"
                    value={newCommentValue}
                  />
                  <button type="submit">Submit</button>
                </form>
              </div>
            )}
          </div>
        ))}
    </div>
  ) : (
    "loading..."
  );
}

export default CommentSection;
