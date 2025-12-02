export const handleImageError = (e, fallbackType = 'avatar', nome = '') => {
    const target = e.target;
    
    if (fallbackType === 'avatar') {
        target.style.display = 'none';
        const parent = target.parentNode;
        
        if (!parent.querySelector('.image-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.style.cssText = `
                width: ${target.width || '100px'};
                height: ${target.height || '100px'};
                border-radius: ${target.style.borderRadius || '50%'};
                background: linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: ${target.width ? `${target.width / 2}px` : '24px'};
                font-weight: bold;
            `;
            fallback.innerHTML = `<span>${nome ? nome.charAt(0).toUpperCase() : 'U'}</span>`;
            parent.appendChild(fallback);
        }
    } else if (fallbackType === 'capa') {
        target.style.display = 'none';
        const parent = target.parentNode;
        parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
};

export const validateImageData = (imageData) => {
    if (!imageData) return null;
    
    if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
        return imageData;
    }
    
    return null;
};

export const getAvatarFallback = (nome, size = '100px') => {
    return {
        type: 'fallback',
        content: nome ? nome.charAt(0).toUpperCase() : 'U',
        size: size
    };
};