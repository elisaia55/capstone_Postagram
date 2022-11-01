from app.models import db, Follow


def seed_follows():
    seed_follow1 = Follow(followerId=1, followingId=2)
    seed_follow2 = Follow(followerId=2, followingId=1)
    seed_follow3 = Follow(followerId=3, followingId=1)

    db.session.add(seed_follow1)
    db.session.add(seed_follow2)
    db.session.add(seed_follow3)

    db.session.commit()


def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
