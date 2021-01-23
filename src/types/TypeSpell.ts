import { Field, ObjectType } from "type-graphql";

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
  image: {
    url: string;
  };
}
