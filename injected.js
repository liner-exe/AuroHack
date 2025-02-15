(function() {
    function hookOnPaste() {
        if (window.DS && DS.page && DS.page.cb) {
            console.log('DS.page.cb detected:', DS.page.cb);
            const originalCanPaste = DS.page.cb.canPaste || function(txt, html) { return txt; };
            DS.page.cb.canPaste = function(txt, html) {
                console.log('Custom onPaste triggered by extension');
                console.log('Original text:', txt);
                console.log('Original html:', html);
                return true;
            };
            console.log('DS.page.cb.onPaste has been hooked successfully.');
            return true;
        }
        return false;
    }

    if (!hookOnPaste()) {
        console.warn('DS.page.cb not found, setting up observer...');
        const observer = new MutationObserver((mutations, obs) => {
            if (hookOnPaste()) {
                obs.disconnect();
            }
        });
        observer.observe(document, { childList: true, subtree: true });
    }
})();