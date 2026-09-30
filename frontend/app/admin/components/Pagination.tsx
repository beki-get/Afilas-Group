"use client";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--admin-border)] pt-4 text-sm">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-md border border-[var(--admin-border)] px-3 py-2 text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover-bg)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={`h-9 min-w-9 rounded-md px-2 ${pageNumber === page ? "bg-[var(--admin-accent-bg)] text-[var(--admin-accent-text)]" : "text-[var(--admin-text-secondary)] hover:bg-[var(--admin-hover-bg)]"}`}
            >
              {pageNumber}
            </button>
          ),
        )}
      </div>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-md border border-[var(--admin-border)] px-3 py-2 text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover-bg)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
