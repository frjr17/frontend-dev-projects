'use client';
import { useDispatch, useSelector } from 'react-redux'
import { getQuotes, newColor, newQuote } from './store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareTumblr, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';


export default function Home() {
  // Extracting data from state and dispatch function.
  const { quote, author, quotes, color } = useSelector(state => state.quoteReducer);
  const dispatch = useDispatch();

  // Setting an equal CSS object for social media icons.
  const iconStyle = {
    width: 'inherit',
    height: "inherit",
    color,
    transition: "ease-in-out",
    transitionDuration: "1000ms"
  }

  /**Function that changes quotes randomly and sets the new quotes in state. */
  const changeQuote = async () => {
    // Initializing new Quote
    let newRandomQuote = { quote: "", author: "" }

    // Changing color immediately
    dispatch(newColor())

    // If there's no more quotes in system, then fetch them from the API. If there are, then just randomly selecting it.
    if (!quotes.length) {
      const { data } = await axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      const newQuotes = data.quotes

      // Saving quotes array in state.
      dispatch(getQuotes({ quotes: newQuotes }));

      // Setting new Quote
      newRandomQuote = newQuotes[Math.floor(Math.random() * (newQuotes.length - 1))]
    } else {
      newRandomQuote = quotes[Math.floor(Math.random() * (quotes.length - 1))]
    }
    // Saving random selected quote in state.
    dispatch(newQuote(newRandomQuote))
  }

  // Preparing twitter link with quote
  const twitterLink = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
    encodeURIComponent('"' + quote + '" ' + author)

  // Preparing tumblr link with quote
  const tumblrLink = 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
    encodeURIComponent(author) +
    '&content=' +
    encodeURIComponent(quote) +
    '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'

  return (
    <main style={{ backgroundColor: color }} className="transition ease-in-out duration-1000">
      <div id={'quote-box'} className={`container  font-sans flex justify-center items-center h-screen flex-col `}>
        <header className={"mb-9"}>
          <h1 className='text-white text-4xl font-bold font-sans '>Random Quote Generator</h1>
          <span className="italic text-2xl text-center block text-white">A quote, a day...</span>
        </header>
        <div className="quote-container mb-3 rounded-md md:w-1/2 w-11/12 text-black p-5 bg-white">
          <div id={"text"} className="quote mb-8">
            <div style={{ color }} className="quote-text transition ease-in-out duration-1000 font-bold text-center text-2xl"><span className="quote-sign text-5xl font-display mr-3 ml-2">&quot;</span>{quote}</div>
            <div style={{ color }} className="quote-author transition ease-in-out duration-1000 text-right italic">- {author}</div>
          </div>
          <div id={"author"} className="buttons flex justify-between items-center">
            <div className="social-media">
              <a href={twitterLink} className="w-10 h-10 mx-2 "><FontAwesomeIcon icon={faSquareTwitter} style={iconStyle} /></a>
              <a id={"tweet-quote"} href={tumblrLink} className="w-10 h-10 mx-2 "><FontAwesomeIcon icon={faSquareTumblr} style={iconStyle} /></a>
            </div>
            <button id={'new-quote'} onClick={changeQuote} style={{ backgroundColor: color }} className="new-quote transition ease-in-out duration-1000 hover:animate-bounce animate-none text-white h-10 px-4 rounded-md">New Quote</button>
          </div>
        </div>
        <span className="author text-sm text-white ">By <a className='underline' href="https://github.com/frjr17">frjr17</a> 📍📍</span>
      </div>
    </main>
  )
}
