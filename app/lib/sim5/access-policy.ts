/** SIM5 shares existing profile/admin, reward and billing entitlement sources.
 * All facts must be obtained on the server. Client metadata is never a source. */
export type Sim5AccessFacts = { authenticated: boolean; active: boolean; admin: boolean; reward: boolean; billing: boolean };
export function canPlayFullMission(facts: Sim5AccessFacts): boolean {
 return facts.authenticated && facts.active && (facts.admin || facts.reward || facts.billing);
}
