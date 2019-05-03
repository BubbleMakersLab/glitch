var ShareThisViaNotes  = (function() {
    var article = document.querySelector("article");
    function isTextUnique(text) {
        return article.textContent.split(text).length === 2;
    }
    function isValidNote(note) {
        return note.comment && isTextUnique(note.reference);
    }
    function findNoteByText(text) {
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].text === text) return notes[i];
        }
    }
    function saveNotes() {
        if (notes.length)
            localStorage["share-this-notes"] = JSON.stringify(notes);
        else delete localStorage["share-this-notes"];
    }
    function buildNoteRange(text) {
        var boundaries = findTextBoundaries(article, text);
        if (!boundaries) return null;

        var range = document.createRange();
        range.setStart(boundaries.start.node, boundaries.start.offset);
        range.setEnd(boundaries.end.node, boundaries.end.offset);

        return range.toString() === text ? range : null;
    }
    function findTextBoundaries(root, text) {
        var startIndex = root.textContent.indexOf(text);
        var endIndex = startIndex + text.length;

        var iterator = document.createNodeIterator(root, NodeFilter.SHOW_TEXT, null);
        var offset = 0;
        var node;
        var buildText = "";

        while (offset <= startIndex) {
            node = iterator.nextNode();
            if (!node) return null;
            offset += node.nodeValue.length;
            buildText += node.nodeValue;
        }
        var startNode = node;
        var startOffset = startIndex - offset + node.nodeValue.length;

        while (offset < endIndex) {
            node = iterator.nextNode();
            if (!node) return null;
            offset += node.nodeValue.length;
        }
        var endNode = node;
        var endOffset = endIndex - offset + node.nodeValue.length;

        return {
            start: {
                node: startNode,
                offset: startOffset
            },
            end: {
                node: endNode,
                offset: endOffset
            }
        };
    }
    function buildNote(note) {
        var range = buildNoteRange(note.reference);
        if (!range) return;

        var wrapper = document.createElement("div");
        wrapper.note = note;
        wrapper.className = "note-wrapper";
        wrapper.innerHTML = "<div class='note-reference'></div><div class='note-box'><div class='note-comment'></div>"
                + "<div class='note-toolbar'><button type='button' class='edit-note'>&#9998;</button><button type='button' class='remove-note'>&#10006;</button></div></div>";
        var referenceContainer = wrapper.firstChild;
        var box = wrapper.lastChild;

        var rangeRect = range.getBoundingClientRect();
        var pageOffset = getPageOffset();
        toArray(range.getClientRects()).forEach(function(rect) {
            var span = document.createElement("span");
            span.style.top = rect.top - pageOffset.top + "px";
            span.style.left = rect.left - pageOffset.left + "px";
            span.style.width = rect.width + "px";
            span.style.height = rect.height + "px";
            referenceContainer.appendChild(span);
        });

        box.style.top = rangeRect.top - pageOffset.top + "px";
        box.firstChild.innerHTML = note.comment;

        document.body.appendChild(wrapper);
        return wrapper;
    }
    function editNote(wrapper) {
        var comment = getCommentField(wrapper);
        comment.contentEditable = true;
        comment.focus();
        setCaretAtEnd(comment);
        selectWrapper(wrapper);
    }
    function setCaretAtEnd(field) {
        var range = document.createRange();
        range.selectNodeContents(field);
        range.collapse(false);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
    function findNoteWrapper(note) {
        var wrappers = document.querySelectorAll(".note-wrapper");
        for (var i = 0; i < wrappers.length; i++) {
            if (wrappers[i].note === note) return wrappers[i];
        }
    }
    function getPageOffset() {
        return document.documentElement.getBoundingClientRect();
    }

    function getNoteWrapper(element) {
        while (element && element.classList) {
            if (element.classList.contains("note-wrapper")) {
                return element;
            }
            element = element.parentNode;
        }
    }
    function getCommentField(wrapper) {
        return wrapper && wrapper.querySelector(".note-comment");
    }
    function selectWrapper(wrapper) {
        toArray(document.querySelectorAll(".note-wrapper.is-selected")).forEach(function(wrp) {
            // wrp.classList.remove("is-selected");
        });
        if (wrapper) wrapper.classList.add("is-selected");
    }

    function removeNote(wrapper) {
        var noteIdx = notes.indexOf(wrapper.note);
        if (noteIdx >= 0) {
            notes.splice(noteIdx, 1);
            saveNotes();
        }
        document.body.removeChild(wrapper);
    }
    function cancelEdit(wrapper) {
        const comment = getCommentField(wrapper);
        comment.contentEditable = false;
        // wrapper.classList.remove("is-selected");
        var note = wrapper.note;
        if (notes.indexOf(note) === -1) {
            document.body.removeChild(wrapper);
        } else {
            comment.innerHTML = note.comment;
        }
    }
    function saveEdit(wrapper) {
        const comment = getCommentField(wrapper);
        var content = comment.innerHTML.trim();
        if (!content) return removeNote(wrapper)

        comment.contentEditable = false;
        // wrapper.classList.remove("is-selected");
        var note = wrapper.note;
        if (notes.indexOf(note) === -1) {
            notes.push(note);
        }
        note.comment = content;
        note.edited = new Date().toJSON();
        saveNotes();
    }

    var toArray = Array.from || function(list) {
        return Array.prototype.slice.call(list);
    };

    var notes = JSON.parse(localStorage["share-this-notes"] || "[]").filter(isValidNote);
    notes.forEach(buildNote);
    saveNotes();

    document.addEventListener("keyup", function(event) {
        var wrapper = getNoteWrapper(event.target);
        var comment = getCommentField(wrapper);
        if (comment !== event.target) return;

        if (event.keyCode === 27) {
            cancelEdit(wrapper);
        } else if (event.keyCode === 13) {
            saveEdit(wrapper);
        }
    });
    document.addEventListener("keypress", function(event) {
        if (event.keyCode !== 13) return;
        var wrapper = getNoteWrapper(event.target);
        var comment = getCommentField(wrapper);
        if (comment === event.target) event.preventDefault();
    });
    document.addEventListener("click", function(event) {
        var wrapper = getNoteWrapper(event.target);
        selectWrapper(wrapper);

        if (event.target.classList.contains("remove-note")) {
            removeNote(wrapper);
        } else if (event.target.classList.contains("edit-note")) {
            editNote(wrapper);
        }
    })

    return {
        name: "notes",
        render: function(text, rawText) {
            this.rawText = rawText;
            return `<a title="Write a note about it" href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 75"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:4.82px;}.cls-2{fill:#fff;}</style></defs><path class="cls-1" d="M78.45,77.56,65.22,65.64H24a6.44,6.44,0,0,1-6.45-6.44V24.88A6.45,6.45,0,0,1,24,18.44H72a6.45,6.45,0,0,1,6.45,6.44Z" transform="translate(-15.14 -16.03)"/><polygon class="cls-2" points="36.31 12.28 29.41 12.28 29.41 22.56 19.13 22.56 19.13 29.46 29.41 29.46 29.41 39.74 36.31 39.74 36.31 29.46 46.59 29.46 46.59 22.56 36.31 22.56 36.31 12.28 36.31 12.28"/></svg></a>`;
        },
        active: function(text, rawText) {
            return isTextUnique(rawText);
        },
        action: function(event) {
            event.preventDefault();
            event.stopPropagation();
            var note = findNoteByText(this.rawText);
            var wrapper;
            if (note) {
                wrapper = findNoteWrapper(note);
            } else {
                note = {
                    reference: this.rawText,
                    comment: ""
                };
                wrapper = buildNote(note);
            }
            editNote(wrapper);
        }
    };
})();
