"use client";
import { useState, useEffect } from "react";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarksStatus from "@/app/actions/checkBookmarksStatus";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    checkBookmarksStatus(property._id).then((result) => {
      if (result.error) toast.error(result.error);
      if (result.isBookmarked) setIsBookmarked(result.isBookmarked);
      setLoading(false);
    });
    setLoading(true);
  }, [property._id, userId, checkBookmarksStatus]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You must be logged in to bookmark a property.");
      return;
    }
    const { message, isBookmarked } = await bookmarkProperty(property._id);
    toast.success(message);
    setIsBookmarked(isBookmarked);
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return isBookmarked ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
