import React from 'react';
import NavBar from "../components/NavBar";

export default function Settings() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-300 to-sky-500">
                        <NavBar />
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <section className="bg-white/30 rounded-lg mb-6 p-6">
                        <h2 className="text-xl font-semibold text-blue-500 mb-4">Account</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-blue-500 mb-2">Email</label>
                                <input type="email" placeholder="your@email.com" className="bg-white/40 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-500 mb-2">Password</label>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Change Password</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
