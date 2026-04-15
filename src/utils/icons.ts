import { Thermometer, WifiOff, TrendingDown, AlertTriangle, Info, LucideIcon } from "lucide-react";

export function resolveAlertIcon(title: string): LucideIcon {
  if (!title) return Info;
  
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("temperatura")) return Thermometer;
  if (lowerTitle.includes("offline")) return WifiOff;
  if (lowerTitle.includes("baixa")) return TrendingDown;
  if (lowerTitle.includes("interrompida")) return AlertTriangle;
  
  return Info;
}