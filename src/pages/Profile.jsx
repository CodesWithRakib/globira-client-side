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
import { motion } from "motion/react";

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
    <div className="min-h-screen bg-white dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="bg-blue-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Your Profile</h1>
            <p className="text-blue-100 mt-1">
              Manage your personal information
            </p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center py-6 px-4">
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={selectedImg || user?.photoURL || "/avatar.png"}
                alt="Profile"
                onError={(e) => (e.target.src = "/avatar.png")}
                className="size-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-sm"
              />
              <motion.label
                htmlFor="avatar-upload"
                className={`absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 p-2.5 rounded-full cursor-pointer transition-colors duration-200 shadow-sm ${
                  isUpdatingProfile ? "animate-pulse" : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
              </motion.label>
            </motion.div>
            <p
              className={`mt-3 text-sm font-medium ${
                isUpdatingProfile
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
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
              <motion.div
                key={idx}
                className="space-y-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
              >
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {field.icon}
                  {field.label}
                </label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </motion.div>
            ))}

            {/* Email (Read-only) */}
            <motion.div
              className="space-y-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                <Mail size={18} />
                Email
              </label>
              <div className="px-4 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium">
                {user?.email}
              </div>
            </motion.div>

            {/* Change Password Link */}
            <motion.div
              className="text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              <Link
                to="/change-password"
                className="text-sm text-blue-600 hover:underline flex justify-end items-center gap-1 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                <KeyRound size={16} /> Change Password
              </Link>
            </motion.div>

            {/* Save Button */}
            <motion.div
              className="flex justify-end pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleUpdateInfo}
                disabled={isUpdatingProfile}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-60 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                <Save className="w-4 h-4" />
                {isUpdatingProfile ? "Saving..." : "Save Info"}
              </motion.button>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          {/* Account Info */}
          <motion.div
            className="bg-blue-50 dark:bg-blue-900/20 px-6 py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
              <ShieldCheck
                className="text-blue-600 dark:text-blue-400"
                size={20}
              />
              Account Details
            </h2>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between py-2 border-b border-blue-100 dark:border-blue-900/50">
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
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
