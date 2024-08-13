import { useEffect, useState } from "react";
import ReactLogo from "../assets/react.svg";
import InputForm from "../components/input-form";
import toast from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Check if user already login
  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleLogin = () => {
    // Validation if username and password is empty
    if (username === "" || password === "") {
      toast.error("Username dan Password tidak boleh kosong");
      return;
    }

    // Validation if username and password is incorrect
    if (username === "admin" && password === "admin") {
      toast.success("Login Berhasil");
      localStorage.setItem("isLogin", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({
          username,
          password,
          nama_lengkap: "Admin Ganteng",
          role: "admin",
        })
      );

      window.location.href = "/dashboard";
    } else {
      toast.error("Username atau Password salah");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-50 dark:bg-slate-600">
      <div className="bg-white dark:bg-slate-700 p-8 rounded-xl w-[500px]">
        <div className="flex flex-col gap-y-2">
          <div className="w-14">
            <img src={ReactLogo} alt="React Logo" className="w-full" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-zinc-700 dark:text-slate-200 font-medium text-lg">
              Halo! Selamat Datang Kembali
            </h1>
            <h1 className="text-zinc-700 dark:text-slate-200 text-sm">
              Silahkan masukan username dan password anda untuk melanjutkan.
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 mt-6">
          <InputForm
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputForm
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-xl text-sm font-medium p-2"
            onClick={handleLogin}
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
