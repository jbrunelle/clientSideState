
(function () {
/*!
 * XRegExp 2.0.0 <xregexp.com> MIT License
 */
var XRegExp;XRegExp=XRegExp||function(n){"use strict";function v(n,i,r){var u;for(u in t.prototype)t.prototype.hasOwnProperty(u)&&(n[u]=t.prototype[u]);return n.xregexp={captureNames:i,isNative:!!r},n}function g(n){return(n.global?"g":"")+(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.extended?"x":"")+(n.sticky?"y":"")}function o(n,r,u){if(!t.isRegExp(n))throw new TypeError("type RegExp expected");var f=i.replace.call(g(n)+(r||""),h,"");return u&&(f=i.replace.call(f,new RegExp("["+u+"]+","g"),"")),n=n.xregexp&&!n.xregexp.isNative?v(t(n.source,f),n.xregexp.captureNames?n.xregexp.captureNames.slice(0):null):v(new RegExp(n.source,f),null,!0)}function a(n,t){var i=n.length;if(Array.prototype.lastIndexOf)return n.lastIndexOf(t);while(i--)if(n[i]===t)return i;return-1}function s(n,t){return Object.prototype.toString.call(n).toLowerCase()==="[object "+t+"]"}function d(n){return n=n||{},n==="all"||n.all?n={natives:!0,extensibility:!0}:s(n,"string")&&(n=t.forEach(n,/[^\s,]+/,function(n){this[n]=!0},{})),n}function ut(n,t,i,u){var o=p.length,s=null,e,f;y=!0;try{while(o--)if(f=p[o],(f.scope==="all"||f.scope===i)&&(!f.trigger||f.trigger.call(u))&&(f.pattern.lastIndex=t,e=r.exec.call(f.pattern,n),e&&e.index===t)){s={output:f.handler.call(u,e,i),match:e};break}}catch(h){throw h;}finally{y=!1}return s}function b(n){t.addToken=c[n?"on":"off"],f.extensibility=n}function tt(n){RegExp.prototype.exec=(n?r:i).exec,RegExp.prototype.test=(n?r:i).test,String.prototype.match=(n?r:i).match,String.prototype.replace=(n?r:i).replace,String.prototype.split=(n?r:i).split,f.natives=n}var t,c,u,f={natives:!1,extensibility:!1},i={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},r={},k={},p=[],e="default",rt="class",it={"default":/^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/,"class":/^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/},et=/\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g,h=/([\s\S])(?=[\s\S]*\1)/g,nt=/^(?:[?*+]|{\d+(?:,\d*)?})\??/,ft=i.exec.call(/()??/,"")[1]===n,l=RegExp.prototype.sticky!==n,y=!1,w="gim"+(l?"y":"");return t=function(r,u){if(t.isRegExp(r)){if(u!==n)throw new TypeError("can't supply flags when constructing one RegExp from another");return o(r)}if(y)throw new Error("can't call the XRegExp constructor within token definition functions");var l=[],a=e,b={hasNamedCapture:!1,captureNames:[],hasFlag:function(n){return u.indexOf(n)>-1}},f=0,c,s,p;if(r=r===n?"":String(r),u=u===n?"":String(u),i.match.call(u,h))throw new SyntaxError("invalid duplicate regular expression flag");for(r=i.replace.call(r,/^\(\?([\w$]+)\)/,function(n,t){if(i.test.call(/[gy]/,t))throw new SyntaxError("can't use flag g or y in mode modifier");return u=i.replace.call(u+t,h,""),""}),t.forEach(u,/[\s\S]/,function(n){if(w.indexOf(n[0])<0)throw new SyntaxError("invalid regular expression flag "+n[0]);});f<r.length;)c=ut(r,f,a,b),c?(l.push(c.output),f+=c.match[0].length||1):(s=i.exec.call(it[a],r.slice(f)),s?(l.push(s[0]),f+=s[0].length):(p=r.charAt(f),p==="["?a=rt:p==="]"&&(a=e),l.push(p),++f));return v(new RegExp(l.join(""),i.replace.call(u,/[^gimy]+/g,"")),b.hasNamedCapture?b.captureNames:null)},c={on:function(n,t,r){r=r||{},n&&p.push({pattern:o(n,"g"+(l?"y":"")),handler:t,scope:r.scope||e,trigger:r.trigger||null}),r.customFlags&&(w=i.replace.call(w+r.customFlags,h,""))},off:function(){throw new Error("extensibility must be installed before using addToken");}},t.addToken=c.off,t.cache=function(n,i){var r=n+"/"+(i||"");return k[r]||(k[r]=t(n,i))},t.escape=function(n){return i.replace.call(n,/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},t.exec=function(n,t,i,u){var e=o(t,"g"+(u&&l?"y":""),u===!1?"y":""),f;return e.lastIndex=i=i||0,f=r.exec.call(e,n),u&&f&&f.index!==i&&(f=null),t.global&&(t.lastIndex=f?e.lastIndex:0),f},t.forEach=function(n,i,r,u){for(var e=0,o=-1,f;f=t.exec(n,i,e);)r.call(u,f,++o,n,i),e=f.index+(f[0].length||1);return u},t.globalize=function(n){return o(n,"g")},t.install=function(n){n=d(n),!f.natives&&n.natives&&tt(!0),!f.extensibility&&n.extensibility&&b(!0)},t.isInstalled=function(n){return!!f[n]},t.isRegExp=function(n){return s(n,"regexp")},t.matchChain=function(n,i){return function r(n,u){for(var o=i[u].regex?i[u]:{regex:i[u]},f=[],s=function(n){f.push(o.backref?n[o.backref]||"":n[0])},e=0;e<n.length;++e)t.forEach(n[e],o.regex,s);return u===i.length-1||!f.length?f:r(f,u+1)}([n],0)},t.replace=function(i,u,f,e){var c=t.isRegExp(u),s=u,h;return c?(e===n&&u.global&&(e="all"),s=o(u,e==="all"?"g":"",e==="all"?"":"g")):e==="all"&&(s=new RegExp(t.escape(String(u)),"g")),h=r.replace.call(String(i),s,f),c&&u.global&&(u.lastIndex=0),h},t.split=function(n,t,i){return r.split.call(n,t,i)},t.test=function(n,i,r,u){return!!t.exec(n,i,r,u)},t.uninstall=function(n){n=d(n),f.natives&&n.natives&&tt(!1),f.extensibility&&n.extensibility&&b(!1)},t.union=function(n,i){var l=/(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,o=0,f,h,c=function(n,t,i){var r=h[o-f];if(t){if(++o,r)return"(?<"+r+">"}else if(i)return"\\"+(+i+f);return n},e=[],r,u;if(!(s(n,"array")&&n.length))throw new TypeError("patterns must be a nonempty array");for(u=0;u<n.length;++u)r=n[u],t.isRegExp(r)?(f=o,h=r.xregexp&&r.xregexp.captureNames||[],e.push(t(r.source).source.replace(l,c))):e.push(t.escape(r));return t(e.join("|"),i)},t.version="2.0.0",r.exec=function(t){var r,f,e,o,u;if(this.global||(o=this.lastIndex),r=i.exec.apply(this,arguments),r){if(!ft&&r.length>1&&a(r,"")>-1&&(e=new RegExp(this.source,i.replace.call(g(this),"g","")),i.replace.call(String(t).slice(r.index),e,function(){for(var t=1;t<arguments.length-2;++t)arguments[t]===n&&(r[t]=n)})),this.xregexp&&this.xregexp.captureNames)for(u=1;u<r.length;++u)f=this.xregexp.captureNames[u-1],f&&(r[f]=r[u]);this.global&&!r[0].length&&this.lastIndex>r.index&&(this.lastIndex=r.index)}return this.global||(this.lastIndex=o),r},r.test=function(n){return!!r.exec.call(this,n)},r.match=function(n){if(t.isRegExp(n)){if(n.global){var u=i.match.apply(this,arguments);return n.lastIndex=0,u}}else n=new RegExp(n);return r.exec.call(n,this)},r.replace=function(n,r){var e=t.isRegExp(n),u,f,h,o;return e?(n.xregexp&&(u=n.xregexp.captureNames),n.global||(o=n.lastIndex)):n+="",s(r,"function")?f=i.replace.call(String(this),n,function(){var t=arguments,i;if(u)for(t[0]=new String(t[0]),i=0;i<u.length;++i)u[i]&&(t[0][u[i]]=t[i+1]);return e&&n.global&&(n.lastIndex=t[t.length-2]+t[0].length),r.apply(null,t)}):(h=String(this),f=i.replace.call(h,n,function(){var n=arguments;return i.replace.call(String(r),et,function(t,i,r){var f;if(i){if(f=+i,f<=n.length-3)return n[f]||"";if(f=u?a(u,i):-1,f<0)throw new SyntaxError("backreference to undefined group "+t);return n[f+1]||""}if(r==="$")return"$";if(r==="&"||+r==0)return n[0];if(r==="`")return n[n.length-1].slice(0,n[n.length-2]);if(r==="'")return n[n.length-1].slice(n[n.length-2]+n[0].length);if(r=+r,!isNaN(r)){if(r>n.length-3)throw new SyntaxError("backreference to undefined group "+t);return n[r]||""}throw new SyntaxError("invalid token "+t);})})),e&&(n.lastIndex=n.global?0:o),f},r.split=function(r,u){if(!t.isRegExp(r))return i.split.apply(this,arguments);var e=String(this),h=r.lastIndex,f=[],o=0,s;return u=(u===n?-1:u)>>>0,t.forEach(e,r,function(n){n.index+n[0].length>o&&(f.push(e.slice(o,n.index)),n.length>1&&n.index<e.length&&Array.prototype.push.apply(f,n.slice(1)),s=n[0].length,o=n.index+s)}),o===e.length?(!i.test.call(r,"")||s)&&f.push(""):f.push(e.slice(o)),r.lastIndex=h,f.length>u?f.slice(0,u):f},u=c.on,u(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4})|x(?![\dA-Fa-f]{2}))/,function(n,t){if(n[1]==="B"&&t===e)return n[0];throw new SyntaxError("invalid escape "+n[0]);},{scope:"all"}),u(/\[(\^?)]/,function(n){return n[1]?"[\\s\\S]":"\\b\\B"}),u(/(?:\(\?#[^)]*\))+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?"":"(?:)"}),u(/\\k<([\w$]+)>/,function(n){var t=isNaN(n[1])?a(this.captureNames,n[1])+1:+n[1],i=n.index+n[0].length;if(!t||t>this.captureNames.length)throw new SyntaxError("backreference to undefined group "+n[0]);return"\\"+t+(i===n.input.length||isNaN(n.input.charAt(i))?"":"(?:)")}),u(/(?:\s+|#.*)+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?"":"(?:)"},{trigger:function(){return this.hasFlag("x")},customFlags:"x"}),u(/\./,function(){return"[\\s\\S]"},{trigger:function(){return this.hasFlag("s")},customFlags:"s"}),u(/\(\?P?<([\w$]+)>/,function(n){if(!isNaN(n[1]))throw new SyntaxError("can't use integer as capture name "+n[0]);return this.captureNames.push(n[1]),this.hasNamedCapture=!0,"("}),u(/\\(\d+)/,function(n,t){if(!(t===e&&/^[1-9]/.test(n[1])&&+n[1]<=this.captureNames.length)&&n[1]!=="0")throw new SyntaxError("can't use octal escape or backreference to undefined group "+n[0]);return n[0]},{scope:"all"}),u(/\((?!\?)/,function(){return this.hasFlag("n")?"(?:":(this.captureNames.push(null),"(")},{customFlags:"n"}),typeof exports!="undefined"&&(exports.XRegExp=t),t}()

/*!
 * SyntaxHighlighter by Alex Gorbatchev
 * https://github.com/alexgorbatchev/SyntaxHighlighter - MIT license
 */

//
// Begin anonymous function. This is used to contain local scope variables without polutting global scope.
//
if (typeof(VisualEventSyntaxHighlighter) == 'undefined') var VisualEventSyntaxHighlighter = function() {

// CommonJS
if (typeof(require) != 'undefined' && typeof(XRegExp) == 'undefined')
{
    XRegExp = require('xregexp').XRegExp;
}

// Shortcut object which will be assigned to the SyntaxHighlighter variable.
// This is a shorthand for local reference in order to avoid long namespace
// references to SyntaxHighlighter.whatever...
var sh = {
    defaults : {
        /** Additional CSS class names to be added to highlighter elements. */
        'class-name' : '',

        /** First line number. */
        'first-line' : 1,

        /**
         * Pads line numbers. Possible values are:
         *
         *   false - don't pad line numbers.
         *   true  - automaticaly pad numbers with minimum required number of leading zeroes.
         *   [int] - length up to which pad line numbers.
         */
        'pad-line-numbers' : false,

        /** Lines to highlight. */
        'highlight' : null,

        /** Title to be displayed above the code block. */
        'title' : null,

        /** Enables or disables smart tabs. */
        'smart-tabs' : true,

        /** Gets or sets tab size. */
        'tab-size' : 4,

        /** Enables or disables gutter. */
        'gutter' : true,

        /** Enables or disables toolbar. */
        'toolbar' : true,

        /** Enables quick code copy and paste from double click. */
        'quick-code' : true,

        /** Forces code view to be collapsed. */
        'collapse' : false,

        /** Enables or disables automatic links. */
        'auto-links' : true,

        /** Gets or sets light mode. Equavalent to turning off gutter and toolbar. */
        'light' : false,

        'unindent' : true,

        'html-script' : false
    },

    config : {
        space : '&nbsp;',

        /** Enables use of <SCRIPT type="syntaxhighlighter" /> tags. */
        useScriptTags : true,

        /** Blogger mode flag. */
        bloggerMode : false,

        stripBrs : false,

        /** Name of the tag that SyntaxHighlighter will automatically look for. */
        tagName : 'pre',

        strings : {
            expandSource : 'expand source',
            help : '?',
            alert: 'VisualEventSyntaxHighlighter\n\n',
            noBrush : 'Can\'t find brush for: ',
            brushNotHtmlScript : 'Brush wasn\'t configured for html-script option: ',

            // this is populated by the build script
            aboutDialog : '<%- about %>'
        }
    },

    /** Internal 'global' variables. */
    vars : {
        discoveredBrushes : null,
        highlighters : {}
    },

    /** This object is populated by user included external brush files. */
    brushes : {},

    /** Common regular expressions. */
    regexLib : {
        multiLineCComments          : XRegExp('/\\*.*?\\*/', 'gs'),
        singleLineCComments         : /\/\/.*$/gm,
        singleLinePerlComments      : /#.*$/gm,
        doubleQuotedString          : /"([^\\"\n]|\\.)*"/g,
        singleQuotedString          : /'([^\\'\n]|\\.)*'/g,
        multiLineDoubleQuotedString : XRegExp('"([^\\\\"]|\\\\.)*"', 'gs'),
        multiLineSingleQuotedString : XRegExp("'([^\\\\']|\\\\.)*'", 'gs'),
        xmlComments                 : XRegExp('(&lt;|<)!--.*?--(&gt;|>)', 'gs'),
        url                         : /\w+:\/\/[\w-.\/?%&=:@;#]*/g,
        phpScriptTags               : { left: /(&lt;|<)\?(?:=|php)?/g, right: /\?(&gt;|>)/g, 'eof' : true },
        aspScriptTags               : { left: /(&lt;|<)%=?/g, right: /%(&gt;|>)/g },
        scriptScriptTags            : { left: /(&lt;|<)\s*script.*?(&gt;|>)/gi, right: /(&lt;|<)\/\s*script\s*(&gt;|>)/gi }
    },

    toolbar: {
        /**
         * Generates HTML markup for the toolbar.
         * @param {Highlighter} highlighter Highlighter instance.
         * @return {String} Returns HTML markup.
         */
        getHtml: function(highlighter)
        {

            var html = '<div class="toolbar">',
                items = sh.toolbar.items,
                list = items.list
                ;

            function defaultGetHtml(highlighter, name)
            {
                return sh.toolbar.getButtonHtml(highlighter, name, sh.config.strings[name]);
            }

            for (var i = 0, l = list.length; i < l; i++)
            {
                html += (items[list[i]].getHtml || defaultGetHtml)(highlighter, list[i]);
            }

            html += '</div>';

            return html;
        },

        /**
         * Generates HTML markup for a regular button in the toolbar.
         * @param {Highlighter} highlighter Highlighter instance.
         * @param {String} commandName      Command name that would be executed.
         * @param {String} label            Label text to display.
         * @return {String}                 Returns HTML markup.
         */
        getButtonHtml: function(highlighter, commandName, label)
        {
            return '<span><a href="#" class="toolbar_item'
                + ' command_' + commandName
                + ' ' + commandName
                + '">' + label + '</a></span>'
                ;
        },

        /**
         * Event handler for a toolbar anchor.
         */
        handler: function(e)
        {
            var target = e.target,
                className = target.className || ''
                ;

            function getValue(name)
            {
                var r = new RegExp(name + '_(\\w+)'),
                    match = r.exec(className)
                    ;

                return match ? match[1] : null;
            }

            var highlighter = getHighlighterById(findParentElement(target, '.Event_syntaxHighlighter').id),
                commandName = getValue('command')
                ;

            // execute the toolbar command
            if (highlighter && commandName)
                sh.toolbar.items[commandName].execute(highlighter);

            // disable default A click behaviour
            e.preventDefault();
        },

        /** Collection of toolbar items. */
        items : {
            // Ordered lis of items in the toolbar. Can't expect `for (var n in items)` to be consistent.
            list: ['expandSource', 'help'],

            expandSource: {
                getHtml: function(highlighter)
                {
                    if (highlighter.getParam('collapse') != true)
                        return '';

                    var title = highlighter.getParam('title');
                    return sh.toolbar.getButtonHtml(highlighter, 'expandSource', title ? title : sh.config.strings.expandSource);
                },

                execute: function(highlighter)
                {
                    var div = getHighlighterDivById(highlighter.id);
                    removeClass(div, 'collapsed');
                }
            },

            /** Command to display the about dialog window. */
            help: {
                execute: function(highlighter)
                {
                    var wnd = popup('', '_blank', 500, 250, 'scrollbars=0'),
                        doc = wnd.document
                        ;

                    doc.write(sh.config.strings.aboutDialog);
                    doc.close();
                    wnd.focus();
                }
            }
        }
    },

    /**
     * Finds all elements on the page which should be processes by SyntaxHighlighter.
     *
     * @param {Object} globalParams     Optional parameters which override element's
     *                                  parameters. Only used if element is specified.
     *
     * @param {Object} element  Optional element to highlight. If none is
     *                          provided, all elements in the current document
     *                          are returned which qualify.
     *
     * @return {Array}  Returns list of <code>{ target: DOMElement, params: Object }</code> objects.
     */
    findElements: function(globalParams, element)
    {
	//jbrunelle debug		
	document.getElementById("d1").innerHTML=document.getElementById("d1").innerHTML + "<br>ve_jquery findElements";

        var elements = element ? [element] : toArray(document.getElementsByTagName(sh.config.tagName)),
            conf = sh.config,
            result = []
            ;

        // support for <SCRIPT TYPE="syntaxhighlighter" /> feature
        if (conf.useScriptTags)
            elements = elements.concat(getSyntaxHighlighterScriptTags());

        if (elements.length === 0)
            return result;

        for (var i = 0, l = elements.length; i < l; i++)
        {
            var item = {
                target: elements[i],
                // local params take precedence over globals
                params: merge(globalParams, parseParams(elements[i].className))
            };

            if (item.params['brush'] == null)
                continue;

            result.push(item);
        }

        return result;
    },

    /**
     * Shorthand to highlight all elements on the page that are marked as
     * SyntaxHighlighter source code.
     *
     * @param {Object} globalParams     Optional parameters which override element's
     *                                  parameters. Only used if element is specified.
     *
     * @param {Object} element  Optional element to highlight. If none is
     *                          provided, all elements in the current document
     *                          are highlighted.
     */
    highlight: function(globalParams, element)
    {

	//jbrunelle debug		
	document.getElementById("d1").innerHTML=document.getElementById("d1").innerHTML + "<br>ve_jquery highlight";

        var elements = this.findElements(globalParams, element),
            propertyName = 'innerHTML',
            highlighter = null,
            conf = sh.config
            ;

        if (elements.length === 0)
            return;

        for (var i = 0, l = elements.length; i < l; i++)
        {
            var element = elements[i],
                target = element.target,
                params = element.params,
                brushName = params.brush,
                code
                ;

            if (brushName == null)
                continue;

            // Instantiate a brush
            if (params['html-script'] == 'true' || sh.defaults['html-script'] == true)
            {
                highlighter = new sh.HtmlScript(brushName);
                brushName = 'htmlscript';
            }
            else
            {
                var brush = findBrush(brushName);

                if (brush)
                    highlighter = new brush();
                else
                    continue;
            }

            code = target[propertyName];

            // remove CDATA from <SCRIPT/> tags if it's present
            if (conf.useScriptTags)
                code = stripCData(code);

            // Inject title if the attribute is present
            if ((target.title || '') != '')
                params.title = target.title;

            params['brush'] = brushName;
            highlighter.init(params);
            element = highlighter.getDiv(code);

            // carry over ID
            if ((target.id || '') != '')
                element.id = target.id;

            target.parentNode.replaceChild(element, target);
        }
    },

    /**
     * Main entry point for the SyntaxHighlighter.
     * @param {Object} params Optional params to apply to all highlighted elements.
     */
    all: function(params)
    {

	//jbrunelle debug		
	document.getElementById("d1").innerHTML=document.getElementById("d1").innerHTML + "<br>ve_jquery all";

        attachEvent(
            window,
            'load',
            function() { sh.highlight(params); }
        );
    }
}; // end of sh

/**
 * Checks if target DOM elements has specified CSS class.
 * @param {DOMElement} target Target DOM element to check.
 * @param {String} className Name of the CSS class to check for.
 * @return {Boolean} Returns true if class name is present, false otherwise.
 */
function hasClass(target, className)
{
    return target.className.indexOf(className) != -1;
};

/**
 * Adds CSS class name to the target DOM element.
 * @param {DOMElement} target Target DOM element.
 * @param {String} className New CSS class to add.
 */
function addClass(target, className)
{
    if (!hasClass(target, className))
        target.className += ' ' + className;
};

/**
 * Removes CSS class name from the target DOM element.
 * @param {DOMElement} target Target DOM element.
 * @param {String} className CSS class to remove.
 */
function removeClass(target, className)
{
    target.className = target.className.replace(className, '');
};

/**
 * Converts the source to array object. Mostly used for function arguments and
 * lists returned by getElementsByTagName() which aren't Array objects.
 * @param {List} source Source list.
 * @return {Array} Returns array.
 */
function toArray(source)
{
    var result = [];

    for (var i = 0, l = source.length; i < l; i++)
        result.push(source[i]);

    return result;
};

/**
 * Splits block of text into lines.
 * @param {String} block Block of text.
 * @return {Array} Returns array of lines.
 */
function splitLines(block)
{
    return block.split(/\r?\n/);
}

/**
 * Generates HTML ID for the highlighter.
 * @param {String} highlighterId Highlighter ID.
 * @return {String} Returns HTML ID.
 */
function getHighlighterId(id)
{
    var prefix = 'highlighter_';
    return id.indexOf(prefix) == 0 ? id : prefix + id;
};

/**
 * Finds Highlighter instance by ID.
 * @param {String} highlighterId Highlighter ID.
 * @return {Highlighter} Returns instance of the highlighter.
 */
function getHighlighterById(id)
{
    return sh.vars.highlighters[getHighlighterId(id)];
};

/**
 * Finds highlighter's DIV container.
 * @param {String} highlighterId Highlighter ID.
 * @return {Element} Returns highlighter's DIV element.
 */
function getHighlighterDivById(id)
{
    return document.getElementById(getHighlighterId(id));
};

/**
 * Stores highlighter so that getHighlighterById() can do its thing. Each
 * highlighter must call this method to preserve itself.
 * @param {Highilghter} highlighter Highlighter instance.
 */
function storeHighlighter(highlighter)
{
    sh.vars.highlighters[getHighlighterId(highlighter.id)] = highlighter;
};

/**
 * Looks for a child or parent node which has specified classname.
 * Equivalent to jQuery's $(container).find(".className")
 * @param {Element} target Target element.
 * @param {String} search Class name or node name to look for.
 * @param {Boolean} reverse If set to true, will go up the node tree instead of down.
 * @return {Element} Returns found child or parent element on null.
 */
function findElement(target, search, reverse /* optional */)
{
    if (target == null)
        return null;

    var nodes           = reverse != true ? target.childNodes : [ target.parentNode ],
        propertyToFind  = { '#' : 'id', '.' : 'className' }[search.substr(0, 1)] || 'nodeName',
        expectedValue,
        found
        ;

    expectedValue = propertyToFind != 'nodeName'
        ? search.substr(1)
        : search.toUpperCase()
        ;

    // main return of the found node
    if ((target[propertyToFind] || '').indexOf(expectedValue) != -1)
        return target;

    for (var i = 0, l = nodes.length; nodes && i < l && found == null; i++)
        found = findElement(nodes[i], search, reverse);

    return found;
};

/**
 * Looks for a parent node which has specified classname.
 * This is an alias to <code>findElement(container, className, true)</code>.
 * @param {Element} target Target element.
 * @param {String} className Class name to look for.
 * @return {Element} Returns found parent element on null.
 */
function findParentElement(target, className)
{
    return findElement(target, className, true);
};

/**
 * Finds an index of element in the array.
 * @ignore
 * @param {Object} searchElement
 * @param {Number} fromIndex
 * @return {Number} Returns index of element if found; -1 otherwise.
 */
function indexOf(array, searchElement, fromIndex)
{
    fromIndex = Math.max(fromIndex || 0, 0);

    for (var i = fromIndex, l = array.length; i < l; i++)
        if(array[i] == searchElement)
            return i;

    return -1;
};

/**
 * Generates a unique element ID.
 */
function guid(prefix)
{
    return (prefix || '') + Math.round(Math.random() * 1000000).toString();
};

/**
 * Merges two objects. Values from obj2 override values in obj1.
 * Function is NOT recursive and works only for one dimensional objects.
 * @param {Object} obj1 First object.
 * @param {Object} obj2 Second object.
 * @return {Object} Returns combination of both objects.
 */
function merge(obj1, obj2)
{
    var result = {}, name;

    for (name in obj1)
        result[name] = obj1[name];

    for (name in obj2)
        result[name] = obj2[name];

    return result;
};

/**
 * Attempts to convert string to boolean.
 * @param {String} value Input string.
 * @return {Boolean} Returns true if input was "true", false if input was "false" and value otherwise.
 */
function toBoolean(value)
{
    var result = { "true" : true, "false" : false }[value];
    return result == null ? value : result;
};

/**
 * Opens up a centered popup window.
 * @param {String} url      URL to open in the window.
 * @param {String} name     Popup name.
 * @param {int} width       Popup width.
 * @param {int} height      Popup height.
 * @param {String} options  window.open() options.
 * @return {Window}         Returns window instance.
 */
function popup(url, name, width, height, options)
{
    var x = (screen.width - width) / 2,
        y = (screen.height - height) / 2
        ;

    options +=  ', left=' + x +
                ', top=' + y +
                ', width=' + width +
                ', height=' + height
        ;
    options = options.replace(/^,/, '');

    var win = window.open(url, name, options);
    win.focus();
    return win;
};

/**
 * Adds event handler to the target object.
 * @param {Object} obj      Target object.
 * @param {String} type     Name of the event.
 * @param {Function} func   Handling function.
 */
function attachEvent(obj, type, func, scope)
{
    function handler(e)
    {
        e = e || window.event;

        if (!e.target)
        {
            e.target = e.srcElement;
            e.preventDefault = function()
            {
                this.returnValue = false;
            };
        }

        func.call(scope || window, e);
    };

    if (obj.attachEvent)
    {
        obj.attachEvent('on' + type, handler);
    }
    else
    {
        obj.addEventListener(type, handler, false);
    }
};

/**
 * Displays an alert.
 * @param {String} str String to display.
 */
function alert(str)
{
    window.alert(sh.config.strings.alert + str);
};

/**
 * Finds a brush by its alias.
 *
 * @param {String} alias        Brush alias.
 * @param {Boolean} showAlert   Suppresses the alert if false.
 * @return {Brush}              Returns bursh constructor if found, null otherwise.
 */
function findBrush(alias, showAlert)
{
    var brushes = sh.vars.discoveredBrushes,
        result = null
        ;

    if (brushes == null)
    {
        brushes = {};

        // Find all brushes
        for (var brush in sh.brushes)
        {
            var info = sh.brushes[brush],
                aliases = info.aliases
                ;

            if (aliases == null)
                continue;

            // keep the brush name
            info.brushName = brush.toLowerCase();

            for (var i = 0, l = aliases.length; i < l; i++)
                brushes[aliases[i]] = brush;
        }

        sh.vars.discoveredBrushes = brushes;
    }

    result = sh.brushes[brushes[alias]];

    if (result == null && showAlert)
        alert(sh.config.strings.noBrush + alias);

    return result;
};

/**
 * Executes a callback on each line and replaces each line with result from the callback.
 * @param {Object} str          Input string.
 * @param {Object} callback     Callback function taking one string argument and returning a string.
 */
function eachLine(str, callback)
{
    var lines = splitLines(str);

    for (var i = 0, l = lines.length; i < l; i++)
        lines[i] = callback(lines[i], i);

    // include \r to enable copy-paste on windows (ie8) without getting everything on one line
    return lines.join('\r\n');
};

/**
 * This is a special trim which only removes first and last empty lines
 * and doesn't affect valid leading space on the first line.
 *
 * @param {String} str   Input string
 * @return {String}      Returns string without empty first and last lines.
 */
function trimFirstAndLastLines(str)
{
    return str.replace(/^[ ]*[\n]+|[\n]*[ ]*$/g, '');
};

/**
 * Parses key/value pairs into hash object.
 *
 * Understands the following formats:
 * - name: word;
 * - name: [word, word];
 * - name: "string";
 * - name: 'string';
 *
 * For example:
 *   name1: value; name2: [value, value]; name3: 'value'
 *
 * @param {String} str    Input string.
 * @return {Object}       Returns deserialized object.
 */
function parseParams(str)
{
    var match,
        result = {},
        arrayRegex = XRegExp("^\\[(?<values>(.*?))\\]$"),
        pos = 0,
        regex = XRegExp(
            "(?<name>[\\w-]+)" +
            "\\s*:\\s*" +
            "(?<value>" +
                "[\\w%#-]+|" +      // word
                "\\[.*?\\]|" +      // [] array
                '".*?"|' +          // "" string
                "'.*?'" +           // '' string
            ")\\s*;?",
            "g"
        )
        ;

    while ((match = XRegExp.exec(str, regex, pos)) != null)
    {
        var value = match.value
            .replace(/^['"]|['"]$/g, '') // strip quotes from end of strings
            ;

        // try to parse array value
        if (value != null && arrayRegex.test(value))
        {
            var m = XRegExp.exec(value, arrayRegex);
            value = m.values.length > 0 ? m.values.split(/\s*,\s*/) : [];
        }

        result[match.name] = value;
        pos = match.index + match[0].length;
    }

    // AJJ - markdown style language option
    var a = str.match(/language-(.*)/);
    if ( a ) {
        result['brush'] = a[1];
    }

    return result;
};

/**
 * Wraps each line of the string into <code/> tag with given style applied to it.
 *
 * @param {String} str   Input string.
 * @param {String} css   Style name to apply to the string.
 * @return {String}      Returns input string with each line surrounded by <span/> tag.
 */
function wrapLinesWithCode(str, css)
{
    if (str == null || str.length == 0 || str == '\n')
        return str;

    str = str.replace(/</g, '&lt;');

    // Replace two or more sequential spaces with &nbsp; leaving last space untouched.
    str = str.replace(/ {2,}/g, function(m)
    {
        var spaces = '';

        for (var i = 0, l = m.length; i < l - 1; i++)
            spaces += sh.config.space;

        return spaces + ' ';
    });

    // Split each line and apply <span class="...">...</span> to them so that
    // leading spaces aren't included.
    if (css != null)
        str = eachLine(str, function(line)
        {
            if (line.length == 0)
                return '';

            var spaces = '';

            line = line.replace(/^(&nbsp;| )+/, function(s)
            {
                spaces = s;
                return '';
            });

            if (line.length == 0)
                return spaces;

            return spaces + '<code class="' + css + '">' + line + '</code>';
        });

    return str;
};

/**
 * Pads number with zeros until it's length is the same as given length.
 *
 * @param {Number} number   Number to pad.
 * @param {Number} length   Max string length with.
 * @return {String}         Returns a string padded with proper amount of '0'.
 */
function padNumber(number, length)
{
    var result = number.toString();

    while (result.length < length)
        result = '0' + result;

    return result;
};

/**
 * Replaces tabs with spaces.
 *
 * @param {String} code     Source code.
 * @param {Number} tabSize  Size of the tab.
 * @return {String}         Returns code with all tabs replaces by spaces.
 */
function processTabs(code, tabSize)
{
    var tab = '';

    for (var i = 0; i < tabSize; i++)
        tab += ' ';

    return code.replace(/\t/g, tab);
};

/**
 * Replaces tabs with smart spaces.
 *
 * @param {String} code    Code to fix the tabs in.
 * @param {Number} tabSize Number of spaces in a column.
 * @return {String}        Returns code with all tabs replaces with roper amount of spaces.
 */
function processSmartTabs(code, tabSize)
{
    var lines = splitLines(code),
        tab = '\t',
        spaces = ''
        ;

    // Create a string with 1000 spaces to copy spaces from...
    // It's assumed that there would be no indentation longer than that.
    for (var i = 0; i < 50; i++)
        spaces += '                    '; // 20 spaces * 50

    // This function inserts specified amount of spaces in the string
    // where a tab is while removing that given tab.
    function insertSpaces(line, pos, count)
    {
        return line.substr(0, pos)
            + spaces.substr(0, count)
            + line.substr(pos + 1, line.length) // pos + 1 will get rid of the tab
            ;
    };

    // Go through all the lines and do the 'smart tabs' magic.
    code = eachLine(code, function(line)
    {
        if (line.indexOf(tab) == -1)
            return line;

        var pos = 0;

        while ((pos = line.indexOf(tab)) != -1)
        {
            // This is pretty much all there is to the 'smart tabs' logic.
            // Based on the position within the line and size of a tab,
            // calculate the amount of spaces we need to insert.
            var spaces = tabSize - pos % tabSize;
            line = insertSpaces(line, pos, spaces);
        }

        return line;
    });

    return code;
};

/**
 * Performs various string fixes based on configuration.
 */
function fixInputString(str)
{
    var br = /<br\s*\/?>|&lt;br\s*\/?&gt;/gi;

    if (sh.config.bloggerMode == true)
        str = str.replace(br, '\n');

    if (sh.config.stripBrs == true)
        str = str.replace(br, '');

    return str;
};

/**
 * Removes all white space at the begining and end of a string.
 *
 * @param {String} str   String to trim.
 * @return {String}      Returns string without leading and following white space characters.
 */
function trim(str)
{
    return str.replace(/^\s+|\s+$/g, '');
};

/**
 * Unindents a block of text by the lowest common indent amount.
 * @param {String} str   Text to unindent.
 * @return {String}      Returns unindented text block.
 */
function unindent(str)
{
    var lines = splitLines(fixInputString(str)),
        indents = new Array(),
        regex = /^\s*/,
        min = 1000
        ;

    // go through every line and check for common number of indents
    for (var i = 0, l = lines.length; i < l && min > 0; i++)
    {
        var line = lines[i];

        if (trim(line).length == 0)
            continue;

        var matches = regex.exec(line);

        // In the event that just one line doesn't have leading white space
        // we can't unindent anything, so bail completely.
        if (matches == null)
            return str;

        min = Math.min(matches[0].length, min);
    }

    // trim minimum common number of white space from the begining of every line
    if (min > 0)
        for (var i = 0, l = lines.length; i < l; i++)
            lines[i] = lines[i].substr(min);

    return lines.join('\n');
};

/**
 * Callback method for Array.sort() which sorts matches by
 * index position and then by length.
 *
 * @param {Match} m1    Left object.
 * @param {Match} m2    Right object.
 * @return {Number}     Returns -1, 0 or -1 as a comparison result.
 */
function matchesSortCallback(m1, m2)
{
    // sort matches by index first
    if(m1.index < m2.index)
        return -1;
    else if(m1.index > m2.index)
        return 1;
    else
    {
        // if index is the same, sort by length
        if(m1.length < m2.length)
            return -1;
        else if(m1.length > m2.length)
            return 1;
    }

    return 0;
};

/**
 * Executes given regular expression on provided code and returns all
 * matches that are found.
 *
 * @param {String} code    Code to execute regular expression on.
 * @param {Object} regex   Regular expression item info from <code>regexList</code> collection.
 * @return {Array}         Returns a list of Match objects.
 */
function getMatches(code, regexInfo)
{
    function defaultAdd(match, regexInfo)
    {
        return match[0];
    };

    var index = 0,
        match = null,
        matches = [],
        func = regexInfo.func ? regexInfo.func : defaultAdd
        pos = 0
        ;

    while((match = XRegExp.exec(code, regexInfo.regex, pos)) != null)
    {
        var resultMatch = func(match, regexInfo);

        if (typeof(resultMatch) == 'string')
            resultMatch = [new sh.Match(resultMatch, match.index, regexInfo.css)];

        matches = matches.concat(resultMatch);
        pos = match.index + match[0].length;
    }

    return matches;
};

/**
 * Turns all URLs in the code into <a/> tags.
 * @param {String} code Input code.
 * @return {String} Returns code with </a> tags.
 */
function processUrls(code)
{
    var gt = /(.*)((&gt;|&lt;).*)/;

    return code.replace(sh.regexLib.url, function(m)
    {
        var suffix = '',
            match = null
            ;

        // We include &lt; and &gt; in the URL for the common cases like <http://google.com>
        // The problem is that they get transformed into &lt;http://google.com&gt;
        // Where as &gt; easily looks like part of the URL string.

        if (match = gt.exec(m))
        {
            m = match[1];
            suffix = match[2];
        }

        return '<a href="' + m + '">' + m + '</a>' + suffix;
    });
};

/**
 * Finds all <SCRIPT TYPE="syntaxhighlighter" /> elementss.
 * @return {Array} Returns array of all found SyntaxHighlighter tags.
 */
function getSyntaxHighlighterScriptTags()
{
    var tags = document.getElementsByTagName('script'),
        result = []
        ;

    for (var i = 0, l = tags.length; i < l; i++)
        if (tags[i].type == 'Event_syntaxHighlighter')
            result.push(tags[i]);

    return result;
};

/**
 * Strips <![CDATA[]]> from <SCRIPT /> content because it should be used
 * there in most cases for XHTML compliance.
 * @param {String} original Input code.
 * @return {String} Returns code without leading <![CDATA[]]> tags.
 */
function stripCData(original)
{
    var left = '<![CDATA[',
        right = ']]>',
        // for some reason IE inserts some leading blanks here
        copy = trim(original),
        changed = false,
        leftLength = left.length,
        rightLength = right.length
        ;

    if (copy.indexOf(left) == 0)
    {
        copy = copy.substring(leftLength);
        changed = true;
    }

    var copyLength = copy.length;

    if (copy.indexOf(right) == copyLength - rightLength)
    {
        copy = copy.substring(0, copyLength - rightLength);
        changed = true;
    }

    return changed ? copy : original;
};


/**
 * Quick code mouse double click handler.
 */
function quickCodeHandler(e)
{
    var target = e.target,
        highlighterDiv = findParentElement(target, '.Event_syntaxHighlighter'),
        container = findParentElement(target, '.container'),
        textarea = document.createElement('textarea'),
        highlighter
        ;

    if (!container || !highlighterDiv || findElement(container, 'textarea'))
        return;

    highlighter = getHighlighterById(highlighterDiv.id);

    // add source class name
    addClass(highlighterDiv, 'source');

    // Have to go over each line and grab it's text, can't just do it on the
    // container because Firefox loses all \n where as Webkit doesn't.
    var lines = container.childNodes,
        code = []
        ;

    for (var i = 0, l = lines.length; i < l; i++)
        code.push(lines[i].innerText || lines[i].textContent);

    // using \r instead of \r or \r\n makes this work equally well on IE, FF and Webkit
    code = code.join('\r');

    // For Webkit browsers, replace nbsp with a breaking space
    code = code.replace(/\u00a0/g, " ");

    // inject <textarea/> tag
    textarea.appendChild(document.createTextNode(code));
    container.appendChild(textarea);

    // preselect all text
    textarea.focus();
    textarea.select();

    // set up handler for lost focus
    attachEvent(textarea, 'blur', function(e)
    {
        textarea.parentNode.removeChild(textarea);
        removeClass(highlighterDiv, 'source');
    });
};

/**
 * Match object.
 */
sh.Match = function(value, index, css)
{
    this.value = value;
    this.index = index;
    this.length = value.length;
    this.css = css;
    this.brushName = null;
};

sh.Match.prototype.toString = function()
{
    return this.value;
};

/**
 * Simulates HTML code with a scripting language embedded.
 *
 * @param {String} scriptBrushName Brush name of the scripting language.
 */
sh.HtmlScript = function(scriptBrushName)
{
    var brushClass = findBrush(scriptBrushName),
        scriptBrush,
        xmlBrush = new sh.brushes.Xml(),
        bracketsRegex = null,
        ref = this,
        methodsToExpose = 'getDiv getHtml init'.split(' ')
        ;

    if (brushClass == null)
        return;

    scriptBrush = new brushClass();

    for(var i = 0, l = methodsToExpose.length; i < l; i++)
        // make a closure so we don't lose the name after i changes
        (function() {
            var name = methodsToExpose[i];

            ref[name] = function()
            {
                return xmlBrush[name].apply(xmlBrush, arguments);
            };
        })();

    if (scriptBrush.htmlScript == null)
    {
        alert(sh.config.strings.brushNotHtmlScript + scriptBrushName);
        return;
    }

    xmlBrush.regexList.push(
        { regex: scriptBrush.htmlScript.code, func: process }
    );

    function offsetMatches(matches, offset)
    {
        for (var j = 0, l = matches.length; j < l; j++)
            matches[j].index += offset;
    }

    function process(match, info)
    {
        var code = match.code,
            matches = [],
            regexList = scriptBrush.regexList,
            offset = match.index + match.left.length,
            htmlScript = scriptBrush.htmlScript,
            result
            ;

        // add all matches from the code
        for (var i = 0, l = regexList.length; i < l; i++)
        {
            result = getMatches(code, regexList[i]);
            offsetMatches(result, offset);
            matches = matches.concat(result);
        }

        // add left script bracket
        if (htmlScript.left != null && match.left != null)
        {
            result = getMatches(match.left, htmlScript.left);
            offsetMatches(result, match.index);
            matches = matches.concat(result);
        }

        // add right script bracket
        if (htmlScript.right != null && match.right != null)
        {
            result = getMatches(match.right, htmlScript.right);
            offsetMatches(result, match.index + match[0].lastIndexOf(match.right));
            matches = matches.concat(result);
        }

        for (var j = 0, l = matches.length; j < l; j++)
            matches[j].brushName = brushClass.brushName;

        return matches;
    }
};

/**
 * Main Highlither class.
 * @constructor
 */
sh.Highlighter = function()
{
    // not putting any code in here because of the prototype inheritance
};

sh.Highlighter.prototype = {
    /**
     * Returns value of the parameter passed to the highlighter.
     * @param {String} name             Name of the parameter.
     * @param {Object} defaultValue     Default value.
     * @return {Object}                 Returns found value or default value otherwise.
     */
    getParam: function(name, defaultValue)
    {
        var result = this.params[name];
        return toBoolean(result == null ? defaultValue : result);
    },

    /**
     * Shortcut to document.createElement().
     * @param {String} name     Name of the element to create (DIV, A, etc).
     * @return {HTMLElement}    Returns new HTML element.
     */
    create: function(name)
    {
        return document.createElement(name);
    },

    /**
     * Applies all regular expression to the code and stores all found
     * matches in the `this.matches` array.
     * @param {Array} regexList     List of regular expressions.
     * @param {String} code         Source code.
     * @return {Array}              Returns list of matches.
     */
    findMatches: function(regexList, code)
    {
        var result = [];

        if (regexList != null)
            for (var i = 0, l = regexList.length; i < l; i++)
                // BUG: length returns len+1 for array if methods added to prototype chain (oising@gmail.com)
                if (typeof (regexList[i]) == "object")
                    result = result.concat(getMatches(code, regexList[i]));

        // sort and remove nested the matches
        return this.removeNestedMatches(result.sort(matchesSortCallback));
    },

    /**
     * Checks to see if any of the matches are inside of other matches.
     * This process would get rid of highligted strings inside comments,
     * keywords inside strings and so on.
     */
    removeNestedMatches: function(matches)
    {
        // Optimized by Jose Prado (http://joseprado.com)
        for (var i = 0, l = matches.length; i < l; i++)
        {
            if (matches[i] === null)
                continue;

            var itemI = matches[i],
                itemIEndPos = itemI.index + itemI.length
                ;

            for (var j = i + 1, l = matches.length; j < l && matches[i] !== null; j++)
            {
                var itemJ = matches[j];

                if (itemJ === null)
                    continue;
                else if (itemJ.index > itemIEndPos)
                    break;
                else if (itemJ.index == itemI.index && itemJ.length > itemI.length)
                    matches[i] = null;
                else if (itemJ.index >= itemI.index && itemJ.index < itemIEndPos)
                    matches[j] = null;
            }
        }

        return matches;
    },

    /**
     * Creates an array containing integer line numbers starting from the 'first-line' param.
     * @return {Array} Returns array of integers.
     */
    figureOutLineNumbers: function(code)
    {
        var lines = [],
            firstLine = parseInt(this.getParam('first-line'))
            ;

        eachLine(code, function(line, index)
        {
            lines.push(index + firstLine);
        });

        return lines;
    },

    /**
     * Determines if specified line number is in the highlighted list.
     */
    isLineHighlighted: function(lineNumber)
    {
        var list = this.getParam('highlight', []);

        if (typeof(list) != 'object' && list.push == null)
            list = [ list ];

        return indexOf(list, lineNumber.toString()) != -1;
    },

    /**
     * Generates HTML markup for a single line of code while determining alternating line style.
     * @param {Integer} lineNumber  Line number.
     * @param {String} code Line    HTML markup.
     * @return {String}             Returns HTML markup.
     */
    getLineHtml: function(lineIndex, lineNumber, code)
    {
        var classes = [
            'line',
            'number' + lineNumber,
            'index' + lineIndex,
            'alt' + (lineNumber % 2 == 0 ? 1 : 2).toString()
        ];

        if (this.isLineHighlighted(lineNumber))
            classes.push('highlighted');

        if (lineNumber == 0)
            classes.push('break');

        return '<div class="' + classes.join(' ') + '">' + code + '</div>';
    },

    /**
     * Generates HTML markup for line number column.
     * @param {String} code         Complete code HTML markup.
     * @param {Array} lineNumbers   Calculated line numbers.
     * @return {String}             Returns HTML markup.
     */
    getLineNumbersHtml: function(code, lineNumbers)
    {
        var html = '',
            count = splitLines(code).length,
            firstLine = parseInt(this.getParam('first-line')),
            pad = this.getParam('pad-line-numbers')
            ;

        if (pad == true)
            pad = (firstLine + count - 1).toString().length;
        else if (isNaN(pad) == true)
            pad = 0;

        for (var i = 0; i < count; i++)
        {
            var lineNumber = lineNumbers ? lineNumbers[i] : firstLine + i,
                code = lineNumber == 0 ? sh.config.space : padNumber(lineNumber, pad)
                ;

            html += this.getLineHtml(i, lineNumber, code);
        }

        return html;
    },

    /**
     * Splits block of text into individual DIV lines.
     * @param {String} code         Code to highlight.
     * @param {Array} lineNumbers   Calculated line numbers.
     * @return {String}             Returns highlighted code in HTML form.
     */
    getCodeLinesHtml: function(html, lineNumbers)
    {
        html = trim(html);

        var lines = splitLines(html),
            padLength = this.getParam('pad-line-numbers'),
            firstLine = parseInt(this.getParam('first-line')),
            html = '',
            brushName = this.getParam('brush')
            ;

        for (var i = 0, l = lines.length; i < l; i++)
        {
            var line = lines[i],
                indent = /^(&nbsp;|\s)+/.exec(line),
                spaces = null,
                lineNumber = lineNumbers ? lineNumbers[i] : firstLine + i;
                ;

            if (indent != null)
            {
                spaces = indent[0].toString();
                line = line.substr(spaces.length);
                spaces = spaces.replace(' ', sh.config.space);
            }

            line = trim(line);

            if (line.length == 0)
                line = sh.config.space;

            html += this.getLineHtml(
                i,
                lineNumber,
                (spaces != null ? '<code class="' + brushName + ' spaces">' + spaces + '</code>' : '') + line
            );
        }

        return html;
    },

    /**
     * Returns HTML for the table title or empty string if title is null.
     */
    getTitleHtml: function(title)
    {
        return title ? '<caption>' + title + '</caption>' : '';
    },

    /**
     * Finds all matches in the source code.
     * @param {String} code     Source code to process matches in.
     * @param {Array} matches   Discovered regex matches.
     * @return {String} Returns formatted HTML with processed mathes.
     */
    getMatchesHtml: function(code, matches)
    {
        var pos = 0,
            result = '',
            brushName = this.getParam('brush', '')
            ;

        function getBrushNameCss(match)
        {
            var result = match ? (match.brushName || brushName) : brushName;
            return result ? result + ' ' : '';
        };

        // Finally, go through the final list of matches and pull the all
        // together adding everything in between that isn't a match.
        for (var i = 0, l = matches.length; i < l; i++)
        {
            var match = matches[i],
                matchBrushName
                ;

            if (match === null || match.length === 0)
                continue;

            matchBrushName = getBrushNameCss(match);

            result += wrapLinesWithCode(code.substr(pos, match.index - pos), matchBrushName + 'plain')
                    + wrapLinesWithCode(match.value, matchBrushName + match.css)
                    ;

            pos = match.index + match.length + (match.offset || 0);
        }

        // don't forget to add whatever's remaining in the string
        result += wrapLinesWithCode(code.substr(pos), getBrushNameCss() + 'plain');

        return result;
    },

    /**
     * Generates HTML markup for the whole syntax highlighter.
     * @param {String} code Source code.
     * @return {String} Returns HTML markup.
     */
    getHtml: function(code)
    {
        var html = '',
            classes = [ 'Event_syntaxHighlighter' ],
            tabSize,
            matches,
            lineNumbers
            ;

        // process light mode
        if (this.getParam('light') == true)
            this.params.toolbar = this.params.gutter = false;

        className = 'Event_syntaxHighlighter';

        if (this.getParam('collapse') == true)
            classes.push('collapsed');

        if ((gutter = this.getParam('gutter')) == false)
            classes.push('nogutter');

        // add custom user style name
        classes.push(this.getParam('class-name'));

        // add brush alias to the class name for custom CSS
        classes.push(this.getParam('brush'));

        code = trimFirstAndLastLines(code)
            .replace(/\r/g, ' ') // IE lets these buggers through
            ;

        tabSize = this.getParam('tab-size');

        // replace tabs with spaces
        code = this.getParam('smart-tabs') == true
            ? processSmartTabs(code, tabSize)
            : processTabs(code, tabSize)
            ;

        // unindent code by the common indentation
        if (this.getParam('unindent'))
            code = unindent(code);

        if (gutter)
            lineNumbers = this.figureOutLineNumbers(code);

        // find matches in the code using brushes regex list
        matches = this.findMatches(this.regexList, code);
        // processes found matches into the html
        html = this.getMatchesHtml(code, matches);
        // finally, split all lines so that they wrap well
        html = this.getCodeLinesHtml(html, lineNumbers);

        // finally, process the links
        if (this.getParam('auto-links'))
            html = processUrls(html);

        if (typeof(navigator) != 'undefined' && navigator.userAgent && navigator.userAgent.match(/MSIE/))
            classes.push('ie');

        html =
            '<div id="' + getHighlighterId(this.id) + '" class="' + classes.join(' ') + '">'
                + (this.getParam('toolbar') ? sh.toolbar.getHtml(this) : '')
                + '<table border="0" cellpadding="0" cellspacing="0">'
                    + this.getTitleHtml(this.getParam('title'))
                    + '<tbody>'
                        + '<tr>'
                            + (gutter ? '<td class="gutter">' + this.getLineNumbersHtml(code) + '</td>' : '')
                            + '<td class="code">'
                                + '<div class="container">'
                                    + html
                                + '</div>'
                            + '</td>'
                        + '</tr>'
                    + '</tbody>'
                + '</table>'
            + '</div>'
            ;

        return html;
    },

    /**
     * Highlights the code and returns complete HTML.
     * @param {String} code     Code to highlight.
     * @return {Element}        Returns container DIV element with all markup.
     */
    getDiv: function(code)
    {
        if (code === null)
            code = '';

        this.code = code;

        var div = this.create('div');

        // create main HTML
        div.innerHTML = this.getHtml(code);

        // set up click handlers
        if (this.getParam('toolbar'))
            attachEvent(findElement(div, '.toolbar'), 'click', sh.toolbar.handler);

        if (this.getParam('quick-code'))
            attachEvent(findElement(div, '.code'), 'dblclick', quickCodeHandler);

        return div;
    },

    /**
     * Initializes the highlighter/brush.
     *
     * Constructor isn't used for initialization so that nothing executes during necessary
     * `new SyntaxHighlighter.Highlighter()` call when setting up brush inheritence.
     *
     * @param {Hash} params Highlighter parameters.
     */
    init: function(params)
    {
        this.id = guid();

        // register this instance in the highlighters list
        storeHighlighter(this);

        // local params take precedence over defaults
        this.params = merge(sh.defaults, params || {})

        // process light mode
        if (this.getParam('light') == true)
            this.params.toolbar = this.params.gutter = false;
    },

    /**
     * Converts space separated list of keywords into a regular expression string.
     * @param {String} str    Space separated keywords.
     * @return {String}       Returns regular expression string.
     */
    getKeywords: function(str)
    {
        str = str
            .replace(/^\s+|\s+$/g, '')
            .replace(/\s+/g, '|')
            ;

        return '\\b(?:' + str + ')\\b';
    },

    /**
     * Makes a brush compatible with the `html-script` functionality.
     * @param {Object} regexGroup Object containing `left` and `right` regular expressions.
     */
    forHtmlScript: function(regexGroup)
    {
        var regex = { 'end' : regexGroup.right.source };

        if(regexGroup.eof)
            regex.end = "(?:(?:" + regex.end + ")|$)";

        this.htmlScript = {
            left : { regex: regexGroup.left, css: 'script' },
            right : { regex: regexGroup.right, css: 'script' },
            code : XRegExp(
                "(?<left>" + regexGroup.left.source + ")" +
                "(?<code>.*?)" +
                "(?<right>" + regex.end + ")",
                "sgi"
                )
        };
    }
}; // end of Highlighter

return sh;
}(); // end of anonymous function

// CommonJS
typeof(exports) != 'undefined' ? exports.VisualEventSyntaxHighlighter = VisualEventSyntaxHighlighter : null;



// JS brush
;(function()
{
    // CommonJS
    VisualEventSyntaxHighlighter = VisualEventSyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').VisualEventSyntaxHighlighter : null);

    function Brush()
    {
        var keywords =  'break case catch class continue ' +
                'default delete do else enum export extends false  ' +
                'for function if implements import in instanceof ' +
                'interface let new null package private protected ' +
                'static return super switch ' +
                'this throw true try typeof var while with yield';

        var r = VisualEventSyntaxHighlighter.regexLib;
        
        this.regexList = [
            { regex: r.multiLineDoubleQuotedString,                 css: 'string' },            // double quoted strings
            { regex: r.multiLineSingleQuotedString,                 css: 'string' },            // single quoted strings
            { regex: r.singleLineCComments,                         css: 'comments' },          // one line comments
            { regex: r.multiLineCComments,                          css: 'comments' },          // multiline comments
            { regex: /\s*#.*/gm,                                    css: 'preprocessor' },      // preprocessor tags like #region and #endregion
            { regex: new RegExp(this.getKeywords(keywords), 'gm'),  css: 'keyword' }            // keywords
            ];
    
        this.forHtmlScript(r.scriptScriptTags);
    };

    Brush.prototype = new VisualEventSyntaxHighlighter.Highlighter();
    Brush.aliases   = ['js', 'jscript', 'javascript', 'json'];

    VisualEventSyntaxHighlighter.brushes.JScript = Brush;

    // CommonJS
    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

window.VisualEventSyntaxHighlighter = VisualEventSyntaxHighlighter;

})();
/**
 * @summary     Visual Event
 * @description Visual Event - show Javascript events which have been attached to objects, and
 *              the event's associated function code, visually.
 * @file        VisualEvent_Loader.js
 * @author      Allan Jardine (www.sprymedia.co.uk)
 * @license     GPL v2
 * @contact     www.sprymedia.co.uk/contact
 *
 * @copyright Copyright 2007-2013 Allan Jardine.
 *
 * This source file is free software, under the GPL v2 license:
 *   http://www.gnu.org/licenses/gpl-2.0.html
 */

(function(window, document, $){

/*global VisualEvent,VisualEvent_Loader,VisualEvents,VisualEventSyntaxHighlighter*/


/** 
 * Visual Event will show, visually, which DOM elements on a web-page have events attached to
 * them, information about those events and the code accossiated with each handler for the 
 * event. It does this by parsing through the cache of Javascript libraries (as there is no DOM
 * method to get the information required), thus a major part of Visual Event are the library
 * parsers. A result of this is that universal display of events is not possible - there must
 * be a parser available.
 * 
 * Visual Event's display is broken into four major areas:
 *   - Label - The information toolbar at the bottom of the window (fixed) showing Visual Event
 * controls (close and help), the name of the program and information about the events that have
 * been found on the page.
 * 
 *   - Help - The help view is a completely blocking layer which shows information about Visual
 * Event and how to use it. A single click will remove the help layer and restore the standard
 * Visual Event view.
 * 
 *   - Display - A layer which provides a background to Visual Event (thus when Visual Event is 
 * active is it blocking to the web-page below it) and acts as a container for the boxes (DIVs)
 * which serve as a visual indicator that there is an event attached to the element below it
 * (sized to match the element with the event attached).
 * 
 *   - Lightbox - The event information and code display of attached events.
 * 
 * Note that currently there can only be one instance of Visual Event at a time, due to 
 * practicality (no point in showing the same thing twice, at the same time) and the use of
 * element IDs in the script.
 * 
 *  @class VisualEvent
 *  @constructor
 * 
 *  @example
 *     new VisualEvent();
*/
window.VisualEvent = function ()
{
	// Sanity check
	if ( ! this instanceof VisualEvent ) {
		alert( "VisualEvent warning: Must be initialised with the 'new' keyword." );
		return;
	}

	// Only one instance of VisualEvent at a time, in the current running mode. So if there is a
	// current instance, shut it down first
	if ( VisualEvent.instance !== null ) {
		VisualEvent.instance.close();
	}
	VisualEvent.instance = this;


	/**
	 * Settings object containing customisable information for the class instance
	 * @namespace
	 */
	this.s = {
		/** 
		 * Array of objects containing information about the nodes which have been found to have
		 * events attached to them. Each object contains the following parameters:
		 *   {element} node The DOM element in question
		 *   {array} listeners Array of objects which with details about each of the events on this node
		 *     {string} func Source of the event handler (from Function.toString())
		 *     {string} source Library name / version
		 *     {string} type Type of event (click, change, keyup etc)
		 *     {boolean} removed Flag to indicate if the event has been removed (for API)
		 *  @type     array
		 *  @default  null
		 */
		"elements": null,

		/** 
		 * setTimeout reference for delayed hiding of the lightbox layer
		 *  @type     int
		 *  @default  null
		 *  @private
		 */
		"mouseTimer": null,

		/** 
		 * Counter for the number of events which have been found from a JS library's cache, but
		 * are not currently available in the document's DOM
		 *  @type     int
		 *  @default  null
		 *  @private
		 */
		"nonDomEvents": 0,

		/** 
		 * Array of objects holding information about each SCRIPT tag that is found in the DOM. Each
		 * object contains the parameters:
		 *   {string} src The URL of the script source (or inline string if no src attribute)
		 *   {string} code The code (.text) from the script
		 *  @type     array
		 *  @default  []
		 *  @private
		 */
		"scripts": []
	};

	/**
	 * DOM elements used by the class instance
	 * @namespace
	 */
	this.dom = {
		
	};

	this._construct();
};


VisualEvent.prototype = {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * API methods
	 */

	/**
	 * Shutdown Visual Event and return to the original page
	 * @param {event} e Event object
	 */
	"close": function ( e )
	{
		// Remove all events that we've added
		$('*').unbind('.VisualEvent');
		$(document).unbind( 'keydown.VisualEvent' );

		$(this.dom.display).remove();
		$(this.dom.lightbox).remove();
		$(this.dom.label).remove();
		$(this.dom.help).remove();

		if ( typeof VisualEvent_Loader !== 'undefined' && !VisualEvent_Loader.jQueryPreLoaded ) {
			$.noConflict();
		}

		VisualEvent.instance = null;
	},


	/**
	 * Reinitialise Visual Event (i.e. bring it up-to-date with any new events which might have
	 *   been added
	 */
	"reInit": function ()
	{
		$('*').unbind('.VisualEvent');
		$(document).unbind( 'keydown.VisualEvent' );

		$(this.dom.display).empty();
		$(this.dom.display).remove();
		$(this.dom.lightbox).remove();
		$(this.dom.label).remove();
		$(this.dom.help).remove();

		this.s.elements.splice(0, this.s.elements.length);
		this.s.nonDomEvents = 0;

		this._construct();
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Visual Event constructor
	 *  @private
	 */
	"_construct": function ()
	{

		//console.log("From VE.js: debug1");

		//alert("constructing...1");
		/* Build the events list and display */
		this.s.elements = this._eventsLoad();

		//alert("constructing...2");

		var sneakyDiv = "\n\n\n";
		/**/
		for(var i = 0; i < this.s.elements.length; i++)
		{
			var accumulator = "";
			for(var j = 0 ; j < this.s.elements[i].listeners.length; j++)
			{
				//alert("j: " + j + " -- " + this.s.elements[i].listeners[j].type);
				if(j > 0)
				{
					accumulator += ", ";
				}
				accumulator += this.s.elements[i].listeners[j].type;
			}
		//	alert("constructing...2." + i + ": " + accumulator + " - " + $(this.s.elements[i].node));
			sneakyDiv += i + ": " + escape(this.s.elements[i].node.innerHTML) + " - " + accumulator + "\n\n";
		}
		sneakyDiv += "\n\n\n";

		var n4 = document.createElement( 'div' );
		n4.setAttribute( 'id', 'jbrunellesSuperSneakyDiv' );
		n4.setAttribute( 'hidden', 'true' );
		document.body.appendChild( n4 );


		document.getElementById("jbrunellesSuperSneakyDiv").innerHTML = sneakyDiv;

		/* Load the text of all the Javascript on the page so we can try to find source */
		this._scriptsLoad();
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * User help
	 */

	/**
	 * Show the help box
	 *  @private
	 */
	"_help": function () {
		document.body.appendChild( this.dom.help );
	},


	/**
	 * Hide hte help box
	 *  @private
	 */
	"_hideHelp": function () {
		document.body.removeChild( this.dom.help );
	},



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Javascript source handling
	 */

	/**
	 * Parse the DOM for script tags and store the Javascript that is found. For any scripts which
	 * have a 'src' attribute, add them to a queue for Ajax loading and then start the queue running
	 *  @private
	 */
	"_scriptsLoad": function ()
	{
		// Don't load scripts again if they are already loaded
		if ( this.s.scripts.length > 0 ) {
			return;
		}

		var loadQueue = [];
		var scripts = document.getElementsByTagName('script');
		for ( var i=0, iLen=scripts.length ; i<iLen ; i++ ) {
			if ( scripts[i].src  && scripts[i].src !== "" ) {
				if ( scripts[i].src.indexOf('VisualEvent') === -1 ) {
					loadQueue.push( scripts[i].src );
				}
			}
			else {
				this.s.scripts.push( {
					"src": "Inline script",
					"code": scripts[i].text
				} );
			}
		}

		this._scriptLoadQueue( loadQueue );
	},


	/**
	 * Pull an item off the script loading queue and load it up by an Ajax return. When done, loop
	 * back and load the next item off the queue, until all done.
	 *  @private
	 */
	"_scriptLoadQueue": function ( loadQueue )
	{
		/* Check if we still have anything to do or not */
		if ( loadQueue.length === 0 ) {
			return;
		}

		var that = this;
		var url = loadQueue.shift();

		$.ajax( {
			"dataType": 'text',
			"type": "GET",
			"url": url,
			"success": function (text) {
				that.s.scripts.push( {
					"src": url,
					"code": text
				} );
				that._scriptLoadQueue( loadQueue );
			},
			"error": function () {
				that._scriptLoadQueue( loadQueue );
			}
		} );
	},


	/**
	 * Attempt to find the source location (file and line number) for a given function and
	 * format a return string which is human readable explaining where the source might come from
	 *  @param {string} func The function string to search for
	 *  @returns {string} Formatted string with information about the source
	 *  @private
	 */
	"_scriptSource": function ( func )
	{
		var origin = "";
		var srcFiles = [];
		var i, iLen, a;

		// Webkit reformats the prototype for the function, so the whitespace might not match our
		// intended target. Remove the prototype - it means we are more likely to get a clash, but
		// don't see much choice if we want to do matching other than trying all variations
		func = $.trim( func.replace(/^(function.*?\))/, '') );

		for ( i=0, iLen=this.s.scripts.length ; i<iLen ; i++ ) {
			if ( this.s.scripts[i].code.indexOf( func ) !== -1 ) {
				a = this.s.scripts[i].code.split( func );
				srcFiles.push( {
					"src": this.s.scripts[i].src,
					"line": a[0].split('\n').length
				} );
			}
		}

		// Firefox reformats the functions from toString() rather than keeping the original format
		// so we'll never be able to find the original. Should we just return an empty string
		// for Firefox?

		if ( srcFiles.length === 0 ) {
			origin = "Function definition could not be found automatically<br/>";
		} else if ( srcFiles.length === 1 ) {
			origin = 'Function defined in ';
			if (srcFiles[0].src != 'Inline script') {
				origin += '<a href="' + srcFiles[0].src + '">'+this._scriptName(srcFiles[0].src)+'</a>:'+ srcFiles[0].line + "<br/>";
			} else {
				origin += srcFiles[0].src+"<br />";
			}
		} else {
			origin = "Function could originate in multiple locations:<br/>";
			for ( i=0, iLen=srcFiles.length ; i<iLen ; i++ ) {
				origin += (i+1)+'. '+
					' in <a href="'+srcFiles[i].src+'" target="_blank">'+this._scriptName(srcFiles[i].src)+'</a>:'+srcFiles[i].line+'<br/>';
			}
		}

		return origin;
	},


	/**
	 * Get the name of a file from a URL (i.e. the last part in a slash seperated string)
	 *  @param {string} src URL to get the file name from
	 *  @returns {string} File name
	 *  @private
	 */
	"_scriptName": function ( src )
	{
		var a = src.split('/');
		return a[ a.length-1 ];
	},



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Display
	 */

	/**
	 * Build the list of nodes that have events attached to them by going through all installed
	 * parsers
	 *  @returns {array} List of nodes with their associated events
	 *  @private
	 */
	"_eventsLoad": function ()
	{
		var i, iLen;
		var elements=[], libraryListeners;

		/* Gather the events from the supported libraries */
		for ( i=0, iLen=VisualEvent.parsers.length ; i<iLen ; i++ ) {
			// Given the millions of environments that the parsers will run in, it is quite possible one
			// will hit an error - if it does, just ignore it and pass on.
			try {
				libraryListeners = VisualEvent.parsers[i]();
				elements.push.apply( elements, libraryListeners );
			} catch (e) {
				console.log( 'Visual Event parser error:', e );
			}
		}

		/* Add the API array information - if it is available */
		if ( typeof VisualEvents == 'object' ) {
			if ( this._ceckIntegrity( VisualEvents ) ) {
				elements = this._combineEvents( elements, VisualEvents );
			}
		}

		/* Group the events */
		return this._merge( elements );
	},


	/**
	 * A node has at least one event subscribed to it - draw it visually
	 *  @param {object} eventNode Event information for this node in the same format as 
	 *    VisualEvent.s.elements objects
	 *  @private
	 */
	"_eventElement": function ( eventNode )
	{
		var that = this;
		var i, iLen;
		var pos;
		var label;

		// Element is hidden
		if ( $(eventNode.node).filter(':visible').length === 0 ) {
			this.s.nonDomEvents += 1;
			return;
		}

		pos = $(eventNode.node).offset();

		label = document.createElement( 'div' );
		label.style.position = "absolute";
		label.style.top = pos.top+"px";
		label.style.left = pos.left+"px";
		label.className = 'EventLabel Event_bg_'+this._getColorFromTypes( eventNode.listeners );

		/* If dealing with the html or body tags, don't paint over the whole screen */
		if ( eventNode.node != document.body && eventNode.node != document.documentElement ) {
			label.style.width = (eventNode.node.offsetWidth-4)+'px';
			label.style.height = (eventNode.node.offsetHeight-4)+'px';
		}

		/* Event listeners for showing the lightbox for this element */
		$(label).bind( 'dblclick.VisualEvent', function (e) {
			this.style.display = "none";
			return false;
		} ).bind( 'mouseover.VisualEvent', function (e) {
			that.dom.activeEventNode = this;
			that._lightboxList( e, eventNode.node, eventNode.listeners );
		} ).bind( 'mouseout.VisualEvent', function (e) {
			that._lightboxHide();
		} );

		/* Finally have the html engine render our output */
		this.dom.display.appendChild( label );
	},



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Lightbox
	 */

	/**
	 * Show the list of event types which are attached to this node and add event listeners to show
	 * the code when required (mouseover on the list)
	 *  @param {event} e The mouse event that triggered this display
	 *  @param {element} node The node with the attached listeners
	 *  @param {array} listeners List of listeners attached to the element
	 *  @private
	 */
	"_lightboxList": function ( e, node, listeners )
	{
		var that = this;
		var i, iLen;
		var ul;

		this._timerClear();

		$('i', this.dom.lightbox).html( this._renderNodeInfo(node) );
		$('div.Event_Code', this.dom.lightbox).empty();

		ul = $('ul', this.dom.lightbox).empty();
		for ( i=0, iLen=listeners.length ; i<iLen ; i++ ) {
			ul.append( $('<li>'+listeners[i].type+'</li>').bind( 'mouseover.VisualEvent',
				this._lightboxCode(e, node, listeners[i]) )
			);
		}

		/* Show the code for the first event in the list */
		$('li:eq(0)', this.dom.lightbox).mouseover();

		this._lightboxPosition( this.dom.lightbox, node );
	},


	/**
	 * Create a function which will build the HTML needed for the display of the code for an
	 * event handler
	 *  @param {event} e Original mouse event that triggered the lightbox to be shown
	 *  @param {element} node The node with the attached listeners
	 *  @param {object} listener Listener attached to the element
	 *  @returns {function} Function which will display the code for the event when called
	 *  @private
	 */
	"_lightboxCode": function ( e, node, listener )
	{
		var that = this;

		return function () {
			$('li', this.parentNode).removeClass( 'Event_EventSelected' );
			$(this).addClass( 'Event_EventSelected' );

			var evt = that._createEvent( e, listener.type, e.target );
			that._renderCode( e, listener.func, listener.source, listener.type,
				evt===null ? null : function() {
					node.dispatchEvent(evt);

					// Might cause stuff to move around by the activation of the event, so re-init
					setTimeout( function () {
						that.reInit.call(that);
					}, 200 );
				}
			);
		};
	},


	/**
	 * Position the lightbox relative to the element which has an event attached to it
	 *  @param {element} target The lightbox node to move (note there is only one this.dom.lightbox
	 *    but this keeps it nice and generic!)
	 *  @param {element} parent The element with the event attached to it
	 *  @private
	 */
	"_lightboxPosition": function ( target, parent )
	{
		var offset = $(parent).offset();
		var targetT = offset.top + 15; // magic number - height of info button
		var targetL = offset.left;
		var viewportW = $(window).width() - 25; // use window rather than document, since the target could cause the document to resize
		var viewportH = $(document).height();
		var targetW = $(target).width();
		var targetH = $(target).height();

		// Correct for over-run
		if ( targetL + targetW > viewportW ) {
			targetL -= (targetL + targetW) - viewportW;
		}

		if ( targetT + targetH > viewportH ) {
			targetH -= (targetT + targetH) - viewportH;
		}

		// Correct for under-run
		if ( targetT < 0 ) {
			targetT = 0;
		}

		if ( targetL < 0 ) {
			targetL = 0;
		}

		target.style.top = targetT+'px';
		target.style.left = targetL+'px';
		target.style.display = 'block';
	},


	/**
	 * Close the lightbox - use a cancellable timer for the hiding of the lightbox, so we can move 
	 * the mouse from element to element without having it flicker.
	 *  @private
	 */
	"_lightboxHide": function ()
	{
		var that = this;
		this.s.mouseTimer = setTimeout( function () {
				that.dom.lightbox.style.display = 'none';
			},
		200 );
	},



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rendering methods
	 */

	/**
	 * Display a tooltip with event information for a particular event handler
	 *  @param {event} e Target node information
	 *  @param {function} func The function string
	 *  @param {string} type Event type
	 *  @param {function|null} trigger Function to trigger the event
	 *  @private
	 */
	"_renderCode": function( e, func, source, type, trigger )
	{
		var that = this;
		var eventElement = e.target;
		var i, iLen;

		this._timerClear( e );

		if ( trigger === null ) {
			$('div.Event_Code', this.dom.lightbox).html( '<div id="Event_inner"><p><i>'+type+
				'</i> event subscribed by '+source+'<br/>'+
				this._scriptSource( func )+
				'</p><pre id="Event_code" class="brush: js"></pre></div>' );
		}
		else {
			$('div.Event_Code', this.dom.lightbox).html( '<div id="Event_inner"><p><i>'+type+
				'</i> event subscribed by '+source+' ('+
				'<span id="Event_Trigger">trigger event</span>)<br/>'+
				this._scriptSource( func )+
				'</p><pre id="Event_code" class="brush: js"></pre></div>' );
			$('#Event_Trigger').bind( 'click.VisualEvent', trigger );
		}

		/* Modify the function slightly such that the white space that is found at the start of the
		 * last line in the function is also put at the start of the first line. This allows
		 * SyntaxHighlighter to be cunning and remove the block white space - otherwise it is all
		 * shifted to the left, other than the first line
		 */
		var lines = func.split('\n');
		if ( lines.length > 1 ) {
			var last = lines[lines.length-1].match(/^(\s*)/g);
			lines[0] = last + lines[0];
			func = lines.join('\n');
		}

		/* Inject the function string here incase it includes a '</textarea>' string */
		$('pre', this.dom.lightbox).html(
			func.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
		);

		VisualEventSyntaxHighlighter.highlight( null, document.getElementById('Event_code') );
	},


	/**
	 * Show information about a particular node - the node name, ID and class (if it has either/both
	 * of the last two)
	 *  @param {element} node The element to inspect
	 *  @returns {string} Information about the element
	 *  @private
	 */
	"_renderNodeInfo": function ( node )
	{
		var s = node.nodeName.toLowerCase();

		var id = node.getAttribute('id');
		if ( id && id !== '' ) {
			s += '#'+id;
		}

		var className = node.className;
		if ( className !== '' ) {
			s += '.'+className;
		}

		return s;
	},


	/**
	 * Display the Visual Event toolbar, writing in the required information and adding the event
	 * handlers as needed
	 *  @private
	 */
	"_renderLabel": function ()
	{
		/**jbrunelle commenting to prevent viz layer **
		var that = this,
			events = 0, i, iLen;

		for (i=0, iLen=this.s.elements.length ; i<iLen ; i++ ) {
			events += this.s.elements[i].listeners.length;
		}

		$('span.Event_LabelEvents', this.dom.label).html( events );
		$('span.Event_LabelNodes', this.dom.label).html( this.s.elements.length );
		$('span.Event_LabelNonDom', this.dom.label).html( this.s.nonDomEvents );

		//this.dom.label.innerHTML = "Visual Event";
		$('span.Event_LabelClose', this.dom.label).bind( 'click.VisualEvent', function () {
			that.close();
		} );

		$('span.Event_LabelHelp', this.dom.label).bind( 'click.VisualEvent', function () {
			that._help();
		} );

		$(this.dom.help).bind( 'click.VisualEvent', function () {
			that._hideHelp();
		} );
		/**/
	},



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Support methods
	 */

	/**
	 * Create an event oject based on the type to trigger an event - cross-platform
	 *  @param {event} originalEvt The original event (click) which caused this function to run
	 *  @param {string} type Type of event
	 *  @param {node} target Target node of the event
	 *  @returns {event} The constructed event
	 *  @private
	 */
	"_createEvent": function( originalEvt, type, target )
	{
		var evt = null;
		var offset = $(target).offset();
		var typeGroup = this._eventTypeGroup( type );

		if ( document.createEvent ) {
			switch ( typeGroup ) {
				case 'mouse':
					evt = document.createEvent( "MouseEvents" );
					evt.initMouseEvent( type, true, true, window, 0, offset.left, offset.top,
						offset.left, offset.top, originalEvt.ctrlKey, originalEvt.altKey, originalEvt.shiftKey,
						originalEvt.metaKey, originalEvt.button, null );
					break;

				case 'html':
					evt = document.createEvent( "HTMLEvents" );
					evt.initEvent( type, true, true );
					break;

				case 'ui':
					evt = document.createEvent( "UIEvents" );
					evt.initUIEvent( type, true, true, window, 0 );
					break;

				default:
					break;
			}
		}
		else if ( document.createEventObject ) {
			switch ( typeGroup ) {
				case 'mouse':
					evt = document.createEventObject();
					evt.screenX = offset.left;
					evt.screenX = offset.top;
					evt.clientX = offset.left;
					evt.clientY = offset.top;
					evt.ctrlKey = originalEvt.ctrlKey;
					evt.altKey = originalEvt.altKey;
					evt.metaKey = originalEvt.metaKey;
					evt.button = originalEvt.button;
					evt.relatedTarget = null;
					break;

				case 'html':
					/* fall through to basic event object */

				case 'ui':
					evt = document.createEventObject();
					break;

				default:
					break;
			}
		}

		return evt;
	},


	/**
	 * Cancel tooltip mouse timer
	 *  @param {event} e Mouse event
	 *  @private
	 */
	"_timerClear": function ( e )
	{
		if ( this.s.mouseTimer !== null ) {
			clearTimeout( this.s.mouseTimer );
			this.s.mouseTimer = null;
		}
	},


	/**
	 * Combine the main events array, so that each node only has one element
	 *  @param {array} main The main source array
	 *  @returns {array} Augmented internal representation
	 *  @private
	 */
	"_merge": function ( main )
	{
		var ret = [];
		var found, i, iLen, j, jLen;

		for ( i=0, iLen=main.length ; i<iLen ; i++ ) {
			found = false;

			for ( j=0, jLen=ret.length ; j<jLen ; j++ ) {
				if ( ret[j].node == main[i].node ) {
					ret[j].listeners = ret[j].listeners.concat( main[i].listeners );
					found = true;
					break;
				}
			}

			if ( !found ) {
				ret.push( main[i] );
			}
		}

		return ret;
	},


	/**
	 * Combine the API array into the internal representation.
	 * The input structure MUST be valid for this to work - two types of objects are allowed as 
	 *   array entries:
	 *     { node: '', source: '', func: '', type: '', removed: bool }
	 *     { node: '', source: '', listeners: [ func: '', type: '', removed: bool, ... ] }
	 *  @param {array} main The main source array
	 *  @param {array} api The API array
	 *  @returns {array} Augmented internal representation
	 *  @private
	 */
	"_combineEvents": function ( main, api )
	{
		var i, j,
			found, found2;

		for ( i=0 ; i<api.length ; i++ ) {
			if ( typeof api[i].listeners != 'undefined' ) {
				main.push( api[i] );
			}
			else {
				found = -1;

				/* Want to combine single definitions into our single entry for each node array */
				for ( j=0 ; j<main.length ; j++ ) {
					if ( main[j].node == api[i].node ) {
						found = j;
						break;
					}
				}

				if ( found == -1 ) {
					main.push( {
						"node": api[i].node,
						"source": api[i].source,
						"listeners": [ {
							"type": api[i].type,
							"func": api[i].func,
							"removed": api[i].removed
						} ]
					} );
				}
				else {
					/* Check to see if this exact event has already been added at some point */
					found2 = -1;
					for ( j=0 ; j<main[ found ].listeners.length ; j++ ) {
						if ( main[ found ].listeners[j].type == api[i].type &&
								 main[ found ].listeners[j].func == api[i].func )
						{
							/* Update removed variable */
							main[ found ].listeners[j].removed = api[i].removed;
							found2 = j;
							break;
						}
					}

					/* If not found - then add it in */
					if ( found2 != -1 ) {
						main[ found ].listeners.push( {
							"type": api[i].type,
							"func": api[i].func,
							"removed": api[i].removed
						} );
					}
				}
			}
		}

		return main;
	},


	/**
	 * Group the event types as per w3c groupings
	 *  @param {string} type Event type
	 *  @returns {string} Event grouping
	 *  @private
	 */
	"_eventTypeGroup": function ( type )
	{
		switch ( type ) {
			case 'click':
			case 'dblclick':
			case 'mousedown':
			case 'mousemove':
			case 'mouseout':
			case 'mouseover':
			case 'mouseup':
			case 'scroll':
				return 'mouse';

			case 'change':
			case 'focus':
			case 'blur':
			case 'select':
			case 'submit':
				return 'html';

			case 'keydown':
			case 'keypress':
			case 'keyup':
			case 'load':
			case 'unload':
				return 'ui';

			default:
				return 'custom';
		}
	},


	/**
	 * Compute the background colour of the event indicator from the event types
	 *  @param {array} events Events information
	 *  @returns {string} Color
	 *  @private
	 */
	"_getColorFromTypes": function ( events )
	{
		var hasMouse = false;
		var hasHtml = false;
		var hasUi = false;
		var group, i;

		for ( i=0 ; i<events.length ; i++ ) {
			group = this._eventTypeGroup( events[i].type );

			switch ( group ) {
				case 'mouse':
					hasMouse = true;
					break;

				case 'html':
					hasHtml = true;
					break;

				case 'ui':
					/* We call 'custom' and 'unknown' types UI as well */
					hasUi = true;
					break;

				default:
					hasUi = true;
					break;
			}
		}

		/*
		 * Since we have three event groups which can be in any combination - then we can group the
		 * resultant colours via the colour wheel
		 *        
		 *                        Red (UI)
		 *                         +++++
		 *                       ++     ++
		 *                     ++         ++
		 *                     ++         ++
		 *       Yellow (Html)   ++     ++   Blue (mouse)
		 *                         +++++
		 */
	 if ( hasMouse && hasHtml && hasUi ) {
			return 'black';
		}
		else if ( !hasMouse && hasHtml && hasUi ) {
			return 'orange';
		}
		else if ( hasMouse && !hasHtml && hasUi ) {
			return 'purple';
		}
		else if ( hasMouse && hasHtml && !hasUi ) {
			return 'green';
		}
		else if ( hasMouse ) {
			return 'blue';
		}
		else if ( hasHtml ) {
			return 'yellow';
		}
		else if ( hasUi ) {
			return 'red';
		}
	}
};



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Statics
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/**
 * Javascript library parsers which will find information about the nodes and events which are
 * used in the page. This is an array of functions which must return an array of objects with
 * the following parameters
 *   {element} node The DOM element in question
 *   {array} listeners Array of objects which with details about each of the events on this node
 *     {string} func Source of the event handler (from Function.toString())
 *     {string} source Library name / version
 *     {string} type Type of event (click, change, keyup etc)
 *     {boolean} removed Flag to indicate if the event has been removed (for API)
 *  @type array
 *  @default []
 *  @static
 */
VisualEvent.parsers = [];


/**
 * Reference to the currently running VisualEvent instance (one at a time only)
 *  @type object
 *  @default null
 *  @static
 *  @private
 */
VisualEvent.instance = null;


/**
 * Close Visual Event, removing all DOM elements and event handlers
 *  @static
 */
VisualEvent.close = function ()
{
	VisualEvent.instance.close();
	VisualEvent.instance = null;
};


/**
 * Compare two version strings
 *  @static
 *  @param {string} v1 Version 1 string
 *  @param {string} operator '<', '<=', '==', '>=' or '>' - logic operation to
 *    perform
 *  @param {string} v2 Version 2 string
 *  @returns {boolean} true if condition is correct, false otherwise
 */
VisualEvent.versionCompare = function ( v1, operator, v2 ) {
	var a1 = v1.split('.');
	var a2 = v2.split('.');
	var i1, i2;
	var test = 0;

	for ( var i=0, iLen=a2.length ; i<iLen ; i++ ) {
		i1 = parseInt( a1[i], 10 ) || 0;
		i2 = parseInt( a2[i], 10 ) || 0;

		// Parts are the same, keep comparing
		if ( i1 < i2 ) {
			test = -1;
			break;
		}
		else if ( i1 > i2 ) {
			test = 1;
			break;
		}
	}

	if ( operator === '<' ) {
		return test === -1;
	}
	else if ( operator === '<=' ) {
		return test === -1 || test === 0;
	}
	else if ( operator === '==' ) {
		return test === 0;
	}
	else if ( operator === '>=' ) {
		return test === 0 || test === 1;
	}
	else if ( operator === '>' ) {
		return test === 1;
	}
	throw 'Unknown operator: '+operator;
};


})(window, document, jQuery);

(function(window, document, $, VisualEvent){

VisualEvent.parsers.push( function () {
	var
		elements = [], n,
		all = document.getElementsByTagName('*'),
		types = [ 'click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover',
			'mouseup', 'change', 'focus', 'blur', 'scroll', 'select', 'submit', 'keydown', 'keypress',
			'keyup', 'load', 'unload' ],
		i, iLen, j, jLen = types.length;

	for ( i=0, iLen=all.length ; i<iLen ; i++ ) {
		for ( j=0 ; j<jLen ; j++ ) {
			if ( typeof all[i]['on'+types[j]] == 'function' ) {
				elements.push( {
					"node": all[i],
					"listeners": [ {
						"type": types[j],
						"func": all[i]['on'+types[j]].toString(),
						"removed": false,
						"source": 'DOM 0 event'
					} ]
				} );
			}
		}
	}

	return elements;
} );

})(window, document, jQuery, VisualEvent);
(function(window, document, VisualEvent){

function eventsFor(node) {
    var listener = node[Eventi._._key];
    if (listener) {
        var record = {
            node: node,
            listeners: []
        },
        cache = listener.s;
        for (var type in cache) {
            var handlers = cache[type];
            for (var i=0,m=handlers.length; i<m; i++) {
                var handler = handlers[i];
                record.listeners.push({
                    type: handler.text,
                    func: handler.fn.toString(),
                    removed: false,
                    source: 'Eventi'
                });
            }
        }
        if (record.listeners.length) {
            return record;
        }
    }
}

/*global Eventi*/
VisualEvent.parsers.push(function() {
    var list = [];
    if (typeof Eventi !== 'undefined') {
        var key = Eventi._._key,
            nodes = document.getElementsByTagName('*'),
            record;
        if ((record = eventsFor(window))) {
            list.push(record);
        }
        for (var i=0,m=nodes.length ; i<m ; i++ ) {
            if ((record = eventsFor(nodes[i]))) {
                list.push(record);
            }
        }
    }
    return list;
} );

})(window, document, VisualEvent);
(function(window, document, $, VisualEvent){

/*global Ext*/

VisualEvent.parsers.push( function () {
	if ( typeof Ext == "undefined" || Ext.versions.core.version.indexOf('4.0') !== 0 ) {
		return [];
	}

	var elements = [];

	for ( var j in Ext.cache ) {
		var cache = Ext.cache[j];
		if ( typeof cache.events == 'object' ) {

			var events = cache.events;
			if ( !$.isEmptyObject( events ) ) {

				var listeners = [];

				for ( var event in events ) {
					// there is an array of handlers for each event
					if (events[event].length > 0) {
						for (var k=0; k<events[event].length; ++k) {
							listeners.push( {
								"type": event,
								"func": events[event][k].fn.toString(),
								"removed": false,
								"source": 'ExtJS '+Ext.versions.core.version
							} );
						}
					}
				}

				if (listeners.length > 0) {
					elements.push( {
						"node": cache.el.dom,
						"listeners": listeners
					} );
				}
			}
		}
	}

	return elements;
} );

})(window, document, jQuery, VisualEvent);

(function(window, document, $, VisualEvent){

/*global glow*/

VisualEvent.parsers.push( function () {
	if ( typeof glow == 'undefined' || typeof glow.events.listenersByObjId == 'undefined' ) {
		return [];
	}

	var listeners = glow.events.listenersByObjId;
	var globalGlow = "__eventId"+glow.UID;
	var elements = [];
	var all = document.getElementsByTagName('*');
	var i, iLen, j, jLen;
	var eventIndex, eventType, typeEvents;

	for ( i=0, iLen=all.length ; i<iLen ; i++ ) {
		/* If the element has a "__eventId"+glow.UID parameter, then it has glow events */
		if ( typeof all[i][globalGlow] != 'undefined' ) {
			eventIndex = all[i][globalGlow];

			elements.push( {
				"node": all[i],
				"listeners": []
			} );

			for ( eventType in listeners[eventIndex] ) {
				typeEvents = listeners[eventIndex][eventType];

				/* There is a sub array for each event type in Glow, so we loop over that */
				for ( j=0, jLen=typeEvents.length ; j<jLen ; j++ ) {
					elements[ elements.length-1 ].listeners.push( {
						"type": eventType,
						"func": typeEvents[j][2].toString(),
						"removed": false,
						"source": "Glow"
					} );
				}
			}
		}
	}

	return elements;
} );

})(window, document, jQuery, VisualEvent);


(function(window, document, $, VE) {

/*global jQuery*/

// jQuery 1.5, 1.6
VE.parsers.push( function () {
	if ( ! jQuery ||
		VE.versionCompare( jQuery.fn.jquery, '<', '1.5' ) ||
		VE.versionCompare( jQuery.fn.jquery, '>=', '1.7' ) )
	{
		return [];
	}

	var elements = [];
	for ( var j in jQuery.cache ) {
		jQueryGenericLoop( elements, jQuery.cache[j] );
	}

	return elements;
});


// jQuery 1.4, 1.7
VE.parsers.push( function () {
	if ( ! jQuery ) {
		return [];
	}

	if (
		( VE.versionCompare( jQuery.fn.jquery, '>=', '1.4' ) && VE.versionCompare( jQuery.fn.jquery, '<', '1.5' ) ) ||
		( VE.versionCompare( jQuery.fn.jquery, '>=', '1.7' ) && VE.versionCompare( jQuery.fn.jquery, '<', '1.8' ) ) )
	{
		var elements = [];
		jQueryGenericLoop( elements, jQuery.cache );
		return elements;
	}

	return [];
});


// jQuery 1.8+
VE.parsers.push( function () {
	if ( ! jQuery || VE.versionCompare( jQuery.fn.jquery, '<', '1.8' ) ) {
		return [];
	}

	var elements = [];

	// Get all 'live' (on) events
	$(document).each(function(index1, element) {
		jQueryGeneric(elements, element, element);
	});

	// Get events on nodes
	$('*').each(function(index1, element) {
		jQueryGeneric(elements, element, element);
	});

	return elements;
});


function jQueryGenericLoop (elements, cache) {
	$.each( cache, function ( key, val ) {
		if ( val.handle ) {
			jQueryGeneric(elements, val, val.handle.elem);
		}
	} );
}

function jQueryGeneric (elements, eventsObject, node) {
	if ( typeof eventsObject == 'object' ) {
		var events;

		if (typeof eventsObject.events == 'object') {
			events = eventsObject.events;
		}

		if ( ! events ) {
			events = $._data(eventsObject, 'events');
		}

		var func;

		for ( var type in events ) {
			if ( events.hasOwnProperty( type ) ) {
				/* Ignore live event object - live events are listed as normal events as well */
				if ( type == 'live' ) {
					continue;
				}

				var oEvents = events[type];

				for ( var j in oEvents ) {
					if ( oEvents.hasOwnProperty( j ) ) {
						var aNodes = [];
						var sjQuery = "jQuery " + jQuery.fn.jquery;

						if ( typeof oEvents[j].selector != 'undefined' && oEvents[j].selector !== null ) {
							aNodes = $(oEvents[j].selector, node);
							sjQuery += " (live event)";
						}
						else {
							aNodes.push( node );
						}

						for ( var k=0, kLen=aNodes.length ; k<kLen ; k++ ) {
							elements.push( {
								"node": aNodes[k],
								"listeners": []
							} );

							if ( typeof oEvents[j].origHandler != 'undefined' ) {
								func = oEvents[j].origHandler.toString();
							}
							else if ( typeof oEvents[j].handler != 'undefined' ) {
								func = oEvents[j].handler.toString();
							}
							else {
								func = oEvents[j].toString();
							}

							/* We use jQuery for the Visual Event events... don't really want to display them */
							if ( oEvents[j] && oEvents[j].namespace != "VisualEvent" && func != "0" )
							{
								elements[ elements.length-1 ].listeners.push( {
									"type": type,
									"func": func,
									"removed": false,
									"source": sjQuery
								} );
							}
						}
					}

					// Remove elements that didn't have any listeners (i.e. might be a Visual Event node)
					if ( elements.length && elements[ elements.length-1 ].listeners.length === 0 ) {
						elements.splice( elements.length-1, 1 );
					}
				}
			}
		}
	}
}

})(window, document, jQuery, VisualEvent);


(function(window, document, $, VE){

/*global jQuery*/

// jQuery 1.3
VE.parsers.push( function () {
	if ( !jQuery || VE.versionCompare( jQuery.fn.jquery, '>', '1.3' ) ) {
		return [];
	}

	var elements = [];
	var cache = jQuery.cache;

	for ( var i in cache ) {
		if ( typeof cache[i].events == 'object' ) {
			var nEventNode = cache[i].handle.elem;

			elements.push( {
				"node": nEventNode,
				"listeners": []
			} );

			for ( var type in cache[i].events )
			{
				var oEvent = cache[i].events[type];
				var iFunctionIndex;
				for ( iFunctionIndex in oEvent) {
					break;
				}

				/* We use jQuery for the Visual Event events... don't really want to display them */
				var func = oEvent[ iFunctionIndex ].toString();
				if ( !func.match(/VisualEvent/) && !func.match(/EventLoader/) )
				{
					elements[ elements.length-1 ].listeners.push( {
						"type": type,
						"func": func,
						"removed": false,
						"source": 'jQuery'
					} );
				}
			}
		}
	}

	return elements;
} );


// jQuery 1.3 live events
VE.parsers.push( function () {
	if ( !jQuery || jQuery.fn.live != 'undefined' ||
		typeof jQuery.data == 'undefined' ||
		typeof jQuery.data(document, "events") == 'undefined' ||
		typeof jQuery.data(document, "events").live == 'undefined' )
	{
		return [];
	}

	var elements = [];
	var cache = jQuery.cache;

	jQuery.each( jQuery.data(document, "events").live || [], function(i, fn) {
		var event = fn.type.split('.');
		event = event[0];
		var selector = fn.data;

		$(selector).each( function(i) {
			elements.push( {
				node: this,
				listeners: [],
			} );

			elements[elements.length - 1].listeners.push({
				type: event,
				func: 'Unable to obtain function from live() bound event.',
				removed: false,
				source: "jQuery 1.3 live"
			} );
		} );
	} );

	return elements;
} );

})(window, document, jQuery, VisualEvent);

(function(window, document, $, VisualEvent){

/*global jsBase*/

VisualEvent.parsers.push( function () {
	if ( typeof jsBase == 'undefined' ) {
		return [];
	}

	var elements = [];
	var a = jsBase.aEventCache;
	var i, iLen;

	for ( i=0, iLen=a.length ; i<iLen ; i++ )
	{
		elements.push( {
			"node": a[i].nElement,
			"listeners": [ {
				"type": a[i].type,
				"func": a[i].fn.toString(),
				"removed": false,
				"source": 'jsBase'
			} ]
		} );
	}

	return elements;
} );

})(window, document, jQuery, VisualEvent);

(function(window, document, $, VisualEvent){

/*global MooTools*/

VisualEvent.parsers.push( function () {
	if ( typeof MooTools == 'undefined' ) {
		return [];
	}

	var elements = [];
	var all = document.getElementsByTagName('*');
	var i, iLen;
	var events, mooEvent;

	for ( i=0, iLen=all.length ; i<iLen ; i++ ) {
		events = all[i].retrieve('events', {});

		if ( !$.isEmptyObject( events ) ) {
			elements.push( {
				"node": all[i],
				"listeners": []
			} );

			for ( mooEvent in events ) {
				elements[ elements.length-1 ].listeners.push( {
					"type": mooEvent,
					"func": events[mooEvent].keys.toString(),
					"removed": false,
					"source": 'MooTools'
				} );
			}
		}
	}

	return elements;
} );

})(window, document, jQuery, VisualEvent);

(function(window, document, $, VisualEvent){

/*global Prototype,Event*/

VisualEvent.parsers.push( function () {
	if ( typeof Prototype == 'undefined' ) {
		return [];
	}

	var elements = [];
	var all = document.getElementsByTagName('*');
	var i, iLen;
	var eventType;

	for ( i=0, iLen=all.length ; i<iLen ; i++ ) {
		if ( typeof all[i]._prototypeEventID != 'undefined' ) {
			elements.push( {
				"node": all[i],
				"listeners": []
			} );

			for ( eventType in Event.cache[ all[i]._prototypeEventID ] ) {
				elements[ elements.length-1 ].listeners.push( {
					"type": eventType,
					"func": Event.cache[ all[i]._prototypeEventID ][eventType][0].handler.toString(),
					"removed": false,
					"source": 'Prototype'
				} );
			}
		}
	}

	return elements;
} );

})(window, document, jQuery, VisualEvent);

(function(window, document, $, VisualEvent){

/*global YAHOO*/

VisualEvent.parsers.push( function () {
	if ( typeof YAHOO == 'undefined' || typeof YAHOO.util == 'undefined' ||
		 typeof YAHOO.util.Event == 'undefined' )
	{
		return [];
	}

	/*
	 * Since the YUI cache is a private variable - we need to use the getListeners function on
	 * all nodes in the document
	 */
	var all = document.getElementsByTagName('*');
	var i, iLen, j, jLen;
	var elements = [], events;

	for ( i=0, iLen=all.length ; i<iLen ; i++ )
	{
		events = YAHOO.util.Event.getListeners( all[i] );
		if ( events !== null && events.length !== 0 )
		{
			elements.push( {
				"node": events[0].scope,
				"listeners": []
			} );

			for ( j=0, jLen=events.length ; j<jLen ; j++ )
			{
				elements[ elements.length-1 ].listeners.push( {
					"type": events[j].type,
					"func": events[j].fn.toString(),
					"removed": false,
					"source": 'YUI 2'
				} );
			}
		}
	}

	return elements;
} );

})(window, document, jQuery, VisualEvent);
