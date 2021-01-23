import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { TypeSpell } from "../types/TypeSpell";
import Spell from "../database/schema/Spell";

@Resolver()
export class SpellResolver {
  // Get all the spells in the spellbook
  @Query(() => [TypeSpell])
  async spells() {
    // Find all the spells in the database
    let spells = await Spell.find();
    return spells;
  }

  // Get a specified spell by his id or his name
  @Query(() => TypeSpell, { nullable: true })
  async spell(@Arg("id") id?: string, @Arg("name") name?: string) {
    let spell;
    // Find the spell by his id
    if (id) spell = Spell.findById(id);
    // Find the spell by his name
    else if (name) spell = Spell.find({ name });
    // No id or name pass, return null
    else return null;
    // Return the spell
    return spell;
  }

  // Create a new spell if it doesn't exist and return it
  @Mutation(() => TypeSpell)
  async createSpell(
    @Arg("name") name: string,
    @Arg("mana") mana: number,
    @Arg("cooldown") cooldown?: number,
    @Arg("imageUrl") imageUrl?: string
  ) {
    // Check if the spell exist and return it
    let find = await Spell.find({ name });
    if (find) return find;
    let spell;
    try {
      // Create new spell
      spell = new Spell({
        name,
        mana,
        cooldown,
        image: {
          url: imageUrl,
        },
      });
      // Save it in the database
      await spell.save();
    } catch (err) {
      // If error return null
      console.log(err);
      return null;
    }
    // Return the new spell
    return spell;
  }
}
