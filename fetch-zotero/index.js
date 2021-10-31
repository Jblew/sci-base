const { getFromZotero } = require("./utils");

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

  const bibtex = await getFromZotero("items", { format: "bibtex" });
  console.log(bibtex);
}
