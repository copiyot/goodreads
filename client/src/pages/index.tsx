import Link from "next/link";

import { useBooksQuery } from "../generated/graphql";
import NavBar from "../components/NavBar";

const Home = () => {
  const { data } = useBooksQuery();

  return (
    <>
      <NavBar />
      {!data ? (
        <div>Loading....</div>
      ) : (
        <div className="bg-gray-100 min-h-screen md:p-10 p-2">
          <Link
            href="/create_book"
            className="bg-[#002D74] rounded-md text-white p-2 hover:scale-105 duration-300"
          >
            Add Book
          </Link>
          <div className="text-center text-2xl font=[Poppins] text-[#002D74]">
            Your Books
          </div>
          <div className="overflow-auto rounded-lg shadow mt-5">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    No
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Title
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Author
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Collection
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Cover Image
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Edit Book
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.books.map((book, index) => (
                  <tr
                    key={book.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {++index}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {book.title}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {book.author}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {book.collection}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {book.coverImage}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <Link
                        href={`/edit_book/${book.id}`}
                        className="bg-[#002D74] rounded-md text-white p-2 hover:scale-105 duration-300"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
