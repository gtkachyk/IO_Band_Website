from django.test import TestCase
from main.api.views import format_time, is_valid_time

class TimeTestCase(TestCase):
    def test_am_pm_formatting_1(self):
        time = format_time("6:52:56 PM")
        self.assertEqual(time, "6:52:56 p.m.")
    
    
    def test_am_pm_formatting_2(self):
        time = format_time("6:52:56 AM")
        self.assertEqual(time, "6:52:56 a.m.")


    def test_am_pm_formatting_3(self):
        time = format_time("")
        self.assertEqual(time, "")


    def test_am_pm_formatting_4(self):
        time = format_time("6")
        self.assertEqual(time, "6")

    
    def test_am_pm_formatting_5(self):
        time = format_time("6:")
        self.assertEqual(time, "6:")


    def test_am_pm_formatting_6(self):
        time = format_time("PM")
        self.assertEqual(time, "p.m.")

    
    def test_am_pm_formatting_7(self):
        time = format_time("AM")
        self.assertEqual(time, "a.m.")


    def test_am_pm_formatting_8(self):
        time = format_time("6:52:56")
        self.assertEqual(time, "6:52:56")


    def test_am_pm_formatting_and_validate(self):
        time = format_time("6:52:56 PM")
        valid = is_valid_time(time)
        self.assertEqual(valid, True)
        self.assertEqual(time, "6:52:56 p.m.")
