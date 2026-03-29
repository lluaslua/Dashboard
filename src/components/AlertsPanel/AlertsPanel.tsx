import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TrendingDown, WifiOff, Thermometer, AlertTriangle, ChevronRight } from "lucide-react";

type AlertSeverity = "Alta" | "Média" | "Baixa";

interface Alert {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  severity: AlertSeverity;
  icon: React.ElementType;
}

const alerts: Alert[] = [
  {
    id: 1,
    title: "Baixa eficiência detectada",
    subtitle: "Painel Residencial Vila Olímpia",
    time: "há 15 min",
    severity: "Média",
    icon: TrendingDown,
  },
  {
    id: 2,
    title: "Inversor offline",
    subtitle: "Fazenda Solar Ribeirão",
    time: "há 2 horas",
    severity: "Alta",
    icon: WifiOff,
  },
  {
    id: 3,
    title: "Temperatura elevada",
    subtitle: "Shopping Center Sorocaba",
    time: "há 45 min",
    severity: "Média",
    icon: Thermometer,
  },
  {
    id: 4,
    title: "Falha de comunicação",
    subtitle: "Sistema Industrial Jundiaí",
    time: "há 1 hora",
    severity: "Alta",
    icon: AlertTriangle,
  },
];

const severityConfig: Record<AlertSeverity, { badge: string; iconBg: string; iconColor: string }> = {
  Alta: {
    badge: "bg-red-100 text-red-600 hover:bg-red-100 border-0",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  Média: {
    badge: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-0",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
  },
  Baixa: {
    badge: "bg-green-100 text-green-700 hover:bg-green-100 border-0",
    iconBg: "bg-green-50",
    iconColor: "text-green-500"
  }
};

export function AlertsPanel() {
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
          <div className="px-6 pb-4 space-y-1">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              const config = severityConfig[alert.severity];
              return (
                <div key={alert.id}>
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
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{alert.subtitle}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{alert.time}</p>
                    </div>
                  </div>
                  {index < alerts.length - 1 && <Separator className="opacity-50" />}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}