"use server";
import { revalidatePath } from "next/cache";
import connectDB from "@/config/database";
import Property from "@/models/PropertyModel";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

async function deleteProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required.");
  }
  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error("Property not found.");
  }

  if (property.owner.toString() !== userId) {
    throw new Error("You do not have permission to delete this property.");
  }

  await Property.findByIdAndDelete(propertyId);
  // Extract the image IDs from the property's images array
  const imageIds = property.images.map((image) => {
    const object = image.split("/").pop().split(".")[0];
    return object;
  });

  // Delete the images from Cloudinary
  await Promise.all(
    imageIds.map((imageId) =>
      cloudinary.uploader.destroy(`propertyPulse/${imageId}`)
    )
  );

  revalidatePath("/", "layout");
}

export default deleteProperty;
