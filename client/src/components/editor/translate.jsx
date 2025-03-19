export const translate = {
  messages: {
    ui: {
      blockTunes: {
        toggler: {
          "Click to tune": "Нажмите, чтобы настроить",
          "or drag to move": "или перетащите",
        },
      },
      inlineToolbar: {
        converter: {
          "Convert to": "Конвертировать в",
        },
      },
      toolbar: {
        toolbox: {
          Add: "Добавить",
          "Click to add": "Нажмите, чтобы добавить",
          "Search for a tool": "Поиск инструмента",
        },
      },
      popover: {
        Filter: "Поиск",
        "Nothing found": "Ничего не найдено",
        "Convert to": "Конвертировать в",
      },
    },

    /**
     * Section for translation Tool Names: both block and inline tools
     */
    toolNames: {
      Text: "Параграф",
      Heading: "Заголовок",
      List: "Список",
      Warning: "Примечание",
      Checklist: "Чеклист",
      Quote: "Цитата",
      Code: "Код",
      Delimiter: "Разделитель",
      "Raw HTML": "HTML-фрагмент",
      Table: "Таблица",
      Link: "Ссылка",
      Marker: "Маркер",
      Bold: "Полужирный",
      Italic: "Курсив",
      InlineCode: "Моноширинный",
      Image: "Изображение",
      "Unordered List": "Маркированный список",
      "Ordered List": "Нумерованный список",
      "Text Alignment": "Выравнивание текста",
      "Font Size": "Размер шрифта",
      "Font Family": "Шрифт",
      Strikethrough: "Зачеркнутый",
      Underline: "Подчеркнутый",
      Subscript: "Нижний индекс",
      Superscript: "Верхний индекс",
      Embed: "Встраиваемый контент",
    },

    /**
     * Section for passing translations to the external tools classes
     */
    tools: {
      /**
       * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
       * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
       */
      warning: {
        // <-- 'Warning' tool will accept this dictionary section
        Title: "Название",
        Message: "Сообщение",
      },

      /**
       * Link is the internal Inline Tool
       */
      link: {
        "Add a link": "Вставьте ссылку",
        "Edit link": "Редактировать ссылку",
        "Open in new tab": "Открыть в новой вкладке",
        "Remove link": "Удалить ссылку",
      },
      /**
       * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
       */
      stub: {
        "The block can not be displayed correctly.":
          "Блок не может быть отображен",
      },
      image: {
        Caption: "Подпись",
        "Select an Image": "Выберите изображение",
        "With border": "Добавить рамку",
        "Stretch image": "Растянуть",
        "With background": "Добавить подложку",
        "Upload image": "Загрузить изображение",
        "Image URL": "URL изображения",
      },
      code: {
        "Enter a code": "Введите код",
        "Select language": "Выберите язык",
      },
      linkTool: {
        Link: "Ссылка",
        "Couldn't fetch the link data": "Не удалось получить данные",
        "Couldn't get this link data, try the other one":
          "Не удалось получить данные по ссылке, попробуйте другую",
        "Wrong response format from the server": "Неполадки на сервере",
        "Enter link URL": "Введите URL ссылки",
      },
      header: {
        Header: "Заголовок",
        "Heading 1": "Заголовок 1",
        "Heading 2": "Заголовок 2",
        "Heading 3": "Заголовок 3",
        "Heading 4": "Заголовок 4",
        "Heading 5": "Заголовок 5",
        "Heading 6": "Заголовок 6",
      },
      quote: {
        Quote: "Цитата",
        "Enter quote": "Введите цитату",
        "Align Left": "По левому краю",
        "Align Center": "По центру",
        "Align Right": "По правому краю",
        Caption: "Автор",
      },
      paragraph: {
        "Enter something": "Введите текст",
      },
      list: {
        Ordered: "Нумерованный",
        Unordered: "Маркированный",
        Checklist: "Чеклист",
        "Start with": "Начать с",
        "Counters type": "Тип счетчика",
        "Add item": "Добавить пункт",
        "Delete item": "Удалить пункт",
      },
      embed: {
        "Enter a URL": "Введите URL",
        "Embed URL": "URL для встраивания",
        "Embed in Editor": "Встроить в редактор",
      },
      table: {
        "Add column": "Добавить столбец",
        "Add row": "Добавить строку",
        "Delete column": "Удалить столбец",
        "Delete row": "Удалить строку",
        "With headings": "С заголовками",
        "Without headings": "Без заголовков",
      },
    },

    /**
     * Section allows to translate Block Tunes
     */
    blockTunes: {
      /**
       * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
       * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
       *
       * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
       */
      delete: {
        Delete: "Удалить",
        "Click to delete": "Удалить",
      },
      moveUp: {
        "Move up": "Переместить вверх",
      },
      moveDown: {
        "Move down": "Переместить вниз",
      },
      textAlign: {
        "Align left": "По левому краю",
        "Align center": "По центру",
        "Align right": "По правому краю",
        "Align justify": "По ширине",
      },
    },
  },
};
