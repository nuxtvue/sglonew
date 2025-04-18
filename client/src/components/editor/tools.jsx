import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";

export const tools = {
  list: {
    class: List,
    inlineToolbar: true,
  },

  link: {
    class: LinkTool,
    config: {
      endpoint: "http://localhost:3000/api/parse",
    },
  },

  header: {
    class: Header,
    inlineToolbar: true,

    config: {
      placeholder: "Заголовок",
      levels: [2, 3, 4],
      defaultLevel: 2,
    },

    shortcut: "CMD+SHIFT+H",
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        rutube: {
          regex:
            /[http|https]+:\/\/(?:www\.|)rutube\.ru\/video\/([a-zA-Z0-9_\-]+)\//i,
          embedUrl: "https://rutube.ru/play/embed/<%= remote_id %>",
          html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
          height: 320,
          width: 580,
        },
        vk: true,
      },
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      defaultLevel: 2,
      placeholder: "Цитата",
    },
  },
  marker: Marker,
  inlineCode: InlineCode,
};
