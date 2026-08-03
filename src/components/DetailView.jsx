import React, { useContext } from 'react';
import { ProductionContext, calculateItemCost } from '../context/ProductionContext';

const DetailView = ({ activeModule, selectedItemId, setSelectedItemId, onEditClick }) => {
  const { data, deleteItem } = useContext(ProductionContext);

  const items = data[activeModule] || [];
  const item = items.find(i => i.id === selectedItemId);

  if (!item) {
    return (
      <div className="details-drawer empty-state">
        <span className="empty-state-icon">👤</span>
        <h3 className="empty-state-title">Select an item</h3>
        <p className="empty-state-text">Click on any card in the list to view its complete profile details and manage calculations.</p>
      </div>
    );
  }

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this record from ${activeModule}?`)) {
      deleteItem(activeModule, item.id);
      setSelectedItemId(null);
    }
  };

  const name = item.name || item.title || item.itemName || item.personName || item.catererName || `ID: ${item.id}`;
  const totalCost = calculateItemCost(activeModule, item);
  const paid = Number(item.paidAmount || 0);
  const pending = Math.max(0, totalCost - paid);

  // Initials generator
  const getInitials = (n) => {
    if (!n) return '?';
    return n.split(' ').map(x => x[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="details-drawer">
      {/* Header section of the Profile Page */}
      <div className="detail-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            className="icon-btn" 
            onClick={() => setSelectedItemId(null)} 
            title="Back to List"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            ⬅️
          </button>
          
          <div className="detail-avatar-section" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="detail-avatar" style={{ flexShrink: 0 }}>
              {getInitials(name)}
            </div>
            <div className="detail-title-section" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <h3 className="detail-title" style={{ fontSize: '18px', fontWeight: '800', lineHeight: '1.2', margin: 0 }}>{name}</h3>
              <span className="detail-subtitle" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className={`badge ${(item.status || 'Active').toLowerCase().replace(' ', '-')}`} style={{ padding: '2px 8px', borderRadius: '6px' }}>
                  {item.status || 'Active'}
                </span>
                {item.role && <span style={{ color: 'hsl(var(--text-muted))' }}>• {item.role}</span>}
              </span>
            </div>
          </div>
        </div>

        <div className="detail-header-actions" style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button 
            className="icon-btn" 
            onClick={() => onEditClick(item)} 
            title="Edit Record"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ✏️
          </button>
          <button 
            className="icon-btn delete" 
            onClick={handleDelete} 
            title="Delete Record"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            🗑️
          </button>
          <button 
            className="icon-btn" 
            onClick={() => setSelectedItemId(null)} 
            title="Close Page"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ❌
          </button>
        </div>
      </div>

      {/* Body section containing customized grids based on the module */}
      <div className="detail-body">
        
        {/* FINANCIALS SECTION (For all modules except Documents) */}
        {activeModule !== 'Documents' && (
          <div className="detail-section">
            <span className="detail-section-title">Financial Summary</span>
            <div className="detail-grid-info">
              <div className="detail-info-item">
                <span className="detail-info-label">Calculated Cost</span>
                <span className="detail-info-value" style={{ fontSize: '15px', color: 'hsl(var(--color-amber))', fontWeight: '700' }}>
                  {formatCurrency(totalCost)}
                </span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Paid Amount</span>
                <span className="detail-info-value" style={{ color: 'hsl(var(--color-emerald))' }}>{formatCurrency(paid)}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Pending Liability</span>
                <span className="detail-info-value" style={{ color: pending > 0 ? 'hsl(var(--color-rose))' : 'hsl(var(--text-secondary))' }}>
                  {formatCurrency(pending)}
                </span>
              </div>
              
              {/* Module Specific Cost Formats */}
              {activeModule === 'Actors' && (
                <>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Per-Day Cost</span>
                    <span className="detail-info-value">{formatCurrency(item.perDayFee)} / day</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Working Days</span>
                    <span className="detail-info-value">{item.daysScheduled} days</span>
                  </div>
                </>
              )}

              {activeModule === 'HOD' && (
                <>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Working Days</span>
                    <span className="detail-info-value">{item.daysScheduled || 0} days</span>
                  </div>
                </>
              )}

              {activeModule === 'Technical Crew' && (
                <>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Daily Rate</span>
                    <span className="detail-info-value">{formatCurrency(item.price)} / day</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Working Days</span>
                    <span className="detail-info-value">{item.daysScheduled} days</span>
                  </div>
                </>
              )}

              {activeModule === 'Equipment' && (
                <>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Daily Rental Cost</span>
                    <span className="detail-info-value">{formatCurrency(item.rentalCostPerDay)} / day</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Days Rented</span>
                    <span className="detail-info-value">{item.daysRented} days</span>
                  </div>
                </>
              )}

              {activeModule === 'Lodging & Boarding' && (
                <>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Nightly Rate</span>
                    <span className="detail-info-value">{formatCurrency(item.costPerDay)} / day</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Total Days</span>
                    <span className="detail-info-value">{item.totalDays} days</span>
                  </div>
                </>
              )}

              {activeModule === 'Vehicles' && (
                <>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Rental Rate</span>
                    <span className="detail-info-value">{formatCurrency(item.rentalCostPerDay)} / day</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Days Rented</span>
                    <span className="detail-info-value">{item.daysRented} days</span>
                  </div>
                </>
              )}

              {activeModule === 'Catering' && (
                <>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Cost per Head</span>
                    <span className="detail-info-value">{formatCurrency(item.costPerHead)}</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Head Count</span>
                    <span className="detail-info-value">{item.headCount} Pax</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Total Days Served</span>
                    <span className="detail-info-value">{item.days} days</span>
                  </div>
                </>
              )}

              {activeModule === 'Production Team' && (
                <>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Flat Salary</span>
                    <span className="detail-info-value">{formatCurrency(item.salary)}</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Daily Labor Rate</span>
                    <span className="detail-info-value">{formatCurrency(item.dailyRate)} / day</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Days Scheduled</span>
                    <span className="detail-info-value">{item.daysScheduled} days</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ACTORS DETAILED INFORMATION */}
        {activeModule === 'Actors' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Cast Profile Details</span>
              <div className="detail-grid-info" style={{ marginTop: '8px' }}>
                <div className="detail-info-item">
                  <span className="detail-info-label">Cast ID</span>
                  <span className="detail-info-value" style={{ color: 'hsl(var(--bg-accent))', fontWeight: '700' }}>
                    {item.castId || 'N/A'}
                  </span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Full Name</span>
                  <span className="detail-info-value" style={{ fontWeight: '700' }}>
                    {item.name || 'N/A'}
                  </span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Character Name</span>
                  <span className="detail-info-value" style={{ fontWeight: '700' }}>
                    {item.characterName || 'N/A'}
                  </span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Role / Designation</span>
                  <span className="detail-info-value" style={{ fontWeight: '700' }}>
                    {item.role || 'N/A'}
                  </span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Email ID</span>
                  <span className="detail-info-value">{item.email || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Phone Number</span>
                  <span className="detail-info-value">{item.phone || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Instagram ID</span>
                  <span className="detail-info-value">{item.instagramId || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Working Days</span>
                  <span className="detail-info-value">{item.daysScheduled || '0'} Days</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">PER DAY COST</span>
                  <span className="detail-info-value" style={{ fontWeight: '700', color: '#5c715e' }}>{formatCurrency(item.perDayFee)}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* DIRECTORS */}
        {activeModule === 'Directors' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Biography & Vision</span>
              <p className="detail-text-block">{item.biography || "No biography details available."}</p>
            </div>
            <div className="detail-section">
              <span className="detail-section-title">Details & Preferences</span>
              <div className="detail-grid-info">
                <div className="detail-info-item">
                  <span className="detail-info-label">Directing Experience</span>
                  <span className="detail-info-value">{item.experience} years</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Availability Schedule</span>
                  <span className="detail-info-value">{item.availability || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Travel Profile</span>
                  <span className="detail-info-value">{item.travelPreferences || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Office Contact</span>
                  <span className="detail-info-value">{item.contactInfo?.email || item.contactInfo?.phone || 'N/A'}</span>
                </div>
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Preferred Key Crew Members</span>
                  <span className="detail-info-value">{item.preferredCrew || 'N/A'}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* HOD */}
        {activeModule === 'HOD' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">HOD Assignment Details</span>
              <div className="detail-grid-info">
                <div className="detail-info-item">
                  <span className="detail-info-label">Crew ID</span>
                  <span className="detail-info-value" style={{ color: 'hsl(var(--bg-accent))', fontWeight: '700' }}>{item.crewId || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Full Name</span>
                  <span className="detail-info-value" style={{ fontWeight: '700' }}>{item.name || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Role</span>
                  <span className="detail-info-value" style={{ fontWeight: '700' }}>{item.role || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Department</span>
                  <span className="detail-info-value">{item.department || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Email ID</span>
                  <span className="detail-info-value">{item.email || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Phone Number</span>
                  <span className="detail-info-value">{item.phone || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Instagram ID</span>
                  <span className="detail-info-value">{item.instagramId || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Working Days</span>
                  <span className="detail-info-value">{item.daysScheduled || '0'} Days</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TECHNICAL CREW */}
        {activeModule === 'Technical Crew' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Crew Assignment Details</span>
              <div className="detail-grid-info">
                <div className="detail-info-item">
                  <span className="detail-info-label">Crew ID</span>
                  <span className="detail-info-value" style={{ color: 'hsl(var(--bg-accent))', fontWeight: '700' }}>
                    {item.crewId || 'N/A'}
                  </span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Full Name</span>
                  <span className="detail-info-value" style={{ fontWeight: '700' }}>{item.name || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Role</span>
                  <span className="detail-info-value" style={{ fontWeight: '700' }}>{item.role || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Department</span>
                  <span className="detail-info-value">{item.department || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Email ID</span>
                  <span className="detail-info-value">{item.email || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Phone Number</span>
                  <span className="detail-info-value">{item.phone || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Instagram ID</span>
                  <span className="detail-info-value">{item.instagramId || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Working Days</span>
                  <span className="detail-info-value">{item.daysScheduled || '0'} Days</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Price / Daily Rate</span>
                  <span className="detail-info-value" style={{ fontWeight: '700', color: '#5c715e' }}>{formatCurrency(item.price)}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* EQUIPMENT */}
        {activeModule === 'Equipment' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Equipment Specifications</span>
              <div className="detail-grid-info">
                <div className="detail-info-item">
                  <span className="detail-info-label">Category</span>
                  <span className="detail-info-value">{item.category}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Model Name</span>
                  <span className="detail-info-value">{item.model}</span>
                </div>
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Serial Number</span>
                  <span className="detail-info-value" style={{ fontFamily: 'monospace' }}>{item.serialNumber}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Active Operator</span>
                  <span className="detail-info-value">{item.operator || 'None'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Assigned Unit</span>
                  <span className="detail-info-value">{item.assignedProject || 'Main Unit'}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <span className="detail-section-title">Maintenance Record</span>
              <p className="detail-text-block">{item.maintenanceHistory || "No maintenance history logged."}</p>
            </div>
          </>
        )}

        {/* TRAVEL */}
        {activeModule === 'Travel' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Logistics Details</span>
              <div className="detail-grid-info">
                <div className="detail-info-item">
                  <span className="detail-info-label">Passenger / Cargo</span>
                  <span className="detail-info-value">{item.personName}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Affiliated Role</span>
                  <span className="detail-info-value">{item.role}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Transit Mode</span>
                  <span className="detail-info-value">{item.type}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Booking Reference</span>
                  <span className="detail-info-value">{item.bookingNumber}</span>
                </div>
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Departure / Time</span>
                  <span className="detail-info-value">{item.time}</span>
                </div>
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Pickup Point</span>
                  <span className="detail-info-value">{item.pickupLocation}</span>
                </div>
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Destination Address</span>
                  <span className="detail-info-value">{item.dropLocation}</span>
                </div>
              </div>
            </div>

             <div className="detail-section">
              <span className="detail-section-title">Itinerary Summary</span>
              <p className="detail-text-block">{item.itinerary || "No written itinerary."}</p>
            </div>

            <div className="detail-section">
              <span className="detail-section-title">Linked Arrangements</span>
              <div className="detail-grid-info">
                <div className="detail-info-item">
                  <span className="detail-info-label">Lodging Hotel Room</span>
                  <span className="detail-info-value">{item.hotelBooking || 'Hotel Delhi Heights (10 Rooms)'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Costumes Transit</span>
                  <span className="detail-info-value">{item.costumesTransit || 'Cast Wardrobe Trunk #1 & #2'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Catering Meals</span>
                  <span className="detail-info-value">{item.cateringTransit || 'Travel Catering Pack (25 Box lunches)'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Pickup Cab / Driver</span>
                  <span className="detail-info-value">{item.pickupVehicle || '3 Innovas & 2 Cargo Cabs'}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* LODGING & BOARDING */}
        {activeModule === 'Lodging & Boarding' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Hotel Accommodations</span>
              <div className="detail-grid-info">
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Hotel Name</span>
                  <span className="detail-info-value">{item.hotelName}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Allocated Rooms</span>
                  <span className="detail-info-value">{item.roomNumber || 'TBD'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Room Category</span>
                  <span className="detail-info-value">{item.roomType}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Check-in</span>
                  <span className="detail-info-value">{item.checkIn}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Check-out</span>
                  <span className="detail-info-value">{item.checkOut}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Boarding Diet Plan</span>
                  <span className="detail-info-value">{item.mealPlan}</span>
                </div>
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Special Accommodation Needs</span>
                  <span className="detail-info-value">{item.specialRequirements || 'None'}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* COSTUMES */}
        {activeModule === 'Costumes' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Costume Specs</span>
              <div className="detail-grid-info">
                <div className="detail-info-item">
                  <span className="detail-info-label">Designer</span>
                  <span className="detail-info-value">{item.designer}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Fitting Date</span>
                  <span className="detail-info-value">{item.fittingDate}</span>
                </div>
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Actor Assigned</span>
                  <span className="detail-info-value">{item.assignedActor}</span>
                </div>
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Fitted Measurements</span>
                  <span className="detail-info-value" style={{ fontSize: '12px' }}>{item.measurements}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Return Status</span>
                  <span className="detail-info-value">{item.returnStatus}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Wardrobe Location</span>
                  <span className="detail-info-value">{item.maintenanceStatus}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* LOCATIONS */}
        {activeModule === 'Locations' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Location Management</span>
              <div className="detail-grid-info">
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Scouted Address</span>
                  <span className="detail-info-value">{item.address}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">On-Site Contact</span>
                  <span className="detail-info-value">{item.contactPerson}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Shooting Days</span>
                  <span className="detail-info-value">{item.durationDays} Days</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* PRODUCTION TEAM */}
        {activeModule === 'Production Team' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Staff Details</span>
              <div className="detail-grid-info">
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Email / Contact</span>
                  <span className="detail-info-value">{item.contactInfo}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* VENDORS */}
        {activeModule === 'Vendors' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Vendor Account Details</span>
              <div className="detail-grid-info">
                <div className="detail-info-item">
                  <span className="detail-info-label">Vendor ID</span>
                  <span className="detail-info-value" style={{ color: 'hsl(var(--bg-accent))', fontWeight: '700' }}>{item.vendorId || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Vendor Name</span>
                  <span className="detail-info-value" style={{ fontWeight: '700' }}>{item.name || 'N/A'}</span>
                </div>
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Equipments Supplied</span>
                  <span className="detail-info-value">{item.equipments || 'N/A'}</span>
                </div>
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Description</span>
                  <span className="detail-info-value">{item.description || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Price</span>
                  <span className="detail-info-value" style={{ fontWeight: '700', color: '#5c715e' }}>{formatCurrency(item.price)}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Email ID</span>
                  <span className="detail-info-value">{item.email || 'N/A'}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Contact Number</span>
                  <span className="detail-info-value">{item.contact || 'N/A'}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* VEHICLES */}
        {activeModule === 'Vehicles' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Vehicle & Driver Details</span>
              <div className="detail-grid-info">
                <div className="detail-info-item">
                  <span className="detail-info-label">License Plate</span>
                  <span className="detail-info-value" style={{ fontFamily: 'monospace' }}>{item.plateNumber}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Driver Name</span>
                  <span className="detail-info-value">{item.driverName}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Driver Mobile</span>
                  <span className="detail-info-value">{item.driverContact}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Current Task/Assign</span>
                  <span className="detail-info-value">{item.assignment}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* CATERING */}
        {activeModule === 'Catering' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Catering Log</span>
              <div className="detail-grid-info">
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Meal Style</span>
                  <span className="detail-info-value">{item.mealType}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* FINANCE */}
        {activeModule === 'Finance' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Expense Details</span>
              <div className="detail-grid-info">
                <div className="detail-info-item">
                  <span className="detail-info-label">Finance ID</span>
                  <span className="detail-info-value" style={{ color: 'hsl(var(--bg-accent))', fontWeight: '700' }}>
                    {item.financeId || (item.id === 'fin-1' ? 'FIN-01' : item.id === 'fin-2' ? 'FIN-02' : item.id === 'fin-3' ? 'FIN-03' : item.id === 'fin-4' ? 'FIN-04' : item.id === 'fin-5' ? 'FIN-05' : 'FIN-TBD')}
                  </span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Cost Category</span>
                  <span className="detail-info-value" style={{ fontWeight: '700' }}>{item.category}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Per Day Cost</span>
                  <span className="detail-info-value">
                    {item.perDayCost ? `${formatCurrency(item.perDayCost)} / day` : 'Flat Rate'}
                  </span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Working Days</span>
                  <span className="detail-info-value">
                    {item.workingDays ? `${item.workingDays} days` : 'Flat Package'}
                  </span>
                </div>
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Email ID</span>
                  <span className="detail-info-value">
                    {item.email || (item.id === 'fin-1' ? 'production@cinedreampromo.com' : item.id === 'fin-2' ? 'editor@cinedreampromo.com' : item.id === 'fin-3' ? 'colorist.di@cinedreampromo.com' : item.id === 'fin-4' ? 'sound.design@cinedreampromo.com' : item.id === 'fin-5' ? 'vfx.artist@cinedreampromo.com' : 'finance@cinedream.in')}
                  </span>
                </div>
                <div className="detail-info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-info-label">Phone Number</span>
                  <span className="detail-info-value">
                    {item.phone || (item.id === 'fin-1' ? '+91 99000 88888' : '+91 99999 88888')}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* DOCUMENTS */}
        {activeModule === 'Documents' && (
          <>
            <div className="detail-section">
              <span className="detail-section-title">Document Metadata</span>
              <div className="detail-grid-info">
                <div className="detail-info-item">
                  <span className="detail-info-label">Category</span>
                  <span className="detail-info-value">{item.category}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">File Type Extension</span>
                  <span className="detail-info-value">{item.fileType}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Upload Date</span>
                  <span className="detail-info-value">{item.uploadDate}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">File Storage Size</span>
                  <span className="detail-info-value">{item.size}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* NOTES SECTION (For all modules) */}
        <div className="detail-section">
          <span className="detail-section-title">Production Notes</span>
          <p className="detail-text-block" style={{ fontStyle: 'italic', fontSize: '12px' }}>
            {item.notes || "No production notes added yet."}
          </p>
        </div>

      </div>
    </div>
  );
};

export default DetailView;
