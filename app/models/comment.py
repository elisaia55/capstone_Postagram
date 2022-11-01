from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    description = db.Column(db.String(2200), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)

    user = db.relationship(
        "User", back_populates="comment")
    post = db.relationship(
        "Post", back_populates="comment")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'postId': self.postId,
            'description': self.description,
            'createdAt': self.createdAt
        }
