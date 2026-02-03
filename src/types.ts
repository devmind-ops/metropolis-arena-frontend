export type SeatStatus = "available" | "reserved" | "sold" | "held";

export interface Seat {
    id: string;
    row: number;
    col: number;
    x: number;
    y: number;
    status: SeatStatus;
    priceTier: "standard" | "premium" | "vip";
    price: number;
    label: string;
}

export interface VenueData {
    seats: Seat[];
    stats: {
        total: number;
        available: number;
        reserved: number;
        sold: number;
        held: number;
    };
}
