"use strict";
export const createFastify = (fastify) => {
  fastify.addContentTypeParser(
    "application/json",
    { parseAs: "string" },
    (_, body, done) => {
      try {
        const newBody = {
          raw: body,
          parsed: JSON.parse(String(body))
        };
        done(null, newBody);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err);
        }
      }
    }
  );
  return fastify;
};
