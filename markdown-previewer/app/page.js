'use client';
import { marked } from 'marked';
import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState("");

  const headerClass = 'text-xs py-2 text-left w-full text-white'
  return (
    <main className=' font-sans flex relative flex-col items-center bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 p-5 md:p-10 min-h-screen'>
      <header className='text-center text-white'>
        <h1 className='text-4xl'>Markdown Previewer</h1>
        <p className='text-xl'>Preview your markdown text</p>
      </header>
      <div id="editor" className='w-full mb-10'>
        <header className={headerClass}>
          <h1 className='text-3xl mb-5'>Edit Here!</h1>
        </header>
        <textarea value={text} onChange={(event) => setText(event.target.value)} name="editor" className='w-full h-96 block' id="editor"></textarea>
      </div>
      <div id="preview" className='w-full mb-8'>
        <header className={headerClass}>
          <h1 className='text-3xl mb-5'>Watch the Preview!🔥</h1>
        </header>
        <div dangerouslySetInnerHTML={{ __html: marked.parse(text) }} className="preview bg-white p-5 rounded-md"></div>
      </div>
      <span className='text-white absolute bottom-2'>By <a className='text-white ' href="https://github.com/frjr17">frjr17</a>🔥</span>
    </main >
  )
}
