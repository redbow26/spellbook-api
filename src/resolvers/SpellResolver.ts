import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { TypeSpell } from "../types/TypeSpell";
import Spell from "../database/schema/Spell";
import { LanguageInput } from "../input/LanguageInput";
import { SpellInput } from "../input/SpellInput";

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
  async spell(@Arg("id") id?: string, @Arg("name") name?: LanguageInput) {
    let spell;
    // Find the spell by his id
    if (id) spell = Spell.findById(id);
    // Find the spell by his name
    else if (name?.fr) spell = Spell.find({ "name.fr": name.fr });
    else if (name?.en) spell = Spell.find({ "name.fr": name.en });
    // No id or name pass, return null
    else return null;
    // Return the spell
    return spell;
  }

  // Create a new spell if it doesn't exist and return it
  @Mutation(() => TypeSpell)
  async createSpell(@Arg("input") input: SpellInput) {
    const { name, description, mana, cooldown, image } = input;

    // Check if the spell exist and return it
    let find = await Spell.find({ "name.fr": name?.fr });
    if (find) return find;
    find = await Spell.find({ "name.en": name?.en });
    if (find) return find;
    let spell;
    try {
      // Create new spell
      spell = new Spell({
        name,
        description,
        mana,
        cooldown,
        image,
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
