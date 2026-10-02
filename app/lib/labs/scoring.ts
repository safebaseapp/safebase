import type { LabScenario, ScenarioScore } from "./types";

export function scoreMultiSelectScenario(
  scenario: LabScenario,
  selectedIds: string[],
): ScenarioScore {
  const correctIds = new Set(
    Array.isArray(scenario.correct_answer)
      ? scenario.correct_answer
      : scenario.correct_answer
        ? [scenario.correct_answer]
        : [],
  );

  const selected = new Set(selectedIds);
  const correctCount = [...selected].filter((id) => correctIds.has(id)).length;
  const incorrectCount = [...selected].filter((id) => !correctIds.has(id)).length;
  const missedCount = [...correctIds].filter((id) => !selected.has(id)).length;
  const perfect = missedCount === 0 && incorrectCount === 0 && correctIds.size > 0;

  const possible = Math.max(correctIds.size * 25 + 35, 1);
  const earned = Math.max(
    0,
    correctCount * 25 - incorrectCount * 5 + (missedCount === 0 ? 25 : 0) + (incorrectCount === 0 ? 10 : 0),
  );

  const score = Math.min(100, Math.round((earned / possible) * 100));
  const xpEarned = Math.max(1, Math.round((scenario.xp * score) / 100));

  return {
    correctCount,
    missedCount,
    incorrectCount,
    score,
    xpEarned,
    perfect,
  };
}
