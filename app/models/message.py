from .db import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    dispatcherId = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipientId = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(
        db.Text, nullable=False)
    dmId = db.Column(
        db.Integer, db.ForeignKey('dm_links.id'), nullable=False)

    dispatcher_user = db.relationship(
        'User', back_populates='dispatcher', foreign_keys="Message.dispatcherId")
    recipient_user = db.relationship(
        'User', back_populates="recipient", foreign_keys="Message.recipientId")
    link = db.relationship('DM_Link', back_populates="messages")

    def to_dict(self):
        return {
            'id': self.id,
            'dispatcherId': self.dispatcherId,
            'recipientId': self.recipientId,
            'message': self.message,
            'dmId': self.dmId,
            'dispatcher_user': self.dispatcher_user.to_dict(),
            'recipient_user': self.recipient_user.to_dict()
        }
