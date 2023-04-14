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
        data.books.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </>
  );
};

export default Home;
