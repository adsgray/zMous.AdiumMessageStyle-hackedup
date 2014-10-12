// map certain senders to a style
// and map specific sender message contents to finer-grained styles

// pattern: regex, name: css class for sender, message: css class for message
// In messagemap:
// pattern: regex, message: (additional) css class for message
var colormap = [
    {"pattern": /Jenkins/i, "name": "jenkins-sender", "message": "jenkins-message",
        "messagemap" : [ { "pattern": /failure/i, "message" : "fail" } ]
    },
    {"pattern": /Github/i, "name": "github-sender", "message": "github-message",
        "messagemap": []
    },
];

var senderSelector = ".xxxsender";
var messageSelector = ".xxxmessage";
var doneclass = "colorsenderdone";

// http://stackoverflow.com/questions/5898656/test-if-an-element-contains-a-class
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function addClass(node, klass) {
    if (node != null && klass != null) {
        node.className = node.className + " " + klass;
    }
}

function do_colorsender(node) {

    // hopefully a fast return
    if (hasClass(node, doneclass)) {
        return;
    }

    var len = colormap.length;

    for (var i = 0; i < len; i++) {
        var s = node.querySelector(senderSelector);
        var m = node.querySelector(messageSelector);

        if (s.innerHTML.match(colormap[i].pattern)) {
            addClass(s, colormap[i].name);
            addClass(m, colormap[i].message)
        }

        // different message contents can add more classes
        if (colormap[i].messagemap.length > 0) {
            for (var j = 0; j < colormap[i].messagemap.length; j++) {
                if (m.innerHTML.match(colormap[i].messagemap[j].pattern)) {
                    addClass(m, colormap[i].messagemap[j].message)
                }
            }
        }
    }

    // ok we've looked at this one, mark it:
    addClass(node, doneclass);
}

function trace(msg) {
    var node = document.createElement("div");
    var debugCon = document.getElementById("debugdiv");
    node.innerHTML = msg;
    debugCon.appendChild(node);
}
                            
function colorsenders() {
    // loop over every div of class xxxwrapper
    // call do_colorsender(node) for it
    // be smart and only look at them once. do_colorsender() adds the class
    // "colorsenderdone" to them.
    // Not even sure if that works...

    var nodes = document.querySelectorAll('div.xxxwrapper:not([class="' + doneclass + '"])');

    for (var ct = 0; ct < nodes.length; ct++) {
      do_colorsender(nodes[ct]);
    }
}

