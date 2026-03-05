// Configure the birthday date here
const BIRTHDAY_MONTH = 1; // January (1-indexed)
const BIRTHDAY_DAY = 1;   // Day of month

export const getBirthdayDate = (year) => {
  return new Date(year, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY);
};

export const getNextBirthday = () => {
  const now = new Date();
  const thisYear = now.getFullYear();
  let birthday = getBirthdayDate(thisYear);

  if (now > birthday) {
    birthday = getBirthdayDate(thisYear + 1);
  }

  return birthday;
};

export const isBirthdayPeriod = () => {
  const now = new Date();
  const thisYear = now.getFullYear();
  const birthday = getBirthdayDate(thisYear);
  const endDate = new Date(birthday);
  endDate.setDate(endDate.getDate() + 30);

  return now >= birthday && now <= endDate;
};

export const getCountdown = () => {
  const now = new Date();
  const birthday = getNextBirthday();
  const diff = birthday - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};
