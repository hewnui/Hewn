import {
  defineConfig,
  defineDocs,
} from "fumadocs-mdx/config";
import { pageSchema } from "fumadocs-core/source/schema";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema.extend({
      // Reuse Zod string shapes from pageSchema so Turbopack need not
      // resolve a bare `zod` import from this config file.
      status: pageSchema.shape.title.optional(),
      tier: pageSchema.shape.title.optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    providerImportSource: "@/components/mdx",
  },
});
