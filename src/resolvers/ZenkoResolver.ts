import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { TypeZenko } from "../types/TypeZenko";
import { Context } from "vm";

@Resolver()
export class ZenkoResolver {
  // Get all the stats of zenko
  @Query(() => TypeZenko, {
    description: "Get all the stats of zenko",
  })
  async stats(@Ctx() context: Context) {
    return context.zenko;
  }

  // Damage zenko's health
  @Mutation(() => TypeZenko, {
    description: "Damage zenko's health",
  })
  async takeDamage(@Ctx() context: Context, @Arg("damage") damage: number) {
    context.zenko.takeDamage(damage);
    return context.zenko;
  }

  // Regen zenko's health
  @Mutation(() => TypeZenko, {
    description: "Regen zenko's health",
  })
  async regenHealth(@Ctx() context: Context, @Arg("health") health: number) {
    context.zenko.regenHealth(health);
    return context.zenko;
  }

  // Set zenko's max health
  @Mutation(() => TypeZenko, {
    description: "Set zenko's max health",
  })
  async setMaxHealth(
    @Ctx() context: Context,
    @Arg("maxHealth") maxHealth: number
  ) {
    context.zenko.maxHealth(maxHealth);
    return context.zenko;
  }

  // Use zenko's mana
  @Mutation(() => TypeZenko, {
    description: "Use zenko's mana",
  })
  async useMana(@Ctx() context: Context, @Arg("mana") mana: number) {
    context.zenko.useMana(mana);
    return context.zenko;
  }

  // Regen zenko's mana
  @Mutation(() => TypeZenko, {
    description: "Regen zenko's mana",
  })
  async regenMana(@Ctx() context: Context, @Arg("mana") mana: number) {
    context.zenko.regenMana(mana);
    return context.zenko;
  }

  // Set zenko's max mana
  @Mutation(() => TypeZenko, {
    description: "Set zenko's max mana",
  })
  async setMaxMana(@Ctx() context: Context, @Arg("maxMana") maxMana: number) {
    context.zenko.maxMana(maxMana);
    return context.zenko;
  }
}
