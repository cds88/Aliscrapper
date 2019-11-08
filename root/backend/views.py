from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from .serializers import ItemSerializer, ItemRequestedSerializer, SelectedSerializerPOST, ItemDeletedSerializer, IdleSerializer
from .models import Item, ItemRequested, ItemDeleted, Idle
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
'''THESE ARE VIEWS FOR MY API '''
#comments stand for data returned from URL

#ALL ITEMS


#POST COPYRIGHT INFRIGEMENT NOTICE
class postRequestedNoticeState(viewsets.ModelViewSet):
    queryset= ItemRequested.objects.all()
    serializer_class = ItemRequestedSerializer

    def create(self, request, *args, **kwargs):
        data= request.data.get('items') if 'items' in request.data else request.data
        many = isinstance(data, list)
        serializer= ItemRequestedSerializer(data=data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


#POST DELETED ITEMS DUE TO INFRIGEMENT NOTICE
class postDeletedState(viewsets.ModelViewSet):
    queryset = ItemDeleted.objects.all()
    serializer_class = ItemDeletedSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.get(
            'items') if 'items' in request.data else request.data
        many = isinstance(data, list)
        serializer = ItemDeletedSerializer(data=data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)






class dataSets(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.get('items') if 'items' in request.data else request.data
        many = isinstance(data, list)
        print(data, many)
        serializer = ItemSerializer(data=data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)


# ONLY IDLE ITEMS   -  NOT REQUESTED
class dataIdleSets(viewsets.ModelViewSet):
    queryset = Item.objects.filter(itemrequested=None, itemdeleted=None)
    serializer_class = ItemSerializer


# ONLY REQUESTED ITEMS
class dataItemRequestedSets(viewsets.ModelViewSet):
    #queryset = ItemRequested.objects.filter(ItemDeleted=None)
    queryset = Item.objects.exclude(
        itemrequested=None).filter(itemdeleted=None)
    serializer_class = ItemSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.get(
            "items") if "items" in request.data else request.data
        many = isinstance(data, list)
        print(data, many)
        serializer = SelectedSerializerPOST(data=data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


# ONLY DELETED ITEM DUE TO PROPERTY RIGHTS VIOLATION
class dataItemDeletedSets(viewsets.ModelViewSet):
    queryset = Item.objects.exclude(itemdeleted=None)
    serializer_class = ItemSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.get(
            "items") if "items" in request.data else request.data
        many = isinstance(data, list)
        serializer = ItemDeleted(data=data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
