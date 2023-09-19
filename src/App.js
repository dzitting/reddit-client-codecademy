import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fetchPopularContents } from "./data/popularContents";
import { fetchComments } from './data/fetchComments';
import SearchPage from "./components/SearchPage";
import Item from "./components/Item";
// import CommentSection from "./components/CommentSection";

function App() {
  const [popular, setPopular] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedComments, setSelectedComments] = useState(null);
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    try{
      fetchPopularContents().then((data) => {
        setPopular(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const getComments = async () => {
      if(selectedId)
      {
        const comments = await fetchComments(selectedId, selectedInfo.data.subreddit);
        setSelectedComments(comments);
      } else {
        return;
      }
    }
    getComments();
  },[selectedId])

  const handleSelectionChange = (id) => {
    setSelectedId(id);
    setSelectedInfo(popular.find((topic) => topic.data.id === id));
    console.log(selectedId);
  };

  const fetchInfo = () => {
    setSelectedInfo(popular.find((topic) => topic.data.id === selectedId));
    console.log(selectedInfo);
  };

  const commentValueChange = (e) => {
    e.preventDefault();
    setUserComment(e.target.value);
  }

  const handleSubmit = (e, comment) => {
    e.preventDefault();
  
    // Create a new comment object to simulate the added comment
    const newComment = {
      data: {
        body: userComment, // Use the input text as the comment body
        author: "YourUsername", // You can set the author's name
        id: "unique-comment-id", // Generate a unique comment ID
        replies: { data: { children: [] } }, // Initialize empty replies
      },
    };
  
    // Update the 'popular' state with the new comment
    setPopular((prevPopular) => {
      const updatedPopular = [...prevPopular];
      const commentIndex = updatedPopular.findIndex((c) => c.data.id === comment.data.id);
      if (commentIndex !== -1) {
        // Add the new comment to the replies of the parent comment
        updatedPopular[commentIndex].data.replies.data.children.push(userComment);
      }
      return updatedPopular;
    });
  
    // Clear the input field
    setUserComment("");
  };
  

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SearchPage
              popular={popular}
              handleSelectionChange={handleSelectionChange}
            />
          }
        />
        <Route
          path="r/:subreddit/:title"
          element={
            <Item
              selected={selectedId}
              info={selectedInfo}
              fetchInfo={fetchInfo}
              popular={popular}
              handleSelectionChange={handleSelectionChange}
              comments={selectedComments}
              handleSubmit={handleSubmit}
              userCommentValue={userComment}
              commentValueChange={commentValueChange}
            />
          }
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
