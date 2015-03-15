var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

function initOauth() {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(new GoogleStrategy({
            clientID: '220594915165-cojb9eledf6ejpq2ivosc8umd2epam71.apps.googleusercontent.com',
            clientSecret: 'HClBfN5WAPZlhSna4GrkD8Ez',
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            if(profile._json.hd === "brandwatch.com"){
                process.nextTick(function () {
                    return done(null, profile);
                });
            } else {
                done(null, false);
            }

        }
    ));
}

exports.initOauth = initOauth;
