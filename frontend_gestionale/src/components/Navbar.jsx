export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <h2 className="text-lg font-medium text-slate-600">Pannello di Controllo</h2>
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
          Admin User
        </div>
      </div>
    </header>
  );
}