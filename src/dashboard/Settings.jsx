// src/dashboard/Settings.jsx
import { T } from '../theme';
import { SectionTitle } from '../components';
import { rotateMyKey } from '../api/endpoints';
import { useAuth } from '../auth/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();
  const [rotating, setRotating] = useState(false);
  const [newKey, setNewKey] = useState(null);
  
  const handleRotate = async () => {
      if (!confirm('This will invalidate your current key. Continue?')) return;
      setRotating(true);
    try {
        const data = await rotateMyKey();
        setNewKey(data.api_key);
        // Update the session with the new key
        await login(data.api_key);
    } catch (e) {
        alert(`Rotation failed: ${e.message}`);
    } finally {
        setRotating(false);
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <SectionTitle sub="API keys, gateway configuration, and preferences">Settings</SectionTitle>

      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 28, marginBottom: 20 }}>
        <h3 style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 20 }}>API Key</h3>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontFamily: T.font, fontSize: 11, color: T.textDim, fontWeight: 600, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Key</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={user?.apiKey || '••••••••••••••••'} readOnly
              style={{ flex: 1, padding: '10px 14px', background: T.bgInput, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, color: T.textMuted, fontFamily: T.mono, fontSize: 13, outline: 'none' }} />
          </div>
        </div>
        <div>
            <h3>API Key</h3>
            <p>Your current key: <code>{user.apiKey.slice(0, 8)}...</code></p>
            {newKey && (
                <div style={{ background: T.orangeBg, padding: 12, borderRadius: T.radius }}>
                    <strong>New key (copy now — shown once):</strong>
                    <code style={{ display: 'block', marginTop: 8 }}>{newKey}</code>
                </div>
                               
            )}
            <button onClick={handleRotate} disabled={rotating}>
                {rotating ? 'Rotating...' : 'Rotate API Key'}
            </button>
            <p style={{ color: T.textMuted, fontSize: 12 }}>
                If you lose your key, ask your gateway admin to reset it via
                the admin panel using your User ID: <code>{user.userId}</code>
            </p>
        </div>
        <div>
          <label style={{ fontFamily: T.font, fontSize: 11, color: T.textDim, fontWeight: 600, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gateway</label>
          <input value="https://gateway.cipherbridge.cloud" readOnly
            style={{ width: '100%', padding: '10px 14px', background: T.bgInput, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, color: T.accent, fontFamily: T.mono, fontSize: 13, outline: 'none' }} />
        </div>
      </div>

      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 28, marginBottom: 20 }}>
        <h3 style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 20 }}>Session</h3>
        <p style={{ fontFamily: T.font, fontSize: 13, color: T.textMuted, marginBottom: 16 }}>
          User ID: <code style={{ fontFamily: T.mono, color: T.accent }}>{user?.userId || 'unknown'}</code>
        </p>
        <button onClick={logout} style={{
          padding: '12px 24px', borderRadius: T.radiusSm, border: `1px solid ${T.red}44`,
          background: T.redBg, color: T.red, fontFamily: T.font, fontSize: 14, fontWeight: 700, cursor: 'pointer',
        }}>Sign Out</button>
      </div>
    </div>
  );
}
