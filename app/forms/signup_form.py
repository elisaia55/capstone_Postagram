from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
import re
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email_check = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')
    if not (re.fullmatch(email_check, email)):
        raise ValidationError('Please provide a valid email ')


def username_nonspace(form, field):
    username = field.data
    if ' ' in username:
        raise ValidationError('Username must not contain spaces')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
    elif len(username) > 30:
        raise ValidationError("Username must be less than 30 characters")
    elif len(username) < 4:
        raise ValidationError("Username must have at least 4 characters")


def short_password(form, field):
    password = field.data
    if len(password) < 4:
        raise ValidationError(
            "Password must be at least 4 characters in length")


def username_long(form, field):
    name = field.data
    if len(name) > 40:
        raise ValidationError("Full Name cannot exceed 40 characters")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_nonspace])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), short_password])
    name = StringField('name', validators=[DataRequired(), username_long])
