const mongodb = require("./db/connect");
const googleStrategy = require("passport-google-oauth20").Strategy;
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "/.env"),
});
const mongoose = require("mongoose");
const User = require("./modules/User").schema;

User.index({ googleId: 1 });

const initializeGoogleStrategy = (passport) => {
  passport.use(
    new googleStrategy({
      clientID: process.env.GOOGLE_CLEINT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",

    }, async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        givenName: profile.name.givenName,
        familyName: profile.name.familyName,
        image: profile.photos[0].value,
      };

      // console.log(profile);
        
        // const googleID = await mongodb
        // .getDb()
        // .db("cse341-wk3-l05")
        // .collection("employee")
        // .findOne({ googleId: profile.id });

        // if (googleID) return done(new Error("User already exists"));

        const addUser = await mongodb
        .getDb()
        .db("cse341-wk3-l05")
        .collection("employee")
        .insertOne(newUser);
         return done(null, profile)

    })
  );
};

module.exports = initializeGoogleStrategy;











































// const mongodb = require("./db/connect");
// const googleStrategy = require("passport-google-oauth20").Strategy
// // const googleStrategy = require("passport-google-oauth2").Strategy
// const path = require("path");
// const dotenv = require("dotenv").config({
//   path: path.resolve(__dirname, "/.env"),
// });

// const mongoose = require("mongoose")
// const User = require("./modules/User").schema
// // UserSchema.index({ googleId: 1})

// // const UserModule = mongoose.model('User', UserSchema);


// User.index({ googleId: 1 }); // added index for the googleId field






// const initializeGoogleStrategy = (passport) => {

//     passport.use(
//     new googleStrategy(
//     {
//         clientID: process.env.GOOGLE_CLEINT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: 'http://localhost:8080/auth/google/callback'
//     },
//     async (accessToken, refreshToken, profile, done) => {
//         const newUser = {
//             googleId: profile.id,
//             displayName: profile.displayName,
//             firstName: profile.name.given_name,
//             lastName: profile.name.family_name,
//             image: profile.photos[0].value
//         }
//     console.log(profile);

//     //Check to see if user is in the database by Id
//     const googleID = await mongodb
//     .getDb()
//     .db("cse341-wk3-l05")
//     .collection("employee")
//     .findOne({googleId: profile.id});
  
//     if(googleID) return res.status(400).send("Email already exist");

//     //Add user if not found
//     const result = await mongodb
//     .getDb()
//     .db("cse341-wk3-l05")
//     .collection("employee")
//     .insertOne(newUser)
//     }












//     })
    
//     )}
//     //     try {
            
//     //         const UserModel = mongoose.model("User", User);
//     //         let user = await UserModel.findOne({ googleId: profile.id })
//     //         if(user) {
//     //             done(null, user)
//     //         } else {
//     //             user = await User.create(newUser)
//     //             done(null, user)
//     //         }
//     //     }catch(err) {
//     //         console.log(err)
//     //     }

//     // }
//     // )
//     // );
    
//     // passport.serializeUser((user, done) => {
//     // done(null, user.id);
//     // });
    
//     // passport.deserializeUser((id, done) => {

//     //     User.findById(id, (err, user) => done(err, user));
//     // });
//     // };
    
//     module.exports = initializeGoogleStrategy;