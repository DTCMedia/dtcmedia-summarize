# Summarize
Summarize content with the ability to toggle visibility.

## Install
Install with Yarn:
```javascript
$ yarn add dtcmedia-summarize
```

Import module:
```javascript
import summarize from 'dtcmedia-summarize';
```

Summarize with defaults:
```javascript
summarize();
```

## Settings
Summarize with settings:

Option | Type | Default
------ | ---- | -------
debug | boolean | false
defaultStyles |  boolean | true
parentSelector |  String | '.js-summarize'
contentSelector |  String | '[data-summarize-height], [data-summarize-overlap]'
toggleSelector |  String | '[data-summarize-more], [data-summarize-less]'
toggleTextSelector |  String | '[data-summarize-more], [data-summarize-less]'

```javascript
summarize({
    debug: false,
    defaultStyles: true,
    parentSelector: '.js-summarize',
    contentSelector: '[data-summarize-height], [data-summarize-overlap]',
    toggleSelector: '[data-summarize-more], [data-summarize-less]',
    toggleTextSelector: '[data-summarize-more] span, [data-summarize-less] span'
});
```

## Usage
Setup the correct markup with data attributes:

Attribute | Type | Description
--------- | ---- | -----------
height | Number | Maximum height for the summary.
overlap |  Number | Minimum overlap before the content gets summarized.
more |  String | Button text for when content is hidden.
less |  String | Button text for when content is visible.

Use the following code example to get you started:
```html
<article class="js-summarize">
    <div class="js-summarize-content" data-summarize-height="200" data-summarize-overlap="80">
         <p>Lorem ipsum...</p>
    </div>
    <button class="js-summarize-trigger" data-summarize-more="Show more" data-summarize-less="Show less">
         <i class="fa fa-check" aria-hidden="true"></i>
         <span>Show more</span>
    </button>
</article>
```
