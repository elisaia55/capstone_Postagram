from app.models import db, Comment
from datetime import datetime


def seed_comments():
    comment1 = Comment(userId=1, postId=2,
                       description="Amazing", createdAt=datetime.now())
    comment2 = Comment(userId=2, postId=1,
                       description="FIREEEEE!", createdAt=datetime.now())
    comment3 = Comment(userId=3, postId=3,
                       description="Love this", createdAt=datetime.now())
    comment4 = Comment(userId=2, postId=1, description="<3",
                       createdAt=datetime.now())
    comment5 = Comment(userId=2, postId=3,
                       description="Good STUFF", createdAt=datetime.now())

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
