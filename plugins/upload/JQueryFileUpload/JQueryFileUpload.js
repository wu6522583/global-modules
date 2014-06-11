define(function( require , exports , module ){
        (function($,win,undef){
            var JQueryFileUpLoad = function( jq,_option ){
                var _html = '' +
                    '<div class="container">' +
                    '<form id="fileupload" action="//jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data">' +
                    '<noscript>' +
                    '<input type="hidden" name="redirect" value="http://blueimp.github.io/jQuery-File-Upload/">' +
                    '</noscript>' +
                    '<div class="row fileupload-buttonbar">' +
                    '<div class="col-lg-7">' +
                    '<span class="btn btn-success fileinput-button">' +
                    '<i class="glyphicon glyphicon-plus"></i>' +
                    '<span>Add files...</span>' +
                    '<input type="file" name="files[]" multiple>' +
                    '</span> ' +
                    '<button type="submit" class="btn btn-primary start">' +
                    '<i class="glyphicon glyphicon-upload"></i>' +
                    '<span>Start upload</span>' +
                    '</button>  ' +
                    '<button type="reset" class="btn btn-warning cancel">' +
                    '<i class="glyphicon glyphicon-ban-circle"></i>' +
                    '<span>Cancel upload</span>' +
                    '</button> ' +
                    '<button type="button" class="btn btn-danger delete">' +
                    '<i class="glyphicon glyphicon-trash"></i>' +
                    '<span>Delete</span>' +
                    '</button> ' +
                    '<input type="checkbox" class="toggle">' +
                    '<span class="fileupload-process"></span>' +
                    '</div>' +
                    '<div class="col-lg-5 fileupload-progress fade">' +
                    '<div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">' +
                    '<div class="progress-bar progress-bar-success" style="width:0%;"></div>' +
                    '</div>' +
                    '<div class="progress-extended">&nbsp;</div>' +
                    '</div>' +
                    '</div>' +
                    '<table role="presentation" class="table table-striped">' +
                    '<tbody class="files"></tbody>' +
                    '</table>' +
                    '</form>' +
                    '</div>';
                var template_upload_str = '<script id="template-upload" type="text/x-tmpl">{% for (var i=0, file; file=o.files[i]; i++) { %}<tr class="template-upload fade"><td><span class="preview"></span></td><td><p class="name">{%=file.name%}</p><strong class="error text-danger"></strong></td><td><p class="size">Processing...</p><div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="progress-bar progress-bar-success" style="width:0%;"></div></div></td><td>{% if (!i && !o.options.autoUpload) { %}<button class="btn btn-primary start" disabled><i class="glyphicon glyphicon-upload"></i><span>Start</span></button>{% } %}{% if (!i) { %}<button class="btn btn-warning cancel"><i class="glyphicon glyphicon-ban-circle"></i><span>Cancel</span></button>{% } %}</td></tr>{% } %}</script>';
                var template_download_str = '<script id="template-download" type="text/x-tmpl">{% for (var i=0, file; file=o.files[i]; i++) { %}<tr class="template-download fade"><td><span class="preview">{% if (file.thumbnailUrl) { %}<a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" data-gallery><img src="{%=file.thumbnailUrl%}"></a>{% } %}</span></td><td><p class="name">{% if (file.url) { %}<a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" {%=file.thumbnailUrl?'+"data-gallery"+':""%}>{%=file.name%}</a>{% } else { %}<span>{%=file.name%}</span>{% } %}</p>{% if (file.error) { %}<div><span class="label label-danger">Error</span> {%=file.error%}</div>{% } %}</td><td><span class="size">{%=o.formatFileSize(file.size)%}</span></td><td>{% if (file.deleteUrl) { %}<button class="btn btn-danger delete" data-type="{%=file.deleteType%}" data-url="{%=file.deleteUrl%}"{% if (file.deleteWithCredentials) { %} data-xhr-fields='+'{"withCredentials":true}'+'{% } %}><i class="glyphicon glyphicon-trash"></i><span>Delete</span></button><input type="checkbox" name="delete" value="1" class="toggle">{% } else { %}<button class="btn btn-warning cancel"><i class="glyphicon glyphicon-ban-circle"></i><span>Cancel</span></button>{% } %}</td></tr>{% } %}</script>';
                jq.append( _html + template_upload_str + template_download_str );
                $('#fileupload').fileupload({
                    // Uncomment the following to send cross-domain cookies:
                    //xhrFields: {withCredentials: true},
                    url: 'server/php/'
                });
                // Enable iframe cross-domain access via redirect option:
                $('#fileupload').fileupload(
                    'option',
                    'redirect',
                    window.location.href.replace(
                        /\/[^\/]*$/,
                        '/cors/result.html?%s'
                    )
                );
                if (window.location.hostname === 'blueimp.github.io') {
                    // Demo settings:
                    $('#fileupload').fileupload('option', {
                        url: '//jquery-file-upload.appspot.com/',
                        // Enable image resizing, except for Android and Opera,
                        // which actually support image resizing, but fail to
                        // send Blob objects via XHR requests:
                        disableImageResize: /Android(?!.*Chrome)|Opera/
                            .test(window.navigator.userAgent),
                        maxFileSize: 5000000,
                        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
                    });
                    // Upload server status check for browsers with CORS support:
                    if ($.support.cors) {
                        $.ajax({
                            url: '//jquery-file-upload.appspot.com/',
                            type: 'HEAD'
                        }).fail(function () {
                            $('<div class="alert alert-danger"/>')
                                .text('Upload server currently unavailable - ' +
                                    new Date())
                                .appendTo('#fileupload');
                        });
                    }
                } else {
                    // Load existing files:
                    $('#fileupload').addClass('fileupload-processing');
                    $.ajax({
                        // Uncomment the following to send cross-domain cookies:
                        //xhrFields: {withCredentials: true},
                        url: $('#fileupload').fileupload('option', 'url'),
                        dataType: 'json',
                        context: $('#fileupload')[0]
                    }).always(function () {
                        $(this).removeClass('fileupload-processing');
                    }).done(function (result) {
                        $(this).fileupload('option', 'done')
                            .call(this, $.Event('done'), {result: result});
                    });
                }
            };
            $.fn.JQueryFileUpLoad=function(settings){
                return new JQueryFileUpLoad(this,settings);
            };
        })(jQuery,window);
});