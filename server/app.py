from flask import Flask,make_response,request,jsonify,session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt
from sqlalchemy import func
from flask_cors import CORS
import os

from flask_restful import Resource,Api
from sqlalchemy.exc import SQLAlchemyError

from models import db, User, Report, Media, Notification, Admin

app=Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] ="sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True 

migrate=Migrate(app,db)
db.init_app(app)
api=Api(app)
bcrypt=Bcrypt(app)
CORS(app)

# endpoints
class Signup(Resource):
    def post(self):
        data = request.get_json()

        new_user = User(
            username=data.get('username'),
            email=data.get('email'),
            password=bcrypt.generate_password_hash(data.get('password')).decode('utf-8'),
            role=data.get('role')
        )

        db.session.add(new_user)
        db.session.commit()

        return make_response('User added successfully', 201)
    
class Login(Resource):
    def post(self):
        data = request.get_json()

        user = User.query.filter_by(email=data['email']).first()

        if user and bcrypt.check_password_hash(user.password,data['password']):
            return make_response('Logged in successful!')
        return make_response('Check credentials')
    
# incident reports endpoint
    
class Incident(Resource):
    def post(self):
        data = request.get_json()

        new_incident = Report (
            user_id = data.get('user_id'),
            title = data.get('title'),
            description = data.get('description'),
            status = data.get('status'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
        )

        db.session.add(new_incident)
        db.session.commit()

        return make_response('Incident posted!!', 201)
    
    def get(self):
        
        incidents = [incident.to_dict() for incident in Report.query.all()]
        
        return make_response(jsonify(incidents), 200)
    
class GetIncidentId(Resource):
    def get(self, id):

        incident = Report.query.filter(Report.id==id).first()
        if incident:
            incident_dict = incident.to_dict()
            return incident_dict
    
class UpdateIncident(Resource):
    
    def patch(self, id):
        data = request.get_json()

        incident = Report.query.get(id)
        title = data.get('title')
        description = data.get('description')
        
        if incident:
            incident.title = title
            incident.description = description
            db.session.add(incident)
            db.session.commit()
            return make_response('Item updated successfully')



    
class DeleteIncident(Resource):
    
    def delete(self, id):

        incident_del = Report.query.get(id)
        db.session.delete(incident_del)
        db.session.commit()

        return make_response('Incident deleted')
    
# incident media endpoint

class MediaPost(Resource):
    def post(self):
        data = request.get_json()

        new_media = Media (
            incident_report_id = data.get('incident_report_id'),
            media_type = data.get('media_type'),
            media_url = data.get('media_url')
        )

        db.session.add(new_media)
        db.session.commit()

        return make_response('Media added!!')
    
class MediaDelete(Resource):
    def delete(self, id):

        media_del = Media.query.get(id)
        db.session.delete(media_del)
        db.session.commit()

        return make_response('Media deleted!!')
    
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
    
class UpdateAdminIncidents(Resource):
    def patch(self, id):
        data = request.get_json()

        incident = Admin.query.get(id)
        action = data.get('action')

        if incident:
            incident.action = action
            db.session.add(incident)
            db.session.commit()
            return make_response('Action updated!!')
        





api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')

# routes for incident
api.add_resource(Incident, '/incidents')
api.add_resource(GetIncidentId, '/gets-incident/<int:id>')
api.add_resource(UpdateIncident, '/updates-incident/<int:id>')
api.add_resource(DeleteIncident, '/deletes-incident/<int:id>')

# routes for media
api.add_resource(MediaPost, '/media')
api.add_resource(MediaDelete, '/media/<int:id>')

# routes for admin actions
api.add_resource(AdminIncidents, '/admin/reports')
api.add_resource(UpdateAdminIncidents, '/admin/status/<int:id>')


# routes for notifications
# api.add_resource(GetNotifications, '/notifications')







if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5555))
    app.run(host="0.0.0.0", port=port, debug=True)

        
