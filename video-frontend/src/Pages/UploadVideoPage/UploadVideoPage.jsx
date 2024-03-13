import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import TopBar from "../../Components/Menu/MenuBar";
import ProgressBar from "../../Components/ProgressBar";
import { AuthContext } from "../../Providers/AuthProvider";
import config from "../../service/api/config";
import { CreateVideo, UploadFile, UploadVideo } from "../../service/service";
import { ic_arrow_drop_down } from "react-icons-kit/md/ic_arrow_drop_down";
import { ic_arrow_drop_up } from "react-icons-kit/md/ic_arrow_drop_up";
import Icons from "react-icons-kit";

const UploadVideoPage = ({ history }) => {
  const { user, authLoading } = useContext(AuthContext);
  const [video, setVideo] = useState("");
  const [thumbnail, setThumnail] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  if (!authLoading && !user) return <Redirect to="/login" />;

  const handleUploadVideo = async (e) => {
    setUploadingVideo(true);
    const files = e.target.files;
    try {
      const response = await UploadVideo(files[0], setUploadPercentage);
      console.log(response);
      if (response && response.isSuccess) {
        setVideo(response.data);
      }
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
    setUploadingVideo(false);
    setUploadPercentage(0);
  };

  const handleUpload = async (e) => {
    setUploadingThumb(true);
    const files = e.target.files;
    try {
      const response = await UploadFile(files[0]);
      console.log(response);
      if (response && response.isSuccess) {
        setThumnail(response.data);
      }
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
    setUploadingThumb(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (video && thumbnail) {
      setSaving(true);

      const data = {
        title: e.target.title.value,
        description: e.target.description.value,
        video: video,
        thumbnail: thumbnail,
        user: user?._id,
        categories: selectedCategories,
      };

      const response = await CreateVideo(data);
      if (response && response.isSuccess) {
        toast.success(`Video Uploaded!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
        history.push("/");
      } else {
        toast.error(`${response.data.toString()}!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
      }
      console.log(response);
      setSaving(false);
    } else {
      toast.error(`Please Upload Video and Thumbnail!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const categories = [
    "Fiction",
    "Romance",
    "Rom-Com",
    "Thriller",
    "Adventure",
    "Horror",
    "Comedy",
  ];

  return (
    <div>
      <TopBar active="upload-video" />
      <div className="container mx-auto px-4 pt-6">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
          <div className="p-2">
            <div className="flex flex-wrap justify-center">
              <div className="w-full sm:w-full lg:w-6/12 p-4 justify-center">
                <div className="text-sm leading-normal mt-0 mb-4 text-blueGray-400 font-bold">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    {" "}
                    Video
                  </label>
                  {video && (
                    <video
                      style={{ width: "100%" }}
                      src={`${config.fileServer}${video}`}
                      controls
                    ></video>
                  )}
                  <div className="py-2">
                    {uploadingVideo ? (
                      <ProgressBar progressPercentage={uploadPercentage} />
                    ) : (
                      <div className="custom-file mb-4">
                        <input
                          type="file"
                          className="custom-file-input br-0"
                          id="customFile"
                          onChange={handleUploadVideo}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-full lg:w-6/12 p-4 justify-center">
                <form onSubmit={handleSave}>
                  <div className="text-sm leading-normal mt-0 mb-4 text-blueGray-400 font-bold">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="w-full h-10 border border-gray-800 rounded px-3"
                      placeholder="Video Title"
                      required
                    />
                  </div>

                  <div className="text-sm leading-normal mt-0 mb-4 text-blueGray-400 font-bold">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Description
                    </label>
                    <textarea
                      rows={10}
                      required
                      type="text"
                      name="description"
                      className="w-full p-2 border border-gray-800 rounded"
                      placeholder="Video Description"
                    />
                  </div>
                  <div class="relative inline-block text-left w-full cursor-pointer">
                    <div
                      onClick={() => {
                        setCategoryDropdown(!categoryDropdown);
                      }}
                    >
                      <button
                        type="button"
                        class="inline-flex justify-center w-full min-w-full rounded-md border border-gray-800 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none mb-4"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                      >
                        {selectedCategories.length == 0
                          ? "Category"
                          : selectedCategories.join(", ")}
                        <Icons
                          className="h-4 w-4 ml-2"
                          icon={
                            categoryDropdown
                              ? ic_arrow_drop_up
                              : ic_arrow_drop_down
                          }
                        />
                      </button>
                    </div>
                    {categoryDropdown && (
                      <div
                        class="origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-full max-h-44 overflow-y-scroll"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabindex="-1"
                      >
                        <div class="py-1" role="none">
                          {categories.map((category, index) => (
                            <div
                              key={index}
                              class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                              role="menuitem"
                              id="menu-item-2"
                              onClick={() => {
                                let selected = [...selectedCategories];
                                console.log("selected", selected);
                                if (
                                  selectedCategories.some((c) => c == category)
                                ) {
                                  selected = selected.filter(
                                    (s) => s != category
                                  );
                                } else {
                                  selected.push(category);
                                }
                                setSelectedCategories(selected);
                              }}
                            >
                              <input
                                class="form-check-input h-4 w-4 border border-gray-600 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={selectedCategories.some(
                                  (c) => c == category
                                )}
                              />
                              <label
                                class="form-check-label inline-block text-gray-800"
                                for="flexCheckDefault"
                              >
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Thumbnail
                    </label>
                    {thumbnail && (
                      <img
                        alt="User"
                        src={config.fileServer + thumbnail}
                        className="w-full shadow-xl h-auto align-middle border-none mb-2"
                      />
                    )}
                    <div className="">
                      {uploadingThumb ? (
                        "Uploading, Please Wait..."
                      ) : (
                        <div className="custom-file mb-4">
                          <input
                            type="file"
                            className="custom-file-input br-0"
                            id="customFile"
                            onChange={handleUpload}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className={`w-100 ${
                      saving ? "bg-gray-400" : "bg-gray-800"
                    } uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
                    type="submit"
                    disabled={saving}
                  >
                    {saving ? "Saving" : "Save"}
                  </button>
                </form>
              </div>
            </div>
            <div className="text-center mt-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideoPage;
