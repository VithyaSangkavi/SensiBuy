import React, {useEffect} from 'react';
import picture from '../images/picture1.jpg';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    // Redirect to the SignupForm component
    navigate('/SignUp');
  };

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleTTS = () => {
    const text = "Welcome to SensiBuy. Enchancing shopping experience for the visually challanged. To continue shopping you can login to your system. If you don't have an account you can signup. Thank you, happy shopping."
    
    const value = new SpeechSynthesisUtterance(text);

    window.speechSynthesis.speak(value);
  }
  const speakLabel = (labelText) => {
    const utterance = new SpeechSynthesisUtterance(labelText);
    window.speechSynthesis.speak(utterance);
};

  useEffect(() => {
    // Attach a click event listener to the entire page body
    document.body.addEventListener('click', handleTTSOnClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.body.removeEventListener('click', handleTTSOnClick);
    };
  }, []);

  const handleTTSOnClick = (e) => {
    // Call the TTS function when a click occurs anywhere on the page
    if (!e.target.classList.contains('tts-trigger')) {
      // Call the TTS function when a click occurs on elements with the "tts-trigger" class
      handleTTS();
    }
  };

  return (
    <div className="relative h-screen">
      <img src={picture} alt="Background" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-2">Welcome to SensiBuy</h1>
        <h2 className="text-5xl font-semibold mb-2 text-red">
          Enhancing Shopping Experience for the Visually Challenged
        </h2>
        <br />
        <div className='flex gap-[10px]'>
        <button
          className="border rounded text-xl font-semibold px-12 py-2"
          onClick={handleSignUpClick} 
          onMouseEnter={() => speakLabel('Click here to sign up')}// Call handleSignUpClick when the button is clicked
        >
          SIGN UP
        </button><br/>
        <button
          className="border rounded text-xl font-semibold px-12 py-2"
          onClick={handleLoginClick} 
          onMouseEnter={() => speakLabel('Click here to login')}
        >
          LOGIN
        </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
