const Register = () => {
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 rounded-2xl shadow-lg max-w-3x1 p-5 items-center">
        <h2 className="font-bold text-2x1 text-[#002D74]">Register</h2>
        <form className="flex flex-col gap-4">
          <input
            className="p-2 mt-8 rounded-xl border"
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            className="p-2 rounded-xl border"
            type="username"
            name="username"
            placeholder="User Name"
          />
          <input
            className="p-2 rounded-xl border"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
