const send_message_event = 'send:message';
const join_room_event = 'join:room';
const new_message_event = 'message';
const leave_room_event = 'leave:room';

//message obj
// var msg = {
//   				'room': room,
//   				'user': $scope.currentUser.name,
//   				'text': text,
//           'recipient_id': recipient_id,
//           'conversation_id': conversation_id
//   			}

//join:room obj
// var room = {
//         'room_name': $scope.currentChatRep.id
//     };

const onConnection = function (socket) {
    socket.on(send_message_event, function (message) {
        console.log("Message room: " + message.user + " " + message.recipient_id + " " + message.conversation_id);
        console.log(JSON.stringify(message));
        var sending_message = {}
        sending_message.room = message.room;
        sending_message.user = message.user;
        sending_message.text = message.text;
        sending_message.recipient_id = message.recipient_id;
        sending_message.conversation_id = message.conversation_id;

        socket.broadcast.to(message.room).emit(new_message_event, sending_message);
    });

    socket.on(join_room_event, function (room_info) {
        console.log("Room joined: " + room_info.room_name);

        socket.join(room_info.room_name);
    });

    socket.on(leave_room_event, function(room_info){
        console.log("Room Left: " + room_info.room_name);

        socket.leave(room_info.room_name);
    });
};

exports.on_connection = onConnection;


