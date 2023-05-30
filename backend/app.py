from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

from sqlalchemy.orm import backref

app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)

# Customer Schema
class Customer(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String())
  cpf = db.Column(db.Integer, unique=True)
  phone = db.Column(db.Integer)
  email = db.Column(db.String())
  mothers_name = db.Column(db.String())
  city = db.Column(db.String())
  address = db.Column(db.String())
  sex = db.Column(db.String())

  def __init__(self, name, cpf, phone, email, mothers_name, city, address, sex):
    self.name = name
    self.cpf = cpf
    self.phone = phone
    self.email = email
    self.mothers_name = mothers_name
    self.city = city
    self.address = address
    self.sex = sex


# WorkOrder Schema
class WorkOrder(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String())
  description = db.Column(db.String())
  price = db.Column(db.Float)
  payment = db.Column(db.String())
  customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))
  customer = db.relationship('Customer', backref=db.backref('work_orders', lazy=True))

  def __init__(self, name, description, price, payment, customer_id):
    self.name = name
    self.description = description
    self.price = price
    self.payment = payment
    self.customer_id = customer_id


# WorkOrder Schema
class WorkOrderSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'description', 'price', 'payment', 'customer_id')

# Customer Schema
class CustomerSchema(ma.Schema):
  work_orders = ma.Nested(WorkOrderSchema, many=True)
  class Meta:
    fields = ('id', 'name', 'cpf', 'phone', 'email', 'mothers_name', 'city', 'address', 'sex', 'work_orders')

# Init schema
customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)
work_order_schema = WorkOrderSchema()
work_orders_schema = WorkOrderSchema(many=True)


# Create Customer
@app.route('/customers', methods=['POST'])
def add_customer():
  name = request.json['name']
  cpf = request.json['cpf']
  phone = request.json['phone']
  email = request.json['email']
  mothers_name = request.json['mothers_name']
  city = request.json['city']
  address = request.json['address']
  sex = request.json['sex']

  new_customer = Customer(name, cpf, phone, email, mothers_name, city, address, sex)

  db.session.add(new_customer)
  db.session.commit()

  return customer_schema.jsonify(new_customer)

# Get All Customers
@app.route('/customers', methods=['GET'])
def get_customers():
  result = Customer.query.all()
  return customers_schema.jsonify(result)

# Get Single Customer
@app.route('/customers/<id>', methods=['GET'])
def get_customer(id):
  customer = Customer.query.get(id)
  return customer_schema.jsonify(customer)

# Update a Customer
@app.route('/customers/<id>', methods=['PUT'])
def update_customer(id):
  customer = Customer.query.get(id)

  name = request.json['name']
  cpf = request.json['cpf']
  phone = request.json['phone']
  email = request.json['email']
  mothers_name = request.json['mothers_name']
  city = request.json['city']
  address = request.json['address']
  sex = request.json['sex']

  customer.name = name
  customer.cpf = cpf
  customer.phone = phone
  customer.email = email
  customer.mothers_name = mothers_name
  customer.city = city
  customer.address = address
  customer.sex = sex

  db.session.commit()

  return customer_schema.jsonify(customer)


# Delete Customer
@app.route('/customers/<id>', methods=['DELETE'])
def delete_customer(id):
  customer = Customer.query.get(id)
  db.session.delete(customer)
  db.session.commit()

  return customer_schema.jsonify(customer)

# Create WorkOrder
@app.route('/work-orders', methods=['POST'])
def add_work_order():
  name = request.json['name']
  description = request.json['description']
  price = request.json['price']
  payment = request.json['payment']
  customer_id = request.json['customer_id']

  new_work_order = WorkOrder(name, description, price, payment, customer_id)

  db.session.add(new_work_order)
  db.session.commit()

  return work_order_schema.jsonify(new_work_order)

# Get All WorkOrders
@app.route('/work-orders', methods=['GET'])
def get_work_orders():
  result = WorkOrder.query.all()
  return work_orders_schema.jsonify(result)

# Get Single WorkOrder
@app.route('/work-orders/<id>', methods=['GET'])
def get_work_order(id):
  result = WorkOrder.query.get(id)
  return work_order_schema.jsonify(result)

# Update a WorkOrder
@app.route('/work-orders/<id>', methods=['PUT'])
def update_work_order(id):
  work_order = WorkOrder.query.get(id)

  name = request.json['name']
  description = request.json['description']
  price = request.json['price']
  payment = request.json['payment']
  customer_id = request.json['customer_id']

  work_order.name = name
  work_order.description = description
  work_order.price = price
  work_order.payment = payment
  work_order.customer_id = customer_id

  db.session.commit()

  return work_order_schema.jsonify(work_order)


# Delete WorkOrder
@app.route('/work-orders/<id>', methods=['DELETE'])
def delete_work_order(id):
  work_order = WorkOrder.query.get(id)
  db.session.delete(work_order)
  db.session.commit()

  return work_order_schema.jsonify(work_order)

if __name__ == '__main__':
  app.run(debug=True)