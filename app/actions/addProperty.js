"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/config/database";
import Property from "@/models/PropertyModel";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required.");
  }
  const { userId } = sessionUser;

  const amenities = formData.getAll("amenities");
  const images = formData.getAll("images").filter((image) => image.name !== "");

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: amenities,
    rates: {
      weekly: formData.get("rates.weekly"),
      nightly: formData.get("rates.nightly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const imageUrls = [];
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    const imageBase64 = imageData.toString("base64");
    const imageUploadResponse = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${imageBase64}`,
      {
        folder: "propertyPulse",
      }
    );
    imageUrls.push(imageUploadResponse.secure_url);
  }
  propertyData.images = imageUrls;

  const newProperty = await Property.create(propertyData);
  revalidatePath("/properties");
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
