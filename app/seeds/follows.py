from app.models import db, Follow


def seed_follows():
    seed_follow1 = Follow(followerId=1, followingId=2)
    seed_follow2 = Follow(followerId=1, followingId=3)
    seed_follow3 = Follow(followerId=1, followingId=4)
    seed_follow4 = Follow(followerId=1, followingId=5)
    seed_follow5 = Follow(followerId=1, followingId=6)
    seed_follow6 = Follow(followerId=1, followingId=7)
   
    
    

    db.session.add(seed_follow1)
    db.session.add(seed_follow2)
    db.session.add(seed_follow3)
    db.session.add(seed_follow4)
    db.session.add(seed_follow5)
    db.session.add(seed_follow6)
    

    db.session.commit()


def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
