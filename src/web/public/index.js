var g_editor_script = undefined,
    g_editor_request = undefined,
    g_examples = {},
    g_scroll = {};

// 
// Navaction Events
//
$("#navBrand").click(function () {
    activateTab.call (this);
    $("#contentBrand").show();
    return false;
});

$("#navExamples").click(function () {
    activateTab.call (this);
    showTab ("contentExamples");
    return false;
});

$("#navEdit").click(function () {
    activateTab.call (this);
    showTab ("contentEdit");
    g_editor_script.resize();
    g_editor_script.renderer.updateFull();
    return false;
});

$("#navRequest").click(function () {
    activateTab.call (this);
    showTab ("contentRequest");
    g_editor_request.resize();
    g_editor_request.renderer.updateFull();
    return false;
});

$("#navResponse").click(function () {
    activateTab.call (this);
    $(this).children().text("");
    showTab ("contentResponse");
    return false;
});

$("#navLogs").click(function () {
    activateTab.call (this);
    $(this).children().text("");
    showTab ("contentLogs");
    return false;
});

$("#navAPI").click(function () {
    activateTab.call (this);
    showTab ("contentAPI");
    return false;
});

$("#navAbout").click(function () {
    activateTab.call (this);
    showTab ("contentAbout");
    return false;
});

function showTab (tab) {
    $("#"+tab).show();
    window.scrollTo(0, g_scroll[tab]);
}

function activateTab () {
    g_scroll[$(".content:visible").attr('id')] = window.pageYOffset;
    $(".nav li").removeClass('active');
    $(this).closest("li").addClass("active");
    $(".content").hide();
}

function filterLogs (logs, txid) {
    var result = '',
        lines = logs.split(/(?:\n|\r\n|\r)/g),
        stamp = "", found = false;

    lines.forEach (function (line) {
        if (line.indexOf ('[gatewayscript]') !== -1 ||
	    line.indexOf ('[gatewayscript-user]') !== -1) {
	    found = true;
	    stamp = line.slice (0, 11);
            result += line + '\n';
        }
	else if (found && line.slice (0, 11) !== stamp) {
	    result += line + '\n';
	}
	else found = false;
    });

    if ($('#contentLogsPre').text() === '') {
        $('#navLogs').children().text(1);
    }
    $('#contentLogsPre')
        .text(new Date() + ' Logs corresponding to transaction id ('+txid+')\n'+ result);
};

function grabTxLogs (txid, attempts) {

    var request = $.ajax({
        url: '/grab_tx_logs',
        headers: { "my-dp-txid": txid }
    });
    
    request.done (function (data, status, jqXHR) {
        if (data.length > 0) {
            filterLogs (data, txid);
        }
        if (--attempts > 0) {
            setTimeout (function () {
                grabTxLogs (txid, attempts);
            }, 1000);
        }
    });
    
    request.fail(function (jqXHR, status) {
        $('#contentLogsPre').text(
            'Failed to grab logs corresponding to transaction id ('+txid+')\n'+ jqXHR.responseText);
        $('#navLogs').children().text(1);
    });
};

$("#contentRequest").delegate('#requestHeaders tr td', 'click', function (e) {
    var key = $(this).parent().children(':nth-child(1)').text();
    var value = $(this).parent().children(':nth-child(2)').text();
    $("#requestHeaderKey").val(key);
    $("#requestHeaderValue").val(value);
    e.stopPropagation();
});

$("#requestHeader .btn").click(function () {
    var key = $('#requestHeader .form-group input')[0].value;
    var value = $('#requestHeader .form-group input')[1].value;
    if (key.length === 0) return;
    if ($(this).text() === "Add/Modify") {

        $($("#requestHeaders tr").get().reverse()).each(function() {
            if ($(this).children().first().text() === key) {
                $(this).remove();
            }
        });

        $("#requestHeaders")
            .append ('<tr><td>'+key+'</td><td>'+value+'</td></tr>');
        
    } else if ($(this).text() === "Remove") {
        $($("#requestHeaders tr").get().reverse()).each(function() {
            if ($(this).children().first().text() === key) {
                $(this).remove();
            }
        });
    }
});

//
// Request Option Events
//
$("#contentRequestTest").click(function () {

    $('#contentLogsPre').text("");
    $('#contentResponsePre').text("");

    var script = g_editor_script.session.getValue();    
    if (script.length == 0) {
        $("#contentRequestStatus")
            .removeClass("alert alert-success")
            .addClass("alert alert-danger")
            .html('Request Failed!</b> No script selected. '+
                  'Click the "Examples" tab and a subsequent "Edit and Test" button.');

        setTimeout(function () {
            $("#contentRequestStatus")
                .removeClass("alert alert-danger alert-success").text("");
        }, 10000);
        return;
    }

    var request = g_editor_request.session.getValue();
    var headers = {};
    $('#requestHeaders tr').each(function (row) {
        var lhs = $(this).find('td:eq(0)').text();
        var rhs = $(this).find('td:eq(1)').text();
        headers[lhs] = rhs;
    });

    var form = new FormData();
    form.append('script',  script);
    form.append('headers', JSON.stringify(headers));
    form.append('request', request);

    var request = $.ajax({
        url: '/input_and_script',
        data: form,
        dataType: 'text',
        processData: false,
        contentType: false,
        type: 'post'
    });
    
    request.done (function (data, status, jqXHR) {
        var headers = jqXHR.getAllResponseHeaders();
        $("#contentRequestStatus")
            .removeClass("alert alert-danger")
            .addClass("alert alert-success")
            .html('Request Sent!</b> Click the Response or Log tabs for further details');
	
	delete headers['x-backside-transport'];
        
        $('#contentResponsePre').text(jqXHR.status + ' ' + 
                                      jqXHR.statusText + '\n' + 
                                      headers.toString() + '\n' + data);
        $('#navResponse').children().text(1);
        grabTxLogs (jqXHR.getResponseHeader("X-GS-Fiddle-DP-TXID"), 5);
    });
    
    request.fail(function (jqXHR, status) {
        $("#contentRequestStatus")
            .removeClass("alert alert-success")
            .addClass("alert alert-danger")
            .html('<button type="button" class="close" data-dismiss="alert">&times;</button><b>' +
                  'Request Failed!</b> ' + jqXHR.responseText + ' ' + 
                  jqXHR.status + ' ' + jqXHR.statusText);
        
        var headers = jqXHR.getAllResponseHeaders();
        $('#contentResponsePre').text(jqXHR.status + 
                                      ' ' + jqXHR.statusText +
                                      '\n' + headers.toString() +
                                      '\n' + jqXHR.responseText);
        $('#navResponse').children().text(1);
        grabTxLogs (jqXHR.getResponseHeader("X-GS-Fiddle-DP-TXID"), 5);
    });

    request.always (function () {
        setTimeout(function () {
            $("#contentRequestStatus")
                .removeClass("alert alert-danger alert-success").text("");
        }, 10000);
    });
});

$(document).ready(function() {

    $.getJSON ('examples/examples.json', function (exlist) {
	var count = exlist.length;
	exlist.forEach (function (ex) {
	    var request = $.ajax({
		url: 'examples/'+ex,
		dataType: "text"
	    });
	    request.done (function (data) {
		g_examples[ex] = {};
		g_examples[ex].orig = data;
	    });
	    request.always (function () {
		if (--count === 0) examplesLoaded();
	    });
	});

	function examplesLoaded () {

	    exlist.forEach (function (ex) {
		if (!g_examples[ex]) return;
		var file = g_examples[ex].orig;
		file = file.replace(/\/\*--(.*)--([\s\S]*?)\*\//gm, function (p0, p1, p2) {
		    if (/INPUT/.test(p1)) {
			g_examples[ex].input = p2.trim();
		    }
		    if (/HEADERS/.test(p1)) {
			try {
			    g_examples[ex].headers = JSON.parse(p2.trim());
			} catch (e) {
			    alert ("Parsing HEADERS section failed for "+ex);
			}
		    }
		    if (/DESCRIPTION/.test(p1)) {
			g_examples[ex].doc = p2.trim();
		    }
		    return '';
		});
		g_examples[ex].script = file.trim();
		$("#contentExamples")
		    .append ('<div class="page-header">'+g_examples[ex].doc+		     
			     '<pre class="prettyprint lang-js">'+g_examples[ex].script+
			     '</pre><a class="editExample btn btn-primary" id="'+ex+
			     '">Edit and Test</a></div>');
	    });

	    $(".editExample").click(function () {
		g_editor_script.session.setValue ($(this).prev().text());

		if (g_examples[this.id].input)
		    g_editor_request.session.setValue (g_examples[this.id].input);

		$("#requestHeaders").text("");
		if (g_examples[this.id].headers) {
		    for(var header in g_examples[this.id].headers) {
			$("#requestHeaders")
			    .append ('<tr><td>'+header+'</td><td>'+
				     g_examples[this.id].headers[header] +
				     '</td></tr>');
		    }
		}
		$("#navEdit").trigger("click");
	    });

	    prettyPrint();
	}
    });

    $("#contentAPI_load").load("api.html", function() {
        $("#contentAPI_load pre").addClass("prettyprint lang-js");
	prettyPrint();
    });

    $("#contentAbout").load("about.html", function() {
        $("#contentAbout pre").addClass("prettyprint lang-js");
	prettyPrint();
    });

    g_editor_script = ace.edit("contentEditPre");
    g_editor_script.setAutoScrollEditorIntoView(true);
    g_editor_script.setOption("showPrintMargin", false)
    g_editor_script.setTheme("ace/theme/chrome");
    g_editor_script.session.setMode("ace/mode/javascript");

    g_editor_request = ace.edit("contentRequestPre");
    g_editor_request.setAutoScrollEditorIntoView(true);
    g_editor_request.setOption("showPrintMargin", false)
    g_editor_request.setTheme("ace/theme/chrome");
    g_editor_request.session.setMode("ace/mode/json");

    $("#navBrand").trigger("click");
    $(window).scrollTop(0);
});
