'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [form, setForm] = useState({ acquirer: '', acquired: '', dealAmount: '', dealDate: '' });
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/acquisitions')
      .then(res => res.json())
      .then(setData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/acquisitions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ acquirer: '', acquired: '', dealAmount: '', dealDate: '' });
    const updated = await fetch('/api/acquisitions').then(res => res.json());
    setData(updated);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <h1>Corporate Acquisition Tracker</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Acquirer" value={form.acquirer}
          onChange={(e) => setForm({ ...form, acquirer: e.target.value })} required />
        <input type="text" placeholder="Acquired" value={form.acquired}
          onChange={(e) => setForm({ ...form, acquired: e.target.value })} required />
        <input type="number" placeholder="Deal Amount" value={form.dealAmount}
          onChange={(e) => setForm({ ...form, dealAmount: e.target.value })} required />
        <input type="date" value={form.dealDate}
          onChange={(e) => setForm({ ...form, dealDate: e.target.value })} required />
        <button type="submit">Add Acquisition</button>
      </form>

      {/* New Table for displaying acquisitions */}
      <table style={{ width: '100%', marginTop: '2rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #333', textAlign: 'left', padding: '8px' }}>Acquirer</th>
            <th style={{ borderBottom: '2px solid #333', textAlign: 'left', padding: '8px' }}>Acquired</th>
            <th style={{ borderBottom: '2px solid #333', textAlign: 'right', padding: '8px' }}>Deal Amount ($)</th>
            <th style={{ borderBottom: '2px solid #333', textAlign: 'left', padding: '8px' }}>Deal Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{item.acquirer}</td>
              <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{item.acquired}</td>
              <td style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'right' }}>
                {Number(item.dealAmount).toLocaleString()}
              </td>
              <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                {new Date(item.dealDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="4" style={{ padding: '8px', textAlign: 'center' }}>No acquisitions yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
