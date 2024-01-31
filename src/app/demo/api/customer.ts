export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    activity?: number;
    representative?: Representative;
}

export interface PersonData {
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

  export interface status {
    health_status: string;
    recommendations: string[];
    future_risks: string[];
    explanations: string[];
  }

  export interface HealthStatus {
    [key: string]: status;
  }
