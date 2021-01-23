import { Field, ObjectType } from "type-graphql";

// Graphql Image type
@ObjectType()
export class Image {
  @Field()
  url: string;
}
