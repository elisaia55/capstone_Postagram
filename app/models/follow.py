from .db import db


class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    followerId = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    followingId = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'followerId': self.followerId,
            'followingId': self.followingId
        }
    follower_user = db.relationship(
        "User", back_populates="follower", foreign_keys=[followerId])
    following_user = db.relationship(
        "User", back_populates='following', foreign_keys=[followingId])
