import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { timeElapsed } from "@/utils/formatters";
import { resolveAlertIcon } from "@/utils/icons";

type AlertPriorityLevel = "HIGH" | "MEDIUM" | "LOW";


interface ApiAlert {
  systemId: string;
  title: string;
  customer: string;
  priorityLevel: AlertPriorityLevel;
  createdAt: string;

  system: {
    customer: string;
  }
}


async function getAlerts(): Promise<ApiAlert[]> {
  try {
   
    const res = await fetch("https://teste-front-api-production.up.railway.app/alerts", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("API response error:", res.statusText);
      return []; 
    }

    const data = await res.json();
    
    
    console.log("Data received from API:", data);

    
    if (Array.isArray(data)) {
      return data;
    } 
    
  
    if (data && typeof data === 'object') {
      if (Array.isArray(data.data)) return data.data;
      if (Array.isArray(data.items)) return data.items;
      if (Array.isArray(data.content)) return data.content;
      if (Array.isArray(data.alerts)) return data.alerts;
      
      
      const possibleArray = Object.values(data).find(val => Array.isArray(val));
      if (possibleArray) {
        return possibleArray as ApiAlert[];
      }
    }

    console.error("The API returned an object, but no array was found inside it.", data);
    return [];
    
  } catch (error) {
    console.error("Failed to fetch alerts:", error);
    return []; 
  }
}


const priorityLevelConfig: Record<AlertPriorityLevel, { badge: string; iconBg: string; iconColor: string; label: string }> = {
  HIGH: {
    badge: "bg-red-100 text-red-600 hover:bg-red-100 border-0",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    label: "Alta",
  },
  MEDIUM: {
    badge: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-0",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    label: "Média",
  },
  LOW: {
    badge: "bg-green-100 text-green-700 hover:bg-green-100 border-0",
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    label: "Baixa",
  }
};

export async function AlertsPanel() {

  const alerts = await getAlerts();
  const safeAlerts = Array.isArray(alerts) ? alerts : [];
  
  return (
    <Card className=" bg-white h-full flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-gray-900">
              Alertas Recentes
            </CardTitle>
            <CardDescription className="text-xs text-gray-500">
              Notificações e eventos do sistema
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-gray-500 h-7 px-2 gap-1">
            Ver todos <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        <ScrollArea className="h-[320px]">
          {safeAlerts.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500">
              Nenhum alerta no momento ou falha ao carregar.
            </div>
          ) : (

          <div className="px-6 pb-4 space-y-1">
            {alerts.map((alert, index) => {
              const Icon = resolveAlertIcon(alert.title);
              const config = priorityLevelConfig[alert.priorityLevel] || priorityLevelConfig["LOW"];


              return (
                <div key={alert.systemId}>
                  <div className="flex items-start gap-3 py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer px-2 -mx-2">
                    <div className={`w-8 h-8 rounded-lg ${config.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon className={`w-4 h-4 ${config.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-gray-800 leading-tight">
                          {alert.title}
                        </p>
                        <Badge className={`text-xs font-medium px-2 py-0.5 flex-shrink-0 rounded-xl ${config.badge}`}>
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{alert.system.customer || "Descrição Vazia"}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{timeElapsed(alert.createdAt) || "Recente"}</p>
                    </div>
                  </div>
                  {index < alerts.length - 1 && <Separator className="opacity-50" />}
                </div>
              );
            })}
          </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}