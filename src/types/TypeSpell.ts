import { Field, ObjectType } from "type-graphql";
import { TypeImage } from "./TypeImage";
import { TypeLanguage } from "./TypeLanguage";

// Graphql Spell type
@ObjectType()
export class TypeSpell {
  @Field()
  name: TypeLanguage;

  @Field()
  description: TypeLanguage;

  @Field()
  mana: number;

  @Field()
  cooldown: number;

  @Field()
  image: TypeImage;
}
