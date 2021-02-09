import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { TypeSpell } from "../types/TypeSpell";
import Spell from "../database/schema/Spell";
import { LanguageInput } from "../input/LanguageInput";
import { SpellInput, UpdateSpellInput } from "../input/SpellInput";

@Resolver()
export class SpellResolver {
  // Get all the spells in the spellbook
  @Query(() => [TypeSpell], {
    description: "Get all the spells registred in the spellbook",
  })
  async spells() {
    // Find all the spells in the database
    let spells = await Spell.find();
    return spells;
  }

  // Get a specified spell by his id or his name
  @Query(() => TypeSpell, {
    nullable: true,
    description: "Get a spell with his id or his name",
  })
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
  @Mutation(() => TypeSpell, {
    description: "Create a spell if it doesn't exist",
  })
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

  // Update the spell
  @Mutation(() => TypeSpell, { description: "Update the spell" })
  async updateSpell(@Arg("input") input: UpdateSpellInput) {
    const { id, name, description, mana, cooldown, image } = input;

    let spell;
    try {
      spell = await Spell.findById(id);
      spell.name.fr = name && name.fr ? name.fr : spell.name.fr;
      spell.name.en = name && name.en ? name.en : spell.name.en;
      spell.description.fr =
        description && description.fr ? description.fr : spell.description.fr;
      spell.description.en =
        description && description.en ? description.en : spell.description.en;
      spell.mana = mana ? mana : spell.mana;
      spell.cooldown = cooldown ? cooldown : spell.cooldown;
      spell.image = image ? image : spell.image;

      await spell.save();
    } catch (err) {
      console.log(err);
      return null;
    }

    return spell;
  }

  // Delete a spell with his id
  @Mutation(() => Boolean, { description: "Delete the spell" })
  async deleteSpell(@Arg("id") id: string) {
    try {
      await Spell.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
