import { Field, ObjectType } from "type-graphql";

// Graphql Language type
// Use for every type that need different language string
@ObjectType()
export class TypeLanguage {
  @Field({ nullable: true, description: "" })
  fr?: string;

  @Field({ nullable: true, description: "" })
  en?: string;
}
