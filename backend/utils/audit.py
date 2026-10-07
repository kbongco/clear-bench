import models


def log_event(
    db,
    sample,
    action,
    actor_role,
    actor_id,
    actor_name,
    form_status=None,
    to_status=None,
    note=None,
):
    event = models.AuditEvent(
        sample=sample,
        action=action,
        actor_role=actor_role,
        actor_id=actor_id,
        actor_name=actor_name,
        form_status=form_status,
        to_status=to_status,
        note=note,
    )
    db.add(event)
    return event
