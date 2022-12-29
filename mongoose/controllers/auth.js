const User = require('../models/user');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const sendGridTransport = require('nodemailer-sendgrid-transport')


const transporter = nodemailer.createTransport(
	sendGridTransport({
		auth: {
			api_key:
				"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",
		},
	})
);

exports.getLogin = (req, res, next) => {
  let message = req.flash('error')
  if(message.length > 0) message = message[0]
  else message = null
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage:message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
	if (message.length > 0) message = message[0];
	else message = null;
  res.render("auth/signup", {
		path: "/signup",
		pageTitle: "Signup",
		errorMessage: message,
	});
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  User.findOne({email:email})
		.then((user) => {
      if(!user) {
        req.flash('error','invalid email')
        return res.redirect('/login')
      }
      bcrypt.compare(password,user.password)
      .then(doMatch => {
        if(doMatch){
          req.session.isLoggedIn = true;
					req.session.user = user;
					return req.session.save((err) => {
						console.log(err);
            res.redirect('/')
					});
        }
        req.flash('error','Invalid password')
        res.redirect('/login')
      })
      .catch(err => {
        console.log(err)
        res.redirect('/login')
      })
		})
		.catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword
  User.findOne({email:email})
  .then(userDoc => {
    if(userDoc){
      req.flash("error", "user already exist please login or pick a different email");
      return res.redirect('/signup')
    }
    return bcrypt
			.hash(password, 12)
			.then((hashedPassword) => {
				const user = new User({
					email: email,
					password: hashedPassword,
					cart: { items: [] },
				});
				return user.save()
			})
			.then((result) => {
				res.redirect("/login");
        return transporter.sendMail({
          to: email,
          from:'ebezebeatrice@gmail.com',
          subject:"Successfully created account",
          html:"<h1>You have your account now</h1>"
        })
			})
      .catch(err  =>{
        console.log(err)
      })
  })
  .catch(err => {
    console.log(err)
  })
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
