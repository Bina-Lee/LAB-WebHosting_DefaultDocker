const dao = require('../dao');

const getMember = async (req, res) => {
  try {
    const purchases = await dao.getMember();
    res.render('main', { purchases });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving purchases');
  }
};


module.exports = { getMember };
