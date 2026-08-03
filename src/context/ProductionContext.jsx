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
  version: 9
};

const INITIAL_MOCK_DATA = {
  Actors: [
    {
      id: "act-1",
      castId: "CAST-01",
      name: "Rahul Sharma",
      characterName: "Aman",
      role: "Lead Actor",
      email: "rahul.sharma@talentindia.in",
      phone: "+91 98110 99882",
      instagramId: "@rahulsharma_actor",
      daysScheduled: 5,
      perDayFee: 10000,
      paidAmount: 50000
    },
    {
      id: "act-2",
      castId: "CAST-02",
      name: "Priya Patel",
      characterName: "Riya",
      role: "Lead Actress",
      email: "priya.patel@talentindia.in",
      phone: "+91 99998 12345",
      instagramId: "@priya_patel_official",
      daysScheduled: 5,
      perDayFee: 6000,
      paidAmount: 30000
    },
    {
      id: "act-3",
      castId: "CAST-03",
      name: "Vikram Malhotra",
      characterName: "Rajesh (Antagonist)",
      role: "Supporting Actor",
      email: "vikram@malhotratalents.com",
      phone: "+91 98765 11111",
      instagramId: "@vikrammalhotra",
      daysScheduled: 5,
      perDayFee: 2000,
      paidAmount: 10000
    },
    {
      id: "act-4",
      castId: "CAST-04",
      name: "Neha Sen",
      characterName: "Simran (Friend)",
      role: "Supporting Actress",
      email: "neha.sen@gmail.com",
      phone: "+91 99112 33445",
      instagramId: "@neha_sen",
      daysScheduled: 5,
      perDayFee: 1000,
      paidAmount: 5000
    },
    {
      id: "act-5",
      castId: "CAST-EXT",
      name: "Delhi Local Background Talents",
      characterName: "Background Crowd",
      role: "Background Actors",
      email: "extras.coordinator@gmail.com",
      phone: "+91 98888 77777",
      instagramId: "@delhi_extras_casting",
      daysScheduled: 2,
      perDayFee: 7500,
      paidAmount: 15000
    }
  ],
  HOD: [
    {
      id: "hod-1",
      crewId: "HOD-DOP",
      name: "Kabir Mehta",
      role: "Director of Photography (DOP)",
      department: "Camera",
      email: "kabir.mehta@dopcine.in",
      phone: "+91 98220 11223",
      instagramId: "@kabirmehta_dop",
      daysScheduled: 5
    },
    {
      id: "hod-2",
      crewId: "HOD-ART",
      name: "Sanjay Sharma",
      role: "Production Designer (Art HOD)",
      department: "Art Department",
      email: "sanjay.art@designcraft.in",
      phone: "+91 99100 88776",
      instagramId: "@sanjayshar_design",
      daysScheduled: 5
    },
    {
      id: "hod-3",
      crewId: "HOD-SOUND",
      name: "Aarav Sen",
      role: "Sound Designer / Sync HOD",
      department: "Sound",
      email: "aarav.sound@studiohouse.in",
      phone: "+91 98765 22334",
      instagramId: "@aarav_sound_design",
      daysScheduled: 5
    }
  ],
  "Technical Crew": [
    {
      id: "crew-1",
      crewId: "CREW-DOP",
      name: "DOP & Camera Crew (Staff Package)",
      role: "Director of Photography & Staff",
      department: "Camera",
      email: "dop.camcrew@cinedreampromo.com",
      phone: "+91 98110 55566",
      instagramId: "@dop_cam_crew",
      daysScheduled: 5,
      price: 20000,
      paidAmount: 100000
    },
    {
      id: "crew-2",
      crewId: "CREW-ART",
      name: "Art Director & Set Dressers",
      role: "Art Director & Team",
      department: "Art Department",
      email: "artdirector.crew@gmail.com",
      phone: "+91 99990 44433",
      instagramId: "@art_crew_delhi",
      daysScheduled: 4,
      price: 5000,
      paidAmount: 20000
    },
    {
      id: "crew-3",
      crewId: "CREW-SOUND",
      name: "Sync Sound Recordist & Boom Operator",
      role: "Location Sound Recordist",
      department: "Sound",
      email: "sound.recordist@cinedreampromo.com",
      phone: "+91 98765 99887",
      instagramId: "@sync_sound_crew",
      daysScheduled: 4,
      price: 2000,
      paidAmount: 8000
    },
    {
      id: "crew-4",
      crewId: "CREW-MAKEUP",
      name: "Makeup Artist & Hair Stylist",
      role: "Key Makeup & Hair Stylist",
      department: "Makeup",
      email: "makeup.stylist@gmail.com",
      phone: "+91 99110 77665",
      instagramId: "@makeup_styling_crew",
      daysScheduled: 4,
      price: 2500,
      paidAmount: 10000
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
      price: 20000,
      email: "ramesh.props@gmail.com",
      contact: "+91 98765 43210"
    },
    {
      id: "vend-2",
      vendorId: "VEND-02",
      name: "Gautam Light & Grip Solutions",
      equipments: "Arri Skypanels, C-Stands, track-trolley rails, generator backup",
      description: "Supplier of professional cinematic lights, grip accessories, and power source generators.",
      price: 45000,
      email: "gautam.lighting@delhifilm.com",
      contact: "+91 99110 54321"
    },
    {
      id: "vend-3",
      vendorId: "VEND-03",
      name: "CineVision Camera Rentals",
      equipments: "Sony FX9, Cine lenses kit, wireless video transmitter, matte box",
      description: "Rental house for camera bodies, prime cinema glass, monitor screens, and rigs.",
      price: 80000,
      email: "booking@cinevisionrentals.in",
      contact: "+91 98123 45678"
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
      return Number(item.perDayFee || 0) * Number(item.daysScheduled || 0);
    case 'Directors':
      return Number(item.directingFee || 0);
    case 'HOD':
      return Number(item.price || 0) * Number(item.daysScheduled || 0);
    case 'Technical Crew':
      return Number(item.price || 0) * Number(item.daysScheduled || 0);
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
      return Number(item.price || 0);
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
      if (parsed.projectName !== "YEH DIL BEWAJAH (PROMO TEASER)" || parsed.version !== 9) {
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
      if (parsedMeta.projectName !== "YEH DIL BEWAJAH (PROMO TEASER)" || parsedMeta.version !== 9) {
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
      if (parsedMeta.projectName !== "YEH DIL BEWAJAH (PROMO TEASER)" || parsedMeta.version !== 9) {
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
