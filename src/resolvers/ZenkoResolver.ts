import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { TypeZenko } from "../types/TypeZenko";
import { Context } from "vm";

@Resolver()
export class ZenkoResolver {
  // Get all the stats of zenko
  @Query(() => TypeZenko, {
    description: "Get all the stats of zenko",
  })
  async stats(@Ctx() { zenko }: Context) {
    return zenko;
  }

  // Damage zenko's health
  @Mutation(() => TypeZenko, {
    description: "Damage zenko's health",
  })
  async takeDamage(
    @Ctx()
    { zenko }: Context,
    @Arg("damage") damage: number
  ) {
    zenko.takeDamage(damage);
    return zenko;
  }

  // Regen zenko's health
  @Mutation(() => TypeZenko, {
    description: "Regen zenko's health",
  })
  async regenHealth(
    @Ctx()
    { zenko }: Context,
    @Arg("health") health: number
  ) {
    zenko.regenHealth(health);
    return zenko;
  }

  // Set zenko's max health
  @Mutation(() => TypeZenko, {
    description: "Set zenko's max health",
  })
  async setMaxHealth(
    @Ctx()
    { zenko }: Context,
    @Arg("maxHealth") maxHealth: number
  ) {
    zenko.maxHealth(maxHealth);
    return zenko;
  }

  // Use zenko's mana
  @Mutation(() => TypeZenko, {
    description: "Use zenko's mana",
  })
  async useMana(
    @Ctx()
    { zenko }: Context,
    @Arg("mana") mana: number
  ) {
    zenko.useMana(mana);
    return zenko;
  }

  // Regen zenko's mana
  @Mutation(() => TypeZenko, {
    description: "Regen zenko's mana",
  })
  async regenMana(
    @Ctx()
    { zenko }: Context,
    @Arg("mana") mana: number
  ) {
    zenko.regenMana(mana);
    return zenko;
  }

  // Set zenko's max mana
  @Mutation(() => TypeZenko, {
    description: "Set zenko's max mana",
  })
  async setMaxMana(
    @Ctx()
    { zenko }: Context,
    @Arg("maxMana") maxMana: number
  ) {
    zenko.maxMana(maxMana);
    return zenko;
  }
}
