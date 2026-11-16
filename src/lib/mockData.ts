import {
  Project,
  CompanyMetricField,
  SafetyTalk,
  SurveyQuestionEntry,
  NoteEntry,
  ChemicalEntry,
  MetricsEntry,
  EquipmentChecklistEntry,
  IncidentEntry,
  ObservationEntry,
  SignedReportEntry,
  JsaFormRecord,
} from '@/types';
import { getDateKey, startOfLocalDay } from './utils';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-solanco-001',
    name: 'Solanco Solar Farm — Vegetation Management',
    code: 'SOL-2026-A',
    client: 'Solanco Clean Energy LLC',
    location: 'Quarryville, PA 17566',
    acres: 420,
    center: [39.892, -76.162],
  },
  {
    id: 'proj-timberline-002',
    name: 'Timberline Right-of-Way — Transmission Corridor',
    code: 'TRB-ROW-04',
    client: 'Keystone Electric Transmission',
    location: 'Lebanon County, PA',
    acres: 185,
    center: [40.341, -76.425],
  },
  {
    id: 'proj-valleyvista-003',
    name: 'Valley Vista Solar Project — Substation Area',
    code: 'VVS-SUB-09',
    client: 'Apex Clean Energy',
    location: 'Franklin County, PA',
    acres: 310,
    center: [39.932, -77.661],
  },
];

export const DEFAULT_CHEMICALS = [
  { name: 'Glyphosate', quantity: '', unit: 'GAL' },
  { name: 'Surfactant', quantity: '', unit: 'oz' },
  { name: 'Super Dye', quantity: '', unit: 'oz' },
  { name: '2,4-D', quantity: '', unit: 'GAL' },
  { name: 'Ecomazapyr 2SL', quantity: '', unit: 'GAL' },
  { name: 'Regular Dye', quantity: '', unit: 'oz' },
];

export const DEFAULT_METRIC_FIELDS: CompanyMetricField[] = [
  { id: 'builtin-wicking-array', key: 'wicking_array_completed', label: 'Wicking Array', unit: 'acres', sort_order: 0, is_active: true },
  { id: 'builtin-mowing-array', key: 'mowing_array_completed', label: 'Mowing Array', unit: 'acres', sort_order: 1, is_active: true },
  { id: 'builtin-wicking-green', key: 'wicking_green_space_completed', label: 'Wicking Green Space', unit: 'acres', sort_order: 2, is_active: true },
  { id: 'builtin-mowing-green', key: 'mowing_green_space_completed', label: 'Mowing Green Space', unit: 'acres', sort_order: 3, is_active: true },
  { id: 'builtin-water', key: 'water_usage', label: 'Water Usage', unit: 'gal', sort_order: 4, is_active: true },
  { id: 'builtin-ops', key: 'number_of_operators', label: 'Operators', unit: 'count', sort_order: 5, is_active: true },
];

export const DEFAULT_SURVEY_QUESTIONS: { question: string; positiveAnswer: 'Yes' | 'No' }[] = [
  { question: 'Were there any equipment malfunctions on-site today?', positiveAnswer: 'No' },
  { question: 'Were there any accidents or near-misses?', positiveAnswer: 'No' },
  { question: 'Were there any weather delays today?', positiveAnswer: 'No' },
  { question: 'Were there any safety concerns or hazards observed?', positiveAnswer: 'No' },
  { question: 'Were all PPE requirements properly followed?', positiveAnswer: 'Yes' },
  { question: 'Did you verify all employees clocked in and out to the correct project?', positiveAnswer: 'Yes' },
  { question: 'Were all receipts uploaded to DEXT correctly?', positiveAnswer: 'Yes' },
  { question: 'Was any emergency equipment used today?', positiveAnswer: 'No' },
  { question: 'Were there any trespassing or security incidents?', positiveAnswer: 'No' },
  { question: 'Were there any environmental concerns (spill, contamination)?', positiveAnswer: 'No' },
  { question: 'Is any additional follow-up required for tomorrow?', positiveAnswer: 'No' },
];

export function getInitialSurveyQuestions(): SurveyQuestionEntry[] {
  return DEFAULT_SURVEY_QUESTIONS.map((q, idx) => ({
    id: String(idx + 1),
    question: q.question,
    answer: q.positiveAnswer, // default to healthy compliance
    positiveAnswer: q.positiveAnswer,
    description: '',
  }));
}

export const SAFETY_TEMPLATES = [
  {
    id: 'aed',
    name: 'Automated External Defibrillator (AED) Safety Talk',
    description: 'AED location, emergency response, pad placement, and maintenance checklist',
    content: `Overview:
Sudden cardiac arrest can happen to anyone. Immediate CPR and early defibrillation using an AED dramatically increase survival rates.

Key Discussion Points:
1. Know the location of the truck AED kit (Vehicle #104 behind driver seat).
2. Assess responsiveness and call 911 immediately.
3. Turn on the AED and follow spoken voice prompts without hesitation.
4. Ensure chest is dry and apply pads as indicated on the diagrams.
5. Stand clear during shock delivery.
6. Continue CPR immediately after shock until paramedics arrive.`,
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/note.pdf',
  },
  {
    id: 'slips-trips',
    name: 'Slips, Trips & Falls Awareness',
    description: 'Uneven terrain navigation, tracker cables, mud, and steel toe footwear',
    content: `Overview:
Ground conditions in utility corridors and solar farms present constant trip and rollover hazards including concealed ruts, wire conduit, and slippery slopes.

Key Discussion Points:
1. Always maintain 3 points of contact when mounting/dismounting tracked machinery.
2. Watch for hidden conduit trenches and ground cable trays around inverter pads.
3. Keep cab steps and floor mats free of clay mud and hydraulic oil.
4. Walk at a controlled pace on damp turf; never run across inverter alleys.`,
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/note.pdf',
  },
  {
    id: 'ppe',
    name: 'Personal Protective Equipment (PPE) Compliance',
    description: 'Chemical gloves, eye protection, respirator cartridges, and high-vis vests',
    content: `Overview:
Working with high-pressure spray rigs and concentrated herbicides requires full barrier protection to prevent dermal absorption and inhalation.

Key Discussion Points:
1. Nitrile chemical resistant gloves (minimum 15 mil) must be worn during mix & load.
2. Eye protection (sealed goggles or safety glasses with side shields) is mandatory.
3. Inspect spray nozzles and hose clamps before pressurizing the system.
4. Wash hands thoroughly before eating, drinking, or operating vehicle steering wheels.`,
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/note.pdf',
  },
];

// Helper to get relative date keys
export function getRelativeDateKey(daysAgo: number): string {
  const d = startOfLocalDay(new Date());
  d.setDate(d.getDate() - daysAgo);
  return getDateKey(d);
}

// Generate realistic seed data for the last few days
export function generateSeedData(): {
  notes: Record<string, NoteEntry[]>;
  chemicals: Record<string, ChemicalEntry[]>;
  metrics: Record<string, MetricsEntry[]>;
  equipment: Record<string, EquipmentChecklistEntry[]>;
  incidents: Record<string, IncidentEntry[]>;
  observations: Record<string, ObservationEntry[]>;
  signedReports: Record<string, SignedReportEntry>;
  safetyTalks: SafetyTalk[];
  jsa: Record<string, JsaFormRecord>;
} {
  const todayKey = getRelativeDateKey(0);
  const yesterdayKey = getRelativeDateKey(1);
  const twoDaysAgoKey = getRelativeDateKey(2);

  const notes: Record<string, NoteEntry[]> = {
    [todayKey]: [
      {
        id: 'seed-note-1',
        project: MOCK_PROJECTS[0].name,
        projectId: MOCK_PROJECTS[0].id,
        timestamp: new Date().toISOString(),
        category: 'General',
        notes: 'Arrived at site 07:00 AM. Clear sky, wind 4 mph from WNW. Began selective wicking on Inverter blocks 4 & 5. Ground is firm with no standing water.',
        syncStatus: 'synced',
      },
      {
        id: 'seed-note-2',
        project: MOCK_PROJECTS[0].name,
        projectId: MOCK_PROJECTS[0].id,
        timestamp: new Date().toISOString(),
        category: 'Equipment',
        notes: 'ASV RT-40 tracks inspected. Left tensioner adjusted slightly. Hydraulic pressure operating at normal 2,800 PSI.',
        syncStatus: 'synced',
      },
    ],
    [yesterdayKey]: [
      {
        id: 'seed-note-3',
        project: MOCK_PROJECTS[0].name,
        projectId: MOCK_PROJECTS[0].id,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        category: 'Weather',
        notes: 'Brief cloud cover at 14:00. Completed Section B mowing without delay. All gates secured at end of shift.',
        syncStatus: 'synced',
      },
    ],
  };

  const chemicals: Record<string, ChemicalEntry[]> = {
    [todayKey]: [
      {
        id: 'seed-chem-1',
        project: MOCK_PROJECTS[0].name,
        projectId: MOCK_PROJECTS[0].id,
        timestamp: new Date().toISOString(),
        applicationType: 'wicking',
        chemicals: [
          { name: 'Glyphosate', quantity: '45', unit: 'GAL' },
          { name: 'Surfactant', quantity: '64', unit: 'oz' },
          { name: 'Super Dye', quantity: '32', unit: 'oz' },
          { name: '2,4-D', quantity: '10', unit: 'GAL' },
          { name: 'Ecomazapyr 2SL', quantity: '8', unit: 'GAL' },
          { name: 'Regular Dye', quantity: '16', unit: 'oz' },
        ],
        notes: 'Mixed in 300 gal nurse tank at 07:30. Good blue indicator visibility on Johnson grass foliage.',
        syncStatus: 'synced',
      },
    ],
    [yesterdayKey]: [
      {
        id: 'seed-chem-2',
        project: MOCK_PROJECTS[0].name,
        projectId: MOCK_PROJECTS[0].id,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        applicationType: 'spraying',
        chemicals: [
          { name: 'Glyphosate', quantity: '60', unit: 'GAL' },
          { name: 'Surfactant', quantity: '80', unit: 'oz' },
          { name: 'Super Dye', quantity: '40', unit: 'oz' },
        ],
        notes: 'Broadleaf spot treatment along perimeter security fencing.',
        syncStatus: 'synced',
      },
    ],
  };

  const metrics: Record<string, MetricsEntry[]> = {
    [todayKey]: [
      {
        id: 'seed-metrics-1',
        project: MOCK_PROJECTS[0].name,
        projectId: MOCK_PROJECTS[0].id,
        timestamp: new Date().toISOString(),
        values: {
          wicking_array_completed: '28.5',
          mowing_array_completed: '16.0',
          wicking_green_space_completed: '6.2',
          mowing_green_space_completed: '4.0',
          water_usage: '450',
          number_of_operators: '4',
        },
        notes: 'Target acreage achieved for daily production goal. 4 operators on site.',
        syncStatus: 'synced',
      },
    ],
    [yesterdayKey]: [
      {
        id: 'seed-metrics-2',
        project: MOCK_PROJECTS[0].name,
        projectId: MOCK_PROJECTS[0].id,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        values: {
          wicking_array_completed: '32.0',
          mowing_array_completed: '20.0',
          wicking_green_space_completed: '8.0',
          mowing_green_space_completed: '5.5',
          water_usage: '600',
          number_of_operators: '4',
        },
        syncStatus: 'synced',
      },
    ],
  };

  const equipment: Record<string, EquipmentChecklistEntry[]> = {
    [todayKey]: [
      {
        id: 'seed-equip-1',
        type: 'checklist',
        project: MOCK_PROJECTS[0].name,
        projectId: MOCK_PROJECTS[0].id,
        timestamp: new Date().toISOString(),
        formData: {
          machineNumber: 'ASV-104',
          machineType: 'Compact Track Loader',
          machineBrand: 'ASV Posi-Track',
          lastFourVin: '8832',
          operatorName: 'Ricky Smith',
          siteName: MOCK_PROJECTS[0].name,
          asvHours: '1,428.6',
          motorOil: 'FULL',
          motorOilAmount: '',
          motorOilUnit: 'qt',
          coolant: 'FULL',
          coolantAmount: '',
          coolantUnit: 'qt',
          hydraulicOil: 'FULL',
          hydraulicOilAmount: '',
          hydraulicOilUnit: 'qt',
          hoses: 'GOOD',
          fanBelt: 'TIGHT',
          attachmentApplicable: 'Yes',
          attachmentName: 'Wicked Weed Wiper 12ft Front Mount',
          attachmentNumber: 'ATT-02',
          attachmentCondition: 'Good',
          repairsNotes: 'Pre-trip complete. Cleaned debris from radiator pre-cleaner screen. Ready for operation.',
        },
        signature: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><path d="M10 40 Q 50 10 90 35 T 180 25" stroke="%2330D158" stroke-width="3" fill="none"/></svg>',
        syncStatus: 'synced',
      },
    ],
  };

  const incidents: Record<string, IncidentEntry[]> = {
    [todayKey]: [],
    [yesterdayKey]: [
      {
        id: 'seed-inc-1',
        project: MOCK_PROJECTS[0].name,
        projectId: MOCK_PROJECTS[0].id,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        title: 'Minor Bee Sting Near Perimeter Fence',
        status: 'Closed',
        recordable: false,
        incidentDate: yesterdayKey,
        incidentTime: '11:15 AM',
        location: 'Perimeter Gate 3, Fence Line',
        injuryType: 'Insect Sting / Minor Reaction',
        injuredEmployee: {
          name: 'Tyler Johnson',
          gender: 'Male',
          jobTitle: 'Field Technician',
          treatment: 'First Aid Kit sting relief wipe and ice pack applied. No allergic reaction.',
          hospitalized: false,
        },
        investigation: 'Technician was clearing brush near a dormant fence post where a small nest was concealed.',
        outcome: 'Marked post with high-vis tape. Re-inspected area before continuing. Employee resumed normal duty.',
        syncStatus: 'synced',
      },
    ],
  };

  const observations: Record<string, ObservationEntry[]> = {
    [todayKey]: [
      {
        id: 'seed-obs-1',
        project: MOCK_PROJECTS[0].name,
        projectId: MOCK_PROJECTS[0].id,
        timestamp: new Date().toISOString(),
        type: 'Invasive Vegetation',
        category: 'negative',
        status: 'Open',
        progress: 'New Occurrence',
        title: 'Dense Johnson Grass Stand at Array 4 North Boundary',
        description: 'Stand of invasive grass reaching 5-6 ft tall entering bottom panel clearance area. Needs second pass wicking.',
        descriptionTags: ['Scale & Density: Dense, Widespread', 'Physical Traits: Tall, Thick', 'Visibility & Access: Impeding Operations'],
        location: 'Array 4, Rows 12-18 Northern End',
        gpsLat: 39.8934,
        gpsLng: -76.1608,
        gpsAccuracyM: 3.2,
        syncStatus: 'synced',
      },
      {
        id: 'seed-obs-2',
        project: MOCK_PROJECTS[0].name,
        projectId: MOCK_PROJECTS[0].id,
        timestamp: new Date().toISOString(),
        type: 'Hazards on Site',
        category: 'positive',
        status: 'Resolved',
        progress: 'Improved',
        title: 'Washout Trench Filled and Compacted',
        description: 'Previously reported storm rut near Inverter Pad #2 was filled with gravel and graded flat. Equipment path is now safe.',
        descriptionTags: ['Physical Traits: Moderate, Shallow', 'Visibility & Access: Exposed'],
        location: 'Inverter Pad #2 Access Road',
        gpsLat: 39.8912,
        gpsLng: -76.1631,
        gpsAccuracyM: 4.1,
        syncStatus: 'synced',
      },
    ],
  };

  const signedReports: Record<string, SignedReportEntry> = {
    [yesterdayKey]: {
      signedAt: new Date(Date.now() - 86400000).toISOString(),
      preparedBy: 'Ricky Smith (Field Supervisor)',
      signatureDataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="70"><path d="M20 50 Q 80 15 140 45 T 220 30" stroke="%2330D158" stroke-width="3" fill="none"/></svg>',
      projectName: MOCK_PROJECTS[0].name,
      dateKey: yesterdayKey,
    },
  };

  const safetyTalks: SafetyTalk[] = [
    {
      id: 'st-01',
      templateId: 'aed',
      templateName: 'Automated External Defibrillator (AED) Safety Talk',
      date: todayKey,
      status: 'conducted',
      createdAt: new Date().toISOString(),
      projectName: MOCK_PROJECTS[0].name,
      projectId: MOCK_PROJECTS[0].id,
      attendees: [
        { name: 'Ricky Smith', company: "Wick'd Environmental", signed: true },
        { name: 'Tyler Johnson', company: "Wick'd Environmental", signed: true },
        { name: 'Carlos Mendez', company: "Wick'd Environmental", signed: true },
        { name: 'Dave Wilson', company: 'Solanco Subcontracting', signed: true },
      ],
      signatureDataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="50"><path d="M10 35 Q 60 10 110 30 T 170 20" stroke="%2330D158" stroke-width="2.5" fill="none"/></svg>',
    },
    {
      id: 'st-02',
      templateId: 'ppe',
      templateName: 'Personal Protective Equipment (PPE) Compliance',
      date: getRelativeDateKey(-2), // upcoming 2 days in future
      status: 'upcoming',
      createdAt: new Date().toISOString(),
      projectName: MOCK_PROJECTS[0].name,
      projectId: MOCK_PROJECTS[0].id,
    },
    {
      id: 'st-03',
      templateId: 'slips-trips',
      templateName: 'Slips, Trips & Falls Awareness',
      date: getRelativeDateKey(4), // missed 4 days ago
      status: 'missed',
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      projectName: MOCK_PROJECTS[0].name,
      projectId: MOCK_PROJECTS[0].id,
    },
  ];

  const jsa: Record<string, JsaFormRecord> = {
    [todayKey]: {
      id: 'jsa-today',
      projectId: MOCK_PROJECTS[0].id,
      projectName: MOCK_PROJECTS[0].name,
      dateKey: todayKey,
      taskDescription: 'Chemical wicking and spot spraying around low-tilt PV arrays using track loaders with 12ft front wipers.',
      objectives: ['Safety Briefing Completed', 'Chemical Containment Inspected', 'Hospital Route Verified'],
      hazards: [
        {
          id: 'hz-1',
          step: '1. Chemical Tank Fill & Calibration',
          hazard: 'Splashing of concentrated herbicide, skin or eye contact',
          controls: 'Wear full face shield, nitrile gloves, apron. Stand upwind during mix and pour.',
          risk: 'medium',
        },
        {
          id: 'hz-2',
          step: '2. Equipment Traversing Solar Rows',
          hazard: 'Colliding with panel tracker arms or hidden DC wire conduit',
          controls: 'Maintain minimum 18-inch clearance from panel torque tubes. Speed limit 4 mph.',
          risk: 'high',
        },
        {
          id: 'hz-3',
          step: '3. Ground Staff Spotting & Wiper Height Check',
          hazard: 'Pinch points under hydraulic arms, slips on wet slopes',
          controls: 'High-visibility class 3 vests, steel toe boots. Direct eye contact before approaching cab.',
          risk: 'low',
        },
      ],
      nearestHospital: {
        name: 'Lancaster General Hospital Emergency Room',
        address: '555 N Duke St, Lancaster, PA 17602',
        phone: '(717) 544-5511',
        distanceMiles: 14.8,
        etaMinutes: 22,
      },
      emergencyGps: '39.8924° N, 76.1621° W (Main Gate 1)',
      preparedBy: 'Ricky Smith',
      supervisorSigned: true,
      timestamp: new Date().toISOString(),
      syncStatus: 'synced',
    },
  };

  return {
    notes,
    chemicals,
    metrics,
    equipment,
    incidents,
    observations,
    signedReports,
    safetyTalks,
    jsa,
  };
}
