"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function LoginPage() {
 const t = useTranslations("Login");
const locale = useLocale();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const trimmedEmail = email.trim();

  setError("");

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    setError(t("invalidEmail"));
    return;
  }

  // Password validation
  if (!password.trim()) {
    setError(t("invalidPassword"));
    return;
  }

  setLoading(true);

  try {
    // Backend authentication will be connected here later.
    await new Promise((resolve) => setTimeout(resolve, 1200));
  } catch {
    setError(t("loginError"));
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-[#FBFAF7] transition-colors duration-300 dark:bg-[#071f46]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-28 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_70px_rgba(7,31,70,0.12)] dark:bg-[#0b2b55] lg:grid-cols-2">

          {/* LEFT — BRANDING / IMAGE */}
          <div className="relative hidden min-h-[680px] overflow-hidden lg:block">
            <Image
              src="/images/hospital/hospital-hero1.jpg"
              alt="Afilas healthcare"
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-[#071f46]/50" />

            <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
              <div>
                <div className="mb-8 flex items-center gap-3">
                  <Image
                    src="/afilas-logo.jpg"
                    alt="Afilas Group"
                    width={58}
                    height={58}
                    className="rounded-xl object-cover"
                  />

                  <div>
                    <h2 className="text-xl font-bold">Afilas Group</h2>
                    <p className="text-sm text-white/70">
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

                  <p className="mt-6 text-base leading-7 text-white/75">
                    {t("welcomeDescription")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <ShieldCheck className="h-7 w-7 shrink-0 text-[#18a999]" />

                <div>
                  <p className="font-semibold">{t("secureAndPrivate")}</p>
                  <p className="mt-1 text-sm text-white/65">
                    {t("secureDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — LOGIN FORM */}
          <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
            <div className="w-full max-w-md">

              {/* MOBILE BRAND */}
              <div className="mb-10 flex items-center gap-3 lg:hidden">
                <Image
                  src="/afilas-logo.jpg"
                  alt="Afilas Group"
                  width={50}
                  height={50}
                  className="rounded-xl object-cover"
                />

                <div>
                  <h2 className="font-bold text-[#071f46] dark:text-white">
                    Afilas Group
                  </h2>

                  <p className="text-xs text-[#1f2a24]/60 dark:text-white/60">
                    Healthcare • Diagnostics • Manufacturing
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#071f46] dark:text-white sm:text-4xl">
                  {t("title")}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#1f2a24]/60 dark:text-white/65">
                  {t("description")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#1f2a24] dark:text-white"
                  >
                    {t("email")}
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1f2a24]/40 dark:text-white/40" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      className="w-full rounded-xl border border-[#d8e2dc] bg-[#FBFAF7] py-3.5 pl-12 pr-4 text-sm text-[#1f2a24] outline-none transition-all placeholder:text-[#1f2a24]/40 focus:border-[#18a999] focus:ring-4 focus:ring-[#18a999]/10 dark:border-white/15 dark:bg-[#071f46] dark:text-white dark:placeholder:text-white/40"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-[#1f2a24] dark:text-white"
                    >
                      {t("password")}
                    </label>

                    
                  </div>

                  <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1f2a24]/40 dark:text-white/40" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("passwordPlaceholder")}
                      className="w-full rounded-xl border border-[#d8e2dc] bg-[#FBFAF7] py-3.5 pl-12 pr-12 text-sm text-[#1f2a24] outline-none transition-all placeholder:text-[#1f2a24]/40 focus:border-[#18a999] focus:ring-4 focus:ring-[#18a999]/10 dark:border-white/15 dark:bg-[#071f46] dark:text-white dark:placeholder:text-white/40"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword
                          ? t("hidePassword")
                          : t("showPassword")
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1f2a24]/45 transition-colors hover:text-[#18a999] dark:text-white/45"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                 <div className="mt-2 flex justify-end">
                   <Link
                      href={`/${locale}/forgot-password`}
                      className="text-base font-medium text-[#18a999] transition-colors hover:text-[#128f82]"
                    >
                      {t("forgotPassword")}
                    </Link>
                 </div>
                </div>

                {/* REMEMBER ME */}
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 rounded border-[#cbd8d0] accent-[#18a999]"
                  />

                  <span className="text-sm text-[#1f2a24]/65 dark:text-white/65">
                    {t("rememberMe")}
                  </span>
                </label>
                {error && (
                      <div
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300"
                      >
                       {error}
                     </div>
            )}

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#18a999] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#18a999]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#128f82] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? t("loggingIn") : t("login")}

                  {!loading && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </form>

              {/* REGISTER */}
              <div className="mt-8 border-t border-[#dfe7e2] pt-7 text-center dark:border-white/10">
                <p className="text-sm text-[#1f2a24]/60 dark:text-white/60">
                  {t("noAccount")}{" "}
                  <Link
                    href={`/${locale}/register`}
                    className="font-semibold text-[#18a999] hover:text-[#128f82]"
                  >
                    {t("createAccount")}
                  </Link>
                </p>
              </div>

              {/* SECURITY NOTE */}
              <p className="mt-6 text-center text-xs leading-5 text-[#1f2a24]/45 dark:text-white/40">
                {t("securityNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}