import { useState, useEffect, useCallback } from 'react';
import { SeatingMap } from './components/SeatingMap/SeatingMap';
import { Summary } from './components/Summary';
import { useVenueData } from './hooks/useVenueData';
import type { ColorMode } from './utils/canvasUtils';

function App() {
  const { data, loading, error } = useVenueData();
  const [colorMode, setColorMode] = useState<ColorMode>('status');

  // State for selection with localStorage persistence
  const [selectedSeatIds, setSelectedSeatIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('selectedSeats');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('selectedSeats', JSON.stringify(Array.from(selectedSeatIds)));
  }, [selectedSeatIds]);

  const toggleSeat = useCallback((seatId: string) => {
    setSelectedSeatIds(prev => {
      const next = new Set(prev);
      if (next.has(seatId)) {
        next.delete(seatId);
      } else {
        if (next.size >= 8) {
          alert('You can only select up to 8 seats.');
          return prev;
        }
        next.add(seatId);
      }
      return next;
    });
  }, []);

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden bg-slate-900 text-slate-100">
      <main className="flex-1 relative overflow-hidden flex flex-col">
        <header className="p-4 border-b border-slate-700 bg-slate-800 z-10 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Metropolis Arena
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-300">Map Legend:</span>
            <button
              onClick={() => setColorMode('status')}
              className={`px-3 py-1 rounded text-xs font-semibold ${colorMode === 'status' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}
            >
              Status
            </button>
            <button
              onClick={() => setColorMode('tier')}
              className={`px-3 py-1 rounded text-xs font-semibold ${colorMode === 'tier' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}
            >
              Price Tier
            </button>
          </div>
        </header>

        <div className="flex-1 relative bg-slate-100 overflow-hidden">
          {loading && <div className="absolute inset-0 flex items-center justify-center text-slate-500">Loading...</div>}
          {error && <div className="absolute inset-0 flex items-center justify-center text-red-500">Error: {error}</div>}
          {data && (
            <SeatingMap
              seats={data.seats}
              selectedSeatIds={selectedSeatIds}
              onToggleSeat={toggleSeat}
              colorMode={colorMode}
            />
          )}
        </div>
      </main>

      <aside className="w-full md:w-80 bg-slate-800 border-l border-slate-700 p-4 flex flex-col z-20 shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-white">Live Summary</h2>
        {data ? (
          <Summary selectedSeatIds={selectedSeatIds} allSeats={data.seats} />
        ) : (
          <div className="text-slate-500 animate-pulse">Loading data...</div>
        )}
      </aside>
    </div>
  );
}

export default App;
