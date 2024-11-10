from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Enum, func, DateTime

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(Enum('admin', 'user'), default='user')
    created_at = db.Column(db.DateTime, default=func.now())

    # Adjust relationship to match 'incident_reports' table in the Report model
    incident_reports = db.relationship('Report', back_populates='user', cascade='all, delete')
    # Added relationship for Admin actions
    admin_acts = db.relationship('Admin', back_populates='admin', cascade='all, delete')
    # notifications = db.relationship('Notification', back_populates='user', cascade='all, delete')
    serialize_rules = ('-incident_reports', '-admin_acts', '-password',)

    



class Report(db.Model, SerializerMixin):
    __tablename__ = 'incident_reports'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String, nullable=False)
    status = db.Column(Enum('under investigation', 'resolved', 'rejected'), default='under investigation')
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())

    # Relationship to the User
    user = db.relationship('User', back_populates='incident_reports', cascade='all, delete')
    # Relationship to Admin actions
    admin_acts = db.relationship('Admin', back_populates='incident_report', cascade='all, delete')
    # Relationship to Media
    medias = db.relationship('Media', back_populates='report', cascade='all, delete')


class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admins_acts'

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


class Media(db.Model, SerializerMixin):
    __tablename__ = 'incident_medias'

    id = db.Column(db.Integer, primary_key=True)
    incident_report_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'), nullable=False)
    media_type = db.Column(Enum('image', 'video'), nullable=False)
    media_url = db.Column(db.String, nullable=False)

    # Relationship to Report
    report = db.relationship('Report', back_populates='medias', cascade='all, delete')

class EmergencyReport(db.Model, SerializerMixin):
    __tablename__ = 'emergencies'

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

class Notification(db.Model, SerializerMixin):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String, nullable=False)
    read = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=func.now())

    # # Relationship to User
    # user = db.relationship('User', back_populates='notifications', cascade='all, delete')
