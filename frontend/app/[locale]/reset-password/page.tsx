"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

export default function ResetPasswordPage() {
  const locale = useLocale();
  const t = useTranslations("ResetPassword");
  const router = useRouter();
  const searchParams = useSearchParams();

  const verified = searchParams.get("verified") === "true";
   useEffect(() => {
              if (!verified) {
                    router.replace(`/${locale}/forgot-password`);
               }
          }, [verified, locale, router]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = () => {
    if (!password) return 0;

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (password.length < 8) {
      setError(t("passwordTooShort"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }

    setLoading(true);

    // Temporary frontend behavior.
    // Connect this to your backend reset-password API later.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setSubmitted(true);
  };

  const resetForm = () => {
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-[#f4f8fc] dark:bg-[#071f46]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="relative hidden min-h-screen overflow-hidden lg:block">
          <Image
            src="/images/hospital/hospital-hero1.jpg"
            alt="Afilas Healthcare"
            fill
            priority
            className="object-cover"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-[#041633]/65" />

          <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 text-white xl:p-14">
            {/* Logo / Branding */}
            <div>
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-3"
              >
                <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white p-1 shadow-lg">
                  <Image
                    src="/afilas-logo.jpg"
                    alt="Afilas Group"
                    fill
                    className="object-contain"
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold">Afilas Group</h1>
                  <p className="text-sm text-white/80">
                    Healthcare • Diagnostics • Manufacturing
                  </p>
                </div>
              </Link>
            </div>

            {/* Main text */}
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-[#18a999]" />
                <span>{t("secureAccount")}</span>
              </div>

              <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
                {t("healthJourney")}
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
                {t("recoveryDescription")}
              </p>
            </div>

            {/* Privacy message */}
            <div className="max-w-md rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#18a999]/20">
                  <ShieldCheck className="h-5 w-5 text-[#18a999]" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {t("privacyTitle")}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-white/70">
                    {t("privacyDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">
            {!submitted ? (
              <>
                {/* Back to Login */}
                <Link
                  href={`/${locale}/login`}
                  className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#18a999] transition-colors hover:text-[#128f82]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t("backToLogin")}
                </Link>

                {/* Header */}
                <div className="mb-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#18a999]/10">
                    <LockKeyhole className="h-7 w-7 text-[#18a999]" />
                  </div>

                  <h2 className="text-3xl font-bold text-[#071f46] dark:text-white">
                    {t("title")}
                  </h2>

                  <p className="mt-3 leading-relaxed text-gray-600 dark:text-white/70">
                    {t("description")}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* New Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-semibold text-[#071f46] dark:text-white"
                    >
                      {t("newPassword")}
                    </label>

                    <div className="relative">
                      <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("newPasswordPlaceholder")}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-12 text-gray-900 outline-none transition focus:border-[#18a999] focus:ring-2 focus:ring-[#18a999]/20 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/40"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#18a999]"
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

                    {/* Password strength */}
                    {password && (
                      <div className="mt-3">
                        <div className="mb-2 flex gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`h-1.5 flex-1 rounded-full ${
                                level <= passwordStrength
                                  ? "bg-[#18a999]"
                                  : "bg-gray-200 dark:bg-white/10"
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-xs text-gray-500 dark:text-white/50">
                          {passwordStrength <= 2
                            ? t("weakPassword")
                            : passwordStrength <= 3
                              ? t("mediumPassword")
                              : t("strongPassword")}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-semibold text-[#071f46] dark:text-white"
                    >
                      {t("confirmPassword")}
                    </label>

                    <div className="relative">
                      <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        placeholder={t("confirmPasswordPlaceholder")}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-12 text-gray-900 outline-none transition focus:border-[#18a999] focus:ring-2 focus:ring-[#18a999]/20 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/40"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#18a999]"
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

                  {/* Error */}
                  {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                      {error}
                    </div>
                  )}

                  {/* Password requirements */}
                  <div className="rounded-xl border border-gray-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                    <p className="mb-3 text-sm font-semibold text-[#071f46] dark:text-white">
                      {t("passwordRequirements")}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/60">
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            password.length >= 8
                              ? "text-[#18a999]"
                              : "text-gray-300 dark:text-white/20"
                          }`}
                        />
                        {t("minimumCharacters")}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/60">
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            /[A-Z]/.test(password)
                              ? "text-[#18a999]"
                              : "text-gray-300 dark:text-white/20"
                          }`}
                        />
                        {t("uppercaseLetter")}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/60">
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            /[0-9]/.test(password)
                              ? "text-[#18a999]"
                              : "text-gray-300 dark:text-white/20"
                          }`}
                        />
                        {t("number")}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/60">
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            /[^A-Za-z0-9]/.test(password)
                              ? "text-[#18a999]"
                              : "text-gray-300 dark:text-white/20"
                          }`}
                        />
                        {t("specialCharacter")}
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-xl bg-[#18a999] px-5 py-3.5 font-semibold text-white shadow-lg shadow-[#18a999]/20 transition hover:bg-[#128f82] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? t("resetting") : t("resetPassword")}
                  </button>
                </form>
              </>
            ) : (
              /* SUCCESS STATE */
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#18a999]/10">
                  <CheckCircle2 className="h-10 w-10 text-[#18a999]" />
                </div>

                <h2 className="text-3xl font-bold text-[#071f46] dark:text-white">
                  {t("successTitle")}
                </h2>

                <p className="mt-4 leading-relaxed text-gray-600 dark:text-white/70">
                  {t("successDescription")}
                </p>

                <Link
                  href={`/${locale}/login`}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#18a999] px-5 py-3.5 font-semibold text-white shadow-lg shadow-[#18a999]/20 transition hover:bg-[#128f82]"
                >
                  {t("returnToLogin")}
                </Link>

                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-4 text-sm font-medium text-[#18a999] transition hover:text-[#128f82]"
                >
                  {t("resetAgain")}
                </button>
              </div>
            )}

            {/* Bottom security note */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-white/40">
              <ShieldCheck className="h-4 w-4" />
              {t("securityNote")}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}