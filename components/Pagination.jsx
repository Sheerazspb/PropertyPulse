import Link from "next/link";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";

const Pagination = ({ totalItems, pageSize, page }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page > 1 && (
        <Link href={`/properties?page=${page - 1}`} className="mr-1  mt-1">
          <FcPrevious size={25} />
        </Link>
      )}

      <span className="mx-2 mt-1">
        Page {page} of {totalPages}
      </span>
      {page < totalPages && (
        <Link href={`/properties?page=${page + 1}`} className="ml-1  mt-1">
          <FcNext size={25} />
        </Link>
      )}
    </section>
  );
};

export default Pagination;
