'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');

// Loads env
dotenv.config();

const app = express();
require('./routes/index')(app);

app.use(express.static(__dirname + "/public"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const port = process.env.PORT || 3000;

require('./routes/index')(app);

app.get('/', (req, resp) => {
	resp.send('service running')
});

app.listen(port, function () {
	console.log('Service running on port...' + port);
});

// export default app;