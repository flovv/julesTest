from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes

# Define a folder to store uploaded images, though we won't use it in this simple version
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        # In a real app, you would save the file and process it
        # filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        # file.save(filename)

        # For now, we just return a hardcoded critique
        critique = {
            "score": "8/10",
            "feedback": [
                "The color palette is well-coordinated.",
                "The silhouette is classic and flattering.",
                "This is a great example of smart-casual style.",
                "Accessorizing with a watch or bracelet could elevate this look further."
            ]
        }
        return jsonify(critique)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
