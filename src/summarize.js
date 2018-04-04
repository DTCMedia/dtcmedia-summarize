import 'babel-polyfill';

module.exports = function (userSettings) {

    /**
     * Default settings for Summarize
     */
    let defaultSettings = {
        debug: false,
        defaultStyles: true,
        parentSelector: '.js-summarize',
        contentSelector: '[data-summarize-height], [data-summarize-overlap]',
        toggleSelector: '[data-summarize-more], [data-summarize-less]',
        toggleTextSelector: '[data-summarize-more], [data-summarize-less]',
    };

    /**
     * Replace default settings with user settings
     */
    const settings = Object.assign(defaultSettings, userSettings);

    if (settings.debug) {
        console.log('Summarize ~ Settings');
        console.log('  debug: ' + settings.debug);
        console.log('  defaultStyles: ' + settings.defaultStyles);
        console.log('  parentSelector: \'' + settings.parentSelector + '\'');
        console.log('  contentSelector: \'' + settings.contentSelector + '\'');
        console.log('  toggleSelector: \'' + settings.toggleSelector + '\'');
        console.log('  toggleTextSelector: \'' + settings.toggleTextSelector + '\'');
    }

    /**
     * Search for instances to summarize
     */
    Array.from(document.querySelectorAll(settings.parentSelector)).forEach(instance => {

        if (settings.debug) {
            console.log('Summarize ~ Instance found');
        }

        /**
         * Obtain elements required to summarize content
         */
        const content = instance.querySelectorAll(settings.contentSelector)[0];
        const toggle = instance.querySelectorAll(settings.toggleSelector)[0];
        const toggleText = instance.querySelectorAll(settings.toggleTextSelector)[0];

        if (!content || !toggle || !toggleText) {

            if (settings.debug) {
                console.log('  Missing required elements');
                console.log('  Failed to initialize...');
            }

            return;
        }

        /**
         * Obtain data required to summarize content
         */
        const contentHeight = parseInt(content.getAttribute('data-summarize-height'));
        const contentOverlap = parseInt(content.getAttribute('data-summarize-overlap'));
        const toggleLess = toggle.getAttribute('data-summarize-less');
        const toggleMore = toggle.getAttribute('data-summarize-more');

        if (!contentHeight || !contentOverlap || !toggleLess || !toggleMore) {

            if (settings.debug) {
                console.log('  Missing required data attributes');
                console.log('  Failed to initialize...');
            }

            return;
        }

        /**
         * Summarize content if needed
         */
        let shouldSummarize = content.getBoundingClientRect().height >= contentHeight + contentOverlap;
        let isSummarized = instance.classList.contains('is-active');

        const summarize = () => {
            if (shouldSummarize) {
                instance.classList.add('is-summarized');

                if (settings.debug) {
                    console.log('  Instance is summarized');
                }

                hideContent();
            } else {
                toggle.style.display = 'none';

                if (settings.debug) {
                    console.log('  Instance is not summarized');
                }
            }
        };

        const hideContent = () => {
            instance.classList.remove('is-active');
            content.classList.remove('is-active');
            toggle.classList.remove('is-active');
            toggleText.innerHTML = toggleMore;

            if(settings.defaultStyles) {
                content.style.maxHeight = contentHeight + 'px';
                content.style.overflow = 'hidden';
                content.style.WebkitMaskImage = '-webkit-linear-gradient(top, black 0%, black 66.666%, transparent 100%)';
            }

            isSummarized = true;

            if (settings.debug) {
                console.log('  Content is hidden');
            }
        };

        const showContent = () => {
            instance.classList.add('is-active');
            content.classList.add('is-active');
            toggle.classList.add('is-active');
            toggleText.innerHTML = toggleLess;

            if(settings.defaultStyles) {
                content.style.maxHeight = 'none';
                content.style.overflow = 'visible';
                content.style.WebkitMaskImage = 'none';
            }

            isSummarized = false;

            if (settings.debug) {
                console.log('  Content is visible');
            }
        };

        /**
         * Execute summarize on page load
         */
        summarize();

        /**
         * Toggle content visibility on click
         */
        toggle.onclick = () => {
            if(shouldSummarize && isSummarized) {
                showContent();
            } else {
                hideContent();
            }
        }
    });
};
