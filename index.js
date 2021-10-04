const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production')
{
    dotenv.config();
}

const { main } = require('./src/main');

main()
    .then()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });