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

    let spell;

    // Get the spell if it exist
    if (name?.fr) spell = await Spell.findOne({ "name.fr": name.fr });
    if (spell) return spell;
    if (name?.en) spell = await Spell.findOne({ "name.fr": name.en });
    if (spell) return spell;

    if (!spell) {
      try {
        // Create new spell
        spell = new Spell({
          name: {
            fr: name?.fr,
            en: name?.en,
          },
          description: {
            fr: description?.fr,
            en: description?.en,
          },
          mana,
          cooldown,
          image: image ? image : null,
        });
        // Save it in the database
        await spell.save();
      } catch (err) {
        // If error return null
        console.log(err);
        return null;
      }
    }
    // Return the new spell
    return spell;
  }
}
