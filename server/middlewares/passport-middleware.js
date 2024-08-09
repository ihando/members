const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { SECRET } = require("../constants");
const db = require("../db/userqueries");

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      console.log(id);
      const rows = await db.getOneUser(id);
      console.log(rows.length);
      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      let user = { id: rows[0].id, username: rows[0].username };

      return await done(null, user);
    } catch (err) {
      console.error(err.message);
      done(null, false);
    }
  })
);
