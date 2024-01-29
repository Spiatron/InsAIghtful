from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os
from paddleocr import PaddleOCR

app = Flask(__name__)
CORS(app)

ocr = PaddleOCR(lang='en')

@app.route('/textOCR', methods=['POST'])
def textOCR():
    try:
        img_file = request.files['image']

        img_stream = img_file.read()

        result = ocr.ocr(img_stream)

        text_results = []
        for res in result:
            lines = [line[1][0] for line in res]
            text_results.append(lines)

        return jsonify({'result': text_results})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
load_dotenv()

api_key = os.environ.get('SIMPLETEX_API_KEY')
api_endpoint = 'https://server.simpletex.cn/api/latex_ocr/v2'

@app.route('/mathOCR', methods=['POST'])
def mathOCR():
    try:
        img_file = request.files['file']

        response = requests.post(api_endpoint, headers={'token': api_key}, files={'file': img_file})

        if response.ok:
            data = response.json()
            if data['status']:
                latex_result = data['res']['latex']
                return jsonify({'success': True, 'latex': latex_result})
        else:
            return jsonify({'success': False, 'error': f'API error: {response.text}'})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000)
