import React, { useState, useMemo } from 'react';
import StudyList from './components/StudyList';
import initialSpaces from './data/spaces';

const illustrationSrc = '/hero-illustration.png';

export default function StudyHere() {
  const [spaces, setSpaces] = useState(initialSpaces);
  const [query, setQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return spaces.filter((s) => {
      const matchesQ =
        q === '' ||
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q);

      const matchesTag = tagFilter === '' || s.tags.includes(tagFilter);
      return matchesQ && matchesTag;
    });
  }, [spaces, query, tagFilter]);

  function handleReserve(spaceId) {
    setSpaces((prev) =>
      prev.map((s) => {
        if (s.id !== spaceId) return s;
        if (s.available <= 0) return s;
        return { ...s, available: s.available - 1 };
      })
    );
  }

  function resetAll() {
    setSpaces(initialSpaces.map((s) => ({ ...s })));
    setQuery('');
    setTagFilter('');
  }

  const allTags = Array.from(new Set(spaces.flatMap((s) => s.tags)));

  const pageStyle = {
    fontFamily:
      "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    color: '#111',
  };
  const heroWrap = {
    display: 'grid',
    gridTemplateColumns: '1fr 420px',
    gap: 32,
    alignItems: 'start',
    maxWidth: 1100,
    margin: '32px auto',
    padding: '24px',
  };
  const heading = {
    fontSize: 56,
    lineHeight: 1.03,
    margin: '8px 0 18px',
    fontWeight: 800,
    letterSpacing: '-0.02em',
  };
  const subHeading = { color: '#6b7280', marginBottom: 20 };
  const formCard = {
    background: '#ffffff',
    borderRadius: 14,
    padding: 20,
    boxShadow: '0 8px 30px rgba(16,24,40,0.06)',
    border: '1px solid rgba(0,0,0,0.04)',
    maxWidth: 520,
  };
  const pill = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 14px',
    borderRadius: 999,
    background: '#f3f4f6',
    border: '1px solid rgba(0,0,0,0.04)',
  };
  const input = {
    flex: 1,
    padding: 8,
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: 15,
  };
  const smallNote = { color: '#6b7280', marginLeft: 12, fontSize: 14 };
  const blackBtn = {
    background: '#000',
    color: '#fff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: 10,
    fontWeight: 600,
    cursor: 'pointer',
  };
  const rightCard = {
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(16,24,40,0.06)',
    background: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const heroImg = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  return (
    <div style={pageStyle}>
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 20px',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20 }}>StudyHere</div>
          <nav
            style={{
              display: 'flex',
              gap: 18,
              alignItems: 'center',
              color: '#374151',
            }}
          >
            <div style={{ cursor: 'pointer' }}>Spaces</div>
            <div style={{ cursor: 'pointer' }}>Map</div>
            <div style={{ cursor: 'pointer' }}>About</div>
            <button
              style={{
                padding: '8px 12px',
                borderRadius: 999,
                border: '1px solid rgba(0,0,0,0.08)',
                background: '#fff',
              }}
            >
              Sign up
            </button>
          </nav>
        </div>
      </div>
      <div style={heroWrap}>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: '#6b7280',
              fontSize: 14,
              marginBottom: 6,
            }}
          >
            <span>📍</span>
            <span>Boston, US</span>
            <a
              style={{
                marginLeft: 8,
                color: '#111',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Change city
            </a>
          </div>

          <h1 style={heading}>Go anywhere to study</h1>
          <p style={subHeading}>
            Find quiet floors, group rooms, cafés, and book the spot that fits
            your session.
          </p>
          <div style={formCard}>
            <div
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  ...pill,
                  background: '#111',
                  color: '#fff',
                  padding: '8px 12px',
                }}
              >
                <span
                  style={{ display: 'inline-block', width: 18, textAlign: 'center' }}
                >
                  📚
                </span>
                <div style={{ marginLeft: 6 }}>Study now ▾</div>
              </div>

              <div style={{ marginLeft: 'auto' }}>
                <button
                  onClick={resetAll}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#6b7280',
                    cursor: 'pointer',
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={pill}>
                <div style={{ width: 18, textAlign: 'center' }}>📍</div>
                <input
                  style={input}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search campus or building"
                  aria-label="Study location"
                />
              </div>

              <div style={pill}>
                <div style={{ width: 18, textAlign: 'center' }}>🎧</div>
                <select
                  style={{ ...input, cursor: 'pointer' }}
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  aria-label="Study type"
                >
                  <option value="">Any study type</option>
                  {allTags.map((t) => (
                    <option key={t} value={t}>
                      {t[0].toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  marginTop: 6,
                }}
              >
                <button style={blackBtn}>Find spaces</button>
                <div style={smallNote}>
                  Search study rooms, quiet floors, and cafés
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 26 }}>
            <h2 style={{ fontSize: 20, margin: '12px 0' }}>Suggestions</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <StudyList spaces={visible} onReserve={handleReserve} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}