"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Mail,
  RefreshCw,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export default function VerifyPage() {
  const locale = useLocale();
const t = useTranslations("Verify");
const searchParams = useSearchParams();

const method =
  searchParams.get("method") === "sms"
    ? "sms"
    : "email";

const contact =
  searchParams.get("contact") || "";
  
const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

//   // Change this later when the backend provides the actual method.
//   const method = "email";

//   // Temporary contact information for the UI.
//   const contact = "g********@gmail.com";

  /* ---------------------------
     Countdown timer
  ---------------------------- */
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /* ---------------------------
     OTP input
  ---------------------------- */
  const handleCodeChange = (
    index: number,
    value: string
  ) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);

    setCode(newCode);
    setError("");

    // Move to next input automatically
    if (value && index < 5) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`
      );

      nextInput?.focus();
    }
  };

  /* ---------------------------
     Keyboard navigation
  ---------------------------- */
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const previousInput = document.getElementById(
        `otp-${index - 1}`
      );

      previousInput?.focus();
    }
  };

  /* ---------------------------
     Paste OTP
  ---------------------------- */
  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newCode = ["", "", "", "", "", ""];

    pastedData.split("").forEach((digit, index) => {
      newCode[index] = digit;
    });

    setCode(newCode);
    setError("");

    const nextEmptyIndex = Math.min(
      pastedData.length,
      5
    );

    document
      .getElementById(`otp-${nextEmptyIndex}`)
      ?.focus();
  };

  /* ---------------------------
     Verify OTP
  ---------------------------- */
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const enteredCode = code.join("");

    if (enteredCode.length !== 6) {
      setError(t("invalidCode"));
      return;
    }

    if (timeLeft <= 0) {
      setError(t("codeExpired"));
      return;
    }

    setLoading(true);
    setError("");

    // Temporary frontend verification.
    // Connect this to your backend later.
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    setLoading(false);
    setVerified(true);
  };

  /* ---------------------------
     Resend OTP
  ---------------------------- */
  const handleResend = async () => {
    if (resending || timeLeft > 0) return;

    setResending(true);
    setError("");

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    setCode(["", "", "", "", "", ""]);
    setTimeLeft(60);
    setResending(false);

    document.getElementById("otp-0")?.focus();
  };

  /* ---------------------------
     Verification success
  ---------------------------- */
  if (verified) {
    return (
      <main className="min-h-screen bg-[#f4f8fc] dark:bg-[#071f46]">
        <div className="flex min-h-screen items-center justify-center px-6 py-10">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#18a999]/10">
              <CheckCircle2 className="h-10 w-10 text-[#18a999]" />
            </div>

            <h1 className="text-3xl font-bold text-[#071f46] dark:text-white">
              {t("verificationSuccessful")}
            </h1>

            <p className="mt-4 leading-relaxed text-gray-600 dark:text-white/70">
              {t("verificationDescription")}
            </p>

            <Link
                  href={`/${locale}/reset-password?verified=true&method=${method}&contact=${encodeURIComponent(contact)}`}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#18a999] px-5 py-3.5 font-semibold text-white shadow-lg shadow-[#18a999]/20 transition hover:bg-[#128f82]"
            >
              {t("continueToReset")}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f8fc] dark:bg-[#071f46]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =========================
            LEFT SIDE
        ========================== */}
        <div className="relative hidden min-h-screen overflow-hidden lg:block">
          <Image
            src="/images/hospital/hospital-hero1.jpg"
            alt="Afilas Healthcare"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#041633]/65" />

          <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 text-white xl:p-14">

            {/* Logo */}
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
                  <h1 className="text-2xl font-bold">
                    Afilas Group
                  </h1>

                  <p className="text-sm text-white/80">
                    Healthcare • Diagnostics • Manufacturing
                  </p>
                </div>
              </Link>
            </div>

            {/* Main message */}
            <div className="max-w-xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-[#18a999]" />
                <span>{t("secureVerification")}</span>
              </div>

              <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
                {t("healthJourney")}
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
                {t("verificationMessage")}
              </p>
            </div>

            {/* Privacy */}
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

        {/* =========================
            RIGHT SIDE
        ========================== */}
        <div className="min-h-screen px-6 pt-28 pb-10 sm:px-10 sm:pt-32 lg:px-12 lg:pt-10 lg:flex lg:items-center lg:justify-center gap-6">
        <div className="w-full max-w-md">

            

            {/* Icon */}
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#18a999]/10">
              {method === "email" ? (
                <Mail className="h-7 w-7 text-[#18a999]" />
              ) : (
                <Smartphone className="h-7 w-7 text-[#18a999]" />
              )}
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#071f46] dark:text-white">
                {t("title")}
              </h2>

             <p className="mt-3 leading-relaxed text-gray-600 dark:text-white/70">
               {method === "email"
                 ? t("emailDescription")
                 : t("smsDescription")}
             </p>

              <p className="mt-3 text-sm font-medium text-[#071f46] dark:text-white">
                {contact}
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* OTP */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-[#071f46] dark:text-white">
                  {t("verificationCode")}
                </label>

                <div className="flex justify-between gap-2 sm:gap-3">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleCodeChange(
                          index,
                          e.target.value
                        )
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(index, e)
                      }
                      onPaste={
                        index === 0
                          ? handlePaste
                          : undefined
                      }
                      className="h-14 w-11 rounded-xl border border-gray-200 bg-white text-center text-xl font-bold text-[#071f46] outline-none transition focus:border-[#18a999] focus:ring-2 focus:ring-[#18a999]/20 sm:h-16 sm:w-14 dark:border-white/10 dark:bg-white/10 dark:text-white"
                      aria-label={`${t("verificationCode")} ${
                        index + 1
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Timer */}
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5">

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/60">
                  <Clock3 className="h-4 w-4" />

                  {timeLeft > 0
                    ? t("codeExpires")
                    : t("codeExpired")}
                </div>

                <span className="font-semibold text-[#18a999]">
                  {timeLeft > 0
                    ? `00:${String(timeLeft).padStart(
                        2,
                        "0"
                      )}`
                    : "00:00"}
                </span>

              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                  {error}
                </div>
              )}

              {/* Verify */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-[#18a999] px-5 py-3.5 font-semibold text-white shadow-lg shadow-[#18a999]/20 transition hover:bg-[#128f82] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? t("verifying")
                  : t("verifyCode")}
              </button>
            </form>

            {/* Resend */}
            <div className="mt-6 text-center">

              <p className="text-sm text-gray-500 dark:text-white/50">
                {t("didNotReceive")}
              </p>

              <button
                type="button"
                onClick={handleResend}
                disabled={timeLeft > 0 || resending}
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#18a999] transition hover:text-[#128f82] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    resending ? "animate-spin" : ""
                  }`}
                />

                {resending
                  ? t("resending")
                  : t("resendCode")}
              </button>

            </div>
            {/* Back */}
            <Link
              href={`/${locale}/forgot-password`}
              className="mb-8 inline-flex items-center gap-2 text-base font-medium text-[#18a999] transition-colors hover:text-[#128f82]"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToForgotPassword")}
            </Link>

            {/* Security */}
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