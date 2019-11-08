import requests
from datetime import date 
import json
'''
LOGIN_URL = 'http://algorytmy123.pythonanywhere.com/login/'
LOGOUT_URL = 'http://algorytmy123.pythonanywhere.com/logout/'
API_GET_URL = 'http://algorytmy123.pythonanywhere.com/data/all/'
API_GET_REQUESTED = 'http://algorytmy123.pythonanywhere.com/data/ItemRequested/'
API_GET_IDLE = 'http://algorytmy123.pythonanywhere.com/data/idle/'
'''
LOGIN_URL = 'http://127.0.0.1:8000/login/'
LOGOUT_URL = 'http://127.0.0.1:8000/logout/'
API_GET_URL = 'http://127.0.0.1:8000/data/all/'
 

class DataManager:
     managers = [] #STATIC/CLASS LIST CONTAING DATA MANAGERS FOR BOTH LOCAL AND SERVER SITE
     def __init__(self):
          self.__class__.managers.append(self)
          self.data  = None
          self.len  = None
          self.counts = {}

     def allSetter(self, data):
          self.data = data
          self.len = len(data)
          self.counts['All'] = len(data)

     def __repr__(self):
          return "{} data contains {}".format(self.__class__.__name__, str(self.counts))

     def __str__(self):
          return 'its ok '

     
     def __call__(self):
          return self.__class__.managers





     @classmethod
     def compareManagers(cls):
          local      = cls.managers[0].data
          server     = cls.managers[1].requested
          differ     = cls.dataEqualize(server[0], local[0])
          converted  = cls.dataConverter(server, differ)
          result = cls.dataCompare(local, converted)
          print(result)
          
     @staticmethod
     def dataEqualize(serverDataSample, localDataSample):
          difference = list(set(serverDataSample).difference(set(localDataSample )))
     
          return difference
     
     @classmethod
     def dataConverter(cls, data, difference):
          
          temp = data
          for i in temp:
               for d in difference:
                    del i[d]
          return temp
     @staticmethod
     def dataCompare(local, converted):
          if all(local.count(i) > 0 for i in converted):
               return "its ok"
          else:
               wynik = [i for i in converted if local.count(i)<1 ]
               return wynik
          
                  

 

class Local(DataManager):
     def __init__(self):
          super().__init__()

     
class Server(DataManager):
     def __init__(self):
          super().__init__()
          self.requested = None
          self.requestedCount= None
          self.idle = None
          self.idleCount= None
     def setRequested(self, data):
          self.requestedCount = len(data)
          self.requested = data
          self.counts['Requested']=len(data)
     def setIdle(self, data):
          self.idle = data
          self.idleCount = len(data)
          self.counts['Idle'] = len(data)
         
#MAIN CONNECTION OBJECT / BACKEND/API WRAPPER                  
class Connection:
     def __init__(self):
          self.client = requests.session()  #SESSION OBJECT
          
          
          self.response= None # MOST RECENT RESPONSE
          self.token=None # MOST RECENT CSRF TOKEN 
          self.loggedin = False 
          


          self.local = Local()     #LOCAL NEW DATA FROM WEBSCRAPPER  MANAGER
          self.server = Server()    #BACKEND OLD SERVER DATA ALREADY SCRAPED MANAGER 

     def update(self):
          self.server.setRequested(self.get(API_GET_REQUESTED))
          self.server.setIdle(self.get(API_GET_IDLE))
          self.server.allSetter(self.get(API_GET_URL))
          self.local.allSetter(self.loadLocalData())
     
     def __repr__(self):
          from pprint import pprint
          pprint(self.__dict__)
          if self.loggedin:
               return '\t\tClient authenticated'
          else:
               return '\t\tClient not logged in '
     def __call__(self):
          if self.loggedin:
               print("Login out")
               return self.logout()
          else:
               print("Login in")
               return self.login()


   
#LOG IN/OUT METHODS

     def logout(self, url=LOGOUT_URL):
          headers={'X-CSRFToken': self.token}
          self.response = self.client.get(url, headers=headers)
          self.loggedin=False

          
          

     def login(self):
          url = LOGIN_URL
          self.client.get(url)
          csrftoken = self.client.cookies['csrftoken']
          login_data =dict(username='ser', password='123', csrfmiddlewaretoken=csrftoken, next='/')
          headers={'X-CSRFToken': csrftoken}
          self.response = self.client.post(url, data=login_data, headers=headers)
          self.setToken(self.response)


     def setToken(self, response):
          try:
               self.token = response.cookies['csrftoken']
               self.loggedin = True
               return 'TOKEN SET CORRECTLY'
          except:
               return 'TOKEN RETREIVE ERROR'



          


          
          
#HANDLING DATA BUSINESS LOGIC 

#HANDLING DATA FLOW
          
          
     def get(self, url = API_GET_URL):            
          headers={'X-CSRFToken': self.token}
          response=self.client.get(url, headers= headers)
          self.setToken(response)
       
          self.setLog("GET")
          data = json.loads(response.text)
          return data
          
        

     def loadLocalData(self):
          f = open('results.json', 'r')
          data = json.loads(f.read())
          f.close()
          return data
          
          
     def post(self,  url = API_GET_URL):
           
          f = open('results.json', 'r')

          data = f.read()
          fdata = json.loads(data)
          f.close()
          fdata = [{key:(str(value).replace('[','').replace(']','').replace("'","") if key=="images" else value ) for (key,value) in item.items() }for item in fdata ]
        
          
           
          
          data_json =  json.dumps(fdata)
          headers= {'Content-type': 'application/json', 'X-CSRFToken':self.token}
    
          self.response = self.client.post(url, data=data_json, headers=headers)

          self.setToken(self.response)
          self.setLog("POST")
            

     def setLog(self, request):
 
          f = open('logs.txt','a')
          f.write('A %s REQUEST LOG AT %s HAS BEEN MADE \n' %(request, str(date.today())))
          f.close()
 

     



con = Connection()
 

 

 
     
     
