export type SystemStatus = "ONLINE" | "ALERT" | "OFFLINE";
export type PriorityLevel = "HIGH" | "MEDIUM" | "LOW";

export interface EnergySystem {
  id: string;
  name: string;
  customer: string;
  city: string;
  state: string;
  hourlyProduction: number;
  efficiency: number;
  status: SystemStatus;
  createdAt: string;
  updatedAt: string;
  alerts: SystemAlert[]; 
}


export interface SystemAlert {
  id: string;
  title: string;
  description: string | null;
  priorityLevel: PriorityLevel;
  systemId: string;
  createdAt: string;
  updatedAt: string;
  system?: Omit<EnergySystem, "alerts">; 
}