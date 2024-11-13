from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Enum, func, DateTime
import requests

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-incident_reports', '-admin_acts', '-password',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(Enum('admin', 'user'), default='user')
    created_at = db.Column(db.DateTime, default=func.now())
    banned = db.Column(Boolean, default=False)

    incident_reports = db.relationship('Report', back_populates='user', cascade='all, delete')
    # Added relationship for Admin actions
    admin_acts = db.relationship('Admin', back_populates='admin', cascade='all, delete')
    # notifications = db.relationship('Notification', back_populates='user', cascade='all, delete')
    serialize_rules = ('-incident_reports', '-admin_acts', '-password',)

    @property
    def reports_count(self):
        return len(self.incident_reports)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'phone': self.phone,
            'created_at': self.created_at,
            'reports_count': self.reports_count,
            'banned': self.banned
        }

class Report(db.Model, SerializerMixin):
    __tablename__ = 'incident_reports'

    serialize_rules = ('-user', '-admin_acts', '-images', '-videos',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String, nullable=False)
    status = db.Column(Enum('under investigation', 'resolved', 'rejected'), default='under investigation')
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    response_time = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())

    # Relationship to the User
    user = db.relationship('User', back_populates='incident_reports', cascade='all, delete')
    # Relationship to Admin actions
    admin_acts = db.relationship('Admin', back_populates='incident_report', cascade='all, delete')
    # Relationship to Media
    images = db.relationship('ImageUrl', back_populates='report', cascade='all, delete')
    # Relationship to Image
    videos = db.relationship('VideoUrl', back_populates='report', cascade='all, delete')

    def to_dict(self):
        location = self.reverse_geocode(self.latitude, self.longitude)
        return {
            'id': self.id,
            'description': self.description,
            'status': self.status,
            'location': location,
            'reporter': self.user.username if self.user else None,
            'date': self.created_at.strftime('%Y-%m-%d'), 
            'images': [image.media_image for image in self.images],
            'videos': [video.media_video for video in self.videos]
        }
    
    def reverse_geocode(self, latitude, longitude):
        api_key = 'e8e97b4bccb04cbf84c4835212b56571'
        url = f'https://api.opencagedata.com/geocode/v1/json?q={latitude}+{longitude}&key={api_key}'
        
        response = requests.get(url)
        data = response.json()

        if data and data['results']:
            return data['results'][0]['formatted']
        else:
            return "Location not available"


class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admins_acts'

    serialize_rules = ('-incident_report', '-emergencies', '-admin',)

    id = db.Column(db.Integer, primary_key=True)
    incident_report_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'))
    emergency_only_id = db.Column(db.Integer, db.ForeignKey('emergencies.id'))
    action = db.Column(Enum('status_change', 'flagged', 'resolved'))
    admin_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    create_at = db.Column(db.DateTime, default=func.now())

    incident_report = db.relationship('Report', back_populates='admin_acts', cascade='all, delete')
    emergencies = db.relationship('EmergencyReport', back_populates='admin_acts',)
    # Relationship to User (Admin should reference User)
    admin = db.relationship('User', back_populates='admin_acts', cascade='all, delete')


class ImageUrl(db.Model, SerializerMixin):
    __tablename__ = 'images'

    serialize_rules = ('-report',)

    id = db.Column(db.Integer, primary_key=True)
    incident_report_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'))
    media_image = db.Column(db.String)

    report = db.relationship('Report', back_populates='images', cascade='all, delete')

class VideoUrl(db.Model, SerializerMixin):
    __tablename__ = 'videos'

    serialize_rules = ('-report',)

    id = db.Column(db.Integer, primary_key=True)
    incident_report_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'))
    media_video = db.Column(db.String)

    report = db.relationship('Report', back_populates='videos', cascade='all, delete')

class EmergencyReport(db.Model, SerializerMixin):
    __tablename__ = 'emergencies'

    serialize_rules = ('-admin_acts',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    status = db.Column(Enum('under investigation', 'resolved', 'rejected'), default='under investigation')
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())

    admin_acts = db.relationship('Admin', back_populates='emergencies')

    def reverse_geocode(self, latitude, longitude):
        api_key = 'e8e97b4bccb04cbf84c4835212b56571'
        url = f'https://api.opencagedata.com/geocode/v1/json?q={latitude}+{longitude}&key={api_key}'
        
        response = requests.get(url)
        data = response.json()

        if data and data['results']:
            return data['results'][0]['formatted']
        else:
            return "Location not available"

    def to_dict(self):
        location = self.reverse_geocode(self.latitude, self.longitude)
        return {
            'id': self.id,
            'description': self.description,
            'location': location,
            'status': self.status,
            'reporter': self.name,
            'date': self.created_at.strftime('%Y-%m-%d')
        }

class Notification(db.Model, SerializerMixin):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String, nullable=False)
    read = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=func.now())

    # # Relationship to User
    # user = db.relationship('User', back_populates='notifications', cascade='all, delete')
