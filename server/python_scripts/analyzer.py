import sys
import os
try:
    num=sys.argv[1]

    from joblib import load
    from sklearn.feature_extraction.text import CountVectorizer
    
    # print(os.getcwd())
    model = load('./python_scripts/Sentiment_Analysis_Predictor.joblib')
    vectorizer = load('./python_scripts/vectorizer.joblib')

    new_comment = str(num)
    new_comment_vec = vectorizer.transform([new_comment])
    prediction = model.predict(new_comment_vec)

    result=""

    if prediction == 1:
        result="Your Sentiment is: Negative"
    elif prediction == 3:
        result="Your Sentiment is: Positive"
    elif prediction == 2:
        result="Your Sentiment is: Neutral"
    elif prediction == 0:
        result="Your Sentiment is: Irrelevant"

    print(result)
except Exception as e:
    print(e)

sys.stdout.flush()