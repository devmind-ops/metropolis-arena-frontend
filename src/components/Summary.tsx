import React, { useMemo } from 'react';
import type { Seat } from '../types';

interface SummaryProps {
    selectedSeatIds: Set<string>;
    allSeats: Seat[];
}

export const Summary: React.FC<SummaryProps> = ({ selectedSeatIds, allSeats }) => {
    const selectedSeats = useMemo(() => {
        return allSeats.filter(s => selectedSeatIds.has(s.id));
    }, [selectedSeatIds, allSeats]);

    const total = useMemo(() => {
        return selectedSeats.reduce((acc, s) => acc + s.price, 0);
    }, [selectedSeats]);

    if (selectedSeats.length === 0) {
        return <div className="text-slate-400 text-sm">No seats selected. Click a seat to reserve it.</div>;
    }

    return (
        <div className="space-y-4">
            <div className="max-h-[60vh] overflow-auto space-y-2 pr-2">
                {selectedSeats.map(seat => (
                    <div key={seat.id} className="flex justify-between items-center bg-slate-700 p-2 rounded text-sm">
                        <div>
                            <div className="font-semibold text-slate-200">
                                Row {seat.row}, Seat {seat.col}
                            </div>
                            <div className="text-xs text-slate-400 capitalize">{seat.priceTier}</div>
                        </div>
                        <div className="font-mono text-emerald-400">${seat.price}</div>
                    </div>
                ))}
            </div>

            <div className="border-t border-slate-700 pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
                <button
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded transition-colors"
                    onClick={() => alert(`Proceeding to checkout with ${selectedSeats.length} seats.`)}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};
