import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

import NavBar from "../components/NavBar";
import { BooksDocument, useCreateBookMutation } from "../generated/graphql";

const schema = yup
  .object({
    title: yup.string().required("Title is required"),
    author: yup.string().required("Author is required"),
    coverImage: yup.string().required("Cover image is required"),
    collection: yup
      .string()
      .matches(/(WANT|READING|READ)/)
      .required("Collection is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const CreateBook = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [createBook] = useCreateBookMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { title, author, coverImage, collection } = data;

    const response = await createBook({
      variables: {
        title,
        author,
        coverImage,
        collection,
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: BooksDocument,
        },
      ],
    });

    if (response.data?.createBook?.id) {
      router.push("/");
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 min-h-screen md:p-10 p-2">
        <div className="bg-gray-100 rounded-2xl shadow-lg max-w-3x1 p-5 items-center">
          <h2 className="font-bold text-2x1 text-[#002D74]">
            Add a book you&apos;d love to read
          </h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="p-2 mt-8 rounded-xl border"
              type="text"
              {...register("title")}
              placeholder="Book title"
            />
            <div className="text-[13px] text-[#bf1650]">
              {errors.title?.message}
            </div>
            <input
              className="p-2 rounded-xl border"
              type="text"
              placeholder="Book author"
              {...register("author")}
            />
            <div className="text-[13px] text-[#bf1650]">
              {errors.author?.message}
            </div>
            <input
              className="p-2 rounded-xl border"
              type="text"
              {...register("coverImage")}
              placeholder="Book cover"
            />
            <div className="text-[13px] text-[#bf1650]">
              {errors.coverImage?.message}
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
              Add Book
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBook;
