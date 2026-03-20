const Comment = require("../models/commentModel.js");
const Card = require("../models/cardModel.js");
const User = require("../models/userModel.js");
const Board = require("../models/boardModel.js");

class commentController {
  async createComment(req, res) {
  try {
    const { boardId, cardId } = req.params;
    const { content, parentCommentId } = req.body;
    const userId = req.userId;

    const board = await Board.findByPk(boardId);
    if (!board || board.userId !== userId) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    const card = await Card.findByPk(cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    let parentComment = null;

    if (parentCommentId) {
      parentComment = await Comment.findByPk(parentCommentId);

      if (!parentComment) {
        return res.status(404).json({
          success: false,
          message: "Parent comment not found",
        });
      }

      if (parentComment.cardId !== cardId) {
        return res.status(400).json({
          success: false,
          message: "Parent comment does not belong to this card",
        });
      }
    }

    const comment = await Comment.create({
      cardId,
      userId,
      content,
      parentCommentId: parentCommentId || null,
    });

    const io = req.app.get("io");
    if (io) {
      io.emit("commentAdded", comment);
    }

    res.status(201).json({
      success: true,
      message: parentCommentId
        ? "Reply added successfully"
        : "Comment added successfully",
      data: comment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding comment: " + error.message,
    });
  }
}

  async editComment(req, res) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;

      const comment = await Comment.findByPk(commentId);

      if (!comment) {
        return res
          .status(404)
          .json({ success: false, message: "Comment not found" });
      }

      await comment.update({ content });

      res.status(200).json({
        success: true,
        message: "Comment updated",
        data: comment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getComments(req, res) {
  const { cardId } = req.params;

  const comments = await Comment.findAll({
    where: { cardId, parentCommentId: null },
    include: [
      {
        model: Comment,
        as: "replies",
        include: [
          {
            model: Comment,
            as: "replies",
          },
        ],
      },
    ],
  });

  res.status(200).json({ success: true, data: comments });
}

  async deleteComment(req, res) {
    try {
      const { commentId } = req.params;

      const comment = await Comment.findByPk(commentId);

      if (!comment) {
        return res
          .status(404)
          .json({ success: false, message: "Comment not found" });
      }

      await comment.destroy();

      res.status(200).json({
        success: true,
        message: "Comment deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new commentController();
