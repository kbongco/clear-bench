from datetime import timedelta

DURATION_DAYS = {
    "1-week": 7,
    "2-week": 14,
    "4-week": 28,
    "8-week": 56,
    "12-week": 84,
    "6-months": 182,
    "1-year": 365,
}

def calculate_due_date(start, duration):
      days = DURATION_DAYS.get(duration)
      if not start:
        return None
      if not days:
        return None
      return start + timedelta(days)
  