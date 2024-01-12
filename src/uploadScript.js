async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const resultContainer = document.getElementById('resultContainer');
    const extractedTextElement = document.getElementById('extractedText');

    resultContainer.style.display = 'none';

    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Please select a file to upload.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function (event) {
        const fileContentBase64 = event.target.result.split(',')[1];

        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: fileContentBase64 }),
            });

            if (response.ok) {
                const result = await response.json();
                extractedTextElement.textContent = result.body;
                resultContainer.style.display = 'block';
            } else {
                alert('Error uploading file. Please try again.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred. Please try again.');
        }
    };

    reader.readAsDataURL(file);
}
