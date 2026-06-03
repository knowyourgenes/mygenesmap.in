import type { SchemaTypeDefinition } from "sanity";
import { homepage } from "./homepage";
import { space } from "./space";
import { expert } from "./expert";
import { question } from "./question";
import { trending } from "./trending";
import { submission } from "./submission";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, space, expert, question, trending, submission],
};
