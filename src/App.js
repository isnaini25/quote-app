import { FaTwitter, FaQuoteLeft } from 'react-icons/fa';
import { BsDownload } from 'react-icons/bs';
import { useState, useEffect, useRef } from 'react';
import DomToImage from 'dom-to-image';
function App() {
  const [quote, setQuote] = useState([]);

  const text = useRef();
  const author = useRef();
  const button = useRef();
  const quoteButton = useRef();

  const fetchQuote = async () => {
    await fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((result) => {
        setQuote(result);
        // let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        let num = Math.random();
        let bg = 'hsl(' + 360 * num + ',' + 70 + '%,' + 80 + '%)';
        let color = 'hsl(' + 360 * num + ',' + 80 + '%,' + 40 + '%)';
        text.current.textContent = result.content;
        author.current.textContent = result.author;
        text.current.style.color = color;
        document.getElementById('quote-icon').style.color = color;
        author.current.style.color = color;
        document.body.style.backgroundColor = bg;
        button.current[0].style.backgroundColor = color;
        button.current[1].style.backgroundColor = color;
        button.current[2].style.backgroundColor = color;
      });
  };

  useEffect(() => {
    button.current = document.querySelectorAll('.button');
    fetchQuote();
  }, []);

  const imageDownload = (author) => {
    DomToImage.toPng(document.getElementById('wrapper'), {
      filter: (node) => node !== quoteButton.current,
      quality: 1,
    })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'quote-by-' + author + '.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };
  return (
    <div id='wrapper'>
      <div id='quote-box'>
        <div id='quote-text'>
          <FaQuoteLeft id='quote-icon' />
          <div id='text' ref={text}>
            <div className='skeleton skeleton-text'></div>
            <div className='skeleton skeleton-text'></div>
          </div>
        </div>
        <div id='quote-author'>
          <div id='author' ref={author}>
            <div className='skeleton skeleton-text'></div>
          </div>
        </div>
        <div id='quote-button' ref={quoteButton}>
          <a
            href={`https://twitter.com/intent/tweet?hashtags=quotes&text="${quote.content}" ${quote.author}`}
            id='tweet-quote'
            target='_blank'
            rel='noreferrer'
            className='button'
            title='Tweet Quote'
          >
            <FaTwitter />
          </a>
          <button
            id='save-quote'
            target='_blank'
            rel='noreferrer'
            className='button'
            title='Save Quotes'
            onClick={() => imageDownload(quote.author)}
          >
            <BsDownload />
          </button>

          <button
            id='new-quote'
            className='button'
            onClick={fetchQuote}
            title='New Quote'
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}
// https://css-tricks.com/snippets/javascript/random-hex-color/
//https://api.quotable.io/
// https://stackoverflow.com/questions/43193341/how-to-generate-random-pastel-or-brighter-color-in-javascript
// https://github.com/tsayen/dom-to-image
export default App;
