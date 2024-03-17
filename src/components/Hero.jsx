import { Bookmark } from '../assets';

const Hero = () => {
  return (
    <header className="w-full flex
    justify-center items-center flex-col">
    <nav className="flex justify-between
    items-center w-full mb-10 pt-3" >
      <img src={Bookmark} alt ="Summify_Bookmark" className="w-28 object-contain" />
      <button type="button" 
      onClick={() => window.open('https://github.com/Upenderok')}
      className="black_btn">
       GitHub 
      </button>
    </nav>
    <h1 className="head_text">
      Summarize Articles with <br className="max-md:hidden" />
      <span 
      className="red_gradient">OpenAI GPT-4</span>
    </h1>
    <h2 className="desc">
    Streamline your reading experience with <strong>"Summ!Fy"</strong>, a open-source summarization tool that condenses long articles into brief, easy-to-understand summaries
    </h2>
      </header>

  )
}

export default Hero