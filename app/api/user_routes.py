from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db

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



