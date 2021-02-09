import { createSchema, Type, typedModel } from "ts-mongoose";

const SpellSchema = createSchema({
  name: {
    fr: Type.string({ required: false }),
    en: Type.string({ required: false }),
  },
  description: {
    fr: Type.string({ required: false }),
    en: Type.string({ required: false }),
  },
  mana: Type.number({ required: true }),
  cooldown: Type.number({ required: true, default: 0 }),
  image: {
    url: Type.string({ default: "" }),
  },
});

export default typedModel("Spell", SpellSchema);
