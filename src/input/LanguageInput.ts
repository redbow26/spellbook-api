import { Field, InputType } from "type-graphql";

// Graphql Language input
// Use for every type that need different language string
@InputType()
export class LanguageInput {
  @Field()
  fr?: string;

  @Field()
  en?: string;
}
