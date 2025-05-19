'use client';

import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ acquirer: '', acquired: '', dealAmount: '', dealDate: '' });
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([form, ...data]);  // add to top of list
    setForm({ acquirer: '', acquired: '', dealAmount: '', dealDate: '' });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Corporate Acquisition Tracker</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Acquirer" value={form.acquirer}
          onChange={(e) => setForm({ ...form, acquirer: e.target.value })}
          className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Acquired" value={form.acquired}
          onChange={(e) => setForm({ ...form, acquired: e.target.value })}
          className="w-full border p-2 rounded" required />
        <input type="number" placeholder="Deal Amount" value={form.dealAmount}
          onChange={(e) => setForm({ ...form, dealAmount: e.target.value })}
          className="w-full border p-2 rounded" required />
        <input type="date" value={form.dealDate}
          onChange={(e) => setForm({ ...form, dealDate: e.target.value })}
          className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add to Table
        </button>
      </form>

      <table className="mt-8 w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 border-b">Acquirer</th>
            <th className="text-left p-2 border-b">Acquired</th>
            <th className="text-right p-2 border-b">Deal Amount ($)</th>
            <th className="text-left p-2 border-b">Deal Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={4} className="text-center p-4">No acquisitions yet.</td></tr>
          ) : (
            data.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-2 border-b">{item.acquirer}</td>
                <td className="p-2 border-b">{item.acquired}</td>
                <td className="p-2 border-b text-right">{Number(item.dealAmount).toLocaleString()}</td>
                <td className="p-2 border-b">{new Date(item.dealDate).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
