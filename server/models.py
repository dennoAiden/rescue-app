from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Enum, func, DateTime

db=SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String, nullable=False)
    email=db.Column(db.String, unique=True, nullable=False)
    password=db.Column(db.String, nullable=False)
    role=db.Column(Enum('admin', 'user'), default='user')
    created_at=db.Column(db.DateTime, default=func.now())

    reports = db.relationship('Report', back_populates='users', cascade='all, delete')

class Admin(db.Model, SerializerMixin):
    __tablename__='admins_acts'

    id=db.Column(db.Integer, primary_key=True)
    incident_report_id=db.Column(db.Integer, db.ForeignKey('incident_reports.id'))
    action = db.Column(Enum('status_change', 'flagged', 'resolved'))
    admin_id=db.Column(db.Integer, db.ForeignKey('users.id'), )
    create_at=db.Column(db.DateTime, default=func.now())

    reports = db.relationship('Report', back_populates='admin_acts', cascade='all, delete')

class Report(db.Model, SerializerMixin):
    __tablename__='incident_reports'

    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title=db.Column(db.String, nullable=False)
    description=db.Column(db.String, nullable=False)
    status=db.Column(Enum('under investigation', 'resolved', 'rejected'), default='under investigation')
    latitude=db.Column(db.Float, nullable=False)
    longitude=db.Column(db.Float, nullable=False)
    created_at=db.Column(db.DateTime, default=func.now())
    updated_at=db.Column(db.DateTime, default=func.now())

    # relationship
    user = db.relationship('User', back_populates='incident_reports', cascade='all, delete')
    admin = db.relationship('Admin', back_populates='incident_reports', cascade='all, delete')
    medias = db.relationship('Media', back_populates='incident_reports', cascade='all, delete')

class Media(db.Model, SerializerMixin):
    __tablename__='incident_medias'
    
    id=db.Column(db.Integer, primary_key=True)
    incident_report_id=db.Column(db.Integer, db.ForeignKey('incident_reports.id'), nullable=False)
    media_type=db.Column(Enum('image', 'video'), nullable=False)
    media_url=db.Column(db.String, nullable=False)

    report = db.relationship('Report', back_populates='incident_medias', cascade='all, delete')



class Notification(db.Model, SerializerMixin):
    __tablename__='notifications'

    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message=db.Column(db.String, nullable=False)
    read=db.Column(db.Boolean)
    created_at=db.Column(db.DateTime, default=func.now())