from app.models import db, Post
from datetime import datetime


def seed_posts():
    post2 = Post(userId=2, media_url='https://imengine.prod.srp.navigacloud.com/?uuid=391dd550-7427-558e-a627-d961c53d1ae0&type=primary&q=72&width=1024',
                 description='Sleep Time x 4x NBA Chamption', createdAt=datetime.now())
    post3 = Post(userId=3, media_url='https://assets3.thrillist.com/v1/image/3098349/828x610/flatten;crop;webp=auto;jpeg_quality=60.jpg',
                 description='The best dinner anyone could ever ask for.', createdAt=datetime.now())
    post4 = Post(userId=4, media_url='https://wallpaperaccess.com/full/2547042.jpg',
                 description='All Glory to the most high!.', createdAt=datetime.now())
    post5 = Post(userId=5, media_url='https://akns-images.eonline.com/eol_images/Entire_Site/2022214/rs_634x1024-220314144632-634-the_rock-fanny_pack-twitter-gj.jpg?fit=around%7C634:1024&output-quality=90&crop=634:1024;center,top',
                 description='Hard being this good lookn.', createdAt=datetime.now())
    post6 = Post(userId=4, media_url='https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2022/10/896/500/aaron-donald.jpg?ve=1&tl=1',
                 description='Time to Lock In!!!', createdAt=datetime.now())
    post7 = Post(userId=5, media_url='https://www.lehighvalleylive.com/resizer/IOHyr6kXbv23HJM4Ikkb_F1ugDk=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/KF43ICDDPFEQ7FNGVTMTZXIPNQ.JPG',
                 description='Catching waves with my guy Zac Efron', createdAt=datetime.now())
    post8 = Post(userId=6, media_url='https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/49ers/vz6bn8iatxawximljz8e',
                 description='Blessed to be back in the Bay!', createdAt=datetime.now())
    post9 = Post(userId=7, media_url='https://wallpaper.dog/large/10879393.jpg',
                 description='JUST DO IT', createdAt=datetime.now())

    
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
