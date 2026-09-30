"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Smartphone,
  ShieldCheck,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";

type RecoveryMethod = "sms" | "email";

export default function ForgotPasswordPage() {
  const locale = useLocale();
  const t = useTranslations("ForgotPassword");

  const [method, setMethod] = useState<RecoveryMethod>("sms");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const trimmedContact = contact.trim();

  // Validate email
  if (method === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedContact)) {
      setError(t("invalidEmail"));
      return;
    }
  }

  // Validate phone
  if (method === "sms") {
    const phoneRegex = /^\+?[0-9\s-]{9,15}$/;

    if (!phoneRegex.test(trimmedContact)) {
      setError(t("invalidPhone"));
      return;
    }
  }

  setError("");
  setLoading(true);

  // Temporary frontend behavior.
  // Later this will call your backend API.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const encodedContact = encodeURIComponent(trimmedContact);

  window.location.href =
    `/${locale}/verify?method=${method}&contact=${encodedContact}`;
};

  const resetForm = () => {
    setSubmitted(false);
    setContact("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-[#FBFAF7] transition-colors duration-300 dark:bg-[#071f46]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_70px_rgba(7,31,70,0.12)] dark:bg-[#0b2b55] lg:grid-cols-2">

          {/* LEFT: BRANDING AND BACKGROUND IMAGE */}
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

                    <p className="text-sm text-white/70">
                      Healthcare • Diagnostics • Manufacturing
                    </p>
                  </div>
                </div>

                <div className="max-w-md">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#18a999]">
                    {t("accountRecovery")}
                  </p>

                  <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                    {t("healthJourney")}
                  </h1>

                  <p className="mt-6 text-base leading-7 text-white/75">
                    {t("recoveryDescription")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <ShieldCheck className="h-7 w-7 shrink-0 text-[#18a999]" />

                <div>
                  <p className="font-semibold">
                    {t("privacyTitle")}
                  </p>

                  <p className="mt-1 text-sm text-white/65">
                    {t("privacyDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: RECOVERY FORM */}
          <div className="flex items-center justify-center p-6 sm:p-12 lg:p-16">
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

              {!submitted ? (
                <>
                  {/* HEADER */}
                  <div className="mb-8">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#18a999]/10">
                      <LockKeyhole className="h-7 w-7 text-[#18a999]" />
                    </div>

                    <h2 className="text-3xl font-bold text-[#071f46] dark:text-white sm:text-4xl">
                      {t("title")}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[#1f2a24]/60 dark:text-white/65">
                      {t("description")}
                    </p>
                  </div>

                  {/* RECOVERY METHOD */}
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setMethod("sms");
                        setContact("");
                        setError("");
                      }}
                      className={`flex items-center justify-center gap-2 rounded-xl border p-4 text-sm font-semibold transition-all ${
                        method === "sms"
                          ? "border-[#18a999] bg-[#18a999]/10 text-[#128f82] dark:text-[#4de0cc]"
                          : "border-[#d8e2dc] text-[#1f2a24]/65 hover:border-[#18a999] dark:border-white/15 dark:text-white/65"
                      }`}
                    >
                      <Smartphone className="h-5 w-5" />
                      {t("sms")}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMethod("email");
                        setContact("");
                        setError("");
                      }}
                      className={`flex items-center justify-center gap-2 rounded-xl border p-4 text-sm font-semibold transition-all ${
                        method === "email"
                          ? "border-[#18a999] bg-[#18a999]/10 text-[#128f82] dark:text-[#4de0cc]"
                          : "border-[#d8e2dc] text-[#1f2a24]/65 hover:border-[#18a999] dark:border-white/15 dark:text-white/65"
                      }`}
                    >
                      <Mail className="h-5 w-5" />
                      {t("email")}
                    </button>
                  </div>

                  {/* FORM */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="contact"
                        className="mb-2 block text-sm font-medium text-[#1f2a24] dark:text-white"
                      >
                        {method === "sms"
                          ? t("registeredPhone")
                          : t("registeredEmail")}
                      </label>

                      <div className="relative">
                        {method === "sms" ? (
                          <Smartphone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1f2a24]/40 dark:text-white/40" />
                        ) : (
                          <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1f2a24]/40 dark:text-white/40" />
                        )}

                        <input
                          id="contact"
                          name="contact"
                          type={method === "sms" ? "tel" : "email"}
                          required
                          autoComplete={
                            method === "sms"
                              ? "tel"
                              : "email"
                          }
                          value={contact}
                          onChange={(e) => {
                            setContact(e.target.value);
                            setError("");
                          }}
                          placeholder={
                            method === "sms"
                              ? "+251 9XX XXX XXX"
                              : "you@example.com"
                          }
                          className="w-full rounded-xl border border-[#d8e2dc] bg-[#FBFAF7] py-3.5 pl-12 pr-4 text-sm text-[#1f2a24] outline-none transition-all placeholder:text-[#1f2a24]/40 focus:border-[#18a999] focus:ring-4 focus:ring-[#18a999]/10 dark:border-white/15 dark:bg-[#071f46] dark:text-white dark:placeholder:text-white/40"
                        />
                      </div>

                      <p className="mt-2 text-xs leading-5 text-[#1f2a24]/50 dark:text-white/50">
                        {method === "sms"
                          ? t("phoneHelp")
                          : t("emailHelp")}
                      </p>
                    </div>

                    {error && (
                      <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-300">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !contact.trim()}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#18a999] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#18a999]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#128f82] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading
                        ? t("sending")
                        : method === "sms"
                        ? t("sendSmsCode")
                        : t("sendResetLink")}

                      {!loading && (
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </button>
                  </form>

                  {/* BACK TO LOGIN */}
                  <div className="mt-8 border-t border-[#dfe7e2] pt-7 text-center dark:border-white/10">
                    <Link
                      href={`/${locale}/login`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#18a999] transition-colors hover:text-[#128f82]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {t("backToLogin")}
                    </Link>
                  </div>

                  {/* SECURITY NOTE */}
                  <p className="mt-6 text-center text-xs leading-5 text-[#1f2a24]/45 dark:text-white/40">
                    <ShieldCheck className="mr-1 inline h-4 w-4" />
                    {t("securityNote")}
                  </p>
                </>
              ) : (
                /* CONFIRMATION SCREEN */
                <div className="py-8 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#18a999]/10">
                    <CheckCircle2 className="h-10 w-10 text-[#18a999]" />
                  </div>

                  <h2 className="text-3xl font-bold text-[#071f46] dark:text-white">
                    {t("requestSubmitted")}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[#1f2a24]/60 dark:text-white/65">
                    {t("requestDescription")}
                  </p>

                  <div className="mt-6 rounded-xl border border-[#18a999]/20 bg-[#18a999]/5 p-4 text-left">
                    <p className="text-sm font-semibold text-[#071f46] dark:text-white">
                      {t("recoveryMethod")}
                    </p>

                    <p className="mt-1 break-all text-sm text-[#1f2a24]/60 dark:text-white/60">
                      {method === "sms"
                        ? t("sms")
                        : t("email")}{" "}
                      • {contact}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-6 text-sm font-semibold text-[#18a999] hover:text-[#128f82]"
                  >
                    {t("tryAnotherMethod")}
                  </button>

                  <Link
                    href={`/${locale}/login`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#18a999] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#128f82]"
                  >
                    {t("returnToLogin")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}