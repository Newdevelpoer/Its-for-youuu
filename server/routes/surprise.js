const express = require('express');

const router = express.Router();

// GET /api/surprise/status
router.get('/status', (req, res) => {
  const birthdayDateStr = process.env.BIRTHDAY_DATE || '2024-08-15';
  const birthday = new Date(birthdayDateStr);
  const today = new Date();

  // Normalize to midnight UTC for comparison
  const todayDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const birthdayDate = new Date(Date.UTC(birthday.getUTCFullYear(), birthday.getUTCMonth(), birthday.getUTCDate()));

  const diffTime = todayDate - birthdayDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let unlocked = false;
  let message = '';
  let daysUntilBirthday = 0;

  if (diffDays >= 0 && diffDays <= 30) {
    unlocked = true;
    if (diffDays === 0) {
      message = '🎉 Happy Birthday! Today is your magical day! This surprise was made just for you. ✨';
    } else {
      message = `🎂 Your birthday celebration continues! ${30 - diffDays} days remaining of your special celebration. ✨`;
    }
  } else if (diffDays < 0) {
    daysUntilBirthday = Math.abs(diffDays);
    message = `🔒 This page hides a beautiful surprise. You must wait for a magical day. Only ${daysUntilBirthday} more days... ✨`;
  } else {
    message = '🔒 This page hides a beautiful surprise. You must wait for a magical day. ✨';
  }

  res.json({
    unlocked,
    message,
    daysUntilBirthday: diffDays < 0 ? daysUntilBirthday : 0,
    birthdayDate: birthdayDateStr,
  });
});

module.exports = router;
