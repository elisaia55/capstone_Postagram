from app.models import db, DM_Link
from datetime import datetime


def seed_links():
    link1 = DM_Link(userId1=1, userId2=2)

    db.session.add(link1)

    db.session.commit()


def undo_links():
    db.session.execute('TRUNCATE dm_links RESTART IDENTITY CASCADE;')
    db.session.commit()
