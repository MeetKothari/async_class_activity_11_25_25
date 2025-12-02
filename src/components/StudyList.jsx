import React from 'react';
import StudyCard from './StudyCard';

export default function StudyList({ spaces, onReserve }) {
  if (!spaces || spaces.length === 0) {
    return <p style={{ color: '#666' }}>No spaces match your filter.</p>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16
      }}
    >
      {spaces.map(s => (
        <StudyCard key={s.id} space={s} onReserve={onReserve} />
      ))}
    </div>
  );
}