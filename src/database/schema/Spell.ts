import { createSchema, Type, typedModel } from "ts-mongoose";

const SpellSchema = createSchema({
  name: Type.string({ required: true }),
  mana: Type.number({ required: true }),
  cooldown: Type.number({ required: true, default: 0 }),
  image: {
    url: Type.string({ default: "" }),
  },
});

export default typedModel("Spell", SpellSchema);
