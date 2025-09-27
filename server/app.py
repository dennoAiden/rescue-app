from flask import Flask,make_response,request,jsonify,session, current_app, url_for, redirect, send_from_directory
from sqlalchemy.orm import Session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime, timedelta
from flask_mail import Mail, Message
import smtplib
from email.mime.text import MIMEText
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from sqlalchemy.orm import joinedload
# from flask_bcrypt import Bcrypt
from sqlalchemy import func, MetaData
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
import os

from flask_jwt_extended import create_access_token,JWTManager, create_refresh_token, jwt_required, get_jwt_identity, current_user, verify_jwt_in_request, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

from flask_restful import Resource,Api, reqparse
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash

from server.models import db, User, Report, Notification, Admin, EmergencyReport, ImageUrl, VideoUrl, Rating, ContactMessage, UserRoleEnum
from threading import Thread

app=Flask(__name__)
if os.getenv("TESTING") == "1":
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "postgresql://incidentreport_chmo_user:idKOggfhAQGv8n0JsJAnZj7Lu59clVVv"
        "@dpg-cubhvhin91rc7393mg1g-a.oregon-postgres.render.com/incidentreport_chmo"
    )

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
app.config['SECRET_KEY'] = '0c3ZMJFCAm5T-NK5ZzBv50ZLuxamAllTob6uzEqRR14'
app.config['JWT_ACCESS_TOKEN_EXPIRES']=timedelta(minutes=300)
app.config["JWT_TOKEN_LOCATION"] = ["headers"] 
app.config["JWT_SECRET_KEY"] = b'\x89\x87T\x12\xd4\xce\xbcb@OZ\x81J\x93YT\xd5\xefv\xe5\xd4,^\x02'

app.config['JWT_ACCESS_REFRESH_EXPIRES']=timedelta(days=30)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url

# Configuration       
cloudinary.config( 
    cloud_name = "donshmlbl", 
    api_key = "242734965428198", 
    api_secret = "bEjn6K699pjcC3kOL3bTGPZHOu8",
    secure=True
)


CORS(app, resources={r"/*": {"origins": "https://incident-report-apps.onrender.com"}})
migrate=Migrate(app,db)
db.init_app(app)
api=Api(app)
jwt = JWTManager(app)

# Flask-Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'noreplyrescueapp@gmail.com'
app.config['MAIL_PASSWORD'] = 'qzambnfrbjqpqlwp'
app.config['MAIL_DEFAULT_SENDER'] = 'noreplyrescueapp@gmail.com'

mail = Mail(app)
s = URLSafeTimedSerializer(app.config['SECRET_KEY'])

@app.route('/output.css')
def serve_css():
    return send_from_directory('static', 'output.css', mimetype='text/css')

#  creating a custom hook that helps in knowing the roles of either the buyer or the administrator
# a method called allow that uses the user roles and give users certain rights to access certain endpoints
def allow(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):  
            jwt_claims=get_jwt()
            user_roles=jwt_claims.get('role',None)
            
            # Check if the user_role is in the allowed roles
            if user_roles in roles:
                return fn(*args, **kwargs)
            else:
                # creating and returning a response based on the response_body
                response_body = {"message": "Access is forbidden"}
                response = make_response(response_body, 403)
                return response

        return decorator

    return wrapper


# @jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).first()

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    return response

def send_async_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
        except Exception as e:
            app.logger.error(f"Error sending email: {str(e)}")
def send_email(app, msg):
    Thread(target=send_async_email, args=(app, msg)).start()



class Users(Resource):
    # @jwt_required()
    # @allow("admin")
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)


class GetUser(Resource):
    def get(self, id):
        user = db.session.query(User).options(
            joinedload(User.incident_reports).joinedload(Report.images),
            joinedload(User.incident_reports).joinedload(Report.videos)
        ).filter(User.id == id).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({"message": "User not found"}, 400)
        
    def delete(self, id):
        user = User.query.get(id)
        if not user:
            return make_response({"error": "User not found!"}, 404)
        
        db.session.delete(user)
        db.session.commit()
        return make_response({"message": f"{user.username} deleted!"}, 200)
    
class BanUser(Resource):
    def patch(self, id):
        user = User.query.get(id)
        if not user:
            return {"message": "User not found"}, 404

        user.banned = True
        db.session.commit()
        return {"message": "User has been banned"}, 200

class UnbanUser(Resource):
    def patch(self, id):
        try:
            user = User.query.get(id)
            if not user:
                return {"message": "User not found"}, 404
            
            user.banned = False
            db.session.commit()
            return {"message": "User has been unbanned"}, 200
        
        except Exception as e:
            print(f"Error unbanning user: {e}")
            return {"error": str(e)}, 500

# endpoints
class Signup(Resource):
    def post(self):
        # Get JSON data from the request
        data = request.get_json()

        # Validate role
        if data.get('role') and data.get('role') not in ['user', 'admin']:
            return make_response({"message": "role not found"}, 400)

        # Check if all necessary fields are provided
        if not all([data.get('username'), data.get('email'), data.get('phone'), data.get('password')]):
            return make_response(jsonify({"message": "Missing required fields"}), 400)
        
        # Validate email format
        if "@" not in data["email"]:
            return make_response({"message": "Please include an '@' in the email address."}, 400)

        # Check if email already exists in the database
        if User.query.filter_by(email=data["email"]).first():
            return make_response({"message": "Email already exists"}, 400)

        # Hash the password
        password = generate_password_hash(data["password"])

        # Create new user
        new_user = User(
            username=data.get('username'),
            phone=data.get('phone'),
            email=data.get('email'),
            password=password,
            role=data.get('role', 'user'),
            created_at=datetime.now()
        )

        # Generate confirmation token and link
        email = data['email']
        token = s.dumps(email, salt='email-confirm')
        link = url_for('confirmemail', token=token, _external=True)

        # Compose the confirmation email content
        msg = MIMEText(f'''
            <html>
                <body>
                    <h2>Hi {data['username']},</h2>
                    <p>Thank you for signing up for <strong>RescueApp</strong>! Please confirm your email by clicking the link below:</p>
                    <p><a href="{link}" style="background-color: #F59E0B; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm Email</a></p>
                    <p>If the above button doesn't work, copy and paste this link into your browser:</p>
                    <p>{link}</p>
                    <br>
                    <p>If you did not sign up, you can safely ignore this email.</p>
                    <p>Best,<br>The RescueApp Team</p>
                </body>
            </html>
        ''', 'html')

        msg['Subject'] = 'Confirm Your Email'
        msg['From'] = 'noreplyrescueapp@gmail.com'
        msg['To'] = email

        # Send the confirmation email
        try:
            with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.starttls()
                server.login('noreplyrescueapp@gmail.com', 'qzambnfrbjqpqlwp')  # Use your app password
                server.sendmail('noreplyrescueapp@gmail.com', email, msg.as_string())
                print("Email sent successfully!")
        except Exception as e:
            print(f"Error sending email: {e}")
            return make_response(jsonify({"message": "Error sending confirmation email", "error": str(e)}), 500)

        # Add user to the database after successful email send
        try:
            db.session.add(new_user)
            db.session.commit()
            return make_response(jsonify({"message": "User added successfully"}), 201)
        except Exception as e:
            db.session.rollback()
            return make_response(jsonify({"message": "Error creating user", "error": str(e)}), 500)
        
class ConfirmEmail(Resource):
    def get(self, token):
        try:
            # Decode the token
            email = s.loads(token, salt='email-confirm', max_age=300)

            # Find the user by email
            user = User.query.filter_by(email=email).first()

            if not user:
                return make_response({"message": "Invalid token or user not found"}, 404)

            # Update the user as confirmed
            user.confirmed = True
            db.session.commit()

            return redirect('https://incident-report-1.onrender.com/login')
        except SignatureExpired:
            return make_response({"message": "Token has expired"}, 400)
        except Exception as e:
            return make_response({"message": f"Error confirming email: {str(e)}"}, 500)
        
class ResendConfirmation(Resource):
    def post(self):
        data = request.get_json()

        user = User.query.filter_by(email=data.get('email')).first()
        if not user:
            return make_response({"message": "User not found"}, 404)

        if user.confirmed:
            return make_response({"message": "Email already confirmed."}, 400)

        token = s.dumps(user.email, salt='email-confirm')
        link = url_for('confirm_email', token=token, _external=True)

        msg = Message('Confirm Your Email', sender='kuriaisac@gmail.com', recipients=[user.email])
        msg.html = f'''
            <html>
                <body>
                    <h2>Hi {user.username},</h2>
                    <p>We noticed you requested a new confirmation email for your <strong>RescueApp</strong> account. Please confirm your email by clicking the link below:</p>
                    <p><a href="{link}" style="background-color: #F59E0B; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm Email</a></p>
                    <p>If the above button doesn't work, copy and paste this link into your browser:</p>
                    <p>{link}</p>
                    <br>
                    <p>If you did not request this email, you can safely ignore it.</p>
                    <p>Best,<br>The RescueApp Team</p>
                </body>
            </html>
        '''

        mail.send(msg)

        return make_response({"message": "Confirmation email resent."}, 200)


# incident reports endpoint
    
class Incident(Resource):
    def post(self):

        user_id = request.form.get('user_id')
        description = request.form.get('description')
        latitude = request.form.get('latitude')
        longitude = request.form.get('longitude')

        with db.session() as session:
            user = session.get(User, user_id)
        
        # Check if the user exists and if they are banned
        if not user:
            return make_response(jsonify({"error": "User not found"}), 404)
        if user.banned:
            return make_response(jsonify({"error": "User is banned and cannot post incidents"}), 403)

        new_incident = Report (
            user_id=user_id,
            description=description,
            status="under investigation",
            latitude=latitude,
            longitude=longitude,
            created_at=datetime.now()
        )

        db.session.add(new_incident)
        db.session.flush() 

        images = request.files.getlist('media_image')  
        videos = request.files.getlist('media_video')

        # Upload images to Cloudinary
        for image in images:
            if image:
                upload_result = cloudinary.uploader.upload(image, resource_type="image")
                new_image = ImageUrl(
                    incident_report_id=new_incident.id,
                    media_image=upload_result['url']
                )
                db.session.add(new_image)

        # Upload videos to Cloudinary
        for video in videos:
            if video:
                upload_result = cloudinary.uploader.upload(video, resource_type="video")
                new_video = VideoUrl(
                    incident_report_id=new_incident.id,
                    media_video=upload_result['url']
                )
                db.session.add(new_video)

        # Commit the transaction
        db.session.commit()

        # Prepare the response
        response = new_incident.to_dict()  # Assuming `to_dict` method includes incident details
        response["media"] = {
            "images": [image.media_image for image in ImageUrl.query.filter_by(incident_report_id=new_incident.id)],
            "videos": [video.media_video for video in VideoUrl.query.filter_by(incident_report_id=new_incident.id)]
        }

        return make_response(jsonify(response), 201)

        # db.session.commit()
        
        # print(f"New Incident Created: {new_incident.to_dict()}")
        # return make_response(new_incident.to_dict(), 201)
    
    def get(self):        
        incidents = [incident.to_dict() for incident in Report.query.all()]
        
        return make_response(jsonify(incidents), 200)
    
class GetIncidentId(Resource):
    def get(self, id):

        incident = Report.query.filter(Report.id==id).first()
        if incident:
            # incident_dict = incident.to_dict()
            return make_response(incident.to_dict(), 200)
        return make_response({"message": "incident not found"}, 400)
    
class UpdateIncident(Resource):
    
    def patch(self, id):
        data = request.get_json()


        incident = Report.query.get(id)
        if not incident:
            return make_response({"error": "Incident not found!"}, 404)
        description = data.get('description')
        
        if incident:
            incident.description = description
            db.session.add(incident)
            db.session.commit()
            return make_response('Item updated successfully')
        
class UpdateIncidentStatus(Resource):
    def patch(self, id):
        data = request.get_json()

        new_status = data.get('status')


        incident = Report.query.get(id)
        if not incident:
            return make_response({"error": "Incident not found!"}, 404)

        if new_status in ['under investigation', 'resolved', 'rejected']:
            incident.status = new_status
            db.session.commit()
            return make_response({"message": "Status Updated successfully", "incident": incident.to_dict()}, 200)
        
        else:
            return make_response({"error": "Invalid status"})
        

class DeleteIncident(Resource):
    def delete(self, id):
        incident = Report.query.get(id)
        if not incident:
            return {"message": "Incident not found"}, 404
        
        # Delete associated media
        media_images = ImageUrl.query.filter_by(incident_id=id).all()
        media_videos = VideoUrl.query.filter_by(incident_id=id).all()

        for image in media_images:
            db.session.delete(image)
        for video in media_videos:
            db.session.delete(video)

        db.session.delete(incident)
        db.session.commit()

        return {"message": "Incident and associated media deleted successfully"}, 200

        

# class DeleteIncident(Resource):
    
#     def delete(self, id):

#         incident_del = Report.query.get(id)
#         db.session.delete(incident_del)
#         db.session.commit()

#         return make_response('Incident deleted')
    
# class MediaDelete(Resource):
#     def delete(self, id):

#         media_image = ImageUrl.query.get(id)
#         media_video = VideoUrl.query.get(id)
#         db.session.delete(media_image)
#         db.session.delete(media_video)
#         db.session.commit()

#         return make_response('Media deleted!!')
    
class RatingResource(Resource):
    def get(self):
        ratings = Rating.query.all()
        response = [rating.to_dict() for rating in ratings]
        return {"message": response}
        # return make_response(rating.to_dict())

    def post(self):
        # Define the post arguments parser
        post_args = reqparse.RequestParser(bundle_errors=True)
        post_args.add_argument('id', type=int, help='Error!! Add Rating id', required=True)
        post_args.add_argument('rating_value', type=int, help='Error!! Add the Rating value', required=True)
        post_args.add_argument('report_id', type=int, help='Error!! Add the Report Id associated with the Rating', required=True)
        post_args.add_argument('user_id', type=int, help='Error!! Add the User Id associated with the Rating', required=True)

        # Parse the arguments only within the context of a request
        args = post_args.parse_args()

        # Example of how you might use these values
        rating = Rating(
            id=args['id'],
            rating_value=args['rating_value'],
            report_id=args['report_id'],
            user_id=args['user_id']
        )

        # Commit to the database (assuming you have the db session set up)
        db.session.add(rating)
        db.session.commit()

        return {'message': 'Rating created successfully'}, 201
    
class EmergencyPost(Resource):
    def get(self):
        emergencies = [emergency.to_dict() for emergency in EmergencyReport.query.all()]
        return make_response(jsonify(emergencies), 200)

    def post(self):
        data = request.get_json()

        emergency_report = EmergencyReport(
            name = data.get('name'),
            description = data.get('description'),
            status = data.get('status'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            phone=data.get('phone'),
            created_at = datetime.now()
        ) 
        db.session.add(emergency_report)
        db.session.commit()

        return make_response({"message": "Emergency posted successfully"}, 201)
    
class UpdateEmergencyPostStatus(Resource):
    def patch(self, id):
        data = request.get_json()

        new_status = data.get('status')


        incident = Report.query.get(id)
        if not incident:
            return make_response({"error": "Incident not found!"}, 404)

        if new_status in ['under investigation', 'resolved', 'rejected']:
            incident.status = new_status
            db.session.commit()
            return make_response({"message": "Status Updated successfully", "incident": incident.to_dict()}, 200)
        
        else:
            return make_response({"error": "Invalid status"})

    
    
    
# endpoints for notifications

# class GetNotifications(Resource):
#     def get(self):
#         notifications = Notification.query.all()
#         notifications_dict = notifications.to_dict()
#         return notifications_dict
    
#     def post(self):
#         data = request.get_json()

#         new_notification = Notification(
#             user_id = data.get('user_id'),
#             message = data.get('message'),
#             read = data.get('read')
#         )

#         db.session.add(new_notification)
#         db.session.commit()
#         return make_response('Notification added automatically!!')

# endpoints for admin actions

class AdminIncidents(Resource):
    def get(self):
        
        incidents = [incident.to_dict() for incident in Admin.query.all()]
        return make_response(jsonify(incidents), 200)
    
class PostAdminIncidents(Resource):
    def post(self):
        data = request.get_json()

        new_action = Admin (
            incident_report_id = data.get('incident_report_id'),
            action = data.get('action')
        )

        db.session.add(new_action)
        db.session.commit()

        return make_response('Action recorded!!')
    
class Analytics(Resource):
    def get(self):
        try:
            # For example, fetching the number of incidents in the last 30 days
            incident_trends = db.session.query(func.count(Report.id)) \
                .filter(Report.created_at >= datetime.utcnow() - timedelta(days=30)) \
                .scalar()

            # Geographic distribution (count of incidents per location)
            geo_dist = db.session.query(Report.latitude, Report.longitude, func.count(Report.id).label('count')) \
                .group_by(Report.latitude, Report.longitude).all()

            # Convert geo_dist tuples into dictionaries
            geo_dist = [{"latitude": lat, "longitude": lon, "count": count} for lat, lon, count in geo_dist]

            # Response times (average response time for incidents)
            avg_response_time = db.session.query(func.avg(Report.response_time)).scalar()

            # Recent Activity (latest user activity)
            recent_activity = db.session.query(User.username, Report.description, Report.status, Report.created_at) \
                .join(Report).order_by(Report.created_at.desc()).limit(5).all()

            # Convert recent_activity tuples into dictionaries
            recent_activity = [{
                "username": username,
                "description": description,
                "status": status,
                "created_at": created_at.isoformat()  # Convert datetime to string
            } for username, description, status, created_at in recent_activity]

            # Prepare data for front-end
            response_data = {
                "incident_trends": incident_trends,
                "geo_dist": geo_dist,
                "avg_response_time": avg_response_time,
                "recent_activity": recent_activity
            }

            return make_response(jsonify(response_data), 200)
        
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)
    
# class UpdateAdminIncidents(Resource):
#     def patch(self, id):
#         data = request.get_json()

#         incident = Admin.query.get(id)
#         action = data.get('action')

#         if incident:
#             incident.action = action
#             db.session.add(incident)
#             db.session.commit()
#             return make_response('Action updated!!')


  

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data['email']

        user = User.query.filter_by(email=email).first()

        if not user:
            return make_response({"message": f"User with email {email} does not exist"}, 404)
        
        if not user.confirmed:
            return make_response({
                "message": "Email not confirmed. Please confirm your email to proceed."
            }, 403)
        
        if not check_password_hash(user.password, data["password"]):
            return make_response({"message": "The password entered is incorrect"}, 403)
        
        # creating an access and a refresh token
        access_token = create_access_token(identity=user.id, additional_claims={"role": user.role})
        refresh_token = create_refresh_token(identity=user.id)

        return make_response({
            "message": "Logged in",
            "user_data": user.to_dict(),
            "access_token": access_token,
            "refresh_token": refresh_token,
            "role": user.role
        }, 200)
    
    #  a method to refresh the token
    @jwt_required(refresh = True)
    def get(self):
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity)
        response = jsonify(access_token=access_token)
        return response
    
   
class Contact(Resource):
    def post(self):
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not name or not email or not message:
            return {'error': 'All fields are required!'}, 400

        try:
            # Store message in the database
            new_message = ContactMessage(name=name, email=email, message=message)
            db.session.add(new_message)
            db.session.commit()

            # Send the email
            msg = Message(
                subject=f"Contact Form Submission from {name}",
                sender=email,
                recipients=['isackuria@gmail.com'],
                body=f"Name: {name}\nEmail: {email}\nMessage:\n{message}"
            )
            mail.send(msg)

            return {'message': 'Your message has been sent successfully!'}, 201
        except Exception as e:
            print(f"Error: {e}")
            return {'error': 'Failed to send your message. Please try again later.'}, 500

    def get(self):
        try:
            # Retrieve messages from the database
            messages = ContactMessage.query.all()
            return [
                {
                    'id': message.id,
                    'name': message.name,
                    'email': message.email,
                    'message': message.message,
                    # 'timestamp': message.timestamp.isoformat()
                }
                for message in messages
            ], 200
        except Exception as e:
            print(f"Error: {e}")
            return {'error': 'Failed to fetch messages. Please try again later.'}, 500

api.add_resource(GetUser, '/user/<int:id>')
api.add_resource(Users, '/users')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(ConfirmEmail, '/confirmemail/<string:token>')
api.add_resource(ResendConfirmation, '/resend-confirmation')
api.add_resource(BanUser,'/users/<int:id>/ban')
api.add_resource(UnbanUser, '/users/<int:id>/unban')

# routes for incident
api.add_resource(Incident, '/incidents')
api.add_resource(GetIncidentId, '/gets-incident/<int:id>')
api.add_resource(UpdateIncident, '/updates-incident/<int:id>')
api.add_resource(DeleteIncident, '/deletes-incident/<int:id>')

# route for emergency
api.add_resource(EmergencyPost, '/emergency-reporting')
api.add_resource( UpdateEmergencyPostStatus, '/emergency/<int:id>/status' )

# routes for media
# api.add_resource(MediaPost, '/media')
# api.add_resource(MediaDelete, '/media/<int:id>')


# routes for admin actions
api.add_resource(AdminIncidents, '/admin/reports')
# api.add_resource(UpdateAdminIncidents, '/admin/status/<int:id>')
api.add_resource(UpdateIncidentStatus, '/incident/<int:id>/status')
api.add_resource(PostAdminIncidents, '/admin/status')

# route for rating
api.add_resource(RatingResource, '/ratings')

# routes for admin analytics
api.add_resource(Analytics, '/analytics')

# route for contact
api.add_resource(Contact, '/contact')

# routes for notifications
# api.add_resource(GetNotifications, '/notifications')

print(UserRoleEnum('admin'))

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5555))
    app.run(host="0.0.0.0", port=port, debug=True)