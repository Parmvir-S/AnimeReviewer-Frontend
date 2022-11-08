import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navibar from "./Components/Navibar";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import AllAnime from "./Pages/AllAnime";
import Favourites from "./Pages/Favourites";
import TopAnime from "./Pages/TopAnime";
import Landing from "./Pages/Landing";
import CharacterPage from "./Pages/CharacterPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navibar />
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/allAnime" element={<AllAnime />} />
          <Route exact path="/favourites" element={<Favourites />} />
          <Route exact path="/topAnime" element={<TopAnime />} />
          <Route exact path="allAnime/character/:id" element={<CharacterPage />} />
          <Route exact path="/" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// react-router-dom v6 --> Switch has been replaced with Routes
