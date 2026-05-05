# 🎯 Objective: 
- ✅ The objective of this project is to build a classification model to predict an individual's creditworthiness   using past financial and loan data. This model helps financial institutions identify whether an individual is likely to default on a loan, thereby reducing financial risk.

## 📋 Project Overview

- ✅  A production-ready machine learning project designed to predict customer churn using the Telco Churn Dataset. This project leverages the Scikit-learn Pipeline API to ensure a clean, reusable, and leak-proof workflow from data preprocessing to model deployment.

## 📊 Dataset Overview
The dataset contains information about borrowers and their loan history.
Target Variable: 
- ✅loan_status (Binary: 1 for default/not paid back, 0 for non-default/paid back).
Key Features:
- ✅Demographics: person_age, person_emp_length, person_home_ownership
- ✅Financials: person_income, loan_percent_income
- ✅Loan Specifics: loan_intent, loan_amnt, loan_int_rate, loan_grade
- ✅Credit History: cb_person_default_on_file, cb_person_cred_hist_length

## 🎯 Key Features
 📋 Project Steps
# 1. Data Preprocessing
- ✅  Outlier Treatment: Used the IQR (Interquartile Range) method to clip outliers in numerical columns like income and age.
- ✅  Data Visualization: Created Boxplots and Histograms to understand data distribution and skewness.
# 2. Feature Engineering
- ✅  Ordinal Encoding: Mapped loan_grade (A, B, C...) to numerical values to preserve the ranking.
- ✅  One-Hot Encoding: Converted nominal features like person_home_ownership and loan_intent into dummy variables.
- ✅  Standardization: Used StandardScaler to bring all numerical features to a common scale (mean=0, std=1).
# 3. Model Implementation
I compared three different algorithms to find the best fit:
- ✅  Logistic Regression: Used as a baseline linear classifier.
- ✅  Decision Tree: Captured non-linear patterns and provided a clear decision path.
- ✅  Random Forest: An ensemble method that combined multiple trees to provide a more robust and accurate prediction.
# 📈 Performance Metrics
The models were evaluated using:
- ✅  Accuracy: The percentage of correct total predictions.
- ✅  Precision: The ability of the classifier not to label a "good" applicant as "bad."
- ✅  Recall: The ability to find all "bad" applicants (Crucial for banking).
- ✅  F1-Score: The weighted average of Precision and Recall.

🚀 How to Use
- ✅ Prepare Environment: Ensure scikit-learn, pandas, and seaborn are installed.
- ✅ Load Data: Import the financial dataset (CSV).
- ✅ Run Preprocessing: Execute the encoding and scaling scripts.
- ✅ Train & Predict: Use the X_test_scaled data to generate predictions.
