var ulist = $("#push_recipients_list").elementList({enter_key_push: true, input_id: "userlist"});

$('#push').on('click', function() {
    ulist.insert('test', 2);
});

$('.ulist-del').live('click', function() {
    ulist.del(this);
});

$('#dell-all').live('click', function() {
    ulist.delAll();
});

$("#push_recipients_list").on('elementList.add', function(e, args) {
    console.log('Add user event', args);
});

$("#push_recipients_list").on('elementList.del', function(e, args) {
    console.log('Delete user event', args);
});

$("#push_recipients_list").on('elementList.delAll', function() {
    console.log('Delete all users event');
});