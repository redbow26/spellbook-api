import { Field, ObjectType } from "type-graphql";
import { Image } from "./Image";

// Graphql Spell type
@ObjectType()
export class TypeSpell {
  @Field()
  name: string;

  @Field()
  mana: number;

  @Field()
  cooldown: number;

  @Field()
  image: Image;
}
