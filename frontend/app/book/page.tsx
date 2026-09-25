// app/book/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { toEthiopianDate } from "../../lib/ethiopianDate";
import {
  Building2,
  Microscope,
  FlaskConical,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

const USE_MOCK_SUBMIT = false;
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

type ServiceKey = "hospital" | "diagnosis" | "pharma";
type Status =
  | "idle"
  | "sending-otp"
  | "otp-pending"
  | "verifying-otp"
  | "submitting"
  | "success"
  | "error";

const SERVICE_META: Record<
  ServiceKey,
  { label: string; icon: React.ElementType; endpoint: string }
> = {
  hospital: {
    label: "General Hospital",
    icon: Building2,
    endpoint: "/api/book/hospital",
  },
  diagnosis: {
    label: "Diagnosis Center",
    icon: Microscope,
    endpoint: "/api/book/diagnoses",
  },
  pharma: {
    label: "Drug Manufacturing",
    icon: FlaskConical,
    endpoint: "/api/book/pharma",
  },
};

const TIME_SLOTS = [
  {
    value: "Morning (9AM–12PM)",
    label: "Morning (9AM–12PM) — 3:00–6:00 day",
  },
  {
    value: "Afternoon (12PM–4PM)",
    label: "Afternoon (12PM–4PM) — 6:00–10:00 day",
  },
  {
    value: "Evening (4PM–7PM)",
    label: "Evening (4PM–7PM) — 10:00 day–1:00 night",
  },
];

async function getApiError(response: Response, fallback: string) {
  try {
    const body = (await response.json()) as { error?: string };
    return body.error || fallback;
  } catch {
    return fallback;
  }
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}

function formatGregorianDate(dateValue: string) {
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookPageInner />
    </Suspense>
  );
}

function BookPageInner() {
  const searchParams = useSearchParams();
  const initial = (searchParams.get("service") as ServiceKey) || "hospital";
  const [active, setActive] = useState<ServiceKey>(
    initial in SERVICE_META ? initial : "hospital",
  );
  const [status, setStatus] = useState<Status>("idle");
  const [referenceId, setReferenceId] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState(() =>
    crypto.randomUUID(),
  );

  // OTP-related state
  const [pendingPayload, setPendingPayload] = useState<Record<
    string,
    string
  > | null>(null);
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setStatus("idle");
    setPendingPayload(null);
    setOtpCode("");
    setOtpError("");
    setFormError("");
  }, [active]);

  useEffect(() => {
    setIdempotencyKey(crypto.randomUUID());
  }, [active]);

  // Step 1: form submitted → send OTP, hold the form data until verified
  const handleFormSubmit = async (payload: Record<string, string>) => {
    setStatus("sending-otp");
    setPendingPayload(payload);
    setPhone(payload.phone);
    setFormError("");

    try {
      if (USE_MOCK_SUBMIT) {
        await new Promise((res) => setTimeout(res, 800));
      } else {
        const res = await fetch(`${API_BASE}/api/otp/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: payload.phone, purpose: active }),
        });
        if (!res.ok)
          throw new Error(
            await getApiError(res, "Failed to send verification code"),
          );
      }
      setStatus("otp-pending");
    } catch (error) {
      setFormError(getErrorMessage(error));
      setStatus("error");
    }
  };

  // Step 2: user enters the code → verify, then create the actual booking
  const handleVerifyOtp = async () => {
    if (!pendingPayload) return;
    setStatus("verifying-otp");
    setOtpError("");
    setFormError("");

    try {
      if (!USE_MOCK_SUBMIT) {
        const verifyRes = await fetch(`${API_BASE}/api/otp/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, purpose: active, code: otpCode }),
        });
        if (!verifyRes.ok) {
          setOtpError(
            await getApiError(
              verifyRes,
              "Invalid or expired code. Please try again.",
            ),
          );
          setStatus("otp-pending");
          return;
        }
      }

      // OTP confirmed — now actually create the booking
      setStatus("submitting");
      if (USE_MOCK_SUBMIT) {
        await new Promise((res) => setTimeout(res, 1200));
      } else {
        const res = await fetch(`${API_BASE}${SERVICE_META[active].endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
          },
          body: JSON.stringify(pendingPayload),
        });
        if (!res.ok)
          throw new Error(await getApiError(res, "Booking request failed"));

        const data = await res.json();
        if (active === "pharma") {
          setReferenceId(data.data.referenceId);
        }
      }
      if (active !== "pharma") {
        setReferenceId(`AFL-${Date.now().toString(36).toUpperCase()}`);
      }
      setStatus("success");
    } catch (error) {
      setFormError(getErrorMessage(error));
      setStatus("error");
    }
  };

  const handleResendOtp = async () => {
    if (!pendingPayload) return;
    setOtpError("");
    try {
      if (!USE_MOCK_SUBMIT) {
        const res = await fetch(`${API_BASE}/api/otp/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, purpose: active }),
        });
        if (!res.ok) {
          throw new Error(
            await getApiError(
              res,
              "Couldn't resend the code. Please try again.",
            ),
          );
        }
      }
    } catch (error) {
      setOtpError(getErrorMessage(error));
    }
  };

  const onBookAnother = () => {
    setIdempotencyKey(crypto.randomUUID());
    setPendingPayload(null);
    setOtpCode("");
    setFormError("");
    setStatus("idle");
  };

  return (
    <main className="min-h-screen bg-ivory pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
            Book an Appointment
          </h1>
          <p className="mt-3 text-base text-ink/65">
            Choose a service below, then fill in your details — we'll confirm
            within 24 hours.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 rounded-2xl bg-white p-1.5 shadow-[0_2px_12px_rgba(15,23,18,0.06)]">
          {(Object.keys(SERVICE_META) as ServiceKey[]).map((key) => {
            const { label, icon: Icon } = SERVICE_META[key];
            const isActive = key === active;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className={[
                  "flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-xs font-medium transition-colors duration-200 sm:text-sm",
                  isActive
                    ? "bg-sage-600 text-white"
                    : "text-ink/60 hover:bg-sage-50 hover:text-ink",
                ].join(" ")}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-3xl bg-white p-8 shadow-[0_2px_16px_rgba(15,23,18,0.06)] sm:p-10">
          {status === "success" ? (
            <ConfirmationPanel
              service={SERVICE_META[active].label}
              referenceId={referenceId}
              showReferenceId={active === "pharma"}
              onBookAnother={onBookAnother}
            />
          ) : status === "otp-pending" || status === "verifying-otp" ? (
            <OtpPanel
              phone={phone}
              otpCode={otpCode}
              setOtpCode={setOtpCode}
              onVerify={handleVerifyOtp}
              onResend={handleResendOtp}
              verifying={status === "verifying-otp"}
              error={otpError}
            />
          ) : (
            <>
              {active === "hospital" && (
                <HospitalForm status={status} onSubmit={handleFormSubmit} />
              )}
              {active === "diagnosis" && (
                <DiagnosisForm status={status} onSubmit={handleFormSubmit} />
              )}
              {active === "pharma" && (
                <PharmaForm status={status} onSubmit={handleFormSubmit} />
              )}
              {status === "error" && (
                <p className="mt-4 text-center text-sm text-red-600">
                  {formError ||
                    "Something went wrong. Please try again, or contact us directly at +251 911 000 000."}
                  at +251 911 000 000.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

// ── OTP verification panel ──────────────────────────────────────────────
function OtpPanel({
  phone,
  otpCode,
  setOtpCode,
  onVerify,
  onResend,
  verifying,
  error,
}: {
  phone: string;
  otpCode: string;
  setOtpCode: (v: string) => void;
  onVerify: () => void;
  onResend: () => void;
  verifying: boolean;
  error: string;
}) {
  return (
    <div className="flex flex-col items-center py-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-50">
        <ShieldCheck className="h-6 w-6 text-sage-600" strokeWidth={1.75} />
      </span>
      <h2 className="mt-4 text-xl font-semibold text-ink">
        Verify Your Phone Number
      </h2>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/65">
        We sent a 6-digit code to <strong>{phone}</strong>. Enter it below to
        confirm your booking.
      </p>

      <input
        value={otpCode}
        onChange={(e) =>
          setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
        }
        inputMode="numeric"
        placeholder="000000"
        className="mt-6 w-40 rounded-xl border border-sage-200 bg-ivory px-4 py-3 text-center text-2xl tracking-[0.5em] text-ink outline-none focus:border-sage-500 focus:bg-white"
      />

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={onVerify}
        disabled={otpCode.length !== 6 || verifying}
        className="mt-6 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-sage-600 px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:bg-sage-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {verifying && <Loader2 className="h-4 w-4 animate-spin" />}
        {verifying ? "Verifying..." : "Verify & Confirm Booking"}
      </button>

      <button
        type="button"
        onClick={onResend}
        className="mt-4 text-sm font-medium text-sage-700 hover:text-sage-600"
      >
        Resend code
      </button>
    </div>
  );
}

// ── Shared field primitives ─────────────────────────────────────────────
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-sage-200 bg-ivory px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-sage-500 focus:bg-white";

function SubmitButton({ status }: { status: Status }) {
  const busy = status === "sending-otp";
  return (
    <button
      type="submit"
      disabled={busy}
      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage-600 px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:bg-sage-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {busy && <Loader2 className="h-4 w-4 animate-spin" />}
      {busy ? "Sending code..." : "Confirm Booking"}
    </button>
  );
}

// ── Hospital form ─────────────────────────────────────────────────────────
function HospitalForm({
  status,
  onSubmit,
}: {
  status: Status;
  onSubmit: (payload: Record<string, string>) => void;
}) {
  const [department, setDepartment] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [doctors, setDoctors] = useState<{ id: string; name: string }[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  useEffect(() => {
    if (!department) return;
    setLoadingDoctors(true);
    const controller = new AbortController();

    fetch(
      `${API_BASE}/api/doctors?department=${encodeURIComponent(department)}`,
      {
        signal: controller.signal,
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load doctors");
        return res.json();
      })
      .then((json) => setDoctors(json.data))
      .catch((err) => {
        if (err.name !== "AbortError") setDoctors([]);
      })
      .finally(() => setLoadingDoctors(false));

    return () => controller.abort();
  }, [department]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmit(Object.fromEntries(fd.entries()) as Record<string, string>);
      }}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name">
          <input
            name="fullName"
            required
            className={inputClass}
            placeholder="e.g. Selamawit Bekele"
          />
        </Field>
        <Field label="Phone Number">
          <input
            name="phone"
            type="tel"
            required
            className={inputClass}
            placeholder="+251 9xx xxx xxx"
          />
        </Field>
      </div>
      <Field label="Email Address">
        <input
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="you@example.com"
        />
      </Field>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Department">
          <select
            name="department"
            required
            className={inputClass}
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctors([]);
            }}
          >
            <option value="">Select department</option>
            <option>General Medicine</option>
            <option>Cardiology</option>
            <option>Pediatrics</option>
            <option>Orthopedics</option>
            <option>Maternity</option>
            <option>Surgery</option>
          </select>
        </Field>
        <Field label="Preferred Doctor">
          <select
            name="doctorId"
            required
            disabled={!department || loadingDoctors}
            className={inputClass}
          >
            <option value="">
              {!department
                ? "Select department first"
                : loadingDoctors
                  ? "Loading..."
                  : "Select a doctor"}
            </option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Preferred Date">
          <input
            name="preferredDate"
            type="date"
            required
            className={inputClass}
            value={preferredDate}
            onChange={(event) => setPreferredDate(event.target.value)}
          />
          {preferredDate && (
            <span className="text-xs text-ink/55">
              Selected:{" "}
              <span className="text-ink/75">
                {formatGregorianDate(preferredDate)}
              </span>{" "}
              <span className="text-ink/45">
                ({toEthiopianDate(preferredDate)})
              </span>
            </span>
          )}
        </Field>
        <Field label="Preferred Time">
          <select name="preferredTime" required className={inputClass}>
            <option value="">Select a time slot</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Reason for Visit (optional)">
        <textarea
          name="notes"
          rows={3}
          className={inputClass}
          placeholder="Briefly describe your symptoms or reason for the visit"
        />
      </Field>
      <SubmitButton status={status} />
    </form>
  );
}

// ── Diagnosis form ───────────────────────────────────────────────────────
function DiagnosisForm({
  status,
  onSubmit,
}: {
  status: Status;
  onSubmit: (payload: Record<string, string>) => void;
}) {
  const [preferredDate, setPreferredDate] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmit(Object.fromEntries(fd.entries()) as Record<string, string>);
      }}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name">
          <input
            name="fullName"
            required
            className={inputClass}
            placeholder="e.g. Daniel Tesfaye"
          />
        </Field>
        <Field label="Phone Number">
          <input
            name="phone"
            type="tel"
            required
            className={inputClass}
            placeholder="+251 9xx xxx xxx"
          />
        </Field>
      </div>
      <Field label="Email Address">
        <input
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="you@example.com"
        />
      </Field>
      <Field label="Test / Scan Type">
        <select name="testType" required className={inputClass}>
          <option value="">Select a test</option>
          <option>Blood Test</option>
          <option>Digital X-Ray</option>
          <option>CT Scan</option>
          <option>MRI</option>
          <option>Ultrasound</option>
          <option>Other</option>
        </select>
      </Field>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Preferred Date">
          <input
            name="preferredDate"
            type="date"
            required
            className={inputClass}
            value={preferredDate}
            onChange={(event) => setPreferredDate(event.target.value)}
          />
          {preferredDate && (
            <span className="text-xs text-ink/55">
              Selected:{" "}
              <span className="text-ink/75">
                {formatGregorianDate(preferredDate)}
              </span>{" "}
              <span className="text-ink/45">
                ({toEthiopianDate(preferredDate)})
              </span>
            </span>
          )}
        </Field>
        <Field label="Preferred Time">
          <select name="preferredTime" required className={inputClass}>
            <option value="">Select a time slot</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Notes (optional)">
        <textarea
          name="notes"
          rows={3}
          className={inputClass}
          placeholder="Any relevant details for the lab team"
        />
      </Field>
      <SubmitButton status={status} />
    </form>
  );
}

// ── Pharma inquiry form ──────────────────────────────────────────────────
function PharmaForm({
  status,
  onSubmit,
}: {
  status: Status;
  onSubmit: (payload: Record<string, string>) => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmit(Object.fromEntries(fd.entries()) as Record<string, string>);
      }}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Company Name">
          <input
            name="companyName"
            required
            className={inputClass}
            placeholder="e.g. Nile Pharma Distributors"
          />
        </Field>
        <Field label="Contact Person">
          <input
            name="contactPerson"
            required
            className={inputClass}
            placeholder="Full name"
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Business Email">
          <input
            name="businessEmail"
            type="email"
            required
            className={inputClass}
            placeholder="you@company.com"
          />
        </Field>
        <Field label="Phone Number">
          <input
            name="phone"
            type="tel"
            required
            className={inputClass}
            placeholder="+251 9xx xxx xxx"
          />
        </Field>
      </div>
      <Field label="Area of Interest">
        <select name="interestArea" required className={inputClass}>
          <option value="">Select an option</option>
          <option>Bulk / Wholesale Order</option>
          <option>Distribution Partnership</option>
          <option>Formulation Partnership</option>
          <option>Other</option>
        </select>
      </Field>
      <Field label="Estimated Quantity (optional)">
        <input
          name="estimatedQuantity"
          className={inputClass}
          placeholder="e.g. 5,000 units / month"
        />
      </Field>
      <Field label="Message">
        <textarea
          name="message"
          required
          rows={4}
          className={inputClass}
          placeholder="Tell us about your request"
        />
      </Field>
      <SubmitButton status={status} />
    </form>
  );
}

// ── Confirmation panel ───────────────────────────────────────────────────
function ConfirmationPanel({
  service,
  referenceId,
  showReferenceId,
  onBookAnother,
}: {
  service: string;
  referenceId: string;
  showReferenceId: boolean;
  onBookAnother: () => void;
}) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-50">
        <CheckCircle2 className="h-8 w-8 text-sage-600" strokeWidth={1.75} />
      </span>
      <h2 className="mt-5 text-2xl font-semibold text-ink">Request Received</h2>
      <p className="mt-2 max-w-sm text-base leading-relaxed text-ink/65">
        Thank you for reaching out to <strong>{service}</strong>. Our team will
        contact you within 24 hours to confirm the details.
      </p>
      {showReferenceId && (
        <p className="mt-4 rounded-full bg-sage-50 px-4 py-1.5 text-sm font-medium text-sage-700">
          Reference ID: {referenceId}
        </p>
      )}
      <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onBookAnother}
          className="rounded-full border border-sage-200 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-sage-50"
        >
          Book Another
        </button>
        <Link
          href="/"
          className="rounded-full bg-sage-600 px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-sage-700"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
