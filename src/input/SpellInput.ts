import { Field, InputType } from "type-graphql";
import { LanguageInput } from "./LanguageInput";
import { ImageInput } from "./ImageInput";

// Graphql Spell input
@InputType()
export class SpellInput {
  @Field()
  name?: LanguageInput;

  @Field()
  description?: LanguageInput;

  @Field()
  mana: number;

  @Field()
  cooldown?: number;

  @Field()
  image?: ImageInput;
}
