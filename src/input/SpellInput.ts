import { Field, InputType } from "type-graphql";
import { LanguageInput } from "./LanguageInput";
import { ImageInput } from "./ImageInput";

// Graphql Spell input
@InputType()
export class SpellInput {
  @Field({ nullable: true, description: "" })
  name?: LanguageInput;

  @Field({ nullable: true, description: "" })
  description?: LanguageInput;

  @Field({ description: "" })
  mana: number;

  @Field({ nullable: true, description: "" })
  cooldown?: number;

  @Field({ nullable: true, description: "" })
  image?: ImageInput;
}
