import { Field, ObjectType } from "type-graphql";

// Graphql Spell type
@ObjectType()
export class Image {
  @Field()
  url: string;
}
