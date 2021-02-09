import { Field, InputType } from "type-graphql";
import { LanguageInput } from "./LanguageInput";
import { ImageInput } from "./ImageInput";

// Graphql Spell input
@InputType()
export class SpellInput {
  @Field({
    nullable: true,
    description: "Name of the spell in multiple language",
  })
  name?: LanguageInput;

  @Field({
    nullable: true,
    description: "Description of the spell in multiple language",
  })
  description?: LanguageInput;

  @Field({ description: "Mana of the spell" })
  mana: number;

  @Field({ nullable: true, description: "Cooldown of the spell" })
  cooldown?: number;

  @Field({ nullable: true, description: "Image of the spell" })
  image?: ImageInput;
}

// Graphql Spell input
@InputType()
export class UpdateSpellInput {
  @Field({ description: "Id of the spell" })
  id: string;

  @Field({
    nullable: true,
    description: "Name of the spell in multiple language",
  })
  name?: LanguageInput;

  @Field({
    nullable: true,
    description: "Description of the spell in multiple language",
  })
  description?: LanguageInput;

  @Field({ description: "Mana of the spell" })
  mana: number;

  @Field({ nullable: true, description: "Cooldown of the spell" })
  cooldown?: number;

  @Field({ nullable: true, description: "Image of the spell" })
  image?: ImageInput;
}
