import { TierId, UserId } from "@/api/branded-types";

import { StoreTableUser } from "@/api/models/user";
import { Tier } from "@/api/models/tier";
import { faker } from "@faker-js/faker";

export const generateFakeStoreTableUser = (): StoreTableUser => ({
  id: UserId.parse(faker.number.int()),
  dateRegistered: faker.date.past().toISOString(),
  email: faker.internet.email(),
  isVerified: faker.datatype.boolean(),
  name: faker.person.fullName(),
  userType: "USER",
  availablePointAmount: faker.number.int({ min: 0, max: 100000 }),
  idlePointAmount: faker.number.int({ min: 0, max: 100000 }),
  tier: generateFakeTier(),
});

export const generateFakeTier = (): Tier => ({
  id: TierId.parse(faker.number.int()),
  name: faker.finance.accountName(),
  qualificationThreshold: faker.number.int({ min: 0, max: 100000 }),
});
