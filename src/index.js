import express from 'express';
import Config from '../config.json';
import loadSocket from "./Events";
import passport from 'passport';
import {Strategy} from 'passport-github';
import User from './Database/Models/User';
import {createHash} from 'crypto';

passport.use(new Strategy(Config.github, (token, rToken, profile, cb) => {
  const {id, username} = profile;
  const avatar = profile.photos[0]?.value;
  const authToken = createHash('sha256').update(id + username).digest('hex');

  User.findOrCreate({where: {username}, defaults: {avatar, auth_token: authToken}})
    .then((user) => {
      cb(null, user[0].dataValues);
    }).catch(console.error);
}));

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

passport.deserializeUser((user, done) => {
  done(null, JSON.parse(user));
});

const app = express();
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/test', (req, res) => {
  res.send('test');
});

app.get('/login', passport.authenticate('github'));
app.get('/login/callback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
  res.redirect('http://localhost:3000/auth/' + req.user.auth_token);
});

loadSocket(app);

app.listen(Config.app.port, () => {
  console.log(`Example app listening on ${Config.app.port}`)
})
