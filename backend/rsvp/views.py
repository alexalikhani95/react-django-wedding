import logging
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
import smtplib
from .models import Rsvp
from .serializers import RsvpSerializer

logger = logging.getLogger(__name__)

class RsvpCreate(generics.CreateAPIView):
    queryset = Rsvp.objects.all()
    serializer_class = RsvpSerializer

    def perform_create(self, serializer):
        # Save the RSVP to the database
        rsvp = serializer.save()
        
        # Send email notification after RSVP is saved
        try:
            # Get the person's full name
            name = f"{rsvp.first_name} {rsvp.last_name}"
            
            # Send email to notify about the new RSVP
            send_mail(
                subject=f'New RSVP from {name}',
                message=f'{name} has submitted an RSVP.',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=settings.RSVP_NOTIFICATION_EMAILS,
                fail_silently=False,
            )
        except (smtplib.SMTPException, ValueError) as e:
            # If email fails, log the error but don't stop the RSVP from being saved
            # ValueError = header injection attempt (Django blocks this automatically)
            # SMTPException = email server connection/auth errors
            logger.error(f"Failed to send RSVP notification email: {e}", exc_info=True)

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