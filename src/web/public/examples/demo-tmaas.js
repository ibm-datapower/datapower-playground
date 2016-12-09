/*--DESCRIPTION--
  <h4>Exercise 21: TMaaS Development Sandbox
*/

/*--INPUT--
{
    "name": "client_qos",
    "rules": [
        {
            "conditions": {
                "headers": {
                    "x-api-key": "group:gold"
                }
            },
            "limits": {
                "messages": {
                    "above": {
                        "quantity": 3,
                        "per": 60
                    }
                }
            },
            "actions": {
                "notify": {
                    "uri": "/limit-exceeded/",
                    "message": {
                        "user": "%{request.header['x-api-key']}"
                    }
                }
            }
        },
        {
            "conditions": {
                "headers": {
                    "x-api-key": "group:silver"
                }
            },
            "limits": {
                "messages": {
                    "above": {
                        "quantity": 2,
                        "per": 60
                    }
                }
            },
            "actions": {
                "reject": {}
            }
        },
        {
            "conditions": {
                "headers": {
                    "x-api-key": "group:bronze"
                }
            },
            "limits": {
                "messages": {
                    "above": {
                        "quantity": 1,
                        "per": 60
                    }
                }
            },
            "actions": {
                "reject": {}
            }
        }
    ]
}
*/

/*--HEADERS--
{
 "Content-Type": "application/json",
 "X-GS-Fiddle-Method": "POST",
 "X-GS-Fiddle-Rule": "request",
 "X-GS-Fiddle-Service": "mpgw",
 "X-GS-Fiddle-Request-URI": "/echo",
 "X-GS-Fiddle-Backside": "http://ubuntu:3080",
 "x-api-key": "group:silver",
 "x-dp-host": "hostname1"
}
*/

var fs = require ('fs'),
    rl = require ('ratelimit'),
    hm = require ('header-metadata');

session.input.readAsJSON (function (err, policy) {

    policy.rules.forEach (function (rule) {
        var part = "",
            match = true,
            headers = rule.conditions.headers;
        
        headers && Object.getOwnPropertyNames (headers).every (function (key) {
            let value = hm.current.get (key); part += value;
            match = value && value === headers[key];
            return match;
        });
        
        if (match && rule.limits && rule.limits.messages) {
            let above = rule.limits.messages.above;
            let limit = rl.rateCreate (part, above.quantity, above.per);
            
            limit.remove (1, function (err, remaining, reset) {
                
                hm.response.set ('X-Rate-Limit-Limit', above.quantity+'/'+above.per);
                hm.response.set ('X-Rate-Limit-Remaining', remaining);
                hm.response.set ('X-Rate-Limit-Reset', reset);
                
                if (err) {
                    hm.response.statusCode = "429 Too Many Requests";
                    session.reject('Rate Exceeded');
                    session.output.write('Rate Exceeded');
                }
            });
        } else {
            console.info ('no match');
        }
    });
    
});
