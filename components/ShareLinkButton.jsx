"use client";

import { useState } from "react";
import { LinkIcon } from "@heroicons/react/20/solid";

export default function ShareLinkButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  console.log("[ShareLinkButton] clicked: ", clicked);
  return (
    <button
      onClick={handleClick}
      className="flex gap-1 items-center border px-2 py-1 rounded text-slate-700 text-sm hover:bg-orange-200 hover:text-slate-900"
    >
      <LinkIcon className="h-4 w-4" />
      {clicked ? "Link copied!" : "Share Link"}
    </button>
  );
}
