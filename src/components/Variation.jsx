import React, { useContext, useState } from 'react';
import chroma from 'chroma-js'; // Import chroma-js
import { ColorState } from '../context/ColorState';

// Custom function to adjust luminance by changing the RGB values
const adjustLuminance = (colorHex, luminance) => {
    const color = chroma(colorHex);
    const rgb = color.rgb();

    // Adjust each RGB component based on the luminance value
    const adjustedRgb = rgb.map(component => {
        const adjustedComponent = component + (255 - component) * luminance;
        return Math.round(Math.min(255, Math.max(0, adjustedComponent)));
    });

    return chroma.rgb(adjustedRgb).hex();
};

// ColorVariation component
const ColorVariation = ({ colorPalette, parameter, scale }) => {
    
    const generateVariations = (color) => {
        switch (parameter) {
            case 'shade':
                return scale.map((value) => ({
                    color: chroma(color.hex).darken(value / 100).hex(),
                    value: value + '%',
                }));
            case 'saturation':
                return scale.map((value) => ({
                    color: chroma(color.hex).saturate(value).hex(),
                    value: value + '%',
                }));
                case 'brightness':
                    return scale.map((value) => {
                       
                        const hslColor = chroma(color.hex).hsl();
                
                       
                        hslColor[2] = value / 100;
                
                       
                        const adjustedColor = chroma.hsl(...hslColor);
                
                        return {
                            color: adjustedColor.hex(),
                            value: value + '%',
                        };
                    });
                
            case 'hue':
                return scale.map((value) => ({
                    color: chroma(color.hex).set('hsl.h', '+=' + value).hex(),
                    value: value + '°',
                }));
                case 'temperature':
                    return scale.map((value) => {
                        
                        const labColor = chroma(color.hex).lab();
                
                        
                        labColor[2] += value / 100;
                
                        
                        const adjustedColor = chroma.lab(labColor);
                
                        return {
                            color: adjustedColor.hex(),
                            value: value + 'K',
                        };
                    });
                
            case 'luminance':
                return scale.map((value) => ({
                    color: adjustLuminance(color.hex, value / 100),
                    value: value + '%',
                }));
                case 'gradient':
                    
                    const scaleColors = [];
                    for (let i = 0; i < colorPalette.length - 1; i++) {
                        const gradientColors = chroma.scale([colorPalette[i].hex, colorPalette[i + 1].hex]).colors(6);
                        scaleColors.push(...gradientColors);
                    }
                    
                    return scaleColors.map((color, index) => ({
                        color: color,
                        value: '',
                    }));
                
            default:
                return [{ color: color.hex, value: 'Original' }]; 
        }
    };


    const variationColors = colorPalette.map((color, index) => (
        <div className='flex flex-col' key={index}>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className='flex-col'>
                {generateVariations(color).map((variant, idx) => (
                    <div
                        key={idx}
                        style={{
                            backgroundColor: variant.color,
                            width: '160px',
                            height: '31px',
                            position: 'relative',
                        }}
                    >
                        <span
                            style={{
                                position: 'absolute',
                                left: '50%',
                                marginTop: '10px',
                                transform: 'translateX(-50%)',
                            }}
                            className='text-xs'
                        >
                            {variant.color}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    ));

    return <div className='flex flex-row'>{variationColors}</div>;
};


const App = () => {
    const { colors } = useContext(ColorState);


    const [selectedParameter, setSelectedParameter] = useState(null);

    // Function to generate scale values for each parameter
    const generateScale = (parameter) => {
        switch (parameter) {
            case 'shade':
            case 'saturation':
                return Array.from({ length: 19 }, (_, i) => (i - 9) * 10);
            case 'brightness':
                return Array.from({ length: 11 }, (_, i) => i * 10);
            case 'hue':
                return Array.from({ length: 19 }, (_, i) => (i - 9) * 4);
            case 'temperature':
                return Array.from({ length: 11 }, (_, i) => (i - 5) * 100);
            case 'luminance':
                return Array.from({ length: 11 }, (_, i) => (i - 5) * 10);
            default:
                return [];
        }
    };

    // Function to handle parameter click
    const handleParameterClick = (param) => {
        setSelectedParameter(param);
    };

    return (
        <div className='flex flex-col  w-full'>
            <div className='w-full flex justify-center items-center'>
                <ul className='flex gap-6 h-12 justify-center items-center '>
                    <li onClick={() => handleParameterClick('shade')}>Shade</li>
                    <li onClick={() => handleParameterClick('saturation')}>Saturation</li>
                    <li onClick={() => handleParameterClick('brightness')}>Brightness</li>
                    <li onClick={() => handleParameterClick('hue')}>Hue</li>
                    <li onClick={() => handleParameterClick('temperature')}>Temperature</li>
                    <li onClick={() => handleParameterClick('luminance')}>Luminance</li>
                    <li onClick={() => handleParameterClick('gradient')}>Gradient</li>
                </ul>
            </div>
            <div className='w-full flex justify-center items-center'>
                <div className=' w-20'>
                {selectedParameter && (
                    <div className='ml-2' >
                        <div style={{ display: 'flex' }} className='flex-col gap-[7px]'>
                            {generateScale(selectedParameter).map((value, index) => (
                                <span key={index} style={{ marginRight: '10px' }}>
                                    {value}
                                    {selectedParameter === 'temperature' ? 'K' : '%'}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                </div>
                <div>
                    {selectedParameter && (
                        <ColorVariation
                            colorPalette={colors}
                            parameter={selectedParameter}
                            scale={generateScale(selectedParameter)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
