import React, { useState } from "react";
import { Maximize2, RefreshCw, X, Zap } from "lucide-react";
import { useSimulation } from "./hooks/useSimulation";
import Visualizer from "./components/Visualiser";

export default function App() {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFooterHovered, setIsFooterHovered] = useState(false);
  const { generate, loading, explanation, blobUrl } = useSimulation();

  const suggestions = [
    "Double pendulum chaos",
    "How black holes bend light",
    "Herd immunity spread",
  ];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      generate(input);
      setInput("");
      // Hide the chatbox after submission
      setIsFocused(false);
      setIsFooterHovered(false);
      // Blur the input to ensure it loses focus
      e.target.querySelector("input")?.blur();
    }
  };

  return (
    <div className="h-screen w-screen flex bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* --- ATMOSPHERIC BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[140px] rounded-full" />
        <div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse"
          style={{ animationDuration: "8s" }}
        />
      </div>

      <main className="relative flex-1 flex flex-col z-10">
        <div className="absolute inset-0 z-0">
          <Visualizer blobUrl={blobUrl} loading={loading} />
        </div>

        {/* --- HEADER --- */}
        <header className="relative z-30 flex justify-end p-8">
          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="p-2.5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-xl hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200 text-slate-500 hover:text-white"
            >
              <RefreshCw
                size={16}
                strokeWidth={2}
                className={loading ? "animate-spin" : ""}
              />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2.5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-xl hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200 text-slate-500 hover:text-white"
            >
              <Maximize2 size={16} strokeWidth={2} />
            </button>
          </div>
        </header>

        {/* --- TITLE SECTION --- */}
        {!blobUrl && !loading && (
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 -mt-20">
            <div className="relative group">
              {/* Soft glow behind text */}
              <div className="absolute inset-0 blur-3xl bg-blue-500/20 scale-125 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

              <h1
                className="relative text-[7rem] md:text-[10rem] font-black tracking-[-0.04em] leading-none select-none pr-2
                bg-gradient-to-tr from-slate-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                prompt<span className="text-blue-500">2</span>canvas
              </h1>
            </div>

            <p className="mt-8 text-blue-200/40 text-xs font-bold tracking-[0.8em] uppercase italic">
              Generative Ideation Canvas
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-16 max-w-2xl">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInput(s);
                    generate(s);
                  }}
                  className="px-6 py-2 bg-white/[0.02] hover:bg-blue-600/10 border border-white/5 hover:border-blue-400/40 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all duration-500"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- VIBRANT INPUT FOOTER --- */}
        <footer
          className={`relative z-20 mt-auto w-full transition-all duration-300 ${
            isFooterHovered || isFocused ? "" : "pointer-events-none"
          }`}
          onMouseEnter={() => setIsFooterHovered(true)}
          onMouseLeave={() => {
            setIsFooterHovered(false);
            // Also unfocus when mouse leaves
            if (!isFocused) return;
            // We don't force blur here since user might still be typing
          }}
        >
          {/* Subtle hint bar when hidden */}
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-500 pointer-events-auto ${
              isFooterHovered || isFocused
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            <div className="px-6 py-3 mb-6 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-full cursor-default">
              <span className="text-[10px] text-slate-600 font-medium tracking-wider uppercase">
                Hover to prompt
              </span>
            </div>
          </div>

          {/* Foggy transition from simulation to input */}
          <div
            className={`absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent pointer-events-none transition-opacity duration-500 ${
              isFooterHovered || isFocused ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            className={`relative p-12 pb-16 flex justify-center w-full transition-all duration-500 ${
              isFooterHovered || isFocused
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            }`}
          >
            <form onSubmit={handleSubmit} className="relative w-full max-w-4xl">
              {/* GLOW LAYERS - Only visible when focused */}
              {/* 1. Soft outer aura */}
              <div
                className={`absolute -inset-6 bg-gradient-to-r from-violet-600/30 via-cyan-400/30 to-fuchsia-500/30 rounded-[4rem] blur-[60px] transition-opacity duration-700 ${
                  isFocused ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* 2. Mid-layer glow */}
              <div
                className={`absolute -inset-3 bg-gradient-to-r from-violet-600/40 via-cyan-400/40 to-fuchsia-500/40 rounded-[3.8rem] blur-xl transition-opacity duration-500 ${
                  isFocused ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* 3. Sharp gradient border */}
              <div
                className={`absolute -inset-[1.5px] bg-gradient-to-r from-violet-500 via-cyan-400 to-fuchsia-500 rounded-[3.6rem] transition-opacity duration-300 ${
                  isFocused ? "opacity-100" : "opacity-0"
                }`}
              />

              <div
                className={`relative flex items-center w-full bg-[#050b1d]/95 backdrop-blur-3xl border rounded-[3.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] p-3 pl-10 transition-all duration-300 ${
                  isFocused ? "border-transparent" : "border-white/[0.08]"
                }`}
              >
                <input
                  autoFocus
                  className="flex-1 bg-transparent py-6 text-xl text-white focus:outline-none placeholder:text-slate-600 font-light tracking-tight"
                  placeholder="Describe a concept to visualise..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />

                {input && (
                  <button
                    type="button"
                    onClick={() => setInput("")}
                    className="p-2 mr-4 text-slate-600 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}

                <button
                  disabled={loading || !input.trim()}
                  className="group relative px-12 py-6 bg-white text-black disabled:bg-slate-900 disabled:text-slate-700 rounded-[2.8rem] transition-all font-black text-xs tracking-[0.2em] uppercase active:scale-95 shadow-xl overflow-hidden"
                >
                  <div className="relative flex items-center gap-3">
                    <span>Generate</span>
                    <Zap
                      size={14}
                      className="fill-current group-hover:animate-bounce"
                    />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </footer>
      </main>
    </div>
  );
}
