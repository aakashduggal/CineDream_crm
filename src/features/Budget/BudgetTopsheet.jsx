import React from 'react';

const BudgetTopsheet = () => {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const projectInfo = {
    productionHouse: "CineDreams Productions Private Limited",
    title: "Maikhana Express",
    shootingDates: "2026-08-15 to 2026-08-20",
    shootDays: "30–35 Days",
    producer: "MR. JAYANTH SINHA",
    director: "MR. JAYANTH SINHA",
    executiveProducer: "MR. Vasu Bhandari",
    locations: "DELHI NCR",
    format: "Feature Film (Hindi / Regional Dialect)",
    budget: 68500000,
  };

  const summaryData = [
    { id: 'A', name: 'Above The Line (ATL)', budget: 18500000, share: 27.0, focus: 'Director, Script & Key Cast (Mid-tier/Indie ensembles)', color: '#bc2e5c' },
    { id: 'B', name: 'Below The Line (BTL) – Production', budget: 25500000, share: 37.2, focus: 'Line Production, Camera, Crew, Catering, Locations', color: '#3d8cd5' },
    { id: 'C', name: 'BTL – Post-Production', budget: 8500000, share: 12.4, focus: 'Editing, Sound Design, DI Color, Music Scoring', color: '#5e2ca5' },
    { id: 'D', name: 'Marketing & Public Relations (P&A)', budget: 11000000, share: 16.1, focus: 'Digital Campaigns, Trailer/Posters, PR, City Tour', color: '#e67e22' },
    { id: 'E', name: 'Legal, Insurance & Contingency', budget: 5000000, share: 7.3, focus: 'Insurance, Legal Clearance, 5% Unforeseen Reserve', color: '#2c3e50' },
  ];

  const breakdownData = [
    {
      category: 'A. Above The Line (ATL)',
      total: 18500000,
      color: '#bc2e5c',
      items: [
        { name: 'Story, Screenplay & Rights', amount: 2500000, desc: 'Script Purchase, Screenplay & Dialogue Commission' },
        { name: 'Director & Direction Team Fees', amount: 4500000, desc: "Director's Fee + Associate & Chief Assistant Director" },
        { name: 'Cast (Principal & Supporting Ensembles)', amount: 9500000, desc: 'Lead Actor (Peter Pandey), Lead Actress (Mohini), Key Character Roles (Guddu, Nalini, Pandit Ji, Dr. Kamal, Family Ensembles)' },
        { name: 'Producers & Development Overhead', amount: 2000000, desc: 'Line Producer setup, story rights clearing, initial development pool' },
      ]
    },
    {
      category: 'B. Production / Below The Line (BTL)',
      total: 25500000,
      color: '#3d8cd5',
      items: [
        { name: 'Production Crew & Personnel (35 Days Shoot)', amount: 5500000, desc: 'DoP, Gaffer, Key Grip, Art Director, Costume Designer, Sync Sound Engineer, Focus Puller, PAs' },
        { name: 'Camera, Lighting & Grip Equipment', amount: 3800000, desc: 'ARRI/RED Camera packages, Anamorphic prime lenses, basic lighting truck, generator vans' },
        { name: 'Art Department, Props & Set Dressing', amount: 3500000, desc: 'Cheka ceremony set modifications, local film set props (Shivji/snake setup), home interiors' },
        { name: 'Location Fees & Local Permits', amount: 2200000, desc: 'House rentals, outdoor shoot permissions, local liaison fees' },
        { name: 'Travel, Lodging & Logistics', amount: 4500000, desc: 'Hotel/homestay bookings for 35 days, local transport, vehicle rentals' },
        { name: 'Food, Catering & Craft Services', amount: 2000000, desc: 'Full meal services for crew/cast across pre-production and principal photography' },
        { name: 'Costumes, Hair & Makeup', amount: 2500000, desc: 'Colorism/shade modification FX makeup (Nalini/Mohini key scenes), wardrobe units' },
        { name: 'Background Extras & Day Players', amount: 1500000, desc: 'Wedding crowd, police station sequence, media crowd' },
      ]
    },
    {
      category: 'C. Post-Production',
      total: 8500000,
      color: '#5e2ca5',
      items: [
        { name: 'Picture Editing', amount: 1800000, desc: 'Senior Editor, Assistant Editors, Offline/Online Suite Rentals' },
        { name: 'Sound Design, Dubbing (ADR) & Mixing', amount: 2200000, desc: 'Foley, dialogue cleanup, Atmos final mix' },
        { name: 'Color Grading (DI)', amount: 1500000, desc: 'Senior Colorist & DI Facility Days' },
        { name: 'Original Soundtrack & Music Composition', amount: 2000000, desc: 'Original background score, song arrangement, mixing' },
        { name: 'VFX, Titles & Mastering', amount: 1000000, desc: 'Cosmetic cleanups, subtitle tracks, DCP generation, archival masters' },
      ]
    },
    {
      category: 'D. Marketing, PR & Promotions (P&A)',
      total: 11000000,
      color: '#e67e22',
      items: [
        { name: 'Digital & Social Media Marketing', amount: 4500000, desc: 'Influencer outreach, targeted digital ad spend, clip/reels distribution' },
        { name: 'Public Relations (PR) & Press Conferences', amount: 2500000, desc: 'Agency retainers, trailer launch event, media kits' },
        { name: 'Posters, Key Art & Trailer Cut', amount: 1500000, desc: 'Trailer editor, poster designer, asset localized variations' },
        { name: 'Press/City Tours & Pre-release Screenings', amount: 2500000, desc: 'Talent travel for press junkets, select festival screeners' },
      ]
    },
    {
      category: 'E. Contingency, Legal & Insurance',
      total: 5000000,
      color: '#2c3e50',
      items: [
        { name: 'Production & Errors/Omissions (E&O) Insurance', amount: 1500000, desc: '' },
        { name: 'Legal Fees & Contract Clearances', amount: 1000000, desc: '' },
        { name: 'Emergency Reserve / Contingency Buffer (~5%)', amount: 2500000, desc: '' },
      ]
    }
  ];

  const pitchHighlights = [
    { title: 'High Production Value-to-Cost Ratio', desc: 'Single-region location setup minimizes transit costs, maximizing on-screen visual value.' },
    { title: 'Commercial Satire Appeal', desc: 'Combines accessible comedy with strong social commentary, targeting both multiplex audiences and OTT platforms.' },
    { title: 'Controlled Risk Profile', desc: 'The allocated ₹1.10 Cr promotional budget guarantees strong digital visibility while keeping the production budget tight at ₹3.40 Cr total for BTL and Post.' },
  ];

  const infoGridItem = (label, value, highlight = false) => (
    <div>
      <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#666' }}>{label}</div>
      <div style={{ fontSize: highlight ? '14px' : '13px', fontWeight: highlight ? '700' : '500', color: highlight ? '#16a34a' : '#222' }}>{value}</div>
    </div>
  );

  return (
    <div className="topsheet-container" style={{
      background: '#ffffff',
      color: '#333',
      padding: '32px',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '100%',
      margin: '0 auto',
      border: '1px solid #eee'
    }}>
      {/* Hero Header */}
      <div style={{
        background: '#fcfcfc',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '24px',
        color: '#333',
        border: '1px solid #eee'
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 16px 0' }}>
          Production Budget Top Sheet
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {infoGridItem('Project Title', projectInfo.title, true)}
          {infoGridItem('Production House', projectInfo.productionHouse)}
          {infoGridItem('Director', projectInfo.director)}
          {infoGridItem('Producer', projectInfo.producer)}
          
          {infoGridItem('Executive Producer', projectInfo.executiveProducer)}
          {infoGridItem('Format', projectInfo.format)}
          {infoGridItem('Locations', projectInfo.locations)}
          
          {infoGridItem('Shooting Dates', projectInfo.shootingDates)}
          {infoGridItem('Shoot Days', projectInfo.shootDays)}
          {infoGridItem('Target Total Budget', '₹6,85,000,000 (INR 6.85 Crore)', true)}
        </div>
      </div>

      {/* Summary Section */}
      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px' }}>Budget Summary</h2>
      
      <div style={{ display: 'grid', gap: '16px', marginBottom: '48px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', color: '#555' }}>Category</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', color: '#555' }}>Key Focus Areas</th>
              <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '14px', color: '#555' }}>Budget Allocation</th>
              <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '14px', color: '#555' }}>Share (%)</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: idx !== summaryData.length - 1 ? '1px solid #eee' : 'none', background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '16px 24px', verticalAlign: 'top' }}>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: item.color }}>{item.name}</div>
                </td>
                <td style={{ padding: '16px 24px', verticalAlign: 'top', color: '#666', fontSize: '13px', maxWidth: '300px' }}>
                  {item.focus}
                </td>
                <td style={{ padding: '16px 24px', verticalAlign: 'top', textAlign: 'right', fontSize: '16px', fontWeight: '700' }}>
                  {formatCurrency(item.budget)}
                </td>
                <td style={{ padding: '16px 24px', verticalAlign: 'top', textAlign: 'right' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: item.color }}>{item.share}%</div>
                    <div style={{ width: '80px', height: '6px', background: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.share}%`, height: '100%', background: item.color, borderRadius: '3px' }}></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Departmental Breakdown */}
      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px' }}>Departmental Line-Item Breakdown</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {breakdownData.map((section, idx) => (
          <div key={idx} style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: '#f5f5f5', padding: '16px 24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: section.color }}>{section.category}</h3>
              <div style={{ fontSize: '18px', fontWeight: '800' }}>{formatCurrency(section.total)}</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {section.items.map((item, itemIdx) => (
                  <tr key={itemIdx} style={{ borderBottom: itemIdx !== section.items.length - 1 ? '1px solid #eee' : 'none' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: '#777' }}>{item.desc}</div>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right', fontWeight: '600' }}>{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Financial Pitch Highlights */}
      <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '48px 0 24px 0' }}>Financial Pitch Highlights</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {pitchHighlights.map((pitch, idx) => (
          <div key={idx} style={{ background: '#f9f9f9', padding: '24px', borderRadius: '12px', border: '1px solid #eee' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '700' }}>{pitch.title}</h4>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#555' }}>{pitch.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetTopsheet;
