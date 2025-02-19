import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "introducing domi",
};

export default function Home() {
  return (
    <div className="flex min-h-dvh">
      <div className="m-auto px-5">
        <div>
          <h1 className="text-black dark:text-white text-xl md:text-3xl">
            domi
          </h1>
        </div>
      </div>
    </div>
  );
}
