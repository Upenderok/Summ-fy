import { useState, useEffect } from "react";
import {copy, linkIcon, loader, tick} from '../assets';
import {useLazyGetSummaryQuery} from '../services/article';

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
     const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
     )
     if (articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage)
     }
     }, []);

  const handleSubmit = async(e) => {
    // fecth summary
    e.preventDefault();
    const {data} = await getSummary({ articleUrl: article.url});

    if(data?.summary){
      const newArticle = {
        ...article, summary: data.summary
      };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      //console.log(newArticle);
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  }
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => (false), 3000);
  }
  return (
    <section className="mt-16 w-full max-w-xl">
       {/* {Search} */}
       <div className="flex flex-col w-full
       gap-2">
        <form
        className="relative flex
        justify-center items-center"
        onSubmit={handleSubmit} >
          <img
          src ={linkIcon}
          alt="link_icon"
          className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
          type="url"
          placeholder="Enter a URL"
          value={article.url}
          onChange={(e) => setArticle({ ...article, url: e.target.value })}

          required
          className="url_input peer"
          />
          <button
          type ="submit"
          className="submit_btn
          peer-focus:border-gray-700
          peer-focus:text-gray-700"
          >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
</svg>
          </button>
        </form>
        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
         {allArticles.map((item, index) => (
          <div
          key={`link-${index}`}
          onClick={() => setArticle(item)}
          className="link_card"
          >
            <div className="copy_btn" onClick={() => 
            handleCopy(item.url)}>
              <img 
              src={copied === item.url ? tick : copy}
              alt="copy_icon"
              className="w-[40%] h-[40%] object-contain"/>
              </div>
              <p className="flex-1 font-satoshi
              text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
         ))}
        </div>
       </div>
       {/* Display Results */}
       <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
          ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            We'll be right back!
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          <article className="summary"></article> && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span
                className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}</p>
                </div>
              </div>
          )
        )}
       </div>
      </section>
  )
}

export default Demo