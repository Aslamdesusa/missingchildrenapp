import Hapi from 'hapi';
import routes from './routes'



const server = new Hapi.Server();

server.connection( {
    port: 8000
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