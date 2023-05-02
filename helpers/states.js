const statesUS = require('../public/json/states_hash.json')

Handlebars.registerHelper( 'eachState', function ( map, block ) {
    Object.keys( statesUS ).map(function( prop ) {
        return block( statesUS[ prop ] );
    });
});