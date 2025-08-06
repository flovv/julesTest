document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const imageUpload = document.getElementById('image-upload');
    const resultsContainer = document.getElementById('results-container');
    const critiqueOutput = document.getElementById('critique-output');

    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const file = imageUpload.files[0];
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        // Show a loading message
        resultsContainer.style.display = 'block';
        critiqueOutput.innerHTML = '<p>Analyzing your style...</p>';

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            const data = await response.json();

            // Format the output
            let outputHtml = `<h3>Score: ${data.score}</h3>`;
            outputHtml += '<ul>';
            data.feedback.forEach(item => {
                outputHtml += `<li>${item}</li>`;
            });
            outputHtml += '</ul>';

            critiqueOutput.innerHTML = outputHtml;

        } catch (error) {
            critiqueOutput.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
            console.error('Error:', error);
        }
    });
});
