import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval;

    if (isLoading) {
      interval = setInterval(() => {
        if (progress < 360) {
          setProgress(prev => prev + 2);
        } else {
          clearInterval(interval);
          setIsLoading(false);
        }
      }, 25);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isLoading, progress]);

  const handleStart = () => {
    if (progress === 360) {
      setProgress(0);
    }
    setIsLoading(true);
  };

  const handleStop = () => {
    setIsLoading(false);
  };

  return (
    <div  className="flex flex-col items-center justify-center h-screen bg-black">
      <div data-aos="fade-up"   data-aos-duration="1000" className="relative w-32 h-32 border border-gray-200 rounded-full overflow-hidden">
        <div
          className={classNames('absolute inset-0 border-4 border-red-500 rounded-full', {
            'transition-all': isLoading,
          })}
          style={{
            transform: `rotate(${progress}deg)`,
            clipPath: `inset(${100 - (progress / 360) * 100}% 0 0)`
          }}
        ></div>
        <div
          className={classNames('absolute inset-0', {
            'transition-all': isLoading,
          })}
        >
          <span className="text-white font-bold text-lg absolute inset-0 flex justify-center items-center">
            {Math.round((progress / 360) * 100)}%
          </span>
        </div>
      </div>
      <div data-aos="fade-up"   data-aos-duration="1000" className="flex mt-4">
        <button
          onClick={handleStart}
          className="px-4 py-2 bg-blue-500 text-white rounded-full"
        >
          Start
        </button>
        <button
          onClick={handleStop}
          className="px-4 py-2 bg-red-500 text-white rounded-full ml-4"
        >
          Pause
        </button>
      </div>
    </div>
  );
};

export default Loader;
