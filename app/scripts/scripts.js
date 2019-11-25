"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * dist/jquery.inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2019 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.0-beta.316
 */
!function webpackUniversalModuleDefinition(root, factory) {
    if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof2(module))) module.exports = factory(require("jquery"));else if ("function" == typeof define && define.amd) define(["jquery"], factory);else {
        var a = "object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) ? factory(require("jquery")) : factory(root.jQuery);
        for (var i in a) {
            ("object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) ? exports : root)[i] = a[i];
        }
    }
}(window, function (__WEBPACK_EXTERNAL_MODULE__3__) {
    return modules = [function (module) {
        module.exports = JSON.parse('{"BACKSPACE":8,"BACKSPACE_SAFARI":127,"DELETE":46,"DOWN":40,"END":35,"ENTER":13,"ESCAPE":27,"HOME":36,"INSERT":45,"LEFT":37,"PAGE_DOWN":34,"PAGE_UP":33,"RIGHT":39,"SPACE":32,"TAB":9,"UP":38,"X":88,"CONTROL":17}');
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
                return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
            }, _typeof(obj);
        }
        var $ = __webpack_require__(2),
            window = __webpack_require__(4),
            document = window.document,
            generateMaskSet = __webpack_require__(5).generateMaskSet,
            analyseMask = __webpack_require__(5).analyseMask,
            maskScope = __webpack_require__(8);
        function Inputmask(alias, options, internal) {
            if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
            this.el = void 0, this.events = {}, this.maskset = void 0, this.refreshValue = !1, !0 !== internal && ($.isPlainObject(alias) ? options = alias : (options = options || {}, alias && (options.alias = alias)), this.opts = $.extend(!0, {}, this.defaults, options), this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, resolveAlias(this.opts.alias, options, this.opts), this.isRTL = this.opts.numericInput);
        }
        function resolveAlias(aliasStr, options, opts) {
            var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
            return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), !1);
        }
        function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
            function importOption(option, optionData) {
                optionData = void 0 !== optionData ? optionData : npt.getAttribute(dataAttribute + "-" + option), null !== optionData && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), userOptions[option] = optionData);
            }
            if (!0 === opts.importDataAttributes) {
                var attrOptions = npt.getAttribute(dataAttribute),
                    option,
                    dataoptions,
                    optionData,
                    p;
                if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(/'/g, '"'), dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) for (p in optionData = void 0, dataoptions) {
                    if ("alias" === p.toLowerCase()) {
                        optionData = dataoptions[p];
                        break;
                    }
                }for (option in importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts), opts) {
                    if (dataoptions) for (p in optionData = void 0, dataoptions) {
                        if (p.toLowerCase() === option.toLowerCase()) {
                            optionData = dataoptions[p];
                            break;
                        }
                    }importOption(option, optionData);
                }
            }
            return $.extend(!0, opts, userOptions), "rtl" !== npt.dir && !opts.rightAlign || (npt.style.textAlign = "right"), "rtl" !== npt.dir && !opts.numericInput || (npt.dir = "ltr", npt.removeAttribute("dir"), opts.isRTL = !0), Object.keys(userOptions).length;
        }
        Inputmask.prototype = {
            dataAttribute: "data-inputmask",
            defaults: {
                placeholder: "_",
                optionalmarker: ["[", "]"],
                quantifiermarker: ["{", "}"],
                groupmarker: ["(", ")"],
                alternatormarker: "|",
                escapeChar: "\\",
                mask: null,
                regex: null,
                oncomplete: $.noop,
                onincomplete: $.noop,
                oncleared: $.noop,
                repeat: 0,
                greedy: !1,
                autoUnmask: !1,
                removeMaskOnSubmit: !1,
                clearMaskOnLostFocus: !0,
                insertMode: !0,
                insertModeVisual: !0,
                clearIncomplete: !1,
                alias: null,
                onKeyDown: $.noop,
                onBeforeMask: null,
                onBeforePaste: function onBeforePaste(pastedValue, opts) {
                    return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
                },
                onBeforeWrite: null,
                onUnMask: null,
                showMaskOnFocus: !0,
                showMaskOnHover: !0,
                onKeyValidation: $.noop,
                skipOptionalPartCharacter: " ",
                numericInput: !1,
                rightAlign: !1,
                undoOnEscape: !0,
                radixPoint: "",
                _radixDance: !1,
                groupSeparator: "",
                keepStatic: null,
                positionCaretOnTab: !0,
                tabThrough: !1,
                supportsInputType: ["text", "tel", "url", "password", "search"],
                ignorables: [8, 9, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
                isComplete: null,
                preValidation: null,
                postValidation: null,
                staticDefinitionSymbol: void 0,
                jitMasking: !1,
                nullable: !0,
                inputEventOnly: !1,
                noValuePatching: !1,
                positionCaretOnClick: "lvp",
                casing: null,
                inputmode: "text",
                importDataAttributes: !0,
                shiftPositions: !0
            },
            definitions: {
                9: {
                    validator: "[0-9\uFF11-\uFF19]",
                    definitionSymbol: "*"
                },
                a: {
                    validator: "[A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
                    definitionSymbol: "*"
                },
                "*": {
                    validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]"
                }
            },
            aliases: {},
            masksCache: {},
            mask: function mask(elems) {
                var that = this;
                return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
                    var scopedOpts = $.extend(!0, {}, that.opts);
                    if (importAttributeOptions(el, scopedOpts, $.extend(!0, {}, that.userOptions), that.dataAttribute)) {
                        var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                        void 0 !== maskset && (void 0 !== el.inputmask && (el.inputmask.opts.autoUnmask = !0, el.inputmask.remove()), el.inputmask = new Inputmask(void 0, void 0, !0), el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions), el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput, el.inputmask.el = el, el.inputmask.maskset = maskset, $.data(el, "_inputmask_opts", scopedOpts), maskScope.call(el.inputmask, {
                            action: "mask"
                        }));
                    }
                }), elems && elems[0] && elems[0].inputmask || this;
            },
            option: function option(options, noremask) {
                return "string" == typeof options ? this.opts[options] : "object" === _typeof(options) ? ($.extend(this.userOptions, options), this.el && !0 !== noremask && this.mask(this.el), this) : void 0;
            },
            unmaskedvalue: function unmaskedvalue(value) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "unmaskedvalue",
                    value: value
                });
            },
            remove: function remove() {
                return maskScope.call(this, {
                    action: "remove"
                });
            },
            getemptymask: function getemptymask() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "getemptymask"
                });
            },
            hasMaskedValue: function hasMaskedValue() {
                return !this.opts.autoUnmask;
            },
            isComplete: function isComplete() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "isComplete"
                });
            },
            getmetadata: function getmetadata() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "getmetadata"
                });
            },
            isValid: function isValid(value) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "isValid",
                    value: value
                });
            },
            format: function format(value, metadata) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "format",
                    value: value,
                    metadata: metadata
                });
            },
            setValue: function setValue(value) {
                this.el && $(this.el).trigger("setvalue", [value]);
            },
            analyseMask: analyseMask
        }, Inputmask.extendDefaults = function (options) {
            $.extend(!0, Inputmask.prototype.defaults, options);
        }, Inputmask.extendDefinitions = function (definition) {
            $.extend(!0, Inputmask.prototype.definitions, definition);
        }, Inputmask.extendAliases = function (alias) {
            $.extend(!0, Inputmask.prototype.aliases, alias);
        }, Inputmask.format = function (value, options, metadata) {
            return Inputmask(options).format(value, metadata);
        }, Inputmask.unmask = function (value, options) {
            return Inputmask(options).unmaskedvalue(value);
        }, Inputmask.isValid = function (value, options) {
            return Inputmask(options).isValid(value);
        }, Inputmask.remove = function (elems) {
            "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
                el.inputmask && el.inputmask.remove();
            });
        }, Inputmask.setValue = function (elems, value) {
            "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
                el.inputmask ? el.inputmask.setValue(value) : $(el).trigger("setvalue", [value]);
            });
        };
        var escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");
        Inputmask.escapeRegex = function (str) {
            return str.replace(escapeRegexRegex, "\\$1");
        }, Inputmask.dependencyLib = $, window.Inputmask = Inputmask, module.exports = Inputmask;
    }, function (module, exports, __webpack_require__) {
        "use strict";

        var jquery = __webpack_require__(3);
        if (void 0 === jquery) throw "jQuery not loaded!";
        module.exports = jquery;
    }, function (module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE__3__;
    }, function (module, exports, __webpack_require__) {
        "use strict";

        var __WEBPACK_AMD_DEFINE_RESULT__;
        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
                return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
            }, _typeof(obj);
        }
        __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return "undefined" != typeof window ? window : new (eval("require('jsdom').JSDOM"))("").window;
        }.call(exports, __webpack_require__, exports, module), void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    }, function (module, exports, __webpack_require__) {
        "use strict";

        var $ = __webpack_require__(2);
        function generateMaskSet(opts, nocache) {
            var ms;
            function generateMask(mask, metadata, opts) {
                var regexMask = !1,
                    masksetDefinition,
                    maskdefKey;
                if (null !== mask && "" !== mask || (regexMask = null !== opts.regex, mask = regexMask ? (mask = opts.regex, mask.replace(/^(\^)(.*)(\$)$/, "$2")) : (regexMask = !0, ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 0 < opts.repeat || "*" === opts.repeat || "+" === opts.repeat) {
                    var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                    mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1];
                }
                return maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask, !1 !== opts.keepStatic && (maskdefKey = "ks_" + maskdefKey), void 0 === Inputmask.prototype.masksCache[maskdefKey] || !0 === nocache ? (masksetDefinition = {
                    mask: mask,
                    maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
                    validPositions: {},
                    _buffer: void 0,
                    buffer: void 0,
                    tests: {},
                    excludes: {},
                    metadata: metadata,
                    maskLength: void 0,
                    jitOffset: {}
                }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), masksetDefinition;
            }
            if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
                if (1 < opts.mask.length) {
                    if (null === opts.keepStatic) {
                        opts.keepStatic = "auto";
                        for (var i = 0; i < opts.mask.length; i++) {
                            if (opts.mask[i].charAt(0) !== opts.mask[0].charAt(0)) {
                                opts.keepStatic = !0;
                                break;
                            }
                        }
                    }
                    var altMask = opts.groupmarker[0];
                    return $.each(opts.isRTL ? opts.mask.reverse() : opts.mask, function (ndx, msk) {
                        1 < altMask.length && (altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]), void 0 === msk.mask || $.isFunction(msk.mask) ? altMask += msk : altMask += msk.mask;
                    }), altMask += opts.groupmarker[1], generateMask(altMask, opts.mask, opts);
                }
                opts.mask = opts.mask.pop();
            }
            return null === opts.keepStatic && (opts.keepStatic = !1), ms = opts.mask && void 0 !== opts.mask.mask && !$.isFunction(opts.mask.mask) ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts), ms;
        }
        function analyseMask(mask, regexMask, opts) {
            var tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                escaped = !1,
                currentToken = new MaskToken(),
                match,
                m,
                openenings = [],
                maskTokens = [],
                openingToken,
                currentOpeningToken,
                alternator,
                lastMatch,
                closeRegexGroup = !1;
            function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, this.quantifier = {
                    min: 1,
                    max: 1
                };
            }
            function insertTestDefinition(mtoken, element, position) {
                position = void 0 !== position ? position : mtoken.matches.length;
                var prevMatch = mtoken.matches[position - 1];
                if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
                    fn: new RegExp(element, opts.casing ? "i" : ""),
                    static: !1,
                    optionality: !1,
                    newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element,
                    casing: null,
                    def: element,
                    placeholder: void 0,
                    nativeDef: element
                }) : (escaped && (element = element[element.length - 1]), $.each(element.split(""), function (ndx, lmnt) {
                    prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
                        fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", opts.casing ? "i" : "") : null,
                        static: !0,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== lmnt && !0 !== prevMatch.static,
                        casing: null,
                        def: opts.staticDefinitionSymbol || lmnt,
                        placeholder: void 0 !== opts.staticDefinitionSymbol ? lmnt : void 0,
                        nativeDef: (escaped ? "'" : "") + lmnt
                    });
                })), escaped = !1;else {
                    var maskdef = (opts.definitions ? opts.definitions[element] : void 0) || Inputmask.prototype.definitions[element];
                    maskdef && !escaped ? mtoken.matches.splice(position++, 0, {
                        fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
                            this.test = maskdef.validator;
                        }() : new RegExp("."),
                        static: maskdef.static || !1,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
                        casing: maskdef.casing,
                        def: maskdef.definitionSymbol || element,
                        placeholder: maskdef.placeholder,
                        nativeDef: element,
                        generated: maskdef.generated
                    }) : (mtoken.matches.splice(position++, 0, {
                        fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", opts.casing ? "i" : "") : null,
                        static: !0,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element && !0 !== prevMatch.static,
                        casing: null,
                        def: opts.staticDefinitionSymbol || element,
                        placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
                        nativeDef: (escaped ? "'" : "") + element
                    }), escaped = !1);
                }
            }
            function verifyGroupMarker(maskToken) {
                maskToken && maskToken.matches && $.each(maskToken.matches, function (ndx, token) {
                    var nextToken = maskToken.matches[ndx + 1];
                    (void 0 === nextToken || void 0 === nextToken.matches || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, regexMask || (insertTestDefinition(token, opts.groupmarker[0], 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker[1]))), verifyGroupMarker(token);
                });
            }
            function defaultCase() {
                if (0 < openenings.length) {
                    if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m), currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                            alternator.matches[mndx].isGroup && (alternator.matches[mndx].isGroup = !1);
                        }0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                    }
                } else insertTestDefinition(currentToken, m);
            }
            function reverseTokens(maskToken) {
                function reverseStatic(st) {
                    return st === opts.optionalmarker[0] ? st = opts.optionalmarker[1] : st === opts.optionalmarker[1] ? st = opts.optionalmarker[0] : st === opts.groupmarker[0] ? st = opts.groupmarker[1] : st === opts.groupmarker[1] && (st = opts.groupmarker[0]), st;
                }
                for (var match in maskToken.matches = maskToken.matches.reverse(), maskToken.matches) {
                    if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
                        var intMatch = parseInt(match);
                        if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                            var qt = maskToken.matches[match];
                            maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
                        }
                        void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
                    }
                }return maskToken;
            }
            function groupify(matches) {
                var groupToken = new MaskToken(!0);
                return groupToken.openGroup = !1, groupToken.matches = matches, groupToken;
            }
            function closeGroup() {
                if (openingToken = openenings.pop(), openingToken.openGroup = !1, void 0 !== openingToken) {
                    if (0 < openenings.length) {
                        if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), currentOpeningToken.isAlternator) {
                            alternator = openenings.pop();
                            for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                                alternator.matches[mndx].isGroup = !1, alternator.matches[mndx].alternatorGroup = !1;
                            }0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                        }
                    } else currentToken.matches.push(openingToken);
                } else defaultCase();
            }
            function groupQuantifier(matches) {
                var lastMatch = matches.pop();
                return lastMatch.isQuantifier && (lastMatch = groupify([matches.pop(), lastMatch])), lastMatch;
            }
            for (regexMask && (opts.optionalmarker[0] = void 0, opts.optionalmarker[1] = void 0); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask);) {
                if (m = match[0], regexMask) switch (m.charAt(0)) {
                    case "?":
                        m = "{0,1}";
                        break;

                    case "+":
                    case "*":
                        m = "{" + m + "}";
                        break;

                    case "|":
                        if (0 === openenings.length) {
                            var altRegexGroup = groupify(currentToken.matches);
                            altRegexGroup.openGroup = !0, openenings.push(altRegexGroup), currentToken.matches = [], closeRegexGroup = !0;
                        }
                        break;
                }
                if (escaped) defaultCase();else switch (m.charAt(0)) {
                    case "(?=":
                        break;

                    case "(?!":
                        break;

                    case "(?<=":
                        break;

                    case "(?<!":
                        break;

                    case opts.escapeChar:
                        escaped = !0, regexMask && defaultCase();
                        break;

                    case opts.optionalmarker[1]:
                    case opts.groupmarker[1]:
                        closeGroup();
                        break;

                    case opts.optionalmarker[0]:
                        openenings.push(new MaskToken(!1, !0));
                        break;

                    case opts.groupmarker[0]:
                        openenings.push(new MaskToken(!0));
                        break;

                    case opts.quantifiermarker[0]:
                        var quantifier = new MaskToken(!1, !1, !0);
                        m = m.replace(/[{}]/g, "");
                        var mqj = m.split("|"),
                            mq = mqj[0].split(","),
                            mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
                            mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                        "*" !== mq0 && "+" !== mq0 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                            min: mq0,
                            max: mq1,
                            jit: mqj[1]
                        };
                        var matches = 0 < openenings.length ? openenings[openenings.length - 1].matches : currentToken.matches;
                        if (match = matches.pop(), match.isAlternator) {
                            matches.push(match), matches = match.matches;
                            var groupToken = new MaskToken(!0),
                                tmpMatch = matches.pop();
                            matches.push(groupToken), matches = groupToken.matches, match = tmpMatch;
                        }
                        match.isGroup || (match = groupify([match])), matches.push(match), matches.push(quantifier);
                        break;

                    case opts.alternatormarker:
                        if (0 < openenings.length) {
                            currentOpeningToken = openenings[openenings.length - 1];
                            var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                            lastMatch = currentOpeningToken.openGroup && (void 0 === subToken.matches || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : groupQuantifier(currentOpeningToken.matches);
                        } else lastMatch = groupQuantifier(currentToken.matches);
                        if (lastMatch.isAlternator) openenings.push(lastMatch);else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), openenings.push(alternator), lastMatch.openGroup) {
                            lastMatch.openGroup = !1;
                            var alternatorGroup = new MaskToken(!0);
                            alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup);
                        }
                        break;

                    default:
                        defaultCase();
                }
            }
            for (closeRegexGroup && closeGroup(); 0 < openenings.length;) {
                openingToken = openenings.pop(), currentToken.matches.push(openingToken);
            }return 0 < currentToken.matches.length && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)), (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens;
        }
        module.exports = {
            generateMaskSet: generateMaskSet,
            analyseMask: analyseMask
        };
    }, function (module, exports, __webpack_require__) {
        "use strict";

        __webpack_require__(7), __webpack_require__(9), __webpack_require__(10), module.exports = __webpack_require__(1);
    }, function (module, exports, __webpack_require__) {
        "use strict";

        var Inputmask = __webpack_require__(1);
        Inputmask.extendDefinitions({
            A: {
                validator: "[A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
                casing: "upper"
            },
            "&": {
                validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
                casing: "upper"
            },
            "#": {
                validator: "[0-9A-Fa-f]",
                casing: "upper"
            }
        });
        var ipValidatorRegex = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");
        function ipValidator(chrs, maskset, pos, strict, opts) {
            return chrs = -1 < pos - 1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, -1 < pos - 2 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : "00" + chrs, ipValidatorRegex.test(chrs);
        }
        Inputmask.extendAliases({
            cssunit: {
                regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
            },
            url: {
                regex: "(https?|ftp)//.*",
                autoUnmask: !1
            },
            ip: {
                mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
                definitions: {
                    i: {
                        validator: ipValidator
                    },
                    j: {
                        validator: ipValidator
                    },
                    k: {
                        validator: ipValidator
                    },
                    l: {
                        validator: ipValidator
                    }
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return maskedValue;
                },
                inputmode: "numeric"
            },
            email: {
                mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                greedy: !1,
                casing: "lower",
                onBeforePaste: function onBeforePaste(pastedValue, opts) {
                    return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "");
                },
                definitions: {
                    "*": {
                        validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5!#$%&'*+/=?^_`{|}~-]"
                    },
                    "-": {
                        validator: "[0-9A-Za-z-]"
                    }
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return maskedValue;
                },
                inputmode: "email"
            },
            mac: {
                mask: "##:##:##:##:##:##"
            },
            vin: {
                mask: "V{13}9{4}",
                definitions: {
                    V: {
                        validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                        casing: "upper"
                    }
                },
                clearIncomplete: !0,
                autoUnmask: !0
            }
        }), module.exports = Inputmask;
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
                return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
            }, _typeof(obj);
        }
        var $ = __webpack_require__(2),
            window = __webpack_require__(4),
            document = window.document,
            ua = window.navigator && window.navigator.userAgent || "",
            ie = 0 < ua.indexOf("MSIE ") || 0 < ua.indexOf("Trident/"),
            mobile = "ontouchstart" in window,
            iemobile = /iemobile/i.test(ua),
            iphone = /iphone/i.test(ua) && !iemobile,
            keyCode = __webpack_require__(0);
        module.exports = function maskScope(actionObj, maskset, opts) {
            maskset = maskset || this.maskset, opts = opts || this.opts;
            var inputmask = this,
                el = this.el,
                isRTL = this.isRTL || (this.isRTL = opts.numericInput),
                undoValue,
                $el,
                skipKeyPressEvent = !1,
                skipInputEvent = !1,
                validationEvent = !1,
                ignorable = !1,
                maxLength,
                mouseEnter = !1,
                originalPlaceholder = void 0;
            function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
                var greedy = opts.greedy;
                clearOptionalTail && (opts.greedy = !1), minimalPos = minimalPos || 0;
                var maskTemplate = [],
                    ndxIntlzr,
                    pos = 0,
                    test,
                    testPos;
                do {
                    if (!0 === baseOnInput && maskset.validPositions[pos]) testPos = clearOptionalTail && !0 === maskset.validPositions[pos].match.optionality && void 0 === maskset.validPositions[pos + 1] && (!0 === maskset.validPositions[pos].generatedInput || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && 0 < pos) ? determineTestTemplate(pos, getTests(pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos], test = testPos.match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder(pos, test));else {
                        testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), test = testPos.match, ndxIntlzr = testPos.locator.slice();
                        var jitMasking = !0 !== noJit && (!1 !== opts.jitMasking ? opts.jitMasking : test.jit);
                        (!1 === jitMasking || void 0 === jitMasking || "number" == typeof jitMasking && isFinite(jitMasking) && pos < jitMasking) && maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder(pos, test));
                    }
                    "auto" === opts.keepStatic && test.newBlockMarker && !0 !== test.static && (opts.keepStatic = pos - 1), pos++;
                } while ((void 0 === maxLength || pos < maxLength) && (!0 !== test.static || "" !== test.def) || pos < minimalPos);
                return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), !1 === includeMode && void 0 !== maskset.maskLength || (maskset.maskLength = pos - 1), opts.greedy = greedy, maskTemplate;
            }
            function resetMaskSet(soft) {
                maskset.buffer = void 0, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0);
            }
            function getLastValidPosition(closestTo, strict, validPositions) {
                var before = -1,
                    after = -1,
                    valids = validPositions || maskset.validPositions;
                for (var posNdx in void 0 === closestTo && (closestTo = -1), valids) {
                    var psNdx = parseInt(posNdx);
                    valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), closestTo <= psNdx && (after = psNdx));
                }
                return -1 === before || before == closestTo ? after : -1 == after ? before : closestTo - before < after - closestTo ? before : after;
            }
            function getDecisionTaker(tst) {
                var decisionTaker = tst.locator[tst.alternation];
                return "string" == typeof decisionTaker && 0 < decisionTaker.length && (decisionTaker = decisionTaker.split(",")[0]), void 0 !== decisionTaker ? decisionTaker.toString() : "";
            }
            function getLocator(tst, align) {
                var locator = (null != tst.alternation ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
                if ("" !== locator) for (; locator.length < align;) {
                    locator += "0";
                }return locator;
            }
            function determineTestTemplate(pos, tests) {
                pos = 0 < pos ? pos - 1 : 0;
                for (var altTest = getTest(pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch, ndx = 0; ndx < tests.length; ndx++) {
                    var tst = tests[ndx];
                    tstLocator = getLocator(tst, targetLocator.length);
                    var distance = Math.abs(tstLocator - targetLocator);
                    (void 0 === closest || "" !== tstLocator && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && "master" === bestMatch.match.newBlockMarker && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) && (closest = distance, bestMatch = tst);
                }
                return bestMatch;
            }
            function getTestTemplate(pos, ndxIntlzr, tstPs) {
                return maskset.validPositions[pos] || determineTestTemplate(pos, getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
            }
            function getTest(pos, tests) {
                return maskset.validPositions[pos] ? maskset.validPositions[pos] : (tests || getTests(pos))[0];
            }
            function positionCanMatchDefinition(pos, testDefinition, opts) {
                for (var valid = !1, tests = getTests(pos), defProp = opts.shiftPositions ? "def" : "nativeDef", tndx = 0; tndx < tests.length; tndx++) {
                    if (tests[tndx].match && tests[tndx].match[defProp] === testDefinition.match[defProp]) {
                        valid = !0;
                        break;
                    }
                }return !1 === valid && void 0 !== maskset.jitOffset[pos] && (valid = positionCanMatchDefinition(pos + maskset.jitOffset[pos], testDefinition, opts)), valid;
            }
            function getTests(pos, ndxIntlzr, tstPs) {
                var maskTokens = maskset.maskToken,
                    testPos = ndxIntlzr ? tstPs : 0,
                    ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
                    matches = [],
                    insertStop = !1,
                    latestMatch,
                    cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
                function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                    function handleMatch(match, loopNdx, quantifierRecurse) {
                        function isFirstMatch(latestMatch, tokenGroup) {
                            var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
                            return firstMatch || $.each(tokenGroup.matches, function (ndx, match) {
                                if (!0 === match.isQuantifier ? firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]) : Object.prototype.hasOwnProperty.call(match, "matches") && (firstMatch = isFirstMatch(latestMatch, match)), firstMatch) return !1;
                            }), firstMatch;
                        }
                        function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                            var bestMatch, indexPos;
                            if ((maskset.tests[pos] || maskset.validPositions[pos]) && $.each(maskset.tests[pos] || [maskset.validPositions[pos]], function (ndx, lmnt) {
                                if (lmnt.mloc[alternateNdx]) return bestMatch = lmnt, !1;
                                var alternation = void 0 !== targetAlternation ? targetAlternation : lmnt.alternation,
                                    ndxPos = void 0 !== lmnt.locator[alternation] ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                                (void 0 === indexPos || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, indexPos = ndxPos);
                            }), bestMatch) {
                                var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation],
                                    locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
                                return locator.slice((void 0 !== targetAlternation ? targetAlternation : bestMatch.alternation) + 1);
                            }
                            return void 0 !== targetAlternation ? resolveNdxInitializer(pos, alternateNdx) : void 0;
                        }
                        function isSubsetOf(source, target) {
                            function expand(pattern) {
                                for (var expanded = [], start = -1, end, i = 0, l = pattern.length; i < l; i++) {
                                    if ("-" === pattern.charAt(i)) for (end = pattern.charCodeAt(i + 1); ++start < end;) {
                                        expanded.push(String.fromCharCode(start));
                                    } else start = pattern.charCodeAt(i), expanded.push(pattern.charAt(i));
                                }return expanded.join("");
                            }
                            return source.match.def === target.match.nativeDef || !(!(opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) || !0 === source.match.static || !0 === target.match.static) && -1 !== expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, "")));
                        }
                        function staticCanMatchDefinition(source, target) {
                            return !0 === source.match.static && !0 !== target.match.static && target.match.fn.test(source.match.def, maskset, pos, !1, opts, !1);
                        }
                        function setMergeLocators(targetMatch, altMatch) {
                            if (void 0 === altMatch || targetMatch.alternation === altMatch.alternation && -1 === targetMatch.locator[targetMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation])) {
                                targetMatch.mloc = targetMatch.mloc || {};
                                var locNdx = targetMatch.locator[targetMatch.alternation];
                                if (void 0 !== locNdx) {
                                    if ("string" == typeof locNdx && (locNdx = locNdx.split(",")[0]), void 0 === targetMatch.mloc[locNdx] && (targetMatch.mloc[locNdx] = targetMatch.locator.slice()), void 0 !== altMatch) {
                                        for (var ndx in altMatch.mloc) {
                                            "string" == typeof ndx && (ndx = ndx.split(",")[0]), void 0 === targetMatch.mloc[ndx] && (targetMatch.mloc[ndx] = altMatch.mloc[ndx]);
                                        }targetMatch.locator[targetMatch.alternation] = Object.keys(targetMatch.mloc).join(",");
                                    }
                                    return !0;
                                }
                                targetMatch.alternation = void 0;
                            }
                            return !1;
                        }
                        if (500 < testPos && void 0 !== quantifierRecurse) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
                        if (testPos === pos && void 0 === match.matches) return matches.push({
                            match: match,
                            locator: loopNdx.reverse(),
                            cd: cacheDependency,
                            mloc: {}
                        }), !0;
                        if (void 0 !== match.matches) {
                            if (match.isGroup && quantifierRecurse !== match) {
                                if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx, quantifierRecurse), match) return !0;
                            } else if (match.isOptional) {
                                var optionalToken = match,
                                    mtchsNdx = matches.length;
                                if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) {
                                    if ($.each(matches, function (ndx, mtch) {
                                        mtchsNdx <= ndx && (mtch.match.optionality = !0);
                                    }), latestMatch = matches[matches.length - 1].match, void 0 !== quantifierRecurse || !isFirstMatch(latestMatch, optionalToken)) return !0;
                                    insertStop = !0, testPos = pos;
                                }
                            } else if (match.isAlternator) {
                                var alternateToken = match,
                                    malternateMatches = [],
                                    maltMatches,
                                    currentMatches = matches.slice(),
                                    loopNdxCnt = loopNdx.length,
                                    altIndex = 0 < ndxInitializer.length ? ndxInitializer.shift() : -1;
                                if (-1 === altIndex || "string" == typeof altIndex) {
                                    var currentPos = testPos,
                                        ndxInitializerClone = ndxInitializer.slice(),
                                        altIndexArr = [],
                                        amndx;
                                    if ("string" == typeof altIndex) altIndexArr = altIndex.split(",");else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) {
                                        altIndexArr.push(amndx.toString());
                                    }if (void 0 !== maskset.excludes[pos]) {
                                        for (var altIndexArrClone = altIndexArr.slice(), i = 0, el = maskset.excludes[pos].length; i < el; i++) {
                                            altIndexArr.splice(altIndexArr.indexOf(maskset.excludes[pos][i].toString()), 1);
                                        }0 === altIndexArr.length && (delete maskset.excludes[pos], altIndexArr = altIndexArrClone);
                                    }
                                    (!0 === opts.keepStatic || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) && (altIndexArr = altIndexArr.slice(0, 1));
                                    for (var unMatchedAlternation = !1, ndx = 0; ndx < altIndexArr.length; ndx++) {
                                        amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = "string" == typeof altIndex && resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) ? match = !0 : 0 === ndx && (unMatchedAlternation = !0), maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                        for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                            var altMatch = maltMatches[ndx1],
                                                dropMatch = !1;
                                            altMatch.match.jit = altMatch.match.jit || unMatchedAlternation, altMatch.alternation = altMatch.alternation || loopNdxCnt, setMergeLocators(altMatch);
                                            for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                                var altMatch2 = malternateMatches[ndx2];
                                                if ("string" != typeof altIndex || void 0 !== altMatch.alternation && -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr)) {
                                                    if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                                                        dropMatch = !0, setMergeLocators(altMatch2, altMatch);
                                                        break;
                                                    }
                                                    if (isSubsetOf(altMatch, altMatch2)) {
                                                        setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                        break;
                                                    }
                                                    if (isSubsetOf(altMatch2, altMatch)) {
                                                        setMergeLocators(altMatch2, altMatch);
                                                        break;
                                                    }
                                                    if (staticCanMatchDefinition(altMatch, altMatch2)) {
                                                        setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                        break;
                                                    }
                                                }
                                            }
                                            dropMatch || malternateMatches.push(altMatch);
                                        }
                                    }
                                    matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = 0 < matches.length, match = 0 < malternateMatches.length, ndxInitializer = ndxInitializerClone.slice();
                                } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
                                if (match) return !0;
                            } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) for (var qt = match, qndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                                var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                                if (match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup), match) {
                                    if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx >= qt.quantifier.min, latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit, latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                                        insertStop = !0, testPos = pos;
                                        break;
                                    }
                                    return latestMatch.jit && (maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch)), !0;
                                }
                            } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) return !0;
                        } else testPos++;
                    }
                    for (var tndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) {
                        if (!0 !== maskToken.matches[tndx].isQuantifier) {
                            var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
                            if (match && testPos === pos) return match;
                            if (pos < testPos) break;
                        }
                    }
                }
                function mergeLocators(pos, tests) {
                    var locator = [];
                    return $.isArray(tests) || (tests = [tests]), 0 < tests.length && (void 0 === tests[0].alternation || !0 === opts.keepStatic ? (locator = determineTestTemplate(pos, tests.slice()).locator.slice(), 0 === locator.length && (locator = tests[0].locator.slice())) : $.each(tests, function (ndx, tst) {
                        if ("" !== tst.def) if (0 === locator.length) locator = tst.locator.slice();else for (var i = 0; i < locator.length; i++) {
                            tst.locator[i] && -1 === locator[i].toString().indexOf(tst.locator[i]) && (locator[i] += "," + tst.locator[i]);
                        }
                    })), locator;
                }
                if (-1 < pos && (void 0 === maxLength || pos < maxLength)) {
                    if (void 0 === ndxIntlzr) {
                        for (var previousPos = pos - 1, test; void 0 === (test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) && -1 < previousPos;) {
                            previousPos--;
                        }void 0 !== test && -1 < previousPos && (ndxInitializer = mergeLocators(previousPos, test), cacheDependency = ndxInitializer.join(""), testPos = previousPos);
                    }
                    if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) return maskset.tests[pos];
                    for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                        var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
                        if (match && testPos === pos || pos < testPos) break;
                    }
                }
                return 0 !== matches.length && !insertStop || matches.push({
                    match: {
                        fn: null,
                        static: !0,
                        optionality: !1,
                        casing: null,
                        def: "",
                        placeholder: ""
                    },
                    locator: [],
                    mloc: {},
                    cd: cacheDependency
                }), void 0 !== ndxIntlzr && maskset.tests[pos] ? $.extend(!0, [], matches) : (maskset.tests[pos] = $.extend(!0, [], matches), maskset.tests[pos]);
            }
            function getBufferTemplate() {
                return void 0 === maskset._buffer && (maskset._buffer = getMaskTemplate(!1, 1), void 0 === maskset.buffer && (maskset.buffer = maskset._buffer.slice())), maskset._buffer;
            }
            function getBuffer(noCache) {
                return void 0 !== maskset.buffer && !0 !== noCache || (maskset.buffer = getMaskTemplate(!0, getLastValidPosition(), !0), void 0 === maskset._buffer && (maskset._buffer = maskset.buffer.slice())), maskset.buffer;
            }
            function refreshFromBuffer(start, end, buffer) {
                var i,
                    p,
                    skipOptionalPartCharacter = opts.skipOptionalPartCharacter,
                    bffr = isRTL ? buffer.slice().reverse() : buffer;
                if (opts.skipOptionalPartCharacter = "", !0 === start) resetMaskSet(), maskset.tests = {}, start = 0, end = buffer.length, p = determineNewCaretPosition({
                    begin: 0,
                    end: 0
                }, !1).begin;else {
                    for (i = start; i < end; i++) {
                        delete maskset.validPositions[i];
                    }p = start;
                }
                var keypress = new $.Event("keypress");
                for (i = start; i < end; i++) {
                    keypress.which = bffr[i].toString().charCodeAt(0), ignorable = !1;
                    var valResult = EventHandlers.keypressEvent.call(el, keypress, !0, !1, !1, p);
                    !1 !== valResult && (p = valResult.forwardPosition);
                }
                opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
            }
            function casing(elem, test, pos) {
                switch (opts.casing || test.casing) {
                    case "upper":
                        elem = elem.toUpperCase();
                        break;

                    case "lower":
                        elem = elem.toLowerCase();
                        break;

                    case "title":
                        var posBefore = maskset.validPositions[pos - 1];
                        elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(keyCode.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
                        break;

                    default:
                        if ($.isFunction(opts.casing)) {
                            var args = Array.prototype.slice.call(arguments);
                            args.push(maskset.validPositions), elem = opts.casing.apply(this, args);
                        }
                }
                return elem;
            }
            function checkAlternationMatch(altArr1, altArr2, na) {
                for (var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = void 0 !== na ? na.split(",") : [], naNdx, i = 0; i < naArr.length; i++) {
                    -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
                }for (var alndx = 0; alndx < altArr1.length; alndx++) {
                    if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
                        isMatch = !0;
                        break;
                    }
                }return isMatch;
            }
            function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
                var validPsClone = $.extend(!0, {}, maskset.validPositions),
                    tstClone = $.extend(!0, {}, maskset.tests),
                    lastAlt,
                    alternation,
                    isValidRslt = !1,
                    returnRslt = !1,
                    altPos,
                    prevAltPos,
                    i,
                    validPos,
                    decisionPos,
                    lAltPos = void 0 !== rAltPos ? rAltPos : getLastValidPosition(),
                    nextPos,
                    input,
                    begin,
                    end;
                if (selection && (begin = selection.begin, end = selection.end, selection.begin > selection.end && (begin = selection.end, end = selection.begin)), -1 === lAltPos && void 0 === rAltPos) lastAlt = 0, prevAltPos = getTest(lastAlt), alternation = prevAltPos.alternation;else for (; 0 <= lAltPos; lAltPos--) {
                    if (altPos = maskset.validPositions[lAltPos], altPos && void 0 !== altPos.alternation) {
                        if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
                        lastAlt = lAltPos, alternation = maskset.validPositions[lastAlt].alternation, prevAltPos = altPos;
                    }
                }if (void 0 !== alternation) {
                    decisionPos = parseInt(lastAlt), maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [], !0 !== maskPos && maskset.excludes[decisionPos].push(getDecisionTaker(prevAltPos));
                    var validInputs = [],
                        resultPos = -1;
                    for (i = decisionPos; i < getLastValidPosition(void 0, !0) + 1; i++) {
                        -1 === resultPos && maskPos <= i && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1), validPos = maskset.validPositions[i], validPos && !0 !== validPos.generatedInput && (void 0 === selection || i < begin || end <= i) && validInputs.push(validPos.input), delete maskset.validPositions[i];
                    }for (-1 === resultPos && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1); void 0 !== maskset.excludes[decisionPos] && maskset.excludes[decisionPos].length < 10;) {
                        for (maskset.tests = {}, resetMaskSet(!0), isValidRslt = !0, i = 0; i < validInputs.length && (nextPos = isValidRslt.caret || getLastValidPosition(void 0, !0) + 1, input = validInputs[i], isValidRslt = isValid(nextPos, input, !1, fromIsValid, !0)); i++) {
                            i === resultPos && (returnRslt = isValidRslt), 1 == maskPos && isValidRslt && (returnRslt = {
                                caretPos: i
                            });
                        }if (isValidRslt) break;
                        if (resetMaskSet(), prevAltPos = getTest(decisionPos), maskset.validPositions = $.extend(!0, {}, validPsClone), maskset.tests = $.extend(!0, {}, tstClone), !maskset.excludes[decisionPos]) {
                            returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                            break;
                        }
                        var decisionTaker = getDecisionTaker(prevAltPos);
                        if (-1 !== maskset.excludes[decisionPos].indexOf(decisionTaker)) {
                            returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                            break;
                        }
                        for (maskset.excludes[decisionPos].push(decisionTaker), i = decisionPos; i < getLastValidPosition(void 0, !0) + 1; i++) {
                            delete maskset.validPositions[i];
                        }
                    }
                }
                return returnRslt && !1 === opts.keepStatic || delete maskset.excludes[decisionPos], returnRslt;
            }
            function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly) {
                function isSelection(posObj) {
                    return isRTL ? 1 < posObj.begin - posObj.end || posObj.begin - posObj.end == 1 : 1 < posObj.end - posObj.begin || posObj.end - posObj.begin == 1;
                }
                strict = !0 === strict;
                var maskPos = pos;
                function processCommandObject(commandObj) {
                    if (void 0 !== commandObj) {
                        if (void 0 !== commandObj.remove && ($.isArray(commandObj.remove) || (commandObj.remove = [commandObj.remove]), $.each(commandObj.remove.sort(function (a, b) {
                            return b.pos - a.pos;
                        }), function (ndx, lmnt) {
                            revalidateMask({
                                begin: lmnt,
                                end: lmnt + 1
                            });
                        }), commandObj.remove = void 0), void 0 !== commandObj.insert && ($.isArray(commandObj.insert) || (commandObj.insert = [commandObj.insert]), $.each(commandObj.insert.sort(function (a, b) {
                            return a.pos - b.pos;
                        }), function (ndx, lmnt) {
                            "" !== lmnt.c && isValid(lmnt.pos, lmnt.c, void 0 === lmnt.strict || lmnt.strict, void 0 !== lmnt.fromIsValid ? lmnt.fromIsValid : fromIsValid);
                        }), commandObj.insert = void 0), commandObj.refreshFromBuffer && commandObj.buffer) {
                            var refresh = commandObj.refreshFromBuffer;
                            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, commandObj.buffer), commandObj.refreshFromBuffer = void 0;
                        }
                        void 0 !== commandObj.rewritePosition && (maskPos = commandObj.rewritePosition, commandObj = !0);
                    }
                    return commandObj;
                }
                function _isValid(position, c, strict) {
                    var rslt = !1;
                    return $.each(getTests(position), function (ndx, tst) {
                        var test = tst.match;
                        if (getBuffer(!0), rslt = null != test.fn ? test.fn.test(c, maskset, position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
                            c: getPlaceholder(position, test, !0) || test.def,
                            pos: position
                        }, !1 !== rslt) {
                            var elem = void 0 !== rslt.c ? rslt.c : c,
                                validatedPos = position;
                            return elem = elem === opts.skipOptionalPartCharacter && !0 === test.static ? getPlaceholder(position, test, !0) || test.def : elem, rslt = processCommandObject(rslt), !0 !== rslt && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos), !0 !== rslt && void 0 === rslt.pos && void 0 === rslt.c ? !1 : (!1 === revalidateMask(pos, $.extend({}, tst, {
                                input: casing(elem, test, validatedPos)
                            }), fromIsValid, validatedPos) && (rslt = !1), !1);
                        }
                    }), rslt;
                }
                void 0 !== pos.begin && (maskPos = isRTL ? pos.end : pos.begin);
                var result = !0,
                    positionsClone = $.extend(!0, {}, maskset.validPositions);
                if (!1 === opts.keepStatic && void 0 !== maskset.excludes[maskPos] && !0 !== fromAlternate && !0 !== fromIsValid) for (var i = maskPos; i < (isRTL ? pos.begin : pos.end); i++) {
                    void 0 !== maskset.excludes[i] && (maskset.excludes[i] = void 0, delete maskset.tests[i]);
                }if ($.isFunction(opts.preValidation) && !0 !== fromIsValid && !0 !== validateOnly && (result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts, maskset, pos, strict || fromAlternate), result = processCommandObject(result)), !0 === result) {
                    if (void 0 === maxLength || maskPos < maxLength) {
                        if (result = _isValid(maskPos, c, strict), (!strict || !0 === fromIsValid) && !1 === result && !0 !== validateOnly) {
                            var currentPosValid = maskset.validPositions[maskPos];
                            if (!currentPosValid || !0 !== currentPosValid.match.static || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                                if (opts.insertMode || void 0 === maskset.validPositions[seekNext(maskPos)] || pos.end > maskPos) {
                                    var skip = !1;
                                    if (maskset.jitOffset[maskPos] && void 0 === maskset.validPositions[seekNext(maskPos)] && (result = isValid(maskPos + maskset.jitOffset[maskPos], c, !0), !1 !== result && (!0 !== fromAlternate && (result.caret = maskPos), skip = !0)), pos.end > maskPos && (maskset.validPositions[maskPos] = void 0), !skip && !isMask(maskPos, !0)) for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) {
                                        if (result = _isValid(nPos, c, strict), !1 !== result) {
                                            result = trackbackPositions(maskPos, void 0 !== result.pos ? result.pos : nPos) || result, maskPos = nPos;
                                            break;
                                        }
                                    }
                                }
                            } else result = {
                                caret: seekNext(maskPos)
                            };
                        }
                    } else result = !1;
                    !1 !== result || !1 !== opts.keepStatic && !isComplete(getBuffer()) && 0 !== maskPos || strict || !0 === fromAlternate ? isSelection(pos) && maskset.tests[maskPos] && 1 < maskset.tests[maskPos].length && !0 === opts.keepStatic && !strict && !0 !== fromAlternate && (result = alternate(!0)) : result = alternate(maskPos, c, strict, fromIsValid, void 0, pos), !0 === result && (result = {
                        pos: maskPos
                    });
                }
                if ($.isFunction(opts.postValidation) && !1 !== result && !0 !== fromIsValid && !0 !== validateOnly) {
                    var postResult = opts.postValidation(getBuffer(!0), void 0 !== pos.begin ? isRTL ? pos.end : pos.begin : pos, result, opts, maskset, strict);
                    void 0 !== postResult && (result = !0 === postResult ? result : postResult);
                }
                result && void 0 === result.pos && (result.pos = maskPos), !1 === result || !0 === validateOnly ? (resetMaskSet(!0), maskset.validPositions = $.extend(!0, {}, positionsClone)) : trackbackPositions(void 0, maskPos, !0);
                var endResult = processCommandObject(result);
                return endResult;
            }
            function trackbackPositions(originalPos, newPos, fillOnly) {
                if (void 0 === originalPos) for (originalPos = newPos - 1; 0 < originalPos && !maskset.validPositions[originalPos]; originalPos--) {}
                for (var ps = originalPos; ps < newPos; ps++) {
                    if (void 0 === maskset.validPositions[ps] && !isMask(ps, !0)) {
                        var vp = 0 == ps ? getTest(ps) : maskset.validPositions[ps - 1];
                        if (vp) {
                            var tests = getTests(ps).slice();
                            "" === tests[tests.length - 1].match.def && tests.pop();
                            var bestMatch = determineTestTemplate(ps, tests),
                                np;
                            if (bestMatch && (!0 !== bestMatch.match.jit || "master" === bestMatch.match.newBlockMarker && (np = maskset.validPositions[ps + 1]) && !0 === np.match.optionalQuantifier) && (bestMatch = $.extend({}, bestMatch, {
                                input: getPlaceholder(ps, bestMatch.match, !0) || bestMatch.match.def
                            }), bestMatch.generatedInput = !0, revalidateMask(ps, bestMatch, !0), !0 !== fillOnly)) {
                                var cvpInput = maskset.validPositions[newPos].input;
                                return maskset.validPositions[newPos] = void 0, isValid(newPos, cvpInput, !0, !0);
                            }
                        }
                    }
                }
            }
            function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
                function IsEnclosedStatic(pos, valids, selection) {
                    var posMatch = valids[pos];
                    if (void 0 === posMatch || !0 !== posMatch.match.static || !0 === posMatch.match.optionality || void 0 !== valids[0] && void 0 !== valids[0].alternation) return !1;
                    var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && !0 === valids[pos - 1].match.static && valids[pos - 1] : valids[pos - 1],
                        nextMatch = selection.end > pos + 1 ? valids[pos + 1] && !0 === valids[pos + 1].match.static && valids[pos + 1] : valids[pos + 1];
                    return prevMatch && nextMatch;
                }
                var offset = 0,
                    begin = void 0 !== pos.begin ? pos.begin : pos,
                    end = void 0 !== pos.end ? pos.end : pos;
                if (pos.begin > pos.end && (begin = pos.end, end = pos.begin), void 0 === validTest && !1 === opts.insertMode && opts.insertModeVisual && end < maskset.maskLength && (0 === begin && 0 === end || (begin += 1, end += 1)), validatedPos = void 0 !== validatedPos ? validatedPos : begin, begin !== end || opts.insertMode && void 0 !== maskset.validPositions[validatedPos] && void 0 === fromIsValid || void 0 === validTest) {
                    var positionsClone = $.extend(!0, {}, maskset.validPositions),
                        lvp = void 0 === validTest && !1 === opts.insertMode && opts.insertModeVisual ? 1 < end ? end - 1 : end : getLastValidPosition(void 0, !0),
                        i;
                    for (maskset.p = begin, i = lvp; begin <= i; i--) {
                        delete maskset.validPositions[i], void 0 === validTest && delete maskset.tests[i + 1];
                    }var valid = !0,
                        j = validatedPos,
                        posMatch = j,
                        t;
                    if (i = j, validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest), posMatch++, j++, begin < end && i++), validTest || opts.insertMode) for (; i <= lvp; i++) {
                        if (void 0 !== (t = positionsClone[i]) && !0 !== t.generatedInput && (end <= i || begin <= i && IsEnclosedStatic(i, positionsClone, {
                            begin: begin,
                            end: end
                        }))) {
                            for (; "" !== getTest(posMatch).match.def;) {
                                if (positionCanMatchDefinition(posMatch, t, opts) || "+" === t.match.def) {
                                    "+" === t.match.def && getBuffer(!0);
                                    var result = isValid(posMatch, t.input, "+" !== t.match.def, "+" !== t.match.def);
                                    if (valid = !1 !== result, j = (result.pos || posMatch) + 1, !valid) break;
                                } else valid = !1;
                                if (valid) {
                                    void 0 === validTest && t.match.static && i === pos.begin && offset++;
                                    break;
                                }
                                if (!valid && posMatch > maskset.maskLength) break;
                                posMatch++;
                            }
                            "" == getTest(posMatch).match.def && (valid = !1), posMatch = j;
                        }
                        if (!valid) break;
                    }
                    if (!valid) return maskset.validPositions = $.extend(!0, {}, positionsClone), resetMaskSet(!0), !1;
                } else validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest));
                return resetMaskSet(!0), offset;
            }
            function isMask(pos, strict, fuzzy) {
                var test = getTestTemplate(pos).match;
                if ("" === test.def && (test = getTest(pos).match), !0 !== test.static) return test.fn;
                if (!0 === fuzzy && void 0 !== maskset.validPositions[pos] && !0 !== maskset.validPositions[pos].generatedInput) return !0;
                if (!0 !== strict && -1 < pos) {
                    var tests = getTests(pos);
                    return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
                }
                return !1;
            }
            function seekNext(pos, newBlock, fuzzy) {
                void 0 === fuzzy && (fuzzy = !0);
                for (var position = pos + 1; "" !== getTest(position).match.def && (!0 === newBlock && (!0 !== getTest(position).match.newBlockMarker || !isMask(position, void 0, !0)) || !0 !== newBlock && !isMask(position, void 0, fuzzy));) {
                    position++;
                }return position;
            }
            function seekPrevious(pos, newBlock) {
                var position = pos,
                    tests;
                if (position <= 0) return 0;
                for (; 0 < --position && (!0 === newBlock && !0 !== getTest(position).match.newBlockMarker || !0 !== newBlock && !isMask(position, void 0, !0) && (tests = getTests(position), tests.length < 2 || 2 === tests.length && "" === tests[1].match.def));) {}
                return position;
            }
            function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
                if (event && $.isFunction(opts.onBeforeWrite)) {
                    var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
                    if (result) {
                        if (result.refreshFromBuffer) {
                            var refresh = result.refreshFromBuffer;
                            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), buffer = getBuffer(!0);
                        }
                        void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos);
                    }
                }
                if (void 0 !== input && (input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type || caret(input, caretPos), !0 === triggerEvents)) {
                    var $input = $(input),
                        nptVal = input.inputmask._valueGet();
                    skipInputEvent = !0, $input.trigger("input"), setTimeout(function () {
                        nptVal === getBufferTemplate().join("") ? $input.trigger("cleared") : !0 === isComplete(buffer) && $input.trigger("complete");
                    }, 0);
                }
            }
            function getPlaceholder(pos, test, returnPL) {
                if (test = test || getTest(pos).match, void 0 !== test.placeholder || !0 === returnPL) return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
                if (!0 !== test.static) return opts.placeholder.charAt(pos % opts.placeholder.length);
                if (-1 < pos && void 0 === maskset.validPositions[pos]) {
                    var tests = getTests(pos),
                        staticAlternations = [],
                        prevTest;
                    if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) {
                        if ("" !== tests[i].match.def && !0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (!0 === tests[i].match.static || void 0 === prevTest || !1 !== tests[i].match.fn.test(prevTest.match.def, maskset, pos, !0, opts)) && (staticAlternations.push(tests[i]), !0 === tests[i].match.static && (prevTest = tests[i]), 1 < staticAlternations.length && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length);
                    }
                }
                return test.def;
            }
            function HandleNativePlaceholder(npt, value) {
                if (ie) {
                    if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || "" === npt.placeholder)) {
                        var buffer = getBuffer().slice(),
                            nptValue = npt.inputmask._valueGet();
                        if (nptValue !== value) {
                            var lvp = getLastValidPosition();
                            -1 === lvp && nptValue === getBufferTemplate().join("") ? buffer = [] : -1 !== lvp && clearOptionalTail(buffer), writeBuffer(npt, buffer);
                        }
                    }
                } else npt.placeholder !== value && (npt.placeholder = value, "" === npt.placeholder && npt.removeAttribute("placeholder"));
            }
            function determineNewCaretPosition(selectedCaret, tabbed) {
                function doRadixFocus(clickPos) {
                    if ("" !== opts.radixPoint && 0 !== opts.digits) {
                        var vps = maskset.validPositions;
                        if (void 0 === vps[clickPos] || vps[clickPos].input === getPlaceholder(clickPos)) {
                            if (clickPos < seekNext(-1)) return !0;
                            var radixPos = $.inArray(opts.radixPoint, getBuffer());
                            if (-1 !== radixPos) {
                                for (var vp in vps) {
                                    if (vps[vp] && radixPos < vp && vps[vp].input !== getPlaceholder(vp)) return !1;
                                }return !0;
                            }
                        }
                    }
                    return !1;
                }
                if (tabbed && (isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), selectedCaret.begin === selectedCaret.end) {
                    switch (opts.positionCaretOnClick) {
                        case "none":
                            break;

                        case "select":
                            selectedCaret = {
                                begin: 0,
                                end: getBuffer().length
                            };
                            break;

                        case "ignore":
                            selectedCaret.end = selectedCaret.begin = seekNext(getLastValidPosition());
                            break;

                        case "radixFocus":
                            if (doRadixFocus(selectedCaret.begin)) {
                                var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                                selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext(radixPos) : radixPos;
                                break;
                            }

                        default:
                            var clickPosition = selectedCaret.begin,
                                lvclickPosition = getLastValidPosition(clickPosition, !0),
                                lastPosition = seekNext(-1 !== lvclickPosition || isMask(0) ? lvclickPosition : 0);
                            if (clickPosition < lastPosition) selectedCaret.end = selectedCaret.begin = isMask(clickPosition, !0) || isMask(clickPosition - 1, !0) ? clickPosition : seekNext(clickPosition);else {
                                var lvp = maskset.validPositions[lvclickPosition],
                                    tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : void 0, lvp),
                                    placeholder = getPlaceholder(lastPosition, tt.match);
                                if ("" !== placeholder && getBuffer()[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask(lastPosition, opts.keepStatic) && tt.match.def === placeholder) {
                                    var newPos = seekNext(lastPosition);
                                    (newPos <= clickPosition || clickPosition === lastPosition) && (lastPosition = newPos);
                                }
                                selectedCaret.end = selectedCaret.begin = lastPosition;
                            }
                    }
                    return selectedCaret;
                }
            }
            var EventRuler = {
                on: function on(input, eventName, eventHandler) {
                    var ev = function ev(e) {
                        e.originalEvent && (e = e.originalEvent || e, arguments[0] = e);
                        var that = this,
                            args;
                        if (void 0 === that.inputmask && "FORM" !== this.nodeName) {
                            var imOpts = $.data(that, "_inputmask_opts");
                            imOpts ? new Inputmask(imOpts).mask(that) : EventRuler.off(that);
                        } else {
                            if ("setvalue" === e.type || "FORM" === this.nodeName || !(that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === keyCode.TAB))) {
                                switch (e.type) {
                                    case "input":
                                        if (!0 === skipInputEvent || e.inputType && "insertCompositionText" === e.inputType) return skipInputEvent = !1, e.preventDefault();
                                        break;

                                    case "keydown":
                                        skipKeyPressEvent = !1, skipInputEvent = !1;
                                        break;

                                    case "keypress":
                                        if (!0 === skipKeyPressEvent) return e.preventDefault();
                                        skipKeyPressEvent = !0;
                                        break;

                                    case "click":
                                    case "focus":
                                        return validationEvent ? (validationEvent = !1, input.blur(), HandleNativePlaceholder(input, (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).join("")), setTimeout(function () {
                                            input.focus();
                                        }, 3e3)) : (args = arguments, setTimeout(function () {
                                            eventHandler.apply(that, args);
                                        }, 0)), !1;
                                }
                                var returnVal = eventHandler.apply(that, arguments);
                                return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal;
                            }
                            e.preventDefault();
                        }
                    };
                    input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev);
                },
                off: function off(input, event) {
                    var events;
                    input.inputmask && input.inputmask.events && (event ? (events = [], events[event] = input.inputmask.events[event]) : events = input.inputmask.events, $.each(events, function (eventName, evArr) {
                        for (; 0 < evArr.length;) {
                            var ev = evArr.pop();
                            -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
                        }
                        delete input.inputmask.events[eventName];
                    }));
                }
            },
                EventHandlers = {
                keydownEvent: function keydownEvent(e) {
                    var input = this,
                        $input = $(input),
                        k = e.keyCode,
                        pos = caret(input),
                        kdResult = opts.onKeyDown.call(this, e, getBuffer(), pos, opts);
                    if (void 0 !== kdResult) return kdResult;
                    if (k === keyCode.BACKSPACE || k === keyCode.DELETE || iphone && k === keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === keyCode.X && !("oncut" in input)) e.preventDefault(), handleRemove(input, k, pos), writeBuffer(input, getBuffer(!0), maskset.p, e, input.inputmask._valueGet() !== getBuffer().join(""));else if (k === keyCode.END || k === keyCode.PAGE_DOWN) {
                        e.preventDefault();
                        var caretPos = seekNext(getLastValidPosition());
                        caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
                    } else k === keyCode.HOME && !e.shiftKey || k === keyCode.PAGE_UP ? (e.preventDefault(), caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === keyCode.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? (checkVal(input, !0, !1, undoValue.split("")), $input.trigger("click")) : !0 === opts.tabThrough && k === keyCode.TAB ? (!0 === e.shiftKey ? (!0 === getTest(pos.begin).match.static && (pos.begin = seekNext(pos.begin)), pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), pos.end = seekNext(pos.begin, !0), pos.end < maskset.maskLength && pos.end--), pos.begin < maskset.maskLength && (e.preventDefault(), caret(input, pos.begin, pos.end))) : e.shiftKey || opts.insertModeVisual && !1 === opts.insertMode && (k === keyCode.RIGHT ? setTimeout(function () {
                        var caretPos = caret(input);
                        caret(input, caretPos.begin);
                    }, 0) : k === keyCode.LEFT && setTimeout(function () {
                        var caretPos_begin = translatePosition(input.inputmask.caretPos.begin),
                            caretPos_end = translatePosition(input.inputmask.caretPos.end);
                        caret(input, isRTL ? caretPos_begin + (caretPos_begin === maskset.maskLength ? 0 : 1) : caretPos_begin - (0 === caretPos_begin ? 0 : 1));
                    }, 0));
                    ignorable = -1 !== $.inArray(k, opts.ignorables);
                },
                keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
                    var input = this,
                        $input = $(input),
                        k = e.which || e.charCode || e.keyCode;
                    if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), setTimeout(function () {
                        $input.trigger("change");
                    }, 0)), skipInputEvent = !0, !0;
                    if (k) {
                        44 !== k && 46 !== k || 3 !== e.location || "" === opts.radixPoint || (k = opts.radixPoint.charCodeAt(0));
                        var pos = checkval ? {
                            begin: ndx,
                            end: ndx
                        } : caret(input),
                            forwardPosition,
                            c = String.fromCharCode(k);
                        maskset.writeOutBuffer = !0;
                        var valResult = isValid(pos, c, strict);
                        if (!1 !== valResult && (resetMaskSet(!0), forwardPosition = void 0 !== valResult.caret ? valResult.caret : seekNext(valResult.pos.begin ? valResult.pos.begin : valResult.pos), maskset.p = forwardPosition), forwardPosition = opts.numericInput && void 0 === valResult.caret ? seekPrevious(forwardPosition) : forwardPosition, !1 !== writeOut && (setTimeout(function () {
                            opts.onKeyValidation.call(input, k, valResult, opts);
                        }, 0), maskset.writeOutBuffer && !1 !== valResult)) {
                            var buffer = getBuffer();
                            writeBuffer(input, buffer, forwardPosition, e, !0 !== checkval);
                        }
                        if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), valResult;
                    }
                },
                pasteEvent: function pasteEvent(e) {
                    var input = this,
                        inputValue = this.inputmask._valueGet(!0),
                        caretPos = caret(this),
                        tempValue;
                    isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
                    var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
                        valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                    if (valueBeforeCaret == (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), valueAfterCaret == (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""), window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;else {
                        if (!e.clipboardData || !e.clipboardData.getData) return !0;
                        inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret;
                    }
                    var pasteValue = inputValue;
                    if ($.isFunction(opts.onBeforePaste)) {
                        if (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts), !1 === pasteValue) return e.preventDefault();
                        pasteValue = pasteValue || inputValue;
                    }
                    return checkVal(this, !1, !1, pasteValue.toString().split("")), writeBuffer(this, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join("")), e.preventDefault();
                },
                inputFallBackEvent: function inputFallBackEvent(e) {
                    function ieMobileHandler(input, inputValue, caretPos) {
                        if (iemobile) {
                            var inputChar = inputValue.replace(getBuffer().join(""), "");
                            if (1 === inputChar.length) {
                                var iv = inputValue.split("");
                                iv.splice(caretPos.begin, 0, inputChar), inputValue = iv.join("");
                            }
                        }
                        return inputValue;
                    }
                    function analyseChanges(inputValue, buffer, caretPos) {
                        for (var frontPart = inputValue.substr(0, caretPos.begin).split(""), backPart = inputValue.substr(caretPos.begin).split(""), frontBufferPart = buffer.substr(0, caretPos.begin).split(""), backBufferPart = buffer.substr(caretPos.begin).split(""), fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length, bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length, bl, i, action = "", data = [], marker = "~", placeholder; frontPart.length < fpl;) {
                            frontPart.push("~");
                        }for (; frontBufferPart.length < fpl;) {
                            frontBufferPart.push("~");
                        }for (; backPart.length < bpl;) {
                            backPart.unshift("~");
                        }for (; backBufferPart.length < bpl;) {
                            backBufferPart.unshift("~");
                        }var newBuffer = frontPart.concat(backPart),
                            oldBuffer = frontBufferPart.concat(backBufferPart);
                        for (i = 0, bl = newBuffer.length; i < bl; i++) {
                            switch (placeholder = getPlaceholder(translatePosition(i)), action) {
                                case "insertText":
                                    oldBuffer[i - 1] === newBuffer[i] && caretPos.begin == newBuffer.length - 1 && data.push(newBuffer[i]), i = bl;
                                    break;

                                case "insertReplacementText":
                                    "~" === newBuffer[i] ? caretPos.end++ : i = bl;
                                    break;

                                case "deleteContentBackward":
                                    "~" === newBuffer[i] ? caretPos.end++ : i = bl;
                                    break;

                                default:
                                    newBuffer[i] !== oldBuffer[i] && ("~" !== newBuffer[i + 1] && newBuffer[i + 1] !== placeholder && void 0 !== newBuffer[i + 1] || (oldBuffer[i] !== placeholder || "~" !== oldBuffer[i + 1]) && "~" !== oldBuffer[i] ? "~" === oldBuffer[i + 1] && oldBuffer[i] === newBuffer[i + 1] ? (action = "insertText", data.push(newBuffer[i]), caretPos.begin--, caretPos.end--) : newBuffer[i] !== placeholder && "~" !== newBuffer[i] && ("~" === newBuffer[i + 1] || oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1]) ? (action = "insertReplacementText", data.push(newBuffer[i]), caretPos.begin--) : "~" === newBuffer[i] ? (action = "deleteContentBackward", !isMask(translatePosition(i), !0) && oldBuffer[i] !== opts.radixPoint || caretPos.end++) : i = bl : (action = "insertText", data.push(newBuffer[i]), caretPos.begin--, caretPos.end--));
                                    break;
                            }
                        }return {
                            action: action,
                            data: data,
                            caret: caretPos
                        };
                    }
                    var input = this,
                        inputValue = input.inputmask._valueGet(!0),
                        buffer = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join(""),
                        caretPos = caret(input, void 0, void 0, !0);
                    if (buffer !== inputValue) {
                        inputValue = ieMobileHandler(input, inputValue, caretPos);
                        var changes = analyseChanges(inputValue, buffer, caretPos);
                        switch (document.activeElement !== input && input.focus(), writeBuffer(input, getBuffer()), caret(input, caretPos.begin, caretPos.end, !0), changes.action) {
                            case "insertText":
                            case "insertReplacementText":
                                $.each(changes.data, function (ndx, entry) {
                                    var keypress = new $.Event("keypress");
                                    keypress.which = entry.charCodeAt(0), ignorable = !1, EventHandlers.keypressEvent.call(input, keypress);
                                }), setTimeout(function () {
                                    $el.trigger("keyup");
                                }, 0);
                                break;

                            case "deleteContentBackward":
                                var keydown = new $.Event("keydown");
                                keydown.keyCode = keyCode.BACKSPACE, EventHandlers.keydownEvent.call(input, keydown);
                                break;

                            default:
                                applyInputValue(input, inputValue);
                                break;
                        }
                        e.preventDefault();
                    }
                },
                compositionendEvent: function compositionendEvent(e) {
                    $el.trigger("input");
                },
                setValueEvent: function setValueEvent(e, argument_1, argument_2) {
                    var input = this,
                        value = e && e.detail ? e.detail[0] : argument_1;
                    void 0 === value && (value = this.inputmask._valueGet(!0)), applyInputValue(this, value), (e.detail && void 0 !== e.detail[1] || void 0 !== argument_2) && caret(this, e.detail ? e.detail[1] : argument_2);
                },
                focusEvent: function focusEvent(e) {
                    var input = this,
                        nptValue = this.inputmask._valueGet();
                    opts.showMaskOnFocus && nptValue !== getBuffer().join("") && writeBuffer(this, getBuffer(), seekNext(getLastValidPosition())), !0 !== opts.positionCaretOnTab || !1 !== mouseEnter || isComplete(getBuffer()) && -1 !== getLastValidPosition() || EventHandlers.clickEvent.apply(this, [e, !0]), undoValue = getBuffer().join("");
                },
                invalidEvent: function invalidEvent(e) {
                    validationEvent = !0;
                },
                mouseleaveEvent: function mouseleaveEvent() {
                    var input = this;
                    mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== this && HandleNativePlaceholder(this, originalPlaceholder);
                },
                clickEvent: function clickEvent(e, tabbed) {
                    var input = this;
                    if (document.activeElement === this) {
                        var newCaretPosition = determineNewCaretPosition(caret(this), tabbed);
                        void 0 !== newCaretPosition && caret(this, newCaretPosition);
                    }
                },
                cutEvent: function cutEvent(e) {
                    var input = this,
                        pos = caret(this),
                        clipboardData = window.clipboardData || e.clipboardData,
                        clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
                    clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")), document.execCommand && document.execCommand("copy"), handleRemove(this, keyCode.DELETE, pos), writeBuffer(this, getBuffer(), maskset.p, e, undoValue !== getBuffer().join(""));
                },
                blurEvent: function blurEvent(e) {
                    var $input = $(this),
                        input = this;
                    if (this.inputmask) {
                        HandleNativePlaceholder(this, originalPlaceholder);
                        var nptValue = this.inputmask._valueGet(),
                            buffer = getBuffer().slice();
                        "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), !1 === isComplete(buffer) && (setTimeout(function () {
                            $input.trigger("incomplete");
                        }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), writeBuffer(this, buffer, void 0, e)), undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), $input.trigger("change"));
                    }
                },
                mouseenterEvent: function mouseenterEvent() {
                    var input = this;
                    mouseEnter = !0, document.activeElement !== this && (null == originalPlaceholder && this.placeholder !== originalPlaceholder && (originalPlaceholder = this.placeholder), opts.showMaskOnHover && HandleNativePlaceholder(this, (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).join("")));
                },
                submitEvent: function submitEvent() {
                    undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), opts.clearIncomplete && !1 === isComplete(getBuffer()) && el.inputmask._valueSet(""), opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), setTimeout(function () {
                        writeBuffer(el, getBuffer());
                    }, 0));
                },
                resetEvent: function resetEvent() {
                    el.inputmask.refreshValue = !0, setTimeout(function () {
                        applyInputValue(el, el.inputmask._valueGet(!0));
                    }, 0);
                }
            },
                valueBuffer;
            function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
                var inputmask = this || input.inputmask,
                    inputValue = nptvl.slice(),
                    charCodes = "",
                    initialNdx = -1,
                    result = void 0;
                function isTemplateMatch(ndx, charCodes) {
                    for (var targetTemplate = getMaskTemplate(!0, 0).slice(ndx, seekNext(ndx)).join("").replace(/'/g, ""), charCodeNdx = targetTemplate.indexOf(charCodes); 0 < charCodeNdx && " " === targetTemplate[charCodeNdx - 1];) {
                        charCodeNdx--;
                    }var match = 0 === charCodeNdx && !isMask(ndx) && (getTest(ndx).match.nativeDef === charCodes.charAt(0) || !0 === getTest(ndx).match.static && getTest(ndx).match.nativeDef === "'" + charCodes.charAt(0) || " " === getTest(ndx).match.nativeDef && (getTest(ndx + 1).match.nativeDef === charCodes.charAt(0) || !0 === getTest(ndx + 1).match.static && getTest(ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
                    return !match && 0 < charCodeNdx && (inputmask.caretPos = {
                        begin: seekNext(charCodeNdx)
                    }), match;
                }
                resetMaskSet(), maskset.tests = {}, initialNdx = opts.radixPoint ? determineNewCaretPosition({
                    begin: 0,
                    end: 0
                }).begin : 0, maskset.p = initialNdx, inputmask.caretPos = {
                    begin: initialNdx
                };
                var staticMatches = [],
                    prevCaretPos = inputmask.caretPos;
                if ($.each(inputValue, function (ndx, charCode) {
                    if (void 0 !== charCode) if (void 0 === maskset.validPositions[ndx] && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, !0) && !1 === isValid(ndx, inputValue[ndx], !0, void 0, void 0, !0)) maskset.p++;else {
                        var keypress = new $.Event("_checkval");
                        keypress.which = charCode.toString().charCodeAt(0), charCodes += charCode;
                        var lvp = getLastValidPosition(void 0, !0);
                        isTemplateMatch(initialNdx, charCodes) ? result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, lvp + 1) : (result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, inputmask.caretPos.begin), result && (initialNdx = inputmask.caretPos.begin + 1, charCodes = "")), result ? (void 0 !== result.pos && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static && void 0 === maskset.validPositions[result.pos].alternation && (staticMatches.push(result.pos), isRTL || (result.forwardPosition = result.pos + 1)), writeBuffer(void 0, getBuffer(), result.forwardPosition, keypress, !1), inputmask.caretPos = {
                            begin: result.forwardPosition,
                            end: result.forwardPosition
                        }, prevCaretPos = inputmask.caretPos) : inputmask.caretPos = prevCaretPos;
                    }
                }), 0 < staticMatches.length) {
                    var sndx,
                        validPos,
                        nextValid = seekNext(-1, void 0, !1);
                    if (!isComplete(getBuffer()) && staticMatches.length <= nextValid || isComplete(getBuffer()) && 0 < staticMatches.length && staticMatches.length !== nextValid && 0 === staticMatches[0]) for (var nextSndx = nextValid; void 0 !== (sndx = staticMatches.shift());) {
                        var keypress = new $.Event("_checkval");
                        if (validPos = maskset.validPositions[sndx], validPos.generatedInput = !0, keypress.which = validPos.input.charCodeAt(0), result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, nextSndx), result && void 0 !== result.pos && result.pos !== sndx && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static) staticMatches.push(result.pos);else if (!result) break;
                        nextSndx++;
                    } else for (; sndx = staticMatches.pop();) {
                        validPos = maskset.validPositions[sndx], validPos && (validPos.generatedInput = !0);
                    }
                }
                if (writeOut) for (var vndx in writeBuffer(input, getBuffer(), result ? result.forwardPosition : void 0, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type), maskset.validPositions) {
                    !0 !== maskset.validPositions[vndx].match.generated && delete maskset.validPositions[vndx].generatedInput;
                }
            }
            function unmaskedvalue(input) {
                if (input) {
                    if (void 0 === input.inputmask) return input.value;
                    input.inputmask && input.inputmask.refreshValue && applyInputValue(input, input.inputmask._valueGet(!0));
                }
                var umValue = [],
                    vps = maskset.validPositions;
                for (var pndx in vps) {
                    vps[pndx] && vps[pndx].match && 1 != vps[pndx].match.static && umValue.push(vps[pndx].input);
                }var unmaskedValue = 0 === umValue.length ? "" : (isRTL ? umValue.reverse() : umValue).join("");
                if ($.isFunction(opts.onUnMask)) {
                    var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                    unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
                }
                return unmaskedValue;
            }
            function translatePosition(pos) {
                return !isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || !el || (pos = el.inputmask._valueGet().length - pos), pos;
            }
            function caret(input, begin, end, notranslate) {
                var range;
                if (void 0 === begin) return "selectionStart" in input && "selectionEnd" in input ? (begin = input.selectionStart, end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), range.commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), end = begin + range.text.length), opts.insertModeVisual && !1 === opts.insertMode && begin === end - 1 && end--, {
                    begin: notranslate ? begin : translatePosition(begin),
                    end: notranslate ? end : translatePosition(end)
                };
                if ($.isArray(begin) && (end = isRTL ? begin[0] : begin[1], begin = isRTL ? begin[1] : begin[0]), void 0 !== begin.begin && (end = isRTL ? begin.begin : begin.end, begin = isRTL ? begin.end : begin.begin), "number" == typeof begin) {
                    begin = notranslate ? begin : translatePosition(begin), end = notranslate ? end : translatePosition(end), end = "number" == typeof end ? end : begin;
                    var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
                    if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, input.inputmask.caretPos = {
                        begin: begin,
                        end: end
                    }, opts.insertModeVisual && !1 === opts.insertMode && begin === end && end++, input === document.activeElement) if ("setSelectionRange" in input) input.setSelectionRange(begin, end);else if (window.getSelection) {
                        if (range = document.createRange(), void 0 === input.firstChild || null === input.firstChild) {
                            var textNode = document.createTextNode("");
                            input.appendChild(textNode);
                        }
                        range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), range.collapse(!0);
                        var sel = window.getSelection();
                        sel.removeAllRanges(), sel.addRange(range);
                    } else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), range.select());
                }
            }
            function determineLastRequiredPosition(returnDefinition) {
                var buffer = getMaskTemplate(!0, getLastValidPosition(), !0, !0),
                    bl = buffer.length,
                    pos,
                    lvp = getLastValidPosition(),
                    positions = {},
                    lvTest = maskset.validPositions[lvp],
                    ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0,
                    testPos;
                for (pos = lvp + 1; pos < buffer.length; pos++) {
                    testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
                }var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
                for (pos = bl - 1; lvp < pos && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && 1 != testPos.match.static || !0 === testPos.match.static && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) {
                    bl--;
                }return returnDefinition ? {
                    l: bl,
                    def: positions[bl] ? positions[bl].match : void 0
                } : bl;
            }
            function clearOptionalTail(buffer) {
                buffer.length = 0;
                for (var template = getMaskTemplate(!0, 0, !0, void 0, !0), lmnt; void 0 !== (lmnt = template.shift());) {
                    buffer.push(lmnt);
                }return buffer;
            }
            function isComplete(buffer) {
                if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
                if ("*" !== opts.repeat) {
                    var complete = !1,
                        lrp = determineLastRequiredPosition(!0),
                        aml = seekPrevious(lrp.l);
                    if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                        complete = !0;
                        for (var i = 0; i <= aml; i++) {
                            var test = getTestTemplate(i).match;
                            if (!0 !== test.static && void 0 === maskset.validPositions[i] && !0 !== test.optionality && !0 !== test.optionalQuantifier || !0 === test.static && buffer[i] !== getPlaceholder(i, test)) {
                                complete = !1;
                                break;
                            }
                        }
                    }
                    return complete;
                }
            }
            function handleRemove(input, k, pos, strict, fromIsValid) {
                if ((opts.numericInput || isRTL) && (k === keyCode.BACKSPACE ? k = keyCode.DELETE : k === keyCode.DELETE && (k = keyCode.BACKSPACE), isRTL)) {
                    var pend = pos.end;
                    pos.end = pos.begin, pos.begin = pend;
                }
                var offset;
                if (k === keyCode.BACKSPACE || k === keyCode.DELETE && !1 === opts.insertMode && opts.insertModeVisual ? pos.end - pos.begin < 1 && (pos.begin = seekPrevious(pos.begin), void 0 !== maskset.validPositions[pos.begin] && maskset.validPositions[pos.begin].input === opts.groupSeparator && pos.begin--) : k === keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end, !0, !0) ? pos.end + 1 : seekNext(pos.end) + 1, void 0 !== maskset.validPositions[pos.begin] && maskset.validPositions[pos.begin].input === opts.groupSeparator && pos.end++), !1 !== (offset = revalidateMask(pos))) {
                    if (!0 !== strict && !1 !== opts.keepStatic || null !== opts.regex && -1 !== getTest(pos.begin).match.def.indexOf("|")) {
                        var result = alternate(!0);
                        if (result) {
                            var newPos = void 0 !== result.caret ? result.caret : result.pos ? seekNext(result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition(-1, !0);
                            (k !== keyCode.DELETE || pos.begin > newPos) && pos.begin;
                        }
                    }
                    var lvp = getLastValidPosition(pos.end, !0);
                    lvp < pos.begin ? maskset.p = !1 === opts.insertMode && opts.insertModeVisual ? seekPrevious(lvp + 1) : seekNext(lvp) : !0 !== strict && (maskset.p = k === keyCode.DELETE ? pos.begin + offset : pos.begin, !1 === opts.insertMode && opts.insertModeVisual && k === keyCode.DELETE && (maskset.p = pos.end + 1, void 0 === maskset.validPositions[maskset.p] && getLastValidPosition(maskset.maskLength, !0) < maskset.p && (maskset.p = seekPrevious(lvp + 1))));
                }
            }
            function applyInputValue(input, value) {
                input.inputmask.refreshValue = !1, $.isFunction(opts.onBeforeMask) && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), value = value.toString().split(""), checkVal(input, !0, !1, value), undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && -1 === getLastValidPosition() && input.inputmask._valueSet("");
            }
            function mask(elem) {
                function isElementTypeSupported(input, opts) {
                    function patchValueProperty(npt) {
                        var valueGet, valueSet;
                        function patchValhook(type) {
                            if ($.valHooks && (void 0 === $.valHooks[type] || !0 !== $.valHooks[type].inputmaskpatch)) {
                                var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
                                    return elem.value;
                                },
                                    valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                                    return elem.value = value, elem;
                                };
                                $.valHooks[type] = {
                                    get: function get(elem) {
                                        if (elem.inputmask) {
                                            if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                            var result = valhookGet(elem);
                                            return -1 !== getLastValidPosition(void 0, void 0, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : "";
                                        }
                                        return valhookGet(elem);
                                    },
                                    set: function set(elem, value) {
                                        var result = valhookSet(elem, value);
                                        return elem.inputmask && applyInputValue(elem, value), result;
                                    },
                                    inputmaskpatch: !0
                                };
                            }
                        }
                        function getter() {
                            return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== opts.nullable ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
                        }
                        function setter(value) {
                            valueSet.call(this, value), this.inputmask && applyInputValue(this, value);
                        }
                        function installNativeValueSetFallback(npt) {
                            EventRuler.on(npt, "mouseenter", function () {
                                var input = this,
                                    value = this.inputmask._valueGet(!0);
                                value !== (isRTL ? getBuffer().reverse() : getBuffer()).join("") && applyInputValue(this, value);
                            });
                        }
                        if (!npt.inputmask.__valueGet) {
                            if (!0 !== opts.noValuePatching) {
                                if (Object.getOwnPropertyDescriptor) {
                                    "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === _typeof("test".__proto__) ? function (object) {
                                        return object.__proto__;
                                    } : function (object) {
                                        return object.constructor.prototype;
                                    });
                                    var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;
                                    valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: !0
                                    })) : "input" !== npt.tagName.toLowerCase() && (valueGet = function valueGet() {
                                        return this.textContent;
                                    }, valueSet = function valueSet(value) {
                                        this.textContent = value;
                                    }, Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: !0
                                    }));
                                } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), npt.__defineSetter__("value", setter));
                                npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet;
                            }
                            npt.inputmask._valueGet = function (overruleRTL) {
                                return isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                            }, npt.inputmask._valueSet = function (value, overruleRTL) {
                                valueSet.call(this.el, null == value ? "" : !0 !== overruleRTL && isRTL ? value.split("").reverse().join("") : value);
                            }, void 0 === valueGet && (valueGet = function valueGet() {
                                return this.value;
                            }, valueSet = function valueSet(value) {
                                this.value = value;
                            }, patchValhook(npt.type), installNativeValueSetFallback(npt));
                        }
                    }
                    "textarea" !== input.tagName.toLowerCase() && opts.ignorables.push(keyCode.ENTER);
                    var elementType = input.getAttribute("type"),
                        isSupported = "input" === input.tagName.toLowerCase() && -1 !== $.inArray(elementType, opts.supportsInputType) || input.isContentEditable || "textarea" === input.tagName.toLowerCase();
                    if (!isSupported) if ("input" === input.tagName.toLowerCase()) {
                        var el = document.createElement("input");
                        el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
                    } else isSupported = "partial";
                    return !1 !== isSupported ? patchValueProperty(input) : input.inputmask = void 0, isSupported;
                }
                EventRuler.off(elem);
                var isSupported = isElementTypeSupported(elem, opts);
                if (!1 !== isSupported && (el = elem, $el = $(el), originalPlaceholder = el.placeholder, maxLength = void 0 !== el ? el.maxLength : void 0, -1 === maxLength && (maxLength = void 0), "inputMode" in el && null === el.getAttribute("inputmode") && (el.inputMode = opts.inputmode, el.setAttribute("inputmode", opts.inputmode)), !0 === isSupported && (opts.showMaskOnFocus = opts.showMaskOnFocus && -1 === ["cc-number", "cc-exp"].indexOf(el.autocomplete), iphone && (opts.insertModeVisual = !1), EventRuler.on(el, "submit", EventHandlers.submitEvent), EventRuler.on(el, "reset", EventHandlers.resetEvent), EventRuler.on(el, "blur", EventHandlers.blurEvent), EventRuler.on(el, "focus", EventHandlers.focusEvent), EventRuler.on(el, "invalid", EventHandlers.invalidEvent), EventRuler.on(el, "click", EventHandlers.clickEvent), EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent), EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent), EventRuler.on(el, "paste", EventHandlers.pasteEvent), EventRuler.on(el, "cut", EventHandlers.cutEvent), EventRuler.on(el, "complete", opts.oncomplete), EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared), mobile || !0 === opts.inputEventOnly ? el.removeAttribute("maxLength") : (EventRuler.on(el, "keydown", EventHandlers.keydownEvent), EventRuler.on(el, "keypress", EventHandlers.keypressEvent)), EventRuler.on(el, "input", EventHandlers.inputFallBackEvent), EventRuler.on(el, "compositionend", EventHandlers.compositionendEvent)), EventRuler.on(el, "setvalue", EventHandlers.setValueEvent), undoValue = getBufferTemplate().join(""), "" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || document.activeElement === el)) {
                    applyInputValue(el, el.inputmask._valueGet(!0), opts);
                    var buffer = getBuffer().slice();
                    !1 === isComplete(buffer) && opts.clearIncomplete && resetMaskSet(), opts.clearMaskOnLostFocus && document.activeElement !== el && (-1 === getLastValidPosition() ? buffer = [] : clearOptionalTail(buffer)), (!1 === opts.clearMaskOnLostFocus || opts.showMaskOnFocus && document.activeElement === el || "" !== el.inputmask._valueGet(!0)) && writeBuffer(el, buffer), document.activeElement === el && caret(el, seekNext(getLastValidPosition()));
                }
            }
            if (void 0 !== actionObj) switch (actionObj.action) {
                case "isComplete":
                    return el = actionObj.el, isComplete(getBuffer());

                case "unmaskedvalue":
                    return void 0 !== el && void 0 === actionObj.value || (valueBuffer = actionObj.value, valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer).split(""), checkVal.call(this, void 0, !1, !1, valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(inputmask, void 0, getBuffer(), 0, opts)), unmaskedvalue(el);

                case "mask":
                    mask(el);
                    break;

                case "format":
                    return valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value).split(""), checkVal.call(this, void 0, !0, !1, valueBuffer), actionObj.metadata ? {
                        value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                        metadata: maskScope.call(this, {
                            action: "getmetadata"
                        }, maskset, opts)
                    } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

                case "isValid":
                    actionObj.value ? (valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value).split(""), checkVal.call(this, void 0, !0, !1, valueBuffer)) : actionObj.value = isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
                    for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; rl < lmib && !isMask(lmib); lmib--) {}
                    return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === (isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""));

                case "getemptymask":
                    return getBufferTemplate().join("");

                case "remove":
                    if (el && el.inputmask) {
                        $.data(el, "_inputmask_opts", null), $el = $(el);
                        var cv = opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(opts.autoUnmask),
                            valueProperty;
                        cv !== getBufferTemplate().join("") ? el.inputmask._valueSet(cv, opts.autoUnmask) : el.inputmask._valueSet(""), EventRuler.off(el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value"), valueProperty && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
                            get: el.inputmask.__valueGet,
                            set: el.inputmask.__valueSet,
                            configurable: !0
                        })) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = void 0;
                    }
                    return el;

                case "getmetadata":
                    if ($.isArray(maskset.metadata)) {
                        var maskTarget = getMaskTemplate(!0, 0, !1).join("");
                        return $.each(maskset.metadata, function (ndx, mtdt) {
                            if (mtdt.mask === maskTarget) return maskTarget = mtdt, !1;
                        }), maskTarget;
                    }
                    return maskset.metadata;
            }
        };
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
                return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
            }, _typeof(obj);
        }
        var Inputmask = __webpack_require__(1),
            $ = Inputmask.dependencyLib,
            keyCode = __webpack_require__(0),
            formatCode = {
            d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
            dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
                return pad(Date.prototype.getDate.call(this), 2);
            }],
            ddd: [""],
            dddd: [""],
            m: ["[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
                return Date.prototype.getMonth.call(this) + 1;
            }],
            mm: ["0[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
                return pad(Date.prototype.getMonth.call(this) + 1, 2);
            }],
            mmm: [""],
            mmmm: [""],
            yy: ["[0-9]{2}", Date.prototype.setFullYear, "year", function () {
                return pad(Date.prototype.getFullYear.call(this), 2);
            }],
            yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function () {
                return pad(Date.prototype.getFullYear.call(this), 4);
            }],
            h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
            hh: ["0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function () {
                return pad(Date.prototype.getHours.call(this), 2);
            }],
            hx: [function (x) {
                return "[0-9]{".concat(x, "}");
            }, Date.prototype.setHours, "hours", function (x) {
                return Date.prototype.getHours;
            }],
            H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
            HH: ["0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
                return pad(Date.prototype.getHours.call(this), 2);
            }],
            Hx: [function (x) {
                return "[0-9]{".concat(x, "}");
            }, Date.prototype.setHours, "hours", function (x) {
                return function () {
                    return pad(Date.prototype.getHours.call(this), x);
                };
            }],
            M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
            MM: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function () {
                return pad(Date.prototype.getMinutes.call(this), 2);
            }],
            s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds],
            ss: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function () {
                return pad(Date.prototype.getSeconds.call(this), 2);
            }],
            l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function () {
                return pad(Date.prototype.getMilliseconds.call(this), 3);
            }],
            L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
                return pad(Date.prototype.getMilliseconds.call(this), 2);
            }],
            t: ["[ap]"],
            tt: ["[ap]m"],
            T: ["[AP]"],
            TT: ["[AP]M"],
            Z: [""],
            o: [""],
            S: [""]
        },
            formatAlias = {
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        };
        function formatcode(match) {
            var dynMatches = new RegExp("\\d+$").exec(match[0]);
            if (dynMatches && void 0 !== dynMatches[0]) {
                var fcode = formatCode[match[0][0] + "x"].slice("");
                return fcode[0] = fcode[0](dynMatches[0]), fcode[3] = fcode[3](dynMatches[0]), fcode;
            }
            if (formatCode[match[0]]) return formatCode[match[0]];
        }
        function getTokenizer(opts) {
            if (!opts.tokenizer) {
                var tokens = [],
                    dyntokens = [];
                for (var ndx in formatCode) {
                    if (ndx.endsWith("x")) {
                        var dynToken = ndx[0] + "\\d+";
                        -1 === dyntokens.indexOf(dynToken) && dyntokens.push(dynToken);
                    } else -1 === tokens.indexOf(ndx[0]) && tokens.push(ndx[0]);
                }opts.tokenizer = "(" + (0 < dyntokens.length ? dyntokens.join("|") + "|" : "") + tokens.join("+|") + ")+?|.", opts.tokenizer = new RegExp(opts.tokenizer, "g");
            }
            return opts.tokenizer;
        }
        function isValidDate(dateParts, currentResult) {
            return (!isFinite(dateParts.rawday) || "29" == dateParts.day && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) && currentResult;
        }
        function isDateInRange(dateParts, opts) {
            var result = !0;
            if (opts.min) {
                if (dateParts.rawyear) {
                    var rawYear = dateParts.rawyear.replace(/[^0-9]/g, ""),
                        minYear = opts.min.year.substr(0, rawYear.length);
                    result = minYear <= rawYear;
                }
                dateParts.year === dateParts.rawyear && opts.min.date.getTime() == opts.min.date.getTime() && (result = opts.min.date.getTime() <= dateParts.date.getTime());
            }
            return result && opts.max && opts.max.date.getTime() == opts.max.date.getTime() && (result = opts.max.date.getTime() >= dateParts.date.getTime()), result;
        }
        function parse(format, dateObjValue, opts, raw) {
            var mask = "",
                match,
                fcode;
            for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);) {
                if (void 0 === dateObjValue) {
                    if (fcode = formatcode(match)) mask += "(" + fcode[0] + ")";else switch (match[0]) {
                        case "[":
                            mask += "(";
                            break;

                        case "]":
                            mask += ")?";
                            break;

                        default:
                            mask += Inputmask.escapeRegex(match[0]);
                    }
                } else if (fcode = formatcode(match)) {
                    if (!0 !== raw && fcode[3]) {
                        var getFn = fcode[3];
                        mask += getFn.call(dateObjValue.date);
                    } else fcode[2] ? mask += dateObjValue["raw" + fcode[2]] : mask += match[0];
                } else mask += match[0];
            }return mask;
        }
        function pad(val, len) {
            for (val = String(val), len = len || 2; val.length < len;) {
                val = "0" + val;
            }return val;
        }
        function analyseMask(maskString, format, opts) {
            var dateObj = {
                date: new Date(1, 0, 1)
            },
                targetProp,
                mask = maskString,
                match,
                dateOperation;
            function extendProperty(value) {
                var correctedValue = value.replace(/[^0-9]/g, "0");
                return correctedValue;
            }
            function setValue(dateObj, value, opts) {
                dateObj[targetProp] = extendProperty(value), dateObj["raw" + targetProp] = value, void 0 !== dateOperation && dateOperation.call(dateObj.date, "month" == targetProp ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp]);
            }
            if ("string" == typeof mask) {
                for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);) {
                    var value = mask.slice(0, match[0].length);
                    formatCode.hasOwnProperty(match[0]) && (targetProp = formatCode[match[0]][2], dateOperation = formatCode[match[0]][1], setValue(dateObj, value, opts)), mask = mask.slice(value.length);
                }
                return dateObj;
            }
            if (mask && "object" === _typeof(mask) && mask.hasOwnProperty("date")) return mask;
        }
        Inputmask.extendAliases({
            datetime: {
                mask: function mask(opts) {
                    return formatCode.S = opts.i18n.ordinalSuffix.join("|"), opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat, opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat, opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat, opts.placeholder = "" !== opts.placeholder ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, ""), opts.regex = parse(opts.inputFormat, void 0, opts), null;
                },
                placeholder: "",
                inputFormat: "isoDateTime",
                displayFormat: void 0,
                outputFormat: void 0,
                min: null,
                max: null,
                skipOptionalPartCharacter: "",
                i18n: {
                    dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    ordinalSuffix: ["st", "nd", "rd", "th"]
                },
                preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
                    if (strict) return !0;
                    var calcPos = 0,
                        targetMatch,
                        match;
                    if (isNaN(c) && buffer[pos] !== c) {
                        for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat);) {
                            if (calcPos += match[0].length, pos <= calcPos) {
                                targetMatch = match, match = getTokenizer(opts).exec(opts.inputFormat);
                                break;
                            }
                        }if (match && match[0] === c && 1 < targetMatch[0].length) return buffer[pos] = buffer[pos - 1], buffer[pos - 1] = "0", {
                            fuzzy: !0,
                            buffer: buffer,
                            refreshFromBuffer: {
                                start: pos - 1,
                                end: pos + 1
                            },
                            pos: pos + 1
                        };
                    }
                    return !0;
                },
                postValidation: function postValidation(buffer, pos, currentResult, opts, maskset, strict) {
                    if (strict) return !0;
                    opts.min = analyseMask(opts.min, opts.inputFormat, opts), opts.max = analyseMask(opts.max, opts.inputFormat, opts), currentResult.fuzzy && (buffer = currentResult.buffer, pos = currentResult.pos);
                    var calcPos = 0,
                        match;
                    for (getTokenizer(opts).lastIndex = 0; (match = getTokenizer(opts).exec(opts.inputFormat)) && (calcPos += match[0].length, !(pos < calcPos));) {}
                    if (match && match[0] && void 0 !== formatCode[match[0]]) {
                        var validator = formatCode[match[0]][0],
                            part = buffer.slice(match.index, match.index + match[0].length);
                        !1 === new RegExp(validator).test(part.join("")) && 2 === match[0].length && maskset.validPositions[match.index] && maskset.validPositions[match.index + 1] && (maskset.validPositions[match.index + 1].input = "0");
                    }
                    var result = currentResult,
                        dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
                    return result && dateParts.date.getTime() == dateParts.date.getTime() && (result = isValidDate(dateParts, result), result = result && isDateInRange(dateParts, opts)), pos && result && currentResult.pos !== pos ? {
                        buffer: parse(opts.inputFormat, dateParts, opts).split(""),
                        refreshFromBuffer: {
                            start: pos,
                            end: currentResult.pos
                        }
                    } : result;
                },
                onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                    var input = this;
                    if (e.ctrlKey && e.keyCode === keyCode.RIGHT) {
                        var today = new Date(),
                            match,
                            date = "";
                        for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat);) {
                            "d" === match[0].charAt(0) ? date += pad(today.getDate(), match[0].length) : "m" === match[0].charAt(0) ? date += pad(today.getMonth() + 1, match[0].length) : "yyyy" === match[0] ? date += today.getFullYear().toString() : "y" === match[0].charAt(0) && (date += pad(today.getYear(), match[0].length));
                        }this.inputmask._valueSet(date), $(this).trigger("setvalue");
                    }
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return unmaskedValue ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, !0) : unmaskedValue;
                },
                casing: function casing(elem, test, pos, validPositions) {
                    return 0 == test.nativeDef.indexOf("[ap]") ? elem.toLowerCase() : 0 == test.nativeDef.indexOf("[AP]") ? elem.toUpperCase() : elem;
                },
                insertMode: !1,
                shiftPositions: !1,
                keepStatic: !1,
                inputmode: "numeric"
            }
        }), module.exports = Inputmask;
    }, function (module, exports, __webpack_require__) {
        "use strict";

        var Inputmask = __webpack_require__(1),
            $ = Inputmask.dependencyLib,
            keyCode = __webpack_require__(0);
        function autoEscape(txt, opts) {
            for (var escapedTxt = "", i = 0; i < txt.length; i++) {
                Inputmask.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker[0] === txt.charAt(i) || opts.optionalmarker[1] === txt.charAt(i) || opts.quantifiermarker[0] === txt.charAt(i) || opts.quantifiermarker[1] === txt.charAt(i) || opts.groupmarker[0] === txt.charAt(i) || opts.groupmarker[1] === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? escapedTxt += "\\" + txt.charAt(i) : escapedTxt += txt.charAt(i);
            }return escapedTxt;
        }
        function alignDigits(buffer, digits, opts, force) {
            if (0 < digits && (!opts.digitsOptional || force)) {
                var radixPosition = $.inArray(opts.radixPoint, buffer);
                -1 === radixPosition && (buffer.push(opts.radixPoint), radixPosition = buffer.length - 1);
                for (var i = 1; i <= digits; i++) {
                    buffer[radixPosition + i] = buffer[radixPosition + i] || "0";
                }
            }
            return buffer;
        }
        function findValidator(symbol, maskset) {
            var posNdx = 0;
            if ("+" === symbol) {
                for (posNdx in maskset.validPositions) {}
                posNdx = parseInt(posNdx);
            }
            for (var tstNdx in maskset.tests) {
                if (tstNdx = parseInt(tstNdx), posNdx <= tstNdx) for (var ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) {
                    if ((void 0 === maskset.validPositions[tstNdx] || "-" === symbol) && maskset.tests[tstNdx][ndx].match.def === symbol) return tstNdx + (void 0 !== maskset.validPositions[tstNdx] && "-" !== symbol ? 1 : 0);
                }
            }return posNdx;
        }
        function findValid(symbol, maskset) {
            var ret = -1;
            return $.each(maskset.validPositions, function (ndx, tst) {
                if (tst && tst.match.def === symbol) return ret = parseInt(ndx), !1;
            }), ret;
        }
        function parseMinMaxOptions(opts) {
            void 0 === opts.parseMinMaxOptions && (null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")), opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN, isNaN(opts.min) && (opts.min = Number.MIN_VALUE)), null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")), opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN, isNaN(opts.max) && (opts.max = Number.MAX_VALUE)), opts.parseMinMaxOptions = "done");
        }
        function genMask(opts) {
            opts.repeat = 0, opts.groupSeparator === opts.radixPoint && opts.digits && "0" !== opts.digits && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), 1 < opts.placeholder.length && (opts.placeholder = opts.placeholder.charAt(0)), "radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && (opts.positionCaretOnClick = "lvp");
            var decimalDef = "0",
                radixPointDef = opts.radixPoint;
            !0 === opts.numericInput && void 0 === opts.__financeInput ? (decimalDef = "1", opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), opts._radixDance = !1, radixPointDef = "," === opts.radixPoint ? "^" : "\xa8", "" !== opts.radixPoint && void 0 === opts.definitions[radixPointDef] && (opts.definitions[radixPointDef] = {}, opts.definitions[radixPointDef].validator = "[" + opts.radixPoint + "]", opts.definitions[radixPointDef].placeholder = opts.radixPoint, opts.definitions[radixPointDef].static = !0, opts.definitions[radixPointDef].generated = !0)) : (opts.__financeInput = !1, opts.numericInput = !0);
            var mask = "[+]",
                altMask;
            if (mask += autoEscape(opts.prefix, opts), "" !== opts.groupSeparator ? (void 0 === opts.definitions[opts.groupSeparator] && (opts.definitions[opts.groupSeparator] = {}, opts.definitions[opts.groupSeparator].validator = "[" + opts.groupSeparator + "]", opts.definitions[opts.groupSeparator].placeholder = opts.groupSeparator, opts.definitions[opts.groupSeparator].static = !0, opts.definitions[opts.groupSeparator].generated = !0), mask += opts._mask(opts)) : mask += "9{+}", void 0 !== opts.digits && 0 !== opts.digits) {
                var dq = opts.digits.toString().split(",");
                isFinite(dq[0]) && dq[1] && isFinite(dq[1]) ? mask += radixPointDef + decimalDef + "{" + opts.digits + "}" : (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && (opts.digitsOptional ? (altMask = mask + radixPointDef + decimalDef + "{0," + opts.digits + "}", opts.keepStatic = !0) : mask += radixPointDef + decimalDef + "{" + opts.digits + "}");
            }
            return mask += autoEscape(opts.suffix, opts), mask += "[-]", altMask && (mask = [altMask + autoEscape(opts.suffix, opts) + "[-]", mask]), opts.greedy = !1, parseMinMaxOptions(opts), mask;
        }
        function hanndleRadixDance(pos, c, radixPos, maskset, opts) {
            return opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back && pos <= radixPos && (0 < radixPos || c == opts.radixPoint) && (void 0 === maskset.validPositions[pos - 1] || maskset.validPositions[pos - 1].input !== opts.negationSymbol.back) && (pos -= 1), pos;
        }
        function decimalValidator(chrs, maskset, pos, strict, opts) {
            var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
                result = -1 !== radixPos && new RegExp("[0-9\uFF11-\uFF19]").test(chrs);
            return opts._radixDance && result && null == maskset.validPositions[radixPos] ? {
                insert: {
                    pos: radixPos === pos ? radixPos + 1 : radixPos,
                    c: opts.radixPoint
                },
                pos: pos
            } : result;
        }
        function checkForLeadingZeroes(buffer, opts) {
            var numberMatches = new RegExp("(^" + ("" !== opts.negationSymbol.front ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + ("" != opts.negationSymbol.back ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")),
                number = numberMatches ? numberMatches[2] : "",
                leadingzeroes = !1;
            return number && (number = number.split(opts.radixPoint.charAt(0))[0], leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number)), !(!leadingzeroes || !(1 < leadingzeroes[0].length || 0 < leadingzeroes[0].length && leadingzeroes[0].length < number.length)) && leadingzeroes;
        }
        Inputmask.extendAliases({
            numeric: {
                mask: genMask,
                _mask: function _mask(opts) {
                    return "(" + opts.groupSeparator + "999){+|1}";
                },
                digits: "*",
                digitsOptional: !0,
                enforceDigitsOnBlur: !1,
                radixPoint: ".",
                positionCaretOnClick: "radixFocus",
                _radixDance: !0,
                groupSeparator: "",
                allowMinus: !0,
                negationSymbol: {
                    front: "-",
                    back: ""
                },
                prefix: "",
                suffix: "",
                min: null,
                max: null,
                step: 1,
                unmaskAsNumber: !1,
                roundingFN: Math.round,
                inputmode: "numeric",
                shortcuts: {
                    k: "000",
                    m: "000000"
                },
                placeholder: "0",
                greedy: !1,
                rightAlign: !0,
                insertMode: !0,
                autoUnmask: !1,
                skipOptionalPartCharacter: "",
                definitions: {
                    0: {
                        validator: decimalValidator
                    },
                    1: {
                        validator: decimalValidator,
                        definitionSymbol: "*"
                    },
                    "+": {
                        validator: function validator(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front);
                        }
                    },
                    "-": {
                        validator: function validator(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && chrs === opts.negationSymbol.back;
                        }
                    }
                },
                preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
                    if (!1 !== opts.__financeInput && c === opts.radixPoint) return !1;
                    var pattern;
                    if (pattern = opts.shortcuts && opts.shortcuts[c]) {
                        if (1 < pattern.length) for (var inserts = [], i = 0; i < pattern.length; i++) {
                            inserts.push({
                                pos: pos + i,
                                c: pattern[i],
                                strict: !1
                            });
                        }return {
                            insert: inserts
                        };
                    }
                    var radixPos = $.inArray(opts.radixPoint, buffer),
                        initPos = pos;
                    if (pos = hanndleRadixDance(pos, c, radixPos, maskset, opts), "-" === c || c === opts.negationSymbol.front) {
                        if (!0 !== opts.allowMinus) return !1;
                        var isNegative = !1,
                            front = findValid("+", maskset),
                            back = findValid("-", maskset);
                        return -1 !== front && (isNegative = [front, back]), !1 !== isNegative ? {
                            remove: isNegative,
                            caret: initPos
                        } : {
                            insert: [{
                                pos: findValidator("+", maskset),
                                c: opts.negationSymbol.front,
                                fromIsValid: !0
                            }, {
                                pos: findValidator("-", maskset),
                                c: opts.negationSymbol.back,
                                fromIsValid: void 0
                            }],
                            caret: initPos + opts.negationSymbol.back.length
                        };
                    }
                    if (strict) return !0;
                    if (-1 !== radixPos && !0 === opts._radixDance && !1 === isSelection && c === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && radixPos !== pos) return {
                        caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos
                    };
                    if (isSelection && !1 === opts.__financeInput) {
                        if (opts.digitsOptional) return {
                            rewritePosition: caretPos.end
                        };
                        if (!opts.digitsOptional) {
                            if (caretPos.begin > radixPos && caretPos.end <= radixPos) return c === opts.radixPoint ? {
                                insert: {
                                    pos: radixPos + 1,
                                    c: "0",
                                    fromIsValid: !0
                                },
                                rewritePosition: radixPos
                            } : {
                                rewritePosition: radixPos + 1
                            };
                            if (caretPos.begin < radixPos) return {
                                rewritePosition: caretPos.begin - 1
                            };
                        }
                    }
                    return {
                        rewritePosition: pos
                    };
                },
                postValidation: function postValidation(buffer, pos, currentResult, opts, maskset, strict) {
                    if (strict) return !0;
                    if (null !== opts.min || null !== opts.max) {
                        var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {
                            unmaskAsNumber: !0
                        }));
                        if (null !== opts.min && unmasked < opts.min && (unmasked.toString().length >= opts.min.toString().length || unmasked < 0)) return {
                            refreshFromBuffer: !0,
                            buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                        };
                        if (null !== opts.max && unmasked > opts.max) return {
                            refreshFromBuffer: !0,
                            buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                        };
                    }
                    return currentResult;
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;
                    var processValue = maskedValue.replace(opts.prefix, "");
                    return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "" !== opts.placeholder.charAt(0) && (processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0")), opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".")), processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-"), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), Number(processValue)) : processValue;
                },
                isComplete: function isComplete(buffer, opts) {
                    var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
                    return maskedValue = maskedValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-"), maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), maskedValue = maskedValue.replace(opts.prefix, ""), maskedValue = maskedValue.replace(opts.suffix, ""), maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator) + "([0-9]{3})", "g"), "$1"), "," === opts.radixPoint && (maskedValue = maskedValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".")), isFinite(maskedValue);
                },
                onBeforeMask: function onBeforeMask(initialValue, opts) {
                    var radixPoint = opts.radixPoint || ",";
                    "number" != typeof initialValue && "number" !== opts.inputType || "" === radixPoint || (initialValue = initialValue.toString().replace(".", radixPoint));
                    var valueParts = initialValue.split(radixPoint),
                        integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
                        decimalPart = 1 < valueParts.length ? valueParts[1].replace(/[^0-9]/g, "") : "",
                        forceDigits = 1 < valueParts.length;
                    initialValue = integerPart + ("" !== decimalPart ? radixPoint + decimalPart : decimalPart);
                    var digits = 0;
                    if ("" !== radixPoint && (digits = decimalPart.length, "" !== decimalPart)) {
                        var digitsFactor = Math.pow(10, digits || 1);
                        isFinite(opts.digits) && (digits = parseInt(opts.digits), digitsFactor = Math.pow(10, digits)), initialValue = initialValue.replace(Inputmask.escapeRegex(radixPoint), "."), isFinite(initialValue) && (initialValue = (opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor).toFixed(digits)), initialValue = initialValue.toString().replace(".", radixPoint);
                    }
                    if (0 === opts.digits && -1 !== initialValue.indexOf(Inputmask.escapeRegex(radixPoint)) && (initialValue = initialValue.substring(0, initialValue.indexOf(Inputmask.escapeRegex(radixPoint)))), null !== opts.min || null !== opts.max) {
                        var numberValue = initialValue.toString().replace(radixPoint, ".");
                        null !== opts.min && numberValue < opts.min ? initialValue = opts.min.toString().replace(".", radixPoint) : null !== opts.max && numberValue > opts.max && (initialValue = opts.max.toString().replace(".", radixPoint));
                    }
                    return alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("");
                },
                onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
                    function stripBuffer(buffer, stripRadix) {
                        if (!1 !== opts.__financeInput || stripRadix) {
                            var position = $.inArray(opts.radixPoint, buffer);
                            -1 !== position && buffer.splice(position, 1);
                        }
                        if ("" !== opts.groupSeparator) for (; -1 !== (position = buffer.indexOf(opts.groupSeparator));) {
                            buffer.splice(position, 1);
                        }return buffer;
                    }
                    var result,
                        leadingzeroes = checkForLeadingZeroes(buffer, opts);
                    if (leadingzeroes) {
                        var buf = buffer.slice().reverse(),
                            caretNdx = buf.join("").indexOf(leadingzeroes[0]);
                        buf.splice(caretNdx, leadingzeroes[0].length);
                        var newCaretPos = buf.length - caretNdx;
                        stripBuffer(buf), result = {
                            refreshFromBuffer: !0,
                            buffer: buf.reverse(),
                            caret: caretPos < newCaretPos ? caretPos : newCaretPos
                        };
                    }
                    if (e) switch (e.type) {
                        case "blur":
                        case "checkval":
                            if (null !== opts.min) {
                                var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {
                                    unmaskAsNumber: !0
                                }));
                                if (null !== opts.min && unmasked < opts.min) return {
                                    refreshFromBuffer: !0,
                                    buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                                };
                            }
                            if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
                                var nmbrMtchs = new RegExp("(^" + ("" != opts.negationSymbol.front ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + ("" != opts.negationSymbol.back ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), !0).reverse().join("")),
                                    number = nmbrMtchs ? nmbrMtchs[2] : "";
                                0 == number && (result = {
                                    refreshFromBuffer: !0,
                                    buffer: [0]
                                });
                            } else "" !== opts.radixPoint && buffer[0] === opts.radixPoint && (result && result.buffer ? result.buffer.shift() : (buffer.shift(), result = {
                                refreshFromBuffer: !0,
                                buffer: stripBuffer(buffer)
                            }));
                            if (opts.enforceDigitsOnBlur) {
                                result = result || {};
                                var bffr = result && result.buffer || buffer.slice().reverse();
                                result.refreshFromBuffer = !0, result.buffer = alignDigits(bffr, opts.digits, opts, !0).reverse();
                            }
                    }
                    return result;
                },
                onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                    var $input = $(this),
                        bffr;
                    if (e.ctrlKey) switch (e.keyCode) {
                        case keyCode.UP:
                            return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), $input.trigger("setvalue"), !1;

                        case keyCode.DOWN:
                            return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), $input.trigger("setvalue"), !1;
                    }
                    if (!e.shiftKey && (e.keyCode === keyCode.DELETE || e.keyCode === keyCode.BACKSPACE || e.keyCode === keyCode.BACKSPACE_SAFARI)) {
                        if (buffer[e.keyCode === keyCode.DELETE ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) return bffr = buffer.slice().reverse(), "" !== opts.negationSymbol.front && bffr.shift(), "" !== opts.negationSymbol.back && bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin]), !1;
                        if (!0 === opts._radixDance) {
                            var radixPos = $.inArray(opts.radixPoint, buffer);
                            if (opts.digitsOptional) {
                                if (0 === radixPos) return bffr = buffer.slice().reverse(), bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin >= bffr.length ? bffr.length : caretPos.begin]), !1;
                            } else if (-1 !== radixPos && (caretPos.begin < radixPos || caretPos.end < radixPos || e.keyCode === keyCode.DELETE && caretPos.begin === radixPos)) return caretPos.begin !== caretPos.end || e.keyCode !== keyCode.BACKSPACE && e.keyCode !== keyCode.BACKSPACE_SAFARI || caretPos.begin++, bffr = buffer.slice().reverse(), bffr.splice(bffr.length - caretPos.begin, caretPos.begin - caretPos.end + 1), bffr = alignDigits(bffr, opts.digits, opts).join(""), $input.trigger("setvalue", [bffr, caretPos.begin >= bffr.length ? radixPos + 1 : caretPos.begin]), !1;
                        }
                    }
                }
            },
            currency: {
                prefix: "",
                groupSeparator: ",",
                alias: "numeric",
                digits: 2,
                digitsOptional: !1
            },
            decimal: {
                alias: "numeric"
            },
            integer: {
                alias: "numeric",
                digits: 0
            },
            percentage: {
                alias: "numeric",
                min: 0,
                max: 100,
                suffix: " %",
                digits: 0,
                allowMinus: !1
            },
            indianns: {
                alias: "numeric",
                _mask: function _mask(opts) {
                    return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}";
                },
                groupSeparator: ",",
                radixPoint: ".",
                placeholder: "0",
                digits: 2,
                digitsOptional: !1
            }
        }), module.exports = Inputmask;
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
                return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
            }, _typeof(obj);
        }
        var $ = __webpack_require__(3),
            Inputmask = __webpack_require__(1);
        void 0 === $.fn.inputmask && ($.fn.inputmask = function (fn, options) {
            var nptmask,
                input = this[0];
            if (void 0 === options && (options = {}), "string" == typeof fn) switch (fn) {
                case "unmaskedvalue":
                    return input && input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();

                case "remove":
                    return this.each(function () {
                        this.inputmask && this.inputmask.remove();
                    });

                case "getemptymask":
                    return input && input.inputmask ? input.inputmask.getemptymask() : "";

                case "hasMaskedValue":
                    return !(!input || !input.inputmask) && input.inputmask.hasMaskedValue();

                case "isComplete":
                    return !input || !input.inputmask || input.inputmask.isComplete();

                case "getmetadata":
                    return input && input.inputmask ? input.inputmask.getmetadata() : void 0;

                case "setvalue":
                    Inputmask.setValue(input, options);
                    break;

                case "option":
                    if ("string" != typeof options) return this.each(function () {
                        if (void 0 !== this.inputmask) return this.inputmask.option(options);
                    });
                    if (input && void 0 !== input.inputmask) return input.inputmask.option(options);
                    break;

                default:
                    return options.alias = fn, nptmask = new Inputmask(options), this.each(function () {
                        nptmask.mask(this);
                    });
            } else {
                if (Array.isArray(fn)) return options.alias = fn, nptmask = new Inputmask(options), this.each(function () {
                    nptmask.mask(this);
                });
                if ("object" == _typeof(fn)) return nptmask = new Inputmask(fn), void 0 === fn.mask && void 0 === fn.alias ? this.each(function () {
                    if (void 0 !== this.inputmask) return this.inputmask.option(fn);
                    nptmask.mask(this);
                }) : this.each(function () {
                    nptmask.mask(this);
                });
                if (void 0 === fn) return this.each(function () {
                    nptmask = new Inputmask(options), nptmask.mask(this);
                });
            }
        });
    }, function (module, exports, __webpack_require__) {
        "use strict";

        var im = __webpack_require__(6),
            jQuery = __webpack_require__(3);
        im.dependencyLib === jQuery && __webpack_require__(11), module.exports = im;
    }], installedModules = {}, __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function (exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function (exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function (value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == (typeof value === "undefined" ? "undefined" : _typeof2(value)) && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) {
            __webpack_require__.d(ns, key, function (key) {
                return value[key];
            }.bind(null, key));
        }return ns;
    }, __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module.default;
        } : function getModuleExports() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 12);
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = !0, module.exports;
    }
    var modules, installedModules;
});
'use strict';

var apiUrl = 'http://msk2-api.edinie.ru';
var types = ['hol', 'sma', 'pmm', 'sush', 'var', 'duh', 'svch', 'kof'];
var brandId = 36;
var typeId = {
  sush: 12,
  sma: 11,
  hol: 10,
  pmm: 13,
  duh: 14,
  kof: 16,
  svch: 18,
  var: 20
};
$(document).ready(function () {
  var activePhone = '';
  var activeOrder = '';
  // добавленние типов техники
  types.map(function (item) {
    $('[data-type="' + item + '"]').parents('.technics').removeClass('d-none');
  });
  // маска для телефона
  $('[type="tel"]').inputmask("8999 999 9999");
  // изменение контента в зависимости от выбраного типа
  $('.technics input').on('change', function (e) {
    $('.technics input').prop("disabled", true);
    $('.section-toggle.open').removeClass('open');
    var newTitle = $(this).parents('.technics').find('span').text().toLowerCase();
    $('#active-name').text(getTitle(newTitle));
    setTimeout(function () {
      $('.' + e.target.id).addClass('open');
      $('.technics input').prop("disabled", false);
    }, 900);
  });
  // Вернуть заголовок
  function getTitle(title) {
    switch (title) {
      case 'холодильники':
        return 'холодильник';
      case 'стиральные машины':
        return 'стиральную машину';
      case 'посудомойки':
        return 'посудомойку';
      case 'сушилки':
        return 'сушилку';
      case 'варочные поверхности':
        return 'варочную поверхность';
      case 'духовки':
        return 'духовку';
      case 'свч печи':
        return 'свч печь';
      case 'кофемашины':
        return 'кофемашину';
      default:
        return '';
    }
  }

  // подкалюченние слайдера
  $('.owl-carousel').owlCarousel({
    items: 1,
    autoplay: true,
    loop: true,
    margin: 15
  });
  // Открытие модального окна с верхней формы
  $('#top-form').click(function () {
    $('#phone-top').removeClass('error');
    var tel = $('#phone-top').val() || false;
    if (!tel) {
      $('#phone-top').addClass('error');
      return false;
    }
    activePhone = tel;
    createOrder(tel);
    $('#thank-callback-modal').addClass('open');
    $('.modals-wrap').addClass('open');
  });
  // Открытие модального окна с нижней формы
  $('#bottom-form').click(function () {
    $('#phone-bottom').removeClass('error');
    var tel = $('#phone-bottom').val() || false;
    if (!tel) {
      $('#phone-bottom').addClass('error');
      return false;
    }
    activePhone = tel;
    createOrder(tel);
    $('#thank-callback-modal').addClass('open');
    $('.modals-wrap').addClass('open');
  });
  // клик на оверлей или на закрыть на попапе
  $('.overlay, #close').click(function () {
    $('.modals-wrap, .modal-inner').removeClass('open');
  });
  // обработчик клика на кнопку модального окна thank-callback-modal
  $('#thank-callback-modal button').click(function () {
    var valid = true;
    $('#thank-callback-modal input').removeClass('error');
    var location = $('#thank-callback-modal input[name="location"]').val() || false;
    if (!location) {
      valid = false;
      $('#thank-callback-modal input[name="location"]').addClass('error');
    }
    var options = $('#thank-callback-modal input[name="options"]').val() || false;
    if (!options) {
      valid = false;
      $('#thank-callback-modal input[name="options"]').addClass('error');
    }
    var user = $('#thank-callback-modal input[name="user"]').val() || false;
    if (!user) {
      valid = false;
      $('#thank-callback-modal input[name="user"]').addClass('error');
    }
    if (!valid) {
      return false;
    }
    updateOrder(user, options, location);
    $('#thank-callback-modal').removeClass('open');
    $('#thank').addClass('open');
  });
  // обработчик клика на кнопку модального окна fix-modal
  $('#fix-modal button').click(function () {
    var valid = true;
    $('#fix-modal input').removeClass('error');
    var phone = $('#fix-modal input[name="phone"]').val() || false;
    if (!phone) {
      valid = false;
      $('#fix-modal input[name="phone"]').addClass('error');
    }
    var location = $('#fix-modal input[name="location"]').val() || false;
    if (!location) {
      valid = false;
      $('#fix-modal input[name="location"]').addClass('error');
    }
    var option = $('#fix-modal input[name="option"]').val() || false;
    if (!option) {
      valid = false;
      $('#fix-modal input[name="option"]').addClass('error');
    }
    var user = $('#fix-modal input[name="user"]').val() || false;
    if (!user) {
      valid = false;
      $('#fix-modal input[name="user"]').addClass('error');
    }
    if (!valid) {
      return false;
    }
    createOrder(phone, user, option, location);
    $('#fix-modal').removeClass('open');
    $('#thank').addClass('open');
  });
  // Обработка форм в изменяющемся контенте
  $('.main-form').on('submit', function (e) {
    e.preventDefault();
    var valid = true;
    $(this).find('input').removeClass('error');
    var phone = $(this).find('[name="tel"]').val();
    if (!phone) {
      valid = false;
      $(this).find('[name="tel"]').addClass('error');
    }
    var location = $(this).find('[name="geo"]').val();
    if (!location) {
      valid = false;
      $(this).find('[name="geo"]').addClass('error');
    }
    var option = $(this).find('[name="problem"]').val();
    if (!option) {
      valid = false;
      $(this).find('[name="problem"]').addClass('error');
    }
    if (!valid) {
      return false;
    }
    // api call
    createOrder(phone, '', option, location);
    $('.modals-wrap').addClass('open');
    $('#thank').addClass('open');
  });

  // нажатие на кнопку ордер
  $('button.order').click(function (e) {
    var problem = $(this).parents('.breakdown-wrap').find('h5').text();
    $('.modals-wrap').addClass('open');
    $('#fix-modal').addClass('open');
    $('#fix-modal [name="option"]').val(problem);
  });
  // кнопка комерческое предложение
  $('#commercial-proposal').click(function () {
    $('.modals-wrap').addClass('open');
    $('#fix-modal').addClass('open');
    $('#fix-modal [name="option"]').val('запрос юрлица');
  });
  // узнать о скидке
  $('#discount').click(function () {
    $('.modals-wrap').addClass('open');
    $('#fix-modal').addClass('open');
    $('#fix-modal [name="option"]').val('узнать о скидке');
  });
  // Создание заявки
  function createOrder(phone, name, description, district) {
    var data = { phone: phone, description: '' };
    var type_id = $('[name="type"]:checked').data();
    if (name) {
      data.name = name;
    }
    if (description) {
      data.description = '' + description;
    }
    if (district) {
      data.district = district;
    }
    if (type_id) {
      data.type_id = typeId[type_id.type];
    }
    data.brand_id = brandId;
    axios.post(apiUrl + '/site-form-api/order/create', data).then(function (data) {
      activeOrder = data.data.code;
    });
  }
  // Обновление заявки
  function updateOrder(name, description, district) {
    var type_id = void 0;
    if ($('[name="type"]:checked').data()) {
      type_id = $('[name="type"]:checked').data().type;
    }
    type_id = typeId[type_id];
    axios.post(apiUrl + '/site-form-api/order/update?code=' + activeOrder, {
      description: '' + description,
      name: name,
      district: district,
      type_id: type_id,
      brand_id: brandId
    });
  }
  // scroll to block 
  $('.scroll').on('click', function (event) {
    var target = $($(this).attr('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 85
      }, 500);
    }
  });
  // обработка якоря в ссылке
  var url = window.location.hash;
  url = url.slice(1, url.length);
  var anchor = url;
  url = url.split('-');
  if (url.length && $('[data-type="' + url[0] + '"]').length) {
    $('.section-toggle').removeClass('open');
    $('[data-type="' + url[0] + '"]').prop("checked", true);
    var activeInputId = $('[data-type="' + url[0] + '"]').attr('id');
    $('.' + activeInputId).addClass('open');
    var title = $('[data-type="' + url[0] + '"]').parents('.technics').find('span').text().toLowerCase();
    $('#active-name').text(getTitle(title));
    setTimeout(function () {
      $('html, body').animate({
        scrollTop: $('[name="' + anchor + '"]').offset().top - 150
      }, 0);
    }, 900);
  } else {
    if (anchor.length) {
      setTimeout(function () {
        $('html, body').animate({
          scrollTop: $('[name="' + anchor + '"]').offset().top - 150
        }, 0);
      }, 900);
    }
    // $(`[data-type="${types[0]}"]`).prop( "checked", true );
    // let title = $(`[data-type="${types[0]}"]`).parents('.technics').find('span').text().toLowerCase();
    var _activeInputId = $('[data-type="' + types[0] + '"]').attr('id');
    $('.' + _activeInputId).addClass('open');
    $('#active-name').text('технику');
  }
});
'use strict';

$(document).ready(function () {
  $('#menu-toggle, #menu-toggle-bottom').click(function () {
    $('#mobile-navigation').addClass('open');
  });
  $('#close-menu').click(function () {
    $('#mobile-navigation').removeClass('open');
  });
  $('#mobile-navigation a').click(function () {
    $('#mobile-navigation').removeClass('open');
  });
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* jquery.nicescroll
-- version 3.7.6
-- copyright 2017-07-19 InuYaksa*2017
-- licensed under the MIT
--
-- https://nicescroll.areaaperta.com/
-- https://github.com/inuyaksa/jquery.nicescroll
--
*/

/* jshint expr: true */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    // Node/CommonJS.
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function (jQuery) {

  "use strict";

  // globals

  var domfocus = false,
      mousefocus = false,
      tabindexcounter = 0,
      ascrailcounter = 2000,
      globalmaxzindex = 0;

  var $ = jQuery,
      // sandbox
  _doc = document,
      _win = window,
      $window = $(_win);

  var delegatevents = [];

  // http://stackoverflow.com/questions/2161159/get-script-path
  function getScriptPath() {
    var scripts = _doc.currentScript || function () {
      var s = _doc.getElementsByTagName('script');return s.length ? s[s.length - 1] : false;
    }();
    var path = scripts ? scripts.src.split('?')[0] : '';
    return path.split('/').length > 0 ? path.split('/').slice(0, -1).join('/') + '/' : '';
  }

  // based on code by Paul Irish https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/  
  var setAnimationFrame = _win.requestAnimationFrame || _win.webkitRequestAnimationFrame || _win.mozRequestAnimationFrame || false;
  var clearAnimationFrame = _win.cancelAnimationFrame || _win.webkitCancelAnimationFrame || _win.mozCancelAnimationFrame || false;

  if (!setAnimationFrame) {
    var anilasttime = 0;
    setAnimationFrame = function setAnimationFrame(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - anilasttime));
      var id = _win.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      anilasttime = currTime + timeToCall;
      return id;
    };
    clearAnimationFrame = function clearAnimationFrame(id) {
      _win.clearTimeout(id);
    };
  } else {
    if (!_win.cancelAnimationFrame) clearAnimationFrame = function clearAnimationFrame(id) {};
  }

  var ClsMutationObserver = _win.MutationObserver || _win.WebKitMutationObserver || false;

  var now = Date.now || function () {
    return new Date().getTime();
  };

  var _globaloptions = {
    zindex: "auto",
    cursoropacitymin: 0,
    cursoropacitymax: 1,
    cursorcolor: "#424242",
    cursorwidth: "6px",
    cursorborder: "1px solid #fff",
    cursorborderradius: "5px",
    scrollspeed: 40,
    mousescrollstep: 9 * 3,
    touchbehavior: false, // deprecated
    emulatetouch: false, // replacing touchbehavior
    hwacceleration: true,
    usetransition: true,
    boxzoom: false,
    dblclickzoom: true,
    gesturezoom: true,
    grabcursorenabled: true,
    autohidemode: true,
    background: "",
    iframeautoresize: true,
    cursorminheight: 32,
    preservenativescrolling: true,
    railoffset: false,
    railhoffset: false,
    bouncescroll: true,
    spacebarenabled: true,
    railpadding: {
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    },
    disableoutline: true,
    horizrailenabled: true,
    railalign: "right",
    railvalign: "bottom",
    enabletranslate3d: true,
    enablemousewheel: true,
    enablekeyboard: true,
    smoothscroll: true,
    sensitiverail: true,
    enablemouselockapi: true,
    //      cursormaxheight:false,
    cursorfixedheight: false,
    directionlockdeadzone: 6,
    hidecursordelay: 400,
    nativeparentscrolling: true,
    enablescrollonselection: true,
    overflowx: true,
    overflowy: true,
    cursordragspeed: 0.3,
    rtlmode: "auto",
    cursordragontouch: false,
    oneaxismousemode: "auto",
    scriptpath: getScriptPath(),
    preventmultitouchscrolling: true,
    disablemutationobserver: false,
    enableobserver: true,
    scrollbarid: false,
    scrollCLass: false
  };

  var browserdetected = false;

  var getBrowserDetection = function getBrowserDetection() {

    if (browserdetected) return browserdetected;

    var _el = _doc.createElement('DIV'),
        _style = _el.style,
        _agent = navigator.userAgent,
        _platform = navigator.platform,
        d = {};

    d.haspointerlock = "pointerLockElement" in _doc || "webkitPointerLockElement" in _doc || "mozPointerLockElement" in _doc;

    d.isopera = "opera" in _win; // 12-
    d.isopera12 = d.isopera && "getUserMedia" in navigator;
    d.isoperamini = Object.prototype.toString.call(_win.operamini) === "[object OperaMini]";

    d.isie = "all" in _doc && "attachEvent" in _el && !d.isopera; //IE10-
    d.isieold = d.isie && !("msInterpolationMode" in _style); // IE6 and older
    d.isie7 = d.isie && !d.isieold && (!("documentMode" in _doc) || _doc.documentMode === 7);
    d.isie8 = d.isie && "documentMode" in _doc && _doc.documentMode === 8;
    d.isie9 = d.isie && "performance" in _win && _doc.documentMode === 9;
    d.isie10 = d.isie && "performance" in _win && _doc.documentMode === 10;
    d.isie11 = "msRequestFullscreen" in _el && _doc.documentMode >= 11; // IE11+

    d.ismsedge = "msCredentials" in _win; // MS Edge 14+

    d.ismozilla = "MozAppearance" in _style;

    d.iswebkit = !d.ismsedge && "WebkitAppearance" in _style;

    d.ischrome = d.iswebkit && "chrome" in _win;
    d.ischrome38 = d.ischrome && "touchAction" in _style; // behavior changed in touch emulation    
    d.ischrome22 = !d.ischrome38 && d.ischrome && d.haspointerlock;
    d.ischrome26 = !d.ischrome38 && d.ischrome && "transition" in _style; // issue with transform detection (maintain prefix)

    d.cantouch = "ontouchstart" in _doc.documentElement || "ontouchstart" in _win; // with detection for Chrome Touch Emulation    
    d.hasw3ctouch = (_win.PointerEvent || false) && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0); //IE11 pointer events, following W3C Pointer Events spec
    d.hasmstouch = !d.hasw3ctouch && (_win.MSPointerEvent || false); // IE10 pointer events

    d.ismac = /^mac$/i.test(_platform);

    d.isios = d.cantouch && /iphone|ipad|ipod/i.test(_platform);
    d.isios4 = d.isios && !("seal" in Object);
    d.isios7 = d.isios && "webkitHidden" in _doc; //iOS 7+
    d.isios8 = d.isios && "hidden" in _doc; //iOS 8+
    d.isios10 = d.isios && _win.Proxy; //iOS 10+

    d.isandroid = /android/i.test(_agent);

    d.haseventlistener = "addEventListener" in _el;

    d.trstyle = false;
    d.hastransform = false;
    d.hastranslate3d = false;
    d.transitionstyle = false;
    d.hastransition = false;
    d.transitionend = false;

    d.trstyle = "transform";
    d.hastransform = "transform" in _style || function () {
      var check = ['msTransform', 'webkitTransform', 'MozTransform', 'OTransform'];
      for (var a = 0, c = check.length; a < c; a++) {
        if (_style[check[a]] !== undefined) {
          d.trstyle = check[a];
          break;
        }
      }
      d.hastransform = !!d.trstyle;
    }();

    if (d.hastransform) {
      _style[d.trstyle] = "translate3d(1px,2px,3px)";
      d.hastranslate3d = /translate3d/.test(_style[d.trstyle]);
    }

    d.transitionstyle = "transition";
    d.prefixstyle = '';
    d.transitionend = "transitionend";

    d.hastransition = "transition" in _style || function () {

      d.transitionend = false;
      var check = ['webkitTransition', 'msTransition', 'MozTransition', 'OTransition', 'OTransition', 'KhtmlTransition'];
      var prefix = ['-webkit-', '-ms-', '-moz-', '-o-', '-o', '-khtml-'];
      var evs = ['webkitTransitionEnd', 'msTransitionEnd', 'transitionend', 'otransitionend', 'oTransitionEnd', 'KhtmlTransitionEnd'];
      for (var a = 0, c = check.length; a < c; a++) {
        if (check[a] in _style) {
          d.transitionstyle = check[a];
          d.prefixstyle = prefix[a];
          d.transitionend = evs[a];
          break;
        }
      }
      if (d.ischrome26) d.prefixstyle = prefix[1]; // always use prefix

      d.hastransition = d.transitionstyle;
    }();

    function detectCursorGrab() {
      var lst = ['grab', '-webkit-grab', '-moz-grab'];
      if (d.ischrome && !d.ischrome38 || d.isie) lst = []; // force setting for IE returns false positive and chrome cursor bug
      for (var a = 0, l = lst.length; a < l; a++) {
        var p = lst[a];
        _style.cursor = p;
        if (_style.cursor == p) return p;
      }
      return 'url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize'; // thanks to https://cdnjs.com/ for the openhand cursor!
    }
    d.cursorgrabvalue = detectCursorGrab();

    d.hasmousecapture = "setCapture" in _el;

    d.hasMutationObserver = ClsMutationObserver !== false;

    _el = null; //memory released

    browserdetected = d;

    return d;
  };

  var NiceScrollClass = function NiceScrollClass(myopt, me) {

    var self = this;

    this.version = '3.7.6';
    this.name = 'nicescroll';

    this.me = me;

    var $body = $("body");

    var opt = this.opt = {
      doc: $body,
      win: false
    };

    $.extend(opt, _globaloptions); // clone opts

    // Options for internal use
    opt.snapbackspeed = 80;

    if (myopt || false) {
      for (var a in opt) {
        if (myopt[a] !== undefined) opt[a] = myopt[a];
      }
    }

    if (opt.disablemutationobserver) ClsMutationObserver = false;

    this.doc = opt.doc;
    this.iddoc = this.doc && this.doc[0] ? this.doc[0].id || '' : '';
    this.ispage = /^BODY|HTML/.test(opt.win ? opt.win[0].nodeName : this.doc[0].nodeName);
    this.haswrapper = opt.win !== false;
    this.win = opt.win || (this.ispage ? $window : this.doc);
    this.docscroll = this.ispage && !this.haswrapper ? $window : this.win;
    this.body = $body;
    this.viewport = false;

    this.isfixed = false;

    this.iframe = false;
    this.isiframe = this.doc[0].nodeName == 'IFRAME' && this.win[0].nodeName == 'IFRAME';

    this.istextarea = this.win[0].nodeName == 'TEXTAREA';

    this.forcescreen = false; //force to use screen position on events

    this.canshowonmouseevent = opt.autohidemode != "scroll";

    // Events jump table    
    this.onmousedown = false;
    this.onmouseup = false;
    this.onmousemove = false;
    this.onmousewheel = false;
    this.onkeypress = false;
    this.ongesturezoom = false;
    this.onclick = false;

    // Nicescroll custom events
    this.onscrollstart = false;
    this.onscrollend = false;
    this.onscrollcancel = false;

    this.onzoomin = false;
    this.onzoomout = false;

    // Let's start!  
    this.view = false;
    this.page = false;

    this.scroll = {
      x: 0,
      y: 0
    };
    this.scrollratio = {
      x: 0,
      y: 0
    };
    this.cursorheight = 20;
    this.scrollvaluemax = 0;

    // http://dev.w3.org/csswg/css-writing-modes-3/#logical-to-physical
    // http://dev.w3.org/csswg/css-writing-modes-3/#svg-writing-mode
    if (opt.rtlmode == "auto") {
      var target = this.win[0] == _win ? this.body : this.win;
      var writingMode = target.css("writing-mode") || target.css("-webkit-writing-mode") || target.css("-ms-writing-mode") || target.css("-moz-writing-mode");

      if (writingMode == "horizontal-tb" || writingMode == "lr-tb" || writingMode === "") {
        this.isrtlmode = target.css("direction") == "rtl";
        this.isvertical = false;
      } else {
        this.isrtlmode = writingMode == "vertical-rl" || writingMode == "tb" || writingMode == "tb-rl" || writingMode == "rl-tb";
        this.isvertical = writingMode == "vertical-rl" || writingMode == "tb" || writingMode == "tb-rl";
      }
    } else {
      this.isrtlmode = opt.rtlmode === true;
      this.isvertical = false;
    }
    //    this.checkrtlmode = false;

    this.scrollrunning = false;

    this.scrollmom = false;

    this.observer = false; // observer div changes
    this.observerremover = false; // observer on parent for remove detection
    this.observerbody = false; // observer on body for position change

    if (opt.scrollbarid !== false) {
      this.id = opt.scrollbarid;
    } else {
      do {
        this.id = "ascrail" + ascrailcounter++;
      } while (_doc.getElementById(this.id));
    }

    this.rail = false;
    this.cursor = false;
    this.cursorfreezed = false;
    this.selectiondrag = false;

    this.zoom = false;
    this.zoomactive = false;

    this.hasfocus = false;
    this.hasmousefocus = false;

    //this.visibility = true;
    this.railslocked = false; // locked by resize
    this.locked = false; // prevent lost of locked status sets by user
    this.hidden = false; // rails always hidden
    this.cursoractive = true; // user can interact with cursors

    this.wheelprevented = false; //prevent mousewheel event

    this.overflowx = opt.overflowx;
    this.overflowy = opt.overflowy;

    this.nativescrollingarea = false;
    this.checkarea = 0;

    this.events = []; // event list for unbind

    this.saved = {}; // style saved

    this.delaylist = {};
    this.synclist = {};

    this.lastdeltax = 0;
    this.lastdeltay = 0;

    this.detected = getBrowserDetection();

    var cap = $.extend({}, this.detected);

    this.canhwscroll = cap.hastransform && opt.hwacceleration;
    this.ishwscroll = this.canhwscroll && self.haswrapper;

    if (!this.isrtlmode) {
      this.hasreversehr = false;
    } else if (this.isvertical) {
      // RTL mode with reverse horizontal axis
      this.hasreversehr = !(cap.iswebkit || cap.isie || cap.isie11);
    } else {
      this.hasreversehr = !(cap.iswebkit || cap.isie && !cap.isie10 && !cap.isie11);
    }

    this.istouchcapable = false; // desktop devices with touch screen support

    //## Check WebKit-based desktop with touch support
    //## + Firefox 18 nightly build (desktop) false positive (or desktop with touch support)

    if (!cap.cantouch && (cap.hasw3ctouch || cap.hasmstouch)) {
      // desktop device with multiple input
      this.istouchcapable = true;
    } else if (cap.cantouch && !cap.isios && !cap.isandroid && (cap.iswebkit || cap.ismozilla)) {
      this.istouchcapable = true;
    }

    //## disable MouseLock API on user request
    if (!opt.enablemouselockapi) {
      cap.hasmousecapture = false;
      cap.haspointerlock = false;
    }

    this.debounced = function (name, fn, tm) {
      if (!self) return;
      var dd = self.delaylist[name] || false;
      if (!dd) {
        self.delaylist[name] = {
          h: setAnimationFrame(function () {
            self.delaylist[name].fn.call(self);
            self.delaylist[name] = false;
          }, tm)
        };
        fn.call(self);
      }
      self.delaylist[name].fn = fn;
    };

    this.synched = function (name, fn) {
      if (self.synclist[name]) self.synclist[name] = fn;else {
        self.synclist[name] = fn;
        setAnimationFrame(function () {
          if (!self) return;
          self.synclist[name] && self.synclist[name].call(self);
          self.synclist[name] = null;
        });
      }
    };

    this.unsynched = function (name) {
      if (self.synclist[name]) self.synclist[name] = false;
    };

    this.css = function (el, pars) {
      // save & set
      for (var n in pars) {
        self.saved.css.push([el, n, el.css(n)]);
        el.css(n, pars[n]);
      }
    };

    this.scrollTop = function (val) {
      return val === undefined ? self.getScrollTop() : self.setScrollTop(val);
    };

    this.scrollLeft = function (val) {
      return val === undefined ? self.getScrollLeft() : self.setScrollLeft(val);
    };

    // derived by by Dan Pupius www.pupius.net
    var BezierClass = function BezierClass(st, ed, spd, p1, p2, p3, p4) {

      this.st = st;
      this.ed = ed;
      this.spd = spd;

      this.p1 = p1 || 0;
      this.p2 = p2 || 1;
      this.p3 = p3 || 0;
      this.p4 = p4 || 1;

      this.ts = now();
      this.df = ed - st;
    };
    BezierClass.prototype = {
      B2: function B2(t) {
        return 3 * (1 - t) * (1 - t) * t;
      },
      B3: function B3(t) {
        return 3 * (1 - t) * t * t;
      },
      B4: function B4(t) {
        return t * t * t;
      },
      getPos: function getPos() {
        return (now() - this.ts) / this.spd;
      },
      getNow: function getNow() {
        var pc = (now() - this.ts) / this.spd;
        var bz = this.B2(pc) + this.B3(pc) + this.B4(pc);
        return pc >= 1 ? this.ed : this.st + this.df * bz | 0;
      },
      update: function update(ed, spd) {
        this.st = this.getNow();
        this.ed = ed;
        this.spd = spd;
        this.ts = now();
        this.df = this.ed - this.st;
        return this;
      }
    };

    //derived from http://stackoverflow.com/questions/11236090/
    function getMatrixValues() {
      var tr = self.doc.css(cap.trstyle);
      if (tr && tr.substr(0, 6) == "matrix") {
        return tr.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, '').split(/, +/);
      }
      return false;
    }

    if (this.ishwscroll) {
      // hw accelerated scroll

      this.doc.translate = {
        x: 0,
        y: 0,
        tx: "0px",
        ty: "0px"
      };

      //this one can help to enable hw accel on ios6 http://indiegamr.com/ios6-html-hardware-acceleration-changes-and-how-to-fix-them/
      if (cap.hastranslate3d && cap.isios) this.doc.css("-webkit-backface-visibility", "hidden"); // prevent flickering http://stackoverflow.com/questions/3461441/      

      this.getScrollTop = function (last) {
        if (!last) {
          var mtx = getMatrixValues();
          if (mtx) return mtx.length == 16 ? -mtx[13] : -mtx[5]; //matrix3d 16 on IE10
          if (self.timerscroll && self.timerscroll.bz) return self.timerscroll.bz.getNow();
        }
        return self.doc.translate.y;
      };

      this.getScrollLeft = function (last) {
        if (!last) {
          var mtx = getMatrixValues();
          if (mtx) return mtx.length == 16 ? -mtx[12] : -mtx[4]; //matrix3d 16 on IE10
          if (self.timerscroll && self.timerscroll.bh) return self.timerscroll.bh.getNow();
        }
        return self.doc.translate.x;
      };

      this.notifyScrollEvent = function (el) {
        var e = _doc.createEvent("UIEvents");
        e.initUIEvent("scroll", false, false, _win, 1);
        e.niceevent = true;
        el.dispatchEvent(e);
      };

      var cxscrollleft = this.isrtlmode ? 1 : -1;

      if (cap.hastranslate3d && opt.enabletranslate3d) {
        this.setScrollTop = function (val, silent) {
          self.doc.translate.y = val;
          self.doc.translate.ty = val * -1 + "px";
          self.doc.css(cap.trstyle, "translate3d(" + self.doc.translate.tx + "," + self.doc.translate.ty + ",0)");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
        this.setScrollLeft = function (val, silent) {
          self.doc.translate.x = val;
          self.doc.translate.tx = val * cxscrollleft + "px";
          self.doc.css(cap.trstyle, "translate3d(" + self.doc.translate.tx + "," + self.doc.translate.ty + ",0)");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
      } else {
        this.setScrollTop = function (val, silent) {
          self.doc.translate.y = val;
          self.doc.translate.ty = val * -1 + "px";
          self.doc.css(cap.trstyle, "translate(" + self.doc.translate.tx + "," + self.doc.translate.ty + ")");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
        this.setScrollLeft = function (val, silent) {
          self.doc.translate.x = val;
          self.doc.translate.tx = val * cxscrollleft + "px";
          self.doc.css(cap.trstyle, "translate(" + self.doc.translate.tx + "," + self.doc.translate.ty + ")");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
      }
    } else {
      // native scroll

      this.getScrollTop = function () {
        return self.docscroll.scrollTop();
      };
      this.setScrollTop = function (val) {
        self.docscroll.scrollTop(val);
      };

      this.getScrollLeft = function () {
        var val;
        if (!self.hasreversehr) {
          val = self.docscroll.scrollLeft();
        } else if (self.detected.ismozilla) {
          val = self.page.maxw - Math.abs(self.docscroll.scrollLeft());
        } else {
          val = self.page.maxw - self.docscroll.scrollLeft();
        }
        return val;
      };
      this.setScrollLeft = function (val) {
        return setTimeout(function () {
          if (!self) return;
          if (self.hasreversehr) {
            if (self.detected.ismozilla) {
              val = -(self.page.maxw - val);
            } else {
              val = self.page.maxw - val;
            }
          }
          return self.docscroll.scrollLeft(val);
        }, 1);
      };
    }

    this.getTarget = function (e) {
      if (!e) return false;
      if (e.target) return e.target;
      if (e.srcElement) return e.srcElement;
      return false;
    };

    this.hasParent = function (e, id) {
      if (!e) return false;
      var el = e.target || e.srcElement || e || false;
      while (el && el.id != id) {
        el = el.parentNode || false;
      }
      return el !== false;
    };

    function getZIndex() {
      var dom = self.win;
      if ("zIndex" in dom) return dom.zIndex(); // use jQuery UI method when available
      while (dom.length > 0) {
        if (dom[0].nodeType == 9) return false;
        var zi = dom.css('zIndex');
        if (!isNaN(zi) && zi !== 0) return parseInt(zi);
        dom = dom.parent();
      }
      return false;
    }

    //inspired by http://forum.jquery.com/topic/width-includes-border-width-when-set-to-thin-medium-thick-in-ie
    var _convertBorderWidth = {
      "thin": 1,
      "medium": 3,
      "thick": 5
    };

    function getWidthToPixel(dom, prop, chkheight) {
      var wd = dom.css(prop);
      var px = parseFloat(wd);
      if (isNaN(px)) {
        px = _convertBorderWidth[wd] || 0;
        var brd = px == 3 ? chkheight ? self.win.outerHeight() - self.win.innerHeight() : self.win.outerWidth() - self.win.innerWidth() : 1; //DON'T TRUST CSS
        if (self.isie8 && px) px += 1;
        return brd ? px : 0;
      }
      return px;
    }

    this.getDocumentScrollOffset = function () {
      return {
        top: _win.pageYOffset || _doc.documentElement.scrollTop,
        left: _win.pageXOffset || _doc.documentElement.scrollLeft
      };
    };

    this.getOffset = function () {
      if (self.isfixed) {
        var ofs = self.win.offset(); // fix Chrome auto issue (when right/bottom props only)
        var scrl = self.getDocumentScrollOffset();
        ofs.top -= scrl.top;
        ofs.left -= scrl.left;
        return ofs;
      }
      var ww = self.win.offset();
      if (!self.viewport) return ww;
      var vp = self.viewport.offset();
      return {
        top: ww.top - vp.top,
        left: ww.left - vp.left
      };
    };

    this.updateScrollBar = function (len) {
      var pos, off;
      if (self.ishwscroll) {
        self.rail.css({
          height: self.win.innerHeight() - (opt.railpadding.top + opt.railpadding.bottom)
        });
        if (self.railh) self.railh.css({
          width: self.win.innerWidth() - (opt.railpadding.left + opt.railpadding.right)
        });
      } else {
        var wpos = self.getOffset();
        pos = {
          top: wpos.top,
          left: wpos.left - (opt.railpadding.left + opt.railpadding.right)
        };
        pos.top += getWidthToPixel(self.win, 'border-top-width', true);
        pos.left += self.rail.align ? self.win.outerWidth() - getWidthToPixel(self.win, 'border-right-width') - self.rail.width : getWidthToPixel(self.win, 'border-left-width');

        off = opt.railoffset;
        if (off) {
          if (off.top) pos.top += off.top;
          if (off.left) pos.left += off.left;
        }

        if (!self.railslocked) self.rail.css({
          top: pos.top,
          left: pos.left,
          height: (len ? len.h : self.win.innerHeight()) - (opt.railpadding.top + opt.railpadding.bottom)
        });

        if (self.zoom) {
          self.zoom.css({
            top: pos.top + 1,
            left: self.rail.align == 1 ? pos.left - 20 : pos.left + self.rail.width + 4
          });
        }

        if (self.railh && !self.railslocked) {
          pos = {
            top: wpos.top,
            left: wpos.left
          };
          off = opt.railhoffset;
          if (off) {
            if (off.top) pos.top += off.top;
            if (off.left) pos.left += off.left;
          }
          var y = self.railh.align ? pos.top + getWidthToPixel(self.win, 'border-top-width', true) + self.win.innerHeight() - self.railh.height : pos.top + getWidthToPixel(self.win, 'border-top-width', true);
          var x = pos.left + getWidthToPixel(self.win, 'border-left-width');
          self.railh.css({
            top: y - (opt.railpadding.top + opt.railpadding.bottom),
            left: x,
            width: self.railh.width
          });
        }
      }
    };

    this.doRailClick = function (e, dbl, hr) {
      var fn, pg, cur, pos;

      if (self.railslocked) return;

      self.cancelEvent(e);

      if (!("pageY" in e)) {
        e.pageX = e.clientX + _doc.documentElement.scrollLeft;
        e.pageY = e.clientY + _doc.documentElement.scrollTop;
      }

      if (dbl) {
        fn = hr ? self.doScrollLeft : self.doScrollTop;
        cur = hr ? (e.pageX - self.railh.offset().left - self.cursorwidth / 2) * self.scrollratio.x : (e.pageY - self.rail.offset().top - self.cursorheight / 2) * self.scrollratio.y;
        self.unsynched("relativexy");
        fn(cur | 0);
      } else {
        fn = hr ? self.doScrollLeftBy : self.doScrollBy;
        cur = hr ? self.scroll.x : self.scroll.y;
        pos = hr ? e.pageX - self.railh.offset().left : e.pageY - self.rail.offset().top;
        pg = hr ? self.view.w : self.view.h;
        fn(cur >= pos ? pg : -pg);
      }
    };

    self.newscrolly = self.newscrollx = 0;

    self.hasanimationframe = "requestAnimationFrame" in _win;
    self.hascancelanimationframe = "cancelAnimationFrame" in _win;

    self.hasborderbox = false;

    this.init = function () {

      self.saved.css = [];

      if (cap.isoperamini) return true; // SORRY, DO NOT WORK!
      if (cap.isandroid && !("hidden" in _doc)) return true; // Android 3- SORRY, DO NOT WORK!

      opt.emulatetouch = opt.emulatetouch || opt.touchbehavior; // mantain compatibility with "touchbehavior"      

      self.hasborderbox = _win.getComputedStyle && _win.getComputedStyle(_doc.body)['box-sizing'] === "border-box";

      var _scrollyhidden = { 'overflow-y': 'hidden' };
      if (cap.isie11 || cap.isie10) _scrollyhidden['-ms-overflow-style'] = 'none'; // IE 10 & 11 is always a world apart!

      if (self.ishwscroll) {
        this.doc.css(cap.transitionstyle, cap.prefixstyle + 'transform 0ms ease-out');
        if (cap.transitionend) self.bind(self.doc, cap.transitionend, self.onScrollTransitionEnd, false); //I have got to do something usefull!!
      }

      self.zindex = "auto";
      if (!self.ispage && opt.zindex == "auto") {
        self.zindex = getZIndex() || "auto";
      } else {
        self.zindex = opt.zindex;
      }

      if (!self.ispage && self.zindex != "auto" && self.zindex > globalmaxzindex) {
        globalmaxzindex = self.zindex;
      }

      if (self.isie && self.zindex === 0 && opt.zindex == "auto") {
        // fix IE auto == 0
        self.zindex = "auto";
      }

      if (!self.ispage || !cap.isieold) {

        var cont = self.docscroll;
        if (self.ispage) cont = self.haswrapper ? self.win : self.doc;

        self.css(cont, _scrollyhidden);

        if (self.ispage && (cap.isie11 || cap.isie)) {
          // IE 7-11
          self.css($("html"), _scrollyhidden);
        }

        if (cap.isios && !self.ispage && !self.haswrapper) self.css($body, {
          "-webkit-overflow-scrolling": "touch"
        }); //force hw acceleration

        var cursor = $(_doc.createElement('div'));
        cursor.css({
          position: "relative",
          top: 0,
          "float": "right",
          width: opt.cursorwidth,
          height: 0,
          'background-color': opt.cursorcolor,
          border: opt.cursorborder,
          'background-clip': 'padding-box',
          '-webkit-border-radius': opt.cursorborderradius,
          '-moz-border-radius': opt.cursorborderradius,
          'border-radius': opt.cursorborderradius
        });

        cursor.addClass('nicescroll-cursors');

        self.cursor = cursor;

        var rail = $(_doc.createElement('div'));
        rail.attr('id', self.id);
        rail.addClass('nicescroll-rails nicescroll-rails-vr');

        if (opt.scrollCLass) {
          rail.addClass(opt.scrollCLass);
        }

        var v,
            a,
            kp = ["left", "right", "top", "bottom"]; //**
        for (var n in kp) {
          a = kp[n];
          v = opt.railpadding[a] || 0;
          v && rail.css("padding-" + a, v + "px");
        }

        rail.append(cursor);

        rail.width = Math.max(parseFloat(opt.cursorwidth), cursor.outerWidth());
        rail.css({
          width: rail.width + "px",
          zIndex: self.zindex,
          background: opt.background,
          cursor: "default"
        });

        rail.visibility = true;
        rail.scrollable = true;

        rail.align = opt.railalign == "left" ? 0 : 1;

        self.rail = rail;

        self.rail.drag = false;

        var zoom = false;
        if (opt.boxzoom && !self.ispage && !cap.isieold) {
          zoom = _doc.createElement('div');

          self.bind(zoom, "click", self.doZoom);
          self.bind(zoom, "mouseenter", function () {
            self.zoom.css('opacity', opt.cursoropacitymax);
          });
          self.bind(zoom, "mouseleave", function () {
            self.zoom.css('opacity', opt.cursoropacitymin);
          });

          self.zoom = $(zoom);
          self.zoom.css({
            cursor: "pointer",
            zIndex: self.zindex,
            backgroundImage: 'url(' + opt.scriptpath + 'zoomico.png)',
            height: 18,
            width: 18,
            backgroundPosition: '0 0'
          });
          if (opt.dblclickzoom) self.bind(self.win, "dblclick", self.doZoom);
          if (cap.cantouch && opt.gesturezoom) {
            self.ongesturezoom = function (e) {
              if (e.scale > 1.5) self.doZoomIn(e);
              if (e.scale < 0.8) self.doZoomOut(e);
              return self.cancelEvent(e);
            };
            self.bind(self.win, "gestureend", self.ongesturezoom);
          }
        }

        // init HORIZ

        self.railh = false;
        var railh;

        if (opt.horizrailenabled) {

          self.css(cont, {
            overflowX: 'hidden'
          });

          cursor = $(_doc.createElement('div'));
          cursor.css({
            position: "absolute",
            top: 0,
            height: opt.cursorwidth,
            width: 0,
            backgroundColor: opt.cursorcolor,
            border: opt.cursorborder,
            backgroundClip: 'padding-box',
            '-webkit-border-radius': opt.cursorborderradius,
            '-moz-border-radius': opt.cursorborderradius,
            'border-radius': opt.cursorborderradius
          });

          if (cap.isieold) cursor.css('overflow', 'hidden'); //IE6 horiz scrollbar issue

          cursor.addClass('nicescroll-cursors');

          self.cursorh = cursor;

          railh = $(_doc.createElement('div'));
          railh.attr('id', self.id + '-hr');
          railh.addClass('nicescroll-rails nicescroll-rails-hr');
          if (opt.scrollCLass) {
            railh.addClass(opt.scrollCLass);
          }

          railh.height = Math.max(parseFloat(opt.cursorwidth), cursor.outerHeight());
          railh.css({
            height: railh.height + "px",
            'zIndex': self.zindex,
            "background": opt.background
          });

          railh.append(cursor);

          railh.visibility = true;
          railh.scrollable = true;

          railh.align = opt.railvalign == "top" ? 0 : 1;

          self.railh = railh;

          self.railh.drag = false;
        }

        if (self.ispage) {

          rail.css({
            position: "fixed",
            top: 0,
            height: "100%"
          });

          rail.css(rail.align ? { right: 0 } : { left: 0 });

          self.body.append(rail);
          if (self.railh) {
            railh.css({
              position: "fixed",
              left: 0,
              width: "100%"
            });

            railh.css(railh.align ? { bottom: 0 } : { top: 0 });

            self.body.append(railh);
          }
        } else {
          if (self.ishwscroll) {
            if (self.win.css('position') == 'static') self.css(self.win, { 'position': 'relative' });
            var bd = self.win[0].nodeName == 'HTML' ? self.body : self.win;
            $(bd).scrollTop(0).scrollLeft(0); // fix rail position if content already scrolled
            if (self.zoom) {
              self.zoom.css({
                position: "absolute",
                top: 1,
                right: 0,
                "margin-right": rail.width + 4
              });
              bd.append(self.zoom);
            }
            rail.css({
              position: "absolute",
              top: 0
            });
            rail.css(rail.align ? { right: 0 } : { left: 0 });
            bd.append(rail);
            if (railh) {
              railh.css({
                position: "absolute",
                left: 0,
                bottom: 0
              });
              railh.css(railh.align ? { bottom: 0 } : { top: 0 });
              bd.append(railh);
            }
          } else {
            self.isfixed = self.win.css("position") == "fixed";
            var rlpos = self.isfixed ? "fixed" : "absolute";

            if (!self.isfixed) self.viewport = self.getViewport(self.win[0]);
            if (self.viewport) {
              self.body = self.viewport;
              if (!/fixed|absolute/.test(self.viewport.css("position"))) self.css(self.viewport, {
                "position": "relative"
              });
            }

            rail.css({
              position: rlpos
            });
            if (self.zoom) self.zoom.css({
              position: rlpos
            });
            self.updateScrollBar();
            self.body.append(rail);
            if (self.zoom) self.body.append(self.zoom);
            if (self.railh) {
              railh.css({
                position: rlpos
              });
              self.body.append(railh);
            }
          }

          if (cap.isios) self.css(self.win, {
            '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
            '-webkit-touch-callout': 'none'
          }); // prevent grey layer on click

          if (opt.disableoutline) {
            if (cap.isie) self.win.attr("hideFocus", "true"); // IE, prevent dotted rectangle on focused div
            if (cap.iswebkit) self.win.css('outline', 'none'); // Webkit outline
          }
        }

        if (opt.autohidemode === false) {
          self.autohidedom = false;
          self.rail.css({
            opacity: opt.cursoropacitymax
          });
          if (self.railh) self.railh.css({
            opacity: opt.cursoropacitymax
          });
        } else if (opt.autohidemode === true || opt.autohidemode === "leave") {
          self.autohidedom = $().add(self.rail);
          if (cap.isie8) self.autohidedom = self.autohidedom.add(self.cursor);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.railh);
          if (self.railh && cap.isie8) self.autohidedom = self.autohidedom.add(self.cursorh);
        } else if (opt.autohidemode == "scroll") {
          self.autohidedom = $().add(self.rail);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.railh);
        } else if (opt.autohidemode == "cursor") {
          self.autohidedom = $().add(self.cursor);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.cursorh);
        } else if (opt.autohidemode == "hidden") {
          self.autohidedom = false;
          self.hide();
          self.railslocked = false;
        }

        if (cap.cantouch || self.istouchcapable || opt.emulatetouch || cap.hasmstouch) {

          self.scrollmom = new ScrollMomentumClass2D(self);

          var delayedclick = null;

          self.ontouchstart = function (e) {

            if (self.locked) return false;

            //if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
            if (e.pointerType && (e.pointerType === 'mouse' || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return false; // need test on surface!!

            self.hasmoving = false;

            if (self.scrollmom.timer) {
              self.triggerScrollEnd();
              self.scrollmom.stop();
            }

            if (!self.railslocked) {
              var tg = self.getTarget(e);

              if (tg) {
                var skp = /INPUT/i.test(tg.nodeName) && /range/i.test(tg.type);
                if (skp) return self.stopPropagation(e);
              }

              var ismouse = e.type === "mousedown";

              if (!("clientX" in e) && "changedTouches" in e) {
                e.clientX = e.changedTouches[0].clientX;
                e.clientY = e.changedTouches[0].clientY;
              }

              if (self.forcescreen) {
                var le = e;
                e = {
                  "original": e.original ? e.original : e
                };
                e.clientX = le.screenX;
                e.clientY = le.screenY;
              }

              self.rail.drag = {
                x: e.clientX,
                y: e.clientY,
                sx: self.scroll.x,
                sy: self.scroll.y,
                st: self.getScrollTop(),
                sl: self.getScrollLeft(),
                pt: 2,
                dl: false,
                tg: tg
              };

              if (self.ispage || !opt.directionlockdeadzone) {

                self.rail.drag.dl = "f";
              } else {

                var view = {
                  w: $window.width(),
                  h: $window.height()
                };

                var page = self.getContentSize();

                var maxh = page.h - view.h;
                var maxw = page.w - view.w;

                if (self.rail.scrollable && !self.railh.scrollable) self.rail.drag.ck = maxh > 0 ? "v" : false;else if (!self.rail.scrollable && self.railh.scrollable) self.rail.drag.ck = maxw > 0 ? "h" : false;else self.rail.drag.ck = false;
              }

              if (opt.emulatetouch && self.isiframe && cap.isie) {
                var wp = self.win.position();
                self.rail.drag.x += wp.left;
                self.rail.drag.y += wp.top;
              }

              self.hasmoving = false;
              self.lastmouseup = false;
              self.scrollmom.reset(e.clientX, e.clientY);

              if (tg && ismouse) {

                var ip = /INPUT|SELECT|BUTTON|TEXTAREA/i.test(tg.nodeName);
                if (!ip) {
                  if (cap.hasmousecapture) tg.setCapture();
                  if (opt.emulatetouch) {
                    if (tg.onclick && !(tg._onclick || false)) {
                      // intercept DOM0 onclick event
                      tg._onclick = tg.onclick;
                      tg.onclick = function (e) {
                        if (self.hasmoving) return false;
                        tg._onclick.call(this, e);
                      };
                    }
                    return self.cancelEvent(e);
                  }
                  return self.stopPropagation(e);
                }

                if (/SUBMIT|CANCEL|BUTTON/i.test($(tg).attr('type'))) {
                  self.preventclick = {
                    "tg": tg,
                    "click": false
                  };
                }
              }
            }
          };

          self.ontouchend = function (e) {

            if (!self.rail.drag) return true;

            if (self.rail.drag.pt == 2) {
              //if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
              if (e.pointerType && (e.pointerType === 'mouse' || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return false;

              self.rail.drag = false;

              var ismouse = e.type === "mouseup";

              if (self.hasmoving) {
                self.scrollmom.doMomentum();
                self.lastmouseup = true;
                self.hideCursor();
                if (cap.hasmousecapture) _doc.releaseCapture();
                if (ismouse) return self.cancelEvent(e);
              }
            } else if (self.rail.drag.pt == 1) {
              return self.onmouseup(e);
            }
          };

          var moveneedoffset = opt.emulatetouch && self.isiframe && !cap.hasmousecapture;

          var locktollerance = opt.directionlockdeadzone * 0.3 | 0;

          self.ontouchmove = function (e, byiframe) {

            if (!self.rail.drag) return true;

            if (e.targetTouches && opt.preventmultitouchscrolling) {
              if (e.targetTouches.length > 1) return true; // multitouch
            }

            //if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
            if (e.pointerType && (e.pointerType === 'mouse' || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return true;

            if (self.rail.drag.pt == 2) {

              if ("changedTouches" in e) {
                e.clientX = e.changedTouches[0].clientX;
                e.clientY = e.changedTouches[0].clientY;
              }

              var ofy, ofx;
              ofx = ofy = 0;

              if (moveneedoffset && !byiframe) {
                var wp = self.win.position();
                ofx = -wp.left;
                ofy = -wp.top;
              }

              var fy = e.clientY + ofy;
              var my = fy - self.rail.drag.y;
              var fx = e.clientX + ofx;
              var mx = fx - self.rail.drag.x;

              var ny = self.rail.drag.st - my;

              if (self.ishwscroll && opt.bouncescroll) {
                if (ny < 0) {
                  ny = Math.round(ny / 2);
                } else if (ny > self.page.maxh) {
                  ny = self.page.maxh + Math.round((ny - self.page.maxh) / 2);
                }
              } else {
                if (ny < 0) {
                  ny = 0;
                  fy = 0;
                } else if (ny > self.page.maxh) {
                  ny = self.page.maxh;
                  fy = 0;
                }
                if (fy === 0 && !self.hasmoving) {
                  if (!self.ispage) self.rail.drag = false;
                  return true;
                }
              }

              var nx = self.getScrollLeft();

              if (self.railh && self.railh.scrollable) {
                nx = self.isrtlmode ? mx - self.rail.drag.sl : self.rail.drag.sl - mx;

                if (self.ishwscroll && opt.bouncescroll) {
                  if (nx < 0) {
                    nx = Math.round(nx / 2);
                  } else if (nx > self.page.maxw) {
                    nx = self.page.maxw + Math.round((nx - self.page.maxw) / 2);
                  }
                } else {
                  if (nx < 0) {
                    nx = 0;
                    fx = 0;
                  }
                  if (nx > self.page.maxw) {
                    nx = self.page.maxw;
                    fx = 0;
                  }
                }
              }

              if (!self.hasmoving) {

                if (self.rail.drag.y === e.clientY && self.rail.drag.x === e.clientX) return self.cancelEvent(e); // prevent first useless move event 

                var ay = Math.abs(my);
                var ax = Math.abs(mx);
                var dz = opt.directionlockdeadzone;

                if (!self.rail.drag.ck) {
                  if (ay > dz && ax > dz) self.rail.drag.dl = "f";else if (ay > dz) self.rail.drag.dl = ax > locktollerance ? "f" : "v";else if (ax > dz) self.rail.drag.dl = ay > locktollerance ? "f" : "h";
                } else if (self.rail.drag.ck == "v") {
                  if (ax > dz && ay <= locktollerance) {
                    self.rail.drag = false;
                  } else if (ay > dz) self.rail.drag.dl = "v";
                } else if (self.rail.drag.ck == "h") {

                  if (ay > dz && ax <= locktollerance) {
                    self.rail.drag = false;
                  } else if (ax > dz) self.rail.drag.dl = "h";
                }

                if (!self.rail.drag.dl) return self.cancelEvent(e);

                self.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0);
                self.hasmoving = true;
              }

              if (self.preventclick && !self.preventclick.click) {
                self.preventclick.click = self.preventclick.tg.onclick || false;
                self.preventclick.tg.onclick = self.onpreventclick;
              }

              if (self.rail.drag.dl) {
                if (self.rail.drag.dl == "v") nx = self.rail.drag.sl;else if (self.rail.drag.dl == "h") ny = self.rail.drag.st;
              }

              self.synched("touchmove", function () {
                if (self.rail.drag && self.rail.drag.pt == 2) {
                  if (self.prepareTransition) self.resetTransition();
                  if (self.rail.scrollable) self.setScrollTop(ny);
                  self.scrollmom.update(fx, fy);
                  if (self.railh && self.railh.scrollable) {
                    self.setScrollLeft(nx);
                    self.showCursor(ny, nx);
                  } else {
                    self.showCursor(ny);
                  }
                  if (cap.isie10) _doc.selection.clear();
                }
              });

              return self.cancelEvent(e);
            } else if (self.rail.drag.pt == 1) {
              // drag on cursor
              return self.onmousemove(e);
            }
          };

          self.ontouchstartCursor = function (e, hronly) {
            if (self.rail.drag && self.rail.drag.pt != 3) return;
            if (self.locked) return self.cancelEvent(e);
            self.cancelScroll();
            self.rail.drag = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
              sx: self.scroll.x,
              sy: self.scroll.y,
              pt: 3,
              hr: !!hronly
            };
            var tg = self.getTarget(e);
            if (!self.ispage && cap.hasmousecapture) tg.setCapture();
            if (self.isiframe && !cap.hasmousecapture) {
              self.saved.csspointerevents = self.doc.css("pointer-events");
              self.css(self.doc, { "pointer-events": "none" });
            }
            return self.cancelEvent(e);
          };

          self.ontouchendCursor = function (e) {
            if (self.rail.drag) {
              if (cap.hasmousecapture) _doc.releaseCapture();
              if (self.isiframe && !cap.hasmousecapture) self.doc.css("pointer-events", self.saved.csspointerevents);
              if (self.rail.drag.pt != 3) return;
              self.rail.drag = false;
              return self.cancelEvent(e);
            }
          };

          self.ontouchmoveCursor = function (e) {
            if (self.rail.drag) {
              if (self.rail.drag.pt != 3) return;

              self.cursorfreezed = true;

              if (self.rail.drag.hr) {
                self.scroll.x = self.rail.drag.sx + (e.touches[0].clientX - self.rail.drag.x);
                if (self.scroll.x < 0) self.scroll.x = 0;
                var mw = self.scrollvaluemaxw;
                if (self.scroll.x > mw) self.scroll.x = mw;
              } else {
                self.scroll.y = self.rail.drag.sy + (e.touches[0].clientY - self.rail.drag.y);
                if (self.scroll.y < 0) self.scroll.y = 0;
                var my = self.scrollvaluemax;
                if (self.scroll.y > my) self.scroll.y = my;
              }

              self.synched('touchmove', function () {
                if (self.rail.drag && self.rail.drag.pt == 3) {
                  self.showCursor();
                  if (self.rail.drag.hr) self.doScrollLeft(Math.round(self.scroll.x * self.scrollratio.x), opt.cursordragspeed);else self.doScrollTop(Math.round(self.scroll.y * self.scrollratio.y), opt.cursordragspeed);
                }
              });

              return self.cancelEvent(e);
            }
          };
        }

        self.onmousedown = function (e, hronly) {
          if (self.rail.drag && self.rail.drag.pt != 1) return;
          if (self.railslocked) return self.cancelEvent(e);
          self.cancelScroll();
          self.rail.drag = {
            x: e.clientX,
            y: e.clientY,
            sx: self.scroll.x,
            sy: self.scroll.y,
            pt: 1,
            hr: hronly || false
          };
          var tg = self.getTarget(e);

          if (cap.hasmousecapture) tg.setCapture();
          if (self.isiframe && !cap.hasmousecapture) {
            self.saved.csspointerevents = self.doc.css("pointer-events");
            self.css(self.doc, {
              "pointer-events": "none"
            });
          }
          self.hasmoving = false;
          return self.cancelEvent(e);
        };

        self.onmouseup = function (e) {
          if (self.rail.drag) {
            if (self.rail.drag.pt != 1) return true;

            if (cap.hasmousecapture) _doc.releaseCapture();
            if (self.isiframe && !cap.hasmousecapture) self.doc.css("pointer-events", self.saved.csspointerevents);
            self.rail.drag = false;
            self.cursorfreezed = false;
            if (self.hasmoving) self.triggerScrollEnd();
            return self.cancelEvent(e);
          }
        };

        self.onmousemove = function (e) {
          if (self.rail.drag) {
            if (self.rail.drag.pt !== 1) return;

            if (cap.ischrome && e.which === 0) return self.onmouseup(e);

            self.cursorfreezed = true;

            if (!self.hasmoving) self.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0);

            self.hasmoving = true;

            if (self.rail.drag.hr) {
              self.scroll.x = self.rail.drag.sx + (e.clientX - self.rail.drag.x);
              if (self.scroll.x < 0) self.scroll.x = 0;
              var mw = self.scrollvaluemaxw;
              if (self.scroll.x > mw) self.scroll.x = mw;
            } else {
              self.scroll.y = self.rail.drag.sy + (e.clientY - self.rail.drag.y);
              if (self.scroll.y < 0) self.scroll.y = 0;
              var my = self.scrollvaluemax;
              if (self.scroll.y > my) self.scroll.y = my;
            }

            self.synched('mousemove', function () {

              if (self.cursorfreezed) {
                self.showCursor();

                if (self.rail.drag.hr) {
                  self.scrollLeft(Math.round(self.scroll.x * self.scrollratio.x));
                } else {
                  self.scrollTop(Math.round(self.scroll.y * self.scrollratio.y));
                }
              }
            });

            return self.cancelEvent(e);
          } else {
            self.checkarea = 0;
          }
        };

        if (cap.cantouch || opt.emulatetouch) {

          self.onpreventclick = function (e) {
            if (self.preventclick) {
              self.preventclick.tg.onclick = self.preventclick.click;
              self.preventclick = false;
              return self.cancelEvent(e);
            }
          };

          self.onclick = cap.isios ? false : function (e) {
            // it needs to check IE11 ???
            if (self.lastmouseup) {
              self.lastmouseup = false;
              return self.cancelEvent(e);
            } else {
              return true;
            }
          };

          if (opt.grabcursorenabled && cap.cursorgrabvalue) {
            self.css(self.ispage ? self.doc : self.win, {
              'cursor': cap.cursorgrabvalue
            });
            self.css(self.rail, {
              'cursor': cap.cursorgrabvalue
            });
          }
        } else {

          var checkSelectionScroll = function checkSelectionScroll(e) {
            if (!self.selectiondrag) return;

            if (e) {
              var ww = self.win.outerHeight();
              var df = e.pageY - self.selectiondrag.top;
              if (df > 0 && df < ww) df = 0;
              if (df >= ww) df -= ww;
              self.selectiondrag.df = df;
            }
            if (self.selectiondrag.df === 0) return;

            var rt = -(self.selectiondrag.df * 2 / 6) | 0;
            self.doScrollBy(rt);

            self.debounced("doselectionscroll", function () {
              checkSelectionScroll();
            }, 50);
          };

          if ("getSelection" in _doc) {
            // A grade - Major browsers
            self.hasTextSelected = function () {
              return _doc.getSelection().rangeCount > 0;
            };
          } else if ("selection" in _doc) {
            //IE9-
            self.hasTextSelected = function () {
              return _doc.selection.type != "None";
            };
          } else {
            self.hasTextSelected = function () {
              // no support
              return false;
            };
          }

          self.onselectionstart = function (e) {
            //  More testing - severe chrome issues           
            /* 
                          if (!self.haswrapper&&(e.which&&e.which==2)) {  // fool browser to manage middle button scrolling
                            self.win.css({'overflow':'auto'});
                            setTimeout(function(){
                              self.win.css({'overflow':'hidden'});
                            },10);                
                            return true;
                          }            
            */
            if (self.ispage) return;
            self.selectiondrag = self.win.offset();
          };

          self.onselectionend = function (e) {
            self.selectiondrag = false;
          };
          self.onselectiondrag = function (e) {
            if (!self.selectiondrag) return;
            if (self.hasTextSelected()) self.debounced("selectionscroll", function () {
              checkSelectionScroll(e);
            }, 250);
          };
        }

        if (cap.hasw3ctouch) {
          //IE11+
          self.css(self.ispage ? $("html") : self.win, { 'touch-action': 'none' });
          self.css(self.rail, {
            'touch-action': 'none'
          });
          self.css(self.cursor, {
            'touch-action': 'none'
          });
          self.bind(self.win, "pointerdown", self.ontouchstart);
          self.bind(_doc, "pointerup", self.ontouchend);
          self.delegate(_doc, "pointermove", self.ontouchmove);
        } else if (cap.hasmstouch) {
          //IE10
          self.css(self.ispage ? $("html") : self.win, { '-ms-touch-action': 'none' });
          self.css(self.rail, {
            '-ms-touch-action': 'none'
          });
          self.css(self.cursor, {
            '-ms-touch-action': 'none'
          });
          self.bind(self.win, "MSPointerDown", self.ontouchstart);
          self.bind(_doc, "MSPointerUp", self.ontouchend);
          self.delegate(_doc, "MSPointerMove", self.ontouchmove);
          self.bind(self.cursor, "MSGestureHold", function (e) {
            e.preventDefault();
          });
          self.bind(self.cursor, "contextmenu", function (e) {
            e.preventDefault();
          });
        } else if (cap.cantouch) {
          // smartphones/touch devices
          self.bind(self.win, "touchstart", self.ontouchstart, false, true);
          self.bind(_doc, "touchend", self.ontouchend, false, true);
          self.bind(_doc, "touchcancel", self.ontouchend, false, true);
          self.delegate(_doc, "touchmove", self.ontouchmove, false, true);
        }

        if (opt.emulatetouch) {
          self.bind(self.win, "mousedown", self.ontouchstart, false, true);
          self.bind(_doc, "mouseup", self.ontouchend, false, true);
          self.bind(_doc, "mousemove", self.ontouchmove, false, true);
        }

        if (opt.cursordragontouch || !cap.cantouch && !opt.emulatetouch) {

          self.rail.css({
            cursor: "default"
          });
          self.railh && self.railh.css({
            cursor: "default"
          });

          self.jqbind(self.rail, "mouseenter", function () {
            if (!self.ispage && !self.win.is(":visible")) return false;
            if (self.canshowonmouseevent) self.showCursor();
            self.rail.active = true;
          });
          self.jqbind(self.rail, "mouseleave", function () {
            self.rail.active = false;
            if (!self.rail.drag) self.hideCursor();
          });

          if (opt.sensitiverail) {
            self.bind(self.rail, "click", function (e) {
              self.doRailClick(e, false, false);
            });
            self.bind(self.rail, "dblclick", function (e) {
              self.doRailClick(e, true, false);
            });
            self.bind(self.cursor, "click", function (e) {
              self.cancelEvent(e);
            });
            self.bind(self.cursor, "dblclick", function (e) {
              self.cancelEvent(e);
            });
          }

          if (self.railh) {
            self.jqbind(self.railh, "mouseenter", function () {
              if (!self.ispage && !self.win.is(":visible")) return false;
              if (self.canshowonmouseevent) self.showCursor();
              self.rail.active = true;
            });
            self.jqbind(self.railh, "mouseleave", function () {
              self.rail.active = false;
              if (!self.rail.drag) self.hideCursor();
            });

            if (opt.sensitiverail) {
              self.bind(self.railh, "click", function (e) {
                self.doRailClick(e, false, true);
              });
              self.bind(self.railh, "dblclick", function (e) {
                self.doRailClick(e, true, true);
              });
              self.bind(self.cursorh, "click", function (e) {
                self.cancelEvent(e);
              });
              self.bind(self.cursorh, "dblclick", function (e) {
                self.cancelEvent(e);
              });
            }
          }
        }

        if (opt.cursordragontouch && (this.istouchcapable || cap.cantouch)) {
          self.bind(self.cursor, "touchstart", self.ontouchstartCursor);
          self.bind(self.cursor, "touchmove", self.ontouchmoveCursor);
          self.bind(self.cursor, "touchend", self.ontouchendCursor);
          self.cursorh && self.bind(self.cursorh, "touchstart", function (e) {
            self.ontouchstartCursor(e, true);
          });
          self.cursorh && self.bind(self.cursorh, "touchmove", self.ontouchmoveCursor);
          self.cursorh && self.bind(self.cursorh, "touchend", self.ontouchendCursor);
        }

        //        if (!cap.cantouch && !opt.emulatetouch) {
        if (!opt.emulatetouch && !cap.isandroid && !cap.isios) {

          self.bind(cap.hasmousecapture ? self.win : _doc, "mouseup", self.onmouseup);
          self.bind(_doc, "mousemove", self.onmousemove);
          if (self.onclick) self.bind(_doc, "click", self.onclick);

          self.bind(self.cursor, "mousedown", self.onmousedown);
          self.bind(self.cursor, "mouseup", self.onmouseup);

          if (self.railh) {
            self.bind(self.cursorh, "mousedown", function (e) {
              self.onmousedown(e, true);
            });
            self.bind(self.cursorh, "mouseup", self.onmouseup);
          }

          if (!self.ispage && opt.enablescrollonselection) {
            self.bind(self.win[0], "mousedown", self.onselectionstart);
            self.bind(_doc, "mouseup", self.onselectionend);
            self.bind(self.cursor, "mouseup", self.onselectionend);
            if (self.cursorh) self.bind(self.cursorh, "mouseup", self.onselectionend);
            self.bind(_doc, "mousemove", self.onselectiondrag);
          }

          if (self.zoom) {
            self.jqbind(self.zoom, "mouseenter", function () {
              if (self.canshowonmouseevent) self.showCursor();
              self.rail.active = true;
            });
            self.jqbind(self.zoom, "mouseleave", function () {
              self.rail.active = false;
              if (!self.rail.drag) self.hideCursor();
            });
          }
        } else {

          self.bind(cap.hasmousecapture ? self.win : _doc, "mouseup", self.ontouchend);
          if (self.onclick) self.bind(_doc, "click", self.onclick);

          if (opt.cursordragontouch) {
            self.bind(self.cursor, "mousedown", self.onmousedown);
            self.bind(self.cursor, "mouseup", self.onmouseup);
            self.cursorh && self.bind(self.cursorh, "mousedown", function (e) {
              self.onmousedown(e, true);
            });
            self.cursorh && self.bind(self.cursorh, "mouseup", self.onmouseup);
          } else {
            self.bind(self.rail, "mousedown", function (e) {
              e.preventDefault();
            }); // prevent text selection             
            self.railh && self.bind(self.railh, "mousedown", function (e) {
              e.preventDefault();
            });
          }
        }

        if (opt.enablemousewheel) {
          if (!self.isiframe) self.mousewheel(cap.isie && self.ispage ? _doc : self.win, self.onmousewheel);
          self.mousewheel(self.rail, self.onmousewheel);
          if (self.railh) self.mousewheel(self.railh, self.onmousewheelhr);
        }

        if (!self.ispage && !cap.cantouch && !/HTML|^BODY/.test(self.win[0].nodeName)) {
          if (!self.win.attr("tabindex")) self.win.attr({
            "tabindex": ++tabindexcounter
          });

          self.bind(self.win, "focus", function (e) {
            // better using native events
            domfocus = self.getTarget(e).id || self.getTarget(e) || false;
            self.hasfocus = true;
            if (self.canshowonmouseevent) self.noticeCursor();
          });
          self.bind(self.win, "blur", function (e) {
            // *
            domfocus = false;
            self.hasfocus = false;
          });

          self.bind(self.win, "mouseenter", function (e) {
            // *
            mousefocus = self.getTarget(e).id || self.getTarget(e) || false;
            self.hasmousefocus = true;
            if (self.canshowonmouseevent) self.noticeCursor();
          });
          self.bind(self.win, "mouseleave", function (e) {
            // *       
            mousefocus = false;
            self.hasmousefocus = false;
            if (!self.rail.drag) self.hideCursor();
          });
        }

        //Thanks to http://www.quirksmode.org !!
        self.onkeypress = function (e) {
          if (self.railslocked && self.page.maxh === 0) return true;

          e = e || _win.event;
          var tg = self.getTarget(e);
          if (tg && /INPUT|TEXTAREA|SELECT|OPTION/.test(tg.nodeName)) {
            var tp = tg.getAttribute('type') || tg.type || false;
            if (!tp || !/submit|button|cancel/i.tp) return true;
          }

          if ($(tg).attr('contenteditable')) return true;

          if (self.hasfocus || self.hasmousefocus && !domfocus || self.ispage && !domfocus && !mousefocus) {
            var key = e.keyCode;

            if (self.railslocked && key != 27) return self.cancelEvent(e);

            var ctrl = e.ctrlKey || false;
            var shift = e.shiftKey || false;

            var ret = false;
            switch (key) {
              case 38:
              case 63233:
                //safari
                self.doScrollBy(24 * 3);
                ret = true;
                break;
              case 40:
              case 63235:
                //safari
                self.doScrollBy(-24 * 3);
                ret = true;
                break;
              case 37:
              case 63232:
                //safari
                if (self.railh) {
                  ctrl ? self.doScrollLeft(0) : self.doScrollLeftBy(24 * 3);
                  ret = true;
                }
                break;
              case 39:
              case 63234:
                //safari
                if (self.railh) {
                  ctrl ? self.doScrollLeft(self.page.maxw) : self.doScrollLeftBy(-24 * 3);
                  ret = true;
                }
                break;
              case 33:
              case 63276:
                // safari
                self.doScrollBy(self.view.h);
                ret = true;
                break;
              case 34:
              case 63277:
                // safari
                self.doScrollBy(-self.view.h);
                ret = true;
                break;
              case 36:
              case 63273:
                // safari                
                self.railh && ctrl ? self.doScrollPos(0, 0) : self.doScrollTo(0);
                ret = true;
                break;
              case 35:
              case 63275:
                // safari
                self.railh && ctrl ? self.doScrollPos(self.page.maxw, self.page.maxh) : self.doScrollTo(self.page.maxh);
                ret = true;
                break;
              case 32:
                if (opt.spacebarenabled) {
                  shift ? self.doScrollBy(self.view.h) : self.doScrollBy(-self.view.h);
                  ret = true;
                }
                break;
              case 27:
                // ESC
                if (self.zoomactive) {
                  self.doZoom();
                  ret = true;
                }
                break;
            }
            if (ret) return self.cancelEvent(e);
          }
        };

        if (opt.enablekeyboard) self.bind(_doc, cap.isopera && !cap.isopera12 ? "keypress" : "keydown", self.onkeypress);

        self.bind(_doc, "keydown", function (e) {
          var ctrl = e.ctrlKey || false;
          if (ctrl) self.wheelprevented = true;
        });
        self.bind(_doc, "keyup", function (e) {
          var ctrl = e.ctrlKey || false;
          if (!ctrl) self.wheelprevented = false;
        });
        self.bind(_win, "blur", function (e) {
          self.wheelprevented = false;
        });

        self.bind(_win, 'resize', self.onscreenresize);
        self.bind(_win, 'orientationchange', self.onscreenresize);

        self.bind(_win, "load", self.lazyResize);

        if (cap.ischrome && !self.ispage && !self.haswrapper) {
          //chrome void scrollbar bug - it persists in version 26
          var tmp = self.win.attr("style");
          var ww = parseFloat(self.win.css("width")) + 1;
          self.win.css('width', ww);
          self.synched("chromefix", function () {
            self.win.attr("style", tmp);
          });
        }

        // Trying a cross-browser implementation - good luck!

        self.onAttributeChange = function (e) {
          self.lazyResize(self.isieold ? 250 : 30);
        };

        if (opt.enableobserver) {

          if (!self.isie11 && ClsMutationObserver !== false) {
            // IE11 crashes  #568
            self.observerbody = new ClsMutationObserver(function (mutations) {
              mutations.forEach(function (mut) {
                if (mut.type == "attributes") {
                  return $body.hasClass("modal-open") && $body.hasClass("modal-dialog") && !$.contains($('.modal-dialog')[0], self.doc[0]) ? self.hide() : self.show(); // Support for Bootstrap modal; Added check if the nice scroll element is inside a modal
                }
              });
              if (self.me.clientWidth != self.page.width || self.me.clientHeight != self.page.height) return self.lazyResize(30);
            });
            self.observerbody.observe(_doc.body, {
              childList: true,
              subtree: true,
              characterData: false,
              attributes: true,
              attributeFilter: ['class']
            });
          }

          if (!self.ispage && !self.haswrapper) {

            var _dom = self.win[0];

            // redesigned MutationObserver for Chrome18+/Firefox14+/iOS6+ with support for: remove div, add/remove content
            if (ClsMutationObserver !== false) {
              self.observer = new ClsMutationObserver(function (mutations) {
                mutations.forEach(self.onAttributeChange);
              });
              self.observer.observe(_dom, {
                childList: true,
                characterData: false,
                attributes: true,
                subtree: false
              });
              self.observerremover = new ClsMutationObserver(function (mutations) {
                mutations.forEach(function (mo) {
                  if (mo.removedNodes.length > 0) {
                    for (var dd in mo.removedNodes) {
                      if (!!self && mo.removedNodes[dd] === _dom) return self.remove();
                    }
                  }
                });
              });
              self.observerremover.observe(_dom.parentNode, {
                childList: true,
                characterData: false,
                attributes: false,
                subtree: false
              });
            } else {
              self.bind(_dom, cap.isie && !cap.isie9 ? "propertychange" : "DOMAttrModified", self.onAttributeChange);
              if (cap.isie9) _dom.attachEvent("onpropertychange", self.onAttributeChange); //IE9 DOMAttrModified bug
              self.bind(_dom, "DOMNodeRemoved", function (e) {
                if (e.target === _dom) self.remove();
              });
            }
          }
        }

        //

        if (!self.ispage && opt.boxzoom) self.bind(_win, "resize", self.resizeZoom);
        if (self.istextarea) {
          self.bind(self.win, "keydown", self.lazyResize);
          self.bind(self.win, "mouseup", self.lazyResize);
        }

        self.lazyResize(30);
      }

      if (this.doc[0].nodeName == 'IFRAME') {
        var oniframeload = function oniframeload() {
          self.iframexd = false;
          var doc;
          try {
            doc = 'contentDocument' in this ? this.contentDocument : this.contentWindow._doc;
            var a = doc.domain;
          } catch (e) {
            self.iframexd = true;
            doc = false;
          }

          if (self.iframexd) {
            if ("console" in _win) console.log('NiceScroll error: policy restriced iframe');
            return true; //cross-domain - I can't manage this        
          }

          self.forcescreen = true;

          if (self.isiframe) {
            self.iframe = {
              "doc": $(doc),
              "html": self.doc.contents().find('html')[0],
              "body": self.doc.contents().find('body')[0]
            };
            self.getContentSize = function () {
              return {
                w: Math.max(self.iframe.html.scrollWidth, self.iframe.body.scrollWidth),
                h: Math.max(self.iframe.html.scrollHeight, self.iframe.body.scrollHeight)
              };
            };
            self.docscroll = $(self.iframe.body);
          }

          if (!cap.isios && opt.iframeautoresize && !self.isiframe) {
            self.win.scrollTop(0); // reset position
            self.doc.height(""); //reset height to fix browser bug
            var hh = Math.max(doc.getElementsByTagName('html')[0].scrollHeight, doc.body.scrollHeight);
            self.doc.height(hh);
          }
          self.lazyResize(30);

          self.css($(self.iframe.body), _scrollyhidden);

          if (cap.isios && self.haswrapper) {
            self.css($(doc.body), {
              '-webkit-transform': 'translate3d(0,0,0)'
            }); // avoid iFrame content clipping - thanks to http://blog.derraab.com/2012/04/02/avoid-iframe-content-clipping-with-css-transform-on-ios/
          }

          if ('contentWindow' in this) {
            self.bind(this.contentWindow, "scroll", self.onscroll); //IE8 & minor
          } else {
            self.bind(doc, "scroll", self.onscroll);
          }

          if (opt.enablemousewheel) {
            self.mousewheel(doc, self.onmousewheel);
          }

          if (opt.enablekeyboard) self.bind(doc, cap.isopera ? "keypress" : "keydown", self.onkeypress);

          if (cap.cantouch) {
            self.bind(doc, "touchstart", self.ontouchstart);
            self.bind(doc, "touchmove", self.ontouchmove);
          } else if (opt.emulatetouch) {
            self.bind(doc, "mousedown", self.ontouchstart);
            self.bind(doc, "mousemove", function (e) {
              return self.ontouchmove(e, true);
            });
            if (opt.grabcursorenabled && cap.cursorgrabvalue) self.css($(doc.body), {
              'cursor': cap.cursorgrabvalue
            });
          }

          self.bind(doc, "mouseup", self.ontouchend);

          if (self.zoom) {
            if (opt.dblclickzoom) self.bind(doc, 'dblclick', self.doZoom);
            if (self.ongesturezoom) self.bind(doc, "gestureend", self.ongesturezoom);
          }
        };

        if (this.doc[0].readyState && this.doc[0].readyState === "complete") {
          setTimeout(function () {
            oniframeload.call(self.doc[0], false);
          }, 500);
        }
        self.bind(this.doc, "load", oniframeload);
      }
    };

    this.showCursor = function (py, px) {
      if (self.cursortimeout) {
        clearTimeout(self.cursortimeout);
        self.cursortimeout = 0;
      }
      if (!self.rail) return;
      if (self.autohidedom) {
        self.autohidedom.stop().css({
          opacity: opt.cursoropacitymax
        });
        self.cursoractive = true;
      }

      if (!self.rail.drag || self.rail.drag.pt != 1) {
        if (py !== undefined && py !== false) {
          self.scroll.y = py / self.scrollratio.y | 0;
        }
        if (px !== undefined) {
          self.scroll.x = px / self.scrollratio.x | 0;
        }
      }

      self.cursor.css({
        height: self.cursorheight,
        top: self.scroll.y
      });
      if (self.cursorh) {
        var lx = self.hasreversehr ? self.scrollvaluemaxw - self.scroll.x : self.scroll.x;
        self.cursorh.css({
          width: self.cursorwidth,
          left: !self.rail.align && self.rail.visibility ? lx + self.rail.width : lx
        });
        self.cursoractive = true;
      }

      if (self.zoom) self.zoom.stop().css({
        opacity: opt.cursoropacitymax
      });
    };

    this.hideCursor = function (tm) {
      if (self.cursortimeout) return;
      if (!self.rail) return;
      if (!self.autohidedom) return;

      if (self.hasmousefocus && opt.autohidemode === "leave") return;
      self.cursortimeout = setTimeout(function () {
        if (!self.rail.active || !self.showonmouseevent) {
          self.autohidedom.stop().animate({
            opacity: opt.cursoropacitymin
          });
          if (self.zoom) self.zoom.stop().animate({
            opacity: opt.cursoropacitymin
          });
          self.cursoractive = false;
        }
        self.cursortimeout = 0;
      }, tm || opt.hidecursordelay);
    };

    this.noticeCursor = function (tm, py, px) {
      self.showCursor(py, px);
      if (!self.rail.active) self.hideCursor(tm);
    };

    this.getContentSize = self.ispage ? function () {
      return {
        w: Math.max(_doc.body.scrollWidth, _doc.documentElement.scrollWidth),
        h: Math.max(_doc.body.scrollHeight, _doc.documentElement.scrollHeight)
      };
    } : self.haswrapper ? function () {
      return {
        w: self.doc[0].offsetWidth,
        h: self.doc[0].offsetHeight
      };
    } : function () {
      return {
        w: self.docscroll[0].scrollWidth,
        h: self.docscroll[0].scrollHeight
      };
    };

    this.onResize = function (e, page) {

      if (!self || !self.win) return false;

      var premaxh = self.page.maxh,
          premaxw = self.page.maxw,
          previewh = self.view.h,
          previeww = self.view.w;

      self.view = {
        w: self.ispage ? self.win.width() : self.win[0].clientWidth,
        h: self.ispage ? self.win.height() : self.win[0].clientHeight
      };

      self.page = page ? page : self.getContentSize();

      self.page.maxh = Math.max(0, self.page.h - self.view.h);
      self.page.maxw = Math.max(0, self.page.w - self.view.w);

      if (self.page.maxh == premaxh && self.page.maxw == premaxw && self.view.w == previeww && self.view.h == previewh) {
        // test position        
        if (!self.ispage) {
          var pos = self.win.offset();
          if (self.lastposition) {
            var lst = self.lastposition;
            if (lst.top == pos.top && lst.left == pos.left) return self; //nothing to do            
          }
          self.lastposition = pos;
        } else {
          return self; //nothing to do
        }
      }

      if (self.page.maxh === 0) {
        self.hideRail();
        self.scrollvaluemax = 0;
        self.scroll.y = 0;
        self.scrollratio.y = 0;
        self.cursorheight = 0;
        self.setScrollTop(0);
        if (self.rail) self.rail.scrollable = false;
      } else {
        self.page.maxh -= opt.railpadding.top + opt.railpadding.bottom;
        self.rail.scrollable = true;
      }

      if (self.page.maxw === 0) {
        self.hideRailHr();
        self.scrollvaluemaxw = 0;
        self.scroll.x = 0;
        self.scrollratio.x = 0;
        self.cursorwidth = 0;
        self.setScrollLeft(0);
        if (self.railh) {
          self.railh.scrollable = false;
        }
      } else {
        self.page.maxw -= opt.railpadding.left + opt.railpadding.right;
        if (self.railh) self.railh.scrollable = opt.horizrailenabled;
      }

      self.railslocked = self.locked || self.page.maxh === 0 && self.page.maxw === 0;
      if (self.railslocked) {
        if (!self.ispage) self.updateScrollBar(self.view);
        return false;
      }

      if (!self.hidden) {
        if (!self.rail.visibility) self.showRail();
        if (self.railh && !self.railh.visibility) self.showRailHr();
      }

      if (self.istextarea && self.win.css('resize') && self.win.css('resize') != 'none') self.view.h -= 20;

      self.cursorheight = Math.min(self.view.h, Math.round(self.view.h * (self.view.h / self.page.h)));
      self.cursorheight = opt.cursorfixedheight ? opt.cursorfixedheight : Math.max(opt.cursorminheight, self.cursorheight);

      self.cursorwidth = Math.min(self.view.w, Math.round(self.view.w * (self.view.w / self.page.w)));
      self.cursorwidth = opt.cursorfixedheight ? opt.cursorfixedheight : Math.max(opt.cursorminheight, self.cursorwidth);

      self.scrollvaluemax = self.view.h - self.cursorheight - (opt.railpadding.top + opt.railpadding.bottom);
      if (!self.hasborderbox) self.scrollvaluemax -= self.cursor[0].offsetHeight - self.cursor[0].clientHeight;

      if (self.railh) {
        self.railh.width = self.page.maxh > 0 ? self.view.w - self.rail.width : self.view.w;
        self.scrollvaluemaxw = self.railh.width - self.cursorwidth - (opt.railpadding.left + opt.railpadding.right);
      }

      if (!self.ispage) self.updateScrollBar(self.view);

      self.scrollratio = {
        x: self.page.maxw / self.scrollvaluemaxw,
        y: self.page.maxh / self.scrollvaluemax
      };

      var sy = self.getScrollTop();
      if (sy > self.page.maxh) {
        self.doScrollTop(self.page.maxh);
      } else {
        self.scroll.y = self.getScrollTop() / self.scrollratio.y | 0;
        self.scroll.x = self.getScrollLeft() / self.scrollratio.x | 0;
        if (self.cursoractive) self.noticeCursor();
      }

      if (self.scroll.y && self.getScrollTop() === 0) self.doScrollTo(self.scroll.y * self.scrollratio.y | 0);

      return self;
    };

    this.resize = self.onResize;

    var hlazyresize = 0;

    this.onscreenresize = function (e) {
      clearTimeout(hlazyresize);

      var hiderails = !self.ispage && !self.haswrapper;
      if (hiderails) self.hideRails();

      hlazyresize = setTimeout(function () {
        if (self) {
          if (hiderails) self.showRails();
          self.resize();
        }
        hlazyresize = 0;
      }, 120);
    };

    this.lazyResize = function (tm) {
      // event debounce

      clearTimeout(hlazyresize);

      tm = isNaN(tm) ? 240 : tm;

      hlazyresize = setTimeout(function () {
        self && self.resize();
        hlazyresize = 0;
      }, tm);

      return self;
    };

    // derived by MDN https://developer.mozilla.org/en-US/docs/DOM/Mozilla_event_reference/wheel
    function _modernWheelEvent(dom, name, fn, bubble) {
      self._bind(dom, name, function (e) {
        e = e || _win.event;
        var event = {
          original: e,
          target: e.target || e.srcElement,
          type: "wheel",
          deltaMode: e.type == "MozMousePixelScroll" ? 0 : 1,
          deltaX: 0,
          deltaZ: 0,
          preventDefault: function preventDefault() {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            return false;
          },
          stopImmediatePropagation: function stopImmediatePropagation() {
            e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.cancelBubble = true;
          }
        };

        if (name == "mousewheel") {
          e.wheelDeltaX && (event.deltaX = -1 / 40 * e.wheelDeltaX);
          e.wheelDeltaY && (event.deltaY = -1 / 40 * e.wheelDeltaY);
          !event.deltaY && !event.deltaX && (event.deltaY = -1 / 40 * e.wheelDelta);
        } else {
          event.deltaY = e.detail;
        }

        return fn.call(dom, event);
      }, bubble);
    }

    this.jqbind = function (dom, name, fn) {
      // use jquery bind for non-native events (mouseenter/mouseleave)
      self.events.push({
        e: dom,
        n: name,
        f: fn,
        q: true
      });
      $(dom).on(name, fn);
    };

    this.mousewheel = function (dom, fn, bubble) {
      // bind mousewheel
      var el = "jquery" in dom ? dom[0] : dom;
      if ("onwheel" in _doc.createElement("div")) {
        // Modern browsers support "wheel"
        self._bind(el, "wheel", fn, bubble || false);
      } else {
        var wname = _doc.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll"; // older Webkit+IE support or older Firefox          
        _modernWheelEvent(el, wname, fn, bubble || false);
        if (wname == "DOMMouseScroll") _modernWheelEvent(el, "MozMousePixelScroll", fn, bubble || false); // Firefox legacy
      }
    };

    var passiveSupported = false;

    if (cap.haseventlistener) {
      // W3C standard event model

      // thanks to https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
      try {
        var options = Object.defineProperty({}, "passive", { get: function get() {
            passiveSupported = !0;
          } });_win.addEventListener("test", null, options);
      } catch (err) {}

      this.stopPropagation = function (e) {
        if (!e) return false;
        e = e.original ? e.original : e;
        e.stopPropagation();
        return false;
      };

      this.cancelEvent = function (e) {
        if (e.cancelable) e.preventDefault();
        e.stopImmediatePropagation();
        if (e.preventManipulation) e.preventManipulation(); // IE10+
        return false;
      };
    } else {

      // inspired from https://gist.github.com/jonathantneal/2415137      

      Event.prototype.preventDefault = function () {
        this.returnValue = false;
      };

      Event.prototype.stopPropagation = function () {
        this.cancelBubble = true;
      };

      _win.constructor.prototype.addEventListener = _doc.constructor.prototype.addEventListener = Element.prototype.addEventListener = function (type, listener, useCapture) {
        this.attachEvent("on" + type, listener);
      };
      _win.constructor.prototype.removeEventListener = _doc.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = function (type, listener, useCapture) {
        this.detachEvent("on" + type, listener);
      };

      // Thanks to http://www.switchonthecode.com !!
      this.cancelEvent = function (e) {
        e = e || _win.event;
        if (e) {
          e.cancelBubble = true;
          e.cancel = true;
          e.returnValue = false;
        }
        return false;
      };

      this.stopPropagation = function (e) {
        e = e || _win.event;
        if (e) e.cancelBubble = true;
        return false;
      };
    }

    this.delegate = function (dom, name, fn, bubble, active) {

      var de = delegatevents[name] || false;

      if (!de) {

        de = {
          a: [],
          l: [],
          f: function f(e) {
            var lst = de.l,
                l = lst.length - 1;
            var r = false;
            for (var a = l; a >= 0; a--) {
              r = lst[a].call(e.target, e);
              if (r === false) return false;
            }
            return r;
          }
        };

        self.bind(dom, name, de.f, bubble, active);

        delegatevents[name] = de;
      }

      if (self.ispage) {
        de.a = [self.id].concat(de.a);
        de.l = [fn].concat(de.l);
      } else {
        de.a.push(self.id);
        de.l.push(fn);
      }
    };

    this.undelegate = function (dom, name, fn, bubble, active) {
      var de = delegatevents[name] || false;
      if (de && de.l) {
        // quick fix #683
        for (var a = 0, l = de.l.length; a < l; a++) {
          if (de.a[a] === self.id) {
            de.a.splice(a);
            de.l.splice(a);
            if (de.a.length === 0) {
              self._unbind(dom, name, de.l.f);
              delegatevents[name] = null;
            }
          }
        }
      }
    };

    this.bind = function (dom, name, fn, bubble, active) {
      var el = "jquery" in dom ? dom[0] : dom;
      self._bind(el, name, fn, bubble || false, active || false);
    };

    this._bind = function (el, name, fn, bubble, active) {
      // primitive bind

      self.events.push({
        e: el,
        n: name,
        f: fn,
        b: bubble,
        q: false
      });

      passiveSupported && (active || el == window.document || el == window.document.body || el == window) ? el.addEventListener(name, fn, { passive: false, capture: bubble }) : el.addEventListener(name, fn, bubble || false);
    };

    this._unbind = function (el, name, fn, bub) {
      // primitive unbind
      if (delegatevents[name]) self.undelegate(el, name, fn, bub);else el.removeEventListener(name, fn, bub);
    };

    this.unbindAll = function () {
      for (var a = 0; a < self.events.length; a++) {
        var r = self.events[a];
        r.q ? r.e.unbind(r.n, r.f) : self._unbind(r.e, r.n, r.f, r.b);
      }
    };

    this.showRails = function () {
      return self.showRail().showRailHr();
    };

    this.showRail = function () {
      if (self.page.maxh !== 0 && (self.ispage || self.win.css('display') != 'none')) {
        //self.visibility = true;
        self.rail.visibility = true;
        self.rail.css('display', 'block');
      }
      return self;
    };

    this.showRailHr = function () {
      if (self.railh) {
        if (self.page.maxw !== 0 && (self.ispage || self.win.css('display') != 'none')) {
          self.railh.visibility = true;
          self.railh.css('display', 'block');
        }
      }
      return self;
    };

    this.hideRails = function () {
      return self.hideRail().hideRailHr();
    };

    this.hideRail = function () {
      //self.visibility = false;
      self.rail.visibility = false;
      self.rail.css('display', 'none');
      return self;
    };

    this.hideRailHr = function () {
      if (self.railh) {
        self.railh.visibility = false;
        self.railh.css('display', 'none');
      }
      return self;
    };

    this.show = function () {
      self.hidden = false;
      self.railslocked = false;
      return self.showRails();
    };

    this.hide = function () {
      self.hidden = true;
      self.railslocked = true;
      return self.hideRails();
    };

    this.toggle = function () {
      return self.hidden ? self.show() : self.hide();
    };

    this.remove = function () {
      self.stop();
      if (self.cursortimeout) clearTimeout(self.cursortimeout);
      for (var n in self.delaylist) {
        if (self.delaylist[n]) clearAnimationFrame(self.delaylist[n].h);
      }self.doZoomOut();
      self.unbindAll();

      if (cap.isie9) self.win[0].detachEvent("onpropertychange", self.onAttributeChange); //IE9 DOMAttrModified bug

      if (self.observer !== false) self.observer.disconnect();
      if (self.observerremover !== false) self.observerremover.disconnect();
      if (self.observerbody !== false) self.observerbody.disconnect();

      self.events = null;

      if (self.cursor) {
        self.cursor.remove();
      }
      if (self.cursorh) {
        self.cursorh.remove();
      }
      if (self.rail) {
        self.rail.remove();
      }
      if (self.railh) {
        self.railh.remove();
      }
      if (self.zoom) {
        self.zoom.remove();
      }
      for (var a = 0; a < self.saved.css.length; a++) {
        var d = self.saved.css[a];
        d[0].css(d[1], d[2] === undefined ? '' : d[2]);
      }
      self.saved = false;
      self.me.data('__nicescroll', ''); //erase all traces

      // memory leak fixed by GianlucaGuarini - thanks a lot!
      // remove the current nicescroll from the $.nicescroll array & normalize array
      var lst = $.nicescroll;
      lst.each(function (i) {
        if (!this) return;
        if (this.id === self.id) {
          delete lst[i];
          for (var b = ++i; b < lst.length; b++, i++) {
            lst[i] = lst[b];
          }lst.length--;
          if (lst.length) delete lst[lst.length];
        }
      });

      for (var i in self) {
        self[i] = null;
        delete self[i];
      }

      self = null;
    };

    this.scrollstart = function (fn) {
      this.onscrollstart = fn;
      return self;
    };
    this.scrollend = function (fn) {
      this.onscrollend = fn;
      return self;
    };
    this.scrollcancel = function (fn) {
      this.onscrollcancel = fn;
      return self;
    };

    this.zoomin = function (fn) {
      this.onzoomin = fn;
      return self;
    };
    this.zoomout = function (fn) {
      this.onzoomout = fn;
      return self;
    };

    this.isScrollable = function (e) {
      var dom = e.target ? e.target : e;
      if (dom.nodeName == 'OPTION') return true;
      while (dom && dom.nodeType == 1 && dom !== this.me[0] && !/^BODY|HTML/.test(dom.nodeName)) {
        var dd = $(dom);
        var ov = dd.css('overflowY') || dd.css('overflowX') || dd.css('overflow') || '';
        if (/scroll|auto/.test(ov)) return dom.clientHeight != dom.scrollHeight;
        dom = dom.parentNode ? dom.parentNode : false;
      }
      return false;
    };

    this.getViewport = function (me) {
      var dom = me && me.parentNode ? me.parentNode : false;
      while (dom && dom.nodeType == 1 && !/^BODY|HTML/.test(dom.nodeName)) {
        var dd = $(dom);
        if (/fixed|absolute/.test(dd.css("position"))) return dd;
        var ov = dd.css('overflowY') || dd.css('overflowX') || dd.css('overflow') || '';
        if (/scroll|auto/.test(ov) && dom.clientHeight != dom.scrollHeight) return dd;
        if (dd.getNiceScroll().length > 0) return dd;
        dom = dom.parentNode ? dom.parentNode : false;
      }
      return false;
    };

    this.triggerScrollStart = function (cx, cy, rx, ry, ms) {

      if (self.onscrollstart) {
        var info = {
          type: "scrollstart",
          current: {
            x: cx,
            y: cy
          },
          request: {
            x: rx,
            y: ry
          },
          end: {
            x: self.newscrollx,
            y: self.newscrolly
          },
          speed: ms
        };
        self.onscrollstart.call(self, info);
      }
    };

    this.triggerScrollEnd = function () {
      if (self.onscrollend) {

        var px = self.getScrollLeft();
        var py = self.getScrollTop();

        var info = {
          type: "scrollend",
          current: {
            x: px,
            y: py
          },
          end: {
            x: px,
            y: py
          }
        };

        self.onscrollend.call(self, info);
      }
    };

    var scrolldiry = 0,
        scrolldirx = 0,
        scrolltmr = 0,
        scrollspd = 1;

    function doScrollRelative(px, py, chkscroll, iswheel) {

      if (!self.scrollrunning) {
        self.newscrolly = self.getScrollTop();
        self.newscrollx = self.getScrollLeft();
        scrolltmr = now();
      }

      var gap = now() - scrolltmr;
      scrolltmr = now();

      if (gap > 350) {
        scrollspd = 1;
      } else {
        scrollspd += (2 - scrollspd) / 10;
      }

      px = px * scrollspd | 0;
      py = py * scrollspd | 0;

      if (px) {

        if (iswheel) {
          // mouse-only
          if (px < 0) {
            // fix apple magic mouse swipe back/forward
            if (self.getScrollLeft() >= self.page.maxw) return true;
          } else {
            if (self.getScrollLeft() <= 0) return true;
          }
        }

        var dx = px > 0 ? 1 : -1;

        if (scrolldirx !== dx) {
          if (self.scrollmom) self.scrollmom.stop();
          self.newscrollx = self.getScrollLeft();
          scrolldirx = dx;
        }

        self.lastdeltax -= px;
      }

      if (py) {

        var chk = function () {
          var top = self.getScrollTop();
          if (py < 0) {
            if (top >= self.page.maxh) return true;
          } else {
            if (top <= 0) return true;
          }
        }();

        if (chk) {
          if (opt.nativeparentscrolling && chkscroll && !self.ispage && !self.zoomactive) return true;
          var ny = self.view.h >> 1;
          if (self.newscrolly < -ny) {
            self.newscrolly = -ny;py = -1;
          } else if (self.newscrolly > self.page.maxh + ny) {
            self.newscrolly = self.page.maxh + ny;py = 1;
          } else py = 0;
        }

        var dy = py > 0 ? 1 : -1;

        if (scrolldiry !== dy) {
          if (self.scrollmom) self.scrollmom.stop();
          self.newscrolly = self.getScrollTop();
          scrolldiry = dy;
        }

        self.lastdeltay -= py;
      }

      if (py || px) {
        self.synched("relativexy", function () {

          var dty = self.lastdeltay + self.newscrolly;
          self.lastdeltay = 0;

          var dtx = self.lastdeltax + self.newscrollx;
          self.lastdeltax = 0;

          if (!self.rail.drag) self.doScrollPos(dtx, dty);
        });
      }
    }

    var hasparentscrollingphase = false;

    function execScrollWheel(e, hr, chkscroll) {
      var px, py;

      if (!chkscroll && hasparentscrollingphase) return true;

      if (e.deltaMode === 0) {
        // PIXEL
        px = -(e.deltaX * (opt.mousescrollstep / (18 * 3))) | 0;
        py = -(e.deltaY * (opt.mousescrollstep / (18 * 3))) | 0;
      } else if (e.deltaMode === 1) {
        // LINE
        px = -(e.deltaX * opt.mousescrollstep * 50 / 80) | 0;
        py = -(e.deltaY * opt.mousescrollstep * 50 / 80) | 0;
      }

      if (hr && opt.oneaxismousemode && px === 0 && py) {
        // classic vertical-only mousewheel + browser with x/y support 
        px = py;
        py = 0;

        if (chkscroll) {
          var hrend = px < 0 ? self.getScrollLeft() >= self.page.maxw : self.getScrollLeft() <= 0;
          if (hrend) {
            // preserve vertical scrolling
            py = px;
            px = 0;
          }
        }
      }

      // invert horizontal direction for rtl mode
      if (self.isrtlmode) px = -px;

      var chk = doScrollRelative(px, py, chkscroll, true);

      if (chk) {
        if (chkscroll) hasparentscrollingphase = true;
      } else {
        hasparentscrollingphase = false;
        e.stopImmediatePropagation();
        return e.preventDefault();
      }
    }

    this.onmousewheel = function (e) {
      if (self.wheelprevented || self.locked) return false;
      if (self.railslocked) {
        self.debounced("checkunlock", self.resize, 250);
        return false;
      }
      if (self.rail.drag) return self.cancelEvent(e);

      if (opt.oneaxismousemode === "auto" && e.deltaX !== 0) opt.oneaxismousemode = false; // check two-axis mouse support (not very elegant)

      if (opt.oneaxismousemode && e.deltaX === 0) {
        if (!self.rail.scrollable) {
          if (self.railh && self.railh.scrollable) {
            return self.onmousewheelhr(e);
          } else {
            return true;
          }
        }
      }

      var nw = now();
      var chk = false;
      if (opt.preservenativescrolling && self.checkarea + 600 < nw) {
        self.nativescrollingarea = self.isScrollable(e);
        chk = true;
      }
      self.checkarea = nw;
      if (self.nativescrollingarea) return true; // this isn't my business
      var ret = execScrollWheel(e, false, chk);
      if (ret) self.checkarea = 0;
      return ret;
    };

    this.onmousewheelhr = function (e) {
      if (self.wheelprevented) return;
      if (self.railslocked || !self.railh.scrollable) return true;
      if (self.rail.drag) return self.cancelEvent(e);

      var nw = now();
      var chk = false;
      if (opt.preservenativescrolling && self.checkarea + 600 < nw) {
        self.nativescrollingarea = self.isScrollable(e);
        chk = true;
      }
      self.checkarea = nw;
      if (self.nativescrollingarea) return true; // this is not my business
      if (self.railslocked) return self.cancelEvent(e);

      return execScrollWheel(e, true, chk);
    };

    this.stop = function () {
      self.cancelScroll();
      if (self.scrollmon) self.scrollmon.stop();
      self.cursorfreezed = false;
      self.scroll.y = Math.round(self.getScrollTop() * (1 / self.scrollratio.y));
      self.noticeCursor();
      return self;
    };

    this.getTransitionSpeed = function (dif) {

      return 80 + dif / 72 * opt.scrollspeed | 0;
    };

    if (!opt.smoothscroll) {
      this.doScrollLeft = function (x, spd) {
        //direct
        var y = self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };
      this.doScrollTop = function (y, spd) {
        //direct
        var x = self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };
      this.doScrollPos = function (x, y, spd) {
        //direct
        var nx = x > self.page.maxw ? self.page.maxw : x;
        if (nx < 0) nx = 0;
        var ny = y > self.page.maxh ? self.page.maxh : y;
        if (ny < 0) ny = 0;
        self.synched('scroll', function () {
          self.setScrollTop(ny);
          self.setScrollLeft(nx);
        });
      };
      this.cancelScroll = function () {}; // direct
    } else if (self.ishwscroll && cap.hastransition && opt.usetransition && !!opt.smoothscroll) {

      var lasttransitionstyle = '';

      this.resetTransition = function () {
        lasttransitionstyle = '';
        self.doc.css(cap.prefixstyle + 'transition-duration', '0ms');
      };

      this.prepareTransition = function (dif, istime) {
        var ex = istime ? dif : self.getTransitionSpeed(dif);
        var trans = ex + 'ms';
        if (lasttransitionstyle !== trans) {
          lasttransitionstyle = trans;
          self.doc.css(cap.prefixstyle + 'transition-duration', trans);
        }
        return ex;
      };

      this.doScrollLeft = function (x, spd) {
        //trans
        var y = self.scrollrunning ? self.newscrolly : self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollTop = function (y, spd) {
        //trans
        var x = self.scrollrunning ? self.newscrollx : self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };

      this.cursorupdate = {
        running: false,
        start: function start() {
          var m = this;

          if (m.running) return;
          m.running = true;

          var loop = function loop() {
            if (m.running) setAnimationFrame(loop);
            self.showCursor(self.getScrollTop(), self.getScrollLeft());
            self.notifyScrollEvent(self.win[0]);
          };

          setAnimationFrame(loop);
        },
        stop: function stop() {
          this.running = false;
        }
      };

      this.doScrollPos = function (x, y, spd) {
        //trans

        var py = self.getScrollTop();
        var px = self.getScrollLeft();

        if ((self.newscrolly - py) * (y - py) < 0 || (self.newscrollx - px) * (x - px) < 0) self.cancelScroll(); //inverted movement detection      

        if (!opt.bouncescroll) {
          if (y < 0) y = 0;else if (y > self.page.maxh) y = self.page.maxh;
          if (x < 0) x = 0;else if (x > self.page.maxw) x = self.page.maxw;
        } else {
          if (y < 0) y = y / 2 | 0;else if (y > self.page.maxh) y = self.page.maxh + (y - self.page.maxh) / 2 | 0;
          if (x < 0) x = x / 2 | 0;else if (x > self.page.maxw) x = self.page.maxw + (x - self.page.maxw) / 2 | 0;
        }

        if (self.scrollrunning && x == self.newscrollx && y == self.newscrolly) return false;

        self.newscrolly = y;
        self.newscrollx = x;

        var top = self.getScrollTop();
        var lft = self.getScrollLeft();

        var dst = {};
        dst.x = x - lft;
        dst.y = y - top;

        var dd = Math.sqrt(dst.x * dst.x + dst.y * dst.y) | 0;

        var ms = self.prepareTransition(dd);

        if (!self.scrollrunning) {
          self.scrollrunning = true;
          self.triggerScrollStart(lft, top, x, y, ms);
          self.cursorupdate.start();
        }

        self.scrollendtrapped = true;

        if (!cap.transitionend) {
          if (self.scrollendtrapped) clearTimeout(self.scrollendtrapped);
          self.scrollendtrapped = setTimeout(self.onScrollTransitionEnd, ms); // simulate transitionend event
        }

        self.setScrollTop(self.newscrolly);
        self.setScrollLeft(self.newscrollx);
      };

      this.cancelScroll = function () {
        if (!self.scrollendtrapped) return true;
        var py = self.getScrollTop();
        var px = self.getScrollLeft();
        self.scrollrunning = false;
        if (!cap.transitionend) clearTimeout(cap.transitionend);
        self.scrollendtrapped = false;
        self.resetTransition();
        self.setScrollTop(py); // fire event onscroll
        if (self.railh) self.setScrollLeft(px);
        if (self.timerscroll && self.timerscroll.tm) clearInterval(self.timerscroll.tm);
        self.timerscroll = false;

        self.cursorfreezed = false;

        self.cursorupdate.stop();
        self.showCursor(py, px);
        return self;
      };

      this.onScrollTransitionEnd = function () {

        if (!self.scrollendtrapped) return;

        var py = self.getScrollTop();
        var px = self.getScrollLeft();

        if (py < 0) py = 0;else if (py > self.page.maxh) py = self.page.maxh;
        if (px < 0) px = 0;else if (px > self.page.maxw) px = self.page.maxw;
        if (py != self.newscrolly || px != self.newscrollx) return self.doScrollPos(px, py, opt.snapbackspeed);

        if (self.scrollrunning) self.triggerScrollEnd();
        self.scrollrunning = false;

        self.scrollendtrapped = false;
        self.resetTransition();
        self.timerscroll = false;
        self.setScrollTop(py); // fire event onscroll        
        if (self.railh) self.setScrollLeft(px); // fire event onscroll left

        self.cursorupdate.stop();
        self.noticeCursor(false, py, px);

        self.cursorfreezed = false;
      };
    } else {

      this.doScrollLeft = function (x, spd) {
        //no-trans
        var y = self.scrollrunning ? self.newscrolly : self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollTop = function (y, spd) {
        //no-trans
        var x = self.scrollrunning ? self.newscrollx : self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollPos = function (x, y, spd) {
        //no-trans

        var py = self.getScrollTop();
        var px = self.getScrollLeft();

        if ((self.newscrolly - py) * (y - py) < 0 || (self.newscrollx - px) * (x - px) < 0) self.cancelScroll(); //inverted movement detection

        var clipped = false;

        if (!self.bouncescroll || !self.rail.visibility) {
          if (y < 0) {
            y = 0;
            clipped = true;
          } else if (y > self.page.maxh) {
            y = self.page.maxh;
            clipped = true;
          }
        }
        if (!self.bouncescroll || !self.railh.visibility) {
          if (x < 0) {
            x = 0;
            clipped = true;
          } else if (x > self.page.maxw) {
            x = self.page.maxw;
            clipped = true;
          }
        }

        if (self.scrollrunning && self.newscrolly === y && self.newscrollx === x) return true;

        self.newscrolly = y;
        self.newscrollx = x;

        self.dst = {};
        self.dst.x = x - px;
        self.dst.y = y - py;
        self.dst.px = px;
        self.dst.py = py;

        var dd = Math.sqrt(self.dst.x * self.dst.x + self.dst.y * self.dst.y) | 0;
        var ms = self.getTransitionSpeed(dd);

        self.bzscroll = {};

        var p3 = clipped ? 1 : 0.58;
        self.bzscroll.x = new BezierClass(px, self.newscrollx, ms, 0, 0, p3, 1);
        self.bzscroll.y = new BezierClass(py, self.newscrolly, ms, 0, 0, p3, 1);

        var loopid = now();

        var loop = function loop() {

          if (!self.scrollrunning) return;
          var x = self.bzscroll.y.getPos();

          self.setScrollLeft(self.bzscroll.x.getNow());
          self.setScrollTop(self.bzscroll.y.getNow());

          if (x <= 1) {
            self.timer = setAnimationFrame(loop);
          } else {
            self.scrollrunning = false;
            self.timer = 0;
            self.triggerScrollEnd();
          }
        };

        if (!self.scrollrunning) {
          self.triggerScrollStart(px, py, x, y, ms);
          self.scrollrunning = true;
          self.timer = setAnimationFrame(loop);
        }
      };

      this.cancelScroll = function () {
        if (self.timer) clearAnimationFrame(self.timer);
        self.timer = 0;
        self.bzscroll = false;
        self.scrollrunning = false;
        return self;
      };
    }

    this.doScrollBy = function (stp, relative) {
      doScrollRelative(0, stp);
    };

    this.doScrollLeftBy = function (stp, relative) {
      doScrollRelative(stp, 0);
    };

    this.doScrollTo = function (pos, relative) {
      var ny = relative ? Math.round(pos * self.scrollratio.y) : pos;
      if (ny < 0) ny = 0;else if (ny > self.page.maxh) ny = self.page.maxh;
      self.cursorfreezed = false;
      self.doScrollTop(pos);
    };

    this.checkContentSize = function () {
      var pg = self.getContentSize();
      if (pg.h != self.page.h || pg.w != self.page.w) self.resize(false, pg);
    };

    self.onscroll = function (e) {
      if (self.rail.drag) return;
      if (!self.cursorfreezed) {
        self.synched('scroll', function () {
          self.scroll.y = Math.round(self.getScrollTop() / self.scrollratio.y);
          if (self.railh) self.scroll.x = Math.round(self.getScrollLeft() / self.scrollratio.x);
          self.noticeCursor();
        });
      }
    };
    self.bind(self.docscroll, "scroll", self.onscroll);

    this.doZoomIn = function (e) {
      if (self.zoomactive) return;
      self.zoomactive = true;

      self.zoomrestore = {
        style: {}
      };
      var lst = ['position', 'top', 'left', 'zIndex', 'backgroundColor', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight'];
      var win = self.win[0].style;
      for (var a in lst) {
        var pp = lst[a];
        self.zoomrestore.style[pp] = win[pp] !== undefined ? win[pp] : '';
      }

      self.zoomrestore.style.width = self.win.css('width');
      self.zoomrestore.style.height = self.win.css('height');

      self.zoomrestore.padding = {
        w: self.win.outerWidth() - self.win.width(),
        h: self.win.outerHeight() - self.win.height()
      };

      if (cap.isios4) {
        self.zoomrestore.scrollTop = $window.scrollTop();
        $window.scrollTop(0);
      }

      self.win.css({
        position: cap.isios4 ? "absolute" : "fixed",
        top: 0,
        left: 0,
        zIndex: globalmaxzindex + 100,
        margin: 0
      });
      var bkg = self.win.css("backgroundColor");
      if ("" === bkg || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(bkg)) self.win.css("backgroundColor", "#fff");
      self.rail.css({
        zIndex: globalmaxzindex + 101
      });
      self.zoom.css({
        zIndex: globalmaxzindex + 102
      });
      self.zoom.css('backgroundPosition', '0 -18px');
      self.resizeZoom();

      if (self.onzoomin) self.onzoomin.call(self);

      return self.cancelEvent(e);
    };

    this.doZoomOut = function (e) {
      if (!self.zoomactive) return;
      self.zoomactive = false;

      self.win.css("margin", "");
      self.win.css(self.zoomrestore.style);

      if (cap.isios4) {
        $window.scrollTop(self.zoomrestore.scrollTop);
      }

      self.rail.css({
        "z-index": self.zindex
      });
      self.zoom.css({
        "z-index": self.zindex
      });
      self.zoomrestore = false;
      self.zoom.css('backgroundPosition', '0 0');
      self.onResize();

      if (self.onzoomout) self.onzoomout.call(self);

      return self.cancelEvent(e);
    };

    this.doZoom = function (e) {
      return self.zoomactive ? self.doZoomOut(e) : self.doZoomIn(e);
    };

    this.resizeZoom = function () {
      if (!self.zoomactive) return;

      var py = self.getScrollTop(); //preserve scrolling position
      self.win.css({
        width: $window.width() - self.zoomrestore.padding.w + "px",
        height: $window.height() - self.zoomrestore.padding.h + "px"
      });
      self.onResize();

      self.setScrollTop(Math.min(self.page.maxh, py));
    };

    this.init();

    $.nicescroll.push(this);
  };

  // Inspired by the work of Kin Blas
  // http://webpro.host.adobe.com/people/jblas/momentum/includes/jquery.momentum.0.7.js  
  var ScrollMomentumClass2D = function ScrollMomentumClass2D(nc) {
    var self = this;
    this.nc = nc;

    this.lastx = 0;
    this.lasty = 0;
    this.speedx = 0;
    this.speedy = 0;
    this.lasttime = 0;
    this.steptime = 0;
    this.snapx = false;
    this.snapy = false;
    this.demulx = 0;
    this.demuly = 0;

    this.lastscrollx = -1;
    this.lastscrolly = -1;

    this.chkx = 0;
    this.chky = 0;

    this.timer = 0;

    this.reset = function (px, py) {
      self.stop();
      self.steptime = 0;
      self.lasttime = now();
      self.speedx = 0;
      self.speedy = 0;
      self.lastx = px;
      self.lasty = py;
      self.lastscrollx = -1;
      self.lastscrolly = -1;
    };

    this.update = function (px, py) {
      var tm = now();
      self.steptime = tm - self.lasttime;
      self.lasttime = tm;
      var dy = py - self.lasty;
      var dx = px - self.lastx;
      var sy = self.nc.getScrollTop();
      var sx = self.nc.getScrollLeft();
      var newy = sy + dy;
      var newx = sx + dx;
      self.snapx = newx < 0 || newx > self.nc.page.maxw;
      self.snapy = newy < 0 || newy > self.nc.page.maxh;
      self.speedx = dx;
      self.speedy = dy;
      self.lastx = px;
      self.lasty = py;
    };

    this.stop = function () {
      self.nc.unsynched("domomentum2d");
      if (self.timer) clearTimeout(self.timer);
      self.timer = 0;
      self.lastscrollx = -1;
      self.lastscrolly = -1;
    };

    this.doSnapy = function (nx, ny) {
      var snap = false;

      if (ny < 0) {
        ny = 0;
        snap = true;
      } else if (ny > self.nc.page.maxh) {
        ny = self.nc.page.maxh;
        snap = true;
      }

      if (nx < 0) {
        nx = 0;
        snap = true;
      } else if (nx > self.nc.page.maxw) {
        nx = self.nc.page.maxw;
        snap = true;
      }

      snap ? self.nc.doScrollPos(nx, ny, self.nc.opt.snapbackspeed) : self.nc.triggerScrollEnd();
    };

    this.doMomentum = function (gp) {
      var t = now();
      var l = gp ? t + gp : self.lasttime;

      var sl = self.nc.getScrollLeft();
      var st = self.nc.getScrollTop();

      var pageh = self.nc.page.maxh;
      var pagew = self.nc.page.maxw;

      self.speedx = pagew > 0 ? Math.min(60, self.speedx) : 0;
      self.speedy = pageh > 0 ? Math.min(60, self.speedy) : 0;

      var chk = l && t - l <= 60;

      if (st < 0 || st > pageh || sl < 0 || sl > pagew) chk = false;

      var sy = self.speedy && chk ? self.speedy : false;
      var sx = self.speedx && chk ? self.speedx : false;

      if (sy || sx) {
        var tm = Math.max(16, self.steptime); //timeout granularity

        if (tm > 50) {
          // do smooth
          var xm = tm / 50;
          self.speedx *= xm;
          self.speedy *= xm;
          tm = 50;
        }

        self.demulxy = 0;

        self.lastscrollx = self.nc.getScrollLeft();
        self.chkx = self.lastscrollx;
        self.lastscrolly = self.nc.getScrollTop();
        self.chky = self.lastscrolly;

        var nx = self.lastscrollx;
        var ny = self.lastscrolly;

        var onscroll = function onscroll() {
          var df = now() - t > 600 ? 0.04 : 0.02;

          if (self.speedx) {
            nx = Math.floor(self.lastscrollx - self.speedx * (1 - self.demulxy));
            self.lastscrollx = nx;
            if (nx < 0 || nx > pagew) df = 0.10;
          }

          if (self.speedy) {
            ny = Math.floor(self.lastscrolly - self.speedy * (1 - self.demulxy));
            self.lastscrolly = ny;
            if (ny < 0 || ny > pageh) df = 0.10;
          }

          self.demulxy = Math.min(1, self.demulxy + df);

          self.nc.synched("domomentum2d", function () {

            if (self.speedx) {
              var scx = self.nc.getScrollLeft();
              //              if (scx != self.chkx) self.stop();
              self.chkx = nx;
              self.nc.setScrollLeft(nx);
            }

            if (self.speedy) {
              var scy = self.nc.getScrollTop();
              //              if (scy != self.chky) self.stop();
              self.chky = ny;
              self.nc.setScrollTop(ny);
            }

            if (!self.timer) {
              self.nc.hideCursor();
              self.doSnapy(nx, ny);
            }
          });

          if (self.demulxy < 1) {
            self.timer = setTimeout(onscroll, tm);
          } else {
            self.stop();
            self.nc.hideCursor();
            self.doSnapy(nx, ny);
          }
        };

        onscroll();
      } else {
        self.doSnapy(self.nc.getScrollLeft(), self.nc.getScrollTop());
      }
    };
  };

  // override jQuery scrollTop
  var _scrollTop = jQuery.fn.scrollTop; // preserve original function

  jQuery.cssHooks.pageYOffset = {
    get: function get(elem, computed, extra) {
      var nice = $.data(elem, '__nicescroll') || false;
      return nice && nice.ishwscroll ? nice.getScrollTop() : _scrollTop.call(elem);
    },
    set: function set(elem, value) {
      var nice = $.data(elem, '__nicescroll') || false;
      nice && nice.ishwscroll ? nice.setScrollTop(parseInt(value)) : _scrollTop.call(elem, value);
      return this;
    }
  };

  jQuery.fn.scrollTop = function (value) {
    if (value === undefined) {
      var nice = this[0] ? $.data(this[0], '__nicescroll') || false : false;
      return nice && nice.ishwscroll ? nice.getScrollTop() : _scrollTop.call(this);
    } else {
      return this.each(function () {
        var nice = $.data(this, '__nicescroll') || false;
        nice && nice.ishwscroll ? nice.setScrollTop(parseInt(value)) : _scrollTop.call($(this), value);
      });
    }
  };

  // override jQuery scrollLeft
  var _scrollLeft = jQuery.fn.scrollLeft; // preserve original function

  $.cssHooks.pageXOffset = {
    get: function get(elem, computed, extra) {
      var nice = $.data(elem, '__nicescroll') || false;
      return nice && nice.ishwscroll ? nice.getScrollLeft() : _scrollLeft.call(elem);
    },
    set: function set(elem, value) {
      var nice = $.data(elem, '__nicescroll') || false;
      nice && nice.ishwscroll ? nice.setScrollLeft(parseInt(value)) : _scrollLeft.call(elem, value);
      return this;
    }
  };

  jQuery.fn.scrollLeft = function (value) {
    if (value === undefined) {
      var nice = this[0] ? $.data(this[0], '__nicescroll') || false : false;
      return nice && nice.ishwscroll ? nice.getScrollLeft() : _scrollLeft.call(this);
    } else {
      return this.each(function () {
        var nice = $.data(this, '__nicescroll') || false;
        nice && nice.ishwscroll ? nice.setScrollLeft(parseInt(value)) : _scrollLeft.call($(this), value);
      });
    }
  };

  var NiceScrollArray = function NiceScrollArray(doms) {
    var self = this;
    this.length = 0;
    this.name = "nicescrollarray";

    this.each = function (fn) {
      $.each(self, fn);
      return self;
    };

    this.push = function (nice) {
      self[self.length] = nice;
      self.length++;
    };

    this.eq = function (idx) {
      return self[idx];
    };

    if (doms) {
      for (var a = 0; a < doms.length; a++) {
        var nice = $.data(doms[a], '__nicescroll') || false;
        if (nice) {
          this[this.length] = nice;
          this.length++;
        }
      }
    }

    return this;
  };

  function mplex(el, lst, fn) {
    for (var a = 0, l = lst.length; a < l; a++) {
      fn(el, lst[a]);
    }
  }
  mplex(NiceScrollArray.prototype, ['show', 'hide', 'toggle', 'onResize', 'resize', 'remove', 'stop', 'doScrollPos'], function (e, n) {
    e[n] = function () {
      var args = arguments;
      return this.each(function () {
        this[n].apply(this, args);
      });
    };
  });

  jQuery.fn.getNiceScroll = function (index) {
    if (index === undefined) {
      return new NiceScrollArray(this);
    } else {
      return this[index] && $.data(this[index], '__nicescroll') || false;
    }
  };

  var pseudos = jQuery.expr.pseudos || jQuery.expr[':']; // jQuery 3 migration
  pseudos.nicescroll = function (a) {
    return $.data(a, '__nicescroll') !== undefined;
  };

  $.fn.niceScroll = function (wrapper, _opt) {
    if (_opt === undefined && (typeof wrapper === 'undefined' ? 'undefined' : _typeof(wrapper)) == "object" && !("jquery" in wrapper)) {
      _opt = wrapper;
      wrapper = false;
    }

    var ret = new NiceScrollArray();

    this.each(function () {
      var $this = $(this);

      var opt = $.extend({}, _opt); // cloning

      if (wrapper || false) {
        var wrp = $(wrapper);
        opt.doc = wrp.length > 1 ? $(wrapper, $this) : wrp;
        opt.win = $this;
      }
      var docundef = !("doc" in opt);
      if (!docundef && !("win" in opt)) opt.win = $this;

      var nice = $this.data('__nicescroll') || false;
      if (!nice) {
        opt.doc = opt.doc || $this;
        nice = new NiceScrollClass(opt, $this);
        $this.data('__nicescroll', nice);
      }
      ret.push(nice);
    });

    return ret.length === 1 ? ret[0] : ret;
  };

  _win.NiceScroll = {
    getjQuery: function getjQuery() {
      return jQuery;
    }
  };

  if (!$.nicescroll) {
    $.nicescroll = new NiceScrollArray();
    $.nicescroll.options = _globaloptions;
  }
});