import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Property from "@/models/PropertyModel";
import { convertToObject } from "@/utils/convertToObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({ searchParams }) => {
  const { location, propertyType } = await searchParams;
  await connectDB();
  const locationPattern = new RegExp(location, "i");
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (propertyType && propertyType !== "all") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }
  const propertiesQueryResults = await Property.find(query).lean();
  const convertedProperties = convertToObject(propertiesQueryResults);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col  items-start">
          <PropertySearchForm />
        </div>
      </section>
      <section className="m-auto max-w-7xl py-4 text-center">
        <div className="py-6 mx-3">
          <Link
            href="/properties"
            className="flex items-center text-blue-500  hover:text-blue-700"
          >
            <FaArrowAltCircleLeft className="mr-1" /> Back to Properties
          </Link>
        </div>
        <h1 className="text-3xl mb-6">Search Results</h1>
        {convertedProperties.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-center text-2xl text-gray-500">
            <p>No property found.</p>
          </div>
        ) : (
          <div className="flex justify-center items-center mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4">
              {convertedProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default SearchResultsPage;
