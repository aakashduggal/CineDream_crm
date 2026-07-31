import React, { createContext, useState, useEffect } from 'react';

export const ProductionContext = createContext();

const INITIAL_METADATA = {
  projectName: "Echoes of Cinedream",
  genre: "Sci-Fi Epic",
  director: "Denis Villeneuve Jr.",
  budgetLimit: 25000000, // ₹25,000,000 Cap
  shootingDays: 90,
  startDate: "2026-08-15",
  endDate: "2026-11-15",
  currentUser: "Sarah Connor (Line Producer)"
};

const INITIAL_MOCK_DATA = {
  Actors: [
    {
      id: "act-1",
      name: "Alexander Sterling",
      role: "Lead Actor (Commander Hayes)",
      status: "Active",
      actingFee: 1200000,
      perDayFee: 5000,
      daysScheduled: 40,
      paidAmount: 600000,
      relationshipStatus: "Married",
      contactInfo: { phone: "+1 (555) 019-2834", email: "sterling@hollywoodtalent.com" },
      biography: "Academy Award-nominated actor with over 20 years of experience in dramatic and action roles.",
      contractDetails: "Includes standard backend profit share (1.5% points) and post-production promotional commitments.",
      availabilitySchedule: "August 15 - October 10",
      foodPreferences: "Vegan",
      dietaryRestrictions: "Nut allergy",
      costumeMeasurements: "Chest: 40\", Waist: 32\", Inseam: 34\", Shoe: 11 US",
      makeupRequirements: "Requires 1.5 hours of scar prosthetics for Commander Hayes character.",
      travelPreferences: "First Class Flight, Private Airport Transfer",
      accommodationPreferences: "5-Star Suite, High Privacy",
      emergencyContact: "Emily Sterling (Wife) - +1 (555) 019-2835",
      medicalInformation: "No chronic conditions. Blood type A+.",
      socialMedia: { twitter: "@sterling_alex", instagram: "@alexandersterling" },
      previousProjects: "Nebula Rising (2024), Dust & Glory (2021)",
      awards: "Oscar Nomination for Best Actor (2024)",
      documents: ["Contract_Final_Sterling.pdf", "Prosthetics_Layout.jpg"],
      notes: "Extremely punctual. Requires a quiet green room for prep."
    },
    {
      id: "act-2",
      name: "Elena Rostova",
      role: "Lead Actress (Dr. Aris)",
      status: "Scheduled",
      actingFee: 950000,
      perDayFee: 4500,
      daysScheduled: 45,
      paidAmount: 450000,
      relationshipStatus: "Single",
      contactInfo: { phone: "+44 20 7946 0912", email: "elena@curtisagents.co.uk" },
      biography: "Award-winning British-Russian actress famous for her roles in cerebral science fiction and indie dramas.",
      contractDetails: "Includes first-class travel and lodging for up to 2 family members.",
      availabilitySchedule: "August 20 - October 25",
      foodPreferences: "Gluten-Free, Pescatarian",
      dietaryRestrictions: "Lactose Intolerant",
      costumeMeasurements: "Bust: 34\", Waist: 26\", Hips: 36\", Shoe: 8 US",
      makeupRequirements: "Minimal styling. Special glow/reflective makeup for holographic sequences.",
      travelPreferences: "First Class Flight, Exec Cab",
      accommodationPreferences: "Premium Serviced Apartment with private kitchen",
      emergencyContact: "Yuri Rostov (Father) - +44 20 7946 0915",
      medicalInformation: "Mild asthma. Carries inhaler.",
      socialMedia: { twitter: "@elenarostova", instagram: "@elena_rostova" },
      previousProjects: "Singularity (2025), The Last Shore (2023)",
      awards: "BAFTA Award for Best Actress (2025)",
      documents: ["Contract_Rostova_Signed.pdf", "Dietary_Rider.pdf"],
      notes: "Requires a dehumidifier in her dressing room."
    },
    {
      id: "act-3",
      name: "Marcus Vance",
      role: "Supporting Actor (Sgt. Kowalski)",
      status: "Active",
      actingFee: 250000,
      perDayFee: 2500,
      daysScheduled: 20,
      paidAmount: 125000,
      relationshipStatus: "In a Relationship",
      contactInfo: { phone: "+1 (555) 432-8765", email: "mvance@apa-agency.com" },
      biography: "Stunt-heavy character actor known for rugged military and antagonist performances.",
      contractDetails: "Standard SAG contract. Stunt adjustment rates apply.",
      availabilitySchedule: "September 01 - September 25",
      foodPreferences: "High Protein / Keto",
      dietaryRestrictions: "None",
      costumeMeasurements: "Chest: 44\", Waist: 34\", Inseam: 32\", Shoe: 12 US",
      makeupRequirements: "Dirt and sweat application. Temporary tattoos on arms.",
      travelPreferences: "Business Class, Standard Cab",
      accommodationPreferences: "Standard Premium Hotel Room",
      emergencyContact: "Linda Vance (Mother) - +1 (555) 432-8760",
      medicalInformation: "Penicillin allergy.",
      socialMedia: { twitter: "@marcus_vance", instagram: "@marcusvance_official" },
      previousProjects: "Iron Clad (2023), Desert Storm (2020)",
      awards: "Screen Actors Guild Stunt Ensemble Award (2022)",
      documents: ["Vance_SAG_Contract.pdf"],
      notes: "Performs own basic stunts. Requires stunt coordinator presence."
    }
  ],
  Directors: [
    {
      id: "dir-1",
      name: "Denis Villeneuve Jr.",
      experience: 18,
      directingFee: 2000000,
      status: "Active",
      availability: "Full Production Duration",
      preferredCrew: "Roger Deakins Jr. (Cinematographer), Hans Zimmer II (Composer)",
      travelPreferences: "Private Jet or First Class, Dedicated Chauffeur",
      biography: "Acclaimed visionary director specializing in large-scale science fiction and atmospheric worldbuilding.",
      contactInfo: { phone: "+1 (555) 901-2345", email: "assistant.dvj@cinedreampictures.com" },
      documents: ["Director_Agreement_DVJ.pdf", "Director_Visions_Concept.pdf"],
      notes: "Prefers morning shoots and shooting in chronological order whenever possible.",
      paidAmount: 1000000
    }
  ],
  "Technical Crew": [
    {
      id: "crew-1",
      name: "Roger Deakins Jr.",
      role: "Director of Photography",
      department: "Camera",
      experience: 25,
      dailyRate: 8000,
      daysScheduled: 60,
      paidAmount: 240000,
      equipmentAssigned: "ARRI Alexa 35 Camera Package",
      availability: "August 15 - October 15",
      certifications: "ASC (American Society of Cinematographers) Member",
      travelPreferences: "First Class Flight, Luxury SUV Rental",
      notes: "Requires pre-production lighting setups 3 days prior to shoot start."
    },
    {
      id: "crew-2",
      name: "Hans Zimmer II",
      role: "Composer & Sound Designer",
      department: "Sound",
      experience: 20,
      dailyRate: 6000,
      daysScheduled: 40,
      paidAmount: 120000,
      equipmentAssigned: "Custom Sound Suite (Studio-based)",
      availability: "September 01 - Post Production",
      certifications: "AMPS Member",
      travelPreferences: "Business Class, Standard Premium Cab",
      notes: "Conducts orchestra recordings in London Studios."
    },
    {
      id: "crew-3",
      name: "Sarah Miller",
      role: "Gaffer (Chief Lighting Technician)",
      department: "Lights",
      experience: 10,
      dailyRate: 1200,
      daysScheduled: 50,
      paidAmount: 30000,
      equipmentAssigned: "SkyPanel LED Lighting Kit",
      availability: "August 15 - October 05",
      certifications: "OSHA Safety Certified",
      travelPreferences: "Premium Economy, Standard Rental Car",
      notes: "Coordinates directly with DOP on color styling."
    },
    {
      id: "crew-4",
      name: "David Cho",
      role: "Production Designer",
      department: "Art",
      experience: 12,
      dailyRate: 2500,
      daysScheduled: 75,
      paidAmount: 100000,
      equipmentAssigned: "Design Station Pro, Drafting Plotter",
      availability: "July 01 - October 15",
      certifications: "ADG Member",
      travelPreferences: "Premium Economy, Medium SUV",
      notes: "Leading the construction team on Wembley soundstages."
    }
  ],
  Equipment: [
    {
      id: "equip-1",
      name: "ARRI Alexa 35 Camera Package",
      category: "Camera",
      model: "Alexa 35",
      serialNumber: "AX35-90812",
      status: "In Use",
      rentalCostPerDay: 3500,
      daysRented: 60,
      paidAmount: 150000,
      maintenanceHistory: "Calibrated on July 20, 2026. Next inspection due September 15, 2026.",
      assignedProject: "Echoes of Cinedream (Main Unit)",
      operator: "Roger Deakins Jr.",
      notes: "Equipped with anamorphic camera mounts."
    },
    {
      id: "equip-2",
      name: "Panavision Primo Lens Set",
      category: "Camera",
      model: "Primo Anamorphic Prime Set",
      serialNumber: "PVP-55291",
      status: "In Use",
      rentalCostPerDay: 2000,
      daysRented: 60,
      paidAmount: 60000,
      maintenanceHistory: "Polished and aligned on July 22, 2026.",
      assignedProject: "Echoes of Cinedream (Main Unit)",
      operator: "Roger Deakins Jr.",
      notes: "Fragile. Extra lens insurance applies."
    },
    {
      id: "equip-3",
      name: "SkyPanel S60-C LED Light Kit (x4)",
      category: "Lighting",
      model: "Arri SkyPanel S60-C",
      serialNumber: "SP-88219-4X",
      status: "In Use",
      rentalCostPerDay: 800,
      daysRented: 50,
      paidAmount: 20000,
      maintenanceHistory: "Fitted with new diffuser plates. Power supplies checked July 25, 2026.",
      assignedProject: "Echoes of Cinedream (Main Unit)",
      operator: "Sarah Miller",
      notes: "Controlled via DMX board."
    }
  ],
  Travel: [
    {
      id: "trav-1",
      personName: "Alexander Sterling & Assistants",
      role: "Lead Actor",
      type: "Flight",
      bookingNumber: "FI-9821-IS",
      itinerary: "Los Angeles (LAX) to Reykjavik (KEF) via Icelandair",
      pickupLocation: "LAX Terminal 7 VIP Lounge",
      dropLocation: "Grand Hotel Reykjavik",
      time: "2026-08-14 14:30",
      status: "Booked",
      expenses: 18500,
      paidAmount: 18500,
      notes: "First-class travel. 3 passengers total."
    },
    {
      id: "trav-2",
      personName: "Camera & Lens Gear Cargo",
      role: "Equipment",
      type: "Freight",
      bookingNumber: "CARGO-4411-DHL",
      itinerary: "London (LHR) to Reykjavik (KEF)",
      pickupLocation: "Panavision Depots London",
      dropLocation: "Reykjavik Port Storage",
      time: "2026-08-10 09:00",
      status: "In Transit",
      expenses: 35000,
      paidAmount: 35000,
      notes: "Temperature-controlled customs containers."
    },
    {
      id: "trav-3",
      personName: "Denis Villeneuve Jr.",
      role: "Director",
      type: "Cab",
      bookingNumber: "CAB-DIR-01",
      itinerary: "Daily Hotel-to-Set Commute (Iceland)",
      pickupLocation: "Grand Hotel Reykjavik",
      dropLocation: "Various Shooting Locations (Vik, Black Beach)",
      time: "Daily 05:00 - 20:00",
      status: "Active",
      expenses: 4500,
      paidAmount: 2000,
      notes: "Dedicated 4x4 SUV and professional local driver."
    }
  ],
  "Lodging & Boarding": [
    {
      id: "lodg-1",
      personName: "Cast & Key Crew (35 Pax)",
      hotelName: "Grand Hotel Reykjavik",
      roomNumber: "Various (30 Rooms allocated)",
      roomType: "Suites & Premium Doubles",
      checkIn: "2026-08-14",
      checkOut: "2026-09-15",
      mealPlan: "All-Inclusive",
      specialRequirements: "Requires early breakfasts (04:30 AM) and packed crew lunches.",
      costPerDay: 12500,
      totalDays: 30,
      totalCost: 375000,
      paidAmount: 200000,
      status: "Active",
      notes: "Group discount applied. Extra laundry charges billed weekly."
    },
    {
      id: "lodg-2",
      personName: "Post-Production VFX Crew (8 Pax)",
      hotelName: "London Serviced Apartments",
      roomNumber: "Apts 4A, 4B, 5A, 5B",
      roomType: "2-Bedroom Luxury Apartments",
      checkIn: "2026-09-15",
      checkOut: "2026-10-30",
      mealPlan: "Self-Catering (Stipend Provided)",
      specialRequirements: "High-speed 1Gbps fiber internet in each room for large asset downloads.",
      costPerDay: 4200,
      totalDays: 45,
      totalCost: 189000,
      paidAmount: 90000,
      status: "Booked",
      notes: "Conveniently located near VFX facility."
    }
  ],
  Costumes: [
    {
      id: "cost-1",
      name: "Astronaut EVA Suit (Commander Hayes)",
      assignedActor: "Alexander Sterling",
      measurements: "Height: 6'1\", Chest: 40\", Waist: 32\", Boot: 11 US",
      designer: "Prada Aerospace Design Studio",
      cost: 75000,
      fittingDate: "2026-08-01",
      maintenanceStatus: "Repaired visor seal, sanitized.",
      returnStatus: "On Set",
      status: "Ready",
      notes: "Features functional LED suit lighting and helmet cooling fan.",
      paidAmount: 50000
    },
    {
      id: "cost-2",
      name: "Nebula Cybernetic Gown (Dr. Aris)",
      assignedActor: "Elena Rostova",
      measurements: "Height: 5'8\", Bust: 34\", Waist: 26\", Hips: 36\"",
      designer: "Iris van Herpen Studio",
      cost: 60000,
      fittingDate: "2026-08-03",
      maintenanceStatus: "Replacing micro-fiber optic cables on left shoulder.",
      returnStatus: "In Wardrobe Studio",
      status: "Alteration",
      notes: "Requires a wardrobe technician to operate electronics integration.",
      paidAmount: 30000
    }
  ],
  Locations: [
    {
      id: "loc-1",
      name: "Iceland Black Sand Beach (Glacier Scene)",
      address: "Reynisfjara Beach, Vik, Iceland",
      rentalFee: 150000,
      contactPerson: "Gunnar Thor (Local Location Manager)",
      status: "Booked",
      durationDays: 12,
      photos: [],
      notes: "Strict environmental protection guidelines apply. No heavy vehicles on dunes.",
      paidAmount: 75000
    },
    {
      id: "loc-2",
      name: "Wembley Soundstage 4 (London)",
      address: "Wembley Stadium Complex, London, UK",
      rentalFee: 450000,
      contactPerson: "Alice Cooper (Stage Bookings)",
      status: "Booked",
      durationDays: 45,
      photos: [],
      notes: "Includes access to adjoining workshop space, green rooms, and catering kitchen.",
      paidAmount: 200000
    }
  ],
  "Production Team": [
    {
      id: "prod-1",
      name: "Sarah Connor",
      role: "Line Producer",
      salary: 180000,
      dailyRate: 0,
      daysScheduled: 90,
      paidAmount: 90000,
      contactInfo: "s.connor@cinedreampictures.com",
      notes: "Authorizes all expenses and signs off weekly time sheets."
    },
    {
      id: "prod-2",
      name: "John Smith",
      role: "First Assistant Director",
      salary: 0,
      dailyRate: 1500,
      daysScheduled: 70,
      paidAmount: 70000,
      contactInfo: "jsmith.1ad@gmail.com",
      notes: "Manages set schedule and ensures filming targets are met."
    },
    {
      id: "prod-3",
      name: "Chloe Bennett",
      role: "Production Coordinator",
      salary: 95000,
      dailyRate: 0,
      daysScheduled: 90,
      paidAmount: 50000,
      contactInfo: "cbennett.prod@outlook.com",
      notes: "Coordinates travel logistics, accommodation block bookings, and vendor contracts."
    }
  ],
  Vendors: [
    {
      id: "vend-1",
      name: "CineLight Rentals Inc.",
      serviceCategory: "Equipment Rental",
      contactPerson: "Robert Thorne",
      phone: "+1 (555) 890-4433",
      email: "rentals@cinelight.com",
      contractValue: 380000,
      paidAmount: 250000,
      pendingAmount: 130000,
      status: "Active",
      notes: "Main supplier for lighting and grip equipment."
    },
    {
      id: "vend-2",
      name: "Global Logistics Group",
      serviceCategory: "Transport & Freight",
      contactPerson: "Marie Dupont",
      phone: "+33 1 4268 5300",
      email: "m.dupont@globallogistics.com",
      contractValue: 120000,
      paidAmount: 80000,
      pendingAmount: 40000,
      status: "Active",
      notes: "Handles international shipping of sets, costumes, and cameras."
    }
  ],
  Vehicles: [
    {
      id: "veh-1",
      model: "Production Honeywagon Trailer",
      plateNumber: "IS-HW-902",
      driverName: "Kari Arnason",
      driverContact: "+354 892 1092",
      rentalCostPerDay: 600,
      daysRented: 75,
      totalCost: 45000,
      assignment: "Cast Dressing Rooms & Restrooms",
      status: "Active",
      notes: "Requires electrical hookup and waste pumping twice a week.",
      paidAmount: 30000
    },
    {
      id: "veh-2",
      model: "Volvo FH16 Heavy Cargo Flatbed",
      plateNumber: "LN-22-YHX",
      driverName: "Thomas Wright",
      driverContact: "+44 7700 900077",
      rentalCostPerDay: 450,
      daysRented: 40,
      totalCost: 18000,
      assignment: "Transporting Set Scenery",
      status: "Active",
      notes: "Hauls timber and metal structure materials from builder workshop.",
      paidAmount: 12000
    },
    {
      id: "veh-3",
      model: "Mercedes V-Class Executive SUV",
      plateNumber: "IS-EXEC-01",
      driverName: "Svein Magnusson",
      driverContact: "+354 772 9012",
      rentalCostPerDay: 200,
      daysRented: 60,
      totalCost: 12000,
      assignment: "Denis Villeneuve Jr. (Director)",
      status: "Active",
      notes: "Equipped with studded tires for highland track accessibility.",
      paidAmount: 8000
    }
  ],
  Catering: [
    {
      id: "cat-1",
      catererName: "Reykjavik Catering Co.",
      mealType: "Breakfast & Lunch Buffet (Iceland)",
      headCount: 120,
      costPerHead: 45,
      days: 15,
      totalCost: 81000,
      paidAmount: 81000,
      status: "Completed",
      notes: "Served on-location at Vik beach camp. Set up heated dining tent."
    },
    {
      id: "cat-2",
      catererName: "Pinewood Craft Services Ltd.",
      mealType: "Full Day Meals (Breakfast, Lunch, Dinner, Crafty)",
      headCount: 150,
      costPerHead: 35,
      days: 45,
      totalCost: 236250,
      paidAmount: 150000,
      status: "Active",
      notes: "Stationed outside Stage 4. Special vegan station setup."
    }
  ],
  Finance: [
    {
      id: "fin-1",
      itemName: "Production Insurance Policy",
      category: "Insurance",
      cost: 250000,
      paidAmount: 250000,
      notes: "Covers cast injury, key equipment damage, and weather delays."
    },
    {
      id: "fin-2",
      itemName: "Filming Permits (Iceland Government)",
      category: "Permits & Licenses",
      cost: 45000,
      paidAmount: 45000,
      notes: "Environmental permit for filming in Vatnajökull National Park."
    },
    {
      id: "fin-3",
      itemName: "Marketing & Promotion (Teaser Campaign)",
      category: "Marketing & Promotion",
      cost: 500000,
      paidAmount: 100000,
      notes: "Social media teasers and Cannes Film Festival billboard placement."
    },
    {
      id: "fin-4",
      itemName: "Post-Production VFX Contract (ILM)",
      category: "Post-Production Costs",
      cost: 1500000,
      paidAmount: 500000,
      notes: "First milestone payment completed. Delivery of 450 shots scheduled for late 2026."
    }
  ],
  Documents: [
    {
      id: "doc-1",
      title: "Vatnajökull Park Filming Permit - Approved",
      category: "Permits",
      fileType: "PDF",
      uploadDate: "2026-06-15",
      size: "4.2 MB",
      status: "Approved",
      notes: "Original signed copy. Must be carried by location managers at all times."
    },
    {
      id: "doc-2",
      title: "Lead Actor Contract - Alexander Sterling (Executed)",
      category: "Contracts",
      fileType: "PDF",
      uploadDate: "2026-07-10",
      size: "12.8 MB",
      status: "Signed",
      notes: "Approved by Legal and agent."
    },
    {
      id: "doc-3",
      title: "Shooting Script - Revision 4.2 (Official)",
      category: "Scripts",
      fileType: "PDF",
      uploadDate: "2026-07-20",
      size: "8.5 MB",
      status: "Distributed",
      notes: "Incorporates water scenes revisions."
    }
  ]
};

const INITIAL_AUDIT_LOG = [
  {
    id: "log-1",
    timestamp: "2026-07-30T10:15:30Z",
    user: "Sarah Connor (Line Producer)",
    actionType: "UPDATE",
    module: "Actors",
    itemName: "Alexander Sterling",
    changeDescription: "Updated actingFee from ₹1,00,00,000 to ₹1,20,00,000",
    budgetEffect: 200000,
    previousTotal: 7774750,
    newTotal: 7974750
  },
  {
    id: "log-2",
    timestamp: "2026-07-30T14:22:10Z",
    user: "Aditya S. (Executive Producer)",
    actionType: "ADD",
    module: "Equipment",
    itemName: "SkyPanel S60-C LED Light Kit (x4)",
    changeDescription: "Added new lighting equipment rental at ₹800/day for 50 days",
    budgetEffect: 40000,
    previousTotal: 7974750,
    newTotal: 8014750
  },
  {
    id: "log-3",
    timestamp: "2026-07-31T08:05:00Z",
    user: "Sarah Connor (Line Producer)",
    actionType: "UPDATE",
    module: "Catering",
    itemName: "Pinewood Craft Services Ltd.",
    changeDescription: "Increased catering headCount from 120 to 150 for London shoot",
    budgetEffect: 47250,
    previousTotal: 8014750,
    newTotal: 8062000
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
      return Number(item.cost || 0);
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
    const meta = saved ? JSON.parse(saved) : INITIAL_METADATA;
    const sessionUser = sessionStorage.getItem('cinedream_crm_auth');
    if (sessionUser) {
      meta.currentUser = sessionUser;
    }
    return meta;
  });

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('cinedream_crm_data');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_DATA;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
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
