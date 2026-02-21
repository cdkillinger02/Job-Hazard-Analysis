from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date


class StepSchema(BaseModel):
    task: str
    hazards: List[str] = []
    controls: List[str] = []
    photo: Optional[str] = None


class SignatureSchema(BaseModel):
    name: str
    date: Optional[str] = None


class JHASchema(BaseModel):
    location: str
    department: str
    activity: str
    building_room: str = Field(..., alias="buildingRoom")
    job_title: str = Field(..., alias="jobTitle")
    supervisor: str
    prepared_by: str = Field(..., alias="preparedBy")
    date: Optional[str] = None
    steps: List[StepSchema]
    required_training: List[str] = Field(default_factory=list, alias="requiredTraining")
    required_ppe: List[str] = Field(default_factory=list, alias="requiredPPE")
    signatures: List[SignatureSchema] = []

    class Config:
        allow_population_by_field_name = True
        allow_population_by_alias = True
