import React, { memo } from 'react';
import type { Seat } from '../../types';
import { SEAT_SIZE } from '../../utils/canvasUtils';

interface A11yLayerProps {
    seats: Seat[];
    selectedSeatIds: Set<string>;
    onToggleSeat: (seatId: string) => void;
}

// Memoize to avoid unnecessary re-renders of 15k nodes
export const A11yLayer: React.FC<A11yLayerProps> = memo(({ seats, selectedSeatIds, onToggleSeat }) => {
    return (
        <svg
            className="absolute top-0 left-0 pointer-events-none"
            width="100%"
            height="100%"
            style={{ overflow: 'visible' }}
        >
            {seats.map((seat) => {
                const isSelected = selectedSeatIds.has(seat.id);
                const label = `Row ${seat.row}, Seat ${seat.col}, ${seat.priceTier} ($${seat.price}), ${seat.status}${isSelected ? ', selected' : ''}`;

                return (
                    <rect
                        key={seat.id}
                        x={seat.x}
                        y={seat.y}
                        width={SEAT_SIZE}
                        height={SEAT_SIZE}
                        className="pointer-events-auto cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 fill-transparent"
                        tabIndex={0}
                        role="button"
                        aria-label={label}
                        aria-pressed={isSelected}
                        onClick={() => {
                            if (seat.status === 'available') {
                                onToggleSeat(seat.id);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                if (seat.status === 'available') {
                                    onToggleSeat(seat.id);
                                }
                            }
                        }}
                    />
                );
            })}
        </svg>
    );
});
