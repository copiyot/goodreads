import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

import { MeDocument, useRegisterMutation } from "../generated/graphql";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("must be a valid email")
      .required("email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

enum UserFields {
  username = "username",
  password = "password",
  email = "email",
}

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [registerUser] = useRegisterMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { email, username, password } = data;

    const response = await registerUser({
      variables: { email, username, password },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: MeDocument,
        },
      ],
    });
    if (response.data?.register.errors) {
      for (const userError of response.data?.register.errors) {
        setError(userError.field as UserFields, {
          type: "custom",
          message: userError.message,
        });
      }
    } else if (response.data?.register.user) {
      router.push("/");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 rounded-2xl shadow-lg max-w-3x1 p-5 items-center">
        <h2 className="font-bold text-2x1 text-[#002D74]">Register</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="p-2 mt-8 rounded-xl border"
            type="text"
            {...register("email")}
            placeholder="Email"
          />
          <div className="text-[13px] text-[#bf1650]">
            {errors.email?.message}
          </div>
          <input
            className="p-2 rounded-xl border"
            type="text"
            placeholder="User Name"
            {...register("username")}
          />
          <div className="text-[13px] text-[#bf1650]">
            {errors.username?.message}
          </div>
          <input
            className="p-2 rounded-xl border"
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          <div className="text-[13px] text-[#bf1650]">
            {errors.password?.message}
          </div>
          <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
