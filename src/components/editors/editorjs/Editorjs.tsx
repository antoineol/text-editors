import EditorJS from '@editorjs/editorjs';
import type EditorJSType from '@editorjs/editorjs';
import edjsHtml from 'editorjs-html';
import { FC, memo, useEffect, useRef } from 'react';
import { linkToolParser } from './linkToolParser';

// const EditorJS = dynamic(() => import('@editorjs/editorjs'), {
//   ssr: false
// });

// Inspiration for global setup:
// https://reacthustle.com/blog/ultimate-guide-on-how-to-setup-editorjs-with-nextjs-12-typescript

const DEFAULT_INITIAL_DATA = {
  "time": new Date().getTime(),
  "blocks": [
    {
      "type": "header",
      "data": {
        "text": "This is my awesome editor!",
        "level": 2
      }
    },
    {
      "type": "linkTool",
      "data": {
        "link": "https://www.lemonde.fr/politique/article/2023/06/11/climat-les-recettes-brunes-de-l-etat-angle-mort-du-debat-sur-le-financement-de-la-transition_6177114_823448.html",
        "meta": {
          "title": "Climat : les « recettes brunes » de l’Etat, angle mort du débat sur le financement de la transition",
          "site_name": "Le Monde.fr",
          "description": "ANALYSE. La perte des taxes sur la consommation d’énergies fossiles, amenées théoriquement à disparaître avec la transition énergétique, pourrait se chiffrer à 13 points de PIB à l’horizon 2050. Un enjeu de finances publiques majeur.",
          "image": {
            "url": "https://img.lemde.fr/2023/06/08/0/29/5685/3790/1440/960/60/0/02d2301_1686238088729-2023-01-12t105501z-1369988159-rc2xoy9oq50z-rtrmadp-3-france-energy.JPG"
          }
        }
      }
    },
    {
      "type": "image",
      "data": {
        "file": {
          "url": "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg"
        },
        "caption": "Une super voiture",
        "withBorder": false,
        "stretched": false,
        "withBackground": false
      }
    }
  ]
};

const edjsParser = edjsHtml({ linkTool: linkToolParser });

interface Props {}

export const Editorjs: FC<Props> = memo(function Editorjs(props) {
  const {} = props;

  const editorRef = useRef<EditorJSType | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  // const initRef = useRef(false);

  useEffect(() => {
    // if (!initRef.current) {
    //   initRef.current = true;
    if (!editorRef.current) {
      // import('@editorjs/editorjs').then(EditorJS => {
      const editor = new EditorJS({
        tools: {
          header: {
            class: require('@editorjs/header')/* Header as any */,
            config: {
              placeholder: 'Enter a header',
              levels: [2, 3, 4, 5, 6],
              defaultLevel: 2
            }
          },
          list: require('@editorjs/list'),
          linkTool: {
            class: require('@editorjs/link'),
            config: {
              endpoint: '/api/url-preview', // Your backend endpoint for url data fetching,
            }
          },
          image: {
            // https://github.com/editor-js/image
            class: require('@editorjs/image'),
            config: {
              endpoints: {
                // Upload file
                byFile: '/api/image-upload', // Your backend file uploader endpoint
                // Upload by URL
                byUrl: '/api/image-upload', // Your endpoint that provides uploading by Url
              }
            }
          },
        },
        holder: holderRef.current!,
        onReady: () => {
          // editorRef.current = editor;
          // editor.blocks.renderFromHTML('<p style="color: red">Voyons voir comment rend le fil d\'ariane.2</p>');
        },
        // autofocus: true,
        placeholder: 'Let\'s write an awesome story!',
        data: DEFAULT_INITIAL_DATA,
        onChange: async (/* api, event */) => {
          let content = await editor.saver.save();

          console.log(content);
          // https://github.com/pavittarx/editorjs-html
          // Alternative: https://github.com/miadabdi/editorjs-parser
          const html = edjsParser.parse(content);
          console.log(html);
        },
      });
      editorRef.current = editor;
      // });
    }
    return () => {
      // This code also cleans up when hot reloading, which reinitializes each time the code changes.
      // the `if` is to check if the initialization is finished.
      // In Strict mode, react runs useEffect twice immediately, before the editor finished the first initialization.
      // If editorRef.current, we have 2 instances of editor set.
      // Inspiration: https://dev.to/sumankalia/how-to-integrate-editorjs-in-reactjs-2l6l
      if (editorRef.current?.destroy) {
        editorRef.current?.destroy();
        editorRef.current = null;
        // initRef.current = false;
      }
    };
  }, []);
  // pl-16
  return <div ref={holderRef} className="prose max-w-full pl-16 pr-8" />;
});