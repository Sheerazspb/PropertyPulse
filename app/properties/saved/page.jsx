import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/UserModel";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedPropertiesPage = async () => {
  const { userId } = await getSessionUser();
  const { bookmarks } = await User.findById(userId).populate("bookmarks");

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-12 text-center">
          Your Saved Properties
        </h1>
        {bookmarks.length === 0 ? (
          <p className="text-center font-bold">No property found!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
