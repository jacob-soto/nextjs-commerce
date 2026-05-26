import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import "../globals.css";

export const metadata = {
  title: {
    default: "body.app",
    template: "%s | body.app",
  },
  description:
    "Map-based social platform with designer clothing, intimates, and athletics shops",
};

export default function BodyLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-zinc-950 text-white antialiased selection:bg-pink-500/40">
        {children}
      </body>
    </html>
  );
}
