/**
 * Allow authenticated user with wt_access.
 */

module.exports = function(req, res, next) {
    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {

            var scheme = parts[0];
            var credentials = parts[1];
            if (/^Bearer$/i.test(scheme)) {
                var token = credentials;
                JwtService.verify(token, function (err, decoded){
                    if (err) {
                        return res.json(401, {message: err.message});
                    }
                    User.findOne({id: decoded.id}).then(function (user){
                        if (!user) {
                            return res.json(401, {'message' : 'Invalid token'});
                        }
                        return [null, user];
                    }).spread(function(err, resp){
                        if(err)
                            next(err);
                        req.id = decoded.id;
                        next();
                            
                    })
                    .catch(function (err){
                        return ResponseService.json(500, 'An internal server error has occured');
                    });
                });
            } else {
                return res.json(401, 'Format is Authorization: Bearer [token]');
            }
        } else {
            return res.json(401, 'Format is Authorization: Bearer [token]');
        }
    } else {
        return res.json(401, 'No Authorization header was found');
    }
};

