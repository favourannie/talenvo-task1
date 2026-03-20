exports.emitCardCreated = (io, card) => {
  io.emit("cardCreated", card);
};

exports.emitCardMoved = (io, card) => {
  io.emit("cardMoved", card);
};

exports.emitCommentAdded = (io, comment) => {
  io.emit("commentAdded", comment);
};
