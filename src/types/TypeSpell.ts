import { Field, ObjectType } from "type-graphql";
import { TypeImage } from "./TypeImage";
import { TypeLanguage } from "./TypeLanguage";

// Graphql Spell type
@ObjectType()
export class TypeSpell {
  @Field({ description: "Id of the spell" })
  id: string;

  @Field({ description: "Name of the spell in multiple language" })
  name: TypeLanguage;

  @Field({
    nullable: true,
    description: "Description of the spell in multiple language",
  })
  description?: TypeLanguage;

  @Field({ description: "Mana of the spell" })
  mana: number;

  @Field({ description: "Cooldown of the spell" })
  cooldown: number;

  @Field({ nullable: true, description: "Image of the spell" })
  image?: TypeImage;
}
