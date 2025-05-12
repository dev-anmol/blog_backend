const bcrypt = require('bcryptjs');

const password = 'Athakur@6';

bcrypt.hash(password, 10).then((hash) => {
    console.log('Hashed password:', hash);
});
