import { Zap, Gauge, Server, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { EnergySystem } from "@/types/energy-system";
import { summarizeSystemsData } from "@/utils/stats-utils";



async function fetchSystems(): Promise<EnergySystem[]> {
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




export async function StatsCard() {

  const systems = await fetchSystems();
  const data = summarizeSystemsData(systems);
  

const statsConfig = [
  {
    label: "Energia Gerada Hoje",
    value: data.dailyEnergy,
    unit: "kWh",
    icon: Zap, 
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Produção Mensal",
    value: data.monthlyEnergy,
    unit: "MWh",
    icon: TrendingUp,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    label: "Sistemas Online",
    value: data.onlineCount,
    unit: "",
    icon: Server,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Sistemas com Alerta",
    value: data.alertCount,
    unit: "",
    icon: AlertTriangle,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
  },
  {
    label: "Eficiência Média",
    value: data.averageEfficiency,
    unit: "%",
    icon: Gauge,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-6 gap-3 ">
      {statsConfig.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="border border-gray-100 shadow-sm bg-white aspect-[232/174] ">
            <CardContent>
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