//Engine Connections will always require Certificate SSL for connectivity
//runSecureHTTPS and QlikConfig.secure should be kept in step

var config = {  'State' : 'External',
                'certificateDir': '<CertificatePath>',
                'HostPort':2000,
                'appUID':'2953e0b0-96a8-4c71-832b-9a1359cdedbe', //Update with your AppId
                'VisualisationUID':'JPRpk', //Update with a VisId
                'Profile': {
                    'UserDirectory': 'Directory', 
                    'UserId': 'User',
                    'Attributes': []
                },
                'QlikConfig':{  
                    'host': '<QlikServerName>',  
                    'prefix': '/<VirtualProxyWithTicketAuthentication>/',  
                    'port': 4747,  
                    'secure': false, //Must be enabled if server only supports SSL
                    'rejectUnauthorized': false
                }
            }

module.exports =  config;