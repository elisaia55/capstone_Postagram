from tkinter import CASCADE
from .db import db


class DM_Link(db.Model):
    __tablename__ = 'dm_links'

    id = db.Column(db.Integer, primary_key=True)
    userId1 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    userId2 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user1 = db.relationship(
        "User", back_populates="user1", foreign_keys=[userId1])
    user2 = db.relationship(
        "User", back_populates="user2", foreign_keys=[userId2])

    messages = db.relationship(
        "Message", back_populates="link", cascade="all,delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'userId1': self.userId1,
            'userId2': self.userId2,
            'user1': self.user1.to_dict(),
            'user2': self.user2.to_dict()

        }
