let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;

let {user} = require('./models')

const passportJwt = require('passport-jwt');
const JWTStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(new LocalStrategy(
    {
        firstnameField : "firstname",
        lastnameField : "lastname",
        contactField : "contact",
        addressField : "address",
        emailField : "email",
        passwordField : "password",
        roleField : "role",
        statusField: "status"
    },
    async (firstname,lastname,contact,address,email, password,role,status, done) => {
        try {
        const costumer = await user.findOne({where: {firstname : firstname, lastname : lastname, contact : contact, address:address, email:email, password:password, role:role, status:status }});
        if(!costumer) {
            return done(null,false, {message: 'Incorrect username or password'})
        }
            return done(null,costumer)     
        } catch (error) {
            return done(error)
        }
    }
))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
async(jwtPayload, cb) => {
    console.log(jwtPayload)
    try {
        const a = await user.findOne({where: {firstname: jwtPayload.firstname}})
        return cb(null,a);
    } catch (error) {
        return cb(error);
    }

}
))

passport.serializeUser(async (user, cb) => {
    return cb(null, user.id);
  });
  
  passport.deserializeUser(async (id, cb) => {
    try {
      const all = await User.findById;
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  });
  
  module.exports = passport;


