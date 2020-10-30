const AuthentificationController = require('./controllers/authentification')
const passport = require('passport');
require('./services/passport/passport');

const requireToken = passport.authenticate('jwt', { session: false })
// const requireValidCredentials = passport.authenticate('local', { session: false/*, successRedirect: '/ressources', failureRedirect: '/signin', failureFlash: true */ })

module.exports = function (app) {
    // app.get('/', (req, res, next) => {
    //     res.send({ serverData: ["Stratosphérique", "Univers", "Pluton"] });
    // });

    app.post('/signup', AuthentificationController.signup);
    app.post('/signin', AuthentificationController.signin)
    app.get('/special-ressources', requireToken, (req, res) => {
        res.send({ ressources: 'Ceci est du contenu sécurisée' });
    });
};