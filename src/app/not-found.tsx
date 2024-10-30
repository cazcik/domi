import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="m-auto w-full max-w-xl">
        <div className="px-6">
          <h1 className="text-xl font-bold text-black">404</h1>
          <p className="text-neutral-600">
            oops, looks like that page isn't here.
          </p>
        </div>
      </div>
    </div>
  );
}
