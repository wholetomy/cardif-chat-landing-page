import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Chat() {
    const location = useLocation();
    const { name, identifier, partnerId, partnerName, subject } = location.state || {};

    useEffect(() => {
        const script = document.createElement('script');
        script.innerHTML = `
            window.olosWebChatInit = function (Botkit) {
                var botParams = {
                    name: "${name}",
                    identifier: "${identifier}",
                    partnerId: ${partnerId},
                    partnerName: "${partnerName}",
                    subject: "${subject}"
                };

                if (window.location.search != "" && window.location.search.indexOf('=') > -1) {
                    var params = window.location.search;
                    params = window.location.search.split('?')[1].split('&');

                    if (params && params.length > 0) {
                        for (var i = 0; i < params.length; i++) {
                            var p = params[i].split('=');
                            botParams[p[0]] = decodeURIComponent(p[1]);
                        }
                    }
                }

                console.log('botParams', botParams);

                window.Botkit = Botkit;
                window.Botkit.boot({ id: null, name: botParams.name, custom: { productId: 100 } });
            };

            (function (v, cid, gid, cstm, lv, ext, refURL, cfm) {
                var id = 'oloswcdl-script', s = 'script', d = document;
                var js, fjs = d.getElementsByTagName(s)[0];
                var host = "https://olosbotsolutionstatic.blob.core.windows.net/webchat/botkit/v" + v;
                if (d.getElementById(id)) { return }
                js = d.createElement(s); js.id = id;
                js.src = host + "/main.bundle.js?cid=" + cid + '&gid=' + gid + '&version=' + v + '&custom=' + cstm + '&lv=' + lv + '&ext=' + ext + '&use_local_history=1&use_history=1&keep_session=1&refURL=' + refURL + '&cfm=' + cfm;
                fjs.parentNode.insertBefore(js, fjs);
            }('3.4.1', '1675455316361', '86b1a-d6-42b-958-f9182', '', 'olosbotgwshrsbr001', 'closeButton:0,minimizeButton:0,autoStart:1', '', false));
        `;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [name, identifier, partnerId, partnerName, subject]);

    return <div id="oloswcdl-root"></div>;
}

export default Chat;
