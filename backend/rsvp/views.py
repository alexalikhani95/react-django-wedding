from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Rsvp
from .serializers import RsvpSerializer

class RsvpCreate(generics.CreateAPIView):
    queryset = Rsvp.objects.all()
    serializer_class = RsvpSerializer

class RsvpList(generics.ListAPIView):
    queryset = Rsvp.objects.all()
    serializer_class = RsvpSerializer

class RsvpDelete(generics.DestroyAPIView):
    queryset = Rsvp.objects.all()

@api_view(['GET'])
def meal_counts(request):
    """
    Returns counts for each of the 8 meal combinations.
    Only counts RSVPs where wedding_day is 'accept'.
    """
    # Only count RSVPs where guests are attending the wedding day
    rsvps = Rsvp.objects.filter(wedding_day='accept')
    
    # Define all 8 combinations
    combinations = [
        {'starter': 'tomato', 'main': 'croute', 'dessert': 'tart'},
        {'starter': 'tomato', 'main': 'croute', 'dessert': 'jelly'},
        {'starter': 'tomato', 'main': 'risotto', 'dessert': 'tart'},
        {'starter': 'tomato', 'main': 'risotto', 'dessert': 'jelly'},
        {'starter': 'antipasti', 'main': 'croute', 'dessert': 'tart'},
        {'starter': 'antipasti', 'main': 'croute', 'dessert': 'jelly'},
        {'starter': 'antipasti', 'main': 'risotto', 'dessert': 'tart'},
        {'starter': 'antipasti', 'main': 'risotto', 'dessert': 'jelly'},
    ]
    
    counts = []
    for combo in combinations:
        matching_rsvps = rsvps.filter(
            starter=combo['starter'],
            main=combo['main'],
            dessert=combo['dessert']
        )
        
        names = [
            {
                'first_name': rsvp.first_name,
                'last_name': rsvp.last_name
            }
            for rsvp in matching_rsvps
        ]
        
        counts.append({
            'starter': combo['starter'],
            'main': combo['main'],
            'dessert': combo['dessert'],
            'count': matching_rsvps.count(),
            'names': names
        })
    
    return Response(counts)