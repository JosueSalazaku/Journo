"use client";
export function TopNav() {
  
  return (
    <nav className="flex h-20 w-full items-center justify-between bg-primary px-5">
      <div className="flex w-full justify-between items-center gap-3 text-4xl font-bold text-white">
        <h1>Journo</h1>
        <div className="flex justify-end items-center gap-3 text-xl font-bold text-white">
        <h3>Destination</h3>
        <h3>Food</h3>
        <h3>Party</h3>
        </div>
      </div>
    </nav>
  );
}
