
from flask import Blueprint, Config, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Follow, Comment, User, Like
from datetime import datetime
from app.aws_s3 import *
import boto3
import botocore

post_routes = Blueprint('posts', __name__)


@post_routes.route('/following')
@login_required
def posts_following():

    following = Follow.query.filter_by(followerId=current_user.id).all()

    posts_all = []
    posts_likes = []

    post_comments = []

    post_comments_b = []
    post_likes_b = []

    for follow in following:
        posts = Post.query.filter_by(userId=follow.followingId).all()
        for post in posts:
            user = User.query.get(post.userId)
            comments = Comment.query.filter_by(
                postId=post.id).order_by(Comment.id.desc()).all()
            for comment in comments:
                user_comment = User.query.get(comment.userId)
                post_comments.append(
                    {'comment': comment.to_dict(), 'user': user_comment.to_dict()})
            likes = Like.query.filter_by(postId=post.id).all()
            for like in likes:
                user_f = User.query.filter_by(id=like.userId).first()
                posts_likes.append(user_f.to_dict())
            posts_all.append({'post': post.to_dict(), 'user': user.to_dict(
            ), 'comments': post_comments, 'likes': posts_likes})
            post_comments = []
            posts_likes = []

    posts_user = Post.query.filter_by(userId=current_user.id).all()

    for post in posts_user:
        comments_b = Comment.query.filter_by(
            postId=post.id).order_by(Comment.id.desc()).all()
        for comment_b in comments_b:
            user_comment_b = User.query.get(comment_b.userId)
            post_comments_b.append(
                {'comment': comment_b.to_dict(), 'user': user_comment_b.to_dict()})
        likes = Like.query.filter_by(postId=post.id).all()
        for like in likes:
            user_g = User.query.filter_by(id=like.userId).first()
            posts_likes.append(user_g.to_dict())
        posts_all.append({'post': post.to_dict(), 'user': current_user.to_dict(
        ), 'comments': post_comments, 'likes': post_likes_b})
        post_comments_b = []
        post_likes_b = []
    post_sort = sorted(posts_all, key=lambda x: x['post']['id'], reverse=True)

    return {'following': [post for post in post_sort]}


@post_routes.route('/id/<int:id>')
@login_required
def unique_posts(id):
    post = Post.query.get(id)

    post_likes = []
    post_comments = []

    user = User.query.filter_by(id=post.userId).first()

    likes = Like.query.filter_by(postId=post.id).all()
    for like in likes:
        user_b = User.query.filter_by(id=like.userId).first()
        post_likes.append(user_b.to_dict())

    comments = Comment.query.filter_by(postId=post.id).all()
    for comment in comments:
        user_c = User.query.filter_by(id=comment.userId).first()
        post_comments.append(
            {'comment': comment.to_dict(), 'user': user_c.to_dict()})

    return {'unique': {'post': post.to_dict(), 'likes': post_likes, 'comments': post_comments, 'user': user.to_dict()}}


@post_routes.route('/<int:id>')
@login_required
def get_posts(id):
    posts = Post.query.filter_by(userId=id).order_by(Post.id.desc()).all()

    post_likes = []
    post_comment = []

    feed = []

    for post in posts:
        likes = Like.query.filter_by(postId=post.id).all()
        for like in likes:
            user_d = User.query.filter_by(postId=post.id).all()
            post_likes.append(user_d.to_dict())

        comments = Comment.query.filter_by(postId=post.id).all()
        for comment in comments:
            user_e = User.query.filter_by(id=comment.userId).first()
            post_comment.append(user_e.to_dict())

        feed.append({'post': post.to_dict(), 'likes': post_likes,
                    'comments': post_comment})
        post_likes = []
        post_comment = []
    return {'posts': [item for item in feed]}


@post_routes.route('/<int:postId>', methods=["DELETE"])
@login_required
def delete_posts(postId):

    post = Post.query.get(postId)

    db.session.delete(post)
    db.session.commit()

    return posts_following()


@post_routes.route('/new', methods=["POST"])
@login_required
def new_post():
    if "file" not in request.files:
        return {"errors": "File type not permitted"}, 400

    file = request.files['file']

    if file:
        file_url = upload_file_to_s3(file)["url"]

        newPost = Post(userId=current_user.id, media_url=file_url, description=request.form.get(
            'description'), createdAt=datetime.now())
        db.session.add(newPost)
        db.session.commit()

    return {'msg': "Succesful Post"}


@post_routes.route('/<int:postId>', methods=["PUT"])
@login_required
def edit_post(postId):

    data = request.json

    post = Post.query.get(postId)

    post.description = request.json['description']

    db.session.commit()

    return posts_following()
