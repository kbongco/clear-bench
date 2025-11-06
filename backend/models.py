from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean, ForeignKey, Float, Text, func
from sqlalchemy.orm import relationship
from database import Base
from datetime import date, datetime
from sqlalchemy.types import JSON


# ---------------------
# Scientist Model
# ---------------------
class Scientist(Base):
    __tablename__ = "scientists"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    department = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=False)
    manager_id = Column(Integer, ForeignKey("scientists.id"), nullable=True)

    samples = relationship("Sample", back_populates="scientist")


# ---------------------
# LabTech Model
# ---------------------
class LabTech(Base):
    __tablename__ = "lab_techs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    samples = relationship("Sample", back_populates="lab_tech")


# ---------------------
# Sample Model
# ---------------------
class Sample(Base):
    __tablename__ = "samples"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    scientist_id = Column(Integer, ForeignKey("scientists.id"), nullable=False)
    lab_tech_id = Column(Integer, ForeignKey("lab_techs.id"), nullable=True)
    sample_type = Column(String, nullable=True)
    test_status = Column(String, default="pending")
    test_start = Column(Date, nullable=True)
    due_date = Column(Date, nullable=True)
    test_duration = Column(String, nullable=True)
    out_of_spec = Column(Boolean, default=False)
    totalBottles = Column(Integer, default=1)
    temperature = Column(JSON, default=list)  
    notes = Column(Text, nullable=True)

    scientist = relationship("Scientist", back_populates="samples")
    lab_tech = relationship("LabTech", back_populates="samples")
    results = relationship("Result", back_populates="sample")



# ---------------------
# Result Model
# ---------------------
class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(Integer, ForeignKey("samples.id"), nullable=False)

    # Datetime fields
    test_completed_date = Column(DateTime, nullable=True)
    reviewed_date = Column(DateTime, nullable=True)

    tested_by = Column(Integer, ForeignKey("lab_techs.id"), nullable=True)
    reviewed_by = Column(Integer, ForeignKey("scientists.id"), nullable=True)

    overall_status = Column(String, nullable=False)
    is_out_of_spec = Column(Boolean, default=False)
    
    test_method = Column(String, nullable=True)
    instrument_used = Column(String, nullable=True)
    batch_number = Column(String, nullable=True)
    
    analyst_comments = Column(Text, nullable=True)
    reviewer_comments = Column(Text, nullable=True)

    raw_data_file_path = Column(String, nullable=True)

    # ✅ NEW TIMESTAMPS
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    sample = relationship("Sample", back_populates="results")
    test_results = relationship("TestResult", back_populates="result")

# ---------------------
# TestResult Model
# ---------------------
class TestResult(Base):
    __tablename__ = "test_results"

    id = Column(Integer, primary_key=True, index=True)
    result_id = Column(Integer, ForeignKey("results.id"), nullable=False)
    parameter_name = Column(String, nullable=False)
    measured_value = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    expected_range_min = Column(Float, nullable=True)
    expected_range_max = Column(Float, nullable=True)
    specification_limit = Column(Float, nullable=True)
    is_within_spec = Column(Boolean, default=True)
    notes = Column(Text, nullable=True)

    result = relationship("Result", back_populates="test_results")
