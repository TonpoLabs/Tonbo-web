// src/layouts/Sidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { T } from '../theme';
import { useAuth } from '../auth/AuthContext';

const navItems = {
  app: [
    { to: '/', label: 'Overview', icon: '▦' },
    { to: '/positions', label: 'Positions', icon: '◈' },
    { to: '/trade', label: 'New Order', icon: '↗' },
    { to: '/settings', label: 'Settings', icon: '⚙' },
  ],
  docs: [
    { to: '/docs', label: 'Getting Started', icon: '▸' },
    { to: '/docs/api', label: 'API Reference', icon: '▸' },
    { to: '/docs/websocket', label: 'WebSocket', icon: '▸' },
    { to: '/docs/security', label: 'Security', icon: '▸' },
  ],
};

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const isDocs = location.pathname.startsWith('/docs');
  const section = isDocs ? 'docs' : 'app';
  const items = navItems[section];

  return (
    <aside style={{
      width: 240, minHeight: '100vh', background: T.bgSurface,
      borderRight: `1px solid ${T.border}`, position: 'fixed', left: 0, top: 0,
      zIndex: 50, display: 'flex', flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 24px', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: `linear-gradient(135deg, ${T.accent}, ${T.blue})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 800, color: T.bg, fontFamily: T.font,
          }}>C</div>
          <span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 800, color: T.text, letterSpacing: '-0.03em' }}>CipherTrade</span>
        </div>
      </div>

      {/* Section toggle */}
      <div style={{ display: 'flex', margin: '16px 12px 8px', borderRadius: T.radiusSm, overflow: 'hidden', border: `1px solid ${T.border}` }}>
        {[
          { key: 'app', label: 'App', to: '/' },
          { key: 'docs', label: 'Docs', to: '/docs' },
        ].map(s => (
          <NavLink key={s.key} to={s.to} style={{
            flex: 1, padding: '9px 0', border: 'none', cursor: 'pointer', textAlign: 'center',
            fontFamily: T.font, fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.05em', textDecoration: 'none',
            background: section === s.key ? T.accent + '18' : 'transparent',
            color: section === s.key ? T.accent : T.textDim, transition: 'all 0.2s',
          }}>{s.label}</NavLink>
        ))}
      </div>

      {/* Nav items */}
      <nav style={{ padding: '8px 12px', flex: 1 }}>
        {items.map((item) => {
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname === item.to;

          return (
            <NavLink key={item.to} to={item.to} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 14px', marginBottom: 2, borderRadius: T.radiusSm,
              textDecoration: 'none',
              background: isActive ? T.accentBg : 'transparent',
              color: isActive ? T.accent : T.textMuted,
              fontFamily: T.font, fontSize: 13, fontWeight: isActive ? 700 : 500,
              transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: 14, width: 18, textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding: '16px 20px', borderTop: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: T.bgCard,
            border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.font, fontSize: 13, fontWeight: 700, color: T.accent,
          }}>{(user?.userId || 'U')[0].toUpperCase()}</div>
          <div>
            <div style={{ fontFamily: T.font, fontSize: 12, fontWeight: 600, color: T.text }}>
              {user?.userId?.slice(0, 8) || 'User'}...
            </div>
            <div style={{ fontFamily: T.font, fontSize: 10, color: T.textDim }}>Connected</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
