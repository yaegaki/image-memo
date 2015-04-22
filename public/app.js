$(function () {
    var socket = io.connect('ws://localhost:8000');
    socket.binaryType = 'arraybuffer';
    var drop_mask = $('<div />').css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        display: 'none',
        'z-index': 9999
    });

    $('body').append(drop_mask);
    $('body').on('dragover', function(e){
        e.stopPropagation();
        e.preventDefault();
        drop_mask.show();
        $('#overlay').fadeIn(300);
    });

    drop_mask.on('dragleave', function(e){
        e.stopPropagation();
        e.preventDefault();
        drop_mask.hide();
        $('#overlay').fadeOut(300);
    });

    drop_mask.on('drop', function(e){
        e.stopPropagation();
        e.preventDefault();
        drop_mask.hide();
        $('#overlay').fadeOut(300);

        e = e.originalEvent;
        uploadImage(e.dataTransfer.files, e.clientX, e.clientY);
    });

    function uploadImage(files, left, top) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.type.indexOf('image/') >= 0) {
                socket.emit('image', { file: file, left: left, top: top });
            }
        }
    }

    socket.on('image', function (data) {
        var url = URL.createObjectURL(new Blob([data.file]));
        var img = $('<img src="' + url + '" />').css({
            position: 'absolute',
            top: data.top,
            left: data.left
        });
        $('body').append(img);
    });
});

