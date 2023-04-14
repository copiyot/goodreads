import Link from "next/link";

import { useBooksQuery } from "../generated/graphql";
import NavBar from "../components/NavBar";

const Home = () => {
  const { data, loading, error } = useBooksQuery();

  return (
    <>
      <NavBar />
      {!data ? (
        <div>Loading....</div>
      ) : (
        <div className="bg-gray-50 min-h-screen md:p-10 p-2">
          <Link
            href="/create_book"
            className="bg-[#002D74] rounded-md text-white p-2 hover:scale-105 duration-300"
          >
            Add Book
          </Link>
          {data.books.map((p) => (
            <div key={p.id}>{p.title}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
