import Hapi from 'hapi';
import routes from './routes'
import Inert from 'inert';
import Vision from 'vision';
// import jwt from 'jsonwebtoken'



const server = new Hapi.Server();

server.connection( {
    port: 8000
});

server.register([
    Inert,
    Vision,
    {
        register:require('hapi-swagger')
    }],
    function(err){
    if(err){
        server.log(['error'], 'hapi-swagger load error: ' + err)
    }
    else{
    }
        server.log(['start'], "hapi-swagger interface loaded!")
});



// server.route({

//     method: 'GET',
//     path: '/hello',
//     handler: ( request, reply ) => {
//     	console.log("d");
//         reply( 'Hello World!' );
//     }

// });
server.route(routes)

server.start(err => {

    if (err) {

        // Fancy error handling here
        console.error( 'Error was handledjjkj!' );
        console.error( err );

    }

    console.log( `Server started at ${ server.info.uri }` );

});