import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const DashboardLayout = ({ children, username }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const lightBlue = "#61dafb";

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Learning Mode', path: '/learning', icon: '📖' },
    { name: 'Prediction', path: '/prediction', icon: '🎥' },
    { name: 'ASL Guide', path: '/guide-on-asl', icon: '📄' },
    { name: 'Support', path: '/support', icon: '❓' },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#282c34', color: 'white', overflow: 'hidden' }}>
      
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #444' }}>
          <h2 style={{ color: lightBlue, margin: 0 }}>SignLify</h2>
        </div>
        
        <nav style={{ marginTop: '20px', flex: 1 }}>
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              style={{
                ...navLinkStyle,
                backgroundColor: location.pathname === item.path ? '#3d4451' : 'transparent',
                borderLeft: location.pathname === item.path ? `4px solid ${lightBlue}` : '4px solid transparent'
              }}
            >
              <span style={{ marginRight: '10px' }}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <button onClick={() => navigate('/login')} style={logoutButtonStyle}>
          Logout 🚪
        </button>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={navbarStyle}>
          <div style={{ fontWeight: 'bold' }}>
            {location.pathname.replace('/', '').toUpperCase() || 'HOME'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span>Welcome, <b style={{ color: lightBlue }}>{username || 'Wahab'}</b></span>
            <div style={smallAvatarStyle}>{username ? username[0].toUpperCase() : 'W'}</div>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

const sidebarStyle = { width: '260px', backgroundColor: '#1c1e22', display: 'flex', flexDirection: 'column', borderRight: '1px solid #444' };
const navLinkStyle = { display: 'block', padding: '15px 25px', color: 'white', textDecoration: 'none', fontSize: '1rem', transition: '0.3s' };
const navbarStyle = { height: '70px', backgroundColor: '#1c1e22', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px', borderBottom: '1px solid #444' };
const logoutButtonStyle = { padding: '15px', background: '#ff4d4d', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' };
const smallAvatarStyle = { width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#61dafb', color: '#282c34', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' };

export default DashboardLayout;