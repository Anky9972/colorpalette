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
    
    const colorsString = colors.map(color => encodeURIComponent(color.hex)).join(',');

    
    fetch(`https://colorpalettebackend.onrender.com/api/v1/share-pdf?colors=${colorsString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob(); 
        })
        .then(blob => {
          
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'color_palette.pdf';
            link.click();
        })
        .catch(error => {
            console.error('Error:', error);
            
        });
}


export function downloadPalettePNG(colors) {
    
    const colorsString = colors.map(color => encodeURIComponent(color.hex)).join(',');

    
    fetch(`https://colorpalettebackend.onrender.com/api/v1/share-png?colors=${colorsString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob(); 
        })
        .then(blob => {
            
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'color_palette.png';
            link.click();
        })
        .catch(error => {
            console.error('Error:', error);
            
        });
}


export function downloadPaletteSVG(colors) {

    const colorsString = colors.map(color => encodeURIComponent(color.hex)).join(',');


    fetch(`https://colorpalettebackend.onrender.com/api/v1/share-svg?colors=${colorsString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); 
        })
        .then(svgContent => {
            
            const blob = new Blob([svgContent], { type: 'image/svg+xml' });


            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'color_palette.svg';
            link.click();
        })
        .catch(error => {
            console.error('Error:', error);

        });
}



