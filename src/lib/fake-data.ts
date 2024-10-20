import { CustomerAccountId, Url, UserId } from "@/api/branded-types";

import { BusinessTableUser } from "@/api/models/user";
import { faker } from "@faker-js/faker";
import { tiers } from "@/store";

export const generateFakeBusinessTableUser = (id: number): BusinessTableUser => {
  const pointsAmount = faker.number.int({ min: 0, max: 499 })
  return {
    id: CustomerAccountId.parse(id),
    birthday: faker.date.birthdate().toISOString(),
    fullName: faker.internet.userName(),
    gender: Math.random() > 0.5 ? "Male" : "Female",
    imageUrl: Url.parse(faker.image.avatar()),
    location: faker.location.city(),
    userId: UserId.parse(faker.number.int()),
    availablePointAmount: pointsAmount,
    idlePointAmount: faker.number.int({ min: 0, max: 0 }),
    tier: getTierName(pointsAmount),
  }
}

export function getTierName(points: number) {
  // Sort tiers by qualificationThreshold in descending order
  const sortedTiers = tiers.sort((a, b) => b.qualificationThreshold - a.qualificationThreshold);

  // Find the correct tier based on points
  for (const tier of sortedTiers) {
    if (points >= tier.qualificationThreshold) {
      return tier;
    }
  }

}
