import { Inter } from 'next/font/google';
import { BlockNote } from './editors/BlockNote';
import { Lexical } from './editors/lexical/Lexical';
import { NoSSR } from './utils';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

const Editorjs = dynamic(() => import("./editors/editorjs/Editorjs").then(exports => exports.Editorjs), { ssr: false });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen pb-10 flex-col space-y-3 ${inter.className}`}
    >
      <div className="container">
        <h1>Text editors benchmark</h1>
        <h2><a href="https://www.blocknotejs.org/docs/introduction" target='_blank'>BlockNode</a> </h2>
        <div className='card'>
          <BlockNote />
        </div>
        <div>Promising, but images KO, <a href="https://github.com/TypeCellOS/BlockNote/issues/145" target='_blank'>not supported yet</a></div>
        <h2><a href="https://lexical.dev/docs/getting-started/react" target="_blank" rel="noopener noreferrer">Lexical</a></h2>
        <div className="card">
          <Lexical />
        </div>
        <div>Seems low-level and complex, very few onboarding doc or tuto. But <a href="https://github.com/facebook/lexical/tree/main/packages/lexical-playground" target='_blank'>the playground</a> should cover all the features we want.</div>
        <h2><a href="https://editorjs.io/getting-started/" target="_blank" rel="noopener noreferrer">Editor.js</a></h2>
      </div>
      {/* <div className="card"> */}
      <Editorjs />
      {/* </div> */}
    </main>
  );
}
