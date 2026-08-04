import React, { useContext, useState } from 'react';
import { ProductionContext } from '../../context/ProductionContext';

const BudgetTopsheet = () => {
  const { data, metadata } = useContext(ProductionContext);
  
  const [overrides, setOverrides] = useState(() => {
    const saved = localStorage.getItem('cinedream_topsheet_overrides');
    return saved ? JSON.parse(saved) : {};
  });

  const handleOverrideChange = (type, index, field, value) => {
    setOverrides(prev => {
      const currentOverride = { ...(prev[`${type}_${index}`] || {}) };
      if (value === '' || value === null) {
        delete currentOverride[field];
      } else {
        currentOverride[field] = value;
      }
      const newOverrides = { ...prev, [`${type}_${index}`]: currentOverride };
      localStorage.setItem('cinedream_topsheet_overrides', JSON.stringify(newOverrides));
      return newOverrides;
    });
  };

  const formatCurrencyValue = (val) => {
    if (typeof val === 'string') return val;
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  // Helper resolvers for dynamic data calculation from Context Arrays
  
  // 1. Camera & Equipment (Look up in data.Equipment)
  const cameraEq = data.Equipment?.find(e => 
    e.name?.toLowerCase().includes('camera') || 
    e.name?.toLowerCase().includes('venice') ||
    e.model?.toLowerCase().includes('camera') || 
    e.model?.toLowerCase().includes('venice')
  );
  const cameraTotal = cameraEq ? (Number(cameraEq.rentalCostPerDay || 0) * Number(cameraEq.daysRented || 0)) : 175000;
  const cameraDays = cameraEq ? Number(cameraEq.daysRented || 5) : 5;
  const cameraPerDay = cameraEq ? Number(cameraEq.rentalCostPerDay || 35000) : 35000;

  // 2. Lights & Equipment (Look up in data.Equipment)
  const lightsEq = data.Equipment?.find(e => 
    (e.name?.toLowerCase().includes('light') || 
     e.name?.toLowerCase().includes('grip') || 
     e.name?.toLowerCase().includes('dolly') ||
     e.name?.toLowerCase().includes('drone') ||
     e.model?.toLowerCase().includes('light') ||
     e.model?.toLowerCase().includes('grip') ||
     e.model?.toLowerCase().includes('dolly') ||
     e.model?.toLowerCase().includes('drone')) &&
    e.id !== cameraEq?.id
  );
  const lightsTotal = lightsEq ? (Number(lightsEq.rentalCostPerDay || 0) * Number(lightsEq.daysRented || 0)) : 200000;
  const lightsDays = lightsEq ? Number(lightsEq.daysRented || 5) : 5;
  const lightsPerDay = lightsEq ? Number(lightsEq.rentalCostPerDay || 40000) : 40000;

  // Filter remaining non-mapped equipments
  const extraEquipments = (data.Equipment || []).filter(e => 
    e.id !== cameraEq?.id && e.id !== lightsEq?.id
  );

  // 3. DOP & Staff
  const dopCrew = data.HOD?.find(h => 
    h.role?.toLowerCase().includes('dop') || 
    h.role?.toLowerCase().includes('photography')
  );
  const dopTotal = dopCrew ? (Number(dopCrew.price || 0) * Number(dopCrew.daysScheduled || 0)) : 100000;

  // 4. Cast (4)
  const castList = (data.Actors || []).filter(a => 
    !a.role?.toLowerCase().includes('extra') && 
    !a.role?.toLowerCase().includes('talent')
  );
  const castTotal = castList.length > 0 
    ? castList.reduce((sum, a) => sum + (Number(a.perDayFee || 0) * Number(a.daysScheduled || 0)), 0) 
    : 400000;

  // 5. Local Transportation & Food
  const localTrans = data.Travel?.find(t => 
    t.travel?.toLowerCase().includes('local') || 
    t.vehicles?.toLowerCase().includes('innova') ||
    t.catering?.toLowerCase().includes('food')
  );
  const transTotal = localTrans ? Number(localTrans.price || 0) : 100000;
  const transDays = metadata.shootingDays || 5;
  const transPerDay = transTotal / transDays;

  // 6. Travelling cost to Delhi
  const travelDelhi = data.Travel?.find(t => 
    t.travel?.toLowerCase().includes('delhi') || 
    t.travel?.toLowerCase().includes('flight') || 
    t.travel?.toLowerCase().includes('train')
  );
  const travelDelhiTotal = travelDelhi ? Number(travelDelhi.price || 0) : 200000;

  // 7. Hotels
  const hotelArr = data.Travel?.find(t => 
    t.lodgingAndBoarding?.toLowerCase().includes('hotel') || 
    t.lodgingAndBoarding?.toLowerCase().includes('room')
  );
  const hotelTotal = hotelArr ? Number(hotelArr.price || 0) : 180000;
  const hotelDays = 6;
  const hotelPerDay = hotelTotal / hotelDays;

  // 8. Production Manager & Staff
  const pmCrew = data.HOD?.find(h => 
    h.role?.toLowerCase().includes('production manager') || 
    h.role?.toLowerCase().includes('pm')
  );
  const pmTotal = pmCrew ? (Number(pmCrew.price || 0) * Number(pmCrew.daysScheduled || 0)) : 35000;

  // 9. Extra Talent (15)
  const extrasList = (data.Actors || []).filter(a => 
    a.role?.toLowerCase().includes('extra') || 
    a.role?.toLowerCase().includes('talent')
  );
  const extrasTotal = extrasList.length > 0 
    ? extrasList.reduce((sum, a) => sum + (Number(a.perDayFee || 0) * Number(a.daysScheduled || 0)), 0) 
    : 15000;

  // 10. Art Director & Team
  const artCrew = data.HOD?.find(h => 
    h.role?.toLowerCase().includes('art') || 
    h.role?.toLowerCase().includes('designer')
  );
  const artTotal = artCrew ? (Number(artCrew.price || 0) * Number(artCrew.daysScheduled || 0)) : 20000;

  // 11. Sound
  const soundCrew = data.HOD?.find(h => h.role?.toLowerCase().includes('sound')) || 
                    data['Technical Crew']?.find(c => c.role?.toLowerCase().includes('sound'));
  const soundTotal = soundCrew ? (Number(soundCrew.price || 0) * Number(soundCrew.daysScheduled || 0)) : 8000;

  // 12. Makeup & Hair
  const makeupCrew = data['Technical Crew']?.find(c => 
    c.role?.toLowerCase().includes('makeup') || 
    c.role?.toLowerCase().includes('hair')
  );
  const makeupTotal = makeupCrew ? (Number(makeupCrew.price || 0) * Number(makeupCrew.daysScheduled || 0)) : 10000;

  // 13. (EXTRA) Locations
  const locVend = data.Vendors?.find(v => 
    v.description?.toLowerCase().includes('location') || 
    v.name?.toLowerCase().includes('location')
  );
  const locTotal = locVend ? Number(locVend.price || 0) : 200000;

  // 14. Property
  const propVend = data.Vendors?.find(v => 
    v.equipments?.toLowerCase().includes('prop') || 
    v.description?.toLowerCase().includes('prop')
  );
  const propTotal = propVend ? Number(propVend.price || 0) : 20000;

  // 15. Wardrobe Co-ordinator & Costumes
  const costumesCrew = data['Technical Crew']?.find(c => 
    c.role?.toLowerCase().includes('wardrobe') || 
    c.role?.toLowerCase().includes('costume')
  );
  const costumesTotal = costumesCrew ? (Number(costumesCrew.price || 0) * Number(costumesCrew.daysScheduled || 0)) : 25000;

  // 16. Director & Direction Team
  const dirCrew = data['Technical Crew']?.find(c => 
    c.role?.toLowerCase().includes('director') || 
    c.role?.toLowerCase().includes('ad')
  );
  const dirTotal = dirCrew ? (Number(dirCrew.price || 0) * Number(dirCrew.daysScheduled || 0)) : 70000;

  // Assemble dynamic production items
  const productionExpenses = [
    { no: '1.', name: 'Camera & Equipment (Sony Venice)', perDay: cameraPerDay, days: cameraDays, total: cameraTotal },
    { no: '2.', name: 'Lights & Equipment (Dolly Panther, Drone)', perDay: lightsPerDay, days: lightsDays, total: lightsTotal },
    { no: '3.', name: 'DOP & Staff', perDay: 'PACKAGE', days: 'PACKAGE', total: dopTotal },
    { no: '4.', name: `Cast (${castList.length || 4})`, perDay: 'PACKAGE', days: 'PACKAGE', total: castTotal },
    { no: '5.', name: 'Local Transportation & Food', perDay: 'PACKAGE', days: transDays, total: transTotal },
    { no: '6.', name: 'Travelling cost to Delhi (8000 per Person)', perDay: 'PACKAGE', days: 'PACKAGE', total: travelDelhiTotal },
    { no: '7.', name: 'Hotels (10 Rooms x 3000)', perDay: hotelPerDay, days: hotelDays, total: hotelTotal },
    { no: '8.', name: 'Production Manager & Production Staff (3)', perDay: 'PACKAGE', days: 'PACKAGE', total: pmTotal },
    { no: '9.', name: `Extra Talent (${extrasList.length ? extrasList.reduce((sum, e) => sum + (Number(e.daysScheduled) || 0), 0) : 15})`, perDay: extrasList[0] ? Number(extrasList[0].perDayFee) : 500, days: extrasList[0] ? Number(extrasList[0].daysScheduled) : 2, total: extrasTotal },
    { no: '10.', name: 'Art Director & Team', perDay: artCrew ? Number(artCrew.price) : 5000, days: artCrew ? Number(artCrew.daysScheduled) : 4, total: artTotal },
    { no: '11.', name: 'Sound', perDay: soundCrew ? Number(soundCrew.price) : 2000, days: soundCrew ? Number(soundCrew.daysScheduled) : 4, total: soundTotal },
    { no: '12.', name: 'Makeup & Hair', perDay: makeupCrew ? Number(makeupCrew.price) : 2500, days: makeupCrew ? Number(makeupCrew.daysScheduled) : 4, total: makeupTotal },
    { no: '13. (EXTRA)', name: 'Locations (+ Electricity)', perDay: locVend ? Number(locVend.price) / 4 : 50000, days: 4, total: locTotal },
    { no: '14.', name: 'Property', perDay: 'PACKAGE', days: 'PACKAGE', total: propTotal },
    { no: '15.', name: 'Wardrobe Co-ordinator & Costumes', perDay: 'PACKAGE', days: 'PACKAGE', total: costumesTotal },
    { no: '16.', name: 'Director & Direction Team (3)', perDay: 'PACKAGE', days: 'PACKAGE', total: dirTotal }
  ];

  // Append extra equipments dynamically!
  extraEquipments.forEach((eq, index) => {
    productionExpenses.push({
      no: `${17 + index}.`,
      name: eq.name + (eq.model ? ` (${eq.model})` : ''),
      perDay: Number(eq.rentalCostPerDay || 0),
      days: Number(eq.daysRented || 0),
      total: Number(eq.rentalCostPerDay || 0) * Number(eq.daysRented || 0)
    });
  });

  // Dynamic Post Production Lookup
  const editFin = data.Finance?.find(f => f.category?.toLowerCase().includes('edit'));
  const editTotal = editFin ? (Number(editFin.perDayCost || 0) * Number(editFin.workingDays || 0)) : 15000;

  const scoreFin = data.Finance?.find(f => f.category?.toLowerCase().includes('music') || f.category?.toLowerCase().includes('score'));
  const scoreTotal = scoreFin ? (Number(scoreFin.perDayCost || 0) * Number(scoreFin.workingDays || 0)) : 12000;

  const animFin = data.Finance?.find(f => f.category?.toLowerCase().includes('grading') || f.category?.toLowerCase().includes('di'));
  const animTotal = animFin ? (Number(animFin.perDayCost || 0) * Number(animFin.workingDays || 0)) : 15000;

  const vfxFin = data.Finance?.find(f => f.category?.toLowerCase().includes('vfx') || f.category?.toLowerCase().includes('cgi'));
  const vfxTotal = vfxFin ? (Number(vfxFin.perDayCost || 0) * Number(vfxFin.workingDays || 0)) : 15000;

  const postProductionExpenses = [
    { no: '1.', name: 'Film Editing', perDay: 'PACKAGE', days: 'PACKAGE', total: editTotal },
    { no: '2.', name: 'Music & Post Production Sound (Foley)', perDay: 'PACKAGE', days: 'PACKAGE', total: scoreTotal },
    { no: '3.', name: 'Animation & DI', perDay: 'PACKAGE', days: 'PACKAGE', total: animTotal },
    { no: '4.', name: 'Visual Effects', perDay: 'PACKAGE', days: 'PACKAGE', total: vfxTotal }
  ];

  const applyOverrides = (arr, type) => arr.map((exp, index) => {
    const override = overrides[`${type}_${index}`] || {};
    const perDay = override.perDay !== undefined ? override.perDay : exp.perDay;
    const days = override.days !== undefined ? override.days : exp.days;
    let total = exp.total;
    if (override.total !== undefined) {
      total = override.total;
    } else if (override.perDay !== undefined || override.days !== undefined) {
      if (perDay !== 'PACKAGE' && days !== 'PACKAGE' && !isNaN(perDay) && !isNaN(days)) {
        total = Number(perDay || 0) * Number(days || 0);
      }
    }
    return { ...exp, perDay, days, total, originalIndex: index };
  });

  const finalProductionExpenses = applyOverrides(productionExpenses, 'prod');
  const finalPostProductionExpenses = applyOverrides(postProductionExpenses, 'post');

  const totalProduction = finalProductionExpenses.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const totalPostProduction = finalPostProductionExpenses.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const totalBoth = totalProduction + totalPostProduction;
  const contingency = totalBoth * 0.10;
  const grandTotal = totalBoth + contingency;

  return (
    <div className="topsheet-container" style={{
      background: 'white',
      color: '#333',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '1000px',
      margin: '0 auto',
      overflowX: 'auto'
    }}>
      {/* Topsheet Header Bar */}
      <div style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '16px 20px',
        fontWeight: 'bold',
        fontSize: '20px',
        letterSpacing: '0.5px',
        fontFamily: 'monospace',
        marginBottom: '20px',
        borderRadius: '4px 4px 0 0'
      }}>
        BUDGET TOPSHEET
      </div>

      {/* Meta Specs Grid Block */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        border: '1px solid #ddd',
        padding: '16px 20px',
        backgroundColor: '#f8f9fa',
        fontSize: '13px',
        lineHeight: '1.8',
        marginBottom: '20px',
        borderRadius: '4px'
      }}>
        <div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '150px' }}>Production House</span><span>CineDreams Productions Private Limited</span></div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '150px' }}>Project Title</span><span>Maikhana Express</span></div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '150px' }}>Shooting Dates</span><span>{metadata.startDate} to {metadata.endDate}</span></div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '150px' }}>Shoot Days</span><span>30-35 Days</span></div>
        </div>
        <div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '180px' }}>Producer</span><span>MR. JAYANTH SINHA</span></div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '180px' }}>Director</span><span>MR. JAYANTH SINHA</span></div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '180px' }}>Executive Producer</span><span>MR. Vasu Bhandari</span></div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '180px' }}>Locations</span><span>DELHI NCR</span></div>
        </div>
      </div>

      {/* Production Expenses Table */}
      <div style={{ overflowX: 'auto', width: '100%', marginBottom: '24px', border: '1px solid #333', borderRadius: '4px', WebkitOverflowScrolling: 'touch' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '12px',
          textAlign: 'left',
          minWidth: '650px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#bc2e5c', color: 'white', fontWeight: 'bold' }}>
              <th style={{ padding: '8px 12px', border: '1px solid #333', width: '40px' }}></th>
              <th style={{ padding: '8px 12px', border: '1px solid #333' }}>PRODUCTION EXPENSES</th>
              <th style={{ padding: '8px 12px', border: '1px solid #333', width: '120px', textAlign: 'center' }}>PER DAY COST</th>
              <th style={{ padding: '8px 12px', border: '1px solid #333', width: '120px', textAlign: 'center' }}>TOTAL DAYS</th>
              <th style={{ padding: '8px 12px', border: '1px solid #333', width: '220px', textAlign: 'right' }}>TOTAL COST</th>
            </tr>
          </thead>
          <tbody>
            {finalProductionExpenses.map((exp, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#fcfcfc' }}>
                <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'center', fontWeight: 'bold' }}>{exp.no}</td>
                <td style={{ padding: '6px 12px', border: '1px solid #333', fontWeight: '500' }}>{exp.name}</td>
                <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'center' }}>
                  <input 
                    type="text" 
                    value={exp.perDay}
                    onChange={(e) => handleOverrideChange('prod', exp.originalIndex, 'perDay', e.target.value)}
                    style={{ width: '80px', textAlign: 'center', border: '1px solid #ccc', padding: '4px', borderRadius: '4px' }}
                  />
                </td>
                <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'center' }}>
                  <input 
                    type="text" 
                    value={exp.days}
                    onChange={(e) => handleOverrideChange('prod', exp.originalIndex, 'days', e.target.value)}
                    style={{ width: '60px', textAlign: 'center', border: '1px solid #ccc', padding: '4px', borderRadius: '4px' }}
                  />
                </td>
                <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'right', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <span style={{ fontWeight: 'normal', color: '#666', marginRight: '4px' }}>₹</span>
                    <input 
                      type="number" 
                      value={exp.total}
                      onChange={(e) => handleOverrideChange('prod', exp.originalIndex, 'total', e.target.value === '' ? '' : Number(e.target.value))}
                      style={{ width: '100px', textAlign: 'right', border: '1px solid #ccc', padding: '4px', borderRadius: '4px', fontWeight: 'bold' }}
                    />
                  </div>
                </td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#eef2f7', fontWeight: 'bold' }}>
              <td style={{ padding: '8px 12px', border: '1px solid #333' }}></td>
              <td style={{ padding: '8px 12px', border: '1px solid #333', textAlign: 'center' }} colSpan={3}>Total Production</td>
              <td style={{ padding: '8px 12px', border: '1px solid #333', textAlign: 'right', fontSize: '13px' }}>
                <span style={{ float: 'left', color: '#666' }}>₹</span>
                {formatCurrencyValue(totalProduction)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Post Production Expenses Table */}
      <div style={{ overflowX: 'auto', width: '100%', marginBottom: '20px', border: '1px solid #333', borderRadius: '4px', WebkitOverflowScrolling: 'touch' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '12px',
          textAlign: 'left',
          minWidth: '650px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#5e2ca5', color: 'white', fontWeight: 'bold' }}>
              <th style={{ padding: '8px 12px', border: '1px solid #333', width: '40px' }}></th>
              <th style={{ padding: '8px 12px', border: '1px solid #333' }}>POST-PRODUCTION EXPENSES</th>
              <th style={{ padding: '8px 12px', border: '1px solid #333', width: '120px', textAlign: 'center' }}></th>
              <th style={{ padding: '8px 12px', border: '1px solid #333', width: '120px', textAlign: 'center' }}></th>
              <th style={{ padding: '8px 12px', border: '1px solid #333', width: '220px', textAlign: 'right' }}></th>
            </tr>
          </thead>
          <tbody>
            {finalPostProductionExpenses.map((exp, index) => (
              <tr key={index} style={{ backgroundColor: 'white' }}>
                <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'center', fontWeight: 'bold' }}>{exp.no}</td>
                <td style={{ padding: '6px 12px', border: '1px solid #333', fontWeight: '500' }}>{exp.name}</td>
                <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'center' }}>
                  <input 
                    type="text" 
                    value={exp.perDay}
                    onChange={(e) => handleOverrideChange('post', exp.originalIndex, 'perDay', e.target.value)}
                    style={{ width: '80px', textAlign: 'center', border: '1px solid #ccc', padding: '4px', borderRadius: '4px' }}
                  />
                </td>
                <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'center' }}>
                  <input 
                    type="text" 
                    value={exp.days}
                    onChange={(e) => handleOverrideChange('post', exp.originalIndex, 'days', e.target.value)}
                    style={{ width: '60px', textAlign: 'center', border: '1px solid #ccc', padding: '4px', borderRadius: '4px' }}
                  />
                </td>
                <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'right', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <span style={{ fontWeight: 'normal', color: '#666', marginRight: '4px' }}>₹</span>
                    <input 
                      type="number" 
                      value={exp.total}
                      onChange={(e) => handleOverrideChange('post', exp.originalIndex, 'total', e.target.value === '' ? '' : Number(e.target.value))}
                      style={{ width: '100px', textAlign: 'right', border: '1px solid #ccc', padding: '4px', borderRadius: '4px', fontWeight: 'bold' }}
                    />
                  </div>
                </td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#eef2f7', fontWeight: 'bold' }}>
              <td style={{ padding: '8px 12px', border: '1px solid #333' }}></td>
              <td style={{ padding: '8px 12px', border: '1px solid #333', textAlign: 'center' }} colSpan={3}>Total Post Production</td>
              <td style={{ padding: '8px 12px', border: '1px solid #333', textAlign: 'right', fontSize: '13px' }}>
                <span style={{ float: 'left', color: '#666' }}>₹</span>
                {formatCurrencyValue(totalPostProduction)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary Totals Block */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: '12px'
      }}>
        <div style={{ width: '100%', maxWidth: '400px', border: '1px solid #333', borderTop: 'none' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
            <span style={{ flex: 1, padding: '6px 12px', fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'right' }}>TOTAL</span>
            <span style={{ width: '180px', padding: '6px 12px', fontWeight: 'bold', textAlign: 'right', borderLeft: '1px solid #333' }}>
              <span style={{ float: 'left', fontWeight: 'normal', color: '#666' }}>₹</span>
              {formatCurrencyValue(totalBoth)}
            </span>
          </div>
          <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
            <span style={{ flex: 1, padding: '6px 12px', fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'right' }}>10% CONTINGENCY</span>
            <span style={{ width: '180px', padding: '6px 12px', fontWeight: 'bold', textAlign: 'right', borderLeft: '1px solid #333' }}>
              <span style={{ float: 'left', fontWeight: 'normal', color: '#666' }}>₹</span>
              {formatCurrencyValue(contingency)}
            </span>
          </div>
          <div style={{ display: 'flex', backgroundColor: '#2c3e50', color: 'white' }}>
            <span style={{ flex: 1, padding: '8px 12px', fontWeight: 'bold', textAlign: 'right' }}>GRAND TOTAL</span>
            <span style={{ width: '180px', padding: '8px 12px', fontWeight: 'bold', textAlign: 'right', borderLeft: '1px solid #333', fontSize: '14px' }}>
              <span style={{ float: 'left', fontWeight: 'normal', color: 'rgba(255,255,255,0.7)' }}>₹</span>
              {formatCurrencyValue(grandTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTopsheet;
