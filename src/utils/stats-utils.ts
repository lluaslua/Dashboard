import { EnergySystem } from "@/types/energy-system";
import { formatToDDMM } from "./time-utils";

export const calculateDailyEnergy = (hourlyProduction: number): number => {
  return hourlyProduction * 24;
};

export const calculateMonthlyEnergy = (dailyEnergy: number): number => {
  return dailyEnergy * 30;
};

export const convertKwhToMwh = (kwh: number): string => {
  return (kwh / 1000).toFixed(1);
};

export const formatNumberBR = (value: number): string => {
  return value.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
};


export const summarizeSystemsData = (systems: EnergySystem[]) => {
  const initial = {
    totalDailyEnergy: 0,
    totalMonthlyEnergy: 0,
    onlineCount: 0,
    alertCount: 0,
    efficiencySum: 0,
  };

  const totals = systems.reduce((acc, system) => {
    const daily = calculateDailyEnergy(system.hourlyProduction);
    
    return {
      totalDailyEnergy: acc.totalDailyEnergy + daily,
      totalMonthlyEnergy: acc.totalMonthlyEnergy + calculateMonthlyEnergy(daily),
      onlineCount: system.status === "ONLINE" ? acc.onlineCount + 1 : acc.onlineCount,
      alertCount: system.alerts.length > 0 ? acc.alertCount + 1 : acc.alertCount,
      efficiencySum: acc.efficiencySum + system.efficiency,
    };
  }, initial);

  const averageEfficiency = systems.length > 0 
    ? (totals.efficiencySum / systems.length).toFixed(1) 
    : "0";

  return {
    dailyEnergy: formatNumberBR(totals.totalDailyEnergy),
    monthlyEnergy: convertKwhToMwh(totals.totalMonthlyEnergy),
    onlineCount: totals.onlineCount.toString(),
    alertCount: totals.alertCount.toString(),
    averageEfficiency,
  };
};

export const generateChartData = (systems: EnergySystem[]) => {
  const groupedData: Record<string, number> = {};

  
  systems.forEach((system) => {
    
    const fullDate = system.createdAt.split('T');
    const dailyProduction = system.hourlyProduction * 24;

    if (!groupedData[fullDate[0]]) {
      groupedData[fullDate[0]] = 0;
    }
    groupedData[fullDate[0]] += dailyProduction;
  });


  const chartData = Object.entries(groupedData)
   
    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
  
    .map(([fullDate, totalKwh]) => {
      return {
        Date: formatToDDMM(fullDate), 
        kwh: Number(totalKwh.toFixed(1)),
      };
    });

  return chartData;
};