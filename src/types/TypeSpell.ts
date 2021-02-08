import { Field, ObjectType } from "type-graphql";
import { Image } from "./Image";
import { Language } from "./Language";

// Graphql Spell type
@ObjectType()
export class TypeSpell {
  @Field()
  name: Language;

  @Field()
  description: Language;

  @Field()
  mana: number;

  @Field()
  cooldown: number;

  @Field()
  image: Image;
}
