const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export type Department = {
  id: string;
  name: string;
  description: string | null;
};

type DepartmentsResponse = {
  success: boolean;
  data: Department[];
};

export async function getDepartments(): Promise<Department[]> {
  const response = await fetch(`${API_BASE_URL}/api/departments`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch departments");
  }

  const result: DepartmentsResponse = await response.json();

  if (!result.success) {
    throw new Error("Failed to fetch departments");
  }

  return result.data;
}