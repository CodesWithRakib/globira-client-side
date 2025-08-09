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
  ShieldCheck,
  KeyRound,
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Your Profile</h1>
            <p className="text-blue-100 mt-1">
              Manage your personal information
            </p>
          </div>

          {/* Avatar Upload */}
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
                className={`absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 p-2 rounded-full cursor-pointer transition-all duration-200 shadow-md ${
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

          {/* Form Fields */}
          <div className="px-6 pb-6 space-y-5">
            {[
              {
                label: "Full Name",
                icon: <User size={18} />,
                value: fullName,
                setValue: setFullName,
                placeholder: user?.displayName,
              },
              {
                label: "Phone Number",
                icon: <Phone size={18} />,
                value: phoneNumber,
                setValue: setPhoneNumber,
                placeholder: user?.phone || "Not provided",
              },
              {
                label: "Address",
                icon: <MapPin size={18} />,
                value: address,
                setValue: setAddress,
                placeholder: "Your current address",
              },
              {
                label: "GitHub",
                icon: <Github size={18} />,
                value: github,
                setValue: setGithub,
                placeholder: "GitHub Profile Link",
              },
              {
                label: "LinkedIn",
                icon: <Linkedin size={18} />,
                value: linkedin,
                setValue: setLinkedin,
                placeholder: "LinkedIn Profile Link",
              },
              {
                label: "Facebook",
                icon: <Facebook size={18} />,
                value: facebook,
                setValue: setFacebook,
                placeholder: "Facebook Profile Link",
              },
            ].map((field, idx) => (
              <div key={idx} className="space-y-1">
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 font-medium">
                  {field.icon}
                  {field.label}
                </label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            {/* Email (Read-only) */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 font-medium">
                <Mail size={18} />
                Email
              </label>
              <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium">
                {user?.email}
              </div>
            </div>

            {/* Change Password Link */}
            <div className="text-right">
              <Link
                to="/change-password"
                className="text-sm text-blue-600 hover:underline flex justify-end items-center gap-1 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <KeyRound size={16} /> Change Password
              </Link>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleUpdateInfo}
                disabled={isUpdatingProfile}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg font-medium transition duration-200 disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                {isUpdatingProfile ? "Saving..." : "Save Info"}
              </button>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-t border-gray-200 dark:border-gray-600" />

          {/* Account Info */}
          <div className="bg-blue-50 dark:bg-blue-900/30 px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
              <ShieldCheck
                className="text-blue-600 dark:text-blue-400"
                size={20}
              />
              Account Details
            </h2>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between py-2 border-b border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2">
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
                <div className="flex items-center gap-2">
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
