#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import os
from google.appengine.ext import ndb
import jinja2
import webapp2
import urllib2


JINJA_ENVIRONMENT = jinja2.Environment(
        loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
        extensions=['jinja2.ext.autoescape'],
        autoescape=True)

""" Models """
class EventModel(ndb.Model):
    name = ndb.StringProperty()
    location = ndb.StringProperty()
    sensor = ndb.StringProperty()
    camera = ndb.StringProperty()

class CameraModel(ndb.Model):
    camera_id = ndb.StringProperty()
    count = ndb.IntegerProperty()
    timestamp = ndb.DateTimeProperty()
    
class RatingModel(ndb.Model):
    score = ndb.StringProperty()
    piid = ndb.StringProperty()

class DwellTimeModel(ndb.Model):
    time = ndb.StringProperty()
    piid = ndb.StringProperty()

class BuzzModel(ndb.Model):
    piid = ndb.StringProperty()
    buzz = ndb.StringProperty()
    timestamp = ndb.DateTimeProperty(auto_now_add=True)

""" API """
class Camera(webapp2.RequestHandler):
    def post(self):
        camera = CameraModel()
        camera.camera_id = self.request.get('id')
        camera.location = self.request.get('location')
        camera.count = self.request.get('count')
        camera.timestamp = self.request.get('timestamp')
        
class Rating(webapp2.RequestHandler):
    def post(self):
        rating = RatingModel()
        rating.piid = self.request.get('piid')
        rating.score = self.request.get('score')
        rating.put()

class DwellTime(webapp2.RequestHandler):
    def post(self):
        dwell = DwellTimeModel()
        dwell.piid = self.request.get('piid')
        dwell.time = self.request.get('time')
        dwell.put()

class Buzz(webapp2.RequestHandler):
    def post(self):
        buzz = BuzzModel()
        buzz.piid = self.request.get('piid')
        buzz.buzz = self.request.get('buzz')
        buzz.put()

""" Webapp """
class MainHandler1(webapp2.RequestHandler):
    def get(self):
        ratings_data = RatingModel.query().fetch()
        dwells = DwellTimeModel.query().fetch(limit=10)
        dwell = sum([float(x.time) for x in dwells])/len(dwells)
        dwell = str(round(dwell, 2))
        buzz = BuzzModel.query().order(-BuzzModel.timestamp).fetch()[0]
        buzz = str(round(float(buzz.buzz), 2))
        ratings = [0,0,0,0,0]
        for rating in ratings_data:
            ratings[int(rating.score)-1]+=1
        template_values = {'data': ratings, 'data1': dwell, 'data2' : buzz }
        template = JINJA_ENVIRONMENT.get_template('dashboard1.html')
        self.response.write(template.render(template_values))

class MainHandler2(webapp2.RequestHandler):
    def get(self):
        ratings_data = RatingModel.query().fetch()
        dwells = DwellTimeModel.query().fetch(limit=10)
        dwell = sum([float(x.time) for x in dwells])/len(dwells)
        dwell = str(round(dwell, 2))
        buzz = BuzzModel.query().order(-BuzzModel.timestamp).fetch()[0]
        buzz = str(round(float(buzz.buzz), 2))
        ratings = [0,0,0,0,0]
        for rating in ratings_data:
            ratings[int(rating.score)-1]+=1
        template_values = {'data': ratings, 'data1': dwell, 'data2' : buzz }
        template = JINJA_ENVIRONMENT.get_template('dashboard2.html')
        self.response.write(template.render(template_values))

class Event(webapp2.RequestHandler):
    def get(self):
        events = EventModel.query().fetch()
        template_values = {
        'data': events
        }
        template = JINJA_ENVIRONMENT.get_template('event.html')
        self.response.write(template.render(template_values))

class AddEvent(webapp2.RequestHandler):
    def get(self):
        template_values = {}
        template = JINJA_ENVIRONMENT.get_template('addevent.html')
        self.response.write(template.render(template_values))
        
    def post(self):
        event = EventModel()
        event.name = self.request.get('name')
        event.location = self.request.get('location')
        event.sensor = self.request.get('sensor')
        event.camera = self.request.get('camera')
        event.put()
        self.redirect('/event')

""" Wrapper """
app = webapp2.WSGIApplication([
    ('/aewv', MainHandler1),
    ('/gwae', MainHandler2),
    ('/buzz', Buzz),
    ('/dwelltime', DwellTime),
    ('/rating', Rating),
    ('/camera', Camera),
    ('/event', Event),
    ('/addevent', AddEvent)
], debug=True)




