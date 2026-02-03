import type { Seat } from '../types';

export const SEAT_SIZE = 10;
export const SEAT_RADIUS = 2;

const COLORS = {
    available: '#9CA3AF', // gray-400
    reserved: '#EF4444',  // red-500
    sold: '#EF4444',      // red-500
    held: '#EF4444',      // red-500
    selected: '#22C55E',  // green-500
};

const TIER_COLORS = {
    standard: '#CD7F32', // bronze
    premium: '#C0C0C0',  // silver
    vip: '#FFD700',      // gold
};

export type ColorMode = 'status' | 'tier';

export function getSeatColor(seat: Seat, isSelected: boolean, mode: ColorMode): string {
    if (isSelected) return COLORS.selected;

    if (mode === 'tier') {
        return TIER_COLORS[seat.priceTier] || COLORS.available;
    }

    return COLORS[seat.status] || COLORS.available;
}

export function drawSeat(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string
) {
    ctx.fillStyle = color;
    // Rounded rect simulation or just rect for performance
    // For 15k seats, simple rects are much faster. 
    // But let's try rounded if possible, or just rect.
    // Using simple rects for max performance at 15k.
    ctx.fillRect(x, y, SEAT_SIZE, SEAT_SIZE);

    // Optional: Add a stroke if needed, but it adds draw calls.
}

export function drawVenue(
    ctx: CanvasRenderingContext2D,
    seats: Seat[],
    selectedSeatIds: Set<string>,
    mode: ColorMode = 'status'
) {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Batch draw calls by color to minimize state changes?
    // Or just simple loop. 15k iterations is fast.

    for (const seat of seats) {
        // Only draw if within viewport? (Later optimization if needed)
        // For now, draw all.
        const isSelected = selectedSeatIds.has(seat.id);
        const color = getSeatColor(seat, isSelected, mode);

        ctx.fillStyle = color;
        ctx.fillRect(seat.x, seat.y, SEAT_SIZE, SEAT_SIZE);
    }
}
