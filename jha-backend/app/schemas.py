from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class StepSchema(BaseModel):
    task: str
    hazards: List[str] = []
    controls: List[str] = []
    photo: Optional[str] = None

class JHASchema(BaseModel):
    location: str
    department: Optional[str] = None
    activity: Optional[str] = None
    buildingRoom: Optional[str] = None
    jobTitle: Optional[str] = None
    supervisor: Optional[str] = None
    preparedBy: Optional[str] = None
    date: Optional[date] = None
    steps: List[StepSchema] = []
