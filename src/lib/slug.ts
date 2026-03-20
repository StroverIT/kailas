// Shared slug/slugify utility used by both client and server code.
// Transliterates common Bulgarian Cyrillic characters to Latin, then
// normalizes to a url-friendly lowercase slug.
export function slugFromTitle(title: string): string {
  if (!title) return "";
  const map: Record<string, string> = {
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sht",
    Ъ: "A",
    Ы: "Y",
    Ь: "",
    Ю: "Yu",
    Я: "Ya",
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sht",
    ъ: "a",
    ы: "y",
    ь: "",
    ю: "yu",
    я: "ya",
  };

  // First transliterate character-by-character using the map.
  let s = "";
  for (const ch of title) {
    s += map[ch] ?? ch;
  }

  // Normalize: lowercase, replace non-alphanum with hyphens, collapse hyphens.
  s = s
    .toLowerCase()
    .trim()
    // replace any character that is not a-z, 0-9 with a hyphen
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return s;
}

export default slugFromTitle;
