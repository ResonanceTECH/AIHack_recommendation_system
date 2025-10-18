export interface Medication {
  id: number;
  name: string;
  generic_name?: string;
  drug_class?: string;
  mechanism_of_action?: string;
  available_dosages?: string[];
  indications?: string[];
  contraindications?: string[];
  side_effects?: string[];
  drug_interactions?: DrugInteraction[];
  monitoring_parameters?: MonitoringParameter[];
  therapeutic_range?: TherapeuticRange;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface DrugInteraction {
  medication: string;
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  description: string;
  management: string;
}

export interface MonitoringParameter {
  parameter: string;
  frequency: string;
  normal_range: string;
  critical_values: string;
}

export interface TherapeuticRange {
  parameter: string;
  min_value: number;
  max_value: number;
  unit: string;
}

export interface MedicationSearchResult {
  id: number;
  name: string;
  generic_name?: string;
  drug_class?: string;
  available_dosages?: string[];
}
