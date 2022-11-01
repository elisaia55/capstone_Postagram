from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Follow, User, follow

follow_routes = Blueprint('follow', __name__)


@follow_routes.route('/<int:id>')
@login_required
def user(id):

    following = Follow.query.filter_by(followingId=id)
    followers = Follow.query.filter_by(followerId=id)

    lst_followers = []
    lst_following = []

    for user in followers:
        solo = User.query.get(user.followerId)
        lst_followers.append(solo.to_dict())

    for user2 in following:
        solo2 = User.query.get(user2.followingId)
        lst_following.append(solo2.to_dict())

    return {'following': lst_following, 'followers': lst_followers}


@follow_routes.route('/remove/<int:id>', methods=['DELETE'])
def unfollow(id):

    follower = Follow.query.filter_by(
        followerId=id, followingId=current_user.id).first

    db.session.delete(follower)
    db.session.commit()
    return user(current_user.id)
