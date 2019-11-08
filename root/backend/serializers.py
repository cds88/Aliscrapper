from rest_framework import serializers
from backend.models import Item, ItemRequested, ItemDeleted, Idle


class ItemSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField()
    status = serializers.ReadOnlyField()
    dateRequested = serializers.ReadOnlyField()
    timeRequested = serializers.ReadOnlyField()
    dateDeleted = serializers.ReadOnlyField()
    timeDeleted = serializers.ReadOnlyField()

    extra = serializers.ReadOnlyField()

    class Meta:
        model = Item
        fields = '__all__'


class IdleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Idle
        fields = '__all__'
        # depth = 2


class ItemRequestedSerializer(serializers.ModelSerializer):
    getDate = serializers.ReadOnlyField()

    class Meta:
        model = ItemRequested
        fields = '__all__'
    


class SelectedSerializerPOST(serializers.ModelSerializer):

    class Meta:
        model = ItemRequested
        fields = '__all__'


class ItemDeletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemDeleted
        fields = '__all__'
        # depth = 1
