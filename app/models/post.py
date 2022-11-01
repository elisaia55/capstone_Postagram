from .db import db


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    media_url = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(2200), nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User", back_populates='post')
    comment = db.relationship(
        "Comment", back_populates="post", cascade="all,delete-orphan")
    like = db.relationship("Like", back_populates="post",
                           cascade="all,delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'media_url': self.media_url,
            'description': self.description,
            'createdAt': self.createdAt
        }
