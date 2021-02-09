import { Field, ObjectType } from "type-graphql";
import { TypeImage } from "./TypeImage";
import { TypeLanguage } from "./TypeLanguage";

// Graphql Spell type
@ObjectType()
export class TypeSpell {
  @Field({ description: "" })
  id: string;

  @Field({ description: "" })
  name: TypeLanguage;

  @Field({ nullable: true, description: "" })
  description?: TypeLanguage;

  @Field({ description: "" })
  mana: number;

  @Field({ description: "" })
  cooldown: number;

  @Field({ nullable: true, description: "" })
  image?: TypeImage;
}
