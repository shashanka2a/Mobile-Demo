export interface DemoStep {
  title: string;
  narration: string;
  targetScreen: string;
  cursorPos?: { x: number; y: number };
  tap?: boolean;
  actionDelayMs?: number;
  badge?: string;
  highlightTile?: string;
}

export interface DemoWorkflow {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  steps: DemoStep[];
}

export const DEMO_WORKFLOWS: DemoWorkflow[] = [
  {
    id: 'wf-daily-hub',
    title: '1. Daily Hub & Calendar Compliance',
    shortDesc: 'Navigate weekday status strip & calendar month compliance dots',
    iconName: 'Calendar',
    steps: [
      {
        title: 'Morning Check-In & Active Project',
        narration: 'Supervisor opens UtilityVision to check into Solanco Solar Farm (420 acres).',
        targetScreen: 'home',
        cursorPos: { x: 50, y: 12 },
        tap: true,
        actionDelayMs: 2500,
        badge: 'Active Project',
      },
      {
        title: 'Reviewing Weekday Status Strip',
        narration: 'The horizontal date strip highlights past, current, and upcoming days with status indicators.',
        targetScreen: 'home',
        cursorPos: { x: 38, y: 22 },
        tap: true,
        actionDelayMs: 2800,
        badge: 'Calendar Strip',
      },
      {
        title: 'Checking Month Compliance Dots',
        narration: 'Green dots represent verified signed reports; yellow denotes logged data; red flags missing days.',
        targetScreen: 'home',
        cursorPos: { x: 85, y: 17 },
        tap: true,
        actionDelayMs: 3000,
        badge: 'OSHA & Client Compliance',
      },
      {
        title: '12 Field Modules Ready',
        narration: 'All 12 daily task modules are accessible with one tap, even in zero-connectivity areas.',
        targetScreen: 'home',
        cursorPos: { x: 25, y: 46 },
        tap: false,
        actionDelayMs: 2200,
        badge: 'Ready for Field Duty',
      },
    ],
  },
  {
    id: 'wf-chemicals',
    title: '2. Chemical & Tank Mix Logging',
    shortDesc: 'Log herbicide mixtures with automated high-dosage threshold warnings',
    iconName: 'FlaskConical',
    steps: [
      {
        title: 'Opening Chemical Application Log',
        narration: 'Supervisor selects the Chemicals module to record the day’s tank mixture.',
        targetScreen: 'home',
        cursorPos: { x: 75, y: 42 },
        tap: true,
        actionDelayMs: 1800,
      },
      {
        title: 'Selecting Wicking Rig Mode',
        narration: 'Toggles between Wicking Rig and Spraying Tank to maintain separate chemical logs.',
        targetScreen: 'chemicals',
        cursorPos: { x: 30, y: 14 },
        tap: true,
        actionDelayMs: 2400,
        badge: 'Wicking Rig Active',
      },
      {
        title: 'Entering Herbicide Quantities',
        narration: 'Logs 45 GAL Glyphosate and 64 oz Surfactant with custom unit pickers.',
        targetScreen: 'chemicals',
        cursorPos: { x: 75, y: 28 },
        tap: true,
        actionDelayMs: 2800,
        badge: 'Mix Ratio Calibrated',
      },
      {
        title: 'Automated Threshold Safety Guard',
        narration: 'Real-time validation warns if herbicide exceeds safe concentration (>100 GAL / >128 oz).',
        targetScreen: 'chemicals',
        cursorPos: { x: 50, y: 40 },
        tap: false,
        actionDelayMs: 3000,
        badge: 'Dosage Guard Active',
      },
      {
        title: 'Saving with Instant Local Sync',
        narration: 'Data is written to persistent local storage and queued for background cloud sync.',
        targetScreen: 'chemicals',
        cursorPos: { x: 50, y: 92 },
        tap: true,
        actionDelayMs: 2500,
        badge: 'Saved & Synced',
      },
    ],
  },
  {
    id: 'wf-equipment',
    title: '3. Equipment Pre-Trip & Canvas Signature',
    shortDesc: 'Complete equipment pre-trip inspection and sign with digital canvas pad',
    iconName: 'Wrench',
    steps: [
      {
        title: 'Opening Equipment Checklist',
        narration: 'The operator accesses pre-trip inspection for the ASV-104 compact track loader.',
        targetScreen: 'home',
        cursorPos: { x: 25, y: 56 },
        tap: true,
        actionDelayMs: 2000,
      },
      {
        title: 'Inspecting Motor & Hydraulic Fluids',
        narration: 'Operator toggles Motor Oil, Coolant, and Hydraulic Oil levels (FULL / LOW).',
        targetScreen: 'checklist',
        cursorPos: { x: 75, y: 40 },
        tap: true,
        actionDelayMs: 2800,
        badge: 'Fluids Verified',
      },
      {
        title: 'Checking Hoses & Fan Belt',
        narration: 'Confirms hydraulic hoses are in GOOD condition and fan belt is TIGHT.',
        targetScreen: 'checklist',
        cursorPos: { x: 70, y: 58 },
        tap: true,
        actionDelayMs: 2600,
        badge: 'Mechanical Pass',
      },
      {
        title: 'Operator Canvas Signature',
        narration: 'Draws legal attestation signature on HTML5 Canvas with smooth stroke capture.',
        targetScreen: 'checklist',
        cursorPos: { x: 50, y: 76 },
        tap: true,
        actionDelayMs: 3200,
        badge: 'Signature Captured',
      },
      {
        title: 'Equipment Cleared for Operation',
        narration: 'The signed inspection is archived and ready for client audit inspection.',
        targetScreen: 'checklist',
        cursorPos: { x: 50, y: 92 },
        tap: true,
        actionDelayMs: 2200,
        badge: 'Pre-Trip Complete',
      },
    ],
  },
  {
    id: 'wf-safety',
    title: '4. Job Safety Analysis & Toolbox Talk',
    shortDesc: 'Review JSA hazard mitigations, hospital emergency route, and conduct crew safety talk',
    iconName: 'ShieldCheck',
    steps: [
      {
        title: 'Opening Job Safety Analysis (JSA)',
        narration: 'Field supervisor reviews site hazard mitigation plan and emergency medical route.',
        targetScreen: 'home',
        cursorPos: { x: 75, y: 68 },
        tap: true,
        actionDelayMs: 2000,
      },
      {
        title: 'Hazard & Control Breakdown',
        narration: 'Reviews high-risk tasks: chemical splashing, torque tube collision clearance, and pinch points.',
        targetScreen: 'job-safety',
        cursorPos: { x: 50, y: 45 },
        tap: false,
        actionDelayMs: 3000,
        badge: 'OSHA Mitigations',
      },
      {
        title: 'Emergency Medical Hospital Routing',
        narration: 'Displays nearest ER (Lancaster General Hospital, 14.8 mi, 22 mins) with GPS coordinates.',
        targetScreen: 'job-safety',
        cursorPos: { x: 50, y: 72 },
        tap: false,
        actionDelayMs: 2800,
        badge: 'ER Route Verified',
      },
      {
        title: 'Toolbox Talk & Crew Attendance',
        narration: 'Opens the Automated External Defibrillator (AED) safety talk and checks off 4 crew members.',
        targetScreen: 'safety',
        cursorPos: { x: 80, y: 35 },
        tap: true,
        actionDelayMs: 3200,
        badge: '100% Crew Sign-Off',
      },
    ],
  },
  {
    id: 'wf-observations',
    title: '5. Geotagged Observations & GIS Map',
    shortDesc: 'Capture field hazard observations with GPS coordinates and view boundary map',
    iconName: 'Eye',
    steps: [
      {
        title: 'Opening Site Observations',
        narration: 'Technicians record environmental hazards, washout ruts, or invasive vegetation.',
        targetScreen: 'home',
        cursorPos: { x: 25, y: 80 },
        tap: true,
        actionDelayMs: 2000,
      },
      {
        title: 'Geotagging Johnson Grass Infestation',
        narration: 'Locks RTK GPS coordinates (39.8934° N, -76.1608° W) and tags scale: Dense, Tall.',
        targetScreen: 'observations',
        cursorPos: { x: 85, y: 4 },
        tap: true,
        actionDelayMs: 2800,
        badge: 'GPS Geotagged',
      },
      {
        title: 'Viewing Project Boundary Map',
        narration: 'Switches to Project Map to inspect KMZ array boundaries and live hazard pins.',
        targetScreen: 'map',
        cursorPos: { x: 50, y: 40 },
        tap: true,
        actionDelayMs: 3200,
        badge: 'GIS Satellite Overlay',
      },
    ],
  },
  {
    id: 'wf-report',
    title: '6. Reviewing & Signing Daily Field Report',
    shortDesc: 'Automated Day/Week/To-Date cumulative progress tables and supervisor sign-off',
    iconName: 'BarChart3',
    steps: [
      {
        title: 'Reviewing Daily Field Summary',
        narration: 'Supervisor opens the generated printable daily report document.',
        targetScreen: 'home',
        cursorPos: { x: 75, y: 80 },
        tap: true,
        actionDelayMs: 2000,
      },
      {
        title: 'Progress Tracking Tables (Day/Week/To-Date)',
        narration: 'System aggregates Day Total (44.5 ac), Week Total (169.1 ac), and To-Date (645.3 ac).',
        targetScreen: 'report-preview',
        cursorPos: { x: 50, y: 35 },
        tap: false,
        actionDelayMs: 3200,
        badge: 'Cumulative Tables',
      },
      {
        title: 'Signing the Daily Field Report',
        narration: 'Supervisor draws their digital signature to legally lock the daily report.',
        targetScreen: 'report-sign',
        cursorPos: { x: 50, y: 55 },
        tap: true,
        actionDelayMs: 3000,
        badge: 'Digital Attestation',
      },
      {
        title: 'Compliance Green Dot Achieved',
        narration: 'The report is sealed and the calendar month automatically marks the date green.',
        targetScreen: 'report-preview',
        cursorPos: { x: 50, y: 15 },
        tap: false,
        actionDelayMs: 2800,
        badge: 'Report Certified',
      },
    ],
  },
];
