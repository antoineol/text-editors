import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Editorjs = dynamic(() => import("../components/editors/editorjs/Editorjs").then(exports => exports.Editorjs), { ssr: false });

// import { BlockNote } from '../components/editors/BlockNote';
const BlockNote = dynamic(() => import("../components/editors/BlockNote").then(exports => exports.BlockNote), { ssr: false });

// import { Lexical } from '../components/editors/lexical/Lexical';
const Lexical = dynamic(() => import("../components/editors/lexical/Lexical").then(exports => exports.Lexical), { ssr: false });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen pb-10 flex-col space-y-3 ${inter.className}`}
    >
      {/* <h1 className='container'>Text editors benchmark</h1> */}
      <h2 className='container'><a href="https://editorjs.io/getting-started/" target="_blank" rel="noopener noreferrer">Editor.js</a></h2>
      {/* <div className="card"> */}
      <Editorjs />
      {/* </div> */}
      {/* <div>The best candidate</div>

      <div className="container">
        <h2><a href="https://www.blocknotejs.org/docs/introduction" target='_blank'>BlockNode</a> </h2>
        <div className='card'>
          <BlockNote />
        </div>
        <div>Promising, but images KO, <a href="https://github.com/TypeCellOS/BlockNote/issues/145" target='_blank'>not supported yet</a>. To watch closely.</div>

        <h2><a href="https://lexical.dev/docs/getting-started/react" target="_blank" rel="noopener noreferrer">Lexical</a></h2>
        <div className="card">
          <Lexical />
        </div>
        <div>Seems low-level and complex, very few onboarding doc or tuto. But <a href="https://github.com/facebook/lexical/tree/main/packages/lexical-playground" target='_blank'>the playground</a> should cover all the features we want.</div>
      </div> */}
    </main>
  );
}
