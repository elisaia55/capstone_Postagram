from app.models import db, Post
from datetime import datetime


def seed_posts():
    post1 = Post(userId=1, media_url='https://inteng-storage.s3.amazonaws.com/img/iea/nR6bkXZxwo/sizes/software-engineering-skills_resize_md.jpg',
                 description='Grind Never Stops', createdAt=datetime.now())
    post2 = Post(userId=2, media_url='https://imengine.prod.srp.navigacloud.com/?uuid=391dd550-7427-558e-a627-d961c53d1ae0&type=primary&q=72&width=1024',
                 description='Sleep Time x 4x NBA Chamption', createdAt=datetime.now())
    post3 = Post(userId=3, media_url='https://assets3.thrillist.com/v1/image/3098349/828x610/flatten;crop;webp=auto;jpeg_quality=60.jpg',
                 description='The best dinner anyone could ever ask for.', createdAt=datetime.now())
    post4 = Post(userId=4, media_url='https://wallpaperaccess.com/full/2547042.jpg',
                 description='All Glory to the most high!.', createdAt=datetime.now())
    post5 = Post(userId=5, media_url='https://akns-images.eonline.com/eol_images/Entire_Site/2022214/rs_634x1024-220314144632-634-the_rock-fanny_pack-twitter-gj.jpg?fit=around%7C634:1024&output-quality=90&crop=634:1024;center,top',
                 description='Hard being this good lookn.', createdAt=datetime.now())
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
