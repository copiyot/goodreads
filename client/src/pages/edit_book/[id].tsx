import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import NavBar from "../../components/NavBar";
import {
  BooksDocument,
  useFetchBookMutation,
  useUpdateBookMutation,
} from "../../generated/graphql";

interface Book {
  id: number;
  title: string;
  author: string;
  collection: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
}

const schema = yup
  .object({
    collection: yup
      .string()
      .matches(/(WANT|READING|READ)/)
      .required("Collection is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const EditBook = () => {
  const [book, setBook] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const [fetchBook] = useFetchBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      fetchBook({
        variables: {
          bookId: parseInt(id as string),
        },
      }).then((data) => setBook(data?.data?.book!));
    }
  }, [fetchBook, id]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { collection } = data;

    const response = await updateBook({
      variables: {
        id: parseInt(id as string),
        collection,
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: BooksDocument,
        },
      ],
    });

    if (response.data?.updateBook?.id) {
      router.push("/");
    }
  };

  if ((book as Book).title === undefined) {
    return <>Loading....</>;
  }

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 min-h-screen md:p-10 p-2">
        <div className="bg-gray-100 rounded-2xl shadow-lg max-w-3x1 p-5 items-center">
          <h2 className="font-bold text-2x1 text-[#002D74]">Edit your book</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-row items-center justify-between mt-10">
              <span className="font-bold text-2x1 text-[#002D74]">Title:</span>
              <span>{(book as Book).title}</span>
            </div>
            <div className="flex flex-row items-center justify-between mt-10">
              <span className="font-bold text-2x1 text-[#002D74]">Author:</span>
              <span>{(book as Book).author}</span>
            </div>
            <div className="flex flex-row items-center justify-between mt-10">
              <span className="font-bold text-2x1 text-[#002D74]">
                Book Cover:
              </span>
              <span>{(book as Book).coverImage}</span>
            </div>
            <div className="flex flex-row items-center justify-between mt-10">
              <span className="font-bold text-2x1 text-[#002D74]">
                Date Created:
              </span>
              <span>{(book as Book).createdAt}</span>
            </div>

            <label
              className="bg-white text-[#002D74] w-72 p-2 flex items-center justify-between rounded"
              htmlFor="collection"
            >
              Select Collection
            </label>
            <select
              id="collection"
              className="p-2 rounded-xl border w-72 font-medium text-[#002D74]"
              defaultValue={
                (book as Book)?.collection === "Want to read"
                  ? "WANT"
                  : (book as Book)?.collection === "Reading"
                  ? "READING"
                  : "READ"
              }
              {...register("collection")}
            >
              <option value="WANT">Want to read</option>
              <option value="READING">Raeding</option>
              <option value="READ">Read</option>
            </select>
            <div className="text-[13px] text-[#bf1650]">
              {errors.collection?.message}
            </div>

            <button className="bg-[#002D74] w-72 rounded-xl text-white py-2 hover:scale-105 duration-300 sm:self-center">
              Edit Book
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBook;
