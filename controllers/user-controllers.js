const users = require('../models/users-model');
const passport = require('../middlewares/passport-config');

class UserControllers{
	getIndex(request, response){
		response.sendFile('ProCalculator.html', {root:__dirname});

	}

	getLogin(request, response){
		response.sendFile('index.html', {root:__dirname});
	}

	getRegister(request, response){
		response.sendFile('register.html', {root:__dirname});
	}

	getError(request, response){
		response.render( 'error.ejs' );
	}

	postLogin(request, response, next){
		const config = {};
		config.successRedirect = '/';
		config.failureRedirect = '/error';
		config.failureFlash = true;
		const authHandler = passport.authenticate('local', config);
		authHandler(request, response, next);
	}

	postRegister(request, response){
		try{
			const {name, email, password} = request.body;
			users.add(name, email, password);
			response.redirect('/login');
		}catch{
			response.redirect('/register');
		}
	}

	postLogout(request, response){
		request.logOut();
		response.redirect('login');
	}
}

module.exports = new UserControllers();