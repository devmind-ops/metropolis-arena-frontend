Metropolis Arena - Interactive Seating Map
This is a high-performance React + TypeScript application built for the Metropolis Arena. It renders a complex event seating map with 15,000+ seats while maintaining a smooth 60 FPS experience.



🚀 Getting Started
Install dependencies:

Bash

pnpm install
Run the development server:

Bash

pnpm dev
The app will be available at http://localhost:5173.


🏗️ Architecture & Trade-offs
High-Performance Rendering (Canvas API)
To meet the requirement of 60 FPS with 15,000 seats, I chose HTML5 Canvas for the primary rendering layer. Standard React DOM nodes (15,000 div or button elements) would cause significant reconciliation lag and memory overhead. By using a single Canvas element, the application remains lightweight and responsive.



Accessibility & Interactivity (Hybrid SVG Overlay)
To ensure full accessibility (WCAG 2.1), I implemented a transparent SVG overlay. While the Canvas handles the visuals, the SVG contains focusable, invisible elements with proper aria-labels. This allows users to navigate seats using a keyboard (Tab and Enter) while screen readers can identify the section, row, and seat number.





State Management & Persistence
The application uses local React state for the "shopping cart" of seats (limited to 8). To ensure a seamless user experience, the selection is persisted in localStorage, allowing the user to refresh the page without losing their chosen seats.



✅ Features

Smooth 60 FPS Rendering: Optimized for large-scale arenas.


Accessibility: Full keyboard support and ARIA labels for every seat.


Live Summary: Real-time subtotal calculation for up to 8 selected seats.


Responsive Design: Works across desktop and mobile viewports.

🛠️ TODOs / Incomplete Features

Pinch-Zoom: Currently, the map uses a standard scroll/pan; native touch gestures for mobile could be improved.


WebSockets: The infrastructure is ready for live seat status updates (Available/Sold), which would be the next logical step.