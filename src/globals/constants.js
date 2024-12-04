const baseUrl = process.env.PUBLIC_URL;

export function publicUrlFor(path) {
    return baseUrl + "/assets/" + path;
}

export function loadScript(src, fromPublic) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = (fromPublic === undefined || fromPublic == null || fromPublic) ? publicUrlFor(src) : src;

        script.addEventListener('load', function () {
            resolve();
            document.body.removeChild(script); // Rimuovi lo script solo dopo che è stato caricato con successo
        });

        script.addEventListener('error', function (e) {
            reject(e);
            document.body.removeChild(script); // Rimuovi lo script anche in caso di errore
        });

        document.body.appendChild(script);
    });
}
