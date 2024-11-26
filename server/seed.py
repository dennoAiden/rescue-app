from app import app, db
# from models import User, Report, Admin, ImageUrl, VideoUrl, EmergencyReport, Notification, Rating, UserRoleEnum, ReportStatusEnum, AdminActionEnum
# import datetime
# from werkzeug.security import generate_password_hash

# # Seed data for the User model
# users = [
#     {"username": "johndoe", "email": "john.doe@example.com", "phone": "1234567890", "password": generate_password_hash("password123"), "role": 'user', "created_at": datetime.datetime.now()},
#     {"username": "janedoe", "email": "jane.doe@example.com", "phone": "9876543210", "password": generate_password_hash("password456"), "role": 'admin', "created_at": datetime.datetime.now()},
#     {"username": "alexsmith", "email": "alex.smith@example.com", "phone": "1112223333", "password": generate_password_hash("password789"), "role": 'user', "created_at": datetime.datetime.now()},
# ]

# # Seed data for the Report model
# reports = [
#     {"user_id": 1, "description": "Traffic accident at Main St.", "status": 'resolved', "latitude": 40.7128, "longitude": -74.0060, "response_time": 30, "created_at": datetime.datetime.now()},
#     {"user_id": 2, "description": "Fire at Elm St. House", "status": 'resolved', "latitude": 40.7138, "longitude": -74.0160, "response_time": 20, "created_at": datetime.datetime.now()}
# ]

# # Seed data for the Admin model
# admin_actions = [
#     {"incident_report_id": 1, "action": 'status_change', "admin_id": 2},
#     {"incident_report_id": 2, "action": 'resolved', "admin_id": 2},
# ]

# # Seed data for the ImageUrl model
# images = [
#     {"incident_report_id": 1, "media_image": "https://example.com/images/report1.jpg"},
#     {"incident_report_id": 2, "media_image": "https://example.com/images/report2.jpg"},
# ]

# # Seed data for the VideoUrl model
# videos = [
#     {"incident_report_id": 1, "media_video": "https://example.com/videos/report1.mp4"},
#     {"incident_report_id": 2, "media_video": "https://example.com/videos/report2.mp4"},
# ]

# # Seed data for the EmergencyReport model
# emergencies = [
#     {"name": "Explosion in downtown", "description": "Large explosion reported", "status": 'under_investigation', "latitude": 40.7120, "longitude": -74.0020, "phone": 911},
#     {"name": "Building collapse", "description": "Collapsed building on Oak St.", "status": 'under_investigation', "latitude": 40.7150, "longitude": -74.0090, "phone": 911},
# ]

# # Seed data for the Notification model
# notifications = [
#     {"message": "New report pending review", "read": False},
#     {"message": "Emergency report updated", "read": True},
# ]

# # Seed data for the Rating model
# ratings = [
#     {"user_id": 1, "report_id": 1, "rating_value": 4},
#     {"user_id": 2, "report_id": 2, "rating_value": 5},
# ]

# with app.app_context():
#     db.drop_all()
#     db.create_all()
#     # Add Users
#     db.session.add_all([User(**user) for user in users])
    
#     # Add Reports
#     db.session.add_all([Report(**report) for report in reports])
    
#     # Add Admin Actions
#     db.session.add_all([Admin(**action) for action in admin_actions])
    
#     # Add Images
#     db.session.add_all([ImageUrl(**image) for image in images])
    
#     # Add Videos
#     db.session.add_all([VideoUrl(**video) for video in videos])
    
#     # Add Emergency Reports
#     db.session.add_all([EmergencyReport(**emergency) for emergency in emergencies])
    
#     # Add Notifications
#     db.session.add_all([Notification(**notification) for notification in notifications])
    
#     # Add Ratings
#     db.session.add_all([Rating(**rating) for rating in ratings])

#     db.session.commit()

# print("Database seeding complete.")

with app.app_context():
    import os
    secret_key = os.urandom(24)
    print(secret_key)

