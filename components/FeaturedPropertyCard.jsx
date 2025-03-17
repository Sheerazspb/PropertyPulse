import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";

const FeaturedPropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    if (property.rates.monthly) {
      return `$${property.rates.monthly.toLocaleString()}/mo`;
    } else if (property.rates.weekly) {
      return `$${property.rates.weekly.toLocaleString()}/wk`;
    } else if (property.rates.nightly) {
      return `$${property.rates.nightly.toLocaleString()}/night`;
    } else {
      return "N/A";
    }
  };

  return (
    <div
      key={property._id}
      className="bg-cyan-200 rounded-xl shadow-md relative flex flex-col md:flex-col lg:flex-row"
    >
      <Image
        src={property.images[0]}
        alt="Property Image"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full lg:w-[48%] md:w-full object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold">{property.name}</h3>
        <div className="text-gray-600 mb-4">{property.type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay()}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline-block mr-1" /> {property.beds}{" "}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline-block mr-1" /> {property.baths}{" "}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-1" />{" "}
            {property.square_feet}{" "}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property.rates.nightly && (
            <p>
              <FaMoneyBill className="inline " /> Nightly
            </p>
          )}
          {property.rates.weekly && (
            <p>
              <FaMoneyBill className="inline " /> Weekly
            </p>
          )}
          {property.rates.monthly && (
            <p>
              <FaMoneyBill className="inline " /> Monthly
            </p>
          )}
        </div>

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className=" text-orange-700 mt-1" />
            <span className="text-orange-700">
              {" "}
              {property.location.city} {property.location.state}{" "}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
