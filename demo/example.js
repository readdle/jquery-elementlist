var $elem = $("#push_recipients_list");
var list = $elem.elementList({
    enter_key_push: true,
    input_id: "userlist"
});

$('#push').on('click', function() {
    list.insert('test', 2);
});

$('.ulist-del').live('click', function() {
    list.del(this);
});

$('#dell-all').live('click', function() {
    list.delAll();
});

$elem.on('elementList.add', function(e, args) {
    console.log('Add user event', args);
});

$elem.on('elementList.del', function(e, args) {
    console.log('Delete user event', args);
});

$elem.on('elementList.delAll', function() {
    console.log('Delete all users event');
});