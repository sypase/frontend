import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AICheckerShowcase = () => {
  useEffect(() => {
    // Initial animation for the Turnitin text
    gsap.fromTo(
      '.turnitin-text',
      { opacity: 0, scale: 0.8, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.3)' }
    );

    // Scroll-triggered animation for additional text
    gsap.fromTo(
      '.scroll-text',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.scroll-text-container',
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animation for the first image (flying effect)
    gsap.fromTo(
      '.image1',
      { x: '-150%', y: '-50%', opacity: 0 },
      {
        x: '0%',
        y: '0%',
        opacity: 1,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.image-container',
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animation for the second image (flying effect)
    gsap.fromTo(
      '.image2',
      { x: '150%', y: '-50%', opacity: 0 },
      {
        x: '0%',
        y: '0%',
        opacity: 1,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.image-container',
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5' }}>
      <div style={{ height: '45vh', paddingTop:'30px' }}>
        {/* Turnitin Text */}
        <h1 className="turnitin-text text-6xl font-bold text-center mb-10" style={{ fontFamily: 'Mustica Pro, sans-serif', color: '#333', marginTop:'20px' }}>
          Achieve 0% AI Detection and Plag Turnitin
        </h1>

        {/* Join Discord Link */}
        <div className="text-center mb-10">
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="join-discord-link text-xl font-semibold" style={{ color:'#007bff', textDecoration:'none' }}>
            Join Discord and get free Turnitin check 
            <span style={{ display:'inline-block', transform:'rotate(45deg)', marginLeft:'5px' }}>➔</span>
          </a>
        </div>

        {/* Scroll-triggered Text */}
        <div className="scroll-text-container">
          <p className="scroll-text text-2xl text-center opacity-0 mt-4">
            We have tested Bypass both AI and Plagiarism detection of Turnitin.
          </p>
        </div>
      </div>

      {/* Image Showcase */}
      <div className="image-container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'30px', paddingLeft:'50px', paddingRight:'50px' }}>
        <img src="/assets/turnitin1.jpg" alt="Turnitin Screenshot 1" className="image1" style={{ width:'100%', maxWidth:'45%', height:'auto', borderRadius:'10px', objectFit:'cover' }} />
        <img src="/assets/turnitin2.jpg" alt="Turnitin Screenshot 2" className="image2" style={{ width:'100%', maxWidth:'45%', height:'auto', borderRadius:'10px', objectFit:'cover' }} />
      </div>
    </div>
  );
};

export default AICheckerShowcase;