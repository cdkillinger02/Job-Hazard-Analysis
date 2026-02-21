from sqlalchemy.orm import Session
from fastapi import UploadFile
from . import models
import json
import base64
import requests
import mimetypes


def create_jha(db: Session, jha_data):
    jha = models.JobHazardAnalysis(
        location=jha_data.location,
        department=jha_data.department,
        activity=jha_data.activity,
        building_room=jha_data.building_room,
        job_title=jha_data.job_title,
        supervisor=jha_data.supervisor,
        prepared_by=jha_data.prepared_by,
        date=jha_data.date,
        required_training=json.dumps(jha_data.required_training),  # <--- serialize
        required_ppe=json.dumps(jha_data.required_ppe),
        signatures=[
            models.Signature(name=s.name, date=s.date) for s in jha_data.signatures
        ],
    )
    db.add(jha)
    db.commit()
    db.refresh(jha)

    for idx, step in enumerate(jha_data.steps):
        step_obj = models.Step(
            jha_id=jha.id, task=step.task, step_order=idx + 1, photo=step.photo
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


def getBase64EncodedImage(url, name):
    if name is None or name == "" or name == "null":
        return ""
    try:
        response = requests.get(url)
        response.raise_for_status()
    except Exception:
        return ''

    encoded_image = base64.b64encode(response.content)

    base64_string = encoded_image.decode("utf-8")
    mime_type, _ = mimetypes.guess_type(url)
    base64_string = f"data:{mime_type};base64,{base64_string}"
    return base64_string
