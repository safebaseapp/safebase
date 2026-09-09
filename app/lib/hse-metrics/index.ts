export function calculateTRIR(
  recordableCases: number,
  workedHours: number,
): number {
  if (!Number.isFinite(recordableCases) || !Number.isFinite(workedHours)) return 0;
  if (recordableCases < 0 || workedHours <= 0) return 0;

  return (recordableCases * 200_000) / workedHours;
}

export function calculateDART(
  dartCases: number,
  workedHours: number,
): number {
  if (!Number.isFinite(dartCases) || !Number.isFinite(workedHours)) return 0;
  if (dartCases < 0 || workedHours <= 0) return 0;

  return (dartCases * 200_000) / workedHours;
}

export function calculateLTIFR(
  lostTimeInjuries: number,
  workedHours: number,
): number {
  if (!Number.isFinite(lostTimeInjuries) || !Number.isFinite(workedHours)) return 0;
  if (lostTimeInjuries < 0 || workedHours <= 0) return 0;

  return (lostTimeInjuries * 1_000_000) / workedHours;
}

export function calculateSeverityRate(
  lostDays: number,
  workedHours: number,
): number {
  if (!Number.isFinite(lostDays) || !Number.isFinite(workedHours)) return 0;
  if (lostDays < 0 || workedHours <= 0) return 0;

  return (lostDays * 200_000) / workedHours;
}

export function formatHSEMetric(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return (0).toFixed(decimals);
  return value.toFixed(decimals);
}
