from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

# CRITICAL: This variable name MUST be "app" so uvicorn can find it
app = FastAPI()

# Configure CORS so your Next.js frontend (running on port 3000) can talk to your backend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
#Temporarily added below middleware for testing 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)


# Load your best model
model = joblib.load("rf_model.joblib")

# Define the data structure matching your 17 features
class CreditDataInput(BaseModel):
    age: float
    income: float
    emp_length: float
    loan_grade: int
    loan_amnt: float
    loan_int_rate: float
    loan_percent_income: float
    default_on_file: int
    cred_hist_length: float
    home_OTHER: int
    home_OWN: int
    home_RENT: int
    loan_EDUCATION: int
    loan_HOMEIMPROVEMENT: int
    loan_MEDICAL: int
    loan_PERSONAL: int
    loan_VENTURE: int

@app.post("/predict")
def predict_credit(data: CreditDataInput):
    # Pack data into the exact sequence your model expects
    features = [[
        data.age, data.income, data.emp_length, data.loan_grade, data.loan_amnt,
        data.loan_int_rate, data.loan_percent_income, data.default_on_file,
        data.cred_hist_length, data.home_OTHER, data.home_OWN, data.home_RENT,
        data.loan_EDUCATION, data.loan_HOMEIMPROVEMENT, data.loan_MEDICAL,
        data.loan_PERSONAL, data.loan_VENTURE
    ]]
    
    prediction = model.predict(features)[0]
    return {"prediction": int(prediction)}