import { Field, ObjectType } from "type-graphql";

// Graphql Language type
// Use for every type that need different language string
@ObjectType()
export class Language {
  @Field()
  fr?: string;

  @Field()
  en?: string;
}
