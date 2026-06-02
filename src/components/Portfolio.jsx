export default function Portfolio() {
  const projects = [
    {
      title: "Energy Engine",
      description:
        "A physiological state modeling system that maps recovery, activity, HRV, sleep, and energy into actionable states.",
      stack: ["Python", "Astro", "JSON", "Analytics"],
      link: "https://icynatural.github.io/Energy_Engine/",
    },
    {
      title: "Potent Library",
      description:
        "A semantic atmosphere system for mapping language by texture, symbolism, sound, and emotional gravity instead of only dictionary meaning.",
      stack: ["Linguistics", "AI", "Semantic Systems"],
      link: "#",
    },
    {
      title: "Inquiry Engine",
      description:
        "A retrieval and synthesis engine for memory, semantic search, and cross-domain reasoning using embeddings and structured cognition modes.",
      stack: ["Python", "ChromaDB", "Embeddings", "AI"],
      link: "#",
    },
    {
      title: "Automation Systems",
      description:
        "Workflow automation using PowerShell, Linux, and scripting for rapid project generation, organization, and tooling.",
      stack: ["PowerShell", "Linux", "Automation"],
      link: "#",
    },
  ];

  const skills = {
    Infrastructure: [
      "Linux",
      "Windows",
      "Networking",
      "Virtualization",
      "Active Directory",
    ],
    Development: [
      "Python",
      "JavaScript",
      "HTML/CSS",
      "Astro",
      "PowerShell",
    ],
    Security: [
      "Cybersecurity",
      "System Hardening",
      "Threat Analysis",
      "Automation",
    ],
    Research: [
      "Semantic Systems",
      "Linguistics",
      "Human-Computer Interaction",
      "Energy Modeling",
    ],
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-500 blur-3xl" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <nav className="flex items-center justify-between mb-20">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Chad Hamilton</h1>
            <p className="text-sm text-cyan-300/80">Cybersecurity • Automation • Systems Development</p>
          </div>

          <div className="flex gap-4 text-sm">
            <a
              href="https://github.com/icyNatural"
              className="border border-cyan-400/30 px-4 py-2 rounded-xl hover:bg-cyan-400/10 transition"
            >
              GitHub
            </a>
            <button className="bg-cyan-400 text-black px-4 py-2 rounded-xl font-medium hover:scale-105 transition">
              Resume
            </button>
          </div>
        </nav>

        <section className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          <div>
            <div className="inline-flex items-center gap-2 border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 rounded-full mb-6 text-sm text-cyan-200">
              <div className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
              Building automation systems and technical tools
            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
              Chad
              <span className="text-cyan-300"> Hamilton</span>
            </h1>

            <p className="text-xl text-zinc-300 leading-relaxed max-w-2xl mb-10">
              Systems-focused developer with interests in cybersecurity, automation, software tooling, semantic systems, and intelligent interfaces.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-cyan-300 text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition shadow-2xl shadow-cyan-500/20">
                View Projects
              </button>

              <button className="border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-2xl hover:bg-white/10 transition">
                Contact
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="border border-cyan-400/20 bg-white/5 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl shadow-cyan-500/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">System Overview</h2>
                <div className="text-xs text-cyan-300">LIVE STRUCTURE</div>
              </div>

              <div className="space-y-4">
                {[
                  ["Energy Engine", "92%"],
                  ["Semantic Mapping", "87%"],
                  ["Automation Systems", "94%"],
                  ["Interface Design", "81%"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>{label}</span>
                      <span className="text-cyan-300">{value}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-300 rounded-full"
                        style={{ width: value }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="border border-white/10 rounded-2xl p-4 bg-black/20">
                  <div className="text-3xl font-bold text-cyan-300">4+</div>
                  <div className="text-sm text-zinc-400">Core Systems</div>
                </div>

                <div className="border border-white/10 rounded-2xl p-4 bg-black/20">
                  <div className="text-3xl font-bold text-cyan-300">10+</div>
                  <div className="text-sm text-zinc-400">Automation Tools</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <div className="mb-12">
            <div className="text-cyan-300 text-sm uppercase tracking-[0.3em] mb-4">
              Featured Work
            </div>
            <h2 className="text-5xl font-black">Projects</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                className="group border border-white/10 bg-white/5 backdrop-blur-2xl rounded-3xl p-8 hover:border-cyan-300/40 hover:bg-cyan-300/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-3xl font-bold group-hover:text-cyan-300 transition">
                    {project.title}
                  </h3>

                  <div className="text-cyan-300 text-xl">↗</div>
                </div>

                <p className="text-zinc-300 leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.stack.map((item) => (
                    <div
                      key={item}
                      className="px-3 py-1 rounded-full text-sm border border-cyan-400/20 bg-cyan-400/5 text-cyan-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-32">
          <div className="mb-12">
            <div className="text-cyan-300 text-sm uppercase tracking-[0.3em] mb-4">
              Capability Map
            </div>
            <h2 className="text-5xl font-black">Skills</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-6"
              >
                <h3 className="text-xl font-bold text-cyan-300 mb-6">
                  {category}
                </h3>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item}
                      className="text-zinc-300 border-b border-white/5 pb-2"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-32 mb-20">
          <div className="border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/5 backdrop-blur-2xl rounded-[40px] p-10 lg:p-16 text-center">
            <div className="text-cyan-300 text-sm uppercase tracking-[0.3em] mb-6">
              About
            </div>

            <h2 className="text-5xl font-black mb-8">
              Building technical systems and intelligent tools.
            </h2>

            <p className="max-w-3xl mx-auto text-xl text-zinc-300 leading-relaxed mb-10">
              My work focuses on automation, software systems, cybersecurity concepts, semantic tooling, and interface design. I enjoy building projects that turn technical ideas into usable systems and experiences.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="mailto:Chadnatural1@gmail.com"
                className="bg-cyan-300 text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
              >
                Contact Me
              </a>

              <a
                href="https://github.com/icyNatural"
                className="border border-white/10 bg-white/5 px-6 py-3 rounded-2xl hover:bg-white/10 transition"
              >
                View GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
