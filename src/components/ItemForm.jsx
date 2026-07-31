import React, { useState, useEffect, useContext } from 'react';
import { ProductionContext } from '../context/ProductionContext';

const ItemForm = ({ activeModule, itemToEdit, onClose }) => {
  const { addItem, updateItem } = useContext(ProductionContext);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (itemToEdit) {
      // Flatten nested structures for form fields
      const flatData = { ...itemToEdit };
      if (itemToEdit.contactInfo) {
        flatData.contactInfoPhone = itemToEdit.contactInfo.phone;
        flatData.contactInfoEmail = itemToEdit.contactInfo.email;
      } else if (typeof itemToEdit.contactInfo === 'string') {
        flatData.contactInfoText = itemToEdit.contactInfo;
      }
      if (itemToEdit.socialMedia) {
        flatData.socialMediaInstagram = itemToEdit.socialMedia.instagram;
        flatData.socialMediaTwitter = itemToEdit.socialMedia.twitter;
      }
      setFormData(flatData);
    } else {
      // Set defaults
      setFormData({
        status: activeModule === 'Equipment' ? 'Available' : activeModule === 'Travel' ? 'Booked' : 'Active',
        daysScheduled: 1,
        daysRented: 1,
        days: 1,
        totalDays: 1,
        paidAmount: 0
      });
    }
  }, [itemToEdit, activeModule]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reconstruct nested structures
    const submission = { ...formData };
    
    if (activeModule === 'Actors' || activeModule === 'Directors') {
      submission.contactInfo = {
        phone: formData.contactInfoPhone || "",
        email: formData.contactInfoEmail || ""
      };
      delete submission.contactInfoPhone;
      delete submission.contactInfoEmail;

      if (activeModule === 'Actors') {
        submission.socialMedia = {
          instagram: formData.socialMediaInstagram || "",
          twitter: formData.socialMediaTwitter || ""
        };
        delete submission.socialMediaInstagram;
        delete submission.socialMediaTwitter;
      }
    } else if (activeModule === 'Production Team' && formData.contactInfoText !== undefined) {
      submission.contactInfo = formData.contactInfoText;
      delete submission.contactInfoText;
    }

    if (itemToEdit) {
      updateItem(activeModule, itemToEdit.id, submission);
    } else {
      addItem(activeModule, submission);
    }
    onClose();
  };

  // Dynamic input fields generator per module
  const renderFormFields = () => {
    switch (activeModule) {
      case 'Actors':
        return (
          <>
            <span className="form-section-title">Main Information</span>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Character Role</label>
              <input type="text" name="role" className="form-control" placeholder="e.g. Lead Actor (Hayes)" value={formData.role || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Activity Status</label>
              <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Idle">Idle</option>
              </select>
            </div>

            <span className="form-section-title">Financial Compensation</span>
            <div className="form-group">
              <label className="form-label">Acting Fee (₹)</label>
              <input type="number" name="actingFee" className="form-control" value={formData.actingFee || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Per-Day Rate (₹)</label>
              <input type="number" name="perDayFee" className="form-control" value={formData.perDayFee || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Shooting Days Scheduled</label>
              <input type="number" name="daysScheduled" className="form-control" value={formData.daysScheduled || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Compensation (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Wardrobe & Style Specs</span>
            <div className="form-group">
              <label className="form-label">Costume Measurements</label>
              <input type="text" name="costumeMeasurements" className="form-control" placeholder="Chest, Waist, Height, Shoes..." value={formData.costumeMeasurements || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Makeup Requirements</label>
              <input type="text" name="makeupRequirements" className="form-control" placeholder="e.g., Hair extensions, scar prosthetics" value={formData.makeupRequirements || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Logistics preferences</span>
            <div className="form-group">
              <label className="form-label">Food Preference</label>
              <input type="text" name="foodPreferences" className="form-control" placeholder="e.g. Vegan, Halal" value={formData.foodPreferences || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Dietary Restrictions</label>
              <input type="text" name="dietaryRestrictions" className="form-control" placeholder="Allergies, intolerances..." value={formData.dietaryRestrictions || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Travel Route Class</label>
              <input type="text" name="travelPreferences" className="form-control" placeholder="e.g., First Class, Exec SUV" value={formData.travelPreferences || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Accommodation Style</label>
              <input type="text" name="accommodationPreferences" className="form-control" placeholder="e.g., 5-Star Suite, Private Kitchen" value={formData.accommodationPreferences || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Biography & Contacts</span>
            <div className="form-group full-width">
              <label className="form-label">Biography Overview</label>
              <textarea name="biography" className="form-control" value={formData.biography || ''} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Phone Contact</label>
              <input type="text" name="contactInfoPhone" className="form-control" value={formData.contactInfoPhone || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" name="contactInfoEmail" className="form-control" value={formData.contactInfoEmail || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Relationship Status</label>
              <input type="text" name="relationshipStatus" className="form-control" value={formData.relationshipStatus || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Shooting Availability Window</label>
              <input type="text" name="availabilitySchedule" className="form-control" placeholder="e.g. Aug 15 - Sep 10" value={formData.availabilitySchedule || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Safety & Socials</span>
            <div className="form-group">
              <label className="form-label">Emergency Contact Name/No.</label>
              <input type="text" name="emergencyContact" className="form-control" placeholder="Contact Name - +1 ..." value={formData.emergencyContact || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Medical Details / Allergies</label>
              <input type="text" name="medicalInformation" className="form-control" placeholder="Blood type, chronic illnesses..." value={formData.medicalInformation || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Instagram profile handle</label>
              <input type="text" name="socialMediaInstagram" className="form-control" placeholder="@username" value={formData.socialMediaInstagram || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Twitter / X handle</label>
              <input type="text" name="socialMediaTwitter" className="form-control" placeholder="@username" value={formData.socialMediaTwitter || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Previous Project Highlights</label>
              <input type="text" name="previousProjects" className="form-control" value={formData.previousProjects || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Key Awards & Honors</label>
              <input type="text" name="awards" className="form-control" value={formData.awards || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Miscellaneous Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      case 'Directors':
        return (
          <>
            <span className="form-section-title">Main Information</span>
            <div className="form-group">
              <label className="form-label">Director Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Experience (Years)</label>
              <input type="number" name="experience" className="form-control" value={formData.experience || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Availability Schedule</label>
              <input type="text" name="availability" className="form-control" value={formData.availability || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Activity Status</label>
              <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Idle">Idle</option>
              </select>
            </div>

            <span className="form-section-title">Financial Compensation</span>
            <div className="form-group">
              <label className="form-label">Directing Fee (₹)</label>
              <input type="number" name="directingFee" className="form-control" value={formData.directingFee || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Amount (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Preferences & Communication</span>
            <div className="form-group full-width">
              <label className="form-label">Biography / Visual Style</label>
              <textarea name="biography" className="form-control" value={formData.biography || ''} onChange={handleChange}></textarea>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Preferred Key Crew</label>
              <input type="text" name="preferredCrew" className="form-control" placeholder="DOP, Composer, Sound Designer..." value={formData.preferredCrew || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Travel Profile</label>
              <input type="text" name="travelPreferences" className="form-control" placeholder="First Class, dedicated driver..." value={formData.travelPreferences || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Assistant Phone</label>
              <input type="text" name="contactInfoPhone" className="form-control" value={formData.contactInfoPhone || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Assistant Email</label>
              <input type="email" name="contactInfoEmail" className="form-control" value={formData.contactInfoEmail || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Production Director Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      case 'Technical Crew':
        return (
          <>
            <span className="form-section-title">Crew Specs</span>
            <div className="form-group">
              <label className="form-label">Crew Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Functional Role</label>
              <input type="text" name="role" className="form-control" placeholder="e.g. Gaffer, DOP, Focus Puller" value={formData.role || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select name="department" className="form-control" value={formData.department || ''} onChange={handleChange}>
                <option value="Camera">Camera</option>
                <option value="Sound">Sound</option>
                <option value="Lights">Lights</option>
                <option value="Art">Art</option>
                <option value="Editing">Editing</option>
                <option value="Wardrobe">Wardrobe</option>
                <option value="Makeup">Makeup</option>
                <option value="Stunts">Stunts</option>
                <option value="Production">Production</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Experience (Years)</label>
              <input type="number" name="experience" className="form-control" value={formData.experience || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Labor & Rates</span>
            <div className="form-group">
              <label className="form-label">Daily Labor Rate (₹)</label>
              <input type="number" name="dailyRate" className="form-control" value={formData.dailyRate || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Days Scheduled</label>
              <input type="number" name="daysScheduled" className="form-control" value={formData.daysScheduled || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Labor (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Availability Schedule</label>
              <input type="text" name="availability" className="form-control" placeholder="Aug 15 - Oct 10" value={formData.availability || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Equipment & Logistics</span>
            <div className="form-group">
              <label className="form-label">Equipment Assigned</label>
              <input type="text" name="equipmentAssigned" className="form-control" placeholder="Assigned camera/sound kits..." value={formData.equipmentAssigned || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Certifications</label>
              <input type="text" name="certifications" className="form-control" placeholder="OSHA, Guild memberships..." value={formData.certifications || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Travel Settings</label>
              <input type="text" name="travelPreferences" className="form-control" placeholder="Premium Econ, rental car..." value={formData.travelPreferences || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Activity Status</label>
              <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Idle">Idle</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Crew Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      case 'Equipment':
        return (
          <>
            <span className="form-section-title">Equipment Specs</span>
            <div className="form-group">
              <label className="form-label">Equipment Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select name="category" className="form-control" value={formData.category || ''} onChange={handleChange}>
                <option value="Camera">Camera</option>
                <option value="Audio">Audio</option>
                <option value="Lighting">Lighting</option>
                <option value="Grip">Grip</option>
                <option value="Rigging">Rigging</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Model</label>
              <input type="text" name="model" className="form-control" value={formData.model || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Serial Number</label>
              <input type="text" name="serialNumber" className="form-control" value={formData.serialNumber || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Lease & Rentals</span>
            <div className="form-group">
              <label className="form-label">Rental Cost Per Day (₹)</label>
              <input type="number" name="rentalCostPerDay" className="form-control" value={formData.rentalCostPerDay || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Days Rented</label>
              <input type="number" name="daysRented" className="form-control" value={formData.daysRented || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Rental (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Physical Status</label>
              <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Damaged">Damaged</option>
              </select>
            </div>

            <span className="form-section-title">Logistics & Assignment</span>
            <div className="form-group">
              <label className="form-label">Assigned Project Unit</label>
              <input type="text" name="assignedProject" className="form-control" value={formData.assignedProject || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Operator Crew ID</label>
              <input type="text" name="operator" className="form-control" placeholder="Name of crew operating this gear" value={formData.operator || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Maintenance History Log</label>
              <textarea name="maintenanceHistory" className="form-control" placeholder="Calibration dates, repairs..." value={formData.maintenanceHistory || ''} onChange={handleChange}></textarea>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Storage Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      case 'Travel':
        return (
          <>
            <span className="form-section-title">Transit Details</span>
            <div className="form-group">
              <label className="form-label">Passenger / Cargo Name *</label>
              <input type="text" name="personName" className="form-control" value={formData.personName || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Affiliated Role</label>
              <input type="text" name="role" className="form-control" placeholder="e.g. Lead Actor, Crew, Equipment" value={formData.role || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Transit Mode Type</label>
              <select name="type" className="form-control" value={formData.type || ''} onChange={handleChange}>
                <option value="Flight">Flight</option>
                <option value="Train">Train</option>
                <option value="Cab">Cab</option>
                <option value="Freight">Freight</option>
                <option value="Helicopter">Helicopter</option>
                <option value="Boat">Boat</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Booking Ticket Number</label>
              <input type="text" name="bookingNumber" className="form-control" value={formData.bookingNumber || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Itinerary & Schedule</span>
            <div className="form-group full-width">
              <label className="form-label">Itinerary Description</label>
              <textarea name="itinerary" className="form-control" placeholder="Flight routes, transfer timings..." value={formData.itinerary || ''} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Pickup Address/Lounge</label>
              <input type="text" name="pickupLocation" className="form-control" value={formData.pickupLocation || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Drop Destination Address</label>
              <input type="text" name="dropLocation" className="form-control" value={formData.dropLocation || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Departure Time</label>
              <input type="text" name="time" className="form-control" placeholder="YYYY-MM-DD HH:MM" value={formData.time || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Transit Status</label>
              <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                <option value="Booked">Booked</option>
                <option value="In Transit">In Transit</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <span className="form-section-title">Travel Budget</span>
            <div className="form-group">
              <label className="form-label">Transit Expense (₹)</label>
              <input type="number" name="expenses" className="form-control" value={formData.expenses || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Travel Cost (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Logistical Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      case 'Lodging & Boarding':
        return (
          <>
            <span className="form-section-title">Hotel Booking Details</span>
            <div className="form-group">
              <label className="form-label">Guest / Group Name *</label>
              <input type="text" name="personName" className="form-control" value={formData.personName || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Hotel Name</label>
              <input type="text" name="hotelName" className="form-control" value={formData.hotelName || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Allocated Rooms</label>
              <input type="text" name="roomNumber" className="form-control" placeholder="e.g. Room 402, 12 rooms block" value={formData.roomNumber || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Room Category Type</label>
              <input type="text" name="roomType" className="form-control" placeholder="e.g. Luxury Suite, Standard Double" value={formData.roomType || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Duration & Boarding</span>
            <div className="form-group">
              <label className="form-label">Check-in Date</label>
              <input type="date" name="checkIn" className="form-control" value={formData.checkIn || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Check-out Date</label>
              <input type="date" name="checkOut" className="form-control" value={formData.checkOut || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Boarding Meal Plan</label>
              <input type="text" name="mealPlan" className="form-control" placeholder="e.g. All-inclusive, Half-board" value={formData.mealPlan || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Special Accommodate Needs</label>
              <input type="text" name="specialRequirements" className="form-control" placeholder="Dehumidifier, silent floor..." value={formData.specialRequirements || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Lodging Rates</span>
            <div className="form-group">
              <label className="form-label">Nightly Hotel Rate (₹)</label>
              <input type="number" name="costPerDay" className="form-control" value={formData.costPerDay || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Total Days stay</label>
              <input type="number" name="totalDays" className="form-control" value={formData.totalDays || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Booking (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Booking Status</label>
              <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                <option value="Booked">Booked</option>
                <option value="Active">Active</option>
                <option value="Checked Out">Checked Out</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Lodging Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      case 'Costumes':
        return (
          <>
            <span className="form-section-title">Wardrobe Specs</span>
            <div className="form-group">
              <label className="form-label">Costume Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Designer Studio</label>
              <input type="text" name="designer" className="form-control" value={formData.designer || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Fitting Date</label>
              <input type="date" name="fittingDate" className="form-control" value={formData.fittingDate || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Assigned Cast Actor</label>
              <input type="text" name="assignedActor" className="form-control" value={formData.assignedActor || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Measurements details</label>
              <input type="text" name="measurements" className="form-control" placeholder="Chest, waist, inseam, height..." value={formData.measurements || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Status & Pricing</span>
            <div className="form-group">
              <label className="form-label">Costume Price (₹)</label>
              <input type="number" name="cost" className="form-control" value={formData.cost || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Price (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Fabrication Status</label>
              <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                <option value="Design">Design</option>
                <option value="Fabrication">Fabrication</option>
                <option value="Ready">Ready</option>
                <option value="Alteration">Alteration</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Return Status</label>
              <input type="text" name="returnStatus" className="form-control" placeholder="e.g. In Studio, On Set" value={formData.returnStatus || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Maintenance Detail</label>
              <input type="text" name="maintenanceStatus" className="form-control" placeholder="Dry cleaned, repaired visor..." value={formData.maintenanceStatus || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Costume Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      case 'Locations':
        return (
          <>
            <span className="form-section-title">Location Details</span>
            <div className="form-group">
              <label className="form-label">Location Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Person</label>
              <input type="text" name="contactPerson" className="form-control" value={formData.contactPerson || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Scouted Address *</label>
              <input type="text" name="address" className="form-control" value={formData.address || ''} onChange={handleChange} required />
            </div>

            <span className="form-section-title">Pricing & Duration</span>
            <div className="form-group">
              <label className="form-label">Rental Fee (₹)</label>
              <input type="number" name="rentalFee" className="form-control" value={formData.rentalFee || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Rental Fee (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Filming Duration (Days)</label>
              <input type="number" name="durationDays" className="form-control" value={formData.durationDays || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Location Booking Status</label>
              <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                <option value="Scouting">Scouting</option>
                <option value="Under Review">Under Review</option>
                <option value="Booked">Booked</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Environmental Safety Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      case 'Production Team':
        return (
          <>
            <span className="form-section-title">Production Staff Details</span>
            <div className="form-group">
              <label className="form-label">Staff Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Production Role</label>
              <input type="text" name="role" className="form-control" placeholder="e.g. Line Producer, Unit Manager" value={formData.role || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Communication email</label>
              <input type="text" name="contactInfoText" className="form-control" value={formData.contactInfoText || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Activity Status</label>
              <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Idle">Idle</option>
              </select>
            </div>

            <span className="form-section-title">Budget Details</span>
            <div className="form-group">
              <label className="form-label">Flat Contract Salary (₹)</label>
              <input type="number" name="salary" className="form-control" value={formData.salary || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Daily Labor Rate (₹)</label>
              <input type="number" name="dailyRate" className="form-control" value={formData.dailyRate || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Days Scheduled</label>
              <input type="number" name="daysScheduled" className="form-control" value={formData.daysScheduled || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Labor (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Production Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      case 'Vendors':
        return (
          <>
            <span className="form-section-title">Vendor Corporate Profile</span>
            <div className="form-group">
              <label className="form-label">Vendor Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Service Category</label>
              <input type="text" name="serviceCategory" className="form-control" placeholder="e.g. Equipment, Catering, VFX" value={formData.serviceCategory || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Person</label>
              <input type="text" name="contactPerson" className="form-control" value={formData.contactPerson || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Vendor Account Status</label>
              <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Mobile</label>
              <input type="text" name="phone" className="form-control" value={formData.phone || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" value={formData.email || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Contract Accounts</span>
            <div className="form-group">
              <label className="form-label">Contract Value (₹)</label>
              <input type="number" name="contractValue" className="form-control" value={formData.contractValue || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Amount (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">General Terms Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      case 'Vehicles':
        return (
          <>
            <span className="form-section-title">Vehicle Technical Specs</span>
            <div className="form-group">
              <label className="form-label">Vehicle Model *</label>
              <input type="text" name="model" className="form-control" placeholder="e.g. Honeywagon Trailer" value={formData.model || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">License Plate Number</label>
              <input type="text" name="plateNumber" className="form-control" value={formData.plateNumber || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Driver Assigned Name</label>
              <input type="text" name="driverName" className="form-control" value={formData.driverName || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Driver Phone Mobile</label>
              <input type="text" name="driverContact" className="form-control" value={formData.driverContact || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Lease Rates</span>
            <div className="form-group">
              <label className="form-label">Rental Cost Per Day (₹)</label>
              <input type="number" name="rentalCostPerDay" className="form-control" value={formData.rentalCostPerDay || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Days Rented</label>
              <input type="number" name="daysRented" className="form-control" value={formData.daysRented || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Rental Cost (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Vehicle Status</label>
              <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                <option value="Available">Available</option>
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Out of Service">Out of Service</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Daily Assignment Details</label>
              <input type="text" name="assignment" className="form-control" placeholder="e.g. Director pickup, crew transport" value={formData.assignment || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Trailer/Garage Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      case 'Catering':
        return (
          <>
            <span className="form-section-title">Caterer details</span>
            <div className="form-group">
              <label className="form-label">Caterer Supplier Name *</label>
              <input type="text" name="catererName" className="form-control" value={formData.catererName || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Meal Type Style</label>
              <input type="text" name="mealType" className="form-control" placeholder="Breakfast buffet, full crafty..." value={formData.mealType || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Head Count Pax</label>
              <input type="number" name="headCount" className="form-control" value={formData.headCount || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Activity Status</label>
              <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                <option value="Scheduled">Scheduled</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <span className="form-section-title">Pricing Details</span>
            <div className="form-group">
              <label className="form-label">Cost Per Head (₹)</label>
              <input type="number" name="costPerHead" className="form-control" value={formData.costPerHead || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Total Days Served</label>
              <input type="number" name="days" className="form-control" value={formData.days || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Catering (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Catering Logistics Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      case 'Finance':
        return (
          <>
            <span className="form-section-title">Expense Log details</span>
            <div className="form-group">
              <label className="form-label">Expense Line Name *</label>
              <input type="text" name="itemName" className="form-control" value={formData.itemName || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Expense Category Type</label>
              <select name="category" className="form-control" value={formData.category || ''} onChange={handleChange}>
                <option value="Insurance">Insurance</option>
                <option value="Permits & Licenses">Permits & Licenses</option>
                <option value="Marketing & Promotion">Marketing & Promotion</option>
                <option value="Post-Production Costs">Post-Production Costs</option>
                <option value="Legal">Legal</option>
                <option value="Taxes">Taxes</option>
                <option value="General Overhead">General Overhead</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <span className="form-section-title">Accounts Cost</span>
            <div className="form-group">
              <label className="form-label">Total Est. Cost (₹)</label>
              <input type="number" name="cost" className="form-control" value={formData.cost || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Cost (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Transaction Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      case 'Documents':
        return (
          <>
            <span className="form-section-title">Document Specs</span>
            <div className="form-group">
              <label className="form-label">Document Title *</label>
              <input type="text" name="title" className="form-control" value={formData.title || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select name="category" className="form-control" value={formData.category || ''} onChange={handleChange}>
                <option value="Contracts">Contracts</option>
                <option value="Permits">Permits</option>
                <option value="Scripts">Scripts</option>
                <option value="Invoices">Invoices</option>
                <option value="Press">Press</option>
                <option value="Audits">Audits</option>
                <option value="Storyboards">Storyboards</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">File Type Extension</label>
              <select name="fileType" className="form-control" value={formData.fileType || ''} onChange={handleChange}>
                <option value="PDF">PDF</option>
                <option value="Word">DOCX / Word</option>
                <option value="Excel">XLSX / Excel</option>
                <option value="Image">JPG / Image</option>
                <option value="Text">TXT / Text</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Document Distribution Status</label>
              <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                <option value="Draft">Draft</option>
                <option value="Distributed">Distributed</option>
                <option value="Approved">Approved</option>
                <option value="Signed">Signed</option>
                <option value="Archival">Archival</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Upload Date</label>
              <input type="date" name="uploadDate" className="form-control" value={formData.uploadDate || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">File size estimate</label>
              <input type="text" name="size" className="form-control" placeholder="e.g. 4.2 MB" value={formData.size || ''} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Document Notes</label>
              <textarea name="notes" className="form-control" value={formData.notes || ''} onChange={handleChange}></textarea>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            {itemToEdit ? `Edit ${activeModule} Details` : `Add New ${activeModule}`}
          </h2>
          <button className="icon-btn" onClick={onClose}>❌</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              {renderFormFields()}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="action-btn">
              {itemToEdit ? 'Save Changes' : 'Create Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
