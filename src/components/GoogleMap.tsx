import React from 'react';

interface GoogleMapProps {
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className = "" }) => {
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2647.8!2d18.168889!3d48.959722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47142e5b7a2c8e8d%3A0x5e8b4c3f5d7a2b1c!2zxaDDsnR1cm92YSAxNTMyLzkyLCAwMTggNDEgRHVibmljYSBuYWQgVsOhaG9tLCBTbG92YWtpYQ!5e0!3m2!1sen!2ssk!4v1620000000000!5m2!1sen!2ssk";

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '256px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Šport & Body Terapia Location"
      />
    </div>
  );
};

export default GoogleMap;
