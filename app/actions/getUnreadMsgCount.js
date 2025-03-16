"use server";
import connectDB from "@/config/database";
import Message from "@/models/MessageModel";
import { getSessionUser } from "@/utils/getSessionUser";

async function getUnreadMsgCount() {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required.");
  }

  const { userId } = sessionUser;

  const unreadMessages = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return unreadMessages;
}

export default getUnreadMsgCount;
