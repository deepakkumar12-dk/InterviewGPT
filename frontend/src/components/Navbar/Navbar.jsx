function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 backdrop-blur-md bg-slate-950/70">
      <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Interview
          <span className="text-violet-500">
            GPT
          </span>
        </h1>

        <nav className="hidden md:flex gap-10 text-gray-300">

          <a href="#" className="hover:text-violet-400">
            Home
          </a>

          <a href="#" className="hover:text-violet-400">
            Features
          </a>

          <a href="#" className="hover:text-violet-400">
            Pricing
          </a>

          <a href="#" className="hover:text-violet-400">
            Contact
          </a>

        </nav>

        <button
          className="
          bg-violet-600
          hover:bg-violet-700
          px-6
          py-3
          rounded-xl
          font-semibold
          transition
          "
        >
          Get Started
        </button>

      </div>
    </header>
  );
}

export default Navbar;