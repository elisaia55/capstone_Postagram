from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', image_url='https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg', description="Demo Description", name="Demo")
    Dylan = User(
        username='Dylan<3Tarky', email='dylan@dylan.com', password='dylan', image_url='https://images.pistonheads.com/nimg/44864/Medium-9169-McLaren720S.jpg', description="Money Maker, Lover of Keyboards", name="Dylan Peate")
    Pat = User(
        username='PatHeeHaw', email='patrick@patrick.com', password='patrick', image_url='https://cdn.britannica.com/25/190725-050-040595B1/Movie-still-Training-Day-Denzel-Washington-2001.jpg', description="Cowboy by the day, Coder by night", name="Patrick Mcginn")
    AD  = User(
        username='AD99', email='ad99@google.com', password='ad99', image_url='https://cdn.profootballrumors.com/files/2022/06/USATSI_17692095.jpg', description="Best Defenisve Tackle To Play the Game", name="Aaron Donald")
    Rock = User(
        username='The Rock', email='Rock@gmail.com', password='therock', image_url='https://m.media-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UY1200_CR84,0,630,1200_AL_.jpg', description="CAN YOU SMELL WHAT THE ROCK IS COOKINNN?", name="Dwayne 'The Rock' Johnson")
    Christian = User(
        username='christianmcCaffrey', email='CMC@gmail.com', password='CMCCc', image_url='https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/49ers/ymo4ym7sww3pp6nvt20q', description="San Francisco 49ers Runing Back", name="Christian McCaffrey")



    db.session.add(demo)
    db.session.add(Dylan)
    db.session.add(Pat)
    db.session.add(AD)
    db.session.add(Rock)
    db.session.add(Christian)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
