from app.models import db, Like


# Adds a demo user, you can add other users here if you want
def seed_likes():
    like1 = Like(userId=1, postId=2)
    like2 = Like(userId=2, postId=3)
    like3 = Like(userId=3, postId=2)
    like4 = Like(userId=1, postId=3)

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)

    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
