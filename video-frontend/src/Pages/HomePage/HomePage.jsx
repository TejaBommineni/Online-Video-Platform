import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import TopBar from "../../Components/Menu/MenuBar";
import ComponentLoader from "../../Components/Progress/ComponenLoader";
import { AuthContext } from "../../Providers/AuthProvider";
import { GetVideos } from "../../service/service";
import VideoCard from "./Components/VideoCard";

const HomePage = ({ history }) => {
  const { user, authLoading } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [activeVideos, setActiveVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("All");

  const getData = async () => {
    const response = await GetVideos();
    if (response && response.isSuccess) {
      let categoryVideos = [];
      for (var i = 0; i < response.data.videos.length; i++) {
        var categories = response.data.videos[i].categories;
        for (var j = 0; j < categories.length; j++) {
          if (!categoryVideos.some((c) => c.category === categories[j])) {
            categoryVideos.push({ category: categories[j] });
          }
        }
      }
      for (var i = 0; i < response.data.videos.length; i++) {
        var categories = response.data.videos[i].categories;
        for (var j = 0; j < categoryVideos.length; j++) {
          if (categories.includes(categoryVideos[j].category)) {
            var videos = categoryVideos[j].videos
              ? categoryVideos[j].videos
              : [];
            videos.push(response.data.videos[i]);
            categoryVideos[j].videos = videos;
          }
        }
      }
      setVideos(categoryVideos);
      setActiveVideos(categoryVideos);
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
              videos1 = videos.filter((v) => v.category == "Fiction");
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
              videos1 = videos.filter((v) => v.category == "Romance");
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
              videos1 = videos.filter((v) => v.category == "Rom-Com");
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
              videos1 = videos.filter((v) => v.category == "Thriller");
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
              videos1 = videos.filter((v) => v.category == "Adventure");
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
              videos1 = videos.filter((v) => v.category == "Horror");
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
              videos1 = videos.filter((v) => v.category == "Comedy");
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
          {!loading &&
            activeVideos.map((categoryvideo, index) => {
              return (
                <div className="mb-4 py-5">
                  {currentCategory == "All" && (
                    <h2 className="text-4xl font-bold text-black mb-4 text-left">
                      {categoryvideo.category}
                    </h2>
                  )}
                  <div className="w-full overflow-x-auto overflow-y-hidden">
                    <table>
                      <tbody>
                        <tr>
                          {categoryvideo.videos &&
                            categoryvideo.videos.length > 0 &&
                            categoryvideo.videos.map((video) => (
                              <td className="pr-4">
                                <Link to={`video/${video.slug}`}>
                                  <VideoCard video={video} />
                                </Link>
                              </td>
                            ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
