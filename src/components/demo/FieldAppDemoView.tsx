'use client';

import React, { useState, useEffect, useMemo } from 'react';
const __spreadValues = (a: any, b: any) => ({ ...a, ...b });
const __spreadProps = (a: any, b: any) => ({ ...a, ...b });

import {
  ArrowLeftRight,
  ArrowRight,
  Asterisk,
  Building2,
  Calendar,
  Camera,
  ChartColumn,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  ClipboardCheck,
  Clock,
  Cloud,
  Crosshair,
  Download,
  Droplets,
  Ellipsis,
  Eye,
  FileText,
  FlaskConical,
  Gauge,
  House,
  Image,
  Info,
  Lock,
  Map,
  Pause,
  Pencil,
  Play,
  Plus,
  RotateCcw,
  Shield,
  SkipBack,
  SkipForward,
  Smartphone,
  Sparkles,
  Sprout,
  SquarePen,
  Trash2,
  TriangleAlert,
  UserPlus,
  Users,
  Wifi,
  Wrench
} from 'lucide-react';

export const INITIAL_FIELD_NOTES = [
        {
          id: 1,
          tag: "EQUIPMENT",
          tagStyle: "bg-[#362815] text-[#F59E0B]",
          time: "9:21 AM",
          text: "Equipment maintenance completed."
        },
        {
          id: 2,
          tag: "PROGRESS",
          tagStyle: "bg-[#361D17] text-[#EF4823]",
          time: "9:21 AM",
          text: "Wicking and spraying done in panel blocks A, B, C."
        },
        {
          id: 3,
          tag: "WILDLIFE",
          tagStyle: "bg-[#361D17] text-[#EF4823]",
          time: "9:21 AM",
          text: "Alligator still onsite in pond by Panel Blocks A, B, C."
        },
        {
          id: 4,
          tag: "CHEMICAL",
          tagStyle: "bg-[#361D17] text-[#EF4823]",
          time: "9:20 AM",
          text: "Chemical inventory completed."
        },
        {
          id: 5,
          tag: "WEATHER",
          tagStyle: "bg-[#152836] text-[#38BDF8]",
          time: "9:20 AM",
          text: "No weather on radar."
        },
        {
          id: 6,
          tag: "ON SITE/OFF SITE",
          tagStyle: "bg-[#361D17] text-[#EF4823]",
          time: "9:19 AM",
          text: "Wicking and spraying crew onsite."
        }
      ];
      export const INITIAL_SURVEY_QUESTIONS = [
        {
          id: 1,
          question: "Any accidents or near-misses today?",
          answer: "No"
        },
        {
          id: 2,
          question: "Any equipment malfunctions today?",
          answer: "No"
        },
        {
          id: 3,
          question: "Any visitors on site today? (client personnel, fire watch, maintenance, etc..)",
          answer: "No"
        },
        {
          id: 4,
          question: "Any safety concerns or hazards observed today?",
          answer: "No"
        },
        {
          id: 5,
          question: "Were all PPE requirements properly followed?",
          answer: "Yes"
        }
      ];
      export const ATTACHMENT_TAGS = [
        "Wildlife",
        "Cogon Grass",
        "Dogfennel",
        "Hazard",
        "Damage",
        "Flowers",
        "Progress",
        "Site Inspection",
        "Equipment",
        "Weather",
        "Chemicals",
        "Laydown Area",
        "Safety"
      ];
      

export const SCREEN_EXPLANATIONS: Record<string, {
  badge: string;
  title: string;
  summary: string;
  howItWorks: string;
  telemetry: string;
  benefit: string;
}> = {
  home: {
    badge: 'STAGE 01 · SITE DISPATCH',
    title: 'Daily Field Hub',
    summary: 'Central mission dashboard for crew members arriving on-site.',
    howItWorks: 'The crew member verifies the active project (Gator Solar Site) and checks the 7-day horizontal strip. Tapping any tile opens the specialized field form for that task.',
    telemetry: 'GPS location lock, site name, date/time, and real-time completion status for all 12 modules.',
    benefit: 'Eliminates paper checklists and lost clipboards before work begins.'
  },
  calendar: {
    badge: 'STAGE 02 · COMPLIANCE CALENDAR',
    title: 'Compliance Calendar',
    summary: 'Month-wide compliance audit visibility for inspectors and crew members.',
    howItWorks: 'Crew members and supervisors open the dynamic calendar modal to review compliance history for the selected month. Days are color-coded: Green (Signed & Audited), Yellow (Pending Sign-off), Red (No data logged). Use arrow controls to navigate across any month.',
    telemetry: 'Historical day records, electronic signatures on file, and day-by-day status aggregates.',
    benefit: 'Instant audit readiness for surprise EPA, OSHA, or client inspections.'
  },
  jsa: {
    badge: 'STAGE 03 · SAFETY BRIEFING',
    title: 'Job Safety Analysis (JSA)',
    summary: 'Mandatory safety briefing before any machine operates.',
    howItWorks: 'The crew reviews work objectives (Wicking, Spraying) and identifies site-specific hazards, including an active alligator in Retention Pond A. Mitigations, emergency signals (3 horn blasts), and hospital routing are locked in.',
    telemetry: 'Work zones (Blocks A, B, C), hazard severity (High), 100ft buffer zone mitigation rules, and nearest hospital (Lake Butler Hospital, ~9.6 mi).',
    benefit: 'Complete safety compliance, legally protecting the contractor and crew.'
  },
  signatures: {
    badge: 'STAGE 04 · ATTENDANCE',
    title: 'Digital Crew Signatures',
    summary: 'Hardware-accelerated touch sign-off for all briefing attendees.',
    howItWorks: 'The crew member passes the device to each attendee (Marcus Vance, Dave Rodriguez, Test Employee) to electronically sign their attendance on the interactive touchscreen canvas.',
    telemetry: 'Vector signature strokes, crew member license IDs, and cryptographic timestamps.',
    benefit: 'Verifiable proof of safety briefing attendance without paper clipboards.'
  },
  metrics: {
    badge: 'STAGE 05 · ACREAGE LOG',
    title: 'Daily Metrics & Treated Acres',
    summary: 'Precision acreage and water consumption telemetry.',
    howItWorks: 'Operators enter wicking array acres (40 ac), green space acreage (10 ac), total water gallons (200 Gal), and active equipment operators. Totals update live.',
    telemetry: 'Array acreage, perimeter acreage, carrier water volume, equipment operator count, and running cumulative totals.',
    benefit: 'Accurate billing and milestone tracking for solar asset owners.'
  },
  notes: {
    badge: 'STAGE 06 · FIELD LOGS',
    title: 'Categorized Field Notes',
    summary: 'Real-time, cloud-synced field observations and incident logs.',
    howItWorks: 'Workers log tagged notes throughout the day: Equipment maintenance, weather radar checks, chemical mix completion, and wildlife sightings (Alligator in Block A pond).',
    telemetry: 'Categorized tags (Equipment, Progress, Wildlife, Chemical, Weather, On-Site), timestamps, and rich notes.',
    benefit: 'Creates a searchable, legal operational timeline of the job site.'
  },
  chemicals: {
    badge: 'STAGE 07 · EPA COMPLIANCE',
    title: 'Spraying & Wicking Chemicals',
    summary: 'Herbicide batch tracking with automated threshold enforcement.',
    howItWorks: 'Applicators log herbicide quantities by mode (Spraying vs. Wicking). Supported chemicals include Glyphosate 4 Plus, Surfactant, Super Dye, and 2,4-D Amine. Threshold warnings trigger if limits are exceeded.',
    telemetry: 'Chemical brand, EPA registration #, active ingredient, dosage units (GAL/oz), and threshold limits.',
    benefit: 'Prevents toxic over-application and EPA Part 763 non-compliance fines.'
  },
  survey: {
    badge: 'STAGE 08 · COMPLIANCE SURVEY',
    title: 'Site Compliance Survey',
    summary: 'Mandatory end-of-day safety questionnaire.',
    howItWorks: 'Before closing out the day, the crew answers standardized compliance questions: any accidents, near-misses, equipment breakdowns, unauthorized visitors, or PPE violations.',
    telemetry: 'Standardized compliance answers (No/Yes/N/A) with mandatory detail explanations for affirmative responses.',
    benefit: 'Proves zero safety or environmental incidents occurred during the shift.'
  },
  checklist: {
    badge: 'STAGE 09 · FLEET HEALTH',
    title: 'Equipment Inspection',
    summary: 'Heavy machinery fluid checks & equipment inspection logs.',
    howItWorks: 'Operators inspect the ASV Skid Steer or tractor: verify machine hours (123 hrs), check engine oil (FULL), coolant (FULL), tracks/tires, and sign the inspection record.',
    telemetry: 'Machine number, last 4 VIN, machine brand, operating hours, oil/coolant levels, and digital operator signature.',
    benefit: 'Prevents expensive field breakdowns and meets equipment inspection mandates.'
  },
  attachments: {
    badge: 'STAGE 10 · PHOTO ATTACHMENTS',
    title: 'Photo Attachments',
    summary: 'Geotagged photos of site and field conditions.',
    howItWorks: 'Crews photograph invasive cogon grass patches, wildlife burrows, or equipment setups, tagging each image with one of 13 standardized tags.',
    telemetry: 'High-resolution photos, RTK GPS coordinates, timestamp watermark, and compliance category tags.',
    benefit: 'Indisputable photographic records sent directly to asset owners.'
  },
  "sign-report": {
    badge: 'STAGE 11 · PROJECT INFO & SIGN-OFF',
    title: 'Project Info & Field Sign-Off',
    summary: 'Project specifications, compliance attestation, and digital signature sealing the daily report.',
    howItWorks: 'The supervisor reviews site and project info (Gator Solar Site, job #, supervisor attestation) and electronically signs the report on the touch canvas.',
    telemetry: 'Project details, supervisor name, pesticide applicator license #, vector signature drawing, and sign-off timestamp.',
    benefit: 'Binds the project records with a legal electronic signature, locking the daily report.'
  },
  "daily-report-pdf": {
    badge: 'STAGE 12 · AUDIT-READY PDF',
    title: 'Signed Daily Report PDF',
    summary: 'Compiled 5-page PDF document ready for client delivery.',
    howItWorks: 'Utility Vision compiles shift data including weather readings, wicking acres, chemical quantities, JSA signatures, and equipment audits into a sealed PDF.',
    telemetry: 'Multi-page printable vector layout with company branding (WICK\'D Environmental), job #, and supervisor attestation.',
    benefit: 'Sent to the utility client within seconds of sign-off. Instant invoice approval.'
  }
};

export function FieldAppDemoView({ navigateTo }: { navigateTo?: (page: string) => void }) {
  const [mobileScreen, setMobileScreen] = useState("home");
  const phoneScreenRef = React.useRef<HTMLDivElement>(null);
        
  const [isAutoTour, setIsAutoTour] = useState(false);
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const screensOrder = [
    'home', 'calendar', 'jsa', 'signatures', 'metrics', 'notes',
    'chemicals', 'survey', 'checklist', 'attachments', 'sign-report', 'daily-report-pdf'
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const s = params.get("screen");
      if (s && screensOrder.includes(s)) {
        setMobileScreen(s);
      }
    }
  }, []);

  const SCREEN_LOADING_MESSAGES: Record<string, string> = {
    home: "Opening Daily Field Hub...",
    calendar: "Loading Compliance Calendar...",
    jsa: "Opening Job Safety Brief...",
    signatures: "Loading Attendance Signatures...",
    metrics: "Syncing Daily Acreage...",
    notes: "Retrieving Field Notes...",
    chemicals: "Verifying Chemical Limits...",
    survey: "Opening Site Survey...",
    checklist: "Loading Equipment Inspection...",
    attachments: "Loading Photo Attachments...",
    "sign-report": "Opening Project Info & Attestation...",
    "daily-report-pdf": "Compiling Daily PDF..."
  };

  const navigateWithTransition = (nextScreen: string, message?: string) => {
    const msg = message || SCREEN_LOADING_MESSAGES[nextScreen] || "Loading...";
    setIsLoadingScreen(true);
    setLoadingMessage(msg);
    if (nextScreen === "signatures") setShowSigModal(true);
    const delay = nextScreen === "daily-report-pdf" ? 520 : 300;
    setTimeout(() => {
      setMobileScreen(nextScreen);
      setIsLoadingScreen(false);
    }, delay);
  };

  const handlePhoneClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneScreenRef.current) return;
    const rect = phoneScreenRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-1), { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 240);
  };

  useEffect(() => {
    if (!isAutoTour) return;

    const tourTimer = setTimeout(() => {
      const idx = screensOrder.indexOf(mobileScreen);
      const nextIdx = (idx + 1) % screensOrder.length;
      const nextScreen = screensOrder[nextIdx];
      navigateWithTransition(nextScreen, SCREEN_LOADING_MESSAGES[nextScreen]);
    }, 4200);

    return () => clearTimeout(tourTimer);
  }, [isAutoTour, mobileScreen]);

  const goToNextScreen = () => {
    const idx = screensOrder.indexOf(mobileScreen);
    const nextIdx = (idx + 1) % screensOrder.length;
    const nextScreen = screensOrder[nextIdx];
    navigateWithTransition(nextScreen, SCREEN_LOADING_MESSAGES[nextScreen]);
  };

  const goToPrevScreen = () => {
    const idx = screensOrder.indexOf(mobileScreen);
    const prevIdx = (idx - 1 + screensOrder.length) % screensOrder.length;
    const prevScreen = screensOrder[prevIdx];
    navigateWithTransition(prevScreen, SCREEN_LOADING_MESSAGES[prevScreen]);
  };

  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [calendarViewDate, setCalendarViewDate] = useState<Date>(() => new Date());

  const dynamicMonthYear = calendarViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const dynamicShortDate = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const dynamicWeekdayShort = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
  const dynamicReportingFor = currentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const dynamicLongDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const dynamicSlashDate = currentDate.toLocaleDateString('en-US', { weekday: 'short', month: '2-digit', day: '2-digit', year: 'numeric' });
  const dynamicPdfDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

  const weekDays = useMemo(() => {
    const dayOfWeek = currentDate.getDay();
    const sunday = new Date(currentDate);
    sunday.setDate(currentDate.getDate() - dayOfWeek);
    const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      const isSelected = d.toDateString() === currentDate.toDateString();
      const isWeekend = i === 0 || i === 6;
      const isPastOrToday = d <= new Date();
      const dot = isSelected ? "green" : isWeekend ? "none" : (isPastOrToday ? "green" : "red");
      return {
        day: dayLabels[i],
        num: d.getDate().toString(),
        dot,
        active: isSelected,
        fullDate: d
      };
    });
  }, [currentDate]);

  const calendarMonthData = useMemo(() => {
    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const blanks = Array.from({ length: firstDayIndex });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const dayNum = i + 1;
      const dateObj = new Date(year, month, dayNum);
      dateObj.setHours(0, 0, 0, 0);
      const isSelected = dateObj.getTime() === new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();
      const dayOfWeek = dateObj.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let dot = "none";
      if (!isWeekend) {
        if (isSelected || dateObj.getTime() <= today.getTime()) {
          dot = (dayNum % 4 === 0) ? "yellow" : "green";
        } else {
          dot = "red";
        }
      }
      return {
        d: dayNum,
        dot,
        selected: isSelected,
        fullDate: dateObj
      };
    });

    return { blanks, days };
  }, [calendarViewDate, currentDate]);

  const baseExplanation = SCREEN_EXPLANATIONS[mobileScreen] || SCREEN_EXPLANATIONS.home;
  const currentExplanation = mobileScreen === 'calendar'
    ? { ...baseExplanation, title: `${dynamicMonthYear} Compliance Calendar` }
    : baseExplanation;
  const currentStepNumber = screensOrder.indexOf(mobileScreen) + 1;

  const [jsaDate, setJsaDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [jsaTime, setJsaTime] = useState("9:24 AM");
  const [jsaGps, setJsaGps] = useState("29.8843\xB0 N, 82.3146\xB0 W");
  const [selectedObjectives, setSelectedObjectives] = useState(["Wicking", "Spraying"]);
  const [specificAreas, setSpecificAreas] = useState("Blocks A, B, C");
  const [successLookBack, setSuccessLookBack] = useState(
    "Wicking completed. No accidents or equipment malfunctions. No weather delays."
  );
  const [hazardName, setHazardName] = useState("Alligator");
  const [hazardRisk, setHazardRisk] = useState("High");
  const [hazardMitigation, setHazardMitigation] = useState(
    "Stay away from pond that alligator is located. If in this area, be aware of surroundings and use caution."
  );
  const [firstAidLoc, setFirstAidLoc] = useState("");
  const [nearestHospital, setNearestHospital] = useState("Lake Butler Hospital (~9.6 mi)");
  const [emergencySignal, setEmergencySignal] = useState("");
  const [huddleChecked, setHuddleChecked] = useState(true);
  const [theOneThing, setTheOneThing] = useState("");
  const [emp3Signed, setEmp3Signed] = useState(false);
  const [showSigModal, setShowSigModal] = useState(true);
  const [sigCleared, setSigCleared] = useState(false);
  const [editingMetrics, setEditingMetrics] = useState(false);
  const [wickingArrayVal, setWickingArrayVal] = useState(40);
  const [wickingGreenVal, setWickingGreenVal] = useState(10);
  const [waterUsageVal, setWaterUsageVal] = useState(200);
  const [operatorsVal, setOperatorsVal] = useState(4);
  const [fieldNotes, setFieldNotes] = useState(INITIAL_FIELD_NOTES);
  const [newNoteText, setNewNoteText] = useState("");
  const [showNewNoteInput, setShowNewNoteInput] = useState(false);
  const [chemMode, setChemMode] = useState("Spraying");
  const [chemValues, setChemValues] = useState([
    { name: "Glyphosate", amount: "5", unit: "GAL" },
    { name: "Surfactant", amount: "4", unit: "oz" },
    { name: "Super Dye", amount: "3", unit: "oz" },
    { name: "Ecomazapyr 2SL", amount: "1", unit: "GAL" },
    { name: "2,4-D", amount: "2", unit: "GAL" },
    { name: "Regular Dye", amount: "1", unit: "oz" }
  ]);
  const [surveyQuestions, setSurveyQuestions] = useState(INITIAL_SURVEY_QUESTIONS);
  const [machineNum, setMachineNum] = useState("");
  const [machineType, setMachineType] = useState("");
  const [last4Vin, setLast4Vin] = useState("");
  const [machineBrand, setMachineBrand] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const [machineHours, setMachineHours] = useState("");
  const [motorOil, setMotorOil] = useState("FULL");
  const [coolant, setCoolant] = useState("FULL");
  const [hydraulicOil, setHydraulicOil] = useState("FULL");
  const [selectedAttachmentTags, setSelectedAttachmentTags] = useState(["Flowers"]);
  const [attachmentNote, setAttachmentNote] = useState("");
  const [attachmentCount, setAttachmentCount] = useState(0);
  const [preparedBy, setPreparedBy] = useState("Test Employee");
  const [reportSignatureDrawn, setReportSignatureDrawn] = useState(false);
  const toggleAttachmentTag = (tag: string) => {
    setSelectedAttachmentTags(
      (prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const toggleObjective = (obj: string) => {
    setSelectedObjectives(
      (prev) => prev.includes(obj) ? prev.filter((item) => item !== obj) : [...prev, obj]
    );
  };
  const handleSurveySelect = (qId: number, ans: string) => {
    setSurveyQuestions(
      (prev) => prev.map((q) => q.id === qId ? __spreadProps(__spreadValues({}, q), { answer: ans }) : q)
    );
  };
  const handleAddNote = (e: any) => {
    e.preventDefault();
    if (!newNoteText.trim())
      return;
    setFieldNotes([
      {
        id: Date.now(),
        tag: "PROGRESS",
        tagStyle: "bg-[#361D17] text-[#EF4823]",
        time: "9:25 AM",
        text: newNoteText.trim()
      },
      ...fieldNotes
    ]);
    setNewNoteText("");
    setShowNewNoteInput(false);
  };
  const screenMeta = {
    home: { time: "09:35", battery: "65", title: "Daily Logs", sub: "Gator Solar Site" },
    calendar: { time: "09:35", battery: "65", title: "Daily Logs", sub: dynamicMonthYear },
    jsa: { time: "08:44", battery: "70", title: "Job Safety", sub: "Job Safety Analysis" },
    signatures: { time: "08:48", battery: "69", title: "Digital Signatures", sub: "Job Safety" },
    metrics: { time: "09:22", battery: "67", title: "Daily Metrics", sub: dynamicShortDate },
    notes: { time: "09:21", battery: "67", title: "Notes", sub: `Gator Solar Site \u2022 ${dynamicWeekdayShort}, ${dynamicShortDate}` },
    chemicals: { time: "09:22", battery: "67", title: "Chemicals", sub: dynamicShortDate },
    survey: { time: "09:23", battery: "66", title: "Site Survey", sub: "All questions answered" },
    checklist: { time: "09:23", battery: "66", title: "Equipment Inspection", sub: `Gator Solar Site \u2022 ${dynamicWeekdayShort}, ${dynamicShortDate}` },
    attachments: { time: "09:24", battery: "66", title: "Photo Attachments", sub: dynamicShortDate },
    "sign-report": { time: "09:33", battery: "65", title: "Project Info", sub: "Attestation & Sign-Off" },
    "daily-report-pdf": { time: "09:33", battery: "65", title: "Daily Report", sub: "" }
  }[mobileScreen] || { time: '09:35', battery: '65', title: 'Daily Logs', sub: 'Gator Solar Site' };
        return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-[#0A0D14] text-white py-6 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center w-full max-w-6xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-5 space-y-5" },
  /* Tour & Controls Card */
  /* @__PURE__ */ React.createElement("div", { className: "bg-[#0F172A] text-white rounded-2xl p-5 border border-slate-800 shadow-md space-y-4" },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" },
        /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-300" }, "Interactive Walkthrough Mode")
      ),
      /* @__PURE__ */ React.createElement("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#EF4823]/20 text-[#EF4823] border border-[#EF4823]/40" },
        "Screen " + currentStepNumber + " of 12"
      )
    ),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" },
      /* @__PURE__ */ React.createElement("button", {
        type: "button",
        onClick: () => setIsAutoTour(!isAutoTour),
        className: isAutoTour
          ? "flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer bg-amber-500 text-black hover:bg-amber-400"
          : "flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer bg-[#EF4823] text-white hover:bg-[#d93d1a]"
      },
        isAutoTour ? /* @__PURE__ */ React.createElement(Pause, { className: "w-4 h-4 fill-black" }) : /* @__PURE__ */ React.createElement(Play, { className: "w-4 h-4 fill-white" }),
        /* @__PURE__ */ React.createElement("span", null, isAutoTour ? "Pause Auto Tour" : "Play Auto Tour")
      ),
      /* @__PURE__ */ React.createElement("button", {
        type: "button",
        onClick: goToPrevScreen,
        title: "Previous Screen",
        className: "p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
      }, /* @__PURE__ */ React.createElement(SkipBack, { className: "w-4 h-4" })),
      /* @__PURE__ */ React.createElement("button", {
        type: "button",
        onClick: goToNextScreen,
        title: "Next Screen",
        className: "p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
      }, /* @__PURE__ */ React.createElement(SkipForward, { className: "w-4 h-4" }))
    ),
    /* Sleek 12-screen step pills */
    /* @__PURE__ */ React.createElement("div", { className: "pt-3 border-t border-slate-800 space-y-1.5" },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-slate-400 font-semibold" },
        /* @__PURE__ */ React.createElement("span", null, "Quick Screen Select:"),
        /* @__PURE__ */ React.createElement("span", { className: "text-[#EF4823] font-bold" }, currentExplanation.title)
      ),
      /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-6 sm:grid-cols-12 gap-1" },
        screensOrder.map((s, idx) => React.createElement("button", {
          key: s,
          type: "button",
          onClick: () => {
            setMobileScreen(s);
            if (s === "signatures") setShowSigModal(true);
          },
          title: (idx + 1) + ". " + (s === 'calendar' ? `${dynamicMonthYear} Compliance Calendar` : SCREEN_EXPLANATIONS[s].title),
          className: mobileScreen === s
            ? "py-1 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer bg-[#EF4823] text-white shadow-sm ring-2 ring-[#EF4823]/50 scale-105 font-black"
            : "py-1 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
        }, idx + 1))
      )
    )

  ),

  /* Active Screen How It Works Card (Refined Dark Slate & Obsidian Styling) */
  /* @__PURE__ */ React.createElement("div", { className: "bg-[#0F172A] rounded-2xl border border-slate-800 p-5 shadow-xl space-y-3.5 relative overflow-hidden" },
    /* Subtle glowing top accent */
    /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EF4823] via-orange-500/50 to-transparent" }),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" },
      /* @__PURE__ */ React.createElement("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#EF4823]/20 text-[#EF4823] border border-[#EF4823]/40 tracking-wider" },
        currentExplanation.badge
      ),
      /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-semibold text-slate-400 uppercase tracking-wider" },
        "Active Screen Guide"
      )
    ),
    /* @__PURE__ */ React.createElement("h4", { className: "text-lg font-extrabold text-white leading-snug tracking-tight" },
      currentExplanation.title
    ),
    /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-300 font-medium leading-relaxed" },
      currentExplanation.summary
    ),
    /* @__PURE__ */ React.createElement("div", { className: "p-3.5 rounded-xl bg-[#090D16] border border-slate-800/90 text-xs space-y-3" },
      /* @__PURE__ */ React.createElement("div", null,
        /* @__PURE__ */ React.createElement("strong", { className: "block text-[11px] font-bold uppercase tracking-wider text-[#EF4823]" }, "How It Works in the Field:"),
        /* @__PURE__ */ React.createElement("p", { className: "text-slate-300 text-xs mt-0.5 leading-relaxed" }, currentExplanation.howItWorks)
      ),
      /* @__PURE__ */ React.createElement("div", null,
        /* @__PURE__ */ React.createElement("strong", { className: "block text-[11px] font-bold uppercase tracking-wider text-sky-400" }, "Field Data Captured:"),
        /* @__PURE__ */ React.createElement("p", { className: "text-slate-300 text-xs mt-0.5 leading-relaxed font-mono text-[11px]" }, currentExplanation.telemetry)
      ),
      /* @__PURE__ */ React.createElement("div", { className: "pt-2.5 border-t border-slate-800/80 bg-emerald-950/20 -mx-3.5 -mb-3.5 p-3 rounded-b-xl border-t border-emerald-900/30" },
        /* @__PURE__ */ React.createElement("strong", { className: "block text-[11px] font-bold uppercase tracking-wider text-emerald-400" }, "Business & Audit Value:"),
        /* @__PURE__ */ React.createElement("p", { className: "text-emerald-200/90 text-xs mt-0.5 leading-relaxed font-medium" }, currentExplanation.benefit)
      )
    )
  )),

  /* Right column: Exact iPhone 16 Pro mockup */
  /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-7 flex justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-[410px] bg-[#09090B] rounded-[50px] p-3 shadow-2xl border-[5px] border-slate-800 relative select-none" }, /* @__PURE__ */ React.createElement("div", { ref: phoneScreenRef, onClick: handlePhoneClick, className: "bg-[#121214] text-white rounded-[40px] overflow-hidden h-[780px] flex flex-col justify-between relative border border-white/5 cursor-pointer" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#161618] px-6 pt-3 pb-2 flex items-center justify-between text-xs font-bold select-none shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-[14px] font-semibold tracking-tight text-white" }, screenMeta.time)), /* @__PURE__ */ isLoadingScreen
            ? React.createElement("div", { className: "w-28 h-4 bg-black rounded-full flex items-center justify-center gap-1.5 px-2 transition-all duration-300 ring-1 ring-[#EF4823]/60 shadow-[0_0_8px_rgba(239,72,35,0.4)]" },
                React.createElement("div", { className: "w-1.5 h-1.5 rounded-full bg-[#EF4823] animate-ping shrink-0" }),
                React.createElement("span", { className: "text-[7.5px] text-zinc-300 font-mono tracking-tight animate-pulse truncate" }, loadingMessage.slice(0, 14))
              )
            : React.createElement("div", { className: "w-20 h-4 bg-black rounded-full transition-all duration-300" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-end gap-[2px] h-[11px] px-0.5", title: "Cellular Signal" }, /* @__PURE__ */ React.createElement("span", { className: "w-[3px] h-[3.5px] bg-white rounded-[1px]" }), /* @__PURE__ */ React.createElement("span", { className: "w-[3px] h-[6px] bg-white rounded-[1px]" }), /* @__PURE__ */ React.createElement("span", { className: "w-[3px] h-[8.5px] bg-white rounded-[1px]" }), /* @__PURE__ */ React.createElement("span", { className: "w-[3px] h-[11px] bg-white/35 rounded-[1px]" })), /* @__PURE__ */ React.createElement(Wifi, { className: "w-4 h-4 text-white stroke-[2.75]" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 pl-0.5", title: screenMeta.battery + "% Battery" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold text-white tracking-tight leading-none" }, screenMeta.battery), /* @__PURE__ */ React.createElement("div", { className: "w-[22px] h-[11px] rounded-[4px] border-[1.5px] border-white/90 p-[1.5px] flex items-center relative" }, /* @__PURE__ */ React.createElement("div", { className: "h-full bg-white rounded-[2px]", style: { width: `${screenMeta.battery}%` } }), /* @__PURE__ */ React.createElement("div", { className: "w-[1.5px] h-[4px] bg-white/90 rounded-r-xs absolute -right-[3px] top-[2px]" }))))), mobileScreen !== "home" && mobileScreen !== "calendar" && /* @__PURE__ */ React.createElement("div", { className: "bg-[#161618] px-4 py-2.5 border-b border-zinc-800/90 flex items-center justify-between shrink-0" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => {
              if (mobileScreen === "signatures")
                navigateWithTransition("jsa", "Returning to JSA...");
              else if (mobileScreen === "daily-report-pdf")
                navigateWithTransition("sign-report", "Returning to Sign...");
              else
                navigateWithTransition("home", "Returning Home...");
            },
            className: "flex items-center gap-0.5 text-[#0A84FF] text-sm font-medium cursor-pointer w-16 active:scale-95 transition-transform"
          },
      /* @__PURE__ */ React.createElement(ChevronLeft, { className: "w-5 h-5 -ml-1" }),
      /* @__PURE__ */ React.createElement("span", null, "Back")
        ), /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm font-bold text-white leading-tight" }, screenMeta.title), screenMeta.sub && /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-zinc-400 mt-0.5" }, screenMeta.sub)), /* @__PURE__ */ React.createElement("div", { className: "w-24 flex justify-end items-center gap-1.5" }, mobileScreen === "signatures" && /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setMobileScreen("home"),
            className: "px-3 py-1 rounded-full bg-[#3A211B] text-[#EF4823] text-xs font-bold cursor-pointer"
          },
          "Done"
        ), mobileScreen === "survey" && /* @__PURE__ */ React.createElement(
          "button",
          {
            className: "px-2.5 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer",
            style: { backgroundColor: "#EF4823" }
          },
      /* @__PURE__ */ React.createElement(Pencil, { className: "w-3 h-3" }),
      /* @__PURE__ */ React.createElement("span", null, "Edit")
        ), mobileScreen === "daily-report-pdf" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
          "button",
          {
            className: "w-7 h-7 rounded-lg flex items-center justify-center text-white cursor-pointer",
            style: { backgroundColor: "#EF4823" },
            title: "Download PDF"
          },
      /* @__PURE__ */ React.createElement(Download, { className: "w-3.5 h-3.5" })
        ), /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded-full bg-[#132A1F] border border-[#22C55E]/50 text-[#22C55E] text-[10px] font-bold flex items-center gap-1" }, /* @__PURE__ */ React.createElement(CircleCheck, { className: "w-3 h-3" }), "Signed")))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto px-3.5 py-3.5 space-y-4 relative " + (isLoadingScreen ? "opacity-60 transition-opacity duration-200" : "opacity-100 transition-opacity duration-200") },
      /* Loading Overlay Animation */
      isLoadingScreen && React.createElement("div", { className: "absolute inset-0 z-40 bg-[#121214]/75 backdrop-blur-xs flex flex-col items-center justify-center gap-2.5 pointer-events-none animate-in fade-in duration-200" },
        React.createElement("div", { className: "w-8 h-8 rounded-full border-2 border-zinc-700 border-t-[#EF4823] animate-spin shadow-lg" }),
        React.createElement("span", { className: "text-[10px] font-bold text-zinc-200 tracking-wide bg-zinc-900/90 px-3 py-1 rounded-full border border-zinc-700/60 shadow-lg" }, loadingMessage)
      ), (mobileScreen === "home" || mobileScreen === "calendar") && /* @__PURE__ */ React.createElement("div", { className: "space-y-3.5 pb-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase tracking-widest text-zinc-400" }, "CURRENT PROJECT"), /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "w-full px-4 py-3 rounded-2xl text-white font-bold text-sm flex items-center justify-between shadow-md",
            style: { backgroundColor: "#EF4823" }
          },
      /* @__PURE__ */ React.createElement("span", null, "Gator Solar Site"),
      /* @__PURE__ */ React.createElement(ChevronDown, { className: "w-4 h-4 text-white" })
        )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pt-1" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-lg font-extrabold text-white leading-tight" }, "Daily Logs"), /* @__PURE__ */ React.createElement("div", { className: "text-xs font-semibold text-[#EF4823]" }, "Reporting for: " + dynamicReportingFor)), /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            onClick: () => {
              setCalendarViewDate(new Date(currentDate));
              setMobileScreen(mobileScreen === "calendar" ? "home" : "calendar");
            },
            className: "w-10 h-10 rounded-xl bg-[#222226] border border-zinc-700/80 flex items-center justify-center text-[#EF4823] cursor-pointer hover:border-zinc-500 active:scale-95 transition-all",
            title: "Open Compliance Calendar"
          },
      /* @__PURE__ */ React.createElement(Calendar, { className: "w-4 h-4" })
        )), /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "w-full rounded-2xl bg-[#222226] border border-zinc-800 p-3 grid grid-cols-7 text-center select-none"
          },
          weekDays.map((d, i) => /* @__PURE__ */ React.createElement(
            "button",
            {
              key: i,
              type: "button",
              onClick: (e: any) => {
                e.stopPropagation();
                setCurrentDate(d.fullDate);
              },
              className: "flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-80 active:scale-95 transition-all"
            },
            /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-semibold text-zinc-400" }, d.day),
            /* @__PURE__ */ React.createElement(
              "span",
              {
                className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold ${d.active ? "bg-[#0A84FF] text-white shadow-sm ring-2 ring-[#0A84FF]/40" : "text-white hover:bg-zinc-700/40"}`
              },
              d.num
            ),
            /* @__PURE__ */ React.createElement(
              "span",
              {
                className: `w-1.5 h-1.5 rounded-full ${d.dot === "green" ? "bg-[#22C55E]" : d.dot === "red" ? "bg-[#EF4823]" : "bg-transparent"}`
              }
            )
          ))
        ), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3 pt-1" }, [
          { label: "Notes", target: "notes", icon: FileText },
          { label: "Chemicals", target: "chemicals", icon: FlaskConical },
          { label: "Metrics", target: "metrics", icon: Gauge },
          { label: "Survey", target: "survey", icon: ClipboardCheck },
          { label: "Equipment", target: "checklist", icon: Wrench },
          { label: "Photos", target: "attachments", icon: Camera },
          { label: "Incidents", target: "sign-report", icon: TriangleAlert },
          { label: "Job Safety", target: "jsa", icon: Shield },
          { label: "Observations", target: "notes", icon: Eye },
          { label: "Map", target: "daily-report-pdf", icon: Map },
          { label: "Reports", target: "daily-report-pdf", icon: ChartColumn },
          { label: "Project Info", target: "sign-report", icon: Info }
        ].map((tile) => {
          const IconComp = tile.icon;
          return /* @__PURE__ */ React.createElement(
            "button",
            {
              key: tile.label,
              onClick: () => navigateWithTransition(tile.target, "Opening " + tile.label + "..."),
              className: "flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-all duration-100"
            },
        /* @__PURE__ */ React.createElement("div", { className: "w-full aspect-square rounded-2xl bg-[#222226] border border-zinc-800/80 hover:bg-[#2A2A2E] hover:border-zinc-700/80 active:bg-[#323238] flex items-center justify-center transition-all shadow-sm" }, /* @__PURE__ */ React.createElement(
              IconComp,
              {
                className: "w-7 h-7",
                style: { color: "#EF4823" }
              }
            )),
        /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold text-white" }, tile.label)
          );
        })), mobileScreen === "calendar" && /* @__PURE__ */ React.createElement("div", {
          onClick: (e: any) => {
            if (e.target === e.currentTarget) setMobileScreen("home");
          },
          className: "absolute inset-0 z-30 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-150"
        }, /* @__PURE__ */ React.createElement("div", { className: "w-full rounded-3xl bg-[#252529] border border-zinc-700 p-4 space-y-4 shadow-2xl" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-extrabold text-white" }, dynamicMonthYear), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("button", {
          type: "button",
          onClick: (e: any) => {
            e.stopPropagation();
            setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1));
          },
          className: "w-7 h-7 rounded-lg bg-[#1A1A1E] hover:bg-zinc-700 flex items-center justify-center text-white cursor-pointer transition-colors",
          title: "Previous Month"
        }, /* @__PURE__ */ React.createElement(ChevronLeft, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement("button", {
          type: "button",
          onClick: (e: any) => {
            e.stopPropagation();
            setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1));
          },
          className: "w-7 h-7 rounded-lg bg-[#1A1A1E] hover:bg-zinc-700 flex items-center justify-center text-white cursor-pointer transition-colors",
          title: "Next Month"
        }, /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement("button", {
          type: "button",
          onClick: (e: any) => {
            e.stopPropagation();
            setMobileScreen("home");
          },
          className: "ml-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-bold cursor-pointer transition-colors"
        }, "Close"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-7 text-center text-[11px] font-semibold text-zinc-400" }, ["S", "M", "T", "W", "T", "F", "S"].map((d, i) => /* @__PURE__ */ React.createElement("span", { key: i }, d))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-7 gap-y-2 text-center text-xs font-bold" }, calendarMonthData.blanks.map((_, i) => /* @__PURE__ */ React.createElement("div", { key: `b-${i}` })), calendarMonthData.days.map((item) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key: item.d,
            type: "button",
            onClick: (e: any) => {
              e.stopPropagation();
              setCurrentDate(item.fullDate);
              setMobileScreen("home");
            },
            className: `py-1 rounded-xl flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all ${item.selected ? "bg-[#0A84FF] text-white shadow-sm ring-2 ring-[#0A84FF]/50" : "text-white hover:bg-zinc-700/50"}`
          },
      /* @__PURE__ */ React.createElement("span", null, item.d),
      /* @__PURE__ */ React.createElement(
            "span",
            {
              className: `w-1.5 h-1.5 rounded-full ${item.dot === "green" ? "bg-[#22C55E]" : item.dot === "yellow" ? "w-3 h-1 bg-amber-400" : item.dot === "red" ? "bg-[#EF4823]" : "bg-transparent"}`
            }
          )
        ))), /* @__PURE__ */ React.createElement("div", { className: "pt-3 border-t border-zinc-700/80 flex items-center justify-center gap-4 text-[11px] text-zinc-400" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#22C55E]" }), "Signed"), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-3 h-1 rounded-full bg-amber-400" }), "Unsigned"), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#EF4823]" }), "No data"))))), mobileScreen === "jsa" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4 pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#1E1E22] border border-zinc-800 p-4 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-base font-extrabold text-white" }, "Gator Solar Site"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mt-0.5" }, "WICK'D ENVIRONMENTAL \u2022 JSA & PRE-BRIEF")), /* @__PURE__ */ React.createElement("span", { className: "px-3 py-1 rounded-full bg-[#122A1E] border border-[#22C55E]/60 text-[#22C55E] text-xs font-bold flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#22C55E]" }), "Active")), /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#1E1E22] border border-zinc-800 overflow-hidden" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white",
            style: { backgroundColor: "#EF4823" }
          },
          "GENERAL INFORMATION"
        ), /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-3.5 text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase text-zinc-400 mb-1" }, "SITE NAME"), /* @__PURE__ */ React.createElement("div", { className: "text-sm font-medium text-white" }, "Gator Solar Site")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase text-zinc-400 mb-1" }, "CLIENT"), /* @__PURE__ */ React.createElement("div", { className: "text-sm font-medium text-white" }, "NA")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase text-zinc-400 mb-1" }, "FIELD SUPERVISOR"), /* @__PURE__ */ React.createElement("div", { className: "text-sm font-medium text-white" }, "Test Employee")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase text-zinc-400 mb-1.5" }, "DATE / TIME"), /* @__PURE__ */ React.createElement("div", { className: "rounded-xl bg-[#141417] border border-zinc-800 divide-y divide-zinc-800" }, /* @__PURE__ */ React.createElement("div", { className: "px-3.5 py-2.5 flex items-center justify-between" }, /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: jsaDate,
            onChange: (e: any) => setJsaDate(e.target.value),
            className: "bg-transparent text-sm text-white font-medium focus:outline-none w-full"
          }
        ), /* @__PURE__ */ React.createElement(Calendar, { className: "w-4 h-4 text-zinc-400 shrink-0" })), /* @__PURE__ */ React.createElement("div", { className: "px-3.5 py-2.5 flex items-center justify-between" }, /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: jsaTime,
            onChange: (e: any) => setJsaTime(e.target.value),
            className: "bg-transparent text-sm text-white font-medium focus:outline-none w-full"
          }
        ), /* @__PURE__ */ React.createElement(Clock, { className: "w-4 h-4 text-zinc-400 shrink-0" })))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase text-zinc-400 mb-1.5" }, "GATE GPS COORDINATES"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 px-3.5 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 text-sm text-white font-medium" }, jsaGps), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setJsaGps("29.8843\xB0 N, 82.3146\xB0 W"),
            className: "w-10 h-10 rounded-xl bg-[#141417] border border-zinc-800 flex items-center justify-center text-[#EF4823] cursor-pointer",
            title: "Refresh GPS Coordinates"
          },
      /* @__PURE__ */ React.createElement(Crosshair, { className: "w-4 h-4" })
        ))))), /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#1E1E22] border border-zinc-800 overflow-hidden" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white",
            style: { backgroundColor: "#EF4823" }
          },
          "1. THE MISSION (THE BRIEF)"
        ), /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-4 text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase text-zinc-400 mb-2" }, "TODAY'S OBJECTIVE ", /* @__PURE__ */ React.createElement("span", { className: "text-[#EF4823]" }, "*")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, [
          { label: "Wicking", icon: "\u{1F4A7}" },
          { label: "Spraying", icon: "\u{1FAA3}" },
          { label: "Mowing", icon: "\u{1F343}" },
          { label: "Brush Cutting", icon: "\u2702\uFE0F" }
        ].map((obj) => {
          const active = selectedObjectives.includes(obj.label);
          return /* @__PURE__ */ React.createElement(
            "button",
            {
              key: obj.label,
              onClick: () => toggleObjective(obj.label),
              className: `px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${active ? "bg-[#EF4823] text-white shadow-sm" : "bg-[#141417] text-zinc-300 border border-zinc-700/80"}`
            },
        /* @__PURE__ */ React.createElement("span", null, obj.icon),
        /* @__PURE__ */ React.createElement("span", null, obj.label)
          );
        }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase text-zinc-400 mb-1.5" }, "SPECIFIC AREAS ", /* @__PURE__ */ React.createElement("span", { className: "text-[#EF4823]" }, "*")), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: specificAreas,
            onChange: (e: any) => setSpecificAreas(e.target.value),
            className: "w-full px-3.5 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#EF4823]"
          }
        )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase text-zinc-400 mb-1.5" }, "SUCCESS LOOK-BACK"), /* @__PURE__ */ React.createElement(
          "textarea",
          {
            rows: 3,
            value: successLookBack,
            onChange: (e: any) => setSuccessLookBack(e.target.value),
            className: "w-full p-3.5 rounded-xl bg-[#141417] border border-zinc-800 text-xs text-white leading-relaxed focus:outline-none focus:border-[#EF4823]"
          }
        )))), /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#1E1E22] border border-zinc-800 overflow-hidden" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white",
            style: { backgroundColor: "#EF4823" }
          },
          "2. HAZARD ANALYSIS"
        ), /* @__PURE__ */ React.createElement("div", { className: "p-3.5" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-xl bg-[#18181B] border border-zinc-800 p-3.5 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-white" }, "Hazard 1"), /* @__PURE__ */ React.createElement(Trash2, { className: "w-4 h-4 text-zinc-500" })), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: hazardName,
            onChange: (e: any) => setHazardName(e.target.value),
            className: "w-full px-3 py-2 rounded-xl bg-[#141417] border border-zinc-800 text-sm text-white focus:outline-none"
          }
        ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase text-zinc-400 mb-1.5" }, "RISK LEVEL"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, ["Low", "Medium", "High"].map((lvl) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key: lvl,
            onClick: () => setHazardRisk(lvl),
            className: `px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${hazardRisk === lvl ? "bg-[#EF4823] text-white" : "bg-[#141417] text-zinc-300 border border-zinc-700"}`
          },
          lvl
        )))), /* @__PURE__ */ React.createElement(
          "textarea",
          {
            rows: 3,
            value: hazardMitigation,
            onChange: (e: any) => setHazardMitigation(e.target.value),
            className: "w-full p-3 rounded-xl bg-[#141417] border border-zinc-800 text-xs text-white leading-relaxed focus:outline-none"
          }
        )))), /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#1E1E22] border border-zinc-800 overflow-hidden" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white",
            style: { backgroundColor: "#EF4823" }
          },
          "4. EMERGENCY RESPONSE"
        ), /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-3.5 text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase text-zinc-400 mb-1.5" }, "FIRST AID LOCATION"), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: firstAidLoc,
            onChange: (e: any) => setFirstAidLoc(e.target.value),
            placeholder: "On-site first aid kit location",
            className: "w-full px-3.5 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none"
          }
        )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase text-zinc-400" }, "NEAREST HOSPITAL"), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-zinc-400 mt-0.5 mb-2" }, "Uses gate GPS above. Tap the field or medical icon to pick a nearby hospital."), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: nearestHospital,
            onChange: (e: any) => setNearestHospital(e.target.value),
            className: "flex-1 px-3.5 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 text-xs text-white font-medium focus:outline-none"
          }
        ), /* @__PURE__ */ React.createElement("button", { className: "w-10 h-10 rounded-xl bg-[#141417] border border-zinc-800 flex items-center justify-center text-[#EF4823]" }, /* @__PURE__ */ React.createElement(Asterisk, { className: "w-5 h-5" })))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase text-zinc-400 mb-1.5" }, "EMERGENCY SIGNAL ", /* @__PURE__ */ React.createElement("span", { className: "text-[#EF4823]" }, "*")), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: emergencySignal,
            onChange: (e: any) => setEmergencySignal(e.target.value),
            placeholder: "e.g. Three long horn blasts / Channel 4 Radio",
            className: "w-full px-3.5 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none"
          }
        )))), /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#1E1E22] border border-zinc-800 overflow-hidden" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white",
            style: { backgroundColor: "#EF4823" }
          },
          '5. TEAM "HUDDLE" CONFIRMATION'
        ), /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-3.5 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-xl bg-[#271C18] border border-[#EF4823]/70 p-3.5 space-y-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-white leading-snug" }, "I have the authority and responsibility to stop any task I feel is unsafe."), /* @__PURE__ */ React.createElement("label", { className: "flex items-start gap-2.5 cursor-pointer" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            onClick: () => setHuddleChecked(!huddleChecked),
            className: `w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${huddleChecked ? "bg-[#EF4823] text-white" : "bg-zinc-800 border border-zinc-600"}`
          },
          huddleChecked && /* @__PURE__ */ React.createElement(Check, { className: "w-3.5 h-3.5" })
        ), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-zinc-300 leading-relaxed" }, "By checking this, you are verifying you read this statement to the crew and all understand this statement."))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase text-zinc-400 mb-1.5" }, 'THE "ONE THING" (SINGLE MOST DANGEROUS FACTOR TODAY)', " ", /* @__PURE__ */ React.createElement("span", { className: "text-[#EF4823]" }, "*")), /* @__PURE__ */ React.createElement(
          "textarea",
          {
            rows: 2,
            value: theOneThing,
            onChange: (e: any) => setTheOneThing(e.target.value),
            placeholder: "Describe today's primary risk",
            className: "w-full p-3 rounded-xl bg-[#141417] border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none"
          }
        ))))), mobileScreen === "signatures" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#1E1E22] border border-zinc-800 p-4 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-2" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-extrabold uppercase tracking-wider text-[#EF4823]" }, "ATTENDEES: 3"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-zinc-400 mt-0.5" }, "Please pass your device to collect signatures from attendees")), /* @__PURE__ */ React.createElement("button", { className: "px-3 py-1.5 rounded-full border border-[#EF4823]/50 text-[#EF4823] text-xs font-bold flex items-center gap-1 shrink-0" }, /* @__PURE__ */ React.createElement(UserPlus, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, "Add attendees"))), /* @__PURE__ */ React.createElement("h3", { className: "text-base font-extrabold text-zinc-200" }, "All other employees"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5" }, [
          { name: "Test Employee 1", role: "Crew Member", signed: true },
          { name: "Test Employee 2", role: "Crew Member", signed: true },
          { name: "Test Employee 3", role: "Crew Member", signed: emp3Signed }
        ].map((emp, idx) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key: idx,
            onClick: () => setShowSigModal(true),
            className: "w-full p-3.5 rounded-2xl bg-[#141417] border border-zinc-800 flex items-center justify-between text-left cursor-pointer hover:border-zinc-700"
          },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-9 h-9 rounded-full bg-[#2B1914] text-[#EF4823] font-bold text-xs flex items-center justify-center" }, "T"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-sm font-bold text-white" }, emp.name), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-zinc-500" }, emp.role))),
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement(
            "span",
            {
              className: `text-xs font-bold ${emp.signed ? "text-emerald-400" : "text-zinc-400"}`
            },
            emp.signed ? "Signed" : "Pending"
          ), /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-4 h-4 text-zinc-500" }))
        )))), showSigModal && /* @__PURE__ */ React.createElement("div", { className: "rounded-t-3xl bg-[#252529] border-t border-zinc-700 p-4 space-y-3 shadow-2xl" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-1 rounded-full bg-zinc-600 mx-auto" }), /* @__PURE__ */ React.createElement("div", { className: "text-center space-y-0.5" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase tracking-widest text-zinc-400" }, "COLLECT SIGNATURE"), /* @__PURE__ */ React.createElement("div", { className: "text-base font-extrabold text-white" }, "Test Employee 3"), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-zinc-400" }, "Draw in the box below, then tap Save signature.")), /* @__PURE__ */ React.createElement(
          "div",
          {
            onClick: () => setSigCleared(false),
            className: "bg-white rounded-2xl h-44 flex items-center justify-center p-4 cursor-crosshair relative overflow-hidden"
          },
          !sigCleared ? /* @__PURE__ */ React.createElement(
            "svg",
            {
              viewBox: "0 0 320 140",
              className: "w-full h-full stroke-black fill-none",
              strokeWidth: "3.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            },
        /* @__PURE__ */ React.createElement("path", { d: "M 25 42 Q 90 38 145 30" }),
        /* @__PURE__ */ React.createElement("path", { d: "M 98 39 L 106 118" }),
        /* @__PURE__ */ React.createElement("path", { d: "M 180 45 C 160 20, 130 50, 175 65 C 145 72, 132 125, 165 122 C 182 120, 195 105, 198 98" }),
        /* @__PURE__ */ React.createElement("path", { d: "M 205 42 C 230 22, 260 22, 245 45 C 232 62, 222 65, 222 65 C 250 55, 285 62, 275 85 C 265 105, 225 112, 215 118" })
          ) : /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-400 select-none" }, "Tap anywhere inside box to draw signature \u201CTE3\u201D")
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => {
              setEmp3Signed(true);
              setSigCleared(false);
            },
            className: "w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg cursor-pointer",
            style: { backgroundColor: "#EF4823" }
          },
      /* @__PURE__ */ React.createElement(CircleCheck, { className: "w-4 h-4" }),
      /* @__PURE__ */ React.createElement("span", null, emp3Signed ? "Signature Saved (All 3 Signed!)" : "Save signature")
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => {
              setSigCleared(true);
              setEmp3Signed(false);
            },
            className: "w-full py-1.5 text-xs font-semibold text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
          },
      /* @__PURE__ */ React.createElement(RotateCcw, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ React.createElement("span", null, "Clear and redraw")
        ))), mobileScreen === "metrics" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-3xl bg-[#222226] border border-zinc-800 p-4 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-11 h-11 rounded-full bg-[#331E18] text-[#EF4823] flex items-center justify-center" }, /* @__PURE__ */ React.createElement(ChartColumn, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-base font-extrabold text-white" }, "Submitted metrics"), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-zinc-400" }, "Gator Solar Site"))), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setEditingMetrics(!editingMetrics),
            className: "px-3.5 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer",
            style: { backgroundColor: "#EF4823" }
          },
      /* @__PURE__ */ React.createElement(Pencil, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ React.createElement("span", null, editingMetrics ? "Done" : "Edit")
        )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#161619] border border-zinc-800/80 p-3.5 space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-xs text-zinc-400" }, /* @__PURE__ */ React.createElement(Map, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, "Wicking Array")), /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline gap-1" }, editingMetrics ? /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "number",
            value: wickingArrayVal,
            onChange: (e: any) => setWickingArrayVal(Number(e.target.value)),
            className: "w-16 bg-zinc-800 text-white font-extrabold text-lg rounded px-1.5"
          }
        ) : /* @__PURE__ */ React.createElement("span", { className: "text-xl font-extrabold text-white" }, wickingArrayVal), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-zinc-400" }, "acres"))), /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#161619] border border-zinc-800/80 p-3.5 space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-xs text-zinc-400" }, /* @__PURE__ */ React.createElement(Sprout, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", { className: "truncate" }, "Wicking Green Space")), /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline gap-1" }, editingMetrics ? /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "number",
            value: wickingGreenVal,
            onChange: (e: any) => setWickingGreenVal(Number(e.target.value)),
            className: "w-16 bg-zinc-800 text-white font-extrabold text-lg rounded px-1.5"
          }
        ) : /* @__PURE__ */ React.createElement("span", { className: "text-xl font-extrabold text-white" }, wickingGreenVal), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-zinc-400" }, "acres"))), /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#161619] border border-zinc-800/80 p-3.5 space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-xs text-zinc-400" }, /* @__PURE__ */ React.createElement(Droplets, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, "Water Usage")), /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline gap-1" }, editingMetrics ? /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "number",
            value: waterUsageVal,
            onChange: (e: any) => setWaterUsageVal(Number(e.target.value)),
            className: "w-20 bg-zinc-800 text-white font-extrabold text-lg rounded px-1.5"
          }
        ) : /* @__PURE__ */ React.createElement("span", { className: "text-xl font-extrabold text-white" }, waterUsageVal), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-zinc-400" }, "Gal"))), /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#161619] border border-zinc-800/80 p-3.5 space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-xs text-zinc-400" }, /* @__PURE__ */ React.createElement(Users, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, "Operators")), /* @__PURE__ */ React.createElement("div", null, editingMetrics ? /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "number",
            value: operatorsVal,
            onChange: (e: any) => setOperatorsVal(Number(e.target.value)),
            className: "w-16 bg-zinc-800 text-white font-extrabold text-lg rounded px-1.5"
          }
        ) : /* @__PURE__ */ React.createElement("span", { className: "text-xl font-extrabold text-white" }, operatorsVal)))))), mobileScreen === "notes" && /* @__PURE__ */ React.createElement("div", { className: "space-y-3 pb-16" }, showNewNoteInput && /* @__PURE__ */ React.createElement(
          "form",
          {
            onSubmit: handleAddNote,
            className: "rounded-2xl bg-[#222226] border border-[#EF4823] p-3.5 space-y-2.5"
          },
      /* @__PURE__ */ React.createElement(
            "input",
            {
              type: "text",
              value: newNoteText,
              onChange: (e: any) => setNewNoteText(e.target.value),
              placeholder: "Enter field note for Gator Solar Site...",
              className: "w-full px-3 py-2 rounded-xl bg-[#141417] text-xs text-white focus:outline-none"
            }
          ),
      /* @__PURE__ */ React.createElement("div", { className: "flex justify-end gap-2" }, /* @__PURE__ */ React.createElement(
            "button",
            {
              type: "button",
              onClick: () => setShowNewNoteInput(false),
              className: "px-3 py-1 rounded-lg text-xs text-zinc-400"
            },
            "Cancel"
          ), /* @__PURE__ */ React.createElement(
            "button",
            {
              type: "submit",
              className: "px-3 py-1 rounded-lg text-xs font-bold text-white",
              style: { backgroundColor: "#EF4823" }
            },
            "Sync Note"
          ))
        ), fieldNotes.map((note) => /* @__PURE__ */ React.createElement(
          "div",
          {
            key: note.id,
            className: "rounded-2xl bg-[#222226] border border-zinc-800/90 p-4 space-y-2.5"
          },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement(
            "span",
            {
              className: `px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${note.tagStyle}`
            },
            note.tag
          ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded-full bg-[#132A1F] text-[#22C55E] text-[10px] font-bold flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Cloud, { className: "w-3 h-3" }), "Synced"), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-zinc-400" }, note.time))),
      /* @__PURE__ */ React.createElement("div", { className: "text-xs sm:text-sm text-white font-medium" }, note.text),
      /* @__PURE__ */ React.createElement("div", { className: "flex justify-end" }, /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-4 h-4 text-zinc-500" }))
        )), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setShowNewNoteInput(true),
            className: "absolute bottom-5 right-5 w-12 h-12 rounded-full text-white shadow-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform",
            style: { backgroundColor: "#EF4823" },
            title: "Add Field Note"
          },
      /* @__PURE__ */ React.createElement(Plus, { className: "w-6 h-6" })
        )), mobileScreen === "chemicals" && /* @__PURE__ */ React.createElement("div", { className: "space-y-3 pb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between px-1 pb-1" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-extrabold text-white" }, chemMode), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setChemMode(chemMode === "Spraying" ? "Wicking" : "Spraying"),
            className: "px-3 py-1.5 rounded-xl bg-[#222226] border border-zinc-700 text-xs font-semibold text-zinc-300 flex items-center gap-1.5 cursor-pointer"
          },
      /* @__PURE__ */ React.createElement(ArrowLeftRight, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ React.createElement("span", null, "Switch")
        )), chemValues.map((item, idx) => /* @__PURE__ */ React.createElement(
          "div",
          {
            key: item.name,
            className: "rounded-2xl bg-[#222226] border border-zinc-800 p-3.5 space-y-2"
          },
      /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-white" }, item.name),
      /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-12 gap-2.5" }, /* @__PURE__ */ React.createElement(
            "input",
            {
              type: "text",
              value: item.amount,
              onChange: (e: any) => {
                const val = e.target.value;
                setChemValues(
                  (prev) => prev.map((c, i) => i === idx ? __spreadProps(__spreadValues({}, c), { amount: val }) : c)
                );
              },
              className: "col-span-8 px-3.5 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 text-sm font-medium text-white focus:outline-none focus:border-[#EF4823]"
            }
          ), /* @__PURE__ */ React.createElement("div", { className: "col-span-4 px-3 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 flex items-center justify-between text-xs font-semibold text-white" }, /* @__PURE__ */ React.createElement("span", null, item.unit), /* @__PURE__ */ React.createElement(ChevronDown, { className: "w-3.5 h-3.5 text-zinc-400" })))
        )), /* @__PURE__ */ React.createElement("div", { className: "pt-1 space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-white px-1" }, "Notes (optional)"), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            placeholder: "Additional notes...",
            className: "w-full px-3.5 py-3 rounded-2xl bg-[#222226] border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none"
          }
        ))), mobileScreen === "survey" && /* @__PURE__ */ React.createElement("div", { className: "space-y-3.5 pb-6" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "h-1.5 w-full rounded-full bg-[#EF4823]" }), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-zinc-400" }, dynamicShortDate + " · Gator Solar Site")), surveyQuestions.map((q, idx) => /* @__PURE__ */ React.createElement(
          "div",
          {
            key: q.id,
            className: "rounded-2xl bg-[#222226] border border-zinc-800 p-4 space-y-3"
          },
      /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold uppercase tracking-wider text-zinc-400" }, "QUESTION ", idx + 1, " OF 8"),
      /* @__PURE__ */ React.createElement("div", { className: "text-xs sm:text-sm font-bold text-white leading-snug" }, q.question),
      /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-2 pt-1" }, ["N/A", "No", "Yes"].map((opt) => {
            const selected = q.answer === opt;
            return /* @__PURE__ */ React.createElement(
              "button",
              {
                key: opt,
                onClick: () => handleSurveySelect(q.id, opt),
                className: `py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border transition-all cursor-pointer ${selected ? "bg-[#173626] border-[#22C55E] text-[#22C55E]" : "bg-[#141417] border-zinc-800 text-zinc-300"}`
              },
              selected && /* @__PURE__ */ React.createElement(Check, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ React.createElement("span", null, opt)
            );
          }))
        ))), mobileScreen === "checklist" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4 pb-6" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#222226] border border-zinc-800 p-4 space-y-3.5 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-extrabold uppercase tracking-wider text-[#EF4823]" }, "MACHINE INFORMATION"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-white mb-1.5" }, "Site Name ", /* @__PURE__ */ React.createElement("span", { className: "text-[#EF4823]" }, "(Locked)")), /* @__PURE__ */ React.createElement("div", { className: "px-3.5 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 flex items-center justify-between text-zinc-300" }, /* @__PURE__ */ React.createElement("span", null, "Gator Solar Site"), /* @__PURE__ */ React.createElement(Lock, { className: "w-3.5 h-3.5 text-zinc-500" }))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2.5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-white mb-1" }, "Machine # ", /* @__PURE__ */ React.createElement("span", { className: "text-[#EF4823]" }, "*")), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: machineNum,
            onChange: (e: any) => setMachineNum(e.target.value),
            placeholder: "e.g. ASV-01",
            className: "w-full px-3 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none"
          }
        )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-white mb-1" }, "Machine Type"), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: machineType,
            onChange: (e: any) => setMachineType(e.target.value),
            placeholder: "e.g. ASV, Skid Steer",
            className: "w-full px-3 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none"
          }
        ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2.5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-white mb-1" }, "Last 4 VIN ", /* @__PURE__ */ React.createElement("span", { className: "text-[#EF4823]" }, "*")), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: last4Vin,
            onChange: (e: any) => setLast4Vin(e.target.value),
            placeholder: "1234",
            className: "w-full px-3 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none"
          }
        )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-white mb-1" }, "Machine Brand"), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: machineBrand,
            onChange: (e: any) => setMachineBrand(e.target.value),
            placeholder: "e.g. John Deere",
            className: "w-full px-3 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none"
          }
        ))), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-zinc-500" }, "* Machine # or Last 4 VIN · at least one required"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-white mb-1" }, "Operator Name ", /* @__PURE__ */ React.createElement("span", { className: "text-[#EF4823]" }, "*")), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: operatorName,
            onChange: (e: any) => setOperatorName(e.target.value),
            placeholder: "Full name",
            className: "w-full px-3.5 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none"
          }
        )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-white mb-1" }, "Hours"), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: machineHours,
            onChange: (e: any) => setMachineHours(e.target.value),
            placeholder: "0.0 hrs",
            className: "w-full px-3.5 py-2.5 rounded-xl bg-[#141417] border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none"
          }
        ))), /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#222226] border border-zinc-800 p-4 space-y-3.5 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-extrabold uppercase tracking-wider text-[#EF4823]" }, "FLUID LEVELS"), [
          { label: "Motor Oil", val: motorOil, setter: setMotorOil },
          { label: "Coolant", val: coolant, setter: setCoolant },
          { label: "Hydraulic Oil", val: hydraulicOil, setter: setHydraulicOil }
        ].map((fluid) => /* @__PURE__ */ React.createElement("div", { key: fluid.label, className: "space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-white" }, fluid.label), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-2" }, ["NONE", "FULL", "LOW"].map((lvl) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key: lvl,
            type: "button",
            onClick: () => fluid.setter(lvl),
            className: `py-2.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${fluid.val === lvl ? "bg-[#EF4823] border-[#EF4823] text-white" : "bg-[#141417] border-zinc-700/80 text-zinc-300"}`
          },
          lvl
        )))))), /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#222226] border border-zinc-800 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-extrabold uppercase tracking-wider text-[#EF4823]" }, "EQUIPMENT CONDITION"))), mobileScreen === "attachments" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4 pb-6" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs text-zinc-400 leading-relaxed" }, "Attachments are filed under the report day on the home calendar (shown above), not necessarily the day the photo was taken."), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setAttachmentCount((c) => c + 1),
            className: "rounded-2xl bg-[#222226] border border-zinc-800 p-5 flex flex-col items-center justify-center gap-2 hover:border-[#EF4823] transition-all cursor-pointer"
          },
      /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-2xl bg-[#362019] flex items-center justify-center text-[#EF4823]" }, /* @__PURE__ */ React.createElement(Camera, { className: "w-6 h-6" })),
      /* @__PURE__ */ React.createElement("div", { className: "text-sm font-extrabold text-white mt-1" }, "Camera"),
      /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-zinc-400" }, "Take a photo")
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setAttachmentCount((c) => c + 1),
            className: "rounded-2xl bg-[#222226] border border-zinc-800 p-5 flex flex-col items-center justify-center gap-2 hover:border-[#EF4823] transition-all cursor-pointer"
          },
      /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-2xl bg-[#362019] flex items-center justify-center text-[#EF4823]" }, /* @__PURE__ */ React.createElement(Image, { className: "w-6 h-6" })),
      /* @__PURE__ */ React.createElement("div", { className: "text-sm font-extrabold text-white mt-1" }, "Photo Library"),
      /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-zinc-400" }, "Select multiple")
        )), /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-extrabold text-white" }, "Tags"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, ATTACHMENT_TAGS.map((tag) => {
          const active = selectedAttachmentTags.includes(tag);
          return /* @__PURE__ */ React.createElement(
            "button",
            {
              key: tag,
              type: "button",
              onClick: () => toggleAttachmentTag(tag),
              className: `px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${active ? "bg-[#3D2017] border-[#EF4823] text-[#EF4823]" : "bg-[#222226] border-zinc-700/80 text-zinc-300 hover:border-zinc-600"}`
            },
            tag
          );
        }))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-extrabold text-white" }, "Notes (optional)"), /* @__PURE__ */ React.createElement(
          "textarea",
          {
            rows: 3,
            value: attachmentNote,
            onChange: (e: any) => setAttachmentNote(e.target.value),
            placeholder: "Describe these attachments...",
            className: "w-full p-3.5 rounded-2xl bg-[#222226] border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#EF4823]"
          }
        )), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setMobileScreen("sign-report"),
            className: "w-full py-3.5 rounded-2xl font-bold text-sm text-white/90 shadow-lg cursor-pointer hover:opacity-95",
            style: { backgroundColor: "#B84627" }
          },
          "Save Attachments (",
          attachmentCount,
          ")"
        )), mobileScreen === "sign-report" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4 pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#222226] border border-zinc-800 divide-y divide-zinc-800 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "p-3.5 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2 text-zinc-400" }, /* @__PURE__ */ React.createElement(FileText, { className: "w-4 h-4" }), /* @__PURE__ */ React.createElement("span", null, "Report Date")), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-white" }, dynamicLongDate)), /* @__PURE__ */ React.createElement("div", { className: "p-3.5 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2 text-zinc-400" }, /* @__PURE__ */ React.createElement(Building2, { className: "w-4 h-4" }), /* @__PURE__ */ React.createElement("span", null, "Project")), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-white" }, "Gator Solar Site"))), /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl bg-[#2C2511] border border-amber-500/30 p-3.5 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement(TriangleAlert, { className: "w-4 h-4 text-amber-400 shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-amber-300 leading-relaxed" }, "By signing, you certify that all information in this daily report is accurate and complete.")), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-extrabold text-white" }, "Prepared By ", /* @__PURE__ */ React.createElement("span", { className: "text-[#EF4823]" }, "*")), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: preparedBy,
            onChange: (e: any) => setPreparedBy(e.target.value),
            className: "w-full px-3.5 py-3 rounded-2xl bg-[#222226] border border-zinc-800 text-sm text-white focus:outline-none"
          }
        )), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-extrabold text-white" }, "Signature ", /* @__PURE__ */ React.createElement("span", { className: "text-[#EF4823]" }, "*")), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-zinc-400" }, "Tap the box to sign."), /* @__PURE__ */ React.createElement(
          "div",
          {
            onClick: () => setReportSignatureDrawn(!reportSignatureDrawn),
            className: "bg-white rounded-2xl h-44 flex flex-col items-center justify-center cursor-pointer p-4 select-none"
          },
          reportSignatureDrawn ? /* @__PURE__ */ React.createElement("div", { className: "text-center space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "font-serif italic text-3xl font-bold text-slate-900" }, "Test Employee"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-600 font-bold" }, "\u2713 Digital Signature Captured (Tap to clear)")) : /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center gap-2 text-zinc-400" }, /* @__PURE__ */ React.createElement(SquarePen, { className: "w-7 h-7 stroke-[1.75]" }), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-semibold" }, "Tap to sign"))
        ))), mobileScreen === "daily-report-pdf" && /* @__PURE__ */ React.createElement("div", { className: "-mx-3.5 -my-3.5 bg-white text-slate-900 min-h-full" }, /* @__PURE__ */ React.createElement("div", { className: "bg-black text-white px-4 py-3 flex items-center justify-between text-xs font-bold" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-0.5" }, /* @__PURE__ */ React.createElement("div", null, "Date " + dynamicSlashDate), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-zinc-200" }, "Prepared by Test Employee")), /* @__PURE__ */ React.createElement("div", { className: "self-start" }, "Job # 9999")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 flex items-center justify-between border-b border-slate-200" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-lg font-extrabold text-slate-900" }, "Gator Solar Site"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "Gainesville, Florida \xB7 32608")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl font-black text-[#EF4823]" }, "W"), /* @__PURE__ */ React.createElement("div", { className: "leading-none" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm font-black text-slate-900" }, "WICK'D"), /* @__PURE__ */ React.createElement("div", { className: "text-[6px] font-bold uppercase tracking-widest text-[#EF4823]" }, "ENVIRONMENTAL TECHNOLOGIES")))), /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "border border-slate-200 rounded-lg overflow-hidden" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white",
            style: { backgroundColor: "#EF4823" }
          },
          "WEATHER"
        ), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 divide-x divide-slate-200 text-center py-3" }, /* @__PURE__ */ React.createElement("div", { className: "px-1.5 space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-slate-800" }, "9 AM"), /* @__PURE__ */ React.createElement("div", { className: "text-xl font-extrabold text-slate-900" }, "86\xB0F"), /* @__PURE__ */ React.createElement("div", { className: "text-[9px] text-slate-500 leading-tight" }, "Rain \xB7 Wind 8 mph \xB7 Humidity 69%")), /* @__PURE__ */ React.createElement("div", { className: "px-1.5 space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-slate-800" }, "12 PM"), /* @__PURE__ */ React.createElement("div", { className: "text-xl font-extrabold text-slate-900" }, "93\xB0F"), /* @__PURE__ */ React.createElement("div", { className: "text-[9px] text-slate-500 leading-tight" }, "Partly cloudy \xB7 Wind 6 mph \xB7 Humidity 52%")), /* @__PURE__ */ React.createElement("div", { className: "px-1.5 space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-slate-800" }, "4 PM"), /* @__PURE__ */ React.createElement("div", { className: "text-xl font-extrabold text-slate-900" }, "82\xB0F"), /* @__PURE__ */ React.createElement("div", { className: "text-[9px] text-slate-500 leading-tight" }, "Rain \xB7 Wind 5 mph \xB7 Humidity 86%")))), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-500 -mt-2 px-1" }, "Hi 93\xB0F / Lo 75\xB0F \xB7 Precip 0.20 in \xB7 Wind max 8 mph"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white rounded-xs",
            style: { backgroundColor: "#EF4823" }
          },
          "GENERAL NOTES"
        ), /* @__PURE__ */ React.createElement("div", { className: "divide-y divide-slate-200 text-xs space-y-2.5 px-2" }, /* @__PURE__ */ React.createElement("div", { className: "pt-1" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "1. Equipment"), " \xB7 Equipment maintenance completed."), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-400 font-semibold mt-0.5" }, "Equipment | Report " + dynamicPdfDate + " | Submitted " + dynamicPdfDate + " 02:21 PM")), /* @__PURE__ */ React.createElement("div", { className: "pt-2.5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "2. Weather"), " \xB7 No weather on radar."), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-400 font-semibold mt-0.5" }, "Weather | Report " + dynamicPdfDate + " | Submitted " + dynamicPdfDate + " 02:20 PM")), /* @__PURE__ */ React.createElement("div", { className: "pt-2.5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "3. Chemical"), " \xB7 Chemical inventory completed."), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-400 font-semibold mt-0.5" }, "Chemical | Report " + dynamicPdfDate + " | Submitted " + dynamicPdfDate + " 02:20 PM")), /* @__PURE__ */ React.createElement("div", { className: "pt-2.5 pb-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "4. Wildlife"), " \xB7 Alligator still onsite in pond by Panel Blocks A, B, C."), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-400 font-semibold mt-0.5" }, "Wildlife | Report " + dynamicPdfDate + " | Submitted " + dynamicPdfDate + " 02:21 PM"))))))), mobileScreen === "jsa" && /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-[#121214]/95 backdrop-blur-md border-t border-zinc-800/80 shrink-0" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => {
              navigateWithTransition("signatures", "Opening Signature Pad...");
            },
            className: "w-full py-3.5 rounded-2xl font-extrabold text-xs tracking-wide uppercase text-white flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:opacity-95 active:scale-95 transition-transform",
            style: { backgroundColor: "#EF4823" }
          },
      /* @__PURE__ */ React.createElement(Pencil, { className: "w-4 h-4" }),
      /* @__PURE__ */ React.createElement("span", null, "COLLECT CREW SIGNATURES & SIGN OFF")
        )), mobileScreen === "sign-report" && /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-[#121214]/95 backdrop-blur-md border-t border-zinc-800/80 shrink-0" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => navigateWithTransition("daily-report-pdf", "Compiling 5-Page Audit PDF..."),
            className: "w-full py-3.5 rounded-2xl font-bold text-sm text-white/90 flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:opacity-95 active:scale-95 transition-transform",
            style: { backgroundColor: "#A94428" }
          },
      /* @__PURE__ */ React.createElement(Pencil, { className: "w-4 h-4" }),
      /* @__PURE__ */ React.createElement("span", null, "Submit & Sign Report")
        )), (mobileScreen === "home" || mobileScreen === "calendar") && /* @__PURE__ */ React.createElement("div", { className: "bg-[#161618] border-t border-zinc-800 px-8 py-2 flex items-center justify-between text-[10px] font-semibold shrink-0" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setMobileScreen("home"),
            className: "flex flex-col items-center gap-0.5 text-[#0A84FF] cursor-pointer"
          },
      /* @__PURE__ */ React.createElement(House, { className: "w-5 h-5" }),
      /* @__PURE__ */ React.createElement("span", null, "Home")
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setMobileScreen("notes"),
            className: "flex flex-col items-center gap-0.5 text-zinc-400 hover:text-white cursor-pointer"
          },
      /* @__PURE__ */ React.createElement(Clock, { className: "w-5 h-5" }),
      /* @__PURE__ */ React.createElement("span", null, "Activity")
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setMobileScreen("daily-report-pdf"),
            className: "flex flex-col items-center gap-0.5 text-zinc-400 hover:text-white cursor-pointer"
          },
      /* @__PURE__ */ React.createElement(Ellipsis, { className: "w-5 h-5" }),
      /* @__PURE__ */ React.createElement("span", null, "More")
        )), /* @__PURE__ */ React.createElement("div", { className: "bg-[#121214] py-2 flex justify-center shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "w-32 h-1 rounded-full bg-white/80" })),
        /* Subtle Native-Feel Touch Feedback */
        React.createElement("div", { className: "absolute inset-0 pointer-events-none z-50 overflow-hidden rounded-[40px]" },
          ripples.map((r) => React.createElement("div", {
            key: r.id,
            className: "pointer-events-none absolute rounded-full bg-white/25 border border-white/40 shadow-xs transition-all duration-200",
            style: {
              left: r.x,
              top: r.y,
              width: 18,
              height: 18,
              transform: "translate(-50%, -50%)"
            }
          }))
        )))))));
      }
      