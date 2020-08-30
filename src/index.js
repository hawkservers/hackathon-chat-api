import express from 'express';
import Config from '../config.json';
import loadSocket from "./Events.js";
import passport from 'passport';
import {Strategy as GithubStrategy} from 'passport-github';
import {Strategy as DiscordStrategy} from 'passport-discord';
import User from './Database/Models/User';
import {createHash} from 'crypto';

passport.use(new GithubStrategy(Config.github, (token, rToken, profile, cb) => {
  const {id, username} = profile;
  const avatar = profile.photos[0]?.value;
  const authToken = createHash('sha256').update(id + username).digest('hex');

  User.findOrCreate({where: {username}, defaults: {avatar, auth_token: authToken}})
    .then((user) => {
      cb(null, user[0].dataValues);
    }).catch(console.error);
}));

passport.use(new DiscordStrategy(Config.discord, (token, rToken, profile, cb) => {
  let {id, username, discriminator, avatar} = profile;
  username = username + '#' + discriminator;
  let authToken = createHash('sha256').update(id + username).digest('hex');
  avatar = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;

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

app.get('/login/github', passport.authenticate('github'));
app.get('/auth/github', passport.authenticate('github', {failureRedirect: '/login/github'}), (req, res) => {
  res.redirect('http://localhost:3000/auth/' + req.user.auth_token);
});

app.get('/login/discord', passport.authenticate('discord'));
app.get('/auth/discord', passport.authenticate('discord', {failureRedirect: '/login/discord'}), (req, res) => {
  res.redirect('http://localhost:3000/auth/' + req.user.auth_token);
});

loadSocket(app);

app.listen(Config.app.port, () => {
  console.log(`Example app listening on ${Config.app.port}`)
})
