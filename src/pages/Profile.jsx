import { useState } from "react";
import {
  Camera,
  Mail,
  User,
  Calendar,
  CheckCircle,
  Phone,
  Save,
  MapPin,
  Github,
  Facebook,
  Linkedin,
} from "lucide-react";

import useAxios from "../hooks/useAxios";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading";
import { Link } from "react-router";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const { user, updateUser } = useAuth();
  const axiosSecure = useAxios();

  useTitle(`Profile`);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setIsUpdatingProfile(true);
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64Image = reader.result;
        setSelectedImg(base64Image);

        const response = await axiosSecure.patch(`/api/users/${user?.email}`, {
          photoURL: base64Image,
        });

        await updateUser({ photoURL: response.data.photoURL });
        toast.success("Profile photo updated successfully!");
      } catch (error) {
        console.error("Profile update error:", error);
        toast.error("Failed to update profile photo");
        setSelectedImg(null);
      } finally {
        setIsUpdatingProfile(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleUpdateInfo = async () => {
    if (
      !fullName &&
      !phoneNumber &&
      !address &&
      !github &&
      !linkedin &&
      !facebook
    ) {
      toast("No changes made");
      return;
    }

    try {
      setIsUpdatingProfile(true);

      const updatedData = {
        displayName: fullName || user?.displayName,
        phone: phoneNumber || user?.phone,
        address,
        github,
        linkedin,
        facebook,
      };

      const response = await axiosSecure.patch(
        `/api/users/${user?.email}`,
        updatedData
      );
      await updateUser({ displayName: response.data.displayName });
      toast.success("Profile info updated!");
    } catch (error) {
      console.error("Info update error:", error);
      toast.error("Failed to update profile info");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Your Profile</h1>
            <p className="text-indigo-100 mt-1">
              Manage your personal information
            </p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center py-6 px-4">
            <div className="relative group">
              <img
                src={selectedImg || user?.photoURL || "/avatar.png"}
                alt="Profile"
                onError={(e) => (e.target.src = "/avatar.png")}
                className="size-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer transition-all duration-200 shadow-md ${
                  isUpdatingProfile ? "animate-pulse" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p
              className={`mt-3 text-sm ${
                isUpdatingProfile
                  ? "text-blue-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {isUpdatingProfile
                ? "Updating..."
                : "Click camera to change photo"}
            </p>
          </div>

          {/* Info Section */}
          <div className="px-6 pb-6 space-y-4">
            {[
              {
                label: "Full Name",
                icon: <User />,
                value: fullName,
                setValue: setFullName,
                placeholder: user?.displayName,
              },
              {
                label: "Phone Number",
                icon: <Phone />,
                value: phoneNumber,
                setValue: setPhoneNumber,
                placeholder: user?.phone || "Not provided",
              },
              {
                label: "Address",
                icon: <MapPin />,
                value: address,
                setValue: setAddress,
                placeholder: "Your current address",
              },
              {
                label: "GitHub",
                icon: <Github />,
                value: github,
                setValue: setGithub,
                placeholder: "GitHub Profile Link",
              },
              {
                label: "LinkedIn",
                icon: <Linkedin />,
                value: linkedin,
                setValue: setLinkedin,
                placeholder: "LinkedIn Profile Link",
              },
              {
                label: "Facebook",
                icon: <Facebook />,
                value: facebook,
                setValue: setFacebook,
                placeholder: "Facebook Profile Link",
              },
            ].map((field, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  {field.icon}
                  <span className="text-sm font-medium">{field.label}</span>
                </div>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            {/* Email */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Email</span>
              </div>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            {/* Password Change */}
            <div className="text-right">
              <Link
                to="/change-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Change Password
              </Link>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleUpdateInfo}
                disabled={isUpdatingProfile}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200 disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                {isUpdatingProfile ? "Saving..." : "Save Info"}
              </button>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-gray-100 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
            <h2 className="text-lg font-medium mb-3">Account Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>Member Since</span>
                </div>
                <span className="font-medium">
                  {new Date(user?.metadata?.creationTime).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Account Status</span>
                </div>
                <span className="font-medium text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
