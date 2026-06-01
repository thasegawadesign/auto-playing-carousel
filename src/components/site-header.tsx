import { MenuButton } from "@/components/menu-button";
import { SITE_NAV_LINKS } from "@/lib/carousel-slides";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 h-[88px] border-b border-zinc-200/80 bg-white shadow-sm">
      <div className="mx-auto flex h-full w-full items-center justify-between gap-4 px-5 md:px-5">
        <Link href="/" className="inline-flex shrink-0">
          <Image
            src="/logo.png"
            alt="AUTO REPAIR"
            width={1448}
            height={1086}
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>

        <div className="flex items-center gap-2.5 md:gap-3 lg:gap-8">
          <nav
            className="hidden items-center gap-8 text-base font-medium text-black lg:flex"
            aria-label="メインナビゲーション"
          >
            {SITE_NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 md:gap-3">
            <Link
              href="#"
              className={cn(
                "hidden rounded-full bg-primary px-6 py-3 text-base font-semibold whitespace-nowrap text-white md:inline-flex",
                "shadow-sm transition-[background-color,box-shadow] duration-200",
                "hover:bg-primary-hover hover:shadow-md",
              )}
            >
              お問い合わせ
            </Link>

            <MenuButton />
          </div>
        </div>
      </div>
    </header>
  );
}
