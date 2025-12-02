import React from 'react';

export default function StudyCard({ space, onReserve }) {
  const isAvailable = space.available > 0;

  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #eee',
        background: '#fff'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 18 }}>{space.name}</h3>
          <p style={{ margin: '6px 0 0', color: '#555' }}>{space.location}</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0 }}>
            {space.available} / {space.capacity} free
          </p>
          <div style={{ marginTop: 8 }}>
            <button
              onClick={() => onReserve(space.id)}
              disabled={!isAvailable}
              style={{
                padding: '6px 10px',
                borderRadius: 8,
                border: '1px solid #ccc',
                background: isAvailable ? '#f7f7f7' : '#fafafa',
                cursor: isAvailable ? 'pointer' : 'not-allowed',
                opacity: isAvailable ? 1 : 0.6
              }}
            >
              {isAvailable ? 'Reserve 1' : 'Full'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {space.tags.map(t => (
          <span
            key={t}
            style={{
              fontSize: 12,
              padding: '4px 8px',
              borderRadius: 999,
              border: '1px solid #e5e7eb'
            }}
          >
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
}