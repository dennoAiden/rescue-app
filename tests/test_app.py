import pytest
from flask import json
from server.app import app, db
from server.models import User, Report, Admin, EmergencyReport

@pytest.fixture
def client():
    """Create a test client"""
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    app.config['TESTING'] = True
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

@pytest.fixture
def sample_user():
    """Create a sample user"""
    return {
        'username': 'testuser',
        'email': 'test@example.com',
        'phone': '1234567890',
        'password': 'testpass123',
        'role': 'user'
    }

@pytest.fixture
def sample_incident():
    """Create a sample incident report"""
    return {
        'user_id': 1,
        'description': 'Test incident',
        'status': 'under investigation',  # Fixed: Changed from 'pending'
        'latitude': '1.2345',
        'longitude': '6.7890'
    }

def test_signup(client, sample_user):
    """Test user registration"""
    response = client.post('/signup',
                         data=json.dumps(sample_user),
                         content_type='application/json')
    assert response.status_code == 201
    assert b'User added successfully' in response.data

def test_login(client, sample_user):
    """Test user login"""
    # First create a user
    client.post('/signup',
                data=json.dumps(sample_user),
                content_type='application/json')
    
    # Then try to login
    login_data = {
        'email': sample_user['email'],
        'password': sample_user['password']
    }
    response = client.post('/login',
                          data=json.dumps(login_data),
                          content_type='application/json')
    assert response.status_code == 201

def test_get_users(client, sample_user):
    """Test getting all users"""
    # First create a user
    client.post('/signup',
                data=json.dumps(sample_user),
                content_type='application/json')
    
    response = client.get('/users')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) > 0

def test_incident_creation(client, sample_incident):
    """Test incident report creation"""
    response = client.post('/incidents',
                          data=json.dumps(sample_incident),
                          content_type='application/json')
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['description'] == sample_incident['description']

def test_get_incidents(client, sample_incident):
    """Test getting all incidents"""
    # First create an incident
    client.post('/incidents',
                data=json.dumps(sample_incident),
                content_type='application/json')
    
    response = client.get('/incidents')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) > 0

def test_emergency_report(client):
    """Test emergency report creation"""
    emergency_data = {
        'name': 'Test Emergency',
        'description': 'Emergency situation',
        'status': 'under investigation',  # Fixed: Changed from 'active'
        'latitude': '1.2345',
        'longitude': '6.7890',
        'phone': '1234567890'
    }
    response = client.post('/emergency-reporting',
                          data=json.dumps(emergency_data),
                          content_type='application/json')
    assert response.status_code == 201
    assert b'Emergency posted successfully' in response.data

def test_admin_incidents(client):
    """Test getting admin incidents"""
    response = client.get('/admin/reports')
    assert response.status_code == 200

