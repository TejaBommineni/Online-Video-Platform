import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import TopBar from "../../Components/Menu/MenuBar";
import ComponentLoader from "../../Components/Progress/ComponenLoader";
import { AuthContext } from "../../Providers/AuthProvider";
import UserVideoCard from "./Components/UserVideoCard";
// import config from "../../service/api/config";
import {
  GetUserProfile,
  UpdateuserProfile,
  UploadFile,
  getUserVideos,
} from "../../service/service";

const ProfilePage = () => {
  const { user, authLoading } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  const handleUpload = async (e) => {
    setUploading(true);
    const files = e.target.files;
    try {
      const response = await UploadFile(files[0]);
      if (response && response.isSuccess) {
        setPhoto(response.data);
      }
    } catch (err) {
      if (err.response.status === 500) {
      } else {
      }
    }
    setUploading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setSaving(true);

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      photo: photo,
    };

    const response = await UpdateuserProfile(user._id, data);
    if (response && response.isSuccess) {
      setUserInfo(response.data.user);
      setPhoto(response.data.user.photo);
      toast.success(`Profile Update!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    } else {
      toast.error(`${response.data.toString()}!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    }
    setSaving(false);
    setShowEdit(false);
  };

  // Get user data
  useEffect(() => {
    (async () => {
      const response = await GetUserProfile(user?._id);

      if (response && response.isSuccess) {
        setUserInfo(response.data.user);
        setPhoto(response.data.user?.photo);
      }
      setLoading(false);
    })();
    if (user) {
      getUserVideos({ userId: user._id })
        .then((res) => {
          if (res && res.isSuccess) {
            setVideos(res.data.videos);
          }
        })
        .catch((err) => {});
    }
  }, [user]);

  if (!authLoading && !user) return <Redirect to="/login" />;
  return (
    <div>
      <TopBar active="profile" />
      <div className="container mx-auto px-4 pt-6">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
          {loading ? (
            <ComponentLoader height="30vh" />
          ) : (
            <div className="px-6">
              <div className="w-full px-4 lg:order-3 lg:text-right lg:self-center pt-4">
                <button
                  className={`${
                    showEdit ? "bg-gray-400" : "bg-gray-800"
                  } uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
                  type="button"
                  onClick={() => {
                    setShowEdit(!showEdit);
                  }}
                  disabled={saving}
                >
                  Edit
                </button>
              </div>
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 flex justify-center">
                  <div className="relative">
                    <img
                      alt="User"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
                      className="shadow-xl rounded-full h-auto align-middle border-none"
                      style={{ maxWidth: "150px" }}
                    />
                    {showEdit && (
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        {uploading ? (
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
                    )}
                  </div>
                </div>
                {showEdit ? (
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-left lg:self-center">
                    <form onSubmit={handleSave}>
                      <h3 className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          for="grid-password"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          autocomplete="email"
                          name="name"
                          className="w-full h-10 border border-gray-800 rounded px-3"
                          placeholder="Name"
                          required
                          defaultValue={userInfo?.name}
                        />
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          for="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          autocomplete="email"
                          name="email"
                          className="w-full h-10 border border-gray-800 rounded px-3"
                          placeholder="Email"
                          required
                          defaultValue={userInfo?.email}
                        />
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
                ) : (
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-left lg:self-center">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                      {userInfo?.name}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                      {userInfo?.email}
                    </div>
                  </div>
                )}
              </div>
              <div className="text-center mt-12"></div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4 mb-4">
            {videos &&
              videos.length > 0 &&
              videos.map((video, index) => {
                return <UserVideoCard video={video} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
