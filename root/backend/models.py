from django.db import models
from django.db.models.signals import post_save
from django.template.defaultfilters import date
# Create your models here.
 
#LISTING I T E M  scrapped from AliExpress
class Item(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length=300)
    seller = models.TextField(null=True)
    price = models.TextField(null=True)
    link = models.TextField(null=True, unique=True)
    thumb = models.TextField(null=True)
 
    images = models.TextField(default='')

    dateCreated = models.DateField(auto_now_add=True)
    timeCreated = models.TimeField(auto_now_add=True)

    @property
    def status(self):
        if ItemRequested.objects.filter(item=self):
            if ItemDeleted.objects.filter(item=self):
                return 'Deleted'
            else:
                return 'Requested'
        else:
            return 'Idle'
 
 

    @property
    def category(self):
        if self.status=='Requested' or self.status=='Deleted':
   
            return ItemRequested.objects.get(item=self).category
        else:
            return None
    
    @property
    def dateRequested(self):
        if self.status=='Requested' or self.status=='Deleted':
            return ItemRequested.objects.get(item=self).dateRequested

    @property
    def timeRequested(self):
        if self.status=='Requested'  or self.status=='Deleted':
            return ItemRequested.objects.get(item=self).timeRequested

    @property
    def dateDeleted(self):
        if self.status=='Deleted':
            return ItemDeleted.objects.get(item=self).dateDeleted

    @property
    def timeDeleted(self):
        if self.status=='Deleted':
            return ItemDeleted.objects.get(item=self).timeDeleted
   
        



class Idle(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    

# item requested for Intellectual Property Procedure 

class ItemRequested(models.Model):
    id = models.AutoField(primary_key=True)
    item = models.ForeignKey(Item,  on_delete=models.CASCADE)
    category = models.TextField(default='')
    dateRequested = models.DateField(auto_now_add=True)
    timeRequested = models.TimeField(auto_now_add=True)
 

    @property
    def getDate(self):
        return '%s - present' % date(self.dateRequested, "n/j/Y")

 
 
 
# item deleted due to requested notice
class ItemDeleted(models.Model):
    id = models.AutoField(primary_key=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    # itemrequested = models.ForeignKey(ItemRequested, on_delete=models.CASCADE)
    dateDeleted = models.DateField(auto_now_add=True)
    timeDeleted = models.TimeField(auto_now_add=True)
 

 
 

