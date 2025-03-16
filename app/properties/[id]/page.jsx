import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import connectDB from "@/config/database";
import Property from "@/models/PropertyModel";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { convertToObject } from "@/utils/convertToObject";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = async ({ params }) => {
  await connectDB();
  const { id } = await params;
  const property = await Property.findById(id).lean();
  const convertedProperty = convertToObject(property);
  if (!convertedProperty) {
    return (
      <h1 className="text-2xl font-bold mt-10 text-center">
        Property not found.
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={convertedProperty.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="flex flex-col justify-between md:flex-row gap-6 w-full">
            <PropertyDetails property={convertedProperty} />
            <aside className="space-y-2 min-w-fit">
              <BookmarkButton property={convertedProperty} />
              <ShareButtons property={convertedProperty} />
              <PropertyContactForm property={convertedProperty} />
            </aside>
          </div>
        </div>
      </section>

      <PropertyImages images={convertedProperty.images} />
    </>
  );
};

export default PropertyPage;
