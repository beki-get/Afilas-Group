
"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ShieldCheck,
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function RegisterPage() {
  const t = useTranslations("Register");
  const locale = useLocale();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white/90 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#18a999] focus:ring-2 focus:ring-[#18a999]/20 dark:border-white/10 dark:bg-[#102f5d]/90 dark:text-white";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setError("");
  setSuccess(false);

  const fullName = formData.fullName.trim();
  const email = formData.email.trim();
  const phone = formData.phone.trim();
  const password = formData.password;
  const confirmPassword = formData.confirmPassword;

  // Full name validation
  if (fullName.length < 2) {
    setError(t("invalidFullName"));
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setError(t("invalidEmail"));
    return;
  }

  // Phone validation
  const phoneRegex = /^\+?[0-9\s-]{9,15}$/;

  if (!phoneRegex.test(phone)) {
    setError(t("invalidPhone"));
    return;
  }

  // Password length
  if (password.length < 8) {
    setError(t("passwordTooShort"));
    return;
  }

  // Password confirmation
  if (password !== confirmPassword) {
    setError(t("passwordMismatch"));
    return;
  }

  setLoading(true);

  try {
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  const response = await fetch(`${apiBase}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: fullName,
      email,
      phone,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || data?.message || t("registrationError"));
  }

  setSuccess(true);

  setFormData({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
} catch (error) {
  setError(
    error instanceof Error
      ? error.message
      : t("registrationError")
  );
} finally {
  setLoading(false);
}
};

  return (
    <main className="min-h-screen bg-[#f3f7f1] pt-24 dark:bg-[#071f46] lg:pt-28">
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-[#0b2852] lg:grid-cols-2">

        {/* Left: Background image and welcome content */}
        <div className="relative hidden min-h-[750px] overflow-hidden lg:block">
          <Image
            src="/images/hospital/hospital-hero1.jpg"
            alt="Afilas healthcare"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#071f46]/65 via-[#071f46]/35 to-[#071f46]/10" />

          <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
            <div>
              <div className="mb-10 flex items-center gap-3">
                <Image
                  src="/afilas-logo.jpg"
                  alt="Afilas Group"
                  width={58}
                  height={58}
                  className="rounded-xl object-cover"
                />

                <div>
                  <h2 className="text-xl font-bold">
                    Afilas Group
                  </h2>
                  <p className="text-sm text-white/75">
                    Healthcare • Diagnostics • Manufacturing
                  </p>
                </div>
              </div>

              <div className="max-w-md">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#18a999]">
                  {t("secureAccess")}
                </p>

                <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                  {t("welcomeTitle")}
                </h1>

                <p className="mt-6 text-base leading-7 text-white/80">
                  {t("welcomeDescription")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
              <ShieldCheck className="h-7 w-7 shrink-0 text-[#18a999]" />

              <div>
                <p className="font-semibold">
                  {t("secureAndPrivate")}
                </p>
                <p className="mt-1 text-sm text-white/75">
                  {t("secureDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Registration form */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">

            <div className="mb-8 lg:hidden">
              <Image
                src="/afilas-logo.jpg"
                alt="Afilas Group"
                width={58}
                height={58}
                className="mb-4 rounded-xl object-cover"
              />
              <h1 className="text-2xl font-bold text-[#071f46] dark:text-white">
                Afilas Group
              </h1>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#071f46] dark:text-white">
                {t("title")}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-white/70">
                {t("description")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-white/90">
                  {t("fullName")}
                </label>

                <div className="relative">
                  <UserRound className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t("fullNamePlaceholder")}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-white/90">
                  {t("email")}
                </label>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("emailPlaceholder")}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-white/90">
                  {t("phone")}
                </label>

                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("phonePlaceholder")}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-white/90">
                  {t("password")}
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t("passwordPlaceholder")}
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#18a999]"
                    aria-label={
                      showPassword
                        ? t("hidePassword")
                        : t("showPassword")
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-white/90">
                  {t("confirmPassword")}
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder={t("confirmPasswordPlaceholder")}
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#18a999]"
                    aria-label={
                      showConfirmPassword
                        ? t("hidePassword")
                        : t("showPassword")
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {/* FORM MESSAGE */}
             {error && (
             <div
               role="alert"
               className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300"
             >
              {error}
             </div>
            )}

           {success && (
             <div
                 role="status"
                 className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300"
             >
                 {t("registrationSuccess")}
                 </div>
             )}

              {/* Submit */}
              <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#071f46] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#071f46]/20 transition hover:bg-[#18a999] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#18a999] dark:hover:bg-[#148f82]"
                 >
                 {loading ? t("registering") : t("registerButton")}

                 {!loading && (
                 <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  )}
               </button>
            </form>

            {/* Login link */}
            <p className="mt-8 text-center text-sm text-slate-600 dark:text-white/70">
              {t("alreadyHaveAccount")}{" "}
              <Link
                href={`/${locale}/login`}
                className="font-semibold text-[#18a999] hover:underline"
              >
                {t("login")}
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}