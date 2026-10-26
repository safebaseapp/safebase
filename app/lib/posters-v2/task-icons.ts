/** Explicit new task pictograms; no title-substring or generic fallback matching. */
export const taskIconCodes = ['hw-permit','hw-combustibles','hw-gas-test','hw-fire-watch','hw-extinguisher','hw-spark-barrier','hw-cylinders','hw-post-watch','wah-plan','wah-anchor','wah-clearance','wah-tools','wah-rescue','scf-inspect','scf-status','scf-foundation','scf-platform','scf-load'] as const;
export type TaskIconCode = typeof taskIconCodes[number];
export function isTaskIconCode(code:string):code is TaskIconCode{return (taskIconCodes as readonly string[]).includes(code)}
