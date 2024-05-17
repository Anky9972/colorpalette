function generateShareableLink(colors) {
    const baseUrl = 'https://colorpalettebackend.onrender.com/api/v1/share';
    const colorString = colors.map(color => encodeURIComponent(color.hex)).join(',');
    return `${baseUrl}?colors=${colorString}`;
}


export function sharePalette(colors) {
    console.log("colors in share",colors)
    
    const shareableLink = generateShareableLink(colors);
    navigator.clipboard.writeText(shareableLink).then(() => {
        alert('Link copied to clipboard!');
    });
}

export function downloadPalettePDF(colors) {
    // Convert colors array to a comma-separated string
    const colorsString = colors.map(color => encodeURIComponent(color.hex)).join(',');

    // Make a GET request to the backend endpoint to generate the PDF
    fetch(`https://colorpalettebackend.onrender.com/api/v1/share-pdf?colors=${colorsString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob(); // Convert response to a Blob
        })
        .then(blob => {
            // Create a temporary link element to trigger the download
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'color_palette.pdf';
            link.click();
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors
        });
}


export function downloadPalettePNG(colors) {
    // Convert colors array to a comma-separated string
    const colorsString = colors.map(color => encodeURIComponent(color.hex)).join(',');

    // Make a GET request to the backend endpoint to generate the PNG image
    fetch(`https://colorpalettebackend.onrender.com/api/v1/share-png?colors=${colorsString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob(); // Convert response to a Blob
        })
        .then(blob => {
            // Create a temporary link element to trigger the download
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'color_palette.png';
            link.click();
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors
        });
}


export function downloadPaletteSVG(colors) {
    // Convert colors array to a comma-separated string
    const colorsString = colors.map(color => encodeURIComponent(color.hex)).join(',');

    // Make a GET request to the backend endpoint to generate the SVG image
    fetch(`https://colorpalettebackend.onrender.com/api/v1/share-svg?colors=${colorsString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Convert response to text
        })
        .then(svgContent => {
            // Create a blob from the SVG content
            const blob = new Blob([svgContent], { type: 'image/svg+xml' });

            // Create a temporary link element to trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'color_palette.svg';
            link.click();
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors
        });
}



