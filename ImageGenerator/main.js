const form = document.querySelector('form'); 

form.addEventListener('submit', async (e) => { 
    e.preventDefault(); 
    const data = new FormData(form);

    try {
        const response = await fetch('http://localhost:8080/dream', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: data.get('prompt'), 
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${response.status} - ${errorText}`);
        }

        const { image } = await response.json(); 

        const result = document.querySelector('#result');
        result.innerHTML = `<img src="${image}" width="512" />`;

    } catch (error) {
        console.error('Error generating image:', error);
        const result = document.querySelector('#result');
        result.textContent = 'Failed to generate image. Try again.';
    }
});
