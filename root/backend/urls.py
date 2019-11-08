from django.urls import path, include
from . import views
from rest_framework import routers



router = routers.DefaultRouter()
router.register('all', views.dataSets, base_name='dane')
router.register('ItemRequested', views.dataItemRequestedSets,  base_name='ItemRequested')
router.register('ItemDeleted', views.dataItemDeletedSets,
                base_name='ItemDeleted')
router.register('idle', views.dataIdleSets, base_name='idle')
router.register('PostNotice', views.postRequestedNoticeState,
                base_name='PostNotice')
 


router.register('PostDelete', views.postDeletedState, base_name='PostDelete')

urlpatterns = router.urls
