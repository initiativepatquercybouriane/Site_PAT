const opt = (o) => new Intl.DateTimeFormat("fr-FR", { timeZone: "UTC", ...o });
const today = () => new Date(new Date().setHours(0, 0, 0, 0));
export default function (c) {
  c.addPassthroughCopy({ "src/css": "css" });
  c.addPassthroughCopy("src/admin");
  c.addPassthroughCopy("src/images");
  c.addFilter("dateFr", (d) => opt({ day: "numeric", month: "long", year: "numeric" }).format(d));
  c.addFilter("head", (a, n) => a.slice(0, n));
  c.addFilter("jour", (d) => opt({ day: "2-digit" }).format(d));
  c.addFilter("moisAnnee", (d) => opt({ month: "short", year: "numeric" }).format(d));
  c.addFilter("upcoming", (a) => a.filter((e) => e.date >= today()));
  c.addFilter("past", (a) => a.filter((e) => e.date < today()).reverse());
  c.addCollection("actualites", (x) => x.getFilteredByGlob("src/content/actualites/*.md").sort((a, b) => b.date - a.date));
  c.addCollection("evenements", (x) => x.getFilteredByGlob("src/content/evenements/*.md").sort((a, b) => a.date - b.date));
  c.addCollection("groupes", (x) => x.getFilteredByGlob("src/content/groupes/*.md").sort((a, b) => (a.data.ordre || 0) - (b.data.ordre || 0)));
  return { dir: { input: "src", output: "_site" } };
}
