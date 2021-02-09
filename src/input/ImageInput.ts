import { Field, InputType } from "type-graphql";

// Graphql Image input
@InputType()
export class ImageInput {
  @Field()
  url: string;
}
