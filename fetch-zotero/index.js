const { getFromZotero, writeToFile } = require("./utils");

const BIBTEX_PATH = process.env.BIBTEX_PATH;
if (!BIBTEX_PATH) throw new Error("Missing env BIBTEX_PATH");
const ZOTEROJSON_PATH = process.env.ZOTEROJSON_PATH;
if (!ZOTEROJSON_PATH) throw new Error("Missing env ZOTEROJSON_PATH");

(async (startFn) => {
  try {
    await startFn();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})(fetchFromZotero);

async function fetchFromZotero() {
  const items = await getFromZotero("items", { format: "json" });
  console.log(items);
  await writeToFile(ZOTEROJSON_PATH, JSON.stringify(items, undefined, 2));

  const bibtex = await getFromZotero("items", { format: "bibtex" });
  console.log(bibtex);
  await writeToFile(BIBTEX_PATH, bibtex);
  console.log("Done");
}
