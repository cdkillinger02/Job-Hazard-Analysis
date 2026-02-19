from sqlalchemy.orm import Session
from . import models

def create_jha(db: Session, jha_data):
    jha = models.JobHazardAnalysis(
        location=jha_data.location,
        department=jha_data.department,
        activity=jha_data.activity,
        building_room=jha_data.buildingRoom,
        job_title=jha_data.jobTitle,
        supervisor=jha_data.supervisor,
        prepared_by=jha_data.preparedBy,
        date=jha_data.date
    )
    db.add(jha)
    db.commit()
    db.refresh(jha)

    for idx, step in enumerate(jha_data.steps):
        step_obj = models.Step(
            jha_id=jha.id,
            task=step.task,
            step_order=idx + 1,
            photo=step.photo
        )
        db.add(step_obj)
        db.commit()
        db.refresh(step_obj)

        for hazard_text in step.hazards:
            hazard_obj = models.Hazard(step_id=step_obj.id, hazard=hazard_text)
            db.add(hazard_obj)

        for control_text in step.controls:
            control_obj = models.Control(step_id=step_obj.id, control=control_text)
            db.add(control_obj)

        db.commit()

    return jha

def get_all_jhas(db: Session):
    return db.query(models.JobHazardAnalysis).all()
