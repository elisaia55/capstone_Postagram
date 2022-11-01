from asyncore import dispatcher
from crypt import methods
from flask import Blueprint, jsonify, request
from app.models import Comment, User, Post, db
from flask_login import login_required, current_user
from .post_routes import posts_following
from datetime import date, datetime

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/', methods=["POST"], strict_slashes=False)
@login_required
def create_comment():
    new_comment = request.json
    print(new_comment, '---------->HERE')
    comment = Comment(
        userId=new_comment['userId'], postId=new_comment['postId'], description=new_comment['description'], createdAt=datetime.now())

    db.session.add(comment)
    db.session.commit()

    return posts_following()


@comment_routes.route('/<int:commentId>', methods=["DELETE"])
@login_required
def delete_comment(commentId):

    comment = Comment.query.get(commentId)

    db.session.delete(comment)
    db.session.commit()

    return posts_following()
