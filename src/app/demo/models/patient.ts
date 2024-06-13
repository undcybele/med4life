export interface PersonData {
    _id: string;
    original_id: string;
    health_check_id: string;
    date: string;
    person_details: {
      name: string;
      age?: number;
      height?: number;
      weight?: number;
      food_preference?: string;
    };
    vital_signs?: {
      heart_rate?: number;
      blood_pressure_systolic?: number;
      blood_pressure_diastolic?: number;
      oxygen_saturation?: number;
    };
    sleep_duration?: number;
    nutrition?: {
      calories?: number;
      carbs?: number;
      protein?: number;
      fat?: number;
    };
  }

  export interface HealthData {
    [key: string]: PersonData;
  }

  export interface UniquePatient {
      _id?: string
      name: string
      age: number
      height: number
      weight: number
      food_preference: string
      health_check_id?: number
  }

  export interface status {
    health_status: string;
    recommendations: string[];
    future_risks: string[];
    explanations: string[];
  }

  export interface HealthStatus {
    [key: string]: status;
  }
