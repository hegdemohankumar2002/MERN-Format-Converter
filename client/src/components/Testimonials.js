import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Photographer',
      avatar: '👩‍💼',
      text: 'ConvertX has revolutionized my workflow. Converting HEIC files to JPG is now a breeze!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Content Creator',
      avatar: '👨‍💻',
      text: 'The video conversion tools are incredibly fast. I use it daily for my YouTube content.',
      rating: 5
    },
    {
      name: 'Emma Davis',
      role: 'Student',
      avatar: '👩‍🎓',
      text: 'Perfect for my school projects. The interface is so intuitive and user-friendly.',
      rating: 5
    },
    {
      name: 'Alex Rodriguez',
      role: 'Designer',
      avatar: '👨‍🎨',
      text: 'High-quality conversions every time. This is my go-to tool for all file conversions.',
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <section style={{
      padding: '4rem 0',
      background: 'var(--color-bg)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            What Our Users Say
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--color-text-muted)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Join thousands of satisfied users who trust ConvertX for their file conversion needs.
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px'
        }}>
          <div style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            padding: '3rem',
            maxWidth: '600px',
            textAlign: 'center',
            position: 'relative',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem'
            }}>
              {testimonials[currentIndex].avatar}
            </div>
            
            <div style={{
              fontSize: '1.2rem',
              color: 'var(--color-text)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              fontStyle: 'italic'
            }}>
              "{testimonials[currentIndex].text}"
            </div>

            <div style={{
              marginBottom: '1rem'
            }}>
              {renderStars(testimonials[currentIndex].rating)}
            </div>

            <div style={{
              fontWeight: 600,
              color: 'var(--color-text)',
              fontSize: '1.1rem',
              marginBottom: '0.5rem'
            }}>
              {testimonials[currentIndex].name}
            </div>

            <div style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.9rem'
            }}>
              {testimonials[currentIndex].role}
            </div>

            {/* Navigation dots */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem'
            }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: index === currentIndex ? 'var(--color-primary)' : 'var(--color-border)',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 