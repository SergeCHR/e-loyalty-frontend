import { CustomerAccountId, TierId, Url, UserId } from "@/api/branded-types";

import { StoreTableUser } from "@/api/models/user";
import { Tier } from "@/api/models/tier";
import { faker } from "@faker-js/faker";

export const generateFakeStoreTableUser = (): StoreTableUser => ({
  id: CustomerAccountId.parse(faker.number.int()),
  birthday: faker.date.birthdate().toISOString(),
  fullName: faker.person.fullName(),
  gender: Math.random() > 0.5 ? "Male" : "Female",
  imageUrl: Url.parse(faker.image.avatar()),
  location: faker.location.city(),
  userId: UserId.parse(faker.number.int()),
  availablePointAmount: faker.number.int({ min: 0, max: 100000 }),
  idlePointAmount: faker.number.int({ min: 0, max: 100000 }),
  tier: generateFakeTier(),
});

export const generateFakeTier = (): Tier => ({
  id: TierId.parse(faker.number.int()),
  name: faker.finance.accountName(),
  qualificationThreshold: faker.number.int({ min: 0, max: 100000 }),
});
