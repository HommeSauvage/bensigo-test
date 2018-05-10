const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const next = require('next');
const admin = require('firebase-admin');
const config = require('./config/server');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const firebase = admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  databaseURL: '' // Database URL goes here
}, 'server');

app.prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(session({
      secret: config.sessionSecret,
      saveUninitialized: true,
      store: new FileStore({ path: '/tmp/sessions', secret: config.sessionSecret }), // instead of redis for example
      resave: false,
      rolling: true,
      httpOnly: true,
      cookie: { maxAge: 604800000 } // week
    }));

    server.use((req, res, next) => {
      req.firebaseServer = firebase;
      next();
    });

    server.get('/dashboard', (req, res) => {
      console.log('FOUND');
      const actualPage = '/protected';
      const queryParams = {};
      app.render(req, res, actualPage, queryParams);
    });

    server.post('/api/login', (req, res) => {
      if (!req.body) return res.sendStatus(400);

      const token = req.body.token;
      firebase.auth().verifyIdToken(token)
        .then((decodedToken) => {
          req.session.decodedToken = decodedToken;
          return decodedToken;
        })
        .then((decodedToken) => res.json({ status: true, decodedToken }))
        .catch((error) => res.json({ error }));
    });

    server.post('/api/logout', (req, res) => {
      req.session.decodedToken = null;
      res.json({ status: true });
    });

    server.get('*', (req, res) => {
      console.log('WILD');
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
