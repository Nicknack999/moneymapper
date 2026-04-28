import { guides } from "./guides";

const live = guides.filter((g) => g.published);

export const guideCollections = {
  all: live,

  featured: live.filter((g) => g.featured),

  homepage: live
    .filter((g) => g.featured)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 4),

  studentLoans: live.filter(
    (g) => g.category === "student-loans"
  ),

  bottomTwoGuides: live
    .filter((g) => g.category === "student-loans")
    .slice(0, 2),

  calculatorPromo: live
    .filter((g) => g.category === "student-loans")
    .slice(1, 3)
};