import React, { useState, useEffect, useContext } from 'react';
import { ProductionContext } from '../context/ProductionContext';

const getDefaultsForModule = (activeModule) => {
  const common = {
    status: activeModule === 'Equipment' ? 'Available' : activeModule === 'Travel' ? 'Booked' : 'Active',
    paidAmount: 0
  };

  switch (activeModule) {
    case 'Actors':
      return {
        ...common,
        castId: `CAST-${Math.floor(100 + Math.random() * 900)}`,
        name: "Demo Actor Name",
        role: "Supporting Actor",
        characterName: "Demo Character",
        email: "actor.dummy@talentindia.in",
        phone: "+91 99999 88888",
        instagramId: "@demo_actor",
        daysScheduled: 5,
        perDayFee: 2000,
        paidAmount: 10000
      };
    case 'Directors':
      return {
        ...common,
        name: "Demo Director Name",
        experience: 5,
        directingFee: 50000,
        paidAmount: 25000,
        availability: "August 15 - August 20",
        preferredCrew: "DOP, Art Team",
        travelPreferences: "Business Class",
        biography: "Experienced commercial director.",
        contactInfoPhone: "+91 99999 88888",
        contactInfoEmail: "director.dummy@gmail.com",
        notes: "Flat package contract."
      };
    case 'HOD':
      return {
        ...common,
        crewId: `HOD-${Math.floor(100 + Math.random() * 900)}`,
        name: "Demo HOD Name",
        role: "Production Designer (Art HOD)",
        department: "Art Department",
        email: "hod.dummy@cinedream.in",
        phone: "+91 99999 88888",
        instagramId: "@dummy_hod_member",
        daysScheduled: 5,
        price: 15000,
        paidAmount: 75000
      };
    case 'Technical Crew':
      return {
        ...common,
        crewId: `CREW-${Math.floor(100 + Math.random() * 900)}`,
        name: "Demo Crew Name",
        role: "Camera Operator",
        department: "Camera",
        email: "crew.dummy@cinedream.in",
        phone: "+91 99999 88888",
        instagramId: "@dummy_crew_member",
        daysScheduled: 5,
        price: 3000,
        paidAmount: 15000
      };
    case 'Equipment':
      return {
        ...common,
        status: 'Available',
        name: "Demo Lens Package",
        category: "Camera",
        model: "Arri Signature Prime 35mm",
        serialNumber: `SN-${Math.floor(10000 + Math.random() * 90000)}`,
        rentalCostPerDay: 5000,
        daysRented: 5,
        paidAmount: 15000,
        vendor: "Modern Rentals Ltd.",
        specs: "PL Mount, T1.8 Aperture",
        notes: "Standard lens kit."
      };
    case 'Travel':
      return {
        ...common,
        travelId: `TRAV-${Math.floor(100 + Math.random() * 900)}`,
        name: "Demo Passenger / Group",
        travel: "Flights booked on Indigo",
        lodgingAndBoarding: "Delhi Heights Hotel (1 Room)",
        costumes: "Cast Wardrobe Suitcase #1",
        catering: "Lunch box catering pack",
        vehicles: "Innova taxi pick up",
        price: 15000,
        paidAmount: 15000
      };
    case 'Lodging & Boarding':
      return {
        ...common,
        hotelName: "Delhi Regency Hotel",
        roomNumber: "Room 402",
        guestName: "Demo Guest",
        costPerDay: 3000,
        totalDays: 6,
        paidAmount: 12000,
        checkInDate: "2026-08-14",
        checkOutDate: "2026-08-20",
        notes: "Double bed, complimentary breakfast."
      };
    case 'Costumes':
      return {
        ...common,
        status: 'Ready',
        costumeName: "Lead Actor Casual Jacket",
        character: "Aman",
        cost: 5000,
        paidAmount: 5000,
        designer: "Style House Delhi",
        size: "Medium",
        notes: "Dry clean only."
      };
    case 'Locations':
      return {
        ...common,
        status: 'Booked',
        locationName: "Heritage Bungalow Mehrauli",
        address: "Mehrauli Archeological Park, New Delhi",
        rentalFee: 50000,
        paidAmount: 30000,
        contactPerson: "Rajesh Manager",
        contactPhone: "+91 99999 88888",
        notes: "Includes backup power supply."
      };
    case 'Vendors':
      return {
        ...common,
        vendorId: `VEND-${Math.floor(100 + Math.random() * 900)}`,
        name: "Demo Rentals Vendor",
        equipments: "Lights and C-Stands",
        description: "Supplier of heavy lighting gear rentals.",
        price: 30000,
        email: "suresh.rentals@gmail.com",
        contact: "+91 99999 88888",
        paidAmount: 15000
      };
    case 'Vehicles':
      return {
        ...common,
        model: "Toyota Innova Crysta",
        plateNumber: "DL-3C-CC-1234",
        driverName: "Satish Driver",
        driverContact: "+91 99999 88888",
        rentalCostPerDay: 4000,
        daysRented: 5,
        paidAmount: 10000,
        assignment: "Cast local transport",
        notes: "Fuel charges included."
      };
    case 'Catering':
      return {
        ...common,
        providerName: "Delhi Catering Services",
        headCount: 50,
        costPerHead: 200,
        days: 5,
        paidAmount: 30000,
        notes: "Lunch and tea service package."
      };
    case 'Finance':
      return {
        ...common,
        financeId: `FIN-${Math.floor(100 + Math.random() * 900)}`,
        itemName: "Demo Post Expense",
        category: "Picture Edit",
        perDayCost: 3000,
        workingDays: 5,
        paidAmount: 10000,
        email: "post.production@cinedream.in",
        phone: "+91 99999 88888"
      };
    default:
      return common;
  }
};

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
      setFormData(getDefaultsForModule(activeModule));
    }
  }, [itemToEdit, activeModule]);

  const handleFileUpload = (file) => {
    // Format file size
    let sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    if (file.size < 1024 * 1024) {
      sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
    }
    
    // Get file extension/type
    const ext = file.name.split('.').pop().toUpperCase();
    let type = 'Other';
    if (ext === 'PDF') type = 'PDF';
    else if (['PNG', 'JPG', 'JPEG', 'WEBP', 'GIF'].includes(ext)) type = 'Image';
    else if (['DOC', 'DOCX'].includes(ext)) type = 'Word';
    else if (['XLS', 'XLSX', 'CSV'].includes(ext)) type = 'Excel';
    
    // Auto fill metadata fields!
    setFormData(prev => ({
      ...prev,
      title: file.name.substring(0, file.name.lastIndexOf('.')) || file.name,
      fileType: type,
      size: sizeStr,
      uploadDate: new Date().toISOString().substring(0, 10),
      fileName: file.name
    }));
  };

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
    
    if (activeModule === 'Finance') {
      if (!submission.cost && submission.perDayCost && submission.workingDays) {
        submission.cost = Number(submission.perDayCost) * Number(submission.workingDays);
      }
    }
    
    if (activeModule === 'Directors') {
      submission.contactInfo = {
        phone: formData.contactInfoPhone || "",
        email: formData.contactInfoEmail || ""
      };
      delete submission.contactInfoPhone;
      delete submission.contactInfoEmail;
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
              <label className="form-label">Cast ID</label>
              <input type="text" name="castId" className="form-control" placeholder="e.g. CAST-01" value={formData.castId || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Character Name</label>
              <input type="text" name="characterName" className="form-control" placeholder="e.g. Aman" value={formData.characterName || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Character Role / Designation</label>
              <input type="text" name="role" className="form-control" placeholder="e.g. Lead Actor" value={formData.role || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Contact & Socials</span>
            <div className="form-group">
              <label className="form-label">Email ID</label>
              <input type="email" name="email" className="form-control" placeholder="e.g. actor@talent.in" value={formData.email || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="text" name="phone" className="form-control" placeholder="e.g. +91 99999 88888" value={formData.phone || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Instagram ID</label>
              <input type="text" name="instagramId" className="form-control" placeholder="e.g. @username" value={formData.instagramId || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Financial Compensation</span>
            <div className="form-group">
              <label className="form-label">PER DAY COST (₹)</label>
              <input type="number" name="perDayFee" className="form-control" value={formData.perDayFee || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Working Days</label>
              <input type="number" name="daysScheduled" className="form-control" value={formData.daysScheduled || ''} onChange={handleChange} />
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

      case 'HOD':
        return (
          <>
            <span className="form-section-title">HOD Specs</span>
            <div className="form-group">
              <label className="form-label">Crew ID</label>
              <input type="text" name="crewId" className="form-control" placeholder="e.g. HOD-01" value={formData.crewId || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">HOD Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <input type="text" name="role" className="form-control" placeholder="e.g. Director of Photography" value={formData.role || ''} onChange={handleChange} />
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

            <span className="form-section-title">Contact Information</span>
            <div className="form-group">
              <label className="form-label">Email ID</label>
              <input type="email" name="email" className="form-control" placeholder="e.g. hod.member@cinedream.in" value={formData.email || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="text" name="phone" className="form-control" placeholder="e.g. +91 99999 88888" value={formData.phone || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Instagram ID</label>
              <input type="text" name="instagramId" className="form-control" placeholder="e.g. @username" value={formData.instagramId || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Working & Rates Details</span>
            <div className="form-group">
              <label className="form-label">Working Days</label>
              <input type="number" name="daysScheduled" className="form-control" value={formData.daysScheduled || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Price / Daily Rate (₹)</label>
              <input type="number" name="price" className="form-control" value={formData.price || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Labor (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
            </div>
          </>
        );

      case 'Technical Crew':
        return (
          <>
            <span className="form-section-title">Crew Specs</span>
            <div className="form-group">
              <label className="form-label">Crew ID</label>
              <input type="text" name="crewId" className="form-control" placeholder="e.g. CREW-01" value={formData.crewId || ''} onChange={handleChange} />
            </div>
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

            <span className="form-section-title">Contact Information</span>
            <div className="form-group">
              <label className="form-label">Email ID</label>
              <input type="email" name="email" className="form-control" placeholder="e.g. crew@cinedream.in" value={formData.email || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="text" name="phone" className="form-control" placeholder="e.g. +91 99999 88888" value={formData.phone || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Instagram ID</label>
              <input type="text" name="instagramId" className="form-control" placeholder="e.g. @crew_insta" value={formData.instagramId || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Labor & Rates</span>
            <div className="form-group">
              <label className="form-label">Price / Daily Rate (₹)</label>
              <input type="number" name="price" className="form-control" value={formData.price || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Working Days</label>
              <input type="number" name="daysScheduled" className="form-control" value={formData.daysScheduled || ''} onChange={handleChange} />
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
              <label className="form-label">Travel ID</label>
              <input type="text" name="travelId" className="form-control" placeholder="e.g. TRAV-01" value={formData.travelId || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Passenger / Group Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name || ''} onChange={handleChange} required />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Travel Details</label>
              <textarea name="travel" className="form-control" placeholder="Flights, train tickets, bookings..." value={formData.travel || ''} onChange={handleChange}></textarea>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Lodging & Boarding</label>
              <textarea name="lodgingAndBoarding" className="form-control" placeholder="Hotel bookings, room stays, boarding details..." value={formData.lodgingAndBoarding || ''} onChange={handleChange}></textarea>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Costumes</label>
              <textarea name="costumes" className="form-control" placeholder="Costume logistics, transit bags, wardrobe trunks..." value={formData.costumes || ''} onChange={handleChange}></textarea>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Catering</label>
              <textarea name="catering" className="form-control" placeholder="Meals, catering sets, food packs..." value={formData.catering || ''} onChange={handleChange}></textarea>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Vehicles</label>
              <textarea name="vehicles" className="form-control" placeholder="Cab details, drivers assigned, vehicles pick up..." value={formData.vehicles || ''} onChange={handleChange}></textarea>
            </div>

            <span className="form-section-title">Logistics Budget</span>
            <div className="form-group">
              <label className="form-label">Total Price / Cost (₹)</label>
              <input type="number" name="price" className="form-control" value={formData.price || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Amount (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
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
              <label className="form-label">Vendor ID</label>
              <input type="text" name="vendorId" className="form-control" placeholder="e.g. VEND-01" value={formData.vendorId || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Vendor Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Equipments Supplied</label>
              <input type="text" name="equipments" className="form-control" placeholder="e.g. Sony Venice, Dolly Panther" value={formData.equipments || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <input type="text" name="description" className="form-control" placeholder="e.g. Main equipment rentals supplier" value={formData.description || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Price (₹)</label>
              <input type="number" name="price" className="form-control" value={formData.price || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Email ID</label>
              <input type="email" name="email" className="form-control" value={formData.email || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Number</label>
              <input type="text" name="contact" className="form-control" placeholder="e.g. +91 99999 88888" value={formData.contact || ''} onChange={handleChange} />
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
            <span className="form-section-title">Expense Line Profile</span>
            <div className="form-group">
              <label className="form-label">Finance ID</label>
              <input type="text" name="financeId" className="form-control" placeholder="e.g. FIN-01" value={formData.financeId || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Expense Line Name *</label>
              <input type="text" name="itemName" className="form-control" placeholder="e.g. Picture Edit Work" value={formData.itemName || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select name="category" className="form-control" value={formData.category || ''} onChange={handleChange}>
                <option value="Picture Edit">Picture Edit</option>
                <option value="Color Grading (DI)">Color Grading (DI)</option>
                <option value="Sound Design">Sound Design</option>
                <option value="Dubbing">Dubbing</option>
                <option value="Atmos Mix">Atmos Mix</option>
                <option value="Music/Score">Music/Score</option>
                <option value="VFX/CGI">VFX/CGI</option>
                <option value="Contingency Backup">Contingency Backup</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Email ID</label>
              <input type="email" name="email" className="form-control" value={formData.email || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="text" name="phone" className="form-control" value={formData.phone || ''} onChange={handleChange} />
            </div>

            <span className="form-section-title">Budget Rates</span>
            <div className="form-group">
              <label className="form-label">Per Day Cost (₹)</label>
              <input type="number" name="perDayCost" className="form-control" value={formData.perDayCost || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Working Days</label>
              <input type="number" name="workingDays" className="form-control" value={formData.workingDays || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Cost (₹)</label>
              <input type="number" name="paidAmount" className="form-control" value={formData.paidAmount || ''} onChange={handleChange} />
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

            <div className="form-group full-width" style={{ gridColumn: 'span 2', marginTop: '16px' }}>
              <label className="form-label" style={{ fontWeight: '700' }}>Upload Document File (PDF / Image)</label>
              <div 
                style={{
                  border: '2px dashed var(--glass-border)',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onClick={() => document.getElementById('doc-file-upload').click()}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files[0];
                  if (file) handleFileUpload(file);
                }}
              >
                <span style={{ fontSize: '32px' }}>📁</span>
                <span style={{ fontWeight: '700', fontSize: '13px', color: 'hsl(var(--text-primary))' }}>
                  {formData.fileName ? `Selected: ${formData.fileName}` : 'Drag & Drop PDF or Image here, or click to browse'}
                </span>
                <span style={{ fontSize: '11px', color: 'hsl(var(--text-muted))' }}>
                  Supports PDF, PNG, JPG, JPEG (Max 10MB)
                </span>
                <input 
                  type="file" 
                  id="doc-file-upload" 
                  accept=".pdf, image/*" 
                  style={{ display: 'none' }} 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) handleFileUpload(file);
                  }}
                />
              </div>
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
