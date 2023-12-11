const FacebookStrategy = require('passport-facebook').Strategy;
const { USER_TYPES } = require('../constants/authConstant');

const facebookPassportStrategy = ({ userDb }) => passport => {

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (user, cb) {
    cb(null, user);
  });
  
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_CLIENTSECRET,
    callbackURL: process.env.FACEBOOK_CALLBACKURL
  }, async function (accessToken, refreshToken, profile, done) {
    try {
      if (profile){
        let userObj = {
          'username':profile.displayName,
          'ssoAuth': { 'facebookId': profile.id },
          'email': profile.emails !== undefined ? profile.emails[0].value : '',
          'password':'',
          'userType':USER_TYPES.User
        };
        let found = await userDb.findOne({ 'email': userObj.email });
        if (found) {
          const id = found.id;
          await userDb.updateOne({ _id:id }, userObj);
        }
        else {
          await userDb.create(userObj);
        }
        let user = await userDb.findOne({ 'ssoAuth.facebookId':profile.id });
        return done(null, user);
      }
      return done(null,null,'Profile Not found');
    } catch (error){
      return done(error,null);
    }
  }
  ));
};

module.exports = facebookPassportStrategy;