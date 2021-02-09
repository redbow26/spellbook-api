import { Field, ObjectType } from "type-graphql";

// Graphql Image type
@ObjectType()
export class TypeImage {
  @Field({ description: "Url of the image" })
  url: string;
}
