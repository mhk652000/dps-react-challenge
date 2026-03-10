export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0    rgba(99, 210, 186, 0.3); }
    70%  { box-shadow: 0 0 0 10px rgba(99, 210, 186, 0);   }
    100% { box-shadow: 0 0 0 0    rgba(99, 210, 186, 0);   }
  }

  .address-card  { animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .field-wrapper { animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .field-wrapper:nth-child(2) { animation-delay: 0.1s; }
  .field-wrapper:nth-child(3) { animation-delay: 0.2s; }
  .success-ping  { animation: pulse-ring 1s ease-out; }

  .label-tag {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 8px;
    display: block;
  }
`
