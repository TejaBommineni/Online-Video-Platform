import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import TopBar from "../../Components/Menu/MenuBar";
import ComponentLoader from "../../Components/Progress/ComponenLoader";
import { AuthContext } from "../../Providers/AuthProvider";
import { GetVideos, searchVideoFromKeyword } from "../../service/service";
import VideoCard from "./Components/VideoCard";
import { ic_arrow_drop_down } from "react-icons-kit/md/ic_arrow_drop_down";
import { ic_arrow_drop_up } from "react-icons-kit/md/ic_arrow_drop_up";
import Icons from "react-icons-kit";

const VideosPage = ({ history }) => {
  const { user, authLoading } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [activeVideos, setActiveVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [videoKeyword, setVideoKeyword] = useState("");
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const handleSort = (value) => {
    setSortOrder(value);
    var sortVideos = [...videos];
    var categVideos = sortVideos.sort(function (a, b) {
      switch (value) {
        case "Upload Date":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "Likes":
          return b.likes.length - a.likes.length;
        case "Dislikes":
          return b.dislikes.length - a.dislikes.length;
        default:
          return 1;
      }
    });
    setActiveVideos(categVideos);
    setCategoryDropdown(false);
  };
  const searchVideos = (e) => {
    e.preventDefault();
    searchVideoFromKeyword({ keyword: videoKeyword }).then((response) => {
      if (response && response.isSuccess) {
        setVideos(response.data.videos);
        setActiveVideos(response.data.videos);
      }
    });
  };
  const getData = async () => {
    const response = await GetVideos();
    if (response && response.isSuccess) {
      setVideos(response.data.videos);
      setActiveVideos(response.data.videos);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!authLoading && !user) return <Redirect to="/login" />;
  return (
    <div className="">
      <TopBar active="home" />
      <div className="py-5 px-8">
        <div className="w-full flex flex-row justify-between">
          <form onSubmit={searchVideos} className="block">
            <input
              className="bg-white text-gray-700 focus:outline-none rounded-left focus:shadow-outline border border-gray-300 rounded py-2 px-4 mb-2 inline-block w-96 mx-auto appearance-none"
              name="searchVideo"
              required
              placeholder="Search Video"
              onChange={(e) => {
                setVideoKeyword(e.target.value);
              }}
            />
            <button
              type="submit"
              className="bg-white hover:bg-teal-600 px-4 py-2 text-black rounded text-white border border-sm"
              inline-block
            >
              Submit
            </button>
          </form>
          <div class="relative inline-block text-left w-lg cursor-pointer">
            <div
              onClick={() => {
                setCategoryDropdown(!categoryDropdown);
              }}
            >
              <button
                type="button"
                class="inline-flex justify-center w-40 min-w-full rounded-md border border-gray-800 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none mb-2"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                {sortOrder.length == 0 ? "Sort By" : sortOrder}
                <Icons
                  className="h-4 w-4 ml-2"
                  icon={
                    categoryDropdown ? ic_arrow_drop_up : ic_arrow_drop_down
                  }
                />
              </button>
            </div>
            {categoryDropdown && (
              <div
                class="origin-top-right min-w-fit absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-full max-h-44 overflow-y-scroll"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div class="py-1" role="none">
                  <div
                    class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    id="menu-item-2"
                    onClick={() => handleSort("Upload Date")}
                  >
                    Upload Date
                  </div>
                </div>
                <div class="py-1" role="none">
                  <div
                    class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    id="menu-item-2"
                    onClick={() => handleSort("Likes")}
                  >
                    Likes
                  </div>
                </div>
                <div class="py-1" role="none">
                  <div
                    class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    id="menu-item-2"
                    onClick={() => handleSort("Dislikes")}
                  >
                    Dislikes
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto mt-4 block lg:flex flex-row text-center">
          <div
            className="inline-block mx-auto mb-2"
            onClick={() => {
              setActiveVideos(videos);
              setCurrentCategory("All");
            }}
          >
            <div
              className={
                "flex mx-2 justify-center items-center h-8 px-4 rounded-full text-sm font-bold border shadow-md min-w-max cursor-pointer hover:bg-gray-100 " +
                (currentCategory == "All" ? "bg-gray-200" : "bg-white")
              }
            >
              All
            </div>
          </div>
          <div
            className="inline-block mx-auto mb-2"
            onClick={() => {
              let videos1 = [...videos];
              videos1 = videos.filter((v) => v.categories.includes("Fiction"));
              setActiveVideos(videos1);
              setCurrentCategory("Fiction");
            }}
          >
            <div
              className={
                "flex mx-2 justify-center items-center h-8 px-4 rounded-full text-sm font-bold border shadow-md min-w-max cursor-pointer hover:bg-gray-100 " +
                (currentCategory == "Fiction" ? "bg-gray-200" : "bg-white")
              }
            >
              Fiction
            </div>
          </div>
          <div
            className="inline-block mx-auto mb-2"
            onClick={() => {
              let videos1 = [...videos];
              videos1 = videos.filter((v) => v.categories.includes("Romance"));
              setActiveVideos(videos1);
              setCurrentCategory("Romance");
            }}
          >
            <div
              className={
                "flex mx-2 justify-center items-center h-8 px-4 rounded-full text-sm font-bold border shadow-md min-w-max cursor-pointer hover:bg-gray-100 " +
                (currentCategory == "Romance" ? "bg-gray-200" : "bg-white")
              }
            >
              Romance
            </div>
          </div>
          <div
            className="inline-block mx-auto mb-2"
            onClick={() => {
              let videos1 = [...videos];
              videos1 = videos.filter((v) => v.categories.includes("Rom-Com"));
              setActiveVideos(videos1);
              setCurrentCategory("Rom-Com");
            }}
          >
            <div
              className={
                "flex mx-2 justify-center items-center h-8 px-4 rounded-full text-sm font-bold border shadow-md min-w-max cursor-pointer hover:bg-gray-100 " +
                (currentCategory == "Rom-Com" ? "bg-gray-200" : "bg-white")
              }
            >
              Rom-Com
            </div>
          </div>
          <div
            className="inline-block mx-auto mb-2"
            onClick={() => {
              let videos1 = [...videos];
              videos1 = videos.filter((v) => v.categories.includes("Thriller"));
              setActiveVideos(videos1);
              setCurrentCategory("Thriller");
            }}
          >
            <div
              className={
                "flex mx-2 justify-center items-center h-8 px-4 rounded-full text-sm font-bold border shadow-md min-w-max cursor-pointer hover:bg-gray-100 " +
                (currentCategory == "Thriller" ? "bg-gray-200" : "bg-white")
              }
            >
              Thriller
            </div>
          </div>
          <div
            className="inline-block mx-auto mb-2"
            onClick={() => {
              let videos1 = [...videos];
              videos1 = videos.filter((v) =>
                v.categories.includes("Adventure")
              );
              setActiveVideos(videos1);
              setCurrentCategory("Adventure");
            }}
          >
            <div
              className={
                "flex mx-2 justify-center items-center h-8 px-4 rounded-full text-sm font-bold border shadow-md min-w-max cursor-pointer hover:bg-gray-100 " +
                (currentCategory == "Adventure" ? "bg-gray-200" : "bg-white")
              }
            >
              Adventure
            </div>
          </div>
          <div
            className="inline-block mx-auto mb-2"
            onClick={() => {
              let videos1 = [...videos];
              videos1 = videos.filter((v) => v.categories.includes("Horror"));
              setActiveVideos(videos1);
              setCurrentCategory("Horror");
            }}
          >
            <div
              className={
                "flex mx-2 justify-center items-center h-8 px-4 rounded-full text-sm font-bold border shadow-md min-w-max cursor-pointer hover:bg-gray-100 " +
                (currentCategory == "Horror" ? "bg-gray-200" : "bg-white")
              }
            >
              Horror
            </div>
          </div>
          <div
            className="inline-block mx-auto mb-2"
            onClick={() => {
              let videos1 = [...videos];
              videos1 = videos.filter((v) => v.categories.includes("Comedy"));
              setActiveVideos(videos1);
              setCurrentCategory("Comedy");
            }}
          >
            <div
              className={
                "flex mx-2 justify-center items-center h-8 px-4 rounded-full text-sm font-bold border shadow-md min-w-max cursor-pointer hover:bg-gray-100 " +
                (currentCategory == "Comedy" ? "bg-gray-200" : "bg-white")
              }
            >
              Comedy
            </div>
          </div>
        </div>
        <div className="max-w-7xl text-center">
          <h2 className="text-7xl text-black"></h2>
          {loading && <ComponentLoader height="90vh" />}
          {!loading && (
            <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3">
              {activeVideos.map((video, index) => {
                return (
                  <div className="mb-4 py-5 mx-2">
                    <Link to={`video/${video.slug}`}>
                      <VideoCard video={video} />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
