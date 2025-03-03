import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import PostDetails from "./pages/PostDetails.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
