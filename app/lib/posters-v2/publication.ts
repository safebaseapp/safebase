/** Editorial changes, not expert approval or independent verification dates.
 * Revision 2.0: P13 readability, semantic icons, scoped controls and color/technical review.
 * Date is the actual repository edit date. Git history and FINAL-REVISION.md record evidence. */
const codes=['SRN-WAH-001','SRN-LAD-001','SRN-HSK-001','SRN-EXC-001','SRN-CHM-001','SRN-FLT-001','SRN-MH-001','SRN-DO-001','SRN-SCF-001','SRN-HW-001','SRN-CS-001','SRN-EL-001','SRN-LOTO-001','SRN-FIRE-001','SRN-PPE-001'] as const;
export function getPosterPublication(code:string){return codes.some(c=>c===code)?{revision:'2.0',updatedAt:'2026-10-26',kind:'editorial-update' as const}:undefined}
