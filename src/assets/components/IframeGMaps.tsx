const IframeGMaps = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.9149349636878!2d9.982162015868921!3d53.54143306778156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18f066770c44f%3A0xb2e4ab2a68984286!2sElbphilharmonie%20Hamburg!5e0!3m2!1sen!2sde!4v1680861958847!5m2!1sen!2sde"
      width="560"
      height="315"
      style={{ border: "0" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default IframeGMaps;
