const jwt = require('jsonwebtoken')

const userAuth = (req, res, next) => {
    const authHeader = req.headers['Authorization']
    jwt.verify(authHeader, "secret", (err, data) => {
        // console.log(logoutTokens)
        if (err) {
            console.log("error in auth is " + JSON.stringify(err))
            res.status(401).json({
                message: "Please login in again"
            })
        }
        else {
            req.app.set("data1", data)
            next()
        }
    })
}

module.exports = userAuth