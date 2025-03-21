export const translit = (word) => {
  let answer = "";
  const converter = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
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
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ь: "",
    ы: "y",
    ъ: "",
    э: "e",
    ю: "yu",
    я: "ya",
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "E",
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
    Ц: "C",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sch",
    Ь: "",
    Ы: "Y",
    Ъ: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
    " ": "-",
    "?": "",
    "!": "",
    ".": "",
    ",": "",
    _: "",
    "(": "",
    ")": "",
    "/": "",
    "\\": "",
    ";": "",
    ":": "",
    "“": "",
    "”": "",
    "‘": "",
    "’": "",
    "«": "",
    "»": "",
    "–": "-",
  };

  for (let i = 0; i < word.length; ++i) {
    answer += converter[word[i]] !== undefined ? converter[word[i]] : word[i];
  }

  // Удаляем лишние дефисы и пробелы
  answer = answer
    .replace(/--+/g, "-") // Заменяем несколько дефисов на один
    .replace(/^-+|-+$/g, "") // Удаляем дефисы в начале и конце
    .toLowerCase(); // Приводим к нижнему регистру

  return answer;
};
