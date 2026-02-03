import React, { useRef, useEffect, useState, memo } from 'react';
import { drawVenue } from '../../utils/canvasUtils';
import { A11yLayer } from './A11yLayer';
import type { Seat } from '../../types';
import type { ColorMode } from '../../utils/canvasUtils';

interface SeatingMapProps {
    seats: Seat[];
    selectedSeatIds: Set<string>;
    onToggleSeat: (id: string) => void;
    colorMode: ColorMode;
}

export const SeatingMap: React.FC<SeatingMapProps> = memo(({ seats, selectedSeatIds, onToggleSeat, colorMode }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Compute content size
    const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (seats.length > 0) {
            // Find max x/y
            const maxX = seats.reduce((max, s) => Math.max(max, s.x), 0);
            const maxY = seats.reduce((max, s) => Math.max(max, s.y), 0);
            setContentSize({
                width: maxX + 50, // width + padding 
                height: maxY + 50
            });
        }
    }, [seats]);

    // Draw Loop
    useEffect(() => {
        if (!canvasRef.current || contentSize.width === 0) return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Set canvas size to content size (triggers scroll in parent)
        canvasRef.current.width = contentSize.width;
        canvasRef.current.height = contentSize.height;

        drawVenue(ctx, seats, selectedSeatIds, colorMode);

    }, [seats, contentSize, selectedSeatIds, colorMode]);

    return (
        <div className="relative w-full h-full bg-slate-50 border border-slate-200 overflow-auto scroll-smooth" ref={containerRef}>
            <div
                className="relative origin-top-left"
                style={{ width: contentSize.width, height: contentSize.height }}
            >
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0"
                />
                <A11yLayer
                    seats={seats}
                    selectedSeatIds={selectedSeatIds}
                    onToggleSeat={onToggleSeat}
                />
            </div>
        </div>
    );
});
