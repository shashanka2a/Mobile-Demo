export type DayStatus = 'signed' | 'unsigned' | 'missing' | 'none';
export type SyncStatus = 'pending' | 'synced' | 'error';

export interface Project {
  id: string;
  name: string;
  code?: string;
  client?: string;
  location?: string;
  acres?: number;
  center?: [number, number]; // [lat, lng]
}

export type NoteCategory = 'General' | 'Safety' | 'Equipment' | 'Weather' | 'Incident';

export interface NoteEntry {
  id: string;
  project: string;
  projectId?: string;
  timestamp: string;
  category: NoteCategory;
  notes: string;
  photos?: string[];
  syncStatus?: SyncStatus;
}

export type ApplicationType = 'wicking' | 'spraying';

export interface ChemicalItem {
  name: string;
  quantity: string;
  unit: string;
}

export interface ChemicalEntry {
  id: string;
  project: string;
  projectId?: string;
  timestamp: string;
  applicationType: ApplicationType;
  chemicals: ChemicalItem[];
  notes?: string;
  photos?: string[];
  syncStatus?: SyncStatus;
}

export interface CompanyMetricField {
  id: string;
  key: string;
  label: string;
  unit: string;
  sort_order: number;
  is_active: boolean;
}

export interface MetricsEntry {
  id: string;
  project: string;
  projectId?: string;
  timestamp: string;
  values: Record<string, string>;
  notes?: string;
  photos?: string[];
  syncStatus?: SyncStatus;
}

export type SurveyAnswer = 'N/A' | 'No' | 'Yes' | '';

export interface SurveyQuestionEntry {
  id: string;
  question: string;
  answer: SurveyAnswer;
  description?: string;
  positiveAnswer?: 'Yes' | 'No';
}

export interface SurveyEntry {
  id: string;
  project: string;
  projectId?: string;
  timestamp: string;
  questions: SurveyQuestionEntry[];
  syncStatus?: SyncStatus;
}

export type FluidLevel = 'FULL' | 'LOW' | '';
export type HoseCondition = 'GOOD' | 'BAD' | '';
export type BeltCondition = 'TIGHT' | 'LOOSE' | '';
export type AttachmentApplicable = 'N/A' | 'Yes' | '';
export type AttachmentCondition = 'Good' | 'Fair' | 'Bad' | '';
export type VolumeUnit = 'qt' | 'gal' | 'L';

export interface EquipmentFormData {
  machineNumber: string;
  machineType: string;
  machineBrand: string;
  lastFourVin: string;
  operatorName: string;
  siteName: string;
  asvHours: string;
  motorOil: FluidLevel;
  motorOilAmount: string;
  motorOilUnit: VolumeUnit;
  coolant: FluidLevel;
  coolantAmount: string;
  coolantUnit: VolumeUnit;
  hydraulicOil: FluidLevel;
  hydraulicOilAmount: string;
  hydraulicOilUnit: VolumeUnit;
  hoses: HoseCondition;
  fanBelt: BeltCondition;
  attachmentApplicable: AttachmentApplicable;
  attachmentName: string;
  attachmentNumber: string;
  attachmentCondition: AttachmentCondition;
  repairsNotes: string;
}

export interface EquipmentChecklistEntry {
  id: string;
  type: 'checklist';
  project?: string;
  projectId?: string;
  timestamp: string;
  formData: EquipmentFormData;
  signature?: string;
  photos?: string[];
  syncStatus?: SyncStatus;
}

export interface AttachmentEntry {
  id: string;
  project: string;
  projectId?: string;
  timestamp: string;
  fileNames: string[];
  notes?: string;
  previews?: string[];
  syncStatus?: SyncStatus;
}

export interface InjuredEmployeeRecord {
  name: string;
  gender: string;
  jobTitle: string;
  treatment: string;
  hospitalized: boolean;
}

export interface IncidentEntry {
  id: string;
  project: string;
  projectId?: string;
  timestamp: string;
  title: string;
  status: 'Open' | 'Closed';
  recordable: boolean;
  incidentDate: string;
  incidentTime: string;
  location: string;
  injuryType: string;
  injuredEmployee?: InjuredEmployeeRecord;
  investigation: string;
  outcome: string;
  photos?: string[];
  syncStatus?: SyncStatus;
}

export type ObservationType = 'Invasive Vegetation' | 'Hazards on Site';
export type ObservationCategory = 'negative' | 'positive';
export type ObservationProgress = 'New Occurrence' | 'Unchanged' | 'Worsening' | 'Recurrent' | 'Improved';

export interface ObservationEntry {
  id: string;
  project: string;
  projectId?: string;
  timestamp: string;
  type: ObservationType;
  category: ObservationCategory;
  status: 'Open' | 'Resolved';
  progress: ObservationProgress;
  title: string;
  description: string;
  descriptionTags: string[];
  location: string;
  gpsLat?: number;
  gpsLng?: number;
  gpsAccuracyM?: number;
  photos?: string[];
  syncStatus?: SyncStatus;
}

export type SafetyTalkStatus = 'upcoming' | 'missed' | 'conducted';

export interface SafetyTalkAttendee {
  name: string;
  company?: string;
  signed?: boolean;
}

export interface SafetyTalk {
  id: string;
  templateId: string;
  templateName: string;
  date: string; // YYYY-MM-DD
  status: SafetyTalkStatus;
  createdAt: string;
  projectId?: string;
  projectName?: string;
  attendees?: SafetyTalkAttendee[];
  signatureDataUrl?: string;
  pdfUrl?: string;
}

export interface JsaHazardRow {
  id: string;
  step: string;
  hazard: string;
  controls: string;
  risk: 'low' | 'medium' | 'high';
}

export interface JsaFormRecord {
  id: string;
  projectId: string;
  projectName: string;
  dateKey: string;
  taskDescription: string;
  objectives: string[];
  hazards: JsaHazardRow[];
  nearestHospital: {
    name: string;
    address: string;
    phone: string;
    distanceMiles: number;
    etaMinutes: number;
  };
  emergencyGps: string;
  preparedBy: string;
  supervisorSigned?: boolean;
  timestamp: string;
  syncStatus?: SyncStatus;
}

export interface SignedReportEntry {
  signedAt: string;
  preparedBy: string;
  signatureDataUrl: string;
  projectName: string;
  dateKey: string;
}

export interface ReportData {
  dateKey: string;
  project: Project;
  notes: NoteEntry[];
  chemicals: ChemicalEntry[];
  metrics: MetricsEntry[];
  survey: SurveyEntry | null;
  equipment: EquipmentChecklistEntry[];
  attachments: AttachmentEntry[];
  incidents: IncidentEntry[];
  observations: ObservationEntry[];
  signedReport: SignedReportEntry | null;
}

export type ActivityFeedType =
  | 'notes'
  | 'chemicals'
  | 'metrics'
  | 'survey'
  | 'equipment'
  | 'attachments'
  | 'report'
  | 'observations'
  | 'incidents'
  | 'safety_talks'
  | 'jsa';

export interface ActivityItem {
  id: string;
  type: ActivityFeedType;
  title: string;
  subtitle: string;
  timestamp: string;
  timestampDate: Date;
  statusBadge?: string;
}
