const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
  try {
    if (!global.food_items || !global.foodCategory) {
      throw new Error("Global variables are not set");
    }
    res.send([global.food_items, global.foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
