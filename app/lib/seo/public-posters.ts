// Public editorial metadata only. Rendering/export/access code stays untouched.
import { workingAtHeightPoster } from "@/lib/posters-v2/working-at-height";
import { ladderSafetyPoster } from "@/lib/posters-v2/ladder-safety";
import { housekeepingSafetyPoster } from "@/lib/posters-v2/housekeeping-safety";
import { excavationSafetyPoster } from "@/lib/posters-v2/excavation-safety";
import { chemicalSafetyPoster } from "@/lib/posters-v2/chemical-safety";
import { forkliftSafetyPoster } from "@/lib/posters-v2/forklift-safety";
import { manualHandlingSafetyPoster } from "@/lib/posters-v2/manual-handling-safety";
import { droppedObjectsSafetyPoster } from "@/lib/posters-v2/dropped-objects-safety";
import { scaffoldPoster } from "@/lib/posters-v2/scaffold";
import { hotWorkPoster } from "@/lib/posters-v2/hot-work";
import { confinedSpacePoster } from "@/lib/posters-v2/confined-space";
import { electricalPoster } from "@/lib/posters-v2/electrical";
import { lotoPoster } from "@/lib/posters-v2/loto";
import { firePoster } from "@/lib/posters-v2/fire";
import { ppePoster } from "@/lib/posters-v2/ppe";

export const publicPosterPages = [
  { slug: "working-at-height-rules", title: workingAtHeightPoster.title, description: workingAtHeightPoster.slogan },
  { slug: "ladder-safety-rules", title: ladderSafetyPoster.title, description: ladderSafetyPoster.slogan },
  { slug: "housekeeping-safety-rules", title: housekeepingSafetyPoster.title, description: housekeepingSafetyPoster.slogan },
  { slug: "excavation-safety-rules", title: excavationSafetyPoster.title, description: excavationSafetyPoster.slogan },
  { slug: "chemical-safety-rules", title: chemicalSafetyPoster.title, description: chemicalSafetyPoster.slogan },
  { slug: "forklift-safety-rules", title: forkliftSafetyPoster.title, description: forkliftSafetyPoster.slogan },
  { slug: "manual-handling-safety-rules", title: manualHandlingSafetyPoster.title, description: manualHandlingSafetyPoster.slogan },
  { slug: "dropped-objects-safety-rules", title: droppedObjectsSafetyPoster.title, description: droppedObjectsSafetyPoster.slogan },
  { slug: "scaffold-safety-rules", title: scaffoldPoster.title, description: scaffoldPoster.slogan },
  { slug: "hot-work-safety-rules", title: hotWorkPoster.title, description: hotWorkPoster.slogan },
  { slug: "confined-space-entry-rules", title: confinedSpacePoster.title, description: confinedSpacePoster.slogan },
  { slug: "electrical-safety-rules", title: electricalPoster.title, description: electricalPoster.slogan },
  { slug: "loto-golden-rules", title: lotoPoster.title, description: lotoPoster.slogan },
  { slug: "fire-safety-rules", title: firePoster.title, description: firePoster.slogan },
  { slug: "mandatory-ppe", title: ppePoster.title, description: ppePoster.slogan },
] as const;
