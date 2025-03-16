"use server";
import connectDB from "@/config/database";
import User from "@/models/UserModel";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required.");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  let isBookmarked = user.bookmarks.includes(propertyId);

  let message;

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = "Property removed from Bookmarks.";
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = "Property added to Bookmarks.";
    isBookmarked = true;
  }

  await user.save();
  revalidatePath("/properties/saved", "page");
  return { message, isBookmarked };
}

export default bookmarkProperty;
