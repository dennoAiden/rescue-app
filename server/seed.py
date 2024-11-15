from app import app, db
from models import User, UserRoleEnum

# Seed data for the User model
# users = [
#     {"username": "johndoe", "email": "john.doe@example.com", "phone": "1234567890", "password": "password123", "role": UserRoleEnum.user},
#     {"username": "janedoe", "email": "jane.doe@example.com", "phone": "9876543210", "password": "password456", "role": UserRoleEnum.admin},
#     {"username": "alexsmith", "email": "alex.smith@example.com", "phone": "1112223333", "password": "password789", "role": UserRoleEnum.user},
# ]

# with app.app_context():
#     db.session.add_all([User(**user) for user in users])
#     db.session.commit()
from models import Report, ReportStatusEnum
from datetime import datetime

# # Seed data for the Report model
# reports = [
#     {"user_id": 1, "description": "Traffic accident at Main St.", "status": ReportStatusEnum.under_investigation, "latitude": 40.7128, "longitude": -74.0060, "response_time": 30, "created_at": datetime.now()},
#     {"user_id": 2, "description": "Fire at Elm St. House", "status": ReportStatusEnum.resolved, "latitude": 40.7138, "longitude": -74.0160, "response_time": 20, "created_at": datetime.now()},
# ]

# with app.app_context():
#     db.session.add_all([Report(**report) for report in reports])
#     db.session.commit()
from models import Admin, AdminActionEnum

# Seed data for the Admin model
# admin_actions = [
#     {"incident_report_id": 1, "action": AdminActionEnum.approved, "admin_id": 2},
#     {"incident_report_id": 2, "action": AdminActionEnum.rejected, "admin_id": 2},
# ]

# with app.app_context():
#     db.session.add_all([Admin(**action) for action in admin_actions])
#     db.session.commit()
from models import ImageUrl

# Seed data for the ImageUrl model
# images = [
#     {"incident_report_id": 1, "media_image": "https://example.com/images/report1.jpg"},
#     {"incident_report_id": 2, "media_image": "https://example.com/images/report2.jpg"},
# ]

# with app.app_context():
#     db.session.add_all([ImageUrl(**image) for image in images])
#     db.session.commit()
from models import VideoUrl

# Seed data for the VideoUrl model
# videos = [
#     {"incident_report_id": 1, "media_video": "https://example.com/videos/report1.mp4"},
#     {"incident_report_id": 2, "media_video": "https://example.com/videos/report2.mp4"},
# ]

# with app.app_context():
#     db.session.add_all([VideoUrl(**video) for video in videos])
#     db.session.commit()
from models import EmergencyReport, ReportStatusEnum

# Seed data for the EmergencyReport model
# emergencies = [
#     {"name": "Explosion in downtown", "description": "Large explosion reported", "status": ReportStatusEnum.unresolved, "latitude": 40.7120, "longitude": -74.0020, "phone": 911},
#     {"name": "Building collapse", "description": "Collapsed building on Oak St.", "status": ReportStatusEnum.under_investigation, "latitude": 40.7150, "longitude": -74.0090, "phone": 911},
# ]

# with app.app_context():
#     db.session.add_all([EmergencyReport(**emergency) for emergency in emergencies])
#     db.session.commit()
from models import Notification

# Seed data for the Notification model
# notifications = [
#     {"message": "New report pending review", "read": False},
#     {"message": "Emergency report updated", "read": True},
# ]

# with app.app_context():
#     db.session.add_all([Notification(**notification) for notification in notifications])
#     db.session.commit()
from models import Rating

# Seed data for the Rating model
# ratings = [
#     {"user_id": 1, "report_id": 1, "rating_value": 4},
#     {"user_id": 2, "report_id": 2, "rating_value": 5},
# ]

# with app.app_context():
#     db.session.add_all([Rating(**rating) for rating in ratings])
#     db.session.commit()
from app import app, db
from models import User, UserRoleEnum

# Seed data for the User model
users = [
    {"username": "johndoe", "email": "john.doe@example.com", "phone": "1234567890", "password": "password123", "role": UserRoleEnum.user},
    {"username": "janedoe", "email": "jane.doe@example.com", "phone": "9876543210", "password": "password456", "role": UserRoleEnum.admin},
    {"username": "alexsmith", "email": "alex.smith@example.com", "phone": "1112223333", "password": "password789", "role": UserRoleEnum.user},
]

with app.app_context():
    db.session.add_all([User(**user) for user in users])
    db.session.commit()
