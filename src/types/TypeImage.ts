import { Field, ObjectType } from "type-graphql";

// Graphql Image type
@ObjectType()
export class TypeImage {
  @Field()
  url: string;
}
