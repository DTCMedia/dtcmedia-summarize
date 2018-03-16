"use strict";

module.exports = function (userSettings) {
  /**
   * Default settings for Summarize
   */
  var defaultSettings = {
    debug: false,
    defaultStyles: true,
    parentSelector: '.js-summarize',
    contentSelector: '.js-summarize-content',
    triggerSelector: '.js-summarize-trigger'
  };
  /**
   * Replace default settings with user settings
   */

  var settings = Object.assign(defaultSettings, userSettings);

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


  Array.from(document.querySelectorAll(settings.parentSelector)).forEach(function (instance) {
    if (settings.debug) {
      console.log('Summarize ~ Instance found');
    }
    /**
     * Obtain elements required to summarize content
     */


    var content = instance.querySelectorAll(settings.contentSelector)[0];
    var trigger = instance.querySelectorAll(settings.triggerSelector)[0];

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


    var contentHeight = parseInt(content.getAttribute('data-summarize-height'));
    var contentOverlap = parseInt(content.getAttribute('data-summarize-overlap'));
    var triggerLess = trigger.getAttribute('data-summarize-less');
    var triggerMore = trigger.getAttribute('data-summarize-more');

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


    var shouldSummarize = content.getBoundingClientRect().height >= contentHeight + contentOverlap;
    var isSummarized = instance.classList.contains('is-active');

    var summarize = function summarize() {
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

    var hideContent = function hideContent() {
      instance.classList.remove('is-active');
      content.style.maxHeight = contentHeight + 'px';
      trigger.innerHTML = triggerMore;

      if (settings.defaultStyles) {
        content.style.overflow = 'hidden';
        content.style.WebkitMaskImage = '-webkit-linear-gradient(top, black 0%, black 33.333%, transparent 100%)';
      }

      isSummarized = true;

      if (settings.debug) {
        console.log('  Content is hidden');
      }
    };

    var showContent = function showContent() {
      instance.classList.add('is-active');
      content.style.maxHeight = 'none';
      trigger.innerHTML = triggerLess;

      if (settings.defaultStyles) {
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

    trigger.onclick = function () {
      if (shouldSummarize && isSummarized) {
        showContent();
      } else {
        hideContent();
      }
    };
  });
};