import React, { createContext, useState, useEffect } from 'react';

export const ProductionContext = createContext();

const INITIAL_METADATA = {
  projectName: "YEH DIL BEWAJAH (PROMO TEASER)",
  genre: "Promo Teaser / Drama",
  director: "MR. MANAN PRATAP SINGH",
  budgetLimit: 2500000, // ₹25,00,000 Target Cap
  shootingDays: 5,
  startDate: "2026-08-15",
  endDate: "2026-08-20",
  currentUser: "Mr. Manoj Kumar (Production Manager)",
  version: 4
};

const INITIAL_MOCK_DATA = {
  Actors: [
    {
      id: "act-1",
      castId: "CAST-01",
      name: "Rahul Sharma",
      characterId: "CHAR-01",
      characterName: "Aman",
      role: "Lead Actor",
      status: "Active",
      actingFee: 100000,
      perDayFee: 10000,
      daysScheduled: 5,
      paidAmount: 150000,
      relationshipStatus: "Single",
      contactInfo: { phone: "+91 98110 99882", email: "rahul.sharma@talentindia.in" },
      biography: "Popular television and promo lead actor based in Mumbai.",
      contractDetails: "Fully exclusive 5 days shoot package. Travel and boarding covered.",
      availabilitySchedule: "August 15 - August 20",
      foodPreferences: "Vegetarian",
      dietaryRestrictions: "None",
      costumeMeasurements: "Chest: 38\", Waist: 30\", Inseam: 32\", Shoe: 9 UK",
      makeupRequirements: "Standard look for promo theme.",
      travelPreferences: "Air Travel (Economy)",
      accommodationPreferences: "Standard Premium Hotel Room",
      emergencyContact: "Anil Sharma (Father) - +91 98110 99880",
      medicalInformation: "No medical conditions declared.",
      socialMedia: { twitter: "@rahul_sharma", instagram: "@rahulsharma_actor" },
      previousProjects: "Sapney (2025), Dil Ke Paas (2024)",
      awards: "Best Debut Actor (TV Awards 2024)",
      documents: ["Rahul_Contract_Signed.pdf"],
      notes: "Extremely cooperative. Prefers vegetarian food."
    },
    {
      id: "act-2",
      castId: "CAST-02",
      name: "Priya Patel",
      characterId: "CHAR-02",
      characterName: "Riya",
      role: "Lead Actress",
      status: "Active",
      actingFee: 70000,
      perDayFee: 6000,
      daysScheduled: 5,
      paidAmount: 100000,
      relationshipStatus: "Single",
      contactInfo: { phone: "+91 99998 12345", email: "priya.patel@talentindia.in" },
      biography: "Experienced commercial model and lead actress.",
      contractDetails: "Includes makeup artist and personal styling assistant travel expense.",
      availabilitySchedule: "August 15 - August 20",
      foodPreferences: "Standard Veg/Non-Veg",
      dietaryRestrictions: "None",
      costumeMeasurements: "Bust: 32\", Waist: 26\", Hips: 34\", Shoe: 6 UK",
      makeupRequirements: "Glamour look for teaser.",
      travelPreferences: "Air Travel (Economy)",
      accommodationPreferences: "Standard Premium Hotel Room",
      emergencyContact: "Meera Patel (Mother) - +91 99998 12340",
      medicalInformation: "None declared.",
      socialMedia: { twitter: "@priyapatel_la", instagram: "@priya_patel_official" },
      previousProjects: "Commercial Ads for Pepsi and L'Oreal",
      awards: "Femina Fresh Face Nominee (2025)",
      documents: ["Priya_Contract_Executed.pdf"],
      notes: "Requires standard room with mirror lighting."
    },
    {
      id: "act-3",
      castId: "CAST-03",
      name: "Vikram Malhotra",
      characterId: "CHAR-03",
      characterName: "Rajesh (Antagonist)",
      role: "Supporting Actor",
      status: "Active",
      actingFee: 30000,
      perDayFee: 2000,
      daysScheduled: 5,
      paidAmount: 40000,
      relationshipStatus: "Single",
      contactInfo: { phone: "+91 98765 11111", email: "vikram@malhotratalents.com" },
      biography: "Mumbai-based character actor specializing in corporate and emotional roles.",
      contractDetails: "Flat daily shoot rate agreement.",
      availabilitySchedule: "August 15 - August 20",
      foodPreferences: "High Protein",
      dietaryRestrictions: "Lactose Intolerant",
      costumeMeasurements: "Chest: 40\", Waist: 32\", Inseam: 33\", Shoe: 10 UK",
      makeupRequirements: "Formal look, light hair styling.",
      travelPreferences: "Air Travel (Economy)",
      accommodationPreferences: "Shared Standard Room",
      emergencyContact: "Rajesh Malhotra (Brother) - +91 98765 22222",
      medicalInformation: "Lactose intolerant. Avoid milk products.",
      socialMedia: { twitter: "@vikram_malhotra", instagram: "@vikrammalhotra" },
      previousProjects: "The Corporate Man (2025)",
      awards: "Best Actor in a Supporting Role Nomination (Indie Fest 2025)",
      documents: ["Vikram_Contract_Signed.pdf"],
      notes: "Requires a double-room sharing with crew/talent."
    },
    {
      id: "act-4",
      castId: "CAST-04",
      name: "Neha Sen",
      characterId: "CHAR-04",
      characterName: "Simran (Friend)",
      role: "Supporting Actress",
      status: "Active",
      actingFee: 10000,
      perDayFee: 1000,
      daysScheduled: 5,
      paidAmount: 15000,
      relationshipStatus: "Single",
      contactInfo: { phone: "+91 99112 33445", email: "neha.sen@gmail.com" },
      biography: "Young actress from Delhi NCR.",
      contractDetails: "Local casting agreement.",
      availabilitySchedule: "August 15 - August 20",
      foodPreferences: "Standard Vegetarian",
      dietaryRestrictions: "None",
      costumeMeasurements: "Bust: 30\", Waist: 24\", Hips: 32\", Shoe: 5 UK",
      makeupRequirements: "Casual teen look.",
      travelPreferences: "Local Transport Only",
      accommodationPreferences: "No Hotel (Local Resident)",
      emergencyContact: "Sunil Sen (Father) - +91 99112 33440",
      medicalInformation: "None declared.",
      socialMedia: { twitter: "@nehasen_off", instagram: "@neha_sen" },
      previousProjects: "Various college theater productions",
      awards: "Best Actress (Inter-College Drama 2025)",
      documents: ["Neha_Casting_Doc.pdf"],
      notes: "Local resident of Delhi, no lodging needed."
    },
    {
      id: "act-5",
      castId: "CAST-EXT",
      name: "Delhi Local Background Talents (15 Extras)",
      characterId: "CHAR-EXT",
      characterName: "Background Crowd",
      role: "Background Actors",
      status: "Completed",
      actingFee: 0,
      perDayFee: 7500,
      daysScheduled: 2,
      paidAmount: 15000,
      relationshipStatus: "N/A",
      contactInfo: { phone: "+91 98888 77777", email: "extras.coordinator@gmail.com" },
      biography: "Local background crowd talent package for Delhi shoot sequences.",
      contractDetails: "15 Extras @ ₹500/day for 2 days. Standard crowds coordinator package.",
      availabilitySchedule: "August 16 - August 17",
      foodPreferences: "Packed lunches provided on set.",
      dietaryRestrictions: "None",
      costumeMeasurements: "Standard crowd wear.",
      makeupRequirements: "Standard crowd grooming.",
      travelPreferences: "Self transport to Mehrauli location.",
      accommodationPreferences: "None (Local)",
      emergencyContact: "Delhi Cast Coord. - +91 98888 77770",
      medicalInformation: "None",
      socialMedia: { twitter: "N/A", instagram: "N/A" },
      previousProjects: "N/A",
      awards: "N/A",
      documents: ["Crowd_Talent_Invoice.pdf"],
      notes: "Coordinate directly with casting manager on set."
    }
  ],
  "Technical Crew": [
    {
      id: "crew-1",
      crewId: "CREW-DOP",
      name: "DOP & Camera Crew (Staff Package)",
      role: "Director of Photography & Staff",
      department: "Camera",
      experience: 15,
      dailyRate: 20000,
      daysScheduled: 5,
      paidAmount: 100000,
      email: "dop.camcrew@cinedreampromo.com",
      phone: "+91 98110 55566",
      instagramId: "@dop_cam_crew",
      equipmentAssigned: "Sony Venice Camera Package",
      availability: "August 15 - August 20",
      certifications: "WICA Member",
      travelPreferences: "Air Travel (Economy)",
      notes: "Package includes DOP, Camera Assistant, Focus Puller, and 2 Camera Attendants."
    },
    {
      id: "crew-2",
      crewId: "CREW-ART",
      name: "Art Director & Set Dressers",
      role: "Art Director & Team",
      department: "Art Department",
      experience: 8,
      dailyRate: 5000,
      daysScheduled: 4,
      paidAmount: 20000,
      email: "artdirector.crew@gmail.com",
      phone: "+91 99990 44433",
      instagramId: "@art_crew_delhi",
      equipmentAssigned: "Set Construction Tools & Prop Kit",
      availability: "August 14 - August 18",
      certifications: "N/A",
      travelPreferences: "Local Transport Only",
      notes: "Sets up Mehrauli Heritage Bungalow location prep 1 day in advance."
    },
    {
      id: "crew-3",
      crewId: "CREW-SOUND",
      name: "Sync Sound Recordist & Boom Operator",
      role: "Location Sound Recordist",
      department: "Sound",
      experience: 6,
      dailyRate: 2000,
      daysScheduled: 4,
      paidAmount: 8000,
      email: "sound.recordist@cinedreampromo.com",
      phone: "+91 98765 99887",
      instagramId: "@sync_sound_crew",
      equipmentAssigned: "Sound Recordist Package (Zoom F8, Sennheiser Mics)",
      availability: "August 15 - August 19",
      certifications: "N/A",
      travelPreferences: "Local Transport",
      notes: "Package covers Recordist, Boom Operator, and basic lapel mic package."
    },
    {
      id: "crew-4",
      crewId: "CREW-MAKEUP",
      name: "Makeup Artist & Hair Stylist",
      role: "Key Makeup & Hair Stylist",
      department: "Makeup",
      experience: 7,
      dailyRate: 2500,
      daysScheduled: 4,
      paidAmount: 10000,
      email: "makeup.stylist@gmail.com",
      phone: "+91 99110 77665",
      instagramId: "@makeup_styling_crew",
      equipmentAssigned: "Professional Makeup Vanity Case",
      availability: "August 15 - August 19",
      certifications: "N/A",
      travelPreferences: "Local Transport",
      notes: "Provides hair and makeup for 4 main cast members on shoot days."
    }
  ],
  Travel: [
    {
      id: "trav-1",
      personName: "Core Cast & Crew (25 Pax)",
      role: "Cast & Crew Travel",
      type: "Flight",
      bookingNumber: "AI-DEL-908",
      itinerary: "Mumbai (BOM) to Delhi (DEL) Round Trip",
      pickupLocation: "BOM Airport Terminal 2",
      dropLocation: "Delhi Hotel NCR (Mehrauli)",
      time: "2026-08-14 10:00",
      status: "Confirmed",
      expenses: 200000,
      paidAmount: 200000,
      hotelBooking: "Hotel Delhi Heights (10 Rooms)",
      costumesTransit: "Cast Wardrobe Trunk #1 & #2",
      cateringTransit: "Travel Catering Pack (25 Box lunches)",
      pickupVehicle: "3 Innovas & 2 Cargo Cabs",
      notes: "Group tickets booked on Air India. 25 people including cast, director, and key crew."
    }
  ],
  Vendors: [
    {
      id: "vend-1",
      vendorId: "VEND-01",
      name: "Modern Art Props & Rental House",
      equipments: "Props, set setting furniture, art backdrops, Mehrauli decor elements",
      description: "Main provider for set properties, decoration materials, and specialized furniture rentals in Delhi NCR.",
      serviceCategory: "Props & Set Decoration",
      contactPerson: "Ramesh Props Coordinator",
      phone: "+91 98765 43210",
      email: "ramesh.props@gmail.com",
      contractValue: 20000,
      paidAmount: 20000,
      pendingAmount: 0,
      status: "Active",
      notes: "Supplied props, background items, furniture, and setting material for Mehrauli shoot."
    }
  ],
  Finance: [
    {
      id: "fin-1",
      financeId: "FIN-01",
      itemName: "Contingency Fund (10%)",
      category: "Contingency Backup",
      cost: 181500,
      paidAmount: 0,
      notes: "Emergency contingency backup fund, calculated as 10% of total estimated cost."
    },
    {
      id: "fin-2",
      financeId: "FIN-02",
      itemName: "Picture Edit Work",
      category: "Picture Edit",
      perDayCost: 3000,
      workingDays: 5,
      cost: 15000,
      paidAmount: 15000,
      email: "editor@cinedreampromo.com",
      phone: "+91 99999 88888",
      notes: "Promo cut assembly and timeline locking."
    },
    {
      id: "fin-3",
      financeId: "FIN-03",
      itemName: "Color Grading DI Suite",
      category: "Color Grading (DI)",
      perDayCost: 3000,
      workingDays: 5,
      cost: 15000,
      paidAmount: 15000,
      email: "colorist.di@cinedreampromo.com",
      phone: "+91 99999 88888",
      notes: "DI grading, DaVinci mastering, and DCP promo package export."
    },
    {
      id: "fin-4",
      financeId: "FIN-04",
      itemName: "Audio Sound Design Package",
      category: "Sound Design",
      perDayCost: 3000,
      workingDays: 4,
      cost: 12000,
      paidAmount: 12000,
      email: "sound.design@cinedreampromo.com",
      phone: "+91 99999 88888",
      notes: "Sfx overlays and foley record."
    },
    {
      id: "fin-5",
      financeId: "FIN-05",
      itemName: "Lead Cast Dubbing Session",
      category: "Dubbing",
      perDayCost: 2000,
      workingDays: 2,
      cost: 4000,
      paidAmount: 4000,
      email: "dubbing.studio@gmail.com",
      phone: "+91 99999 88888",
      notes: "Voice sync recording for promo teaser."
    },
    {
      id: "fin-6",
      financeId: "FIN-06",
      itemName: "Dolby Atmos Surround Mixing",
      category: "Atmos Mix",
      perDayCost: 5000,
      workingDays: 1,
      cost: 5000,
      paidAmount: 5000,
      email: "atmos.mix@gmail.com",
      phone: "+91 99999 88888",
      notes: "Dolby Atmos spatial surround mix down."
    },
    {
      id: "fin-7",
      financeId: "FIN-07",
      itemName: "Background Score Composition",
      category: "Music/Score",
      perDayCost: 3000,
      workingDays: 4,
      cost: 12000,
      paidAmount: 12000,
      email: "composer.score@gmail.com",
      phone: "+91 99999 88888",
      notes: "Teaser background music track."
    },
    {
      id: "fin-8",
      financeId: "FIN-08",
      itemName: "VFX Screen Cleanup Suite",
      category: "VFX/CGI",
      perDayCost: 3000,
      workingDays: 5,
      cost: 15000,
      paidAmount: 15000,
      email: "vfx.artist@cinedreampromo.com",
      phone: "+91 99999 88888",
      notes: "Screen cleanups, wire removals, logo overlays, and title animations."
    }
  ]
};

const INITIAL_AUDIT_LOG = [
  {
    id: "log-1",
    timestamp: "2026-08-01T10:15:30Z",
    user: "Mr. Manoj Kumar (Production Manager)",
    actionType: "UPDATE",
    module: "Actors",
    itemName: "Rahul Sharma",
    changeDescription: "Confirmed lead actor signing and package rate",
    budgetEffect: 150000,
    previousTotal: 0,
    newTotal: 150000
  },
  {
    id: "log-2",
    timestamp: "2026-08-01T14:22:10Z",
    user: "Mr. Jayanth Sinha (Producer)",
    actionType: "ADD",
    module: "Equipment",
    itemName: "Sony Venice Camera Package",
    changeDescription: "Added camera package rental for Delhi NCR shoot",
    budgetEffect: 175000,
    previousTotal: 150000,
    newTotal: 325000
  },
  {
    id: "log-3",
    timestamp: "2026-08-02T08:05:00Z",
    user: "Mr. Manoj Kumar (Production Manager)",
    actionType: "UPDATE",
    module: "Locations",
    itemName: "Delhi Heritage Bungalow (+ Electricity)",
    changeDescription: "Booked Mehrauli bungalow for 4 shoot days + electricity backup",
    budgetEffect: 200000,
    previousTotal: 325000,
    newTotal: 525000
  }
];

// Helper to calculate cost for a single item
export const calculateItemCost = (module, item) => {
  switch (module) {
    case 'Actors':
      return Number(item.actingFee || 0) + (Number(item.perDayFee || 0) * Number(item.daysScheduled || 0));
    case 'Directors':
      return Number(item.directingFee || 0);
    case 'Technical Crew':
      return Number(item.dailyRate || 0) * Number(item.daysScheduled || 0);
    case 'Equipment':
      return Number(item.rentalCostPerDay || 0) * Number(item.daysRented || 0);
    case 'Travel':
      return Number(item.expenses || 0);
    case 'Lodging & Boarding':
      return Number(item.costPerDay || 0) * Number(item.totalDays || 0);
    case 'Costumes':
      return Number(item.cost || 0);
    case 'Locations':
      return Number(item.rentalFee || 0);
    case 'Production Team':
      return Number(item.salary || 0) + (Number(item.dailyRate || 0) * Number(item.daysScheduled || 0));
    case 'Vendors':
      return Number(item.contractValue || 0);
    case 'Vehicles':
      return Number(item.rentalCostPerDay || 0) * Number(item.daysRented || 0);
    case 'Catering':
      return Number(item.costPerHead || 0) * Number(item.headCount || 0) * Number(item.days || 0);
    case 'Finance':
      return item.perDayCost && item.workingDays 
        ? Number(item.perDayCost || 0) * Number(item.workingDays || 0)
        : Number(item.cost || 0);
    default:
      return 0;
  }
};

export const ProductionProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = sessionStorage.getItem('cinedream_crm_auth');
    return !!saved;
  });

  const [metadata, setMetadata] = useState(() => {
    const saved = localStorage.getItem('cinedream_crm_metadata');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.projectName !== "YEH DIL BEWAJAH (PROMO TEASER)" || parsed.version !== 3) {
        localStorage.removeItem('cinedream_crm_data');
        localStorage.removeItem('cinedream_crm_metadata');
        localStorage.removeItem('cinedream_crm_logs');
        return INITIAL_METADATA;
      }
      const sessionUser = sessionStorage.getItem('cinedream_crm_auth');
      if (sessionUser) {
        parsed.currentUser = sessionUser;
      }
      return parsed;
    }
    return INITIAL_METADATA;
  });

  const [data, setData] = useState(() => {
    const savedMetadata = localStorage.getItem('cinedream_crm_metadata');
    if (savedMetadata) {
      const parsedMeta = JSON.parse(savedMetadata);
      if (parsedMeta.projectName !== "YEH DIL BEWAJAH (PROMO TEASER)" || parsedMeta.version !== 3) {
        return INITIAL_MOCK_DATA;
      }
    }
    const saved = localStorage.getItem('cinedream_crm_data');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_DATA;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const savedMetadata = localStorage.getItem('cinedream_crm_metadata');
    if (savedMetadata) {
      const parsedMeta = JSON.parse(savedMetadata);
      if (parsedMeta.projectName !== "YEH DIL BEWAJAH (PROMO TEASER)" || parsedMeta.version !== 3) {
        return INITIAL_AUDIT_LOG;
      }
    }
    const saved = localStorage.getItem('cinedream_crm_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOG;
  });

  useEffect(() => {
    localStorage.setItem('cinedream_crm_metadata', JSON.stringify(metadata));
  }, [metadata]);

  useEffect(() => {
    localStorage.setItem('cinedream_crm_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('cinedream_crm_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Reactive Finance Calculations
  const getBudgetSummary = () => {
    const breakdown = {};
    let totalCost = 0;
    let totalPaid = 0;

    Object.keys(data).forEach(module => {
      let moduleCost = 0;
      let modulePaid = 0;

      data[module].forEach(item => {
        const itemCost = calculateItemCost(module, item);
        const itemPaid = Number(item.paidAmount || 0);

        moduleCost += itemCost;
        modulePaid += itemPaid;
      });

      breakdown[module] = {
        total: moduleCost,
        paid: modulePaid,
        pending: Math.max(0, moduleCost - modulePaid)
      };

      totalCost += moduleCost;
      totalPaid += modulePaid;
    });

    const pendingPayments = Math.max(0, totalCost - totalPaid);
    const grandTotal = totalCost;
    const remainingBudget = Math.max(0, metadata.budgetLimit - grandTotal);
    const budgetVariance = metadata.budgetLimit - grandTotal; // positive means under budget

    // Estimate daily / weekly / monthly costs based on standard distribution
    const shootingDays = metadata.shootingDays || 90;
    const costPerShootingDay = grandTotal / shootingDays;
    const dailyProductionCost = costPerShootingDay;
    const weeklyProductionCost = costPerShootingDay * 6; // 6-day shooting week
    const monthlyProductionCost = costPerShootingDay * 25; // 25 filming days per month

    // Count statistics
    const actorCount = data.Actors ? data.Actors.length : 0;
    const costPerActor = actorCount > 0 ? (breakdown['Actors']?.total || 0) / actorCount : 0;

    return {
      grandTotal,
      totalPaid,
      pendingPayments,
      remainingBudget,
      budgetLimit: metadata.budgetLimit,
      budgetVariance,
      dailyProductionCost,
      weeklyProductionCost,
      monthlyProductionCost,
      costPerShootingDay,
      costPerActor,
      breakdown
    };
  };

  const budgetSummary = getBudgetSummary();

  // Audit Logger helper
  const logAction = (actionType, module, itemName, changeDescription, budgetEffect) => {
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: metadata.currentUser,
      actionType,
      module,
      itemName,
      changeDescription,
      budgetEffect,
      previousTotal: budgetSummary.grandTotal,
      newTotal: budgetSummary.grandTotal + budgetEffect
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addItem = (module, item) => {
    const newItem = { ...item, id: `${module.toLowerCase().substring(0,3)}-${Date.now()}` };
    
    // Set default paidAmount to 0 if not provided
    if (newItem.paidAmount === undefined || newItem.paidAmount === '') {
      newItem.paidAmount = 0;
    }

    setData(prev => {
      const updatedList = [...(prev[module] || []), newItem];
      return { ...prev, [module]: updatedList };
    });

    const costEffect = calculateItemCost(module, newItem);
    logAction('ADD', module, newItem.name || newItem.title || newItem.itemName || newItem.personName || "New Item", `Added new item: ${newItem.name || newItem.title || newItem.itemName || newItem.personName}`, costEffect);
  };

  const updateItem = (module, itemId, updatedFields) => {
    setData(prev => {
      const list = prev[module] || [];
      const updatedList = list.map(item => {
        if (item.id === itemId) {
          const oldCost = calculateItemCost(module, item);
          const newTempItem = { ...item, ...updatedFields };
          const newCost = calculateItemCost(module, newTempItem);
          const diff = newCost - oldCost;

          // Detail difference log
          let detailLog = "";
          Object.keys(updatedFields).forEach(key => {
            if (item[key] !== updatedFields[key]) {
              detailLog += `${key} changed from ${item[key]} to ${updatedFields[key]}; `;
            }
          });

          // Log in background
          setTimeout(() => {
            logAction('UPDATE', module, item.name || item.title || item.itemName || item.personName || item.id, detailLog || "Details updated", diff);
          }, 50);

          return newTempItem;
        }
        return item;
      });
      return { ...prev, [module]: updatedList };
    });
  };

  const deleteItem = (module, itemId) => {
    const targetItem = data[module]?.find(item => item.id === itemId);
    if (!targetItem) return;

    const oldCost = calculateItemCost(module, targetItem);

    setData(prev => {
      const updatedList = (prev[module] || []).filter(item => item.id !== itemId);
      return { ...prev, [module]: updatedList };
    });

    logAction('DELETE', module, targetItem.name || targetItem.title || targetItem.itemName || targetItem.personName || itemId, `Removed item`, -oldCost);
  };

  const changeCurrentUser = (userName) => {
    setMetadata(prev => ({ ...prev, currentUser: userName }));
  };

  const updateBudgetLimit = (newLimit) => {
    setMetadata(prev => ({ ...prev, budgetLimit: Number(newLimit) }));
  };

  const login = (userProfileName) => {
    sessionStorage.setItem('cinedream_crm_auth', userProfileName);
    setMetadata(prev => ({ ...prev, currentUser: userProfileName }));
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('cinedream_crm_auth');
    setIsAuthenticated(false);
  };

  return (
    <ProductionContext.Provider
      value={{
        metadata,
        data,
        auditLogs,
        budgetSummary,
        addItem,
        updateItem,
        deleteItem,
        changeCurrentUser,
        updateBudgetLimit,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </ProductionContext.Provider>
  );
};
