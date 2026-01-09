import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FishSpot() {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef(new Map()); // spotId -> Leaflet marker
    const nextIdRef = useRef(1);

    const navigate = useNavigate();

    const [spots, setSpots] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pendingCoords, setPendingCoords] = useState(null); // { lat, lon }
    const [nameInput, setNameInput] = useState('');
    const [notesInput, setNotesInput] = useState('');

    const openAddSpotModal = ({ lat, lon }) => {
        setPendingCoords({ lat, lon });
        setNameInput('');
        setNotesInput('');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setPendingCoords(null);
        setNameInput('');
        setNotesInput('');
    };

    const handleSaveSpot = (e) => {
        e?.preventDefault?.();
        if (!pendingCoords || !mapRef.current) return;

        const spot = {
            id: nextIdRef.current++,
            lat: pendingCoords.lat,
            lon: pendingCoords.lon, 
            name: nameInput.trim() || 'Anonymous',
            notes: notesInput.trim(),
        };

        // Create marker and popup
        const { L } = window;
        const marker = L.marker([spot.lat, spot.lon]).addTo(mapRef.current);
        const coordsHtml = `Lat: ${spot.lat.toFixed(5)}<br>Lon: ${spot.lon.toFixed(5)}`;
        const nameHtml = `<strong>${spot.name}</strong>`;
        marker.bindPopup(`${nameHtml}<br>${coordsHtml}`).openPopup();
        markersRef.current.set(spot.id, marker);

        setSpots((prev) => [spot, ...prev]);
        closeModal();
    };

    const findSpot = (spot) => {
        const map = mapRef.current;
        if (!map) return;
        map.flyTo([spot.lat, spot.lon], 15, { duration: 0.8 });
        const marker = markersRef.current.get(spot.id);
        if (marker) marker.openPopup();
    };

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;
        const { L } = window;
        if (!L) return;

        const map = L.map(mapContainerRef.current, {
            center: [49.887951, -119.49601],
            zoom: 12,
            zoomControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);

        // Locate user's current position
        map.locate({ setView: true, maxZoom: 12 });

        mapRef.current = map;

        // Custom Control: click to place one spot
        const CustomControl = L.Control.extend({
            options: { position: 'bottomleft' },
            onAdd: function () {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                container.innerHTML =
                    '<button style="background-color: white; border: none; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; border-radius: 4px;"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#247DC9"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></button>';
                container.title = 'Add Spot';
                L.DomEvent.disableClickPropagation(container);
                L.DomEvent.on(container, 'click', function () {
                    map.once('click', (event) => {
                        const { lat, lng } = event.latlng;
                        openAddSpotModal({ lat, lon: lng });
                    });
                });
                return container;
            },
        });

        map.addControl(new CustomControl());

        return () => {
            map.remove();
            mapRef.current = null;
            markersRef.current.clear();
        };
    }, []);

    return (
        <>
            <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-6xl bg-white/80 backdrop-blur rounded-xl border border-slate-200">
                    <div className="px-6 py-4 border-b border-slate-200">
                  
                        <h1 className="text-2xl font-semibold text-slate-900">Fish Spots</h1>
                        <p className="text-slate-600 mt-1">Click the map button, then click on the map to add a new spot. Pins store the exact coordinates of your fishing spot.</p>
                              <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="mt-2 justify-end inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            aria-label="Go back"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                            Back
                        </button>
                    </div>

                    <div className="p-4">
                        <div
                            ref={mapContainerRef}
                            className="w-full h-[520px] rounded-lg border border-slate-200 shadow-inner"
                            role="region"
                            aria-label="Interactive fishing spots map"
                        />
                    </div>

                    <div className="px-6 pb-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-2">Saved Spots</h2>
                        <div className="max-h-32 overflow-y-auto rounded-lg border border-slate-200 bg-white">
                            {spots.length === 0 ? (
                                <div className="p-4 text-slate-500">No spots yet. Use the map button to add one.</div>
                            ) : (
                                <ul className="divide-y divide-slate-200">
                                    {spots.map((spot) => (
                                        <li key={spot.id} className="p-4 flex items-start justify-between gap-4">
                                            <div>
                                                <div className="font-medium text-slate-900">{spot.name}</div>
                                                <div className="text-xs text-slate-500">
                                                    Lat: {spot.lat.toFixed(5)} • Lon: {spot.lon.toFixed(5)}
                                                </div>
                                                {spot.notes && (
                                                    <div className="mt-1 text-sm text-slate-700">{spot.notes}</div>
                                                )}
                                            </div>
                                            <div className="shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={() => findSpot(spot)}
                                                    className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                                >
                                                    Find
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Spot Creation Modal */}
            {showModal && pendingCoords && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-slate-900/50" onClick={closeModal} />
                    <div className="relative z-10 w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-lg">
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">Save Spot</h3>
                        <div className="text-xs text-slate-500 mb-3">
                            Lat: {pendingCoords.lat.toFixed(5)} • Lon: {pendingCoords.lon.toFixed(5)}
                        </div>
                        <form onSubmit={handleSaveSpot} className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Creek bend, Dock, etc."
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                                <textarea
                                    value={notesInput}
                                    onChange={(e) => setNotesInput(e.target.value)}
                                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm h-24 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Lure, time, conditions..."
                                />
                            </div>
                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    Save Spot
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}