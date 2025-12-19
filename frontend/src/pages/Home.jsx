import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h1 style={{ fontSize: '42px', marginBottom: '20px' }}>Welcome to TrustraFx</h1>
      <p style={{ fontSize: '22px', margin: '30px 0', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        Secure Forex & Crypto Investment Platform – Grow Your Wealth Safely and Confidently
      </p>

      <div style={{ margin: '60px 0' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '40px' }}>Our Investment Plans</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '30px', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          <div style={{ background: '#1e1e2e', padding: '35px', borderRadius: '16px', border: '1px solid #3b3b5b' }}>
            <h3 style={{ fontSize: '26px', marginBottom: '15px' }}>Basic Plan</h3>
            <h4 style={{ fontSize: '28px', color: '#60a5fa', margin: '15px 0' }}>10% Monthly Return</h4>
            <p>Minimum Deposit: $100</p>
            <p>Duration: Flexible</p>
            <p>Perfect for beginners</p>
          </div>

          <div style={{ background: '#1e1e2e', padding: '35px', borderRadius: '16px', border: '1px solid #3b3b5b' }}>
            <h3 style={{ fontSize: '26px', marginBottom: '15px' }}>Premium Plan</h3>
            <h4 style={{ fontSize: '28px', color: '#60a5fa', margin: '15px 0' }}>20% Monthly Return</h4>
            <p>Minimum Deposit: $1,000</p>
            <p>Duration: 6 Months</p>
            <p>Great for steady growth</p>
          </div>

          <div style={{ background: '#1e1e2e', padding: '35px', borderRadius: '16px', border: '1px solid #3b3b5b' }}>
            <h3 style={{ fontSize: '26px', marginBottom: '15px' }}>VIP Plan</h3>
            <h4 style={{ fontSize: '28px', color: '#60a5fa', margin: '15px 0' }}>35% Monthly Return</h4>
            <p>Minimum Deposit: $5,000</p>
            <p>Duration: 12 Months</p>
            <p>Maximum returns for serious investors</p>
          </div>
        </div>
      </div>

      <Link to="/register">
        <button style={{ fontSize: '20px', padding: '18px 50px', margin: '20px 0' }}>
          Get Started Now
        </button>
      </Link>

      <p style={{ marginTop: '40px', fontSize: '18px' }}>
        Already have an account? <Link to="/login" style={{ color: '#60a5fa' }}>Login here</Link>
      </p>
    </div>
  );
}
