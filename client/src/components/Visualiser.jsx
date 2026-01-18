export default function Visualiser({ blobUrl, loading }) {
  return (
    <div className="relative w-full h-full bg-[#020617]">
      {/* Loading Overlay inside the canvas area */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/50 backdrop-blur-md">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-400 font-medium animate-pulse">
            Synthesizing Physics...
          </p>
        </div>
      )}

      {/* The Actual Simulation */}
      {blobUrl ? (
        <iframe
          src={blobUrl}
          title="AI Simulation"
          className="w-full h-full border-none pointer-events-auto"
          sandbox="allow-scripts"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        </div>
      )}
    </div>
  );
}
