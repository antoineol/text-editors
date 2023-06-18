import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Editorjs = dynamic(
  () =>
    import("../components/editors/editorjs/Editorjs").then(
      (exports) => exports.Editorjs
    ),
  { ssr: false }
);

export default function Home() {
  return (
    <main
      className={`flex min-h-screen pb-10 flex-col space-y-3 ${inter.className}`}
    >
      <Editorjs />
    </main>
  );
}
