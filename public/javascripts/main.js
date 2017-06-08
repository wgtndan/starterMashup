if (typeof require == 'undefined')
        //window.location = (config.isSecure ? "https://" : "http://") + config.host + config.prefix + "resources/returnUrl.html?returnUrl=" + encodeURIComponent(window.location.href);

        console.log((config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources");
    require.config({
        baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
        paths: {
            qlik: "js/qlik",
            bootstrap: (window.location.protocol === "https:" ? "https://" : "http://") + window.location.hostname + ":" + window.location.port + "/javascripts/bootstrap.min",
        },
        text: {
            useXhr: function (url, protocol, hostname, port) {
                return true;
            }
        }
    });

    require(["js/qlik", "bootstrap"], function (qlik) {
        var control = false;
        qlik.setOnError(function (error) {
            $('#popupText').append(error.message + "<br>");
            if (!control) {
                control = true;
                $('#popup').delay(1000).fadeIn(1000).delay(11000).fadeOut(1000);
            }
        });
        // qlik.setOnError( function ( error ) {
        //     $( '#popupText' ).append( error.message + "<br>" );
        //     $( '#popup' ).fadeIn( 1000 );
        // } );
        // $( "#closePopup" ).click( function () {
        //     $( '#popup' ).hide();
        // } );

        function drawVis() {
            QlikUseActive = true;
            var qlikApp = qlik.openApp(AppId, config);

            qlikApp.getObject('currsel', 'CurrentSelections');
            qlikApp.getObject('QS01',VisId);
           
        }

        drawVis();
    });