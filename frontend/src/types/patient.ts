export interface Patient {
  id: number;
  doctor_id: number;
  full_name: string;
  age: number;
  gender: string;
  weight?: number;
  height?: number;
  phone?: string;
  email?: string;
  diagnosis?: string;
  comorbidities?: string[];
  lab_results?: Record<string, any>;
  current_medications?: Medication[];
  allergies?: Allergy[];
  previous_anticoagulants?: PreviousAnticoagulant[];
  lifestyle_factors?: LifestyleFactors;
  risk_factors?: RiskFactors;
  social_factors?: SocialFactors;
  created_at: string;
  updated_at?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface Allergy {
  allergen: string;
  reaction: string;
}

export interface PreviousAnticoagulant {
  medication: string;
  dosage: string;
  reason_for_discontinuation: string;
}

export interface PatientCreate {
  full_name: string;
  age: number;
  gender: string;
  weight?: number;
  height?: number;
  phone?: string;
  email?: string;
  diagnosis?: string;
  comorbidities?: string[];
  lab_results?: Record<string, any>;
  current_medications?: Medication[];
  allergies?: Allergy[];
  previous_anticoagulants?: PreviousAnticoagulant[];
}

export interface PatientUpdate {
  full_name?: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  phone?: string;
  email?: string;
  diagnosis?: string;
  comorbidities?: string[];
  lab_results?: Record<string, any>;
  current_medications?: Medication[];
  allergies?: Allergy[];
  previous_anticoagulants?: PreviousAnticoagulant[];
  lifestyle_factors?: LifestyleFactors;
  risk_factors?: RiskFactors;
  social_factors?: SocialFactors;
}

export interface LifestyleFactors {
  smoking: {
    status: 'never' | 'former' | 'current';
    pack_years?: number;
    quit_date?: string;
  };
  alcohol: {
    status: 'never' | 'occasional' | 'regular';
    units_per_week?: number;
  };
  physical_activity: {
    level: 'sedentary' | 'light' | 'moderate' | 'high';
    hours_per_week?: number;
  };
}

export interface RiskFactors {
  previous_bleeding: {
    has_bleeding: boolean;
    episodes?: Array<{
      date: string;
      severity: 'mild' | 'moderate' | 'severe';
      location: string;
    }>;
  };
  falls: {
    has_falls: boolean;
    frequency?: 'rare' | 'occasional' | 'frequent';
    last_fall?: string;
  };
  surgeries: {
    recent_surgery: boolean;
    surgeries?: Array<{
      date: string;
      type: string;
      complications?: string;
    }>;
  };
}

export interface SocialFactors {
  compliance: {
    level: 'excellent' | 'good' | 'fair' | 'poor';
    notes?: string;
  };
  support: {
    family_support: boolean;
    caregiver: boolean;
    social_services: boolean;
  };
}

export interface ControlVisit {
  id: number;
  patient_id: number;
  type: 'routine' | 'urgent' | 'follow_up' | 'emergency';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  scheduled_date: string;
  completed_date?: string;
  notes?: string;
  doctor_id: number;
  created_at: string;
  updated_at?: string;
}

export interface SideEffect {
  id: number;
  patient_id: number;
  medication: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  status: 'active' | 'monitoring' | 'resolved';
  onset_date: string;
  resolution_date?: string;
  action_taken?: string;
  created_at: string;
  updated_at?: string;
}