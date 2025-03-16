"use server";
import { revalidatePath } from "next/cache";
import connectDB from "@/config/database";
import Message from "@/models/MessageModel";
import { getSessionUser } from "@/utils/getSessionUser";

async function markMessageRead(messageId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required.");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error("Message not found.");
  }

  if (message.recipient.toString() !== userId) {
    throw new Error("You do not have permission to mark this message.");
  }

  message.read = !message.read;
  revalidatePath("/messages", "page");
  await message.save();

  return message.read;
}

export default markMessageRead;
