from django.test import TestCase
from guests.models import Guest
from tables.models import Table
from django.db import IntegrityError

class GuestTestCase(TestCase):
    def setUp(self):
        self.table = Table.objects.create(name="Table 1")

    def test_create_guest(self):
        """Creating a guest"""
        guest = Guest.objects.create(name="Bukayo Saka", party="groom")
        self.assertEqual(guest.name, "Bukayo Saka")
        self.assertEqual(guest.party, "groom")
        self.assertIsNone(guest.table)

    def test_guest_default_party(self):
        """The party defaults to bride"""
        guest = Guest.objects.create(name="Bukayo Saka")
        self.assertEqual(guest.party, "bride")
        self.assertIsNone(guest.table)

    def test_guest_assign_seat(self):
        """Assigning a seat"""
        guest = Guest.objects.create(name="Bukayo Saka", table=self.table, seat_number=1)
        self.assertEqual(guest.table, self.table)
        self.assertEqual(guest.seat_number, 1)

    def test_unique_seat_constraint(self):
        """The same seat should not be able to be assigend twice"""
        Guest.objects.create(
            name="guest 1",
            table=self.table,
            seat_number=1
        )
        with self.assertRaises(IntegrityError):
            Guest.objects.create(
                name="guest 2",
                table=self.table,
                seat_number=1
            )

    def test_guest_str_returns_name(self):
        guest = Guest.objects.create(name="David Raya")
        self.assertEqual(str(guest), "David Raya")

