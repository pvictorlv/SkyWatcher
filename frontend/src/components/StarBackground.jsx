import { useEffect } from 'react';

const StarBackground = () => {
  useEffect(() => {
    // Create stars in the background
    const createStars = () => {
      const container = document.body;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      // Remove any existing stars
      const existingStars = document.querySelectorAll('.star');
      existingStars.forEach(star => star.remove());
      
      // Create new stars
      const starCount = Math.min(150, Math.floor((screenWidth * screenHeight) / 5000));
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = `star star-${Math.floor(Math.random() * 3) + 1}`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size (0.5px to 3px)
        const size = 0.5 + Math.random() * 2.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random delay for animation
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(star);
      }
    };
    
    // Create stars initially
    createStars();
    
    // Recreate stars on window resize
    window.addEventListener('resize', createStars);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', createStars);
      const stars = document.querySelectorAll('.star');
      stars.forEach(star => star.remove());
    };
  }, []);
  
  return null; // This component doesn't render anything visible
};

export default StarBackground;