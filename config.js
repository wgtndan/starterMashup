//Engine Connections will always require Certificate SSL for connectivity
//runSecureHTTPS and QlikConfig.secure should be kept in step

var config = {  'State' : 'External',
                'certificateDir': 'C:\\qlik\\TableBuilder\\qlikdemo.southeastasia.cloudapp.azure.com',
                'HostPort':2000,
                'appUID':'2953e0b0-96a8-4c71-832b-9a1359cdedbe',
                'VisualisationUID':'JPRpk',
                'Profile': {
                    'UserDirectory': 'Directory', 
                    'UserId': 'OpenDataPortalUser',
                    'Attributes': []
                },
                'QlikConfig':{  
                    'host': 'qlikdemo.southeastasia.cloudapp.azure.com',  
                    'prefix': '/tick/',  
                    'port': 4747,  
                    'secure': false,
                    'rejectUnauthorized': false
                },
                'EngineUserProfile':{
                        'UserDirectory':'Directory',
                        'UserId':'OpenDataPortalUser'
                }
            }

module.exports =  config;