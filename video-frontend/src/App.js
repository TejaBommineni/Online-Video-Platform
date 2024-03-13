import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import TopBar from "./Components/Header/TopBar";
import HomePage from "./Pages/HomePage/HomePage";
import ScrollToTop from "./Components/ScrollToTop";
import { AuthContext } from "./Providers/AuthProvider";
import jwtDecode from "jwt-decode";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import UploadVideoPage from "./Pages/UploadVideoPage/UploadVideoPage";
import EditVideoPage from "./Pages/EditVideoPage/EditVideoPage";
import VideoPage from "./Pages/VideoPage/VideoPage";
import VideosPage from "./Pages/VideosPage/VideosPage";

const App = () => {
  const { setUser, setAuthLoading } = useContext(AuthContext);

  const checkAuthToken = async () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      let user = jwtDecode(token);
      setUser(user);
    }
    setAuthLoading(false);
  };

  useEffect(() => {
    checkAuthToken();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Router>
        <ToastContainer />
        <ScrollToTop />
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/video/:slug" component={VideoPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/videos" component={VideosPage} />
          <Route exact path="/upload-video" component={UploadVideoPage} />
          <Route exact path="/edit-video/:slug" component={EditVideoPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
