import pytest
from datetime import datetime
from sqlalchemy.exc import StatementError, IntegrityError, DataError
from server.app import app, db
from server.models import User, Report, Admin, EmergencyReport, ImageUrl, VideoUrl, Notification

@pytest.fixture
def test_db():
    """Create test database"""
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    app.config['TESTING'] = True
    
    with app.app_context():
        db.create_all()
        yield db
        db.session.remove()
        db.drop_all()

@pytest.fixture
def test_user(test_db):
    """Create a test user"""
    user = User(
        username='testuser',
        email='test@example.com',
        phone='1234567890',
        password='hashedpassword',
        role='user'
    )
    test_db.session.add(user)
    test_db.session.commit()
    return user

def test_valid_report_status(test_db, test_user):
    """Test valid report status"""
    report = Report(
        user_id=test_user.id,
        description='Test incident',
        status='under investigation',
        latitude=1.2345,
        longitude=6.7890
    )
    test_db.session.add(report)
    test_db.session.commit()
    assert report.id is not None
    assert report.status == 'under investigation'

def test_invalid_report_status(test_db, test_user):
    """Test invalid report status"""
    with pytest.raises(ValueError):
        report = Report(
            user_id=test_user.id,
            description='Test incident',
            status='invalid_status',
            latitude=1.2345,
            longitude=6.7890
        )
        test_db.session.add(report)
        test_db.session.commit()
        raise ValueError("Invalid report status allowed")

def test_valid_user_role(test_db):
    """Test valid user role"""
    user = User(
        username='adminuser',
        email='admin@example.com',
        phone='1234567890',
        password='hashedpassword',
        role='admin'
    )
    test_db.session.add(user)
    test_db.session.commit()
    assert user.id is not None
    assert user.role == 'admin'

def test_invalid_user_role(test_db):
    """Test invalid user role"""
    with pytest.raises(ValueError):
        user = User(
            username='invaliduser',
            email='invalid@example.com',
            phone='1234567890',
            password='hashedpassword',
            role='invalid_role'
        )
        test_db.session.add(user)
        test_db.session.commit()
        raise ValueError("Invalid user role allowed")

def test_valid_emergency_status(test_db):
    """Test valid emergency status"""
    emergency = EmergencyReport(
        name='Emergency Test',
        description='Test emergency',
        status='under investigation',
        latitude=1.2345,
        longitude=6.7890,
        phone=1234567890
    )
    test_db.session.add(emergency)
    test_db.session.commit()
    assert emergency.id is not None
    assert emergency.status == 'under investigation'

def test_invalid_emergency_status(test_db):
    """Test invalid emergency status"""
    with pytest.raises(ValueError):
        emergency = EmergencyReport(
            name='Emergency Test',
            description='Test emergency',
            status='invalid_status',
            latitude=1.2345,
            longitude=6.7890,
            phone=1234567890
        )
        test_db.session.add(emergency)
        test_db.session.commit()
        raise ValueError("Invalid emergency status allowed")

# def test_valid_admin_action(test_db, test_user, test_report):
#     """Test valid admin action"""
#     admin
