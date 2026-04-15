import { Zap, Gauge, Server, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";


type SystemStatus = "ONLINE" | "ALERT" | "OFFLINE";

interface ApiStats {
  id: string;
  hourlyProduction: number;
  efficiency: number;
  status: SystemStatus;
  alerts: [];
}

async function fetchSystems(): Promise<SystemData[]> {
  try {
    const res = await fetch("https://teste-front-api-production.up.railway.app/systems", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("API response error:", res.statusText);
      return [];
    }

    const json = await res.json();
    
    if (json && Array.isArray(json.data)) {
      return json.data;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch systems:", error);
    return [];
  }
}

const stats = [
  {
    label: "Energia Gerada Hoje",
    value: "1,847.2",
    unit: "kWh",
    icon: Zap, 
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Produção Mensal",
    value: "45.8",
    unit: "MWh",
    icon: TrendingUp,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    label: "Sistemas Online",
    value: "124",
    unit: "",
    icon: Server,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Sistemas com Alerta",
    value: "8",
    unit: "",
    icon: AlertTriangle,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
  },
  {
    label: "Eficiência Média",
    value: "94.2",
    unit: "%",
    icon: Gauge,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

export function StatsCard() {

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-6 gap-3 ">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="border border-gray-100 shadow-sm bg-white aspect-[232/174] ">
            <CardContent className="">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 pb-4 p-1">
                  <CardTitle className="text-sm md:text-xs xl:text-base text-gray-500 leading-tight">{stat.label}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1 ">
                    <span className="text-2xl md:text-lg xl:text-3xl font-bold text-gray-900">{stat.value}</span>
                    {stat.unit && (
                      <span className="text-sm font-medium text-gray-500">{stat.unit}</span>
                    )}
                  </div>
                </div>
                <div className={`w-10 h-10 md:w-8 md:h-8 xl:w-12 xl:h-12 rounded-lg ${stat.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}