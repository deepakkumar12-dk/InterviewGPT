function FeatureCard({ icon, title, description }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:bg-violet-500/10">

      <div className="mb-6 text-5xl">
        {icon}
      </div>

      <h3 className="mb-4 text-2xl font-bold text-white">
        {title}
      </h3>

      <p className="leading-7 text-slate-400">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;