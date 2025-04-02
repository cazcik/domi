import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/index";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Domi: Secure your apps easily." }];
}

export default function Home() {
  const [demoIsOpen, setDemoIsOpen] = useState(false);
  return (
    <div className="m-auto w-full">
      <div>
        <div className="mx-auto flex max-w-sm flex-col px-7 sm:max-w-md md:max-w-xl lg:max-w-3xl">
          <div className="flex flex-col items-center justify-center">
            <h1 className="pb-4 text-center text-3xl font-bold text-neutral-900 sm:pb-5 sm:text-4xl md:pb-6 md:text-5xl lg:text-6xl">
              Securing your app just got a whole lot easier.
            </h1>
            <p className="text-center text-sm text-neutral-500 sm:text-base md:text-lg lg:text-xl">
              Meet the plain and simple way to manage your apps and apis
              security posture; without completely crushing your soul.
            </p>
          </div>
          <div className="flex items-center justify-center gap-x-8 pt-10 sm:pt-12 md:pt-14 lg:gap-x-10 lg:pt-16">
            <Link
              to="/sign-up"
              className="text-sm text-neutral-600 hover:text-neutral-900 sm:text-base md:text-lg lg:text-xl"
            >
              Get started &rarr;
            </Link>
            <button
              onClick={() => setDemoIsOpen(true)}
              className="flex text-sm text-neutral-600 hover:text-neutral-900 sm:text-base md:text-lg lg:text-xl"
            >
              Watch demo
            </button>
          </div>
        </div>
      </div>
      <Dialog
        open={demoIsOpen}
        onClose={() => setDemoIsOpen(false)}
        className="relative z-50 focus:outline-none"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-7 text-center">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-7 py-7 text-left shadow-xl"
            >
              <div>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=3PMhMRdOhFaOyyUg"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
