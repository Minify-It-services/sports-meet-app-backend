const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const sportRoute = require('./sport.route');
const noticeRoute = require('./notice.route');
const matchRoute = require('./match.route');
const teamRoute = require('./team.route')
const fixtureRoute = require('./fixture.route')
const tieSheetRoute = require('./tiesheet.route')
const adminRoute = require('./admin.route')
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/sports',
    route: sportRoute,
  },
  {
    path: '/notices',
    route: noticeRoute,
  },
  {
    path: '/matches',
    route: matchRoute,
  },
  {
    path: '/teams',
    route: teamRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/fixtures',
    route: fixtureRoute,
  },
  {
    path: '/tieSheets',
    route: tieSheetRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
