export type CarouselSlide = {
  src: string;
  alt: string;
  titleLines: readonly string[];
  subtitle: string;
};

export function slideTitle(slide: CarouselSlide): string {
  return slide.titleLines.join("");
}

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    src: "/photo1.avif",
    alt: "整備作業員が機械を点検している様子",
    titleLines: ["見えない場所を、", "確かな技術で支える。"],
    subtitle: "Reliable expertise, supporting what others don't see.",
  },
  {
    src: "/photo2.avif",
    alt: "工場内でのメンテナンス作業",
    titleLines: ["現場に寄り添う、", "確かな整備力。"],
    subtitle: "Maintenance expertise that stays close to the field.",
  },
  {
    src: "/photo3.avif",
    alt: "精密機器の保守作業",
    titleLines: ["止めないために、", "先回りの技術を。"],
    subtitle: "Proactive engineering to keep operations running.",
  },
];

export const CAROUSEL_INTERVAL_MS = 10000;

export const SITE_NAV_LINKS = [
  { label: "事業内容", href: "#" },
  { label: "会社案内", href: "#" },
  { label: "ニュース", href: "#" },
  { label: "サステナビリティ", href: "#" },
  { label: "採用情報", href: "#" },
] as const;
