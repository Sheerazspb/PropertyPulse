import Image from "next/image";
import Link from "next/link";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import Property from "@/models/PropertyModel";
import profileDefault from "@/assets/images/profile.png";
import ProfileProperties from "@/components/ProfileProperties";
import { convertToObject } from "@/utils/convertToObject";
import { MdEmail } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";

const ProfilePage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  const userId = sessionUser.userId;
  if (!userId) {
    throw new Error("User ID is required.");
  }

  const properties = await Property.find({ owner: userId }).lean();
  const convertedProperties = convertToObject(properties);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0 object-cover"
                  src={sessionUser.user.image || profileDefault}
                  width={192}
                  height={192}
                  alt="User"
                  priority={true}
                />
              </div>

              <h2 className="text-2xl flex gap-2 -ml-11">
                <span className="font-bold block mt-1 text-blue-500">
                  <IoPersonSharp />
                </span>
                {sessionUser.user.name}
              </h2>
              <h2 className="text-2xl  flex gap-2 mt-2 -ml-11">
                <span className="font-bold block mt-1 text-blue-500 ">
                  <MdEmail />
                </span>
                {sessionUser.user.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              <ProfileProperties properties={convertedProperties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
