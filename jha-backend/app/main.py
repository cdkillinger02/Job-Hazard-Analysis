from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app import models, schemas, crud
from app.database import engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="JHA API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/createNewAnalysis")
def create_jha(jha_data: schemas.JHASchema, db: Session = Depends(get_db)):
    jha = crud.create_jha(db, jha_data)
    return {"message": "JHA created", "jha_id": jha.id}

@app.get("/api/getAllAnalysis")
def read_jhas(db: Session = Depends(get_db)):
    jhas = crud.get_all_jhas(db)
    result = []
    for jha in jhas:
        steps_list = []
        for step in jha.steps:
            steps_list.append({
                "id": step.id,
                "task": step.task,
                "hazards": [h.hazard for h in step.hazards],
                "controls": [c.control for c in step.controls],
                "photo": step.photo
            })
        result.append({
            "id": jha.id,
            "location": jha.location,
            "department": jha.department,
            "activity": jha.activity,
            "buildingRoom": jha.building_room,
            "jobTitle": jha.job_title,
            "supervisor": jha.supervisor,
            "preparedBy": jha.prepared_by,
            "date": jha.date,
            "steps": steps_list
        })
    return result

@app.get("/api/jhas/{jha_id}")
def get_jha(jha_id: int, db: Session = Depends(get_db)):
    jha = db.query(models.JobHazardAnalysis).filter(models.JobHazardAnalysis.id == jha_id).first()
    if not jha:
        raise HTTPException(status_code=404, detail="JHA not found")

    # Return JHA with nested steps, hazards, and controls
    return {
        "id": jha.id,
        "location": jha.location,
        "department": jha.department,
        "activity": jha.activity,
        "building_room": jha.building_room,
        "job_title": jha.job_title,
        "supervisor": jha.supervisor,
        "prepared_by": jha.prepared_by,
        "date": jha.date.isoformat() if jha.date else None,
        "steps": [
            {
                "id": step.id,
                "task": step.task,
                "photo": step.photo,
                "hazards": [h.hazard for h in step.hazards],
                "controls": [c.control for c in step.controls],
            }
            for step in jha.steps
        ]
    }

@app.put("/api/updateExistingAnalysis/{jha_id}")
def update_jha(jha_id: int, jha_data: dict, db: Session = Depends(get_db)):
    jha = db.query(models.JobHazardAnalysis).filter(models.JobHazardAnalysis.id == jha_id).first()
    if not jha:
        raise HTTPException(status_code=404, detail="JHA not found")
    
    # Update metadata
    for field in ["location", "department", "activity", "building_room", "job_title", "supervisor", "prepared_by", "date"]:
        if field in jha_data:
            setattr(jha, field, jha_data[field])

    if "steps" in jha_data:
        for step in jha.steps:
            db.delete(step)
        db.commit()
        for step_data in jha_data["steps"]:
            step = models.Step(
                task=step_data.get("task"),
                step_order=step_data.get("step_order", 0),
                photo=step_data.get("photo"),
            )
            # Add hazards
            for hazard_text in step_data.get("hazards", []):
                step.hazards.append(models.Hazard(hazard=hazard_text))
            # Add controls
            for control_text in step_data.get("controls", []):
                step.controls.append(models.Control(control=control_text))

            jha.steps.append(step)        

    db.commit()
    db.refresh(jha)
    return jha

@app.post("/api/deleteAnalysis/{jha_id}")
def delete_jha(jha_id: int, db: Session = Depends(get_db)):
    jha = db.query(models.JobHazardAnalysis).filter(models.JobHazardAnalysis.id == jha_id).first()
    if not jha:
        raise HTTPException(status_code=404, detail="JHA not found")

    db.delete(jha)  # This also deletes steps, hazards, and controls if cascade="all, delete-orphan" is set
    db.commit()
    return {"detail": "JHA deleted successfully"}