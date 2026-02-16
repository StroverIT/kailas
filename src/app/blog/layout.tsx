import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог | Кайлас Йогалайф",
  description:
    "Йога практики, знания и събития от Йога център Кайлас. Да приложим познанието на йога за един по-добър живот.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
