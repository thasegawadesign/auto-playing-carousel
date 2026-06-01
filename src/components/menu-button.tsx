import { cn } from "@/lib/utils";

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-2.5 w-[30px]", className)}
      aria-hidden
    >
      <rect width="30" height="1" y="0" fill="currentColor" />
      <rect width="30" height="1" y="4.5" fill="currentColor" />
      <rect width="30" height="1" y="9" fill="currentColor" />
    </svg>
  );
}

export function MenuButton() {
  return (
    <button
      type="button"
      aria-label="メニューを開く"
      className={cn(
        "group flex h-12 shrink-0 flex-col items-center justify-center gap-1.5 px-6 py-2",
        "cursor-pointer rounded-full bg-secondary text-white",
        "shadow-sm transition-[background-color,box-shadow] duration-200",
        "hover:bg-secondary-hover hover:shadow-md",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
      )}
    >
      <HamburgerIcon className="transition-opacity duration-200 group-hover:opacity-90" />
      <span className="text-[10px] leading-none font-medium tracking-[0.12em]">メニュー</span>
    </button>
  );
}
