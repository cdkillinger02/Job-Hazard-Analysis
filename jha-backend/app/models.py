from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class JobHazardAnalysis(Base):
    __tablename__ = "JobHazardAnalysis"
    id = Column(Integer, primary_key=True, index=True)
    location = Column(String)
    department = Column(String)
    activity = Column(String)
    building_room = Column(String)
    job_title = Column(String)
    supervisor = Column(String)
    prepared_by = Column(String)
    date = Column(Date)

    steps = relationship("Step", back_populates="jha", cascade="all, delete-orphan")

class Step(Base):
    __tablename__ = "steps"
    id = Column(Integer, primary_key=True, index=True)
    jha_id = Column(Integer, ForeignKey("JobHazardAnalysis.id"))
    task = Column(Text)
    step_order = Column(Integer)
    photo = Column(String, nullable=True)

    jha = relationship("JobHazardAnalysis", back_populates="steps")
    hazards = relationship("Hazard", back_populates="step", cascade="all, delete-orphan")
    controls = relationship("Control", back_populates="step", cascade="all, delete-orphan")

class Hazard(Base):
    __tablename__ = "hazards"
    id = Column(Integer, primary_key=True, index=True)
    step_id = Column(Integer, ForeignKey("steps.id"))
    hazard = Column(Text)
    step = relationship("Step", back_populates="hazards")

class Control(Base):
    __tablename__ = "controls"
    id = Column(Integer, primary_key=True, index=True)
    step_id = Column(Integer, ForeignKey("steps.id"))
    control = Column(Text)
    step = relationship("Step", back_populates="controls")