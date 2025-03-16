import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/PropertyModel";
import { convertToObject } from "@/utils/convertToObject";
import Pagination from "@/components/Pagination";

const PropertiesPage = async ({ searchParams }) => {
  const { page = 1, pageSize = 3 } = await searchParams;
  await connectDB();
  const skip = (page - 1) * pageSize;
  const totalPages = await Property.countDocuments().lean();
  const properties = await Property.find({}).skip(skip).limit(pageSize).lean();
  const convertedProperties = convertToObject(properties);
  const showPagination = totalPages > pageSize;
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {convertedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination
            totalItems={totalPages}
            pageSize={parseInt(pageSize)}
            page={parseInt(page)}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
