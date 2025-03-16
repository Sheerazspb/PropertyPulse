"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/config/database";
import Property from "@/models/PropertyModel";
import { getSessionUser } from "@/utils/getSessionUser";

async function updateProperty(propertyId, formData) {
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
    throw new Error("You do not have permission to update this property.");
  }

  const amenities = formData.getAll("amenities");

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

  await Property.findByIdAndUpdate(propertyId, propertyData);
  revalidatePath("/", "layout");
  redirect(`/properties/${propertyId}`);
}

export default updateProperty;
