/*global require, alert*/
/*
 * 
 * @owner Tiago (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);
var config = {
    host: 'https://insights.outsystems.net',
    prefix: prefix,
    port: window.location.port,
    isSecure: window.location.protocol === "https:"
};
require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

require(["js/qlik"], function(qlik) {
    qlik.setOnError(function(error) {
        alert(error.message);
    });

    //callbacks -- inserted here --
    //open apps -- inserted here --
    var app = qlik.openApp('2a94c2f7-f44a-4c53-82ce-881bf8b03e10', config);


    //get objects -- inserted here --
    app.getObject('CurrentSelections', 'CurrentSelections');

    app.getObject('QV01', 'UsTR');
    app.getObject('QV04', '47f7df58-2457-47b0-9241-5ea8ca9fa1d5');
    app.getObject('QV02', 'deeca683-a09a-4098-8016-466ecbbe67ca');

    app.getObject('QV03', 'xKpMueH');
    app.getObject('QV06', 'b5531f0f-fd9f-4fb4-9c2d-525265bf98c6');
    app.getObject('QV05', 'zmPuhD');

    //create cubes and lists -- inserted here --

});
