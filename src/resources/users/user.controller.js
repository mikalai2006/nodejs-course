const usersService = require('./user.service');
const { $text } = require('../../common/locale');

exports.createUser = (req, res) => {
  const data = req.body;
  if (!data.name || !data.login || !data.password) {
    res.status(400).send($text('er400'));
  }
  usersService.createUser(data, (err, newUser) => {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json(newUser);
  });
};
exports.getOneUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).send($text('er404'));
    return;
  }
  await usersService.getUser(req.params.id, (error, response) => {
    if (response) {
      res.status(200).json(response);
    } else if (error) {
      res.status(404).json(error);
    }
  });
  // res.json(user);
};

exports.getAllUsers = async (req, res) => {
  const users = await usersService.getAll();
  res.json(users);
};

exports.removeUser = (req, res) => {
  const { id } = req.params;
  usersService.removeUser(id, (err, response) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(204).send(response);
    }
  });
};

exports.updateUser = (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const data = {
    ...body,
    id
  };
  usersService.updateUser(data, (err, response) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(response);
    }
  });
};

/*
exports.getHeros = function(req, res, next) {
  Heros.get({}, function(err, heros) {
      if(err) {
          res.json({
              error: err
          })
      }
      res.json({
          heros: heros
      })
  })
}

exports.getHero = function(req, res, next) {
  Heros.get({name: req.params.name}, function(err, heros) {
      if(err) {
          res.json({
              error: err
          })
      }
      res.json({
          heros: heros
      })
  })
}

exports.updateHero = function(req, res, next) {
  var hero = {
      name: req.body.name,
      description: req.body.description
  }
  Heros.update({_id: req.params.id}, hero, function(err, hero) {
      if(err) {
          res.json({
              error : err
          })
      }
      res.json({
          message : "Hero updated successfully"
      })
  })
}

exports.removeHero = function(req, res, next) {
  Heros.delete({_id: req.params.id}, function(err, hero) {
      if(err) {
          res.json({
              error : err
          })
      }
      res.json({
          message : "Hero deleted successfully"
      })
  })
} */
