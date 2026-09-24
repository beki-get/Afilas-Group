interface AfilasPageShellProps {
  children: React.ReactNode;
  className?: string;
}

export default function AfilasPageShell({
  children,
  className = "",
}: AfilasPageShellProps) {
  return (
    <main
      className={`
        min-h-screen
        bg-[var(--background)]
        text-[var(--foreground)]
        transition-colors
        duration-300
        ${className}
      `}
    >
      {children}
    </main>
  );
}