from app.models import db, Post
from datetime import datetime


def seed_posts():
    post1 = Post(userId=1, media_url='https://inteng-storage.s3.amazonaws.com/img/iea/nR6bkXZxwo/sizes/software-engineering-skills_resize_md.jpg',
                 description='Grind Never Stops', createdAt=datetime.now())
    post2 = Post(userId=2, media_url='https://imengine.prod.srp.navigacloud.com/?uuid=391dd550-7427-558e-a627-d961c53d1ae0&type=primary&q=72&width=1024',
                 description='Sleep Time x 4x NBA Chamption', createdAt=datetime.now())
    post3 = Post(userId=3, media_url='https://i.pinimg.com/originals/62/1d/4e/621d4efc1497094bb2705a7821e1b28d.jpg',
                 description='The best dinner anyone could ever ask for.', createdAt=datetime.now())

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
