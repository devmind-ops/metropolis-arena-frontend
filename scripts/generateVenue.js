import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROWS = 100;
const COLS = 150;
const SEAT_SIZE = 10;
const GAP = 4;

const tiers = [
    { name: 'vip', price: 250, color: '#FFD700', rows: 10 },
    { name: 'premium', price: 150, color: '#C0C0C0', rows: 30 },
    { name: 'standard', price: 80, color: '#CD7F32', rows: 100 },
];

const statuses = ['available', 'reserved', 'sold', 'held'];
const weights = [0.7, 0.1, 0.15, 0.05]; // 70% available

function weightedRandom(items, weights) {
    const totalWeight = weights.reduce((acc, w) => acc + w, 0);
    let random = Math.random() * totalWeight;
    for (let i = 0; i < items.length; i++) {
        random -= weights[i];
        if (random < 0) return items[i];
    }
    return items[0];
}

const seats = [];
let idCounter = 1;

for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
        // Determine tier
        let tier = tiers[2]; // standard
        if (r < tiers[0].rows) tier = tiers[0];
        else if (r < tiers[0].rows + tiers[1].rows) tier = tiers[1];

        const status = weightedRandom(statuses, weights);

        seats.push({
            id: `s-${idCounter}`,
            row: r + 1,
            col: c + 1,
            x: c * (SEAT_SIZE + GAP) + 50, // Offset
            y: r * (SEAT_SIZE + GAP) + 50,
            status: status,
            priceTier: tier.name,
            price: tier.price,
            label: `Row ${r + 1} Seat ${c + 1}`
        });
        idCounter++;
    }
}

const stats = seats.reduce((acc, seat) => {
    acc.total++;
    acc[seat.status]++;
    return acc;
}, { total: 0, available: 0, reserved: 0, sold: 0, held: 0 });

const output = {
    seats,
    stats
};

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'venue.json'), JSON.stringify(output, null, 2));
console.log(`Generated ${seats.length} seats in public/venue.json`);
