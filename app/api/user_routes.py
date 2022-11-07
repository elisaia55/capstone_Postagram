from flask import Blueprint, jsonify, request 
from flask_login import login_required, current_user
from app.models import User, db

from app.aws_s3 import *
import boto3
import botocore

user_routes = Blueprint('users', __name__)


@user_routes.route('/suggestedUsers')
@login_required
def users():
    users = User.query.all()

    all_users = [user.to_dict() for user in users]
    return jsonify(all_users)


@user_routes.route('/getUsers')
@login_required
def getUsers():
    
    allUsers = User.query.all()
    return {'allUsers': [user.to_dict() for user in allUsers]}


@user_routes.route('/<int:userId>')
@login_required
def get_single_user(userId):
    user = User.query.filter(User.id == userId).first()
    
    if user is None:
        return {"errors": "User could not be found"}, 400
    else:
        return user.to_dict()


    
