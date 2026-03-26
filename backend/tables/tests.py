from django.test import TestCase
from guests.models import Guest
from .models import Seat, Table


class AssignSeatTests(TestCase):
    def setUp(self):
        self.table = Table.objects.create(name="Table 1")
        self.other_table = Table.objects.create(name="Table 2")
        self.seat_1 = Seat.objects.create(table=self.table, seat_number=1)
        self.seat_2 = Seat.objects.create(table=self.table, seat_number=2)
        self.seat_other = Seat.objects.create(table=self.other_table, seat_number=1)

    def test_assign_to_occupied_seat_swaps_guests(self):
        moving_guest = Guest.objects.create(
            name="Moving Guest", table=self.table, seat_number=1
        )
        target_guest = Guest.objects.create(
            name="Target Guest", table=self.table, seat_number=2
        )
        self.seat_1.guest = moving_guest
        self.seat_1.save()
        self.seat_2.guest = target_guest
        self.seat_2.save()

        response = self.client.patch(
            f"/api/seats/{self.seat_2.id}/assign/",
            data={"guest_id": moving_guest.id},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.seat_1.refresh_from_db()
        self.seat_2.refresh_from_db()
        moving_guest.refresh_from_db()
        target_guest.refresh_from_db()

        self.assertEqual(self.seat_2.guest_id, moving_guest.id)
        self.assertEqual(self.seat_1.guest_id, target_guest.id)
        self.assertEqual(moving_guest.table_id, self.table.id)
        self.assertEqual(moving_guest.seat_number, 2)
        self.assertEqual(target_guest.table_id, self.table.id)
        self.assertEqual(target_guest.seat_number, 1)
        self.assertEqual(response.json().get("swapped_guest_id"), target_guest.id)

    def test_assign_unseated_guest_to_occupied_seat_removes_previous_guest(self):
        moving_guest = Guest.objects.create(name="Unseated Guest")
        target_guest = Guest.objects.create(
            name="Seated Guest", table=self.other_table, seat_number=1
        )
        self.seat_other.guest = target_guest
        self.seat_other.save()

        response = self.client.patch(
            f"/api/seats/{self.seat_other.id}/assign/",
            data={"guest_id": moving_guest.id},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.seat_other.refresh_from_db()
        moving_guest.refresh_from_db()
        target_guest.refresh_from_db()

        self.assertEqual(self.seat_other.guest_id, moving_guest.id)
        self.assertEqual(moving_guest.table_id, self.other_table.id)
        self.assertEqual(moving_guest.seat_number, 1)
        self.assertIsNone(target_guest.table_id)
        self.assertIsNone(target_guest.seat_number)
        self.assertEqual(response.json().get("swapped_guest_id"), target_guest.id)
