import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "За нас | Кайлас Йогалайф",
  description:
    "Йога център Кайлас – вдъхновен от опита да трансформираме живота. Мариана Кърлова (Даятма), Бихарска школа по йога.",
};

export default function ZaNasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
