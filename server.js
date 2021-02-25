var app = require('./app')
var PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});