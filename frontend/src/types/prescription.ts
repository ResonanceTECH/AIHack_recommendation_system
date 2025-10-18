export interface Prescription {
  id: number;
  patient_id: number;
  doctor_id: number;
  recommended_medications?: RecommendedMedication[];
  dosage?: Record<string, any>;
  duration?: string;
  instructions?: string;
  ai_recommendations?: AIRecommendation[];
  justification?: string;
  alternative_options?: AlternativeOption[];
  warnings?: Warning[];
  monitoring_plan?: MonitoringPlan;
  patient_feedback?: string;
  doctor_notes?: string;
  status: string;
  is_ai_generated: boolean;
  created_at: string;
  updated_at?: string;
}

export interface RecommendedMedication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  evidence_level: 'A' | 'B' | 'C' | 'D';
  justification: string;
  contraindications?: string[];
  side_effects?: string[];
}

export interface PrescriptionCreate {
  patient_id: number;
  recommended_medications?: RecommendedMedication[];
  dosage?: Record<string, any>;
  duration?: string;
  instructions?: string;
}

export interface PrescriptionUpdate {
  recommended_medications?: RecommendedMedication[];
  dosage?: Record<string, any>;
  duration?: string;
  instructions?: string;
  ai_recommendations?: AIRecommendation[];
  justification?: string;
  alternative_options?: AlternativeOption[];
  warnings?: Warning[];
  monitoring_plan?: MonitoringPlan;
  patient_feedback?: string;
  doctor_notes?: string;
  status?: string;
}

export interface AIRecommendation {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  evidence_level: 'A' | 'B' | 'C' | 'D';
  clinical_studies: string[];
  contraindications: string[];
  drug_interactions: string[];
  side_effects: string[];
}

export interface AlternativeOption {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  why_not_chosen: string;
  evidence_level: 'A' | 'B' | 'C' | 'D';
}

export interface Warning {
  type: 'contraindication' | 'interaction' | 'side_effect' | 'monitoring';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  medication?: string;
}

export interface MonitoringPlan {
  parameters: Array<{
    name: string;
    frequency: string;
    normal_range: string;
    critical_values: string;
  }>;
  follow_up_schedule: Array<{
    timeframe: string;
    actions: string[];
  }>;
}
