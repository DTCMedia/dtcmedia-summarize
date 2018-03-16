module.exports = function (settings) {

    /**
     * Set user settings or fallback to defaults
     */
    settings = {
        debug: settings.debug === true ? true : false,
        defaultStyles: settings.defaultStyles === false ? false : true,
        parentSelector: (typeof settings.parentSelector === 'string') ? settings.parentSelector : '.js-summarize',
        contentSelector: (typeof settings.contentSelector === 'string') ? settings.contentSelector : '.js-summarize-content',
        triggerSelector: (typeof settings.triggerSelector === 'string') ? settings.triggerSelector : '.js-summarize-trigger'
    };

    if (settings.debug) {
        console.log('Summarize ~ Settings');
        console.log('  debug: ' + settings.debug);
        console.log('  defaultStyles: ' + settings.defaultStyles);
        console.log('  parentSelector: \'' + settings.parentSelector + '\'');
        console.log('  contentSelector: \'' + settings.contentSelector + '\'');
        console.log('  triggerSelector: \'' + settings.triggerSelector + '\'');
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
        const trigger = instance.querySelectorAll(settings.triggerSelector)[0];

        if (!content || !trigger) {

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
        const triggerLess = trigger.getAttribute('data-summarize-less');
        const triggerMore = trigger.getAttribute('data-summarize-more');

        if (!contentHeight || !contentOverlap || !triggerLess || !triggerMore) {

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
                trigger.style.display = 'none';

                if (settings.debug) {
                    console.log('  Instance is not summarized');
                }
            }
        };

        const hideContent = () => {
            instance.classList.remove('is-active');
            content.style.maxHeight = contentHeight + 'px';
            trigger.innerHTML = triggerMore;

            if(settings.defaultStyles) {
                content.style.overflow = 'hidden';
                content.style.WebkitMaskImage = '-webkit-linear-gradient(top, black 0%, black 33.333%, transparent 100%)';
            }

            isSummarized = true;

            if (settings.debug) {
                console.log('  Content is hidden');
            }
        };

        const showContent = () => {
            instance.classList.add('is-active');
            content.style.maxHeight = 'none';
            trigger.innerHTML = triggerLess;

            if(settings.defaultStyles) {
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
        trigger.onclick = () => {
            if(shouldSummarize && isSummarized) {
                showContent();
            } else {
                hideContent();
            }
        }
    });
};
