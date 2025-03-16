"use client";
import ClipLoader from "react-spinners/ClipLoader";

function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#3b82f6" size={150} aria-label="Loading Spinner" />
    </div>
  );
}

export default LoadingPage;
