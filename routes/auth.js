const express = require("express");
const passport = require("passport")
const router = express.Router();
const app = express();
app.use(express.json());

const initializeGoogleStrategy = require("../passport");
initializeGoogleStrategy(passport);

//Adding Auth with Google 
//Route to GET /auth/google
router.get('/google', passport.authenticate("google", { scope: ['profile']}));

//Adding Google Auth callback
//Route GET /auth/google/callback
router.get(
    '/google/callback', 
    passport.authenticate("google", { successRedirect: "/employee/dashboard", failureRedirect: "/" })

    // (req, res) => {
    //     console.log("Dashboard Two reached")
    //     res.redirect("/employee/dashboard")
// }
)

module.exports = router