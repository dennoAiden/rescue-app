from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

# Enums for roles and statuses
from enum import Enum

class UserRoleEnum(Enum):
    user = 'user'
    admin = 'admin'

class ReportStatusEnum(Enum):
    under_investigation = 'under investigation'
    resolved = 'resolved'
    unresolved = 'unresolved'

class AdminActionEnum(Enum):
    approved = 'approved'
    rejected = 'rejected'
    escalated = 'escalated'

# Models

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-incident_reports', '-admin_acts', '-password', '-ratings',)

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    phone = db.Column(db.String(), nullable=False)
    password = db.Column(db.String(), nullable=False)
    role = db.Column(db.Enum(UserRoleEnum), default='user')
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    banned = db.Column(db.Boolean, default=False)

    incident_reports = db.relationship('Report', back_populates='user', cascade='all, delete')
    admin_acts = db.relationship('Admin', back_populates='admin', cascade='all, delete')
    ratings = db.relationship('Rating', back_populates='user', cascade='all, delete')

    def __repr__(self):
        return f"<User '{self.username}' (ID: {self.id}) - Role: {self.role}, Banned: {'Yes' if self.banned else 'No'}>"

class Report(db.Model, SerializerMixin):
    __tablename__ = 'incident_reports'
    serialize_rules = ('-user', '-admin_acts', '-images', '-videos', '-ratings',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String(), nullable=False)
    status = db.Column(db.Enum(ReportStatusEnum), default='under investigation')
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    response_time = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())

    user = db.relationship('User', back_populates='incident_reports', cascade='all, delete')
    admin_acts = db.relationship('Admin', back_populates='incident_report', cascade='all, delete')
    images = db.relationship('ImageUrl', back_populates='report', cascade='all, delete')
    videos = db.relationship('VideoUrl', back_populates='report', cascade='all, delete')
    ratings = db.relationship('Rating', back_populates='report', cascade='all, delete')

    def __repr__(self):
        return f"<Report ID: {self.id} - Status: '{self.status}' by User ID: {self.user_id}>"

class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admin_acts'
    serialize_rules = ('-incident_report', '-emergencies', '-admin',)

    id = db.Column(db.Integer, primary_key=True)
    incident_report_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'))
    emergency_only_id = db.Column(db.Integer, db.ForeignKey('emergencies.id'))
    action = db.Column(db.Enum(AdminActionEnum))
    admin_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=func.now())

    incident_report = db.relationship('Report', back_populates='admin_acts', cascade='all, delete')
    emergencies = db.relationship('EmergencyReport', back_populates='admin_acts')
    admin = db.relationship('User', back_populates='admin_acts', cascade='all, delete')

    def __repr__(self):
        return f"<Admin Action ID: {self.id} - Action: '{self.action}' by Admin ID: {self.admin_id}>"

class ImageUrl(db.Model, SerializerMixin):
    __tablename__ = 'images'
    serialize_rules = ('-report',)

    id = db.Column(db.Integer, primary_key=True)
    incident_report_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'))
    media_image = db.Column(db.String())

    report = db.relationship('Report', back_populates='images', cascade='all, delete')

    def __repr__(self):
        return f"<Image ID: {self.id} - Associated with Report ID: {self.incident_report_id}>"

class VideoUrl(db.Model, SerializerMixin):
    __tablename__ = 'videos'
    serialize_rules = ('-report',)

    id = db.Column(db.Integer, primary_key=True)
    incident_report_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'))
    media_video = db.Column(db.String())

    report = db.relationship('Report', back_populates='videos', cascade='all, delete')

    def __repr__(self):
        return f"<Video ID: {self.id} - Associated with Report ID: {self.incident_report_id}>"

class EmergencyReport(db.Model, SerializerMixin):
    __tablename__ = 'emergencies'
    serialize_rules = ('-admin_acts',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)
    status = db.Column(db.Enum(ReportStatusEnum), default='under investigation')
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())

    admin_acts = db.relationship('Admin', back_populates='emergencies')

    def __repr__(self):
        return f"<Emergency Report ID: {self.id} - Name: '{self.name}', Status: '{self.status}'>"

class Notification(db.Model, SerializerMixin):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(), nullable=False)
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=func.now())

    def __repr__(self):
        return f"<Notification ID: {self.id} - Read: {'Yes' if self.read else 'No'}, Message Preview: '{self.message[:30]}...'>"

class Rating(db.Model, SerializerMixin):
    __tablename__ = 'ratings'
    serialize_rules = ('-report', '-user',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    report_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'), nullable=False)
    rating_value = db.Column(db.Integer, nullable=False)  # Rating value (e.g., 1 to 5 stars)
    created_at = db.Column(db.DateTime, default=func.now())

    user = db.relationship('User', back_populates='ratings', cascade='all, delete')
    report = db.relationship('Report', back_populates='ratings', cascade='all, delete')

    def __repr__(self):
        return f"<Rating ID: {self.id} - Rating: {self.rating_value} for Report ID: {self.report_id} by User ID: {self.user_id}>"

# Add a relationship to the User and Report models

User.ratings = db.relationship('Rating', back_populates='user', cascade='all, delete')
Report.ratings = db.relationship('Rating', back_populates='report', cascade='all, delete')
