import App from './src/app';

function start(){
    const port = process.env.PORT || 443;
    new App().listen(port);
}

start();