import { StatsCard } from "@/components/StatsCard/StatsCard";
import { EnergyChart } from "@/components/EnergyChart/EnergyChart";
import { AlertsPanel } from "@/components/AlertsPanel/AlertsPanel";
import { SystemsDataTable } from "@/components/SystemsDataTable/SystemsDataTable"

export default function Home() {
  return (
    <main className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Visão geral do monitoramento de energia solar</p>
      </div>
      <div>
    <StatsCard/>
      </div>
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2">
            <EnergyChart />
          </div>
          <AlertsPanel />
      </div>
      <div>
        <SystemsDataTable/>
      </div>

    </main>
  );
}
