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
            />
          }
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
