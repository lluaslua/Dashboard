export function timeElapsed(dateIso: string): number {
  if (!dateIso) return 0;
  
  return ((Date.now() - new Date(dateIso).getTime()) / 1000);
   
}

export function timeFormatter(time: number): string {
  if (Math.floor(time) < 60) return "menos de um minuto";
  
  const min = Math.floor(Math.floor(time) / 60);
  if (min < 60) return `${min} minute${min > 1 ? 's' : ''}`;
  
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hora${hr > 1 ? 's' : ''}`;
  
  const d = Math.floor(hr / 24);
  if (d < 30) return `${d} dia${d > 1 ? 's' : ''}`;
  
  const m = Math.floor(d / 30);
  if (m < 12) return `${m} ${m > 1 ? 'meses' : 'mês'}`;
  
  const y = Math.floor(d / 365);
  return `${y} ano${y > 1 ? 's' : ''}`;
}