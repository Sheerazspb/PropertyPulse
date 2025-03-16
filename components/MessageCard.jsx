"use client";
import dateFormat, { masks } from "dateformat";
import { useState } from "react";
import { toast } from "react-toastify";
import markMessageRead from "@/app/actions/markMessageRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useMessagesContext } from "@/context/MessageContext";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleting, setIsDeleting] = useState(false);
  const { setMessagesCount } = useMessagesContext();

  const handleReadClick = async () => {
    const newReadStatus = await markMessageRead(message._id);
    setIsRead(newReadStatus);
    setMessagesCount((prevCount) =>
      newReadStatus ? prevCount - 1 : prevCount + 1
    );
    toast.success(`Marked As ${newReadStatus ? "Read" : "New"} .`);
  };

  const handleDeleteClick = async () => {
    if (confirm("Are you sure you want to delete this message?")) {
      setIsDeleting(true);
      await deleteMessage(message._id);
      setMessagesCount((prevCount) => (isRead ? prevCount : prevCount - 1));
      toast.success("Message deleted!");
    }
  };

  if (isDeleting) <p>Deleted message</p>;

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-bl-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.name}
        </li>
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          <span className="text-gray-400">
            {dateFormat(message.createdAt, masks.default)}
          </span>
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3  text-white py-1 px-3 rounded-2xl ${
          isRead ? "bg-yellow-500" : "bg-blue-500"
        } hover:opacity-80`}
      >
        {isRead ? "Mark Unread" : "Mark Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-2xl hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
