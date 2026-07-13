import {
  FaGoogle,
  FaMicrosoft,
  FaAmazon,
  FaBuilding,
} from "react-icons/fa";

function TrustedCompanies() {
  const companies = [
    { icon: <FaGoogle />, name: "Google" },
    { icon: <FaMicrosoft />, name: "Microsoft" },
    { icon: <FaAmazon />, name: "Amazon" },
    { icon: <FaBuilding />, name: "Infosys" },
    { icon: <FaBuilding />, name: "TCS" },
    { icon: <FaBuilding />, name: "Accenture" },
  ];

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-8">

        <p className="text-center text-slate-400 text-lg mb-14">
          Trusted by{" "}
          <span className="text-violet-400 font-bold">
            10,000+
          </span>{" "}
          candidates
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

          {companies.map((company) => (
            <div
              key={company.name}
              className="rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col items-center hover:border-violet-500 hover:bg-violet-500/10 transition"
            >
              <div className="text-5xl text-violet-400 mb-4">
                {company.icon}
              </div>

              <p>{company.name}</p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TrustedCompanies;