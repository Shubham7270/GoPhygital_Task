import { useState } from "react";
import { USERS } from "../data/users";

const btoa_safe = (str) => btoa(unescape(encodeURIComponent(str)));

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [shake, setShake] = useState(false);

  //======== Validation =========

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Enter a valid email address";
    }
    if (!password) {
      errs.password = "Password is required";
    }
    return errs;
  };

  // ======= Submit ========

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const user = USERS.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === btoa_safe(password),
    );

    if (!user) {
      setErrors({ form: "Invalid email or password. Please try again." });
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }

    onLogin(user);
  };

  // ======= Field change helper ========

  const clearError = (field) =>
    setErrors((prev) => ({ ...prev, [field]: "", form: "" }));

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-sky-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-950 tracking-tight">
            GoPhygital
          </h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
        </div>

        {/* == Card == */}
        <div
          className={`bg-white rounded-2xl shadow-xl shadow-gray-100 p-8 ${shake ? "animate-shake" : ""}`}
        >
          {/* Form-level error */}
          {errors.form && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
              <span>⚠</span>
              <span>{errors.form}</span>
            </div>
          )}

          {/* === Email field === */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError("email");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="you@school.com"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 
                transition focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400
                ${
                  errors.email
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* ==== Password field ==== */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError("password");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Enter your password"
                className={`w-full px-4 py-2.5 pr-11 rounded-xl border text-sm bg-gray-50
                  transition focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400
                  ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
              />
              <button
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition text-base"
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* === Submit button === */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 
              text-white font-bold text-sm tracking-wide shadow-md shadow-indigo-200
              hover:from-indigo-600 hover:to-violet-700 active:scale-95 transition-all duration-150"
          >
            Sign In →
          </button>

          <p className="text-center text-xs text-gray-400 mt-5">
            Use your email and password to sign in
          </p>
        </div>

        {/* ==== Demo credentials hint ==== */}
        <div className="mt-4 bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-2xl px-5 py-4 text-xs text-gray-500">
          <p className="font-semibold text-gray-700 mb-2">
            Quick demo accounts:
          </p>
          <p className="mb-1">
            👩‍💼 Admin —{" "}
            <code className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">
              rahul.deshmukh@school.com
            </code>
            {" / "}
            <code className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">
              Admin@123
            </code>
          </p>
          <p>
            🎓 Student —{" "}
            <code className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">
              riya.patil@school.com
            </code>
            {" / "}
            <code className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">
              Student@001
            </code>
          </p>
        </div>
      </div>

      {/* === Shake keyframe === */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.5s ease; }
      `}</style>
    </div>
  );
}
