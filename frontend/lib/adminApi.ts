const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function adminFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  const body = (await response.json().catch(() => ({}))) as {
    success?: boolean;
    data?: T;
    error?: string;
  };

  if (!response.ok) {
    throw new Error(body.error || "Admin request failed");
  }

  return body.data as T;
}

export const adminApiBase = API_BASE;