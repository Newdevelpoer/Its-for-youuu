import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const BirthdayCountdown = ({ targetDate }) => {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date(targetDate);

    // Set target to this year or next year
    const thisYear = now.getFullYear();
    let nextBirthday = new Date(thisYear, target.getMonth(), target.getDate());
    if (nextBirthday <= now) {
      nextBirthday = new Date(thisYear + 1, target.getMonth(), target.getDate());
    }

    const diff = nextBirthday - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      isBirthday: false,
    };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const cardClass = `rounded-xl p-3 text-center min-w-[60px] ${
    theme === 'light'
      ? 'bg-light-purple/30 border border-light-purple/50'
      : 'bg-dark-blue2/20 border border-dark-teal/30'
  }`;

  if (timeLeft.isBirthday) {
    return (
      <div className={`text-center font-dancing text-2xl animate-bounce-soft ${
        theme === 'light' ? 'text-pink-500' : 'text-dark-teal'
      }`}>
        🎂 Happy Birthday! 🎉
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className={`font-dancing text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
        🎂 Birthday Countdown
      </p>
      <div className="flex items-center gap-2">
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Min' },
          { value: timeLeft.seconds, label: 'Sec' },
        ].map(({ value, label }, i) => (
          <div key={label}>
            <div className={cardClass}>
              <div className={`text-2xl font-bold font-poppins ${
                theme === 'light' ? 'text-gray-800' : 'text-white'
              }`}>
                {String(value).padStart(2, '0')}
              </div>
              <div className={`text-xs font-quicksand ${
                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {label}
              </div>
            </div>
            {i < 3 && (
              <span className={`text-xl font-bold mx-1 ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayCountdown;
