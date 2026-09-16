import React from "react";

export default function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <footer className="w-full">
      <div className="bg-gray-100 relative p-3 ındex-20">
        <p className="text-gray-600">Copyright © {year}</p>
      </div>
    </footer>
  );
}
